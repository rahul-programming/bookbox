#!/usr/bin/env python3
"""
BookBox Complete Catalog Category-Attuned Rewriting Engine
Rewrites entire books (1-page summary, deep dive chapters, key insights, visual diagrams,
narrative case studies, tactical action items, reflection exercises, atomic idea cards,
and hierarchical mind maps) adhering to:
1. Category-Attuned Tonal Calibration (Fiction/Novel, Finance, Productivity, Philosophy, Science, Strategy).
2. Plain, accessible English (short sentences 8-15 words, zero academic or PhD syllabus jargon).
3. Universal, mature real-world analogies (no 10yo child/playground tropes, no gaming clichés).
4. Clean double quotes ("text", NEVER **text** or **"text"**).
5. Full 20% character depth and rich detail.
"""

import os
import sys
import glob
import json
import re
import subprocess
import time
import argparse
import shutil

WORKSPACE_DIR = "/Users/rahulsharma/Documents/coding/myapps/bookbox"
BOOKS_DIR = os.path.join(WORKSPACE_DIR, "src/data/books")
CACHE_FILE = os.path.join(WORKSPACE_DIR, "cache/catalog_complete_rewrites.json")
DRAFTS_DIR = os.path.join(WORKSPACE_DIR, "cache/rewrite_drafts")

os.makedirs(os.path.join(WORKSPACE_DIR, "cache"), exist_ok=True)
os.makedirs(DRAFTS_DIR, exist_ok=True)

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

def query_agy(prompt, timeout=360, effort="low", retries=2):
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
            import json_repair
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
        except subprocess.TimeoutExpired:
            log(f"⚠️ agy command timed out on attempt {attempt+1}/{retries}. Retrying...")
            if attempt == retries - 1:
                raise
        except Exception as e:
            if attempt == retries - 1:
                raise
            log(f"⚠️ agy command failed ({e}) on attempt {attempt+1}/{retries}. Retrying...")
            time.sleep(2)

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

def clean_analogies(text):
    if not isinstance(text, str):
        return text
    replacements = [
        (r"\ban?\s+epic\s+boss\s+battles?\b", "a huge challenge"),
        (r"\bboss\s+battles\b", "giant hurdles"),
        (r"\bboss\s+battle\b", "giant hurdle"),
        (r"\ba\s+video\s+game\s+cheat\s+code\b", "a clever secret shortcut"),
        (r"\bvideo\s+game\s+cheat\s+codes?\b", "clever secret shortcuts"),
        (r"\ba\s+cheat\s+code\b", "a clever shortcut"),
        (r"\bcheat\s+codes\b", "clever shortcuts"),
        (r"\bcheat\s+code\b", "clever shortcut"),
        (r"\bhealth\s+bars\b", "energy tanks"),
        (r"\bhealth\s+bar\b", "energy tank"),
        (r"\bmultiplayer\s+maps\b", "giant playgrounds"),
        (r"\bmultiplayer\s+map\b", "giant playground"),
        (r"\bmultiplayer\s+games\b", "team sports"),
        (r"\bmultiplayer\s+game\b", "team sport"),
        (r"\bgame\s+controllers\b", "steering wheels"),
        (r"\bgame\s+controller\b", "steering wheel"),
        (r"\boverheating\s+consoles\b", "smoking engines"),
        (r"\boverheating\s+console\b", "smoking engine"),
        (r"\bRPG\s+hero\s+skins?\b", "adventurer outfits"),
        (r"\bRPG\s+heroes\b", "daring explorers"),
        (r"\bRPG\s+hero\b", "daring explorer"),
        (r"\bRPGs\b", "epic adventures"),
        (r"\bRPG\b", "adventure"),
        (r"\bvideo\s+games\b", "fun sports"),
        (r"\bvideo\s+game\b", "fun game"),
        (r"\blevels\s+up\b", "powers up"),
        (r"\bleveled\s+up\b", "powered up"),
        (r"\bleveling\s+up\b", "powering up"),
        (r"\blevel\s+up\b", "power up"),
        (r"\brespawning\b", "bouncing back"),
        (r"\brespawns\b", "bounces back"),
        (r"\brespawn\b", "bounce back"),
        (r"\bXP\s+points?\b", "spark points"),
        (r"\bXP\b", "spark points"),
        (r"\b10-year-old boys?\b", "readers"),
        (r"\ba 10-year-old\b", "anyone"),
        (r"\bplayground soccer teams?\b", "sports teams"),
        (r"\bplayground soccer\b", "sports"),
        (r"\bplayground\b", "real world"),
        (r"\btoy blocks?\b", "building blocks"),
        (r"\btoy box\b", "storage box"),
        (r"\bmath worksheets?\b", "worksheets"),
        (r"\bhomework tasks?\b", "daily tasks"),
        (r"\bhomework\b", "daily projects"),
        (r"\bfreeze rays?\b", "cold numbness"),
        (r"\btoy robots?\b", "automaton"),
    ]
    for pattern, repl in replacements:
        text = re.sub(pattern, repl, text, flags=re.IGNORECASE)
    return text

def sanitize_value(v):
    if isinstance(v, str):
        return clean_quotes(clean_analogies(v))
    elif isinstance(v, list):
        return [sanitize_value(item) for item in v]
    elif isinstance(v, dict):
        return {k: sanitize_value(val) for k, val in v.items()}
    return v

def get_category_tone_instruction(category, subcategory, title):
    cat_lower = (category or "").lower()
    sub_lower = (subcategory or "").lower()
    title_lower = (title or "").lower()
    
    if any(k in title_lower for k in ["forty rules of love", "novel", "story of", "alchemist", "fiction"]) or "fiction" in cat_lower or "literature" in sub_lower:
        return """CATEGORY-ATTUNED TONE — NOVELS / FICTION / LITERARY WORKS:
- Voice: Poetic, evocative, emotionally resonant, narrative-driven, soulful, observant.
- Focus: Character transformation, emotional conflicts, empathy, love, human vulnerability, relationships, spiritual awakening.
- Tone: Like a gifted novelist sharing profound truths about the human heart through story. NOT clinical, corporate, or self-help jargon."""
    
    if "finance" in cat_lower or "wealth" in sub_lower or "money" in title_lower or any(k in title_lower for k in ["invest", "wealth", "capital", "almanack"]):
        return """CATEGORY-ATTUNED TONE — FINANCE / WEALTH / ECONOMICS:
- Voice: Prudent, grounded, candid, sobering, street-smart, calm.
- Focus: Risk management, survival, emotional discipline, compounding, human folly and greed, true independence over flashy status.
- Tone: Like a seasoned, unshakeable mentor giving candid advice on how money and human nature actually behave. Realistic, unvarnished practical wisdom."""
        
    if "productivity" in cat_lower or any(k in title_lower for k in ["habits", "deep work", "ultralearning", "limitless", "make it stick", "checklist"]):
        return """CATEGORY-ATTUNED TONE — PRODUCTIVITY / HABITS / PERSONAL GROWTH:
- Voice: Energizing, empowering, practical, encouraging, momentum-building.
- Focus: Overcoming inertia, daily routines, environment design, actionable protocols, agency.
- Tone: Like a world-class coach breaking down big goals into effortless daily steps. Crisp, motivating, focused on tangible progress and removing friction."""

    if "philosophy" in cat_lower or any(k in sub_lower for k in ["stoic", "values", "ikigai"]) or any(k in title_lower for k in ["meditations", "clear thinking", "scout mindset"]):
        return """CATEGORY-ATTUNED TONE — PHILOSOPHY / STOICISM / MINDFULNESS:
- Voice: Contemplative, profound, serene, timeless, clarifying, stoic.
- Focus: Inner peace, duty, emotional self-mastery, perspective, truth over ego, equanimity.
- Tone: Like a wise philosopher reflecting quietly beside a calm mountain lake. Measured, calm, quiet reflection, deep clarity."""

    if "strategy" in cat_lower or "leadership" in cat_lower or any(k in title_lower for k in ["power", "decide", "decision", "superforecasting", "skin in the game", "black swan"]):
        return """CATEGORY-ATTUNED TONE — STRATEGY / DECISION-MAKING / LEADERSHIP:
- Voice: Sharp, incisive, tactical, clear-eyed, unsentimental.
- Focus: Competitive moats, incentives, skin in the game, asymmetrical risk, sound execution under uncertainty.
- Tone: Like a master strategist outlining the chessboard with total clarity. Decisive, analytical, razor-sharp."""
        
    return """CATEGORY-ATTUNED TONE — SCIENCE / PSYCHOLOGY / SYSTEMS:
- Voice: Curious, illuminating, wonder-filled, lucid, investigative.
- Focus: Hidden patterns, feedback loops, cognitive quirks, interconnected dynamics.
- Tone: Like an enthusiastic scientist showing you the secret mechanics behind everyday reality. Engaging, eye-opening."""

def to_camel_case(s):
    parts = re.sub(r'[^a-zA-Z0-9]+', ' ', s).split()
    if not parts:
        return 'book'
    return parts[0].lower() + ''.join(p.capitalize() for p in parts[1:])

def to_screaming_snake(s):
    cleaned = re.sub(r'[^a-zA-Z0-9]+', '_', s).strip('_')
    if cleaned and cleaned[0].isdigit():
        num_map = {'0': 'ZERO', '1': 'ONE', '2': 'TWO', '3': 'THREE', '4': 'FOUR',
                   '5': 'FIVE', '6': 'SIX', '7': 'SEVEN', '8': 'EIGHT', '9': 'NINE'}
        cleaned = num_map.get(cleaned[0], 'NUM') + '_' + cleaned[1:]
    return cleaned.upper() + '_BOOK'

def get_expected_import_names():
    seed_path = os.path.join(WORKSPACE_DIR, "src/data/seedBooks.ts")
    name_map = {}
    if os.path.exists(seed_path):
        with open(seed_path) as f:
            content = f.read()
        for m in re.finditer(r"import\s+\{\s*([A-Za-z0-9_]+)\s*\}\s+from\s+[\'\"]\./books/([A-Za-z0-9_]+)[\'\"]", content):
            name_map[m.group(2)] = m.group(1)
    return name_map

def sanitize_blinks(raw_blinks, book_id, chapters):
    sanitized = []
    ch_dict = {c["chapterNumber"]: c["title"] for c in chapters}
    for b in raw_blinks:
        ch_num = b.get("chapterNumber")
        if not ch_num:
            continue
        order = ch_num
        canonical_title = ch_dict.get(ch_num, f"Chapter {ch_num}")
        headline = clean_quotes(clean_analogies(b.get("headline", canonical_title)))
        key_insight = clean_quotes(clean_analogies(b.get("keyInsight", "")))
        content = clean_quotes(clean_analogies(b.get("content", "")))
        key_takeaway = clean_quotes(clean_analogies(b.get("keyTakeaway", "")))
        audio_snippet = clean_quotes(clean_analogies(b.get("audioSnippetText", "")))
        diagram = b.get("diagram", {})
        if not isinstance(diagram, dict) or not diagram.get("type"):
            diagram = {
                "type": "cycle",
                "title": f"Core Dynamic: {headline}",
                "caption": "Step-by-step reinforcement loop of the chapter's core concept.",
                "nodes": [
                    {"id": "n1", "label": "Initial Cue / Trigger", "sublabel": "Contextual Signal", "color": "blue"},
                    {"id": "n2", "label": "Mechanism of Action", "sublabel": "Active Intervention", "color": "emerald"},
                    {"id": "n3", "label": "Compounding Outcome", "sublabel": "Structural Advantage", "color": "purple"}
                ]
            }
        sanitized.append({
            "id": f"{book_id}-ch-{ch_num}",
            "order": order,
            "chapterNumber": ch_num,
            "headline": headline,
            "keyInsight": key_insight,
            "content": content,
            "keyTakeaway": key_takeaway,
            "audioSnippetText": audio_snippet,
            "diagram": diagram
        })
    sanitized.sort(key=lambda x: x["chapterNumber"])
    return sanitized

def sanitize_action_items(raw_items, book_id):
    valid_categories = {'quick-win', 'daily-routine', 'environment', 'audit', 'system'}
    sanitized = []
    for i, it in enumerate(raw_items):
        cat = it.get("category", "quick-win")
        if cat not in valid_categories:
            cat = "quick-win"
        steps = it.get("stepByStep", [])
        if not isinstance(steps, list) or len(steps) == 0:
            steps = ["Identify friction point", "Apply the protocol", "Review progress"]
        sanitized.append({
            "id": f"{book_id}-act-{i+1}",
            "title": clean_quotes(clean_analogies(it.get("title", f"Protocol {i+1}"))),
            "description": clean_quotes(clean_analogies(it.get("description", ""))),
            "category": cat,
            "timeEstimateMinutes": int(it.get("timeEstimateMinutes", 15)),
            "stepByStep": [clean_quotes(clean_analogies(s)) for s in steps],
            "sourceChapter": it.get("sourceChapter", "Key Concept")
        })
    return sanitized

def sanitize_stories(raw_stories, book_id):
    sanitized = []
    for i, st in enumerate(raw_stories):
        narrative = clean_quotes(clean_analogies(st.get("narrative", "")))
        sanitized.append({
            "id": f"{book_id}-story-{i+1}",
            "title": clean_quotes(clean_analogies(st.get("title", f"Case Study {i+1}"))),
            "charactersOrSubject": st.get("charactersOrSubject", "Key Subject"),
            "historicalPeriodOrSetting": st.get("historicalPeriodOrSetting", "Modern Era"),
            "narrative": narrative,
            "coreLesson": clean_quotes(clean_analogies(st.get("coreLesson", ""))),
            "sourceChapter": st.get("sourceChapter", "Core Principles")
        })
    return sanitized

def sanitize_reflections(raw_refs, book_id):
    sanitized = []
    for i, rf in enumerate(raw_refs):
        sanitized.append({
            "id": f"{book_id}-ref-{i+1}",
            "chapterOrder": int(rf.get("chapterOrder", i+1)),
            "title": clean_quotes(clean_analogies(rf.get("title", f"Reflection {i+1}"))),
            "prompt": clean_quotes(clean_analogies(rf.get("prompt", ""))),
            "placeholder": clean_quotes(clean_analogies(rf.get("placeholder", "Reflect on this concept in your life...")))
        })
    return sanitized

def sanitize_idea_cards(raw_cards, book_id, title, author, category):
    valid_types = {'mental-model', 'concept', 'actionable', 'quote'}
    sanitized = []
    for i, cd in enumerate(raw_cards):
        ctype = cd.get("type", "concept")
        if ctype not in valid_types:
            ctype = "concept"
        sanitized.append({
            "id": f"{book_id}-card-{i+1}",
            "bookId": book_id,
            "bookTitle": title,
            "author": author,
            "category": category,
            "type": ctype,
            "headline": clean_quotes(clean_analogies(cd.get("headline", ""))),
            "body": clean_quotes(clean_analogies(cd.get("body", ""))),
            "quote": clean_quotes(clean_analogies(cd.get("quote", ""))) if cd.get("quote") else None,
            "actionItem": clean_quotes(clean_analogies(cd.get("actionItem", ""))) if cd.get("actionItem") else None,
            "tags": [category, "Core Insights"],
            "isStashed": False,
            "stashBoardIds": ["board-models"],
            "createdAt": int(time.time() * 1000) + i * 1000
        })
    return sanitized

def sanitize_mind_map(raw_map, title):
    if not isinstance(raw_map, dict) or not raw_map.get("label"):
        return {
            "id": "root",
            "label": title,
            "description": f"Core foundational architecture and mental model network of {title}.",
            "children": [
                {
                    "id": "pillar-1",
                    "label": "Foundation",
                    "description": "The essential mechanics and foundational tenets.",
                    "children": []
                }
            ]
        }
    def clean_node(node):
        node["label"] = clean_quotes(clean_analogies(node.get("label", "")))
        node["description"] = clean_quotes(clean_analogies(node.get("description", "")))
        if "children" in node and isinstance(node["children"], list):
            for ch in node["children"]:
                clean_node(ch)
    clean_node(raw_map)
    return raw_map

def rewrite_book_complete(filepath):
    basename = os.path.basename(filepath)
    with open(filepath) as f:
        content = f.read()
    
    m = re.search(r"export const (\w+): Book = ({.*});?\s*$", content, re.DOTALL)
    if not m:
        log(f"Skipping {basename}: cannot parse export statement.")
        return False
    
    const_name = m.group(1)
    data = json.loads(m.group(2))
    
    book_id = data["id"]
    title = data["title"]
    author = data["author"]
    category = data.get("category", "Psychology")
    subcategory = data.get("subcategory", "")
    tone_instruction = get_category_tone_instruction(category, subcategory, title)
    
    draft_file = os.path.join(DRAFTS_DIR, f"{book_id}.json")
    draft = {}
    if os.path.exists(draft_file):
        try:
            with open(draft_file) as f:
                draft = json.load(f)
            log(f"Found existing draft for '{title}' ({list(draft.keys())}).")
        except Exception:
            draft = {}

    log(f"\n=======================================================")
    log(f"Synthesizing '{title}' by {author} [{category} / {subcategory}]")
    log(f"=======================================================")

    # STAGE 1: TOC and OnePageSummary
    if "toc" not in draft:
        log("Stage 1/5: Generating Table of Contents & 1-Page Summary...")
        toc_prompt = f"""
Analyze the canonical published book "{title}" by {author}.
Category: {category} ({subcategory})

{tone_instruction}

Explain this book in simple, crystal-clear plain English (short crisp sentences 8-15 words, zero academic syllabus jargon).
Use versatile, generic everyday analogies matching the category tone.
CRITICAL: Do NOT focus on children or a 10-year-old boy! Keep it mature, universally relatable, and sharp for any everyday adult reader. Avoid gaming clichés.

Return a strict JSON object with:
1. "publishedYear": number
2. "totalChapters": number (the exact count of chapters in the original published Table of Contents)
3. "chapters": array of objects for EVERY single chapter in the book's official Table of Contents:
   [
     {{ "chapterNumber": 1, "title": "Exact Canonical Title", "summaryTheme": "Key theme" }}
   ]
4. "onePageSummary": object containing:
   - "elevatorPitch": string (1-2 punchy, exciting hook sentences aligned with category tone)
   - "executiveSummary": string (2-3 compelling, insightful paragraphs with crisp, universal everyday analogies)
   - "coreThesis": string (1-2 simple, memorable sentences)
   - "keyPillars": array of 4-6 objects {{ "title": string, "description": string, "actionableTakeaway": string }}
   - "frameworkName": string
   - "frameworkSummary": string
   - "frameworkSteps": array of 3-5 objects {{ "step": number, "name": string, "summary": string, "executionTip": string }}
   - "readingRoadmap": array of 3 objects {{ "goalOrAudience": string, "recommendedChapters": string, "rationale": string }}
   - "strengths": array of 3 strings
   - "blindSpotsAndCounterarguments": array of 3 strings

Output ONLY valid raw JSON without preamble.
"""
        toc_data = query_agy(toc_prompt)
        draft["toc"] = toc_data
        with open(draft_file, "w") as f:
            json.dump(draft, f, indent=2)
        log(f"Stage 1/5 complete: Extracted {len(toc_data.get('chapters', []))} chapters.")
    else:
        log("Stage 1/5: (Cached) TOC and 1-Page Summary loaded.")

    chapters = draft["toc"].get("chapters", [])
    if not chapters:
        chapters = [{"chapterNumber": 1, "title": "Foundations"}]

    # STAGE 2: Chapter Blinks (Deep Dives, Key Insights & Diagrams)
    if "blinks" not in draft:
        draft["blinks"] = []

    raw_blinks = draft.get("blinks", [])
    seen_ch = set(b.get("chapterNumber") for b in raw_blinks if isinstance(b, dict))
    missing_chapters = [c for c in chapters if c["chapterNumber"] not in seen_ch]

    if missing_chapters:
        log(f"Stage 2/5: Generating missing chapters ({len(seen_ch)} / {len(chapters)} done)...")
        batch_size = 3
        for b_idx in range(0, len(missing_chapters), batch_size):
            batch = missing_chapters[b_idx : b_idx + batch_size]
            ch_list_str = "\n".join([f"- Chapter {c['chapterNumber']}: {c['title']}" for c in batch])
            blinks_prompt = f"""
You are a master communicator explaining big ideas from "{title}" by {author} in crystal-clear, plain English.
Category: {category} ({subcategory})

{tone_instruction}

Synthesize captivating, simple, and exciting blinks for these chapters:
{ch_list_str}

STRICT RULES (PLAIN ENGLISH & CATEGORY-ATTUNED ANALOGIES — ZERO ACADEMIC JARGON):
1. Language: Simple everyday words only. Short and crisp sentences (8-15 words). ZERO academic/PhD jargon.
2. Metaphors: Use versatile, generic real-world analogies matching the genre.
   CRITICAL: Do NOT focus on children or a 10-year-old boy! No playground, no homework, no toys, no childish tone.
   CRITICAL: Do NOT rely on video games or gaming tropes (no cheat codes, boss battles, multiplayer maps, health bars).
3. Quotes: Always use clean double quotes ("text"), NEVER double asterisks (**"text"** or **text**).
4. "content": Captivating deep dive story (3-5 engaging paragraphs, easy to read, packed with awesome analogies and real-world examples). NOT a dry lecture or syllabus content!
5. "keyInsight": Short, punchy, witty 'wow factor' of the chapter (150-250 words / 800-1200 chars). NOT a summary! Must highlight the counterintuitive truth or paradox in simple, sharp, entertaining language.
6. Diagram: Every chapter MUST include a typed diagram object with simple, clear labels:
  - type MUST be one of: "cycle", "flow", "matrix", "comparison", "timeline"
  - title: string
  - caption: string
  - For cycle/flow/timeline: "nodes": [{{"id": "n1", "label": string, "sublabel": string, "color": "blue"|"emerald"|"indigo"|"amber"|"purple"|"rose"}}]
  - For matrix: "quadrants": [{{"title": string, "description": string, "color": "emerald"|"blue"|"amber"|"purple"}}]
  - For comparison: "comparison": {{"sideA": {{"title": string, "items": [string]}}, "sideB": {{"title": string, "items": [string]}}}}

Return a JSON array of objects:
[
  {{
    "id": "{book_id}-ch-N",
    "order": N,
    "chapterNumber": N,
    "headline": "Captivating chapter title matching book tone",
    "keyInsight": "Short, punchy, witty 'wow factor' of the chapter (150-250 words)...",
    "content": "Captivating deep dive story (3-5 fun paragraphs, easy to read, packed with awesome analogies)...",
    "keyTakeaway": "One simple, memorable sentence...",
    "audioSnippetText": "Two simple sentences summarizing the chapter...",
    "diagram": {{ ... }}
  }}
]
Output ONLY raw valid JSON array.
"""
            batch_blinks = query_agy(blinks_prompt, timeout=600, effort="low")
            new_items = []
            if isinstance(batch_blinks, list):
                new_items = [x for x in batch_blinks if isinstance(x, dict) and x.get("chapterNumber")]
            elif isinstance(batch_blinks, dict) and "blinks" in batch_blinks:
                new_items = [x for x in batch_blinks["blinks"] if isinstance(x, dict) and x.get("chapterNumber")]

            for item in new_items:
                raw_blinks.append(item)
            draft["blinks"] = raw_blinks
            with open(draft_file, "w") as f:
                json.dump(draft, f, indent=2)
            log(f"Stage 2/5 Progress: {len(set(b['chapterNumber'] for b in raw_blinks))} / {len(chapters)} chapters completed.")
    else:
        log("Stage 2/5: (Cached) All chapter blinks already generated.")

    # STAGE 3: Stories & Tactical Action Items
    if "stories" not in draft:
        draft["stories"] = []
    if "actionItems" not in draft:
        draft["actionItems"] = []

    if len(draft.get("stories", [])) < 5:
        log("Stage 3A/5: Generating Stories 1-5 (Category-Attuned Real-World Style)...")
        prompt_s1 = f"""
Generate 5 real-world case studies/stories (Stories 1 to 5) for "{title}" by {author}.
Category: {category} ({subcategory})
{tone_instruction}

Written in simple, gripping, plain English like a compelling real-world narrative. Universally relatable, zero academic jargon, not juvenile or child-centric.
- Real companies, historical figures, or literary/scientific narratives proving the book's core ideas.
- Each narrative must be 400-800 words in length.
- STRICT: Use clean quotation marks "text", NEVER **text** or **"text"**.
- Schema:
  {{
    "id": "story-N",
    "title": "Compelling Title",
    "charactersOrSubject": "Key protagonist or company",
    "historicalPeriodOrSetting": "Era or context",
    "narrative": "Detailed, multi-paragraph story with concrete stakes and resolution...",
    "coreLesson": "The overarching takeaway...",
    "sourceChapter": "Chapter X"
  }}

Return JSON object: {{ "stories": [story-1, story-2, story-3, story-4, story-5] }}
Output ONLY raw valid JSON.
"""
        s1_data = query_agy(prompt_s1, effort="low")
        s1_list = s1_data.get("stories", [])
        if isinstance(s1_list, list):
            draft["stories"].extend(s1_list)
            with open(draft_file, "w") as f:
                json.dump(draft, f, indent=2)

    if len(draft.get("stories", [])) < 10:
        log(f"Stage 3B/5: Generating Stories 6-10 ({len(draft['stories'])} already done)...")
        prompt_s2 = f"""
Generate 5 real-world case studies/stories (Stories 6 to 10) for "{title}" by {author}.
Category: {category} ({subcategory})
{tone_instruction}

Written in simple, gripping, plain English like a compelling real-world narrative. Universally relatable, zero academic jargon, not juvenile or child-centric.
- Real companies, historical figures, or literary/scientific narratives proving the book's core ideas.
- Each narrative must be 400-800 words in length.
- STRICT: Use clean quotation marks "text", NEVER **text** or **"text"**.
- Schema:
  {{
    "id": "story-N",
    "title": "Compelling Title",
    "charactersOrSubject": "Key protagonist or company",
    "historicalPeriodOrSetting": "Era or context",
    "narrative": "Detailed, multi-paragraph story with concrete stakes and resolution...",
    "coreLesson": "The overarching takeaway...",
    "sourceChapter": "Chapter X"
  }}

Return JSON object: {{ "stories": [story-6, story-7, story-8, story-9, story-10] }}
Output ONLY raw valid JSON.
"""
        s2_data = query_agy(prompt_s2, effort="low")
        s2_list = s2_data.get("stories", [])
        if isinstance(s2_list, list):
            draft["stories"].extend(s2_list)
            with open(draft_file, "w") as f:
                json.dump(draft, f, indent=2)

    if len(draft.get("actionItems", [])) < 12:
        log("Stage 3C/5: Generating 12 tactical action items...")
        prompt_act = f"""
Generate 12 tactical action items for "{title}" by {author}.
Category: {category} ({subcategory})
{tone_instruction}

Written in simple, clear plain English with practical everyday habits and real-world routines matching the book's category.
- 12 items spanning all 5 categories: "quick-win", "daily-routine", "environment", "audit", "system"
- Schema:
  {{
    "id": "act-N",
    "title": "Action Item Title",
    "description": "Why and what in simple words...",
    "category": "quick-win"|"daily-routine"|"environment"|"audit"|"system",
    "timeEstimateMinutes": number,
    "stepByStep": ["Step 1", "Step 2", "Step 3", "Step 4"],
    "sourceChapter": "Chapter X"
  }}

Return JSON object: {{ "actionItems": [...] }}
Output ONLY raw valid JSON.
"""
        act_data = query_agy(prompt_act, effort="low")
        draft["actionItems"] = act_data.get("actionItems", [])
        with open(draft_file, "w") as f:
            json.dump(draft, f, indent=2)

    # STAGE 4: Reflection Exercises & Idea Cards
    if "reflectionExercises" not in draft or "ideaCards" not in draft:
        log("Stage 4/5: Generating 10 reflection exercises and 20 atomic idea cards...")
        cards_prompt = f"""
Generate 10 reflection exercises and 20 atomic idea cards for "{title}" by {author}.
Category: {category} ({subcategory})
{tone_instruction}

In simple, punchy, elegant language matching the category tone.
STRICT: All quotes must use clean double quotation marks "text", NEVER **text** or **"text"**.

1. "reflectionExercises": 10 deep self-inquiry prompts.
   Schema: {{ "id": "ref-N", "chapterOrder": N, "title": string, "prompt": string, "placeholder": string }}

2. "ideaCards": 20 atomic idea cards across "mental-model", "concept", "actionable", "quote".
   Schema:
   {{
     "id": "{book_id}-card-N",
     "bookId": "{book_id}",
     "bookTitle": "{title}",
     "author": "{author}",
     "type": "mental-model"|"concept"|"actionable"|"quote",
     "headline": string,
     "body": string,
     "quote": string,
     "actionItem": string
   }}

Return JSON object: {{ "reflectionExercises": [...], "ideaCards": [...] }}
Output ONLY raw valid JSON.
"""
        cards_data = query_agy(cards_prompt)
        draft["reflectionExercises"] = cards_data.get("reflectionExercises", [])
        draft["ideaCards"] = cards_data.get("ideaCards", [])
        with open(draft_file, "w") as f:
            json.dump(draft, f, indent=2)
    else:
        log("Stage 4/5: (Cached) Reflections and Idea Cards already generated.")

    # STAGE 5: Hierarchical Mind Map & File Assembly
    if "mindMap" not in draft:
        log("Stage 5/5: Generating 35-50 node hierarchical mind map...")
        mindmap_prompt = f"""
Generate a comprehensive 35-50+ node hierarchical mind map for "{title}" by {author}.
Category: {category} ({subcategory})
{tone_instruction}
CRITICAL: EVERY SINGLE NODE must have "id", "label", and "description" (at least 2 substantial sentences in simple, category-attuned language).

Schema:
{{
  "id": "root",
  "label": "{title}",
  "description": "...",
  "children": [
    {{
      "id": "node-1",
      "label": "Major Theme 1",
      "description": "In-depth explanation...",
      "children": [
        {{ "id": "node-1-1", "label": "Sub-theme", "description": "Detailed explanation..." }}
      ]
    }}
  ]
}}

Return JSON object: {{ "mindMap": {{ ... }} }}
Output ONLY raw valid JSON.
"""
        mindmap_data = query_agy(mindmap_prompt)
        draft["mindMap"] = mindmap_data.get("mindMap", {})
        with open(draft_file, "w") as f:
            json.dump(draft, f, indent=2)
    else:
        log("Stage 5/5: (Cached) Mind map loaded.")

    # Sanitize and assemble
    sanitized_blinks = sanitize_blinks(draft["blinks"], book_id, chapters)
    sanitized_stories = sanitize_stories(draft["stories"], book_id)
    sanitized_actions = sanitize_action_items(draft["actionItems"], book_id)
    sanitized_refs = sanitize_reflections(draft["reflectionExercises"], book_id)
    sanitized_cards = sanitize_idea_cards(draft["ideaCards"], book_id, title, author, category)
    sanitized_mindmap = sanitize_mind_map(draft["mindMap"], title)

    toc_info = draft["toc"]
    pub_year = toc_info.get("publishedYear", data.get("publishedYear", 2020))
    raw_summary = toc_info.get("onePageSummary", data.get("onePageSummary", {}))
    one_page_summary = sanitize_value(raw_summary)
    if isinstance(one_page_summary, dict):
        for k in ["strengths", "blindSpotsAndCounterarguments", "keyPillars"]:
            if k in one_page_summary and isinstance(one_page_summary[k], list):
                flat = []
                for item in one_page_summary[k]:
                    if isinstance(item, list):
                        flat.extend(item)
                    else:
                        flat.append(item)
                one_page_summary[k] = flat

    book_obj = {
        "id": book_id,
        "title": title,
        "author": author,
        "category": category,
        "subcategory": subcategory,
        "coverColor": data.get("coverColor", "from-slate-900 to-indigo-950"),
        "coverEmoji": data.get("coverEmoji", "📖"),
        "readingTimeMinutes": max(45, len(chapters) * 5),
        "publishedYear": pub_year,
        "onePageSummary": one_page_summary,
        "blinks": sanitized_blinks,
        "actionItems": sanitized_actions,
        "stories": sanitized_stories,
        "reflectionExercises": sanitized_refs,
        "ideaCards": sanitized_cards,
        "mindMap": sanitized_mindmap,
        "tags": data.get("tags", [category, subcategory])
    }

    screaming_name = to_screaming_snake(book_id)
    mod_name = os.path.splitext(os.path.basename(filepath))[0]
    expected_name = get_expected_import_names().get(mod_name, screaming_name)
    aliases = f"\nexport const {expected_name} = {screaming_name};\n" if expected_name != screaming_name else ""
    ts_content = f"// {title} by {author}\n// Category-Attuned Synthesis\n\nimport {{ Book }} from '../../types';\n\nexport const {screaming_name}: Book = {json.dumps(book_obj, indent=2)};{aliases}\n"

    tmp_path = filepath + ".tmp"
    with open(tmp_path, "w") as f:
        f.write(ts_content)
    os.replace(tmp_path, filepath)

    log(f"✅ Generated {filepath} ({len(ts_content):,} characters)")
    return True

def main():
    parser = argparse.ArgumentParser(description="Rewrite catalog to Category-Attuned Standard")
    parser.add_argument("--book", help="Single book ID to rewrite")
    args = parser.parse_args()

    done_set = load_cache()
    files = sorted(glob.glob(os.path.join(BOOKS_DIR, "*Expanded.ts")))

    if args.book:
        target_files = [f for f in files if args.book in os.path.basename(f)]
        if not target_files:
            print(f"Book with id '{args.book}' not found in {BOOKS_DIR}.")
            return
        files = target_files

    print(f"Targeting {len(files)} book(s). Already completed: {len(done_set)}.")

    processed = 0
    src_single = os.path.join(WORKSPACE_DIR, "dist-singlefile/BookBox.html")

    while True:
        pending_files = []
        for fp in files:
            with open(fp) as f:
                t = f.read()
            m = re.search(r'"id":\s*"([^"]+)"', t)
            if not m:
                continue
            bid = m.group(1)
            if args.book or bid not in done_set:
                pending_files.append((fp, bid))

        if not pending_files:
            log("🎉 All targeted books have been synthesized to Category-Attuned standard!")
            break

        log(f"Starting pass for {len(pending_files)} pending book(s)...")
        newly_done_in_pass = 0

        for fp, bid in pending_files:
            try:
                if rewrite_book_complete(fp):
                    processed += 1
                    newly_done_in_pass += 1
                    done_set.add(bid)
                    save_cache(done_set)

                    log("Verifying build with 'npm run build'...")
                    subprocess.run(["npm", "run", "build"], cwd=WORKSPACE_DIR, check=True)
                    log("Building standalone singlefile (npm run build:singlefile)...")
                    subprocess.run(["npm", "run", "build:singlefile"], cwd=WORKSPACE_DIR, check=True)
                    if os.path.exists(src_single):
                        shutil.copy2(src_single, os.path.join(WORKSPACE_DIR, "BookBox.html"))
                        shutil.copy2(src_single, os.path.join(WORKSPACE_DIR, "dist/BookBox.html"))
                        log("Standalone singlefile updated at BookBox.html!")

            except Exception as e:
                log(f"❌ Error rewriting {bid}: {e}")

        if args.book or newly_done_in_pass == 0:
            break

    log(f"All requested books processed! ({processed} newly written).")

if __name__ == "__main__":
    main()

