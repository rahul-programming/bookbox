#!/usr/bin/env bash
# BookBox Synthesis Daemon Watchdog
# Checks every run if the synthesis daemon is alive and progressing.
# Restarts automatically if stopped or hung.

WORKSPACE_DIR="/Users/rahulsharma/Documents/coding/myapps/bookbox"
cd "$WORKSPACE_DIR" || exit 1

LOG_FILE="logs/synthesis_daemon.log"
WATCHDOG_LOG="logs/watchdog.log"
mkdir -p logs

ts() {
  date "+%Y-%m-%d %H:%M:%S"
}

log() {
  echo "[$(ts)] $1" | tee -a "$WATCHDOG_LOG"
}

# Check if daemon process is running
PID=$(pgrep -f "synthesis_daemon.py" | head -n 1)

if [ -z "$PID" ]; then
  log "⚠️ WARNING: Synthesis daemon is NOT running! Restarting..."
  nohup python3 scripts/synthesis_daemon.py >> "$LOG_FILE" 2>&1 &
  NEW_PID=$!
  log "✅ Started new synthesis daemon process with PID: $NEW_PID"
  exit 0
fi

# Check if log file exists and was modified in the last 25 minutes
if [ -f "$LOG_FILE" ]; then
  LAST_MOD=$(stat -f "%m" "$LOG_FILE")
  NOW=$(date "+%s")
  DIFF=$((NOW - LAST_MOD))

  # If no log output for more than 25 minutes (1500 seconds), check for hung agy process
  if [ "$DIFF" -gt 1500 ]; then
    log "⚠️ ALERT: No daemon log activity for $((DIFF / 60)) minutes! Diagnosing hang..."
    
    # Kill any hung agy subprocesses
    HUNG_AGY=$(pgrep -f "/opt/homebrew/bin/agy" | head -n 1)
    if [ -n "$HUNG_AGY" ]; then
      log "Killing unresponsive agy subprocess PID: $HUNG_AGY"
      kill -9 "$HUNG_AGY" 2>/dev/null
    fi
    
    log "Restarting synthesis daemon (killing PID: $PID)..."
    kill -9 "$PID" 2>/dev/null
    sleep 2
    nohup python3 scripts/synthesis_daemon.py >> "$LOG_FILE" 2>&1 &
    NEW_PID=$!
    log "✅ Restarted synthesis daemon with PID: $NEW_PID"
    exit 0
  fi
fi

log "🟢 OK: Synthesis daemon is healthy and running (PID: $PID). Last log activity was $((DIFF / 60))m ago."
