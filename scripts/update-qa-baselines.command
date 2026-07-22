#!/bin/zsh
set -u

PROJECT_DIR="/Users/maedan/Documents/Japan X Trip/01_Website/japan-esim-guide"
LOG_DIR="$PROJECT_DIR/logs"
TIMESTAMP="$(date '+%Y%m%d-%H%M%S')"
LOG_FILE="$LOG_DIR/japanxtrip-qa-baseline-$TIMESTAMP.log"
SERVER_LOG="$LOG_DIR/japanxtrip-qa-baseline-server-$TIMESTAMP.log"

mkdir -p "$LOG_DIR"

SERVER_PID=""

cleanup() {
  if [ -n "$SERVER_PID" ]; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

{
  echo "========================================"
  echo "Japan X Trip QA Visual Baseline Update"
  echo "Started: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "========================================"

  cd "$PROJECT_DIR" || exit 1

  npm run build || exit 1

  nohup npx next start -H 127.0.0.1 -p 3100 > "$SERVER_LOG" 2>&1 &
  SERVER_PID=$!

  for i in {1..60}; do
    if curl -fsS "http://127.0.0.1:3100" >/dev/null 2>&1; then
      break
    fi
    sleep 1
  done

  PLAYWRIGHT_BASE_URL="http://127.0.0.1:3100" \
    npx playwright test \
      --config=playwright.qa.config.ts \
      --update-snapshots

  EXIT_CODE=$?

  echo
  echo "Baseline exit code: $EXIT_CODE"
  echo "Log: $LOG_FILE"
  echo "========================================"

  exit "$EXIT_CODE"
} 2>&1 | tee "$LOG_FILE"
