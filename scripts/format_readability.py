#!/usr/bin/env python3
"""
Format paragraph lengths and mind map sentences across all books for maximum readability.
- keyInsight: 1-2 sentences per paragraph (separated by \\n\\n)
- executiveSummary: 2-3 sentences per paragraph (separated by \\n\\n)
- content (deep dive): 2-3 sentences per paragraph (separated by \\n\\n)
- stories narrative: 2-3 sentences per paragraph (separated by \\n\\n)
- mindMap descriptions: EVERY SENTENCE on its own new line (separated by \\n)
"""

import os
import re
import json
import glob
import subprocess

WORKSPACE_DIR = "/Users/rahulsharma/Documents/coding/myapps/bookbox"
BOOKS_DIR = os.path.join(WORKSPACE_DIR, "src/data/books")

def split_into_readable_paragraphs(text, max_sentences=2):
    if not text or not isinstance(text, str):
        return text
    # Split by existing paragraph boundaries
    blocks = text.split('\n\n')
    new_blocks = []
    for b in blocks:
        b = b.strip()
        if not b:
            continue
        # Split into sentences preserving punctuation
        sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', b) if s.strip()]
        if len(sentences) <= max_sentences:
            new_blocks.append(' '.join(sentences))
        else:
            for i in range(0, len(sentences), max_sentences):
                chunk = sentences[i : i + max_sentences]
                new_blocks.append(' '.join(chunk))
    return '\n\n'.join(new_blocks)

def format_mindmap_sentences_newline(node):
    if not isinstance(node, dict):
        return node
    if "description" in node and isinstance(node["description"], str):
        desc = node["description"].strip()
        if desc:
            # Split on sentence boundaries and join with \n
            sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+|\n+', desc) if s.strip()]
            node["description"] = "\n".join(sentences)
    if "children" in node and isinstance(node["children"], list):
        for child in node["children"]:
            format_mindmap_sentences_newline(child)
    return node

def format_book(filepath):
    with open(filepath) as f:
        content = f.read()

    m = re.search(r"export const (\w+): Book = ({.*});?\s*$", content, re.DOTALL)
    if not m:
        return False

    const_name = m.group(1)
    data = json.loads(m.group(2))

    # 1. Format onePageSummary
    if "onePageSummary" in data and isinstance(data["onePageSummary"], dict):
        s = data["onePageSummary"]
        if "executiveSummary" in s and isinstance(s["executiveSummary"], str):
            s["executiveSummary"] = split_into_readable_paragraphs(s["executiveSummary"], max_sentences=3)
        if "elevatorPitch" in s and isinstance(s["elevatorPitch"], str):
            s["elevatorPitch"] = split_into_readable_paragraphs(s["elevatorPitch"], max_sentences=2)

    # 2. Format blinks (keyInsight: 1-2 sentences, content: 2-3 sentences)
    if "blinks" in data and isinstance(data["blinks"], list):
        for blink in data["blinks"]:
            if isinstance(blink, dict):
                if "keyInsight" in blink and isinstance(blink["keyInsight"], str):
                    blink["keyInsight"] = split_into_readable_paragraphs(blink["keyInsight"], max_sentences=2)
                if "content" in blink and isinstance(blink["content"], str):
                    blink["content"] = split_into_readable_paragraphs(blink["content"], max_sentences=3)

    # 3. Format stories
    if "stories" in data and isinstance(data["stories"], list):
        for story in data["stories"]:
            if isinstance(story, dict) and "narrative" in story and isinstance(story["narrative"], str):
                story["narrative"] = split_into_readable_paragraphs(story["narrative"], max_sentences=3)

    # 4. Format mindMap: every sentence on a new line
    if "mindMap" in data and isinstance(data["mindMap"], dict):
        data["mindMap"] = format_mindmap_sentences_newline(data["mindMap"])

    # 5. Format ideaCards: every sentence on a new line for body and actionItem
    if "ideaCards" in data and isinstance(data["ideaCards"], list):
        for card in data["ideaCards"]:
            if isinstance(card, dict):
                if "body" in card and isinstance(card["body"], str):
                    sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+|\n+', card["body"]) if s.strip()]
                    card["body"] = "\n".join(sentences)
                if "actionItem" in card and isinstance(card["actionItem"], str):
                    act_sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+|\n+', card["actionItem"]) if s.strip()]
                    card["actionItem"] = "\n".join(act_sentences)

    # Save formatted TypeScript
    title = data.get("title", "")
    author = data.get("author", "")
    new_ts = f"""// {title} by {author}
// Category-Attuned Synthesis with Readable Paragraphs and Line-Broken Mind Map

import {{ Book }} from '../../types';

export const {const_name}: Book = {json.dumps(data, indent=2)};
"""
    with open(filepath, "w") as f:
        f.write(new_ts)
    return True

def main():
    files = sorted(glob.glob(os.path.join(BOOKS_DIR, "*.ts")))
    print(f"Formatting paragraph lengths and mind map sentences across {len(files)} books...")
    count = 0
    for fp in files:
        if format_book(fp):
            count += 1
    print(f"Successfully formatted all {count} books!")

if __name__ == "__main__":
    main()

