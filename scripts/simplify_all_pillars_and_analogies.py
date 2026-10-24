#!/usr/bin/env python3
"""
Batch script to simplify Core Conceptual Pillars (keyPillars) and replace repetitive
video-game tropes with generic, versatile everyday analogies (cooking, driving, home
organization, gardening, nature, fitness, travel, practical tools like filters, levers,
magnets, dominoes) across all existing books.
Enforces plain English, short sentences (8-15 words), zero academic jargon,
universal/mature everyday framing (NOT focused on children or a 10yo boy),
and clean double quotes ("text").
"""

import os
import sys
import glob
import json
import re
import subprocess
import time

WORKSPACE_DIR = "/Users/rahulsharma/Documents/coding/myapps/bookbox"
BOOKS_DIR = os.path.join(WORKSPACE_DIR, "src/data/books")
CACHE_FILE = os.path.join(WORKSPACE_DIR, "cache/pillars_simplified_books.json")

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

def query_agy(prompt, timeout=120, effort="low"):
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
        raise

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

def process_book(filepath, done_set):
    basename = os.path.basename(filepath)
    with open(filepath) as f:
        content = f.read()
    
    m = re.search(r"export const (\w+): Book = ({.*});?\s*$", content, re.DOTALL)
    if not m:
        print(f"Skipping {basename}: cannot parse export statement.")
        return False
    
    const_name = m.group(1)
    raw_json = m.group(2)
    
    try:
        data = json.loads(raw_json)
    except Exception as e:
        print(f"Error parsing JSON for {basename}: {e}")
        return False
    
    book_id = data.get("id", basename)
    if book_id in done_set:
        print(f"Already simplified: {book_id}")
        return False
    
    title = data.get("title", "")
    author = data.get("author", "")
    category = data.get("category", "")
    subcategory = data.get("subcategory", "")
    summary = data.get("onePageSummary", {})
    pillars = summary.get("keyPillars", [])
    
    tone_instruction = get_category_tone_instruction(category, subcategory, title)
    
    print(f"\nProcessing [{book_id}]: '{title}' by {author} [{category} / {subcategory}] ({len(pillars)} pillars)...")
    
    prompt = f"""
You are rewriting the "onePageSummary" of the canonical book "{title}" by {author}.
Category: {category} ({subcategory})

{tone_instruction}

CORE RULES:
1. LANGUAGE: Simple, plain English only. Short, punchy sentences (8-15 words). Concepts must be grasped easily without complex or long tangled sentences. ZERO academic or PhD jargon (ban words like "heuristic", "stochastic", "governed", "empirical", "optimization", "computational overhead", "epistemic", "macroeconomic", "dichotomy", "ontological", "systemic adaptation").
2. ANALOGIES: Universal, generic, and relatable to everyday real life (cooking, driving, home organization, gardening, nature, fitness, travel, practical tools like filters, levers, magnets, dominoes).
   CRITICAL: Do NOT focus on a 10-year-old boy or children! No playground, no elementary school, no homework, no toys, no childish framing. Keep it mature, sharp, and universally applicable to any everyday adult reader.
   CRITICAL: Do NOT rely on video games or gaming tropes (no "cheat codes", "boss battles", "multiplayer maps", "health bars").
3. "elevatorPitch": 1-2 punchy, captivating hook sentences aligned with the book's category and voice.
4. "executiveSummary": 2-3 compelling, insightful paragraphs with crisp, universal everyday analogies from nature, work, tools, and daily life, matching the category tone.
5. "coreThesis": 1-2 simple, memorable sentences explaining the core truth of the book.
6. "keyPillars": Rewrite the input pillars into a list of 4-6 objects:
   - "title": Short, punchy, catchy (2-5 simple words, e.g. "The 37 Percent Rule").
   - "description": 1-2 crystal-clear, direct sentences explaining the idea in plain English.
   - "actionableTakeaway": One concrete, practical real-world action step (displayed under "Key Action:").
7. Quotes: Always use clean double quotes "like this", NEVER asterisks.

Current summary data to upgrade:
{json.dumps({
    "elevatorPitch": summary.get("elevatorPitch"),
    "executiveSummary": summary.get("executiveSummary"),
    "coreThesis": summary.get("coreThesis"),
    "keyPillars": pillars
}, indent=2)}

Return strict JSON:
{{
  "elevatorPitch": "...",
  "executiveSummary": "...",
  "coreThesis": "...",
  "keyPillars": [
    {{ "title": "...", "description": "...", "actionableTakeaway": "..." }}
  ]
}}
Output ONLY raw valid JSON.
"""
    
    new_summary = None
    for attempt in range(3):
        try:
            res_json = query_agy(prompt, timeout=180, effort="low")
            if isinstance(res_json, dict) and "keyPillars" in res_json:
                new_summary = res_json
                break
        except Exception as e:
            print(f"  Attempt {attempt+1} failed: {e}")
            time.sleep(3)
            
    if not new_summary:
        print(f"  ❌ Failed to generate new summary for {book_id}. Skipping for now.")
        return False
    
    # Update onePageSummary fields
    summary["elevatorPitch"] = clean_quotes(clean_analogies(new_summary.get("elevatorPitch", summary.get("elevatorPitch"))))
    summary["executiveSummary"] = clean_quotes(clean_analogies(new_summary.get("executiveSummary", summary.get("executiveSummary"))))
    summary["coreThesis"] = clean_quotes(clean_analogies(new_summary.get("coreThesis", summary.get("coreThesis"))))
    
    cleaned_pillars = []
    for p in new_summary.get("keyPillars", []):
        cleaned_pillars.append({
            "title": clean_quotes(clean_analogies(p.get("title", ""))),
            "description": clean_quotes(clean_analogies(p.get("description", ""))),
            "actionableTakeaway": clean_quotes(clean_analogies(p.get("actionableTakeaway", "")))
        })
    summary["keyPillars"] = cleaned_pillars
    data["onePageSummary"] = summary
    
    # Sanitize blinks
    if "blinks" in data:
        data["blinks"] = sanitize_value(data["blinks"])
    
    # Sanitize actionItems, stories, reflectionExercises, ideaCards
    for k in ["actionItems", "stories", "reflectionExercises", "ideaCards"]:
        if k in data:
            data[k] = sanitize_value(data[k])
            
    # Write back atomically
    new_content = f"import {{ Book }} from '../../types';\n\nexport const {const_name}: Book = " + json.dumps(data, indent=2) + ";\n"
    tmp_path = filepath + ".tmp"
    with open(tmp_path, "w") as f:
        f.write(new_content)
    os.replace(tmp_path, filepath)
    
    done_set.add(book_id)
    save_cache(done_set)
    print(f"  ✅ Successfully updated {book_id} with simple pillars & generic analogies.")
    return True

def main():
    import shutil
    done_set = load_cache()
    files = sorted(glob.glob(os.path.join(BOOKS_DIR, "*Expanded.ts")))
    print(f"Found {len(files)} total book files. Already processed: {len(done_set)}.")
    
    src_single = os.path.join(WORKSPACE_DIR, "dist-singlefile/BookBox.html")
    processed_count = 0

    for fp in files:
        # Check if daemon is actively drafting this file
        base_id = os.path.basename(fp).replace("Expanded.ts", "")
        draft_active = os.path.join(WORKSPACE_DIR, f"cache/drafts/{base_id}.json")
        if os.path.exists(draft_active):
            print(f"Skipping active daemon draft: {base_id}")
            continue
        try:
            if process_book(fp, done_set):
                processed_count += 1
                if processed_count % 5 == 0:
                    print(f"\n[Milestone] {processed_count} books updated. Building standalone singlefile...")
                    try:
                        subprocess.run(["npm", "run", "build"], cwd=WORKSPACE_DIR, check=True)
                        subprocess.run(["npm", "run", "build:singlefile"], cwd=WORKSPACE_DIR, check=True)
                        if os.path.exists(src_single):
                            shutil.copy2(src_single, os.path.join(WORKSPACE_DIR, "BookBox.html"))
                            shutil.copy2(src_single, os.path.join(WORKSPACE_DIR, "dist/BookBox.html"))
                            print("Updated standalone singlefile at BookBox.html!")
                    except Exception as be:
                        print(f"Incremental build warning: {be}")
        except Exception as e:
            print(f"Unhandled error processing {fp}: {e}")

    print("\n--- All existing books simplified! Running build and updating standalone singlefile ---")
    subprocess.run(["npm", "run", "build"], cwd=WORKSPACE_DIR, check=True)
    subprocess.run(["npm", "run", "build:singlefile"], cwd=WORKSPACE_DIR, check=True)
    if os.path.exists(src_single):
        shutil.copy2(src_single, os.path.join(WORKSPACE_DIR, "BookBox.html"))
        shutil.copy2(src_single, os.path.join(WORKSPACE_DIR, "dist/BookBox.html"))
        print("Updated standalone singlefile at BookBox.html!")

if __name__ == "__main__":
    main()
