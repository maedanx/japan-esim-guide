import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3100";

export default defineConfig({
  testDir: "./tests/smoke",
  outputDir: "artifacts/qa-smoke/playwright",
  timeout: 25_000,
  expect: { timeout: 7_000 },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  maxFailures: 1,
  reporter: [
    ["list"],
    ["json", { outputFile: "reports/qa-smoke/playwright-results.json" }],
  ],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    locale: "en-US",
    timezoneId: "Asia/Tokyo",
  },
  projects: [
    {
      name: "smoke-iphone-13-pro-max-webkit",
      use: {
        browserName: "webkit",
        viewport: { width: 428, height: 926 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 1,
      },
    },
  ],
});
