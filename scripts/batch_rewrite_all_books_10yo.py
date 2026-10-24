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
TRACKER_PATH = os.path.join(WORKSPACE_DIR, "src/data/rewritten_10yo_tracker.json")
AGY_BIN = "/opt/homebrew/bin/agy"

import threading
tracker_lock = threading.Lock()

def load_tracker():
    with tracker_lock:
        if os.path.exists(TRACKER_PATH):
            try:
                with open(TRACKER_PATH, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                return {}
        return {}

def mark_done(filename):
    with tracker_lock:
        data = {}
        if os.path.exists(TRACKER_PATH):
            try:
                with open(TRACKER_PATH, "r", encoding="utf-8") as f:
                    data = json.load(f)
            except Exception:
                pass
        data[filename] = "done"
        with open(TRACKER_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

def clean_quotes(s):
    if not isinstance(s, str):
        return s
    s = re.sub(r'\*\*"([^"]+)"\*\*', r'"\1"', s)
    s = re.sub(r"\*\*\'([^\']+)\'*\*", r'"\1"', s)
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
            start_arr = res.find("[")
            start_obj = res.find("{")
            
            # Find JSON
            if start_arr != -1 and (start_obj == -1 or start_arr < start_obj):
                end_arr = res.rfind("]")
                if end_arr != -1:
                    return json_repair.loads(res[start_arr:end_arr+1])
            elif start_obj != -1:
                end_obj = res.rfind("}")
                if end_obj != -1:
                    return json_repair.loads(res[start_obj:end_obj+1])
            return json_repair.loads(res)
        except Exception as e:
            if attempt == 2:
                print(f"Error querying agy: {e}", file=sys.stderr)
                return None
            time.sleep(2)
    return None

def process_book(filepath):
    filename = os.path.basename(filepath)
    tracker = load_tracker()
    
    # Already completed?
    if tracker.get(filename) == "done":
        return f"⏭️ {filename}: Already rewritten for 10yo"

    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()

    m = re.search(r"(export const [A-Za-z0-9_]+: Book = )", text)
    if not m:
        return f"⚠️ {filename}: Export statement not found"

    prefix = m.group(1)
    end_idx = text.rfind(";")
    json_str = text[m.end():end_idx].strip()

    try:
        book = json.loads(json_str)
    except Exception as e:
        return f"❌ {filename}: JSON parse error: {e}"

    title = book.get("title", filename)
    author = book.get("author", "Unknown")
    blinks = book.get("blinks", [])
    if not blinks:
        return f"⚠️ {filename}: No blinks found"

    print(f"🚀 Processing '{title}' ({len(blinks)} chapters)...")

    # Clean up non-existent top-level fields if any
    book.pop("subtitle", None)
    book.pop("description", None)

    # 1. Rewrite OnePageSummary in fun 10yo style
    ops = book.get("onePageSummary", {})
    pillars_sample = [p.get("title") if isinstance(p, dict) else str(p) for p in ops.get("keyPillars", [])[:4]]
    
    ops_prompt = f"""Rewrite the summary of the book '{title}' by {author} for a 10-year-old boy.
Tone: Super simple, exciting, fun, captivating (like discovering a secret video game cheat code or superpower). Zero academic jargon! Short sentences.
Key ideas: {', '.join(pillars_sample)}

Return a JSON object with:
{{
  "elevatorPitch": "1 punchy, exciting hook sentence",
  "coreThesis": "1-2 simple, memorable sentences explaining the big secret of the book",
  "executiveSummary": "2-3 fun paragraphs explaining the book like an awesome story with versatile everyday analogies (nature, sports, animals, food, household gadgets). Avoid focusing only on video games!"
}}
"""
    ops_res = query_agy(ops_prompt)
    if ops_res and isinstance(ops_res, dict):
        if "elevatorPitch" in ops_res:
            ops["elevatorPitch"] = clean_quotes(ops_res["elevatorPitch"])
        if "coreThesis" in ops_res:
            ops["coreThesis"] = clean_quotes(ops_res["coreThesis"])
        if "executiveSummary" in ops_res:
            ops["executiveSummary"] = clean_quotes(ops_res["executiveSummary"])

    # 2. Rewrite Chapters in chunks of 5
    chunk_size = 5
    for i in range(0, len(blinks), chunk_size):
        chunk = blinks[i:i+chunk_size]
        ch_inputs = []
        for b in chunk:
            ch_num = b.get("chapterNumber", b.get("order"))
            hl = b.get("headline", "")
            snip = b.get("content", "")[:300].replace("\n", " ")
            ch_inputs.append(f"Chapter {ch_num}: {hl}\nContext: {snip}...")

        prompt = f"""You are a master storyteller explaining big ideas from '{title}' by {author} to a 10-year-old boy.
Rewrite these {len(chunk)} chapters so they are fun, captivating, simple, and exciting.

Chapters to rewrite:
{chr(10).join(ch_inputs)}

STRICT RULES:
1. Language: Simple everyday words only. ZERO academic jargon (ban words like 'heuristic', 'epistemic', 'macroeconomic', 'dichotomy', 'psychological mechanism', 'paradigm').
2. Sentence length: Short and crisp (8-15 words).
3. Metaphors: Use generic and versatile everyday analogies (animals, nature, sports, bicycles, food, melting ice cream, magnets, dominoes, theme parks, playground games). DO NOT focus only on video games or gaming tropes.
4. Quotes: Always use clean double quotes (\"text\"), NEVER double asterisks (**\"text\"**).
5. Output format: Return a JSON array of {len(chunk)} objects:
[
  {{
    "chapterNumber": <int>,
    "headline": "Fun, catchy chapter title",
    "keyTakeaway": "One simple, memorable sentence",
    "keyInsight": "1-2 short, punchy paragraphs with the funny 'wow factor' (150 words)",
    "content": "Captivating deep dive story (3-4 fun paragraphs, easy to read, packed with awesome analogies and examples)",
    "audioSnippetText": "Two simple sentences summarizing the chapter"
  }}
]
"""
        ch_res = query_agy(prompt)
        if ch_res and isinstance(ch_res, list):
            res_by_num = {}
            for item in ch_res:
                if isinstance(item, dict) and "chapterNumber" in item:
                    res_by_num[item["chapterNumber"]] = item
            
            for b in chunk:
                num = b.get("chapterNumber", b.get("order"))
                updated = res_by_num.get(num)
                if updated:
                    if "headline" in updated:
                        b["headline"] = clean_quotes(updated["headline"])
                    if "keyTakeaway" in updated:
                        b["keyTakeaway"] = clean_quotes(updated["keyTakeaway"])
                    if "keyInsight" in updated:
                        b["keyInsight"] = clean_quotes(updated["keyInsight"])
                    if "content" in updated:
                        b["content"] = clean_quotes(updated["content"])
                    if "audioSnippetText" in updated:
                        b["audioSnippetText"] = clean_quotes(updated["audioSnippetText"])

    # 3. Clean quotes and difficult words in IdeaCards
    if "ideaCards" in book and book["ideaCards"]:
        for card in book["ideaCards"]:
            if "body" in card:
                card["body"] = clean_quotes(card["body"]).replace("macroeconomic", "big money").replace("epistemic", "knowledge").replace("heuristic", "rule of thumb").replace("dichotomy", "difference")
            if "quote" in card:
                card["quote"] = clean_quotes(card["quote"])

    # 4. Save updated book
    output_code = "import { Book } from '../../types';\n\n" + prefix + json.dumps(book, indent=2) + ";\n"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(output_code)

    mark_done(filename)
    return f"✅ {filename}: Successfully rewritten into fun 10yo style!"

def main():
    mark_done("psychologyOfMoneyExpanded.ts") # Already done manually with top quality
    tracker = load_tracker()

    all_files = sorted(glob.glob(os.path.join(BOOKS_DIR, "*Expanded.ts")))
    pending = [f for f in all_files if tracker.get(os.path.basename(f)) != "done"]

    print(f"📚 Total books: {len(all_files)}, Pending 10yo rewrites: {len(pending)}")

    max_workers = 4
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(process_book, fp): fp for fp in pending}
        for future in as_completed(futures):
            res = future.result()
            print(res)

if __name__ == "__main__":
    main()

