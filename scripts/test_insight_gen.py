import json
import subprocess
import json_repair

with open("src/data/books/atomicHabitsExpanded.ts") as f:
    text = f.read()

start_idx = text.find("= {") + 2
end_idx = text.rfind(";")
book = json.loads(text[start_idx:end_idx].strip())

ch_list = []
for b in book["blinks"][:3]:
    ch_num = b.get("chapterNumber", b.get("order"))
    headline = b.get("headline", "")
    takeaway = b.get("keyTakeaway", "")
    content_snip = b.get("content", "")[:300].replace("\n", " ")
    ch_list.append(f"- Chapter {ch_num}: {headline}\n  Takeaway: {takeaway}\n  Excerpt: {content_snip}...")

ch_str = "\n".join(ch_list)
prompt = f"""Synthesize short, punchy, witty 'wow factor' key insights for '{book['title']}' by {book['author']}.

Chapters to process:
{ch_str}

CRITICAL RULES:
- Write a 'keyInsight' for each chapter that is short (1-2 punchy paragraphs, ~150-250 words / 800-1200 chars).
- MUST deliver the 'WOW factor' of the chapter — the mind-bending counterintuitive truth or human absurdity that makes the reader say, 'Whoa, that is completely crazy!'
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

cmd = ["/opt/homebrew/bin/agy", "--disable-slash-commands", "--effort", "low", "--dangerously-skip-permissions", "-p", prompt]
res = subprocess.check_output(cmd, timeout=120).decode("utf-8")
parsed = json_repair.loads(res)
print("Parsed count:", len(parsed))
for p in parsed:
    print(f"\nCh {p.get('chapterNumber')}:")
    print(p.get('keyInsight'))

