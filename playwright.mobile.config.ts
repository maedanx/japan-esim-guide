import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3100";

export default defineConfig({
  testDir: "./tests/mobile-ui",
  outputDir: "artifacts/mobile-ui/playwright",
  timeout: 45_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  retries: 1,
  workers: 1,
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/mobile-ui/html", open: "never" }],
    ["json", { outputFile: "reports/mobile-ui/results.json" }],
  ],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    locale: "en-US",
    timezoneId: "Asia/Tokyo",
  },
});
