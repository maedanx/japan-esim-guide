import { test, expect } from "@playwright/test";

function attachDiagnostics(page: import("@playwright/test").Page) {
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(`PAGE_ERROR ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") failures.push(`CONSOLE_ERROR ${message.text()}`);
  });
  page.on("response", (response) => {
    if (response.status() >= 500) failures.push(`HTTP_${response.status()} ${response.url()}`);
  });
  return failures;
}

test("critical homepage and planner smoke", async ({ page }) => {
  const failures = attachDiagnostics(page);
  const response = await page.goto("/?qa=smoke", { waitUntil: "domcontentloaded" });

  expect(response, "Homepage did not return a response").not.toBeNull();
  expect(response!.status(), `Homepage HTTP status: ${response!.status()}`).toBeLessThan(500);

  await expect(page.locator("body")).toBeVisible();
  await expect(page.getByText("Your Travel Kit").first()).toBeVisible();

  // Stable locator: find the visible Haneda control across mobile/desktop layouts.
  const candidates = page.getByTestId("airport-hnd");
  let haneda = candidates.first();
  for (let i = 0; i < await candidates.count(); i += 1) {
    if (await candidates.nth(i).isVisible()) {
      haneda = candidates.nth(i);
      break;
    }
  }
  await expect(haneda, "Critical planner control airport-hnd was not found").toBeVisible();
  await haneda.click();
  await expect(haneda).toHaveAttribute("aria-pressed", "true");

  await page.waitForTimeout(300);
  expect(failures, failures.join("\n")).toEqual([]);
});
