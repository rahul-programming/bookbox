import os, json, glob, re
from classifier import classify_book, VALID_TAXONOMY

WORKSPACE_DIR = "/Users/rahulsharma/Documents/coding/myapps/bookbox"
TRACKER_PATH = os.path.join(WORKSPACE_DIR, "src/data/synthesis_tracker.json")

with open(TRACKER_PATH, "r") as f:
    tracker = json.load(f)

tracker_books = tracker.get("books", [])
tracker_by_id = {b["id"]: b for b in tracker_books}
tracker_by_title = {b["title"].lower().strip(): b for b in tracker_books}

print(f"Loaded {len(tracker_books)} books from tracker.")

# 1. Update tracker books
updated_tracker_count = 0
for b in tracker_books:
    cat, subcat = classify_book(b)
    b["category"] = cat
    b["subcategory"] = subcat
    b["cleanSubcategory"] = subcat
    updated_tracker_count += 1

with open(TRACKER_PATH, "w") as f:
    json.dump(tracker, f, indent=2)

print(f"Updated {updated_tracker_count} books in {TRACKER_PATH}.")

# 2. Update all expanded book files
book_files = glob.glob(os.path.join(WORKSPACE_DIR, "src/data/books/*Expanded.ts"))
print(f"Found {len(book_files)} expanded book files to update.")

updated_files_count = 0
for fpath in book_files:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    id_m = re.search(r'\"id\":\s*\"([^\"]+)\"', content)
    title_m = re.search(r'\"title\":\s*\"([^\"]+)\"', content)
    b_id = id_m.group(1) if id_m else None
    title = title_m.group(1) if title_m else None

    meta = tracker_by_id.get(b_id) or (tracker_by_title.get(title.lower().strip()) if title else None)
    if not meta:
        print(f"Warning: No metadata found for {fpath} ({b_id} / {title})")
        continue

    new_cat, new_subcat = classify_book(meta)

    # Replace book level category
    # "category": "...",
    content = re.sub(
        r'(\"id\":\s*\"[^\"]+\",\s*\n\s*\"title\":\s*\"[^\"]+\",\s*\n\s*\"author\":\s*\"[^\"]+\",\s*\n\s*\"category\":\s*\")[^\"]+(\")',
        r'\g<1>' + new_cat + r'\2',
        content
    )

    # Replace book level subcategory
    # "subcategory": "...",
    content = re.sub(
        r'(\"subcategory\":\s*\")[^\"]+(\")',
        r'\g<1>' + new_subcat + r'\2',
        content
    )

    # Also update ideaCards category within the file
    # Inside "ideaCards": [... { "category": "..." } ...]
    # We can match `"category": "old_cat"` within ideaCards
    # Better yet, match any `"category": "[^"]+"` where it's one of the old categories or replace idea cards
    # Since all ideaCards belonging to this book share the book's category:
    content = re.sub(
        r'(\"bookTitle\":\s*\"[^\"]+\",\s*\n\s*\"author\":\s*\"[^\"]+\",\s*\n\s*\"category\":\s*\")[^\"]+(\")',
        r'\g<1>' + new_cat + r'\2',
        content
    )

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    updated_files_count += 1

print(f"Successfully updated {updated_files_count} expanded book files.")

# 3. Update allSeededBooks.json if it exists
seeded_json_path = os.path.join(WORKSPACE_DIR, "src/data/allSeededBooks.json")
if os.path.exists(seeded_json_path):
    with open(seeded_json_path, "r", encoding="utf-8") as f:
        seeded_books = json.load(f)
    for b in seeded_books:
        b_id = b.get("id")
        title = b.get("title")
        meta = tracker_by_id.get(b_id) or (tracker_by_title.get(title.lower().strip()) if title else None)
        if meta:
            new_cat, new_subcat = classify_book(meta)
            b["category"] = new_cat
            b["subcategory"] = new_subcat
            if "ideaCards" in b:
                for c in b["ideaCards"]:
                    c["category"] = new_cat
    with open(seeded_json_path, "w", encoding="utf-8") as f:
        json.dump(seeded_books, f, indent=2)
    print(f"Updated {len(seeded_books)} books in {seeded_json_path}.")

