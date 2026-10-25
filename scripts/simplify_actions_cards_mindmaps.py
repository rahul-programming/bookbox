#!/usr/bin/env python3
"""
Simplify Language for Action Plans, Idea Cards, and Mind Maps across all catalog books.
Converts academic/dense jargon into crystal-clear, plain English with short sentences (8-14 words max).
"""

import os
import re
import json
import time
import glob
import argparse
import subprocess
import shutil
import json_repair

WORKSPACE_DIR = "/Users/rahulsharma/Documents/coding/myapps/bookbox"
BOOKS_DIR = os.path.join(WORKSPACE_DIR, "src/data/books")
CACHE_FILE = os.path.join(WORKSPACE_DIR, "cache/simplified_plain_language.json")

os.makedirs(os.path.join(WORKSPACE_DIR, "cache"), exist_ok=True)

def load_cache():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE) as f:
                return set(json.load(f))
        except Exception:
            return set()
    return set()

def save_cache(done_set):
    with open(CACHE_FILE, "w") as f:
        json.dump(sorted(list(done_set)), f, indent=2)

def log(msg):
    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{ts}] {msg}", flush=True)

def query_agy(prompt, timeout=120, effort="low", retries=1):
    for attempt in range(retries):
        try:
            cmd = [
                "/opt/homebrew/bin/agy",
                "--disable-slash-commands",
                "--effort", effort,
                "--dangerously-skip-permissions",
                "-p", prompt
            ]
            res = subprocess.run(cmd, cwd=WORKSPACE_DIR, capture_output=True, text=True, timeout=timeout)
            if res.returncode != 0:
                raise RuntimeError(f"agy error (code {res.returncode}): {res.stderr}")
            text = res.stdout.strip()
            m = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
            if m:
                text = m.group(1).strip()
            try:
                return json_repair.loads(text)
            except Exception:
                start = text.find('{')
                end = text.rfind('}')
                if start != -1 and end != -1:
                    return json_repair.loads(text[start:end+1])
                start_arr = text.find('[')
                end_arr = text.rfind(']')
                if start_arr != -1 and end_arr != -1:
                    return json_repair.loads(text[start_arr:end_arr+1])
                raise
        except Exception as e:
            if attempt == retries - 1:
                log(f"⚠️ agy query fallback on error: {e}")
                return {}
            time.sleep(1)

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

def simplify_action_items(action_items, title, author, category):
    prompt = f"""
Rewrite the language of these Action Items for "{title}" by {author} so it is SUPER SIMPLE, plain English, and easy to grasp.
Category: {category}

STRICT SIMPLICITY RULES:
1. Sentence length: 8 to 14 words max per sentence. No run-on sentences.
2. Words: Plain, everyday conversational English. ZERO academic/PhD jargon.
3. "title": Punchy, direct (3-6 words).
4. "description": 1-2 simple sentences explaining the practical habit clearly.
5. "stepByStep": 3-4 numbered direct steps ("1. Do this. 2. Ask that. 3. Check this.").
6. Keep all original "id", "category", "timeEstimateMinutes", "sourceChapter" fields exactly as they are.

Input action items:
{json.dumps(action_items, indent=2)}

Return JSON object: {{ "actionItems": [ ... ] }}
Output ONLY raw valid JSON.
"""
    res = query_agy(prompt)
    items = res.get("actionItems", [])
    if not isinstance(items, list) or len(items) == 0:
        return action_items
    
    # Merge to ensure ids and categories are preserved
    merged = []
    for idx, orig in enumerate(action_items):
        if idx < len(items) and isinstance(items[idx], dict):
            new_item = items[idx]
            merged.append({
                "id": orig.get("id", f"act-{idx+1}"),
                "title": new_item.get("title", orig.get("title", "")),
                "description": new_item.get("description", orig.get("description", "")),
                "category": orig.get("category", "daily-routine"),
                "timeEstimateMinutes": orig.get("timeEstimateMinutes", 10),
                "stepByStep": new_item.get("stepByStep", orig.get("stepByStep", [])),
                "sourceChapter": orig.get("sourceChapter", "")
            })
        else:
            merged.append(orig)
    return merged

def simplify_idea_cards(idea_cards, title, author, category):
    prompt = f"""
Rewrite the language of these Idea Cards for "{title}" by {author} so it is SUPER SIMPLE, crystal clear, and easy to grasp.
Category: {category}

STRICT SIMPLICITY RULES:
1. Sentence length: 8 to 14 words max. No complex multi-clause sentences.
2. Words: Everyday plain English. BAN all pretentious words (no "associative machinery", "subjective certainty", "heuristics", "computational", "epistemic asymmetry", "metabolic").
3. "headline": Short, punchy concept or mental model name (2-5 words).
4. "body": 2-3 short, clear sentences explaining the core concept in plain language.
5. "quote": Rewrite or simplify any dense academic quote into crystal-clear, plain conversational English (10-18 words max). No economic or academic jargon.
6. "actionItem": 1-2 direct, practical sentences showing what to do today.
7. Keep all other fields ("id", "bookId", "bookTitle", "author", "category", "type", "tags", "isStashed", "stashBoardIds", "createdAt") intact.

Input idea cards:
{json.dumps(idea_cards, indent=2)}

Return JSON object: {{ "ideaCards": [ ... ] }}
Output ONLY raw valid JSON.
"""
    res = query_agy(prompt)
    cards = res.get("ideaCards", [])
    if not isinstance(cards, list) or len(cards) == 0:
        return idea_cards
    
    merged = []
    for idx, orig in enumerate(idea_cards):
        if idx < len(cards) and isinstance(cards[idx], dict):
            new_c = cards[idx]
            body_raw = new_c.get("body", orig.get("body", ""))
            body_sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+|\n+', body_raw) if s.strip()]
            act_raw = new_c.get("actionItem", orig.get("actionItem", ""))
            act_sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+|\n+', act_raw) if s.strip()]
            quote_raw = new_c.get("quote", orig.get("quote", ""))
            merged.append({
                "id": orig.get("id", f"card-{idx+1}"),
                "bookId": orig.get("bookId", ""),
                "bookTitle": orig.get("bookTitle", title),
                "author": orig.get("author", author),
                "category": orig.get("category", category),
                "type": orig.get("type", "mental-model"),
                "headline": new_c.get("headline", orig.get("headline", "")),
                "body": "\n".join(body_sentences),
                "quote": clean_quotes(quote_raw),
                "actionItem": "\n".join(act_sentences),
                "tags": orig.get("tags", [category, "Core Insights"]),
                "isStashed": orig.get("isStashed", False),
                "stashBoardIds": orig.get("stashBoardIds", ["board-models"]),
                "createdAt": orig.get("createdAt", int(time.time() * 1000) + idx)
            })
        else:
            merged.append(orig)
    return merged

def split_into_readable_paragraphs(text, max_sentences=2):
    if not text or not isinstance(text, str):
        return text
    blocks = text.split('\n\n')
    new_blocks = []
    for b in blocks:
        b = b.strip()
        if not b:
            continue
        sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', b) if s.strip()]
        if len(sentences) <= max_sentences:
            new_blocks.append(' '.join(sentences))
        else:
            for i in range(0, len(sentences), max_sentences):
                chunk = sentences[i : i + max_sentences]
                new_blocks.append(' '.join(chunk))
    return '\n\n'.join(new_blocks)

def format_mindmap_sentences_newline(node):
    if not isinstance(node, dict):
        return node
    if "description" in node and isinstance(node["description"], str):
        desc = node["description"].strip()
        if desc:
            sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+|\n+', desc) if s.strip()]
            node["description"] = "\n".join(sentences)
    if "children" in node and isinstance(node["children"], list):
        for child in node["children"]:
            format_mindmap_sentences_newline(child)
    return node

def simplify_mind_map(mind_map, title, author, category):
    prompt = f"""
Rewrite the "label" and "description" fields in this hierarchical mind map for "{title}" by {author} so the language is SUPER SIMPLE and easy to grasp.
Category: {category}

STRICT SIMPLICITY RULES:
1. "label": Short, clean, punchy (2-4 words).
2. "description": 1-2 short, simple sentences (maximum 20-25 words total per node). Plain everyday words. No academic jargon.
3. CRITICAL: Every sentence in "description" MUST be on its own line separated by a newline character (\\n).
4. Keep the exact tree structure, hierarchy, and all "id" fields unchanged.

Input tree:
{json.dumps(mind_map, indent=2)}

Return JSON object: {{ "mindMap": {{ ... }} }}
Output ONLY raw valid JSON.
"""
    res = query_agy(prompt, timeout=120)
    tree = res.get("mindMap", res)
    if isinstance(tree, dict) and "id" in tree:
        return format_mindmap_sentences_newline(tree)
    return format_mindmap_sentences_newline(mind_map)

def process_book(filepath):
    basename = os.path.basename(filepath)
    with open(filepath) as f:
        content = f.read()

    m = re.search(r"export const (\w+): Book = ({.*});?\s*$", content, re.DOTALL)
    if not m:
        log(f"Cannot parse export statement in {basename}.")
        return False

    const_name = m.group(1)
    data = json.loads(m.group(2))

    book_id = data["id"]
    title = data["title"]
    author = data["author"]
    category = data.get("category", "Psychology")

    log(f"Simplifying '{title}' by {author} [{category}]...")

    # 1. Simplify Action Items
    if "actionItems" in data and len(data["actionItems"]) > 0:
        log("  - Simplifying 12 Action Items...")
        data["actionItems"] = simplify_action_items(data["actionItems"], title, author, category)

    # 2. Simplify Idea Cards
    if "ideaCards" in data and len(data["ideaCards"]) > 0:
        log("  - Simplifying 20 Idea Cards...")
        data["ideaCards"] = simplify_idea_cards(data["ideaCards"], title, author, category)

    # 3. Simplify Mind Map (each sentence on new line)
    if "mindMap" in data and isinstance(data["mindMap"], dict):
        log("  - Simplifying Mind Map tree (sentence per line)...")
        data["mindMap"] = simplify_mind_map(data["mindMap"], title, author, category)

    # 4. Format paragraph lengths for readability
    if "onePageSummary" in data and isinstance(data["onePageSummary"], dict):
        s = data["onePageSummary"]
        if "executiveSummary" in s and isinstance(s["executiveSummary"], str):
            s["executiveSummary"] = split_into_readable_paragraphs(s["executiveSummary"], max_sentences=3)
        if "elevatorPitch" in s and isinstance(s["elevatorPitch"], str):
            s["elevatorPitch"] = split_into_readable_paragraphs(s["elevatorPitch"], max_sentences=2)

    if "blinks" in data and isinstance(data["blinks"], list):
        for blink in data["blinks"]:
            if isinstance(blink, dict):
                if "keyInsight" in blink and isinstance(blink["keyInsight"], str):
                    blink["keyInsight"] = split_into_readable_paragraphs(blink["keyInsight"], max_sentences=2)
                if "content" in blink and isinstance(blink["content"], str):
                    blink["content"] = split_into_readable_paragraphs(blink["content"], max_sentences=3)

    if "stories" in data and isinstance(data["stories"], list):
        for story in data["stories"]:
            if isinstance(story, dict) and "narrative" in story and isinstance(story["narrative"], str):
                story["narrative"] = split_into_readable_paragraphs(story["narrative"], max_sentences=3)

    # Re-write file
    new_ts = f"""// {title} by {author}
// Category-Attuned Synthesis with Super-Simple Language and Readable Paragraphs

import {{ Book }} from '../../types';

export const {const_name}: Book = {json.dumps(data, indent=2)};
"""
    with open(filepath, "w") as f:
        f.write(new_ts)

    log(f"  ✅ Updated {basename} with simplified language & readability breaks!")
    return True

def main():
    parser = argparse.ArgumentParser(description="Simplify language for action plans, cards, and mind maps.")
    parser.add_argument("--book", help="Single book id to process")
    args = parser.parse_args()

    done_set = load_cache()
    files = sorted(glob.glob(os.path.join(BOOKS_DIR, "*.ts")))

    if args.book:
        target_files = []
        for fp in files:
            with open(fp) as f:
                t = f.read()
            m = re.search(r'"id":\s*"([^"]+)"', t)
            if m and m.group(1) == args.book:
                target_files.append(fp)
        if not target_files:
            log(f"Book with id '{args.book}' not found.")
            return
        files = target_files

    log(f"Targeting {len(files)} book(s). Already simplified: {len(done_set)}.")

    processed = 0
    src_single = os.path.join(WORKSPACE_DIR, "dist-singlefile/BookBox.html")

    for fp in files:
        with open(fp) as f:
            t = f.read()
        m = re.search(r'"id":\s*"([^"]+)"', t)
        if not m:
            continue
        bid = m.group(1)

        if not args.book and bid in done_set:
            continue

        try:
            if process_book(fp):
                processed += 1
                done_set.add(bid)
                save_cache(done_set)

                log("Verifying TypeScript build with 'npm run build'...")
                subprocess.run(["npm", "run", "build"], cwd=WORKSPACE_DIR, check=True)
                log("Building standalone singlefile (npm run build:singlefile)...")
                subprocess.run(["npm", "run", "build:singlefile"], cwd=WORKSPACE_DIR, check=True)
                if os.path.exists(src_single):
                    shutil.copy2(src_single, os.path.join(WORKSPACE_DIR, "BookBox.html"))
                    shutil.copy2(src_single, os.path.join(WORKSPACE_DIR, "dist/BookBox.html"))
                    log("Standalone singlefile updated at BookBox.html!")

        except Exception as e:
            log(f"❌ Error processing {bid}: {e}")

    log(f"Finished simplification pass! ({processed} books newly simplified).")

if __name__ == "__main__":
    main()

