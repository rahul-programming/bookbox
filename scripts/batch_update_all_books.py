import glob
import json
import os
import re
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
import json_repair

WORKSPACE_DIR = "/Users/rahulsharma/Documents/coding/myapps/bookbox"
BOOKS_DIR = os.path.join(WORKSPACE_DIR, "src/data/books")
AGY_BIN = "/opt/homebrew/bin/agy"

def clean_quotes(s):
    if not isinstance(s, str):
        return s
    # Convert **"text"** or **'text'** to "text"
    s = re.sub(r'\*\*"([^"]+)"\*\*', r'"\1"', s)
    s = re.sub(r"\*\*\'([^\']+)\'*\*", r'"\1"', s)
    # Convert **phrase with quote or statement** to "phrase"
    def fix_bold(m):
        inner = m.group(1).strip()
        if len(inner.split()) > 3 or any(p in inner for p in [".", ",", "!", "?", "'", '"']):
            clean_inner = inner.strip('"').strip("'")
            return f'"{clean_inner}"'
        return f"**{inner}**"
    s = re.sub(r"\*\*([^\*\n]+)\*\*", fix_bold, s)
    return s

def query_agy(prompt, timeout=120):
    cmd = [
        AGY_BIN,
        "--disable-slash-commands",
        "--effort", "low",
        "--dangerously-skip-permissions",
        "-p", prompt
    ]
    for attempt in range(3):
        try:
            res = subprocess.check_output(cmd, timeout=timeout).decode("utf-8")
            start = res.find("[")
            end = res.rfind("]")
            if start != -1 and end != -1:
                return json_repair.loads(res[start:end+1])
            return json_repair.loads(res)
        except Exception as e:
            if attempt == 2:
                raise e
            time.sleep(2)
    return []

def process_book(filepath):
    filename = os.path.basename(filepath)
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()

    # Find export header
    m = re.search(r"(export const [A-Za-z0-9_]+: Book = )", text)
    if not m:
        return f"⚠️ {filename}: Could not find export statement"
    
    header = m.group(1)
    prefix_len = m.end()
    end_idx = text.rfind(";")
    json_chunk = text[prefix_len:end_idx].strip()

    try:
        book = json.loads(json_chunk)
    except Exception as e:
        return f"❌ {filename}: JSON parse failed: {e}"

    title = book.get("title", filename)
    author = book.get("author", "Unknown")
    blinks = book.get("blinks", [])
    if not blinks:
        return f"⚠️ {filename}: No blinks found"

    # Check which blinks are missing keyInsight
    missing_blinks = [b for b in blinks if not b.get("keyInsight") or len(b.get("keyInsight", "")) < 50]
    
    if missing_blinks:
        # Process in chunks of up to 6 chapters for optimal speed and reliability
        chunk_size = 6
        for i in range(0, len(missing_blinks), chunk_size):
            chunk = missing_blinks[i:i + chunk_size]
            ch_list = []
            for b in chunk:
                ch_num = b.get("chapterNumber", b.get("order"))
                headline = b.get("headline", f"Chapter {ch_num}")
                takeaway = b.get("keyTakeaway", "")
                content_snip = b.get("content", "")[:350].replace("\n", " ")
                ch_list.append(f"- Chapter {ch_num}: {headline}\n  Core Takeaway: {takeaway}\n  Excerpt: {content_snip}...")

            ch_str = "\n".join(ch_list)
            prompt = f"""Synthesize short, punchy, witty 'wow factor' key insights for '{title}' by {author}.

Chapters to process:
{ch_str}

CRITICAL RULES:
- Write a 'keyInsight' for each chapter that is short (1-2 punchy paragraphs, ~150-250 words / 800-1200 chars).
- MUST deliver the 'WOW factor' of the chapter — the mind-bending counterintuitive truth, shocking paradox, or human absurdity that makes the reader say, 'Whoa, that is completely crazy!'
- NOT a summary! Never write a dry summary.
- Style: Simple and funny language (coffee with a brilliant, hilarious friend).
- QUOTES FORMATTING RULE: All quotes must be formatted as "text" using standard quotation marks. NEVER format quotes as **text** with asterisks.

Return a JSON array of objects:
[
  {{
    "chapterNumber": N,
    "keyInsight": "Short, punchy, witty 'wow factor' insight (150-250 words) in simple and funny language..."
  }}
]
Output ONLY raw valid JSON array.
"""
            try:
                insights_data = query_agy(prompt, timeout=180)
                if isinstance(insights_data, list):
                    for item in insights_data:
                        if isinstance(item, dict):
                            c_num = item.get("chapterNumber")
                            ki = item.get("keyInsight", "").strip()
                            if ki:
                                # Find matching blink
                                for b in chunk:
                                    if b.get("chapterNumber") == c_num or b.get("order") == c_num:
                                        b["keyInsight"] = clean_quotes(ki)
                                        break
            except Exception as e:
                print(f"[{title}] Error fetching batch: {e}")

    # Clean quotes across all blinks, stories, and ideaCards
    for b in blinks:
        if b.get("keyInsight"):
            b["keyInsight"] = clean_quotes(b["keyInsight"])
        b["content"] = clean_quotes(b.get("content", ""))
        b["keyTakeaway"] = clean_quotes(b.get("keyTakeaway", ""))
        b["audioSnippetText"] = clean_quotes(b.get("audioSnippetText", ""))

    for s in book.get("stories", []):
        if "narrative" in s:
            s["narrative"] = clean_quotes(s["narrative"])

    for ic in book.get("ideaCards", []):
        ic["headline"] = clean_quotes(ic.get("headline", ""))
        ic["body"] = clean_quotes(ic.get("body", ""))
        if "quote" in ic and ic["quote"]:
            q = ic["quote"].strip()
            if not q.startswith('"') and not q.startswith("“"):
                q = f'"{q}"'
            ic["quote"] = q

    # Write back
    new_ts = f'import type {{ Book }} from "../../types/index.ts";\n\n{header}' + json.dumps(book, indent=2, ensure_ascii=False) + ";\n"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_ts)

    insights_filled = sum(1 for b in blinks if b.get("keyInsight"))
    return f"✅ {title} ({filename}): {insights_filled}/{len(blinks)} key insights populated, quotes cleaned."

def main():
    files = sorted(glob.glob(os.path.join(BOOKS_DIR, "*.ts")))
    print(f"Found {len(files)} books in {BOOKS_DIR}")

    completed = 0
    total = len(files)
    
    with ThreadPoolExecutor(max_workers=3) as executor:
        future_to_file = {executor.submit(process_book, f): f for f in files}
        for future in as_completed(future_to_file):
            completed += 1
            res = future.result()
            print(f"[{completed}/{total}] {res}")
            sys.stdout.flush()

    print("\n--- Synchronizing all books into allSeededBooks.json ---")
    all_books = []
    for f in sorted(glob.glob(os.path.join(BOOKS_DIR, "*.ts"))):
        with open(f, "r", encoding="utf-8") as fp:
            text = fp.read()
        m = re.search(r"export const [A-Za-z0-9_]+: Book = ", text)
        if m:
            chunk = text[m.end():text.rfind(";")].strip()
            try:
                all_books.append(json.loads(chunk))
            except:
                pass
    with open(os.path.join(WORKSPACE_DIR, "src/data/allSeededBooks.json"), "w", encoding="utf-8") as fp:
        json.dump(all_books, fp, indent=2, ensure_ascii=False)
    print(f"Saved {len(all_books)} books to allSeededBooks.json.")

    print("\n--- Building client & singlefile BookBox.html ---")
    subprocess.run(["npm", "run", "build"], cwd=WORKSPACE_DIR, check=True)
    subprocess.run(["npm", "run", "build:singlefile"], cwd=WORKSPACE_DIR, check=True)
    
    sf_src = os.path.join(WORKSPACE_DIR, "dist-singlefile/BookBox.html")
    for dest in [
        os.path.join(WORKSPACE_DIR, "BookBox.html"),
        os.path.join(WORKSPACE_DIR, "dist-singlefile/index.html"),
        os.path.join(WORKSPACE_DIR, "dist/BookBox.html"),
        os.path.join(WORKSPACE_DIR, "dist/index.html")
    ]:
        subprocess.run(["cp", sf_src, dest], check=True)
    print("✅ All distribution targets updated with fresh BookBox.html!")

if __name__ == "__main__":
    main()

