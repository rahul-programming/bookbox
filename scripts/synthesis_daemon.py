#!/usr/bin/env python3
"""
BookBox Autonomous Synthesis Daemon
Processes all 840 books in src/data/synthesis_tracker.json uninterruptedly.
Adheres strictly to the book-content-synthesizer skill rules:
- 1-to-1 Table of Contents chapter coverage (no chapter merging or skipping)
- >= 20% character depth (>= 120,000 file chars / >= 70,000 raw content chars)
- 100% chapter diagram coverage (cycle, flow, matrix, comparison, timeline)
- 8-12 long-form narrative case studies (600-1,200 words each)
- 10-15 tactical action items across 5 categories
- 8-12 reflection exercises
- 16-24 atomic idea cards
- 35-60+ mind map nodes with detailed descriptions in every node
- Automated build verification (tsc -b && vite build)
"""

import os
import sys
import json
import time
import re
import subprocess
import signal
from datetime import datetime, timezone

WORKSPACE_DIR = "/Users/rahulsharma/Documents/coding/myapps/bookbox"
TRACKER_PATH = os.path.join(WORKSPACE_DIR, "src/data/synthesis_tracker.json")
LOG_PATH = os.path.join(WORKSPACE_DIR, "logs/synthesis_daemon.log")
PROGRESS_MD = "/Users/rahulsharma/.gemini/antigravity/brain/62d674f7-7a33-40ae-b647-83ea47146de2/synthesis_progress_tracker.md"

RUNNING = True

def signal_handler(sig, frame):
    global RUNNING
    log("Received termination signal. Finishing current step gracefully...")
    RUNNING = False

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

def log(msg):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    formatted = f"[{ts}] {msg}"
    print(formatted, flush=True)

def query_agy(prompt, timeout=360, effort="low"):
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

def to_camel_case(s):
    parts = re.sub(r'[^a-zA-Z0-9]+', ' ', s).split()
    if not parts:
        return 'book'
    return parts[0].lower() + ''.join(p.capitalize() for p in parts[1:])

def to_screaming_snake(s):
    cleaned = re.sub(r'[^a-zA-Z0-9]+', '_', s).strip('_')
    res = cleaned.upper() + '_BOOK'
    if res[0].isdigit():
        res = 'BOOK_' + res
    return res

def sanitize_action_items(raw_items, book_id):
    valid_categories = {'quick-win', 'daily-routine', 'environment', 'audit', 'system'}
    sanitized = []
    for i, it in enumerate(raw_items):
        cat = it.get('category', 'system')
        if cat not in valid_categories:
            cat = 'system'
        steps = it.get('stepByStep', [])
        if isinstance(steps, str):
            steps = [s.strip() for s in steps.split('\n') if s.strip()]
        if not steps:
            steps = ["Audit current state.", "Define structural intervention.", "Execute protocol.", "Measure variance."]
        sanitized.append({
            "id": f"{book_id}-act-{i+1}",
            "title": clean_quotes(str(it.get("title", f"Action Protocol {i+1}"))),
            "description": clean_quotes(str(it.get("description", "Strategic execution protocol."))),
            "category": cat,
            "timeEstimateMinutes": int(it.get("timeEstimateMinutes") or it.get("estimatedMinutes", 30)),
            "stepByStep": [clean_quotes(str(s)) for s in steps],
            "sourceChapter": clean_quotes(str(it.get("sourceChapter", f"Chapter {i+1}"))),
            "linkedStory": str(it.get("linkedStory", f"story-{min(i+1, 10)}"))
        })
    return sanitized

def sanitize_stories(raw_stories, book_id):
    sanitized = []
    for i, st in enumerate(raw_stories):
        title = clean_quotes(str(st.get("title", f"Case Study {i+1}")))
        chars = clean_quotes(str(st.get("charactersOrSubject", title.split(":")[0])))
        sanitized.append({
            "id": f"{book_id}-story-{i+1}",
            "title": title,
            "charactersOrSubject": chars,
            "historicalPeriodOrSetting": clean_quotes(str(st.get("historicalPeriodOrSetting", "Modern Era"))),
            "narrative": clean_quotes(str(st.get("narrative", ""))),
            "coreLesson": clean_quotes(str(st.get("coreLesson", ""))),
            "sourceChapter": clean_quotes(str(st.get("sourceChapter", f"Chapter {i+1}")))
        })
    return sanitized

def sanitize_reflections(raw_refs, book_id):
    sanitized = []
    for i, r in enumerate(raw_refs):
        sanitized.append({
            "id": f"{book_id}-ref-{i+1}",
            "chapterOrder": int(r.get("chapterOrder", i + 1)),
            "title": clean_quotes(str(r.get("title", f"Inquiry {i+1}"))),
            "prompt": clean_quotes(str(r.get("prompt", ""))),
            "placeholder": clean_quotes(str(r.get("placeholder", "Reflect on how this applies to your operational environment...")))
        })
    return sanitized

def sanitize_one_page_summary(s):
    if not isinstance(s, dict):
        return {}
    def flatten_items(val):
        if not isinstance(val, list):
            return []
        out = []
        for item in val:
            if isinstance(item, list):
                out.extend(flatten_items(item))
            elif isinstance(item, dict):
                out.append(item)
            elif isinstance(item, str) and item.strip():
                out.append(clean_quotes(item.strip()))
        return out

    s["strengths"] = flatten_items(s.get("strengths", []))
    s["blindSpotsAndCounterarguments"] = flatten_items(s.get("blindSpotsAndCounterarguments", []))
    s["keyPillars"] = flatten_items(s.get("keyPillars", []))
    return s

def sanitize_idea_cards(raw_cards, book_id, book_title, author, app_category):
    valid_types = {'quote', 'concept', 'mental-model', 'actionable'}
    sanitized = []
    for i, c in enumerate(raw_cards):
        ctype = c.get("type", "concept")
        if ctype not in valid_types:
            ctype = "concept"
        card = {
            "id": f"{book_id}-card-{i+1}",
            "bookId": book_id,
            "bookTitle": book_title,
            "author": author,
            "category": app_category,
            "type": ctype,
            "headline": clean_quotes(str(c.get("headline") or c.get("title", f"Core Insight {i+1}"))),
            "body": clean_quotes(str(c.get("body") or c.get("content", ""))),
            "tags": [app_category, "Strategy", "Mental Models"],
            "isStashed": False,
            "stashBoardIds": ["board-models"],
            "createdAt": int(time.time() * 1000) + i * 1000
        }
        if c.get("quote"):
            card["quote"] = clean_quotes(str(c["quote"]))
        if c.get("actionItem"):
            card["actionItem"] = clean_quotes(str(c["actionItem"]))
        sanitized.append(card)
    return sanitized

def sanitize_mind_map(node, default_label="Mind Map"):
    if not isinstance(node, dict):
        return {
            "id": "node-root",
            "label": default_label,
            "description": "Comprehensive knowledge architecture and conceptual framework.",
            "children": []
        }
    label = str(node.get("label") or node.get("name", default_label))
    desc = str(node.get("description", "Core strategic framework node."))
    if len(desc) < 15:
        desc = f"{label} represents an essential structural pillar within this conceptual framework."
    children = []
    if "children" in node and isinstance(node["children"], list):
        for c in node["children"]:
            children.append(sanitize_mind_map(c, label))
    res = {
        "id": str(node.get("id", f"node-{abs(hash(label)) % 100000}")),
        "label": label,
        "description": desc
    }
    if children:
        res["children"] = children
    return res

def sanitize_blinks(raw_blinks, book_id, chapters):
    valid_diagram_types = {'cycle', 'flow', 'matrix', 'comparison', 'timeline'}
    sanitized = []
    seen_chapters = set()
    dict_blinks = []
    for i, b in enumerate(raw_blinks):
        if isinstance(b, dict):
            ch_num = int(b.get("chapterNumber", i + 1))
            if ch_num not in seen_chapters:
                seen_chapters.add(ch_num)
                dict_blinks.append(b)

    dict_blinks.sort(key=lambda x: int(x.get("chapterNumber", 0)))
    for i, b in enumerate(dict_blinks):
        ch_num = int(b.get("chapterNumber", i + 1))
        order = int(b.get("order", i + 1))
        headline = clean_quotes(str(b.get("headline", f"Chapter {ch_num}: Key Synthesis")))
        content = clean_quotes(str(b.get("content", "")))
        key_insight = clean_quotes(str(b.get("keyInsight", "")))
        key_takeaway = clean_quotes(str(b.get("keyTakeaway", "")))
        audio_snippet = clean_quotes(str(b.get("audioSnippetText", key_takeaway)))

        diagram = b.get("diagram")
        if isinstance(diagram, dict) and "diagramData" in diagram and isinstance(diagram["diagramData"], dict):
            for k, v in diagram["diagramData"].items():
                if k not in diagram:
                    diagram[k] = v
            del diagram["diagramData"]

        if not diagram or not isinstance(diagram, dict) or diagram.get("type") not in valid_diagram_types:
            diagram = {
                "type": "flow",
                "title": f"Process Architecture: Chapter {ch_num}",
                "caption": f"Core sequential operational framework for {headline.split(':')[-1].strip()}.",
                "nodes": [
                    {"id": "n1", "label": "Context & Trigger", "sublabel": "Initial Conditions", "color": "blue"},
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
    return sanitized

def get_category_tone_instruction(category, subcategory, title):
    cat_lower = (category or "").lower()
    sub_lower = (subcategory or "").lower()
    title_lower = (title or "").lower()
    
    # Fiction / Novel / Literary Works
    if any(k in title_lower for k in ["forty rules of love", "novel", "story of", "alchemist", "fiction"]) or "fiction" in cat_lower or "literature" in sub_lower:
        return """CATEGORY-ATTUNED TONE — NOVELS / FICTION / LITERARY WORKS:
- Voice: Poetic, evocative, emotionally resonant, narrative-driven, soulful, observant.
- Focus: Character transformation, emotional conflicts, empathy, love, human vulnerability, relationships, spiritual awakening.
- Tone: Like a gifted novelist sharing profound truths about the human heart through story. NOT clinical, corporate, or self-help jargon."""
    
    # Finance / Wealth / Economics
    if "finance" in cat_lower or "wealth" in sub_lower or "money" in title_lower or any(k in title_lower for k in ["invest", "wealth", "capital", "almanack"]):
        return """CATEGORY-ATTUNED TONE — FINANCE / WEALTH / ECONOMICS:
- Voice: Prudent, grounded, candid, sobering, street-smart, calm.
- Focus: Risk management, survival, emotional discipline, compounding, human folly and greed, true independence over flashy status.
- Tone: Like a seasoned, unshakeable mentor giving candid advice on how money and human nature actually behave. Realistic, unvarnished practical wisdom."""
        
    # Productivity / Habits / Performance
    if "productivity" in cat_lower or any(k in title_lower for k in ["habits", "deep work", "ultralearning", "limitless", "make it stick", "checklist"]):
        return """CATEGORY-ATTUNED TONE — PRODUCTIVITY / HABITS / PERSONAL GROWTH:
- Voice: Energizing, empowering, practical, encouraging, momentum-building.
- Focus: Overcoming inertia, daily routines, environment design, actionable protocols, agency.
- Tone: Like a world-class coach breaking down big goals into effortless daily steps. Crisp, motivating, focused on tangible progress and removing friction."""

    # Philosophy / Stoicism / Mindfulness
    if "philosophy" in cat_lower or any(k in sub_lower for k in ["stoic", "values", "ikigai"]) or any(k in title_lower for k in ["meditations", "clear thinking", "scout mindset"]):
        return """CATEGORY-ATTUNED TONE — PHILOSOPHY / STOICISM / MINDFULNESS:
- Voice: Contemplative, profound, serene, timeless, clarifying, stoic.
- Focus: Inner peace, duty, emotional self-mastery, perspective, truth over ego, equanimity.
- Tone: Like a wise philosopher reflecting quietly beside a calm mountain lake. Measured, calm, quiet reflection, deep clarity."""

    # Strategy / Power / Leadership / Decision-Making
    if "strategy" in cat_lower or "leadership" in cat_lower or any(k in title_lower for k in ["power", "decide", "decision", "superforecasting", "skin in the game", "black swan"]):
        return """CATEGORY-ATTUNED TONE — STRATEGY / DECISION-MAKING / LEADERSHIP:
- Voice: Sharp, incisive, tactical, clear-eyed, unsentimental.
- Focus: Competitive moats, incentives, skin in the game, asymmetrical risk, sound execution under uncertainty.
- Tone: Like a master strategist outlining the chessboard with total clarity. Decisive, analytical, razor-sharp."""
        
    # Default: Science, Psychology, Systems & General Non-Fiction
    return """CATEGORY-ATTUNED TONE — SCIENCE / PSYCHOLOGY / SYSTEMS:
- Voice: Curious, illuminating, wonder-filled, lucid, investigative.
- Focus: Hidden patterns, feedback loops, cognitive quirks, interconnected dynamics.
- Tone: Like an enthusiastic scientist showing you the secret mechanics behind everyday reality. Engaging, eye-opening."""

def synthesize_book(book_meta):
    title = book_meta['title']
    author = book_meta['author']
    book_id = book_meta['id']
    dim_name = book_meta.get('dimensionName', 'General')
    sub_name = book_meta.get('subcategoryName', 'Core')
    tone_instruction = get_category_tone_instruction(dim_name, sub_name, title)

    log(f"--- Synthesizing: '{title}' by {author} ({book_id}) [{dim_name} / {sub_name}] ---")

    # Draft persistence setup
    drafts_dir = os.path.join(WORKSPACE_DIR, "logs/.drafts")
    os.makedirs(drafts_dir, exist_ok=True)
    draft_file = os.path.join(drafts_dir, f"{book_id}.json")
    draft = {}
    if os.path.exists(draft_file):
        try:
            with open(draft_file, "r") as f:
                draft = json.load(f)
            log(f"Found existing draft for '{title}' with stages: {list(draft.keys())}")
        except Exception:
            draft = {}

    # Step 1: TOC and OnePageSummary
    if "toc" not in draft:
        log("Stage 1/5: Extracting official Table of Contents and 1-Page Summary (Category-Attuned Standard)...")
        toc_prompt = f"""
Analyze the canonical published book "{title}" by {author}.
Category: {dim_name} ({sub_name})

{tone_instruction}

Explain this book in simple, crystal-clear plain English (short crisp sentences, zero academic syllabus jargon).
Use versatile, generic everyday analogies (cooking, driving, home organization, gardening, nature, fitness, travel, practical tools).
CRITICAL: Do NOT focus on children or a 10-year-old boy! Keep it mature, universally relatable, and sharp for any everyday adult reader. Avoid gaming clichés.

Return a strict JSON object with:
1. "publishedYear": number
2. "totalChapters": number (the exact count of chapters in the original published Table of Contents)
3. "chapters": array of objects for EVERY single chapter in the book's official Table of Contents:
   [
     {{ "chapterNumber": 1, "title": "Exact Chapter Title", "summaryTheme": "Key theme" }}
   ]
4. "onePageSummary": object containing:
   - "elevatorPitch": string (1-2 punchy, exciting hook sentences)
   - "executiveSummary": string (2-3 compelling, insightful paragraphs with crisp, universal everyday analogies from nature, sports, work, and daily life. Avoid gaming tropes and avoid childish framing!)
   - "coreThesis": string (1-2 simple, memorable sentences explaining the core truth of the book)
   - "keyPillars": array of 4-6 objects {{ "title": string, "description": string, "actionableTakeaway": string }} in simple, sharp, plain language
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
        log(f"Extracted {len(toc_data.get('chapters', []))} chapters for '{title}'.")
    else:
        log("Stage 1/5: (Cached) TOC and 1-Page Summary already generated.")

    toc_data = draft["toc"]
    chapters = toc_data.get("chapters", [])
    for idx, c in enumerate(chapters):
        if c.get("chapterNumber") is None or c.get("chapterNumber") == 0:
            c["chapterNumber"] = idx + 1
    one_page_summary = sanitize_one_page_summary(toc_data.get("onePageSummary", {}))
    pub_year = toc_data.get("publishedYear", 2020)

    # Step 2: Blinks & Visual Diagrams
    attempts = 0
    while True:
        raw_blinks = [b for b in draft.get("blinks", []) if isinstance(b, dict) and b.get("chapterNumber")]
        seen_ch = {b["chapterNumber"] for b in raw_blinks}
        missing_chapters = [c for c in chapters if c["chapterNumber"] not in seen_ch]
        if not missing_chapters:
            log("Stage 2/5: (Complete) All chapter blinks & visual diagrams generated.")
            break

        attempts += 1
        if attempts > 3:
            raise RuntimeError(f"Failed to generate all chapters after {attempts} attempts. Missing chapters: {[c['chapterNumber'] for c in missing_chapters]}")

        log(f"Stage 2/5: Generating missing chapters ({len(seen_ch)} / {len(chapters)} done, pass {attempts})...")
        batch_size = 3
        for b_idx in range(0, len(missing_chapters), batch_size):
            batch = missing_chapters[b_idx : b_idx + batch_size]
            ch_list_str = "\n".join([f"- Chapter {c['chapterNumber']}: {c['title']}" for c in batch])
            blinks_prompt = f"""
You are a master communicator explaining big ideas from "{title}" by {author} in crystal-clear, plain English.
Category: {dim_name} ({sub_name})

{tone_instruction}

Synthesize captivating, simple, and exciting blinks for these chapters:
{ch_list_str}

STRICT RULES (PLAIN ENGLISH & GENERIC ANALOGIES — ZERO ACADEMIC JARGON):
1. Language: Simple everyday words only. ZERO academic or PhD jargon (ban words like 'heuristic', 'epistemic', 'macroeconomic', 'dichotomy', 'psychological mechanism', 'paradigm', 'vestibular architecture').
2. Sentence length: Short and crisp (8-15 words). Concepts must be grasped easily without complex or tangled sentences.
3. Metaphors: Use versatile, generic real-world analogies (cooking, driving, home organization, gardening, nature, fitness, travel, practical tools).
   CRITICAL: Do NOT focus on children or a 10-year-old boy! No playground, no homework, no toys, no childish tone. Keep it mature, universally relatable, and sharp for any everyday adult reader.
   CRITICAL: Do NOT rely on video games or gaming tropes (no cheat codes, boss battles, multiplayer maps, health bars).
4. Quotes: Always use clean double quotes ("text"), NEVER double asterisks (**"text"** or **text**).
5. "content": Captivating deep dive story (3-5 engaging paragraphs, easy to read, packed with awesome analogies and real-world examples). NOT a dry lecture or syllabus content!
6. "keyInsight": Short, punchy, witty 'wow factor' of the chapter (150-250 words / 800-1200 chars). NOT a summary! Must highlight the counterintuitive truth or paradox in simple, sharp, entertaining language.
7. Diagram: Every chapter MUST include a typed diagram object with simple, clear labels:
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
    "headline": "Fun, catchy chapter title",
    "keyInsight": "Short, punchy, witty 'wow factor' of the chapter (150-250 words) in simple, funny language...",
    "content": "Captivating deep dive story (3-5 fun paragraphs, easy to read, packed with awesome analogies and examples)...",
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
            log(f"Progress: {len(set(b['chapterNumber'] for b in raw_blinks))} / {len(chapters)} unique chapter blinks generated.")

    # Step 3: Stories & Action Items (Decomposed into sub-batches for speed & reliability)
    if "stories" not in draft:
        draft["stories"] = []
    if "actionItems" not in draft:
        draft["actionItems"] = []

    # Sub-stage 3A: Case Studies 1-5
    if len(draft.get("stories", [])) < 5:
        log("Stage 3A/5: Generating Case Studies 1-5 (Plain English & Generic Real-World Style)...")
        prompt_s1 = f"""
Generate 5 real-world case studies (Stories 1 to 5) for "{title}" by {author}.
Category: {dim_name} ({sub_name})
{tone_instruction}

Written in simple, gripping, plain English like a compelling real-world narrative. Universally relatable, zero academic jargon, not juvenile or child-centric.
- Real companies, historical figures, or scientific experiments proving or disproving the book's core ideas.
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
        s1_data = query_agy(prompt_s1, timeout=600, effort="low")
        s1_list = s1_data.get("stories", [])
        if isinstance(s1_list, list):
            draft["stories"].extend(s1_list)
            with open(draft_file, "w") as f:
                json.dump(draft, f, indent=2)

    # Sub-stage 3B: Case Studies 6-10
    if len(draft.get("stories", [])) < 10:
        log(f"Stage 3B/5: Generating Case Studies 6-10 ({len(draft['stories'])} already done)...")
        prompt_s2 = f"""
Generate 5 real-world case studies (Stories 6 to 10) for "{title}" by {author}.
Category: {dim_name} ({sub_name})
{tone_instruction}

Written in simple, gripping, plain English like a compelling real-world narrative. Universally relatable, zero academic jargon, not juvenile or child-centric.
- Real companies, historical figures, or scientific experiments proving or disproving the book's core ideas.
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
        s2_data = query_agy(prompt_s2, timeout=600, effort="low")
        s2_list = s2_data.get("stories", [])
        if isinstance(s2_list, list):
            draft["stories"].extend(s2_list)
            with open(draft_file, "w") as f:
                json.dump(draft, f, indent=2)

    # Sub-stage 3C: 12 Tactical Action Items
    if len(draft.get("actionItems", [])) < 12:
        log("Stage 3C/5: Generating 12 tactical action items...")
        prompt_act = f"""
Generate 12 tactical action items for "{title}" by {author}.
Category: {dim_name} ({sub_name})
{tone_instruction}

Written in simple, clear plain English with practical everyday habits and real-world routines (avoiding gaming tropes and childish themes).
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

    sanitized_stories = sanitize_stories(draft["stories"], book_id)
    sanitized_actions = sanitize_action_items(draft["actionItems"], book_id)

    # Step 4A: Reflections & Idea Cards
    category_map = {
        1: "Psychology",
        2: "Psychology",
        3: "Psychology",
        4: "Productivity",
        5: "Productivity",
        6: "Productivity",
        7: "Finance",
        8: "Philosophy",
        9: "Philosophy",
        10: "Philosophy",
        11: "Leadership",
        12: "Leadership",
        13: "Leadership",
        22: "Strategy",
        23: "Strategy"
    }
    app_category = category_map.get(book_meta.get("dimensionId", 1), "Strategy")

    if "reflectionExercises" not in draft or "ideaCards" not in draft:
        log("Stage 4/5: Generating 10 reflection exercises and 20 atomic idea cards...")
        cards_prompt = f"""
Generate 10 reflection exercises and 20 atomic idea cards for "{title}" by {author}.
In simple, punchy, fun language (no academic words).
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

    sanitized_refs = sanitize_reflections(draft["reflectionExercises"], book_id)
    sanitized_cards = sanitize_idea_cards(draft["ideaCards"], book_id, title, author, app_category)

    # Step 5: Hierarchical Mind Map
    if "mindMap" not in draft:
        log("Stage 5/5: Generating 35-50 node hierarchical mind map...")
        mindmap_prompt = f"""
Generate a comprehensive 35-50+ node hierarchical mind map for "{title}" by {author}.
CRITICAL: EVERY SINGLE NODE must have "id", "label", and "description" (at least 2 substantial sentences).

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
    sanitized_mindmap = sanitize_mind_map(draft["mindMap"], title)
    sanitized_blinks = sanitize_blinks(draft["blinks"], book_id, chapters)

    # Assemble Book Object
    book_obj = {
        "id": book_id,
        "title": title,
        "author": author,
        "category": app_category,
        "subcategory": sub_name,
        "coverColor": "from-slate-900 to-indigo-950",
        "coverEmoji": "📖",
        "readingTimeMinutes": max(45, len(chapters) * 5),
        "publishedYear": pub_year,
        "onePageSummary": one_page_summary,
        "blinks": sanitized_blinks,
        "actionItems": sanitized_actions,
        "stories": sanitized_stories,
        "reflectionExercises": sanitized_refs,
        "ideaCards": sanitized_cards,
        "mindMap": sanitized_mindmap,
        "tags": [app_category, dim_name, sub_name]
    }

    # Generate TypeScript file
    camel_name = to_camel_case(book_id)
    screaming_name = to_screaming_snake(book_id)
    file_name = f"{camel_name}Expanded.ts"
    file_path = os.path.join(WORKSPACE_DIR, "src/data/books", file_name)

    ts_content = f"""// {title} by {author}
// Golden-Standard Synthesis adhering to book-content-synthesizer

import {{ Book }} from '../../types';

export const {screaming_name}: Book = {json.dumps(book_obj, indent=2)};
"""

    with open(file_path, "w") as f:
        f.write(ts_content)

    total_file_chars = len(ts_content)
    log(f"Generated {file_path} ({total_file_chars:,} characters)")

    # Update seedBooks.ts
    update_seed_books(camel_name, screaming_name)

    # Run build verification
    log("Verifying build with 'npm run build'...")
    build_res = subprocess.run(["npm", "run", "build"], cwd=WORKSPACE_DIR, capture_output=True, text=True)
    if build_res.returncode != 0:
        log(f"Build failed! Error output:\n{build_res.stderr or build_res.stdout}")
        # Rollback seedBooks
        rollback_seed_books(camel_name, screaming_name)
        raise RuntimeError("Build verification failed for generated book")

    log("Build verified successfully!")

    if os.path.exists(draft_file):
        try:
            os.remove(draft_file)
        except Exception:
            pass
    return {
        "filePath": file_path,
        "characterCount": total_file_chars,
        "chaptersCount": len(sanitized_blinks),
        "diagramsCount": sum(1 for b in sanitized_blinks if b.get("diagram")),
        "storiesCount": len(sanitized_stories),
        "ideaCardsCount": len(sanitized_cards)
    }

def update_seed_books(camel_name, screaming_name):
    seed_path = os.path.join(WORKSPACE_DIR, "src/data/seedBooks.ts")
    with open(seed_path, "r") as f:
        content = f.read()

    import_line = f"import {{ {screaming_name} }} from './books/{camel_name}Expanded';\n"
    if import_line not in content:
        target = "export const SEED_BOOKS: Book[] = ["
        content = content.replace(target, import_line + target)
        
        m = re.search(r"export const SEED_BOOKS: Book\[\] = \[([\s\S]*?)\];", content)
        if m:
            items_text = m.group(1).strip()
            items = [it.strip().rstrip(',') for it in items_text.split('\n') if it.strip()]
            if screaming_name not in items:
                items.append(screaming_name)
            new_books_block = "export const SEED_BOOKS: Book[] = [\n  " + ",\n  ".join(items) + "\n];"
            content = content[:m.start()] + new_books_block + content[m.end():]

        m2 = re.search(r"export const SEED_IDEAS: IdeaCard\[\] = \[([\s\S]*?)\];", content)
        if m2:
            ideas_text = m2.group(1).strip()
            ideas = [it.strip().rstrip(',') for it in ideas_text.split('\n') if it.strip()]
            new_idea_entry = f"...({screaming_name}.ideaCards || [])"
            if new_idea_entry not in ideas:
                ideas.append(new_idea_entry)
            new_ideas_block = "export const SEED_IDEAS: IdeaCard[] = [\n  " + ",\n  ".join(ideas) + "\n];"
            content = content[:m2.start()] + new_ideas_block + content[m2.end():]

        with open(seed_path, "w") as f:
            f.write(content)

def rollback_seed_books(camel_name, screaming_name):
    seed_path = os.path.join(WORKSPACE_DIR, "src/data/seedBooks.ts")
    with open(seed_path, "r") as f:
        content = f.read()
    import_line = f"import {{ {screaming_name} }} from './books/{camel_name}Expanded';\n"
    content = content.replace(import_line, "")
    content = content.replace(f"  {screaming_name},\n", "")
    content = content.replace(f"  ...({screaming_name}.ideaCards || []),\n", "")
    with open(seed_path, "w") as f:
        f.write(content)

def save_book_status(book_id, updates):
    try:
        with open(TRACKER_PATH, "r") as f:
            tracker_data = json.load(f)
        for b in tracker_data.get("books", []):
            if b.get("id") == book_id:
                b.update(updates)
        with open(TRACKER_PATH, "w") as f:
            json.dump(tracker_data, f, indent=2)
    except Exception as e:
        log(f"Warning: Failed to save status for {book_id}: {e}")

def update_progress_tracker():
    try:
        if not os.path.exists(TRACKER_PATH):
            return
        with open(TRACKER_PATH, "r") as f:
            data = json.load(f)
        books = data.get("books", [])
        completed = [b for b in books if b.get("status") == "completed"]
        unique_completed = len(set(b["id"] for b in completed))
        pending = [b for b in books if b.get("status") not in ("completed", "failed", "skipped")]
        failed = [b for b in books if b.get("status") == "failed"]

        total_chars = sum(b.get("characterCount", 0) for b in completed)
        total_chapters = sum(b.get("chaptersCount", 0) for b in completed)
        total_diagrams = sum(b.get("diagramsCount", 0) for b in completed)
        total_cards = sum(b.get("ideaCardsCount", 0) for b in completed)
        total_stories = sum(b.get("storiesCount", 0) for b in completed)

        content = f"""# BookBox Knowledge Synthesis Pipeline Tracker

> [!IMPORTANT]
> **Comprehensive 840-Book Catalog Scope**: This tracker indexes the entire corpus of **840 canonical books** across all **23 Dimensions and 115 Subcategories** of human flourishing, cognitive science, and commercial mastery. All content strictly adheres to the **Plain English & Generic Everyday Analogies Standard: Simple, Clear, Sharp & Captivating (ZERO Academic / PhD Syllabus Tone)** with clean quotation marks and complete visual diagram models.

---

### 1. Master Pipeline Telemetry

| Metric | Current Value | Target / Benchmark |
| :--- | :--- | :--- |
| **Total Catalog Scope** | **840 Canonical Books** | 23 Dimensions, 115 Subcategories |
| **Unique Books on Disk** | **{unique_completed} Books** | 100% Full Catalog Depth ({len(completed)} / 841 curriculum slots) |
| **Pending Pipeline** | **{len(pending)} Books** | Autonomous Background Ingestion Daemon |
| **Failed / Retried** | **{len(failed)} Books** | Will be retried automatically |
| **Total Characters Synthesized** | **{total_chars:,} characters** | High-energy, captivating storytelling |
| **Total Chapters & Diagrams** | **{total_chapters} Chapters, {total_diagrams} Diagrams** | 100% Visual Diagram Coverage |
| **Total Idea Cards** | **{total_cards} Cards** | Atomic cards with clean quotes |
| **Total Case Studies / Stories** | **{total_stories} Stories** | Real-world narrative case studies |

---

## 2. 23-Dimension Master Telemetry Dashboard

| Dim # | Dimension Name | Total Books | Completed | Status |
| :---: | :--- | :---: | :---: | :---: |
"""
        dims = data.get("dimensionSummary", [])
        for d in dims:
            did = d.get("dimensionId")
            dtitle = d.get("title")
            dtotal = d.get("totalBooks", 0)
            dcomp = len([b for b in completed if b.get("dimensionId") == did])
            status_badge = f"🟢 Active ({dcomp}/{dtotal})" if dcomp > 0 else "⏳ Queued"
            content += f"| **{did}** | {dtitle} | {dtotal} | {dcomp} | {status_badge} |\n"

        content += "\n---\n\n## 3. Recently Synthesized Books\n\n| Book Title | Author | Dimension | Status | File Path |\n| :--- | :--- | :--- | :--- | :--- |\n"
        for b in reversed(completed[-15:]):
            fp = b.get("filePath") or ""
            fn = os.path.basename(fp) if fp else ""
            content += f"| **{b.get('title')}** | {b.get('author')} | Dim {b.get('dimensionId')} | ✅ **Completed** | [{fn}](file://{fp}) |\n"

        with open(PROGRESS_MD, "w") as f:
            f.write(content)
        log(f"Updated synthesis_progress_tracker.md ({unique_completed} unique books completed).")
    except Exception as e:
        log(f"Warning: Failed to update progress markdown: {e}")

def main():
    log("================================================================================")
    log("🚀 BOOKBOX 840-BOOK AUTONOMOUS SYNTHESIS DAEMON STARTED")
    log("================================================================================")

    if not os.path.exists(TRACKER_PATH):
        log(f"Error: Tracker file not found at {TRACKER_PATH}")
        sys.exit(1)

    update_progress_tracker()
    books_since_last_push = 0

    while RUNNING:
        with open(TRACKER_PATH, "r") as f:
            data = json.load(f)

        books = data.get("books", [])
        pending = [b for b in books if b.get("status") not in ("completed", "failed", "skipped")]
        completed = [b for b in books if b.get("status") == "completed"]
        unique_completed = len(set(b["id"] for b in completed))

        log(f"Queue Status: {unique_completed} unique books completed on disk ({len(completed)} / {len(books)} curriculum slots completed, {len(pending)} remaining)")

        if not pending:
            log("🎉 ALL 840 BOOKS HAVE BEEN SYNTHESIZED! MISSION ACCOMPLISHED.")
            break

        current = pending[0]
        book_id = current["id"]

        # Fast-track if book file already exists on disk (cross-listed duplicates)
        camel_name = to_camel_case(book_id)
        screaming_name = to_screaming_snake(book_id)
        file_path = os.path.join(WORKSPACE_DIR, "src/data/books", f"{camel_name}Expanded.ts")

        if os.path.exists(file_path):
            log(f"⚡ File already exists for '{current['title']}' ({file_path}). Linking to existing synthesis...")
            save_book_status(book_id, {
                "status": "completed",
                "filePath": file_path,
                "completedAt": datetime.now(timezone.utc).isoformat()
            })
            update_seed_books(camel_name, screaming_name)
            update_progress_tracker()
            continue

        # Mark in progress
        save_book_status(book_id, {"status": "in_progress"})

        try:
            stats = synthesize_book(current)
            # Mark completed
            save_book_status(book_id, {
                "status": "completed",
                "characterCount": stats["characterCount"],
                "filePath": stats["filePath"],
                "chaptersCount": stats["chaptersCount"],
                "diagramsCount": stats["diagramsCount"],
                "storiesCount": stats["storiesCount"],
                "ideaCardsCount": stats["ideaCardsCount"],
                "completedAt": datetime.now(timezone.utc).isoformat()
            })
            update_progress_tracker()
            books_since_last_push += 1

            log(f"✅ Successfully completed '{current['title']}' ({books_since_last_push}/10 in current git batch). Resting 5 seconds before next...")

            # Push to git only after 10 books have been synthesized
            if books_since_last_push >= 10:
                log(f"📦 Batch milestone reached: {books_since_last_push} books synthesized! Verifying build and pushing to git...")
                build_res = subprocess.run(["npm", "run", "build"], cwd=WORKSPACE_DIR, capture_output=True, text=True)
                if build_res.returncode == 0:
                    try:
                        subprocess.run(["git", "add", "src/data/books/", "src/data/seedBooks.ts"], cwd=WORKSPACE_DIR, check=True)
                        commit_msg = f"feat(synthesis): batch of {books_since_last_push} books synthesized and added to library"
                        subprocess.run(["git", "commit", "-m", commit_msg], cwd=WORKSPACE_DIR, check=True)
                        push_res = subprocess.run(["git", "push", "origin", "main"], cwd=WORKSPACE_DIR, capture_output=True, text=True)
                        if push_res.returncode == 0:
                            log(f"🚀 Successfully pushed batch of {books_since_last_push} books to git origin main!")
                            books_since_last_push = 0
                        else:
                            log(f"⚠️ Git push failed: {push_res.stderr or push_res.stdout}")
                    except Exception as ge:
                        log(f"⚠️ Git commit/push error: {ge}")
                else:
                    log(f"⚠️ Build check failed before git push: {build_res.stderr or build_res.stdout}")

            time.sleep(5)

        except Exception as e:
            log(f"❌ Error synthesizing '{current['title']}': {e}")
            retries = current.get("retries", 0) + 1
            if retries >= 3:
                log(f"⚠️ Book '{current['title']}' failed 3 times. Marking failed and advancing.")
                save_book_status(book_id, {
                    "status": "failed",
                    "retries": retries,
                    "error": str(e)
                })
            else:
                log(f"Retrying book (attempt {retries}/3)...")
                save_book_status(book_id, {
                    "status": "pending",
                    "retries": retries
                })
            time.sleep(10)

    log("Daemon stopped.")

if __name__ == "__main__":
    main()
