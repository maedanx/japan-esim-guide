#!/bin/zsh
set -u
PROJECT_DIR="/Users/maedan/Documents/Japan X Trip/01_Website/japan-esim-guide"
LOG_DIR="$PROJECT_DIR/logs"
TIMESTAMP="$(date '+%Y%m%d-%H%M%S')"
LOG_FILE="$LOG_DIR/japanxtrip-quick-qa-$TIMESTAMP.log"
RESULT_ZIP="$LOG_DIR/japanxtrip-quick-qa-results-$TIMESTAMP.zip"
SERVER_LOG="$LOG_DIR/japanxtrip-quick-qa-server-$TIMESTAMP.log"
SERVER_PID=""
PORT=""
mkdir -p "$LOG_DIR"
cleanup(){ [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true; }
trap cleanup EXIT INT TERM
find_free_port(){
  local p
  for p in {3100..3199}; do
    if ! lsof -nP -iTCP:$p -sTCP:LISTEN >/dev/null 2>&1; then echo "$p"; return 0; fi
  done
  return 1
}
{
  cd "$PROJECT_DIR" || exit 1
  echo "Japan X Trip Quick QA v3.2 / Stable Locators + Port Safe"
  echo "Started: $(date '+%Y-%m-%d %H:%M:%S')"
  rm -rf artifacts/qa-smoke reports/qa-smoke
  mkdir -p artifacts/qa-smoke reports/qa-smoke
  echo "1/3 Production build"
  npm run build || { echo "STOP: build failed"; exit 1; }
  PORT="$(find_free_port)" || { echo "STOP: no free QA port found in 3100-3199"; exit 1; }
  BASE_URL="http://127.0.0.1:$PORT"
  echo "2/3 Isolated server on port $PORT"
  nohup npx next start -H 127.0.0.1 -p "$PORT" > "$SERVER_LOG" 2>&1 & SERVER_PID=$!
  READY=0
  for i in {1..45}; do
    if ! kill -0 "$SERVER_PID" 2>/dev/null; then echo "STOP: server process exited"; cat "$SERVER_LOG"; exit 1; fi
    curl -fsS "$BASE_URL" >/dev/null 2>&1 && { READY=1; break; }
    sleep 1
  done
  [ "$READY" -eq 1 ] || { echo "STOP: server failed to start"; cat "$SERVER_LOG"; exit 1; }
  echo "3/3 Representative smoke test (stops on first failure)"
  PLAYWRIGHT_BASE_URL="$BASE_URL" npx playwright test --config=playwright.smoke.config.ts
  EXIT_CODE=$?
  STAGING="$PROJECT_DIR/.quick-qa-export-$TIMESTAMP"
  rm -rf "$STAGING"; mkdir -p "$STAGING"
  cp -R artifacts/qa-smoke "$STAGING/artifacts" 2>/dev/null || true
  cp -R reports/qa-smoke "$STAGING/reports" 2>/dev/null || true
  cp "$SERVER_LOG" "$STAGING/" 2>/dev/null || true
  ditto -c -k --sequesterRsrc --keepParent "$STAGING" "$RESULT_ZIP"
  rm -rf "$STAGING"
  echo "QA port: $PORT"
  echo "Exit code: $EXIT_CODE"
  echo "Log: $LOG_FILE"
  echo "Results: $RESULT_ZIP"
  exit "$EXIT_CODE"
} 2>&1 | tee "$LOG_FILE"
