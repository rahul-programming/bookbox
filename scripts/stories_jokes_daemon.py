#!/usr/bin/env python3
"""
BookBox Autonomous Stories & Jokes Synthesis Daemon
Processes all 400 volumes (10,000+ third-person 10-15 min stories & 10,000+ crafted jokes)
defined in src/data/stories_jokes_tracker.json.

Strict Format Standards:
- STORIES:
  * Strictly THIRD-PERSON point of view (he, she, they, named characters — zero I/me/my narration).
  * Long-form stage depth: 1,300 to 2,000 words (~10-15 minutes spoken at 135 wpm).
  * Multi-scene arc (Setup -> Rising Tension -> Deepening Obstacle -> Crisis/Turn -> Climax & Payoff).
  * Full top "Where to Use It" triggers, third-person Bridge-In, Delivery Blueprint, and inline [EMPHASIS]/[PAUSE] cues.
- JOKES:
  * Craft-focused multi-beat standup/conversational bits (45-160 words) with comic timing cues & saver lines.

Usage:
  python3 scripts/stories_jokes_daemon.py             # Run full queue with 3 parallel workers
  python3 scripts/stories_jokes_daemon.py --pilot     # Run 1 Story + 1 Joke pilot volume & build check
  python3 scripts/stories_jokes_daemon.py --workers 3 # Concurrent LLM workers inside each volume
  python3 scripts/stories_jokes_daemon.py --no-git    # Skip automated git commit/push
"""

import os
import sys
import re
import json
import time
import signal
import argparse
import threading
import subprocess
from concurrent.futures import ThreadPoolExecutor, as_completed
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
LOCK = threading.Lock()

# Rotating narrative archetypes so parallel story calls never converge on identical tropes
STORY_SEEDS = [
    "a municipal bridge inspector in Pittsburgh in the 1990s",
    "a pediatric nurse running a night clinic in rural Oregon",
    "an apprentice watchmaker in Geneva trying to save a failing shop",
    "a high-school debate coach preparing an underdog team from Detroit",
    "a regional orchestra cellist dealing with a broken rehearsal culture",
    "an emergency dispatcher during a freak winter storm in Minneapolis",
    "a family-run bakery founder facing a sudden supermarket contract loss",
    "a junior structural engineer reviewing blueprints for a coastal pier",
    "a museum curator uncovering a forged signature three days before opening",
    "a harbor tugboat captain navigating fog with an inexperienced crew",
    "a retired botany teacher restoring a polluted industrial creek",
    "a mid-career supply chain director trapped in a port strike",
    "a restaurant sous-chef holding the line when the head chef walks out",
    "an aerospace test technician spotting a hairline anomaly nobody wants to delay for",
    "a community theater stage manager salvaging a premiere with duct tape",
    "a deaf acoustic architect designing a concert hall from vibration data",
    "a bush pilot flying medical supplies across flooded northern towns",
    "a forensic accountant untangling a quiet embezzlement inside a charity",
    "an urban librarian transforming a shuttered branch into a neighborhood hub",
    "a software reliability lead managing a holiday blackout across time zones",
    "a stone mason repairing an 18th-century courthouse steeple",
    "a wildfire crew boss making a split-second ridge evacuation call",
    "a small-town newspaper editor refusing to kill a local water-safety story",
    "a wheelchair marathoner coaching a terrified first-time runner",
    "a tailor in Naples known for keeping diplomacy calm between rivals",
    "an industrial safety trainer walking onto an accident-prone factory floor",
    "a wildlife tracker locating a lost hiker using tiny broken twigs",
    "a jazz trumpeter relearning how to play after losing two teeth",
    "a school bus driver noticing a quiet shift in a shy sixth-grader",
    "a commercial diver welding underwater turbine struts in zero visibility",
    "a courtroom interpreter catching a nuance that changes a verdict",
    "a ceramics artisan whose cracked kiln batch sparks a whole design movement",
    "a customs broker rescuing perishable vaccines stuck at an airport tarmac",
    "a lighthouse mechanic keeping a foghorn running with bicycle parts",
    "a vineyard agronomist gambling on an unorthodox pruning method before frost",
    "a sound engineer for silent films adapting overnight to talkies",
    "a hospital chaplain uniting two estranged brothers in a waiting room",
    "a product designer riding delivery trucks at 4 a.m. to see why boxes crush",
    "a competitive chess arbiter handling an accusation of silent signaling",
    "a mountain guide turning an ambitious summit group back 200 meters from the top",
    "a veteran airline gate agent calming 190 stranded passengers with a chalkboard",
    "a shipyard welder insisting on re-inspecting a seam nobody else cared about",
    "an ice-cream cart vendor out-maneuvering a corporate chain through memory",
    "a theater lighting designer working with three burned-out gel frames",
    "a bicycle courier who maps an entire city's shortcuts to save an organ transport",
    "a radio producer broadcasting live from a flooded basement studio",
    "a kindergarten teacher resolving a bitter parent board feud using chairs",
    "a clocktower technician synchronizing bells across four rival parishes",
    "a marine biologist convincing skeptical fishermen to test escape hatches",
    "an independent bookstore owner turning a leaky roof disaster into a revival"
]

def signal_handler(sig, frame):
    global RUNNING
    log("Received termination signal. Finishing active calls gracefully...")
    RUNNING = False

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

def log(msg):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with LOCK:
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

def query_agy(prompt: str, timeout: int = 420, effort: str = "low"):
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
    with LOCK:
        with open(DEDUP_PATH, "w") as f:
            json.dump(dedup_map, f, indent=2)

def norm_signature(text: str) -> str:
    return re.sub(r'[^a-z0-9]+', '', text.lower())

def is_third_person_narration(clean_text: str, bridge_in: str = "") -> bool:
    """Reject first-person narration in stories (quoted character speech is permitted)."""
    narration = re.sub(r'"[^"]*"|“[^”]*”', ' ', clean_text)
    narration = re.sub(r"(?:^|(?<=[\s(\[:,—]))'[^']{6,}'", ' ', narration)

    if re.search(r"\bI\b", narration):
        return False
    if re.search(r"\b(i'm|i've|i'd|i'll|my|mine|myself|me)\b", narration, flags=re.IGNORECASE):
        return False
    if re.search(r"(?:^|[.!?]\s+)(we|our|we're|we've|we'd)\b", narration, flags=re.IGNORECASE):
        return False

    b_low = bridge_in.lower()
    if any(p in b_low for p in ("when i ", "my career", "my boss", "happened to me", "i was ", "i worked", "i learned", "i once ", "i ran into")):
        return False
    return True

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

    word_count = len(clean_text.split())
    # Long-form stories must cover ~10-15 minutes spoken (>= 1,100 words; ~135 wpm = 8-15 min)
    if expected_type == "story" and word_count < 1100:
        return None
    if expected_type == "joke" and word_count < 25:
        return None

    usage = raw.get("usageContext", {}) or {}
    bridge_in_val = clean_quotes(usage.get("bridgeIn") or (
        "Consider what happened years ago when a seemingly routine morning forced an unforgettable choice..."
        if expected_type == "story"
        else "Speaking of that, consider this for a second..."
    ))

    if expected_type == "story" and not is_third_person_narration(clean_text, bridge_in_val):
        return None

    if "[" not in annotated:
        annotated = f"[CONVERSATIONAL] {annotated}"

    situations = [clean_quotes(x) for x in (usage.get("situations") or []) if x]
    if not situations:
        situations = [clean_quotes(usage.get("primaryTrigger", "Everyday conversation"))]

    delivery = raw.get("deliveryCues", {}) or {}
    emphasis_phrases = [clean_quotes(x) for x in (delivery.get("keyEmphasisPhrases") or []) if x][:6]
    craft = raw.get("craftBreakdown", {}) or {}

    if expected_type == "story":
        # Spoken rate ~135 wpm with dramatic pauses -> 600-960 seconds (10-16 min)
        est_seconds = max(600, min(960, round((word_count / 135.0) * 60)))
    else:
        est_seconds = int(raw.get("spokenDurationSeconds") or max(15, round((word_count / 145.0) * 60)))

    return {
        "id": f"{book_id}-piece-{order}",
        "order": order,
        "type": expected_type,
        "title": title,
        "spokenDurationSeconds": est_seconds,
        "usageContext": {
            "primaryTrigger": clean_quotes(usage.get("primaryTrigger") or situations[0]),
            "situations": situations[:4],
            "audienceVibe": clean_quotes(usage.get("audienceVibe") or "Professional & social gatherings"),
            "bridgeIn": bridge_in_val,
            "bridgeOut": clean_quotes(usage.get("bridgeOut") or "And that outcome shows how quiet judgment outperforms loud certainty."),
            "avoidWhen": clean_quotes(usage.get("avoidWhen") or "")
        },
        "deliveryCues": {
            "pacingAndEnergy": clean_quotes(delivery.get("pacingAndEnergy") or "Conversational ~135 wpm; slow down deliberately on turning points and speed up during escalations."),
            "vocalTone": clean_quotes(delivery.get("vocalTone") or "Grounded curiosity at setup, warm empathy in escalation, quiet conviction at climax."),
            "pauseBeats": clean_quotes(delivery.get("pauseBeats") or "Hold clean 1.5s–2s silences before major dialogue shifts and the final takeaway."),
            "physicalAndEyeContact": clean_quotes(delivery.get("physicalAndEyeContact") or "Anchor different sections of the room per scene; lean slightly forward before pivotal lines."),
            "keyEmphasisPhrases": emphasis_phrases
        },
        "annotatedScript": annotated,
        "cleanScript": clean_text,
        "craftBreakdown": {
            "setupSummary": clean_quotes(craft.get("setupSummary") or "Immersive multi-scene premise grounding characters and stakes."),
            "turnOrMisdirection": clean_quotes(craft.get("turnOrMisdirection") or "Pivotal moment where external pressure forces a defining reversal."),
            "payoffOrTag": clean_quotes(craft.get("payoffOrTag") or "Pause 2 seconds after the final line before transitioning seamlessly to your main point."),
            "whyItLands": clean_quotes(craft.get("whyItLands") or "Vivid third-person specificity allows the audience to witness the transformation without distraction.")
        },
        "tags": [clean_quotes(t) for t in (raw.get("tags") or [expected_type])[:4] if t]
    }

def generate_story_prompt(vol: dict, slot_idx: int, seed_character: str, existing_titles: list[str]) -> str:
    recent_titles = existing_titles[-45:]
    avoid_block = ""
    if recent_titles:
        avoid_block = "STRICT ANTI-DUPLICATION: Do NOT repeat or resemble any of these existing titles:\n- " + "\n- ".join(recent_titles)

    return f"""Write 1 COMPLETE, GRIPPING, LONG-FORM THIRD-PERSON STORY (10 to 15 minutes spoken on stage: **1,400 to 1,850 words**).
Volume Title: "{vol['title']}"
Situation Category: {vol['subcategory']}
Volume Theme: {vol['angle']}
Story Slot #{slot_idx} Inspiration Seed: Center the story around {seed_character} (give them a realistic full name, vivid setting, and concrete problem aligned to "{vol['angle']}").

CRITICAL RULES (MUST FOLLOW EVERY ONE OR OUTPUT IS REJECTED):
1. **STRICT THIRD-PERSON POINT OF VIEW ONLY**:
   - Narrate 100% in third person (`he`, `she`, `they`, character names).
   - NEVER use first-person pronouns (`I`, `me`, `my`, `mine`, `myself`, `we`, `our`) anywhere in narration outside spoken dialogue enclosed in double quotes `"..."`!
   - Even `bridgeIn` MUST be third-person/observational (e.g., `"Think back to what unfolded in a small municipal office in Pittsburgh one Tuesday..."` — NEVER `"When I was..."` or `"My friend told me..."`).
2. **TRUE 10–15 MINUTE SPOKEN LENGTH (1,400 to 1,850 WORDS)**:
   - Do NOT write a short summary or 300-word anecdote. Build a full 5-part spoken masterclass narrative:
     * **Act I — World & Inciting Stake (~300 words)**: Sensory details (weather, room textures, specific dates/objects), protagonist's daily routine, and what is suddenly threatened.
     * **Act II — Escalating Friction (~350 words)**: First failed attempt to solve it, realistic secondary character pushback with crisp spoken dialogue.
     * **Act III — The Breaking Point (~300 words)**: Late-night exhaustion, self-doubt, unexpected complication raising the stakes.
     * **Act IV — The Crucial Turn & Dialogue (~350 words)**: A pivotal conversation, observation, or counter-intuitive choice told beat-by-beat.
     * **Act V — Climax & Resonant Aftermath (~250 words)**: Exact resolution, quiet emotional landing, and enduring ripple effect.
3. **STAGE DIRECTION MARKUP INSIDE `annotatedScript`**:
   - Embed readable oral delivery tags directly throughout all 5 acts:
     * `[EMPHASIS: key phrase]` on crucial turning words
     * `[PAUSE 1.5s]`, `[PAUSE 2s]`, or `[BEAT]` at major emotional beats
     * Stage tags like `[SPEED UP]`, `[SLOW DOWN]`, `[LOWER VOICE]`, `[LEAN IN]`, `[WARM SMILE]`, `[STILLNESS]`, `[SCENE SHIFT]`
4. **TOP PERFORMANCE SHEET**:
   - `usageContext`: `primaryTrigger`, `situations` (3 specific speaker scenarios), `audienceVibe`, third-person `bridgeIn`, crisp `bridgeOut`, `avoidWhen`.
   - `deliveryCues`: `pacingAndEnergy`, `vocalTone`, `pauseBeats`, `physicalAndEyeContact`, `keyEmphasisPhrases` (4–6 exact phrases).
   - `craftBreakdown`: `setupSummary`, `turnOrMisdirection`, `payoffOrTag` (audience transition tip), `whyItLands`.

{avoid_block}

Return JSON ONLY matching this exact schema:
{{
  "pieces": [
    {{
      "title": "Compelling Memorable Story Title",
      "spokenDurationSeconds": 780,
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
        "keyEmphasisPhrases": ["...", "...", "...", "..."]
      }},
      "annotatedScript": "... (1,400-1,850 words in rich third-person prose with inline [STAGE CUES]) ...",
      "craftBreakdown": {{
        "setupSummary": "...",
        "turnOrMisdirection": "...",
        "payoffOrTag": "...",
        "whyItLands": "..."
      }},
      "tags": ["third-person", "tag2", "tag3"]
    }}
  ]
}}
Output strictly valid raw JSON with zero markdown preamble or trailing text."""

def generate_joke_batch_prompt(vol: dict, batch_num: int, batch_size: int, existing_titles: list[str]) -> str:
    recent_titles = existing_titles[-45:]
    avoid_block = ""
    if recent_titles:
        avoid_block = "STRICT ANTI-DUPLICATION: Do NOT reuse or rehash any of these titles/premises:\n- " + "\n- ".join(recent_titles)

    return f"""Generate {batch_size} ORIGINAL, SHARP, PERFORMANCE-READY jokes and comedic bits (NOT stale internet one-liners, NOT hacky stereotypes).
Volume Title: "{vol['title']}"
Situation Category: {vol['subcategory']}
Specific Angle for this Volume: {vol['angle']}
Batch: {batch_num}

REQUIREMENTS FOR EVERY JOKE / BIT:
1. Length & Craft: Each joke must be a multi-beat observational bit, tight setup-escalation-punchline, or razor-sharp rule-of-three comedic riff (**50 to 160 words**) written for live spoken timing like a seasoned stand-up comic or charming emcee. Favor universal observational ("everyone knows that moment...", third-person scenarios, room commentary) over fake personal biography. Keep PG-13 clean & smart.
2. Top Usage Guidance ("usageContext"):
   - "primaryTrigger": exact conversational cue to drop this joke
   - "situations": 3 specific scenarios
   - "audienceVibe": room vibe required
   - "bridgeIn": natural setup phrase that disguises it as an off-the-cuff remark
   - "bridgeOut": smooth transition back to conversation OR follow-up tag
   - "avoidWhen": when to skip this joke
3. Pro Comedian Delivery Blueprint ("deliveryCues"):
   - "pacingAndEnergy": rhythm, build speed, act-out pacing
   - "vocalTone": deadpan vs animated contrast, inflection shift on punchline
   - "pauseBeats": exact comic timing gaps before punchline & wait-for-laugh beat
   - "physicalAndEyeContact": shrug, eyebrow raise, mic/glass prop cue, eye lock
   - "keyEmphasisPhrases": 2 to 4 hit-words to stress cleanly
4. Stage Markup Inside "annotatedScript":
   - Embed `[EMPHASIS: punch word]`, `[PAUSE 1s]`, `[BEAT]`, `[DEADPAN]`, `[ACT OUT]`, `[SHRUG]`, `[TAG]`, `[CALLBACK]`
5. Craft Breakdown ("craftBreakdown"): "setupSummary", "turnOrMisdirection", "payoffOrTag" (bonus follow-up tag + room-recovery saver line if nobody laughs), "whyItLands".

{avoid_block}

Return JSON ONLY:
{{
  "pieces": [
    {{
      "title": "...",
      "spokenDurationSeconds": 25,
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
Output strictly valid raw JSON with zero preamble."""

def _generate_one_story_slot(vol: dict, slot_idx: int, seed_char: str, existing_titles: list[str]):
    prompt = generate_story_prompt(vol, slot_idx, seed_char, existing_titles)
    data = query_agy(prompt, timeout=420, effort="low")
    raw_list = data.get("pieces", [])
    if not isinstance(raw_list, list) or not raw_list:
        return None
    return sanitize_piece(raw_list[0], vol["id"], slot_idx, "story")

def synthesize_volume(vol: dict, dedup_map: dict, workers: int = 3) -> bool:
    book_id = vol["id"]
    fmt = vol["bookFormat"]
    target_count = vol["targetCount"]
    sub = vol["subcategory"]
    expected_type = "story" if fmt == "stories" else "joke"

    draft_path = os.path.join(DRAFT_DIR, f"{book_id}.json")
    draft = {"pieces": []}
    if os.path.exists(draft_path):
        try:
            with open(draft_path, "r") as f:
                draft = json.load(f)
        except Exception:
            draft = {"pieces": []}

    pieces = draft.get("pieces", [])
    # Re-validate cached draft stories under strict 3rd-person + 10-15 min floor
    if fmt == "stories":
        pieces = [
            p for p in pieces
            if len(p.get("cleanScript", "").split()) >= 1100
            and is_third_person_narration(p.get("cleanScript", ""), p.get("usageContext", {}).get("bridgeIn", ""))
        ]

    seen_sigs = set(dedup_map.get(sub, []))
    for p in pieces:
        seen_sigs.add(norm_signature(p["title"]))
        seen_sigs.add(norm_signature(p["cleanScript"][:80]))

    existing_titles = [p["title"] for p in pieces]
    stalls = 0

    if fmt == "stories":
        attempt_round = 0
        while len(pieces) < target_count and RUNNING:
            remaining = target_count - len(pieces)
            batch_n = min(workers, remaining)
            attempt_round += 1
            start_slot = len(pieces) + 1
            log(f"[{book_id}] Generating {batch_n} long-form 3rd-person stories ({len(pieces)}/{target_count} done, round {attempt_round})...")

            futures_map = {}
            with ThreadPoolExecutor(max_workers=batch_n) as pool:
                for offset in range(batch_n):
                    slot_num = start_slot + offset
                    seed_char = STORY_SEEDS[(slot_num - 1 + attempt_round * 7) % len(STORY_SEEDS)]
                    fut = pool.submit(_generate_one_story_slot, vol, slot_num, seed_char, list(existing_titles))
                    futures_map[fut] = slot_num

                added = 0
                quota_hit = False
                auth_required = False
                for fut in as_completed(futures_map):
                    try:
                        sanitized = fut.result()
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
                    except Exception as e:
                        err_msg = str(e)
                        if "Authentication required" in err_msg or "authentication failed" in err_msg.lower():
                            auth_required = True
                        elif "RESOURCE_EXHAUSTED" in err_msg or "429" in err_msg:
                            quota_hit = True
                            log(f"⚠️ Quota limit encountered on {book_id}: {err_msg[:160]}")
                        else:
                            log(f"⚠️ Story slot error on {book_id}: {err_msg[:180]}")

            draft["pieces"] = pieces
            with open(draft_path, "w") as f:
                json.dump(draft, f, indent=2)

            if auth_required:
                log("🔒 Authentication required for agy CLI. Draft saved; stopping daemon cleanly.")
                raise PermissionError("agy authentication required")

            if quota_hit:
                log("Cooling down 120s for quota recovery...")
                time.sleep(120)
                continue

            log(f"[{book_id}] Round {attempt_round}: accepted {added} new ({len(pieces)}/{target_count})")
            if added == 0:
                stalls += 1
                if stalls >= 5:
                    raise RuntimeError("5 consecutive story rounds yielded 0 valid items meeting 3rd-person + 1,100w floor")
            else:
                stalls = 0
    else:
        batch_num = 1
        while len(pieces) < target_count and RUNNING:
            needed = min(10, target_count - len(pieces))
            request_count = needed if needed >= 3 else min(10, needed + 2)
            log(f"[{book_id}] Generating batch {batch_num} ({len(pieces)}/{target_count} done, requesting {request_count} jokes)...")
            prompt = generate_joke_batch_prompt(vol, batch_num, request_count, existing_titles)
            try:
                data = query_agy(prompt, timeout=360, effort="low")
                raw_list = data.get("pieces", [])
                if not isinstance(raw_list, list):
                    raw_list = []

                added = 0
                for raw in raw_list:
                    if len(pieces) >= target_count:
                        break
                    sanitized = sanitize_piece(raw, book_id, len(pieces) + 1, "joke")
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
                        raise RuntimeError("3 consecutive joke batches yielded 0 valid unique items")
                else:
                    stalls = 0
            except RuntimeError as e:
                err_msg = str(e)
                if "Authentication required" in err_msg or "authentication failed" in err_msg.lower():
                    log("🔒 Authentication required for agy CLI. Stopping daemon cleanly without marking failure.")
                    raise PermissionError("agy authentication required")
                if "RESOURCE_EXHAUSTED" in err_msg or "429" in err_msg:
                    log(f"⚠️ Quota limit encountered on {book_id}: {err_msg[:180]}. Cooling down 120s...")
                    time.sleep(120)
                    continue
                raise

    if not RUNNING:
        return False

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
            "elevatorPitch": (
                f"{len(pieces)} detailed third-person stories (10–15 min each) for {sub}: {vol['angle']}. Complete with usage triggers, vocal emphasis, and pause cues."
                if fmt == "stories"
                else f"{len(pieces)} crafted situational jokes & bits for {sub}: {vol['angle']}. Each includes exact usage triggers, vocal emphasis, and pause cues."
            ),
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
        "tags": ["Stories & Jokes", sub, "Jokes & Comedy" if fmt == "jokes" else "Third-Person Storytelling"]
    }

    camel = to_camel_case(book_id)
    screaming = to_screaming_snake(book_id)
    file_name = f"{camel}Performance.ts"
    file_path = os.path.join(PERF_DIR, file_name)

    ts_content = (
        f"// {vol['title']} ({sub} · {'Jokes' if fmt == 'jokes' else 'Third-Person Stories'})\n"
        f"// Generated by BookBox Performer Pipeline\n\n"
        f"import {{ Book }} from '../../types';\n\n"
        f"export const {screaming}: Book = {json.dumps(book_obj, indent=2)};\n"
    )
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(ts_content)

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
    subprocess.run(["git", "add", "src/data/performance", "src/data/bookCatalog.ts"], cwd=WORKSPACE_DIR, check=True)
    subprocess.run(["git", "commit", "-m", f"feat(stories-jokes): batch of {count} performance volumes added"], cwd=WORKSPACE_DIR, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=WORKSPACE_DIR, check=True)
    log("🚀 Pushed batch to origin main!")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--pilot", action="store_true", help="Synthesize pending pilot volume(s) and verify build")
    parser.add_argument("--workers", type=int, default=1, help="Concurrent LLM workers for long-form stories (default 1 avoids macOS Keychain refresh collisions)")
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
        log(f"🧪 PILOT MODE: Synthesizing {len(queue)} pending pilot volume(s) (workers={args.workers})...")
    else:
        queue = [v for v in volumes if v["status"] in ("pending", "in_progress")]
        log("=" * 80)
        log(f"🎭 BOOKBOX STORIES & JOKES DAEMON STARTED ({len(queue)} volumes queued, workers={args.workers})")
        log("=" * 80)

    batch_completed = 0
    for vol in queue:
        if not RUNNING:
            break
        vol["status"] = "in_progress"
        with open(TRACKER_PATH, "w") as f:
            json.dump(tracker, f, indent=2)

        try:
            ok = synthesize_volume(vol, dedup_map, workers=args.workers)
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
        except PermissionError as auth_err:
            vol["status"] = "pending"
            vol["lastError"] = str(auth_err)
            with open(TRACKER_PATH, "w") as f:
                json.dump(tracker, f, indent=2)
            log(f"🛑 Pausing queue cleanly: {auth_err}. Please re-authenticate agy CLI and resume.")
            break
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
    if ok_build and batch_completed > 0 and not args.no_git:
        git_push_batch(batch_completed)
    log("🏁 Stories & Jokes daemon cycle finished.")

if __name__ == "__main__":
    main()
