#!/bin/zsh
set -euo pipefail

PROJECT_DIR="/Users/maedan/Documents/Japan X Trip/01_Website/japan-x-trip"
LOG_DIR="$PROJECT_DIR/logs"
ARTIFACT_DIR="$PROJECT_DIR/artifacts/mobile-ui"
REPORT_DIR="$PROJECT_DIR/reports/mobile-ui"
TIMESTAMP="$(date '+%Y%m%d-%H%M%S')"
LOG_FILE="$LOG_DIR/japanxtrip-mobile-ui-tests-v2.8.1-$TIMESTAMP.log"
RESULT_ZIP="$LOG_DIR/japanxtrip-mobile-ui-results-v2.8.1-$TIMESTAMP.zip"
SERVER_LOG="$LOG_DIR/japanxtrip-mobile-ui-server-$TIMESTAMP.log"
LIGHTHOUSE_LOG="$LOG_DIR/japanxtrip-lighthouse-$TIMESTAMP.log"

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
  echo "Japan X Trip Mobile UI Automated Tests v2.8.1"
  echo "Started: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "Project: $PROJECT_DIR"
  echo "========================================"

  cd "$PROJECT_DIR" || exit 1

  echo "Removing previous artifacts and reports..."
  rm -rf "$ARTIFACT_DIR" "$REPORT_DIR"
  mkdir -p "$ARTIFACT_DIR" "$REPORT_DIR/lighthouse"

  echo "Running production build..."
  npm run build
  BUILD_EXIT=$?
  if [ "$BUILD_EXIT" -ne 0 ]; then
    echo "ERROR: Production build failed. Tests were not run."
    exit "$BUILD_EXIT"
  fi

  echo "Starting isolated production server on 127.0.0.1:3100..."
  nohup npx next start -H 127.0.0.1 -p 3100 > "$SERVER_LOG" 2>&1 &
  SERVER_PID=$!

  READY=0
  for i in {1..60}; do
    if curl -fsS "http://127.0.0.1:3100" >/dev/null 2>&1; then
      READY=1
      break
    fi
    sleep 1
  done

  if [ "$READY" -ne 1 ]; then
    echo "ERROR: Isolated production server did not become ready."
    cat "$SERVER_LOG" || true
    exit 1
  fi

  echo "Running Playwright mobile tests..."
  PLAYWRIGHT_BASE_URL="http://127.0.0.1:3100" \
    npx playwright test --config=playwright.mobile.config.ts
  TEST_EXIT=$?

  echo "Running Lighthouse mobile audit..."
  npx lighthouse "http://127.0.0.1:3100" \
    --quiet \
    --chrome-flags="--headless --no-sandbox --disable-gpu" \
    --only-categories=performance,accessibility,best-practices,seo \
    --form-factor=mobile \
    --screenEmulation.mobile=true \
    --screenEmulation.width=390 \
    --screenEmulation.height=844 \
    --screenEmulation.deviceScaleFactor=1 \
    --output=json \
    --output=html \
    --output-path="$REPORT_DIR/lighthouse/home" \
    > "$LIGHTHOUSE_LOG" 2>&1
  LIGHTHOUSE_EXIT=$?

  node <<'NODE'
const fs = require("fs");
const path = require("path");
const jsonPath = path.join(process.cwd(), "reports/mobile-ui/lighthouse/home.report.json");
const summaryPath = path.join(process.cwd(), "reports/mobile-ui/lighthouse/summary.txt");

if (!fs.existsSync(jsonPath)) {
  fs.writeFileSync(summaryPath, "Lighthouse JSON report was not created.\n");
  process.exit(0);
}

const report = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const categories = report.categories || {};
const lines = [
  `Performance: ${Math.round((categories.performance?.score || 0) * 100)}`,
  `Accessibility: ${Math.round((categories.accessibility?.score || 0) * 100)}`,
  `Best Practices: ${Math.round((categories["best-practices"]?.score || 0) * 100)}`,
  `SEO: ${Math.round((categories.seo?.score || 0) * 100)}`,
];
fs.writeFileSync(summaryPath, lines.join("\n") + "\n");
NODE

  echo "Creating combined result ZIP..."
  STAGING="$PROJECT_DIR/.mobile-ui-export-$TIMESTAMP"
  rm -rf "$STAGING"
  mkdir -p "$STAGING"
  cp -R "$ARTIFACT_DIR" "$STAGING/artifacts" 2>/dev/null || true
  cp -R "$REPORT_DIR" "$STAGING/reports" 2>/dev/null || true
  cp "$SERVER_LOG" "$STAGING/" 2>/dev/null || true
  cp "$LIGHTHOUSE_LOG" "$STAGING/" 2>/dev/null || true
  ditto -c -k --sequesterRsrc --keepParent "$STAGING" "$RESULT_ZIP"
  rm -rf "$STAGING"

  echo
  echo "Playwright exit code: $TEST_EXIT"
  echo "Lighthouse exit code: $LIGHTHOUSE_EXIT"
  echo "Log: $LOG_FILE"
  echo "Results ZIP: $RESULT_ZIP"
  echo "Playwright report: $REPORT_DIR/html/index.html"
  echo "Lighthouse report: $REPORT_DIR/lighthouse/home.report.html"
  echo "Lighthouse summary: $REPORT_DIR/lighthouse/summary.txt"
  echo "========================================"

  if [ "$TEST_EXIT" -ne 0 ]; then
    exit "$TEST_EXIT"
  fi
  exit "$LIGHTHOUSE_EXIT"
} 2>&1 | tee "$LOG_FILE"
