#!/bin/zsh
set -euo pipefail
PROJECT_DIR="/Users/maedan/Documents/Japan X Trip/01_Website/japan-x-trip"
LOG_DIR="$PROJECT_DIR/logs"
ARTIFACT_DIR="$PROJECT_DIR/artifacts/qa"
REPORT_DIR="$PROJECT_DIR/reports/qa"
TIMESTAMP="$(date '+%Y%m%d-%H%M%S')"
LOG_FILE="$LOG_DIR/japanxtrip-full-qa-$TIMESTAMP.log"
RESULT_ZIP="$LOG_DIR/japanxtrip-full-qa-results-$TIMESTAMP.zip"
SERVER_LOG="$LOG_DIR/japanxtrip-full-qa-server-$TIMESTAMP.log"
LIGHTHOUSE_LOG="$LOG_DIR/japanxtrip-full-qa-lighthouse-$TIMESTAMP.log"
SERVER_PID=""
PORT=""
mkdir -p "$LOG_DIR"
cleanup(){ [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true; }
trap cleanup EXIT INT TERM
find_free_port(){ local p; for p in {3100..3199}; do if ! lsof -nP -iTCP:$p -sTCP:LISTEN >/dev/null 2>&1; then echo "$p"; return 0; fi; done; return 1; }
export_results(){
  local staging="$PROJECT_DIR/.qa-export-$TIMESTAMP"
  rm -rf "$staging"; mkdir -p "$staging"
  cp -R "$PROJECT_DIR/artifacts/qa-smoke" "$staging/smoke-artifacts" 2>/dev/null || true
  cp -R "$PROJECT_DIR/reports/qa-smoke" "$staging/smoke-reports" 2>/dev/null || true
  cp -R "$ARTIFACT_DIR" "$staging/artifacts" 2>/dev/null || true
  cp -R "$REPORT_DIR" "$staging/reports" 2>/dev/null || true
  cp "$SERVER_LOG" "$staging/" 2>/dev/null || true
  cp "$LIGHTHOUSE_LOG" "$staging/" 2>/dev/null || true
  ditto -c -k --sequesterRsrc --keepParent "$staging" "$RESULT_ZIP"
  rm -rf "$staging"
}
{
  cd "$PROJECT_DIR" || exit 1
  echo "Japan X Trip v3.3 Full QA / 3 Workers + Fail Fast"
  echo "Started: $(date '+%Y-%m-%d %H:%M:%S')"
  rm -rf "$ARTIFACT_DIR" "$REPORT_DIR" artifacts/qa-smoke reports/qa-smoke
  mkdir -p "$ARTIFACT_DIR" "$REPORT_DIR/lighthouse" artifacts/qa-smoke reports/qa-smoke

  echo "1/6 Production build"
  npm run build || { echo "STOP: build failed. Remaining QA skipped."; export_results; exit 1; }

  PORT="$(find_free_port)" || { echo "STOP: no free QA port found"; export_results; exit 1; }
  BASE_URL="http://127.0.0.1:$PORT"
  echo "2/6 Isolated server on port $PORT"
  nohup npx next start -H 127.0.0.1 -p "$PORT" > "$SERVER_LOG" 2>&1 & SERVER_PID=$!
  READY=0
  for i in {1..45}; do
    if ! kill -0 "$SERVER_PID" 2>/dev/null; then echo "STOP: server process exited"; cat "$SERVER_LOG"; export_results; exit 1; fi
    curl -fsS "$BASE_URL" >/dev/null 2>&1 && { READY=1; break; }
    sleep 1
  done
  [ "$READY" -eq 1 ] || { echo "STOP: server failed to start"; cat "$SERVER_LOG"; export_results; exit 1; }

  echo "3/6 Smoke gate"
  PLAYWRIGHT_BASE_URL="$BASE_URL" npx playwright test --config=playwright.smoke.config.ts
  SMOKE_EXIT=$?
  if [ "$SMOKE_EXIT" -ne 0 ]; then echo "STOP: Smoke QA failed. Full QA and Lighthouse skipped."; export_results; exit "$SMOKE_EXIT"; fi

  echo "4/6 Full Playwright QA (3 workers, stop after 3 failures)"
  PLAYWRIGHT_BASE_URL="$BASE_URL" npx playwright test --config=playwright.qa.config.ts
  PLAYWRIGHT_EXIT=$?
  if [ "$PLAYWRIGHT_EXIT" -ne 0 ]; then echo "STOP: Full QA failed. Lighthouse skipped."; export_results; exit "$PLAYWRIGHT_EXIT"; fi

  echo "5/6 Lighthouse mobile audit"
  npx lighthouse "$BASE_URL" --quiet --chrome-flags="--headless --no-sandbox --disable-gpu" --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --screenEmulation.mobile=true --screenEmulation.width=390 --screenEmulation.height=844 --screenEmulation.deviceScaleFactor=1 --output=json --output=html --output-path="$REPORT_DIR/lighthouse/home" > "$LIGHTHOUSE_LOG" 2>&1
  LIGHTHOUSE_EXIT=$?

  echo "6/6 Exporting results"
  export_results
  echo "QA port: $PORT"
  echo "Playwright exit code: $PLAYWRIGHT_EXIT"
  echo "Lighthouse exit code: $LIGHTHOUSE_EXIT"
  echo "Log: $LOG_FILE"
  echo "Results: $RESULT_ZIP"
  exit "$LIGHTHOUSE_EXIT"
} 2>&1 | tee "$LOG_FILE"
