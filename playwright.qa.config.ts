import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3100";

export default defineConfig({
  testDir: "./tests/mobile-ui",
  outputDir: "artifacts/qa/playwright",
  timeout: 50_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: { animations: "disabled", maxDiffPixelRatio: 0.02 },
  },
  fullyParallel: true,
  retries: 0,
  workers: process.env.CI ? 2 : 3,
  maxFailures: 3,
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/qa/playwright-html", open: "never" }],
    ["json", { outputFile: "reports/qa/playwright-results.json" }],
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
    { name: "iphone-13-pro-max-webkit", use: { browserName: "webkit", viewport: { width: 428, height: 926 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
    { name: "iphone-standard-webkit", use: { browserName: "webkit", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
    { name: "iphone-small-webkit", use: { browserName: "webkit", viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
    { name: "android-360-chromium", use: { browserName: "chromium", viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
    { name: "android-412-chromium", use: { browserName: "chromium", viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
    { name: "desktop-chromium", use: { browserName: "chromium", viewport: { width: 1440, height: 1000 }, isMobile: false, hasTouch: false, deviceScaleFactor: 1 } },
  ],
});
