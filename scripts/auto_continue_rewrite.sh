#!/bin/bash
set -e

WORKSPACE_DIR="/Users/rahulsharma/Documents/coding/myapps/bookbox"
cd "$WORKSPACE_DIR"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Waiting for 'The Forty Rules of Love' to complete..."
while pgrep -f "rewrite_complete_catalog.py --book theFortyRulesOfLove" > /dev/null; do
    sleep 15
done

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 'The Forty Rules of Love' finished! Launching catalog-wide rewrite..."
python3 scripts/rewrite_complete_catalog.py

