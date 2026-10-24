import subprocess
import json
import re

def query_agy(prompt, timeout=120):
    cmd = ['/opt/homebrew/bin/agy', '--dangerously-skip-permissions', '-p', prompt]
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
    text = res.stdout.strip()
    m = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', text)
    if m:
        text = m.group(1).strip()
    try:
        return json.loads(text)
    except Exception:
        # fallback: find first { and last }
        start = text.find('{')
        end = text.rfind('}')
        if start != -1 and end != -1:
            return json.loads(text[start:end+1])
        raise

if __name__ == "__main__":
    prompt = """
Return a JSON object for the book "Factfulness" by Hans Rosling with keys:
- "publishedYear": 2018
- "totalChapters": 11
- "chapters": array of strings (the 10 instincts + conclusion)
Output ONLY raw valid JSON, no conversational text.
"""
    res = query_agy(prompt)
    print("SUCCESS:")
    print(json.dumps(res, indent=2))
