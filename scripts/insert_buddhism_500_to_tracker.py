import json, os

WORKSPACE_DIR = "/Users/rahulsharma/Documents/coding/myapps/bookbox"
TRACKER_PATH = os.path.join(WORKSPACE_DIR, "src/data/synthesis_tracker.json")
BUDDHISM_JSON = os.path.join(WORKSPACE_DIR, "scripts/buddhism_500_catalog.json")

with open(TRACKER_PATH, "r") as f:
    tracker = json.load(f)

with open(BUDDHISM_JSON, "r") as f:
    buddhism_books = json.load(f)[:500]  # Exactly top 500 books

existing_books = tracker.get("books", [])
existing_ids = set(b["id"] for b in existing_books)

# Check if any of the new books already exist in tracker
filtered_buddhism = []
for b in buddhism_books:
    if b["id"] not in existing_ids:
        filtered_buddhism.append(b)
    else:
        # If it already existed but was pending, we will move it to the top
        pass

print(f"Adding {len(filtered_buddhism)} new unique Buddhism books.")

completed = [b for b in existing_books if b.get("status") == "completed"]
in_progress = [b for b in existing_books if b.get("status") == "in_progress"]
existing_pending = [b for b in existing_books if b.get("status") not in ("completed", "in_progress")]

# Place Buddhism books at the VERY TOP of the pending queue!
# Order: Completed -> In Progress -> 500 Buddhism Books -> Other Pending Books
new_book_list = completed + in_progress + filtered_buddhism + existing_pending

# Re-index
for i, b in enumerate(new_book_list, 1):
    b["index"] = i

tracker["books"] = new_book_list
tracker["totalCatalogBooks"] = len(new_book_list)

# Update dimension 20 total in dimensionSummary
for d in tracker.get("dimensionSummary", []):
    if d.get("dimensionId") == 20:
        d["totalBooks"] = d.get("totalBooks", 40) + len(filtered_buddhism)

with open(TRACKER_PATH, "w") as f:
    json.dump(tracker, f, indent=2)

print(f"Successfully updated {TRACKER_PATH}!")
print(f"Total catalog books now: {len(new_book_list)}")
print(f"Completed: {len(completed)}")
print(f"In Progress: {len(in_progress)}")
print(f"First 5 pending books in pipeline:")
pending_now = [b for b in new_book_list if b.get("status") not in ("completed", "failed", "skipped", "in_progress")]
for b in pending_now[:5]:
    print(f" - [{b['index']}] {b['title']} by {b['author']} ({b['category']} / {b['subcategory']})")

