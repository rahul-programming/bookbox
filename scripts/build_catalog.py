#!/usr/bin/env python3
"""
BookBox Catalog Generator
Generates src/data/bookCatalog.ts containing lightweight metadata stubs for all books.
Enables true on-demand lazy loading:
- Initial bundle size drops from ~41 MB to < 500 KB.
- Each book chunk is downloaded dynamically only when opened in the reader.
"""

import os
import glob
import re
import json

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOOKS_DIR = os.path.join(WORKSPACE_DIR, "src/data/books")
OUTPUT_FILE = os.path.join(WORKSPACE_DIR, "src/data/bookCatalog.ts")

def build_catalog():
    files = sorted(glob.glob(os.path.join(BOOKS_DIR, "*Expanded.ts")))
    print(f"Building catalog from {len(files)} books...")

    covers_map = {}
    covers_path = os.path.join(WORKSPACE_DIR, "src/data/bookCovers.json")
    if os.path.exists(covers_path):
        try:
            with open(covers_path, "r") as cfp:
                covers_map = json.load(cfp)
        except Exception:
            covers_map = {}

    catalog = []
    id_to_file = {}

    for f in files:
        basename = os.path.basename(f)
        rel_path = f"./books/{basename}"
        
        with open(f, "r", encoding="utf-8") as fp:
            c = fp.read()
        
        m_id = re.search(r'"id":\s*"([^"]+)"', c)
        if not m_id:
            continue
        book_id = m_id.group(1)
        id_to_file[book_id] = rel_path
        
        m_title = re.search(r'"title":\s*"([^"]+)"', c)
        m_author = re.search(r'"author":\s*"([^"]+)"', c)
        m_cat = re.search(r'"category":\s*"([^"]+)"', c)
        m_sub = re.search(r'"subcategory":\s*"([^"]+)"', c)
        m_color = re.search(r'"coverColor":\s*"([^"]+)"', c)
        m_emoji = re.search(r'"coverEmoji":\s*"([^"]+)"', c)
        m_time = re.search(r'"readingTimeMinutes":\s*([0-9]+)', c)
        m_year = re.search(r'"publishedYear":\s*([0-9]+)', c)
        m_pitch = re.search(r'"elevatorPitch":\s*"([^"]+)"', c)
        m_thesis = re.search(r'"coreThesis":\s*"([^"]+)"', c)
        
        blink_count = len(re.findall(r'"blinkNumber":\s*[0-9]+', c))
        if blink_count == 0:
            blink_count = 10
        
        m_tags = re.search(r'"tags":\s*\[([\s\S]*?)\]', c)
        tags = []
        if m_tags:
            tags = [t.strip().strip('"') for t in m_tags.group(1).split(',') if t.strip()]
        
        stub = {
            "id": book_id,
            "title": m_title.group(1) if m_title else "",
            "author": m_author.group(1) if m_author else "",
            "category": m_cat.group(1) if m_cat else "Spirituality",
            "subcategory": m_sub.group(1) if m_sub else "",
            "coverColor": m_color.group(1) if m_color else "from-blue-600 to-indigo-700",
            "coverEmoji": "📖",
            "coverImageUrl": covers_map.get(book_id) or "",
            "readingTimeMinutes": int(m_time.group(1)) if m_time else 15,
            "publishedYear": int(m_year.group(1)) if m_year else 2020,
            "totalChapters": blink_count,
            "isLoaded": False,
            "onePageSummary": {
                "elevatorPitch": m_pitch.group(1) if m_pitch else "",
                "coreThesis": m_thesis.group(1) if m_thesis else "",
                "keyPillars": [],
                "strengths": [],
                "blindSpotsAndCounterarguments": []
            },
            "blinks": [],
            "mindMap": {"id": "root", "label": m_title.group(1) if m_title else ""},
            "reflectionExercises": [],
            "actionItems": [],
            "stories": [],
            "ideaCards": [],
            "tags": tags[:5]
        }
        catalog.append(stub)

    ts_content = f"""import {{ Book, StashBoard, IdeaCard }} from '../types';

export const BOOK_LOADER_MAP: Record<string, string> = {json.dumps(id_to_file, indent=2)};

export const SEED_BOARDS: StashBoard[] = [
  {{
    id: 'board-models',
    name: 'Mental Models',
    description: 'Frameworks for sharper reasoning and decision making',
    icon: '🧠',
    color: 'bg-emerald-500',
    createdAt: Date.now() - 86400000 * 10
  }},
  {{
    id: 'board-focus',
    name: 'Peak Focus & Flow',
    description: 'Tactics for deep work, distraction defense, and high output',
    icon: '⚡',
    color: 'bg-blue-500',
    createdAt: Date.now() - 86400000 * 8
  }},
  {{
    id: 'board-wealth',
    name: 'Financial Sovereignty',
    description: 'Long-term compounding, frugality, and autonomy',
    icon: '💎',
    color: 'bg-purple-500',
    createdAt: Date.now() - 86400000 * 5
  }}
];

export const BOOK_CATALOG: Book[] = {json.dumps(catalog, indent=2)};
"""

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(ts_content)

    print(f"✅ Generated {OUTPUT_FILE} ({len(catalog)} books, {len(ts_content) / 1024:.1f} KB)")

if __name__ == "__main__":
    build_catalog()

