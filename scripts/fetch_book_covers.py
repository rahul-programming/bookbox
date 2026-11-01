#!/usr/bin/env python3
"""
BookBox Cover Image Fetcher
Queries Open Library public cover API to resolve cover image URLs for books in the catalog.
Saves results into src/data/bookCovers.json.
"""

import os
import re
import json
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COVERS_CACHE_FILE = os.path.join(WORKSPACE_DIR, "src/data/bookCovers.json")
CATALOG_FILE = os.path.join(WORKSPACE_DIR, "src/data/bookCatalog.ts")

def fetch_single_cover(item):
    b_id, title, author = item
    
    # 1. Try search with clean title
    clean_title = re.split(r'[:(—–]', title)[0].strip()
    clean_author = author.split('&')[0].split(',')[0].strip()
    
    # Attempt 1: Title + Author
    try:
        q = urllib.parse.urlencode({'title': clean_title, 'author': clean_author, 'limit': 1})
        url = f"https://openlibrary.org/search.json?{q}"
        req = urllib.request.Request(url, headers={'User-Agent': 'BookBox/1.0 (books@bookbox.app)'})
        with urllib.request.urlopen(req, timeout=4) as res:
            d = json.loads(res.read())
            docs = d.get('docs', [])
            if docs:
                if 'cover_i' in docs[0]:
                    return b_id, f"https://covers.openlibrary.org/b/id/{docs[0]['cover_i']}-M.jpg"
                elif 'isbn' in docs[0] and docs[0]['isbn']:
                    return b_id, f"https://covers.openlibrary.org/b/isbn/{docs[0]['isbn'][0]}-M.jpg"
    except Exception:
        pass

    # Attempt 2: Title only
    try:
        q = urllib.parse.urlencode({'title': clean_title, 'limit': 1})
        url = f"https://openlibrary.org/search.json?{q}"
        req = urllib.request.Request(url, headers={'User-Agent': 'BookBox/1.0 (books@bookbox.app)'})
        with urllib.request.urlopen(req, timeout=4) as res:
            d = json.loads(res.read())
            docs = d.get('docs', [])
            if docs:
                if 'cover_i' in docs[0]:
                    return b_id, f"https://covers.openlibrary.org/b/id/{docs[0]['cover_i']}-M.jpg"
                elif 'isbn' in docs[0] and docs[0]['isbn']:
                    return b_id, f"https://covers.openlibrary.org/b/isbn/{docs[0]['isbn'][0]}-M.jpg"
    except Exception:
        pass

    return b_id, None

def fetch_all_covers():
    existing_covers = {}
    if os.path.exists(COVERS_CACHE_FILE):
        try:
            with open(COVERS_CACHE_FILE, "r") as f:
                existing_covers = json.load(f)
        except Exception:
            existing_covers = {}

    with open(CATALOG_FILE, "r") as f:
        content = f.read()

    # Extract all books from catalog
    matches = re.findall(r'"id":\s*"([^"]+)",\s*"title":\s*"([^"]+)",\s*"author":\s*"([^"]+)"', content)
    
    to_fetch = [m for m in matches if m[0] not in existing_covers or not existing_covers[m[0]]]
    print(f"Total books in catalog: {len(matches)}. Cached covers: {len(existing_covers)}. Fetching {len(to_fetch)} covers...")

    if to_fetch:
        with ThreadPoolExecutor(max_workers=10) as executor:
            results = list(executor.map(fetch_single_cover, to_fetch))
        
        for bid, cover_url in results:
            if cover_url:
                existing_covers[bid] = cover_url

        with open(COVERS_CACHE_FILE, "w") as f:
            json.dump(existing_covers, f, indent=2)

    found_count = len(existing_covers)
    print(f"✅ Cover cache updated at {COVERS_CACHE_FILE} ({found_count} covers cached)")
    return existing_covers

if __name__ == "__main__":
    fetch_all_covers()

