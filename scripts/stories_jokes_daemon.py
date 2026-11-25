#!/usr/bin/env python3
"""
BookBox Autonomous Stories & Jokes Synthesis Daemon
Processes all 400 volumes (10,000+ detailed stories & 10,000+ crafted jokes)
defined in src/data/stories_jokes_tracker.json.

Completely separate from synthesis_daemon.py and standard 15-min book summaries.
Each volume contains 50 curated performance pieces with:
- Explicit "Where to Use" triggers, audience fit, bridge-in & bridge-out lines
- Pro verbal delivery blueprint (pace, vocal tone, pauses, body/eye contact, emphasis words)
- Stage-annotated script ([EMPHASIS: ...], [PAUSE 1.5s], [LOWER VOICE], [BEAT]) + clean script
- Narrative/Comedic craft breakdown + room recovery/tag line

Usage:
  python3 scripts/stories_jokes_daemon.py             # Run full queue
  python3 scripts/stories_jokes_daemon.py --pilot     # Run 1 Story + 1 Joke pilot volume & build check
  python3 scripts/stories_jokes_daemon.py --no-git    # Skip automated git commit/push
"""

import os
import sys
import re
import json
import time
import signal
import argparse
import subprocess
from datetime import datetime
from build_catalog import build_catalog

for p in ["/opt/homebrew/bin", "/usr/local/bin"]:
    if p not in os.environ.get("PATH", ""):
        os.environ["PATH"] = f"{p}:{os.environ.get('PATH', '')}"

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRACKER_PATH = os.path.join(WORKSPACE_DIR, "src/data/stories_jokes_tracker.json")
PERF_DIR = os.path.join(WORKSPACE_DIR, "src/data/performance")
DRAFT_DIR = os.path.join(WORKSPACE_DIR, "logs/.perf_drafts")
DEDUP_PATH = os.path.join(WORKSPACE_DIR, "logs/.perf_dedup.json")
LOG_PATH = os.path.join(WORKSPACE_DIR, "logs/stories_jokes_daemon.log")

os.makedirs(PERF_DIR, exist_ok=True)
os.makedirs(DRAFT_DIR, exist_ok=True)
os.makedirs(os.path.dirname(LOG_PATH), exist_ok=True)

RUNNING = True

def signal_handler(sig, frame):
    global RUNNING
    log("Received termination signal. Finishing current batch gracefully...")
    RUNNING = False

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

def log(msg):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{ts}] {msg}", flush=True)

def to_camel_case(slug):
    parts = re.split(r'[^a-zA-Z0-9]+', slug)
    parts = [p for p in parts if p]
    if not parts:
        return "perfVolume"
    return parts[0].lower() + "".join(p.capitalize() for p in parts[1:])

def to_screaming_snake(slug):
    return re.sub(r'[^a-zA-Z0-9]+', '_', slug).strip('_').upper() + "_PERFORMANCE"

def derive_clean_script(annotated: str) -> str:
    """Deterministically strip stage tags and unwrap [EMPHASIS: text] -> text."""
    s = re.sub(r'\[EMPHASIS:\s*([^\]]+?)\]', r'\1', annotated, flags=re.IGNORECASE)
    s = re.sub(r'\[[^\]]+\]', '', s)
    lines = []
    for line in s.splitlines():
        cleaned = re.sub(r'[ \t]{2,}', ' ', line).strip()
        cleaned = re.sub(r'\s+([,.;:!?])', r'\1', cleaned)
        if cleaned:
            lines.append(cleaned)
    return "\n\n".join(lines)

def clean_quotes(s: str) -> str:
    return re.sub(r'\*\*"([^"]+)"\*\*|\*\*([^*]+)\*\*', r'\1\2', str(s or "")).strip()

def query_agy(prompt: str, timeout: int = 360, effort: str = "low"):
    cmd = [
        "/opt/homebrew/bin/agy",
        "--disable-slash-commands",
        "--effort", effort,
        "--dangerously-skip-permissions",
        "-p", prompt
    ]
    res = subprocess.run(cmd, cwd=WORKSPACE_DIR, capture_output=True, text=True, timeout=timeout)
    if res.returncode != 0:
        err = res.stderr.strip() or res.stdout.strip()
        raise RuntimeError(f"agy error (code {res.returncode}): {err}")
    text = res.stdout.strip()
    m = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
    if m:
        text = m.group(1).strip()
    try:
        import json_repair
        return json_repair.loads(text)
    except Exception:
        pass
    try:
        return json.loads(text)
    except Exception:
        start = text.find('{')
        end = text.rfind('}')
        if start != -1 and end != -1:
            try:
                import json_repair
                return json_repair.loads(text[start:end+1])
            except Exception:
                return json.loads(text[start:end+1])
        raise ValueError("Could not parse JSON from agy output")

def load_dedup():
    if os.path.exists(DEDUP_PATH):
        try:
            with open(DEDUP_PATH, "r") as f:
                return json.load(f)
        except Exception:
            pass
    return {}

def save_dedup(dedup_map):
    with open(DEDUP_PATH, "w") as f:
        json.dump(dedup_map, f, indent=2)

def norm_signature(text: str) -> str:
    return re.sub(r'[^a-z0-9]+', '', text.lower())

def sanitize_piece(raw: dict, book_id: str, order: int, expected_type: str) -> dict | None:
    if not isinstance(raw, dict):
        return None
    title = clean_quotes(raw.get("title", f"Piece {order}"))
    annotated = clean_quotes(raw.get("annotatedScript", ""))
    if len(annotated) < 60:
        return None

    clean_text = clean_quotes(raw.get("cleanScript", ""))
    derived_clean = derive_clean_script(annotated)
    if len(derived_clean) >= 40:
        clean_text = derived_clean

    # Word count guardrails
    word_count = len(clean_text.split())
    if expected_type == "story" and word_count < 160:
        return None
    if expected_type == "joke" and word_count < 25:
        return None

    # Ensure stage markup exists; inject crisp markup if omitted
    if "[" not in annotated:
        annotated = f"[CONVERSATIONAL] {annotated}"

    usage = raw.get("usageContext", {}) or {}
    situations = [clean_quotes(x) for x in (usage.get("situations") or []) if x]
    if not situations:
        situations = [clean_quotes(usage.get("primaryTrigger", "Everyday conversation"))]

    delivery = raw.get("deliveryCues", {}) or {}
    emphasis_phrases = [clean_quotes(x) for x in (delivery.get("keyEmphasisPhrases") or []) if x][:5]

    craft = raw.get("craftBreakdown", {}) or {}

    return {
        "id": f"{book_id}-piece-{order}",
        "order": order,
        "type": expected_type,
        "title": title,
        "spokenDurationSeconds": int(raw.get("spokenDurationSeconds") or (95 if expected_type == "story" else 25)),
        "usageContext": {
            "primaryTrigger": clean_quotes(usage.get("primaryTrigger") or situations[0]),
            "situations": situations[:4],
            "audienceVibe": clean_quotes(usage.get("audienceVibe") or "Professional & social gatherings"),
            "bridgeIn": clean_quotes(usage.get("bridgeIn") or "That actually reminds me of something I ran into recently..."),
            "bridgeOut": clean_quotes(usage.get("bridgeOut") or "And that's why timing and perspective change everything."),
            "avoidWhen": clean_quotes(usage.get("avoidWhen") or "")
        },
        "deliveryCues": {
            "pacingAndEnergy": clean_quotes(delivery.get("pacingAndEnergy") or "Conversational ~125 wpm; slow down slightly before the turn."),
            "vocalTone": clean_quotes(delivery.get("vocalTone") or "Warm curiosity on setup, then drop pitch slightly on the payoff."),
            "pauseBeats": clean_quotes(delivery.get("pauseBeats") or "Hold a full 1.5-second silence before delivering the closing line."),
            "physicalAndEyeContact": clean_quotes(delivery.get("physicalAndEyeContact") or "Steady eye contact during setup; lean in lightly before the turn."),
            "keyEmphasisPhrases": emphasis_phrases
        },
        "annotatedScript": annotated,
        "cleanScript": clean_text,
        "craftBreakdown": {
            "setupSummary": clean_quotes(craft.get("setupSummary") or "Relatable premise establishing shared expectations."),
            "turnOrMisdirection": clean_quotes(craft.get("turnOrMisdirection") or "Sharp perspective flip subverting the assumed outcome."),
            "payoffOrTag": clean_quotes(craft.get("payoffOrTag") or "If the room stays quiet, smile briefly and pivot straight into your next point."),
            "whyItLands": clean_quotes(craft.get("whyItLands") or "Uses contrast and specificity to trigger instant recognition.")
        },
        "tags": [clean_quotes(t) for t in (raw.get("tags") or [expected_type])[:4] if t]
    }

def generate_batch_prompt(vol: dict, batch_num: int, batch_size: int, existing_titles: list[str]) -> str:
    fmt = vol["bookFormat"]
    is_story = fmt == "stories"
    recent_titles = existing_titles[-45:]
    avoid_block = ""
    if recent_titles:
        avoid_block = "STRICT ANTI-DUPLICATION: Do NOT reuse or rehash any of these titles/premises:\n- " + "\n- ".join(recent_titles)

    if is_story:
        spec = f"""Generate {batch_size} ORIGINAL, VIVID, DETAILED storytelling pieces (NOT summaries, NOT clichés, NOT fable summaries).
Volume Title: "{vol['title']}"
Situation Category: {vol['subcategory']}
Specific Angle for this Volume: {vol['angle']}
Batch: {batch_num}

REQUIREMENTS FOR EVERY STORY:
1. Length & Depth: Each "annotatedScript" MUST be **240 to 420 words** long — rich human characters, specific sensory details, natural spoken dialogue, mounting tension, turning point, and memorable payoff. Write as spoken aloud by a world-class Moth storyteller or keynote speaker.
2. Top Usage Guidance: Start each story object with crystal-clear "usageContext":
   - "primaryTrigger": exact 1-line moment to use it (e.g., "When a team panics after losing a major client")
   - "situations": 3 concrete triggers
   - "audienceVibe": room tone & audience fit
   - "bridgeIn": natural conversational segue sentence to smoothly introduce the story aloud
   - "bridgeOut": crisp closing tie-back sentence linking back to the speaker's point
   - "avoidWhen": when NOT to tell this story
3. Pro Delivery Blueprint ("deliveryCues"):
   - "pacingAndEnergy": specific wpm/tempo shift guidance
   - "vocalTone": exact pitch/volume instructions (whisper, warmth, dry restraint, urgency)
   - "pauseBeats": exact timestamps/words where the teller holds silence
   - "physicalAndEyeContact": posture, hand gesture, and eye-contact direction
   - "keyEmphasisPhrases": 3 to 5 exact key phrases from the story to punch vocally
4. Stage Markup Inside "annotatedScript":
   - Embed readable inline cues directly inside the text:
     * `[EMPHASIS: phrase]` around high-impact words
     * `[PAUSE 1.5s]` or `[BEAT]` right before key reveals/turns
     * Tone cues like `[LOWER VOICE]`, `[SPEED UP]`, `[LEAN IN]`, `[SMILE]`, `[DEADPAN]`
5. Craft Breakdown ("craftBreakdown"): "setupSummary", "turnOrMisdirection", "payoffOrTag" (recovery line if the room misses it), "whyItLands"."""
    else:
        spec = f"""Generate {batch_size} ORIGINAL, SHARP, PERFORMANCE-READY jokes and comedic bits (NOT stale internet one-liners, NOT hacky stereotypes).
Volume Title: "{vol['title']}"
Situation Category: {vol['subcategory']}
Specific Angle for this Volume: {vol['angle']}
Batch: {batch_num}

REQUIREMENTS FOR EVERY JOKE / BIT:
1. Length & Craft: Each joke must be a multi-beat observational bit, tight setup-escalation-punchline, or razor-sharp rule-of-three comedic riff (**45 to 160 words**) written for live spoken timing like a seasoned stand-up comic or charming emcee. Keep content clever, fresh, and socially calibrated (PG-13 safe for events/work/parties unless angle specifies gentle roast).
2. Top Usage Guidance ("usageContext"):
   - "primaryTrigger": exact conversational cue to drop this joke
   - "situations": 3 specific scenarios
   - "audienceVibe": room vibe required
   - "bridgeIn": natural setup phrase that disguises it as an off-the-cuff remark rather than "hey wanna hear a joke?"
   - "bridgeOut": smooth transition back to conversation OR follow-up tag
   - "avoidWhen": when to skip this joke
3. Pro Comedian Delivery Blueprint ("deliveryCues"):
   - "pacingAndEnergy": rhythm, build speed, act-out pacing
   - "vocalTone": deadpan vs animated contrast, inflection shift on punchline
   - "pauseBeats": exact comic timing gaps before punchline & wait-for-laugh beat
   - "physicalAndEyeContact": shrug, eyebrow raise, mic/glass prop cue, eye lock
   - "keyEmphasisPhrases": 2 to 4 hit-words to stress cleanly
4. Stage Markup Inside "annotatedScript":
   - Embed crisp stage markup directly inside the text:
     * `[EMPHASIS: punch word]`
     * `[PAUSE 1s]` or `[BEAT]` right before the misdirection/punchline
     * Direction tags like `[DEADPAN]`, `[ACT OUT]`, `[SHRUG]`, `[TAG]`, `[CALLBACK]`
5. Craft Breakdown ("craftBreakdown"): "setupSummary", "turnOrMisdirection", "payoffOrTag" (includes a bonus follow-up tag AND a room-recovery saver line if nobody laughs), "whyItLands"."""

    return f"""{spec}

{avoid_block}

Return JSON ONLY with this exact schema:
{{
  "pieces": [
    {{
      "title": "Distinct Memorable Hook Title",
      "spokenDurationSeconds": 90,
      "usageContext": {{
        "primaryTrigger": "...",
        "situations": ["...", "...", "..."],
        "audienceVibe": "...",
        "bridgeIn": "...",
        "bridgeOut": "...",
        "avoidWhen": "..."
      }},
      "deliveryCues": {{
        "pacingAndEnergy": "...",
        "vocalTone": "...",
        "pauseBeats": "...",
        "physicalAndEyeContact": "...",
        "keyEmphasisPhrases": ["...", "..."]
      }},
      "annotatedScript": "...",
      "craftBreakdown": {{
        "setupSummary": "...",
        "turnOrMisdirection": "...",
        "payoffOrTag": "...",
        "whyItLands": "..."
      }},
      "tags": ["tag1", "tag2", "tag3"]
    }}
  ]
}}
Output strictly valid raw JSON with zero markdown preamble or trailing notes."""

def synthesize_volume(vol: dict, dedup_map: dict) -> bool:
    book_id = vol["id"]
    fmt = vol["bookFormat"]
    target_count = vol["targetCount"]
    sub = vol["subcategory"]
    expected_type = "story" if fmt == "stories" else "joke"
    batch_size = 5 if fmt == "stories" else 10

    draft_path = os.path.join(DRAFT_DIR, f"{book_id}.json")
    draft = {"pieces": []}
    if os.path.exists(draft_path):
        try:
            with open(draft_path, "r") as f:
                draft = json.load(f)
        except Exception:
            draft = {"pieces": []}

    pieces = draft.get("pieces", [])
    seen_sigs = set(dedup_map.get(sub, []))
    for p in pieces:
        seen_sigs.add(norm_signature(p["title"]))
        seen_sigs.add(norm_signature(p["cleanScript"][:80]))

    existing_titles = [p["title"] for p in pieces]
    batch_num = 1
    stalls = 0

    while len(pieces) < target_count and RUNNING:
        needed = min(batch_size, target_count - len(pieces))
        request_count = needed if needed >= 3 else min(batch_size, needed + 2)
        log(f"[{book_id}] Generating batch {batch_num} ({len(pieces)}/{target_count} done, requesting {request_count} {expected_type}s)...")

        prompt = generate_batch_prompt(vol, batch_num, request_count, existing_titles)
        try:
            data = query_agy(prompt, timeout=360, effort="low")
            raw_list = data.get("pieces", [])
            if not isinstance(raw_list, list):
                raw_list = []

            added = 0
            for raw in raw_list:
                if len(pieces) >= target_count:
                    break
                order = len(pieces) + 1
                sanitized = sanitize_piece(raw, book_id, order, expected_type)
                if not sanitized:
                    continue
                t_sig = norm_signature(sanitized["title"])
                b_sig = norm_signature(sanitized["cleanScript"][:80])
                if t_sig in seen_sigs or b_sig in seen_sigs:
                    continue
                seen_sigs.add(t_sig)
                seen_sigs.add(b_sig)
                pieces.append(sanitized)
                existing_titles.append(sanitized["title"])
                added += 1

            draft["pieces"] = pieces
            with open(draft_path, "w") as f:
                json.dump(draft, f, indent=2)

            log(f"[{book_id}] Batch {batch_num}: accepted {added} new ({len(pieces)}/{target_count})")
            batch_num += 1
            if added == 0:
                stalls += 1
                if stalls >= 3:
                    raise RuntimeError("3 consecutive batches yielded 0 valid unique items")
            else:
                stalls = 0
        except RuntimeError as e:
            err_msg = str(e)
            if "RESOURCE_EXHAUSTED" in err_msg or "429" in err_msg:
                log(f"⚠️ Quota limit encountered on {book_id}: {err_msg[:180]}. Cooling down 120s...")
                time.sleep(120)
                continue
            raise

    if not RUNNING:
        return False

    # Re-index orders cleanly 1..N
    for idx, p in enumerate(pieces, 1):
        p["order"] = idx
        p["id"] = f"{book_id}-piece-{idx}"

    total_seconds = sum(p["spokenDurationSeconds"] for p in pieces)
    total_mins = max(15, round(total_seconds / 60))

    book_obj = {
        "id": book_id,
        "title": vol["title"],
        "author": vol["author"],
        "category": "Stories & Jokes",
        "subcategory": sub,
        "bookFormat": fmt,
        "coverColor": "from-fuchsia-900 to-purple-950" if fmt == "jokes" else "from-rose-900 to-amber-950",
        "coverEmoji": "🎤" if fmt == "jokes" else "🎭",
        "readingTimeMinutes": total_mins,
        "publishedYear": 2026,
        "totalChapters": len(pieces),
        "isLoaded": True,
        "onePageSummary": {
            "elevatorPitch": f"{len(pieces)} situational {'jokes & comedic bits' if fmt == 'jokes' else 'detailed performance stories'} for {sub}: {vol['angle']}. Each includes exact usage triggers, vocal emphasis, and pause cues.",
            "coreThesis": vol["angle"],
            "keyPillars": [],
            "strengths": [],
            "blindSpotsAndCounterarguments": []
        },
        "blinks": [],
        "mindMap": {"id": "root", "label": vol["title"]},
        "reflectionExercises": [],
        "actionItems": [],
        "stories": [],
        "ideaCards": [],
        "performancePieces": pieces,
        "tags": ["Stories & Jokes", sub, "Jokes & Comedy" if fmt == "jokes" else "Storytelling"]
    }

    camel = to_camel_case(book_id)
    screaming = to_screaming_snake(book_id)
    file_name = f"{camel}Performance.ts"
    file_path = os.path.join(PERF_DIR, file_name)

    ts_content = (
        f"// {vol['title']} ({sub} · {'Jokes' if fmt == 'jokes' else 'Stories'})\n"
        f"// Generated by BookBox Performer Pipeline\n\n"
        f"import {{ Book }} from '../../types';\n\n"
        f"export const {screaming}: Book = {json.dumps(book_obj, indent=2)};\n"
    )
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(ts_content)

    # Save cross-volume dedup signatures (keep recent 400 signatures per pillar)
    pillar_sigs = list(dict.fromkeys(dedup_map.get(sub, []) + [norm_signature(p["title"]) for p in pieces]))
    dedup_map[sub] = pillar_sigs[-400:]
    save_dedup(dedup_map)

    log(f"✅ Generated {file_path} ({len(pieces)} {expected_type}s, {len(ts_content):,} chars)")
    return True

def verify_build():
    log("Verifying build with 'npm run build'...")
    res = subprocess.run(["npm", "run", "build"], cwd=WORKSPACE_DIR, capture_output=True, text=True)
    if res.returncode != 0:
        log(f"❌ Build failed:\n{res.stdout}\n{res.stderr}")
        return False
    log("✅ Build verified cleanly!")
    return True

def git_push_batch(count: int):
    log(f"📦 Pushing batch of {count} performance volumes to git origin main...")
    subprocess.run(["git", "add", "src/data/performance", "src/data/bookCatalog.ts", "src/data/stories_jokes_tracker.json"], cwd=WORKSPACE_DIR, check=True)
    subprocess.run(["git", "commit", "-m", f"feat(stories-jokes): batch of {count} performance volumes added"], cwd=WORKSPACE_DIR, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=WORKSPACE_DIR, check=True)
    log("🚀 Pushed batch to origin main!")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--pilot", action="store_true", help="Synthesize only 1 Story pilot + 1 Joke pilot volume and verify build")
    parser.add_argument("--no-git", action="store_true", help="Skip git commits/pushes")
    args = parser.parse_args()

    if not os.path.exists(TRACKER_PATH):
        log(f"❌ Tracker not found at {TRACKER_PATH}. Run stories_jokes_blueprint.py first.")
        sys.exit(1)

    with open(TRACKER_PATH, "r") as f:
        tracker = json.load(f)

    dedup_map = load_dedup()
    volumes = tracker["volumes"]

    if args.pilot:
        story_pilot = next((v for v in volumes if v["bookFormat"] == "stories" and v["status"] == "pending"), None)
        joke_pilot = next((v for v in volumes if v["bookFormat"] == "jokes" and v["status"] == "pending"), None)
        queue = [v for v in [story_pilot, joke_pilot] if v]
        log(f"🧪 PILOT MODE: Synthesizing {len(queue)} volumes (1 Story + 1 Joke)...")
    else:
        queue = [v for v in volumes if v["status"] in ("pending", "in_progress")]
        log("=" * 80)
        log(f"🎭 BOOKBOX STORIES & JOKES DAEMON STARTED ({len(queue)} volumes queued)")
        log("=" * 80)

    batch_completed = 0
    for vol in queue:
        if not RUNNING:
            break
        vol["status"] = "in_progress"
        with open(TRACKER_PATH, "w") as f:
            json.dump(tracker, f, indent=2)

        try:
            ok = synthesize_volume(vol, dedup_map)
            if ok:
                vol["status"] = "completed"
                vol["completedCount"] = vol["targetCount"]
                batch_completed += 1
                with open(TRACKER_PATH, "w") as f:
                    json.dump(tracker, f, indent=2)

                build_catalog()
                if args.pilot:
                    continue
                if batch_completed >= 10:
                    if verify_build() and not args.no_git:
                        git_push_batch(batch_completed)
                    batch_completed = 0
        except Exception as e:
            vol["retries"] = vol.get("retries", 0) + 1
            vol["status"] = "failed" if vol["retries"] >= 3 else "pending"
            vol["lastError"] = str(e)[:300]
            log(f"❌ Error on volume {vol['id']}: {e}")
            with open(TRACKER_PATH, "w") as f:
                json.dump(tracker, f, indent=2)
            time.sleep(5)

    build_catalog()
    ok_build = verify_build()
    if ok_build and batch_completed > 0 and not args.pilot and not args.no_git:
        git_push_batch(batch_completed)
    log("🏁 Stories & Jokes daemon cycle finished.")

if __name__ == "__main__":
    main()
