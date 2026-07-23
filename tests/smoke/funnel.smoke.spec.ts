import { expect, test } from "@playwright/test";

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

test("esim page shows fit guidance and diagnosis CTA", async ({ page }) => {
  const failures = attachDiagnostics(page);
  const response = await page.goto("/esim?qa=funnel", { waitUntil: "domcontentloaded" });
  expect(response!.status()).toBeLessThan(500);
  await expect(page.getByText("Less ideal if").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Take the 30-sec check/i }).first()).toBeVisible();
  expect(failures, failures.join("\n")).toEqual([]);
});

test("sim-card page shows fit guidance and a provider-selection CTA", async ({ page }) => {
  const failures = attachDiagnostics(page);
  const response = await page.goto("/sim-card?qa=funnel", { waitUntil: "domcontentloaded" });
  expect(response!.status()).toBeLessThan(500);
  await expect(page.getByText("Less ideal if").first()).toBeVisible();
  const providerLink = page.getByRole("link", { name: /Browse SIM & travel providers/i });
  await expect(providerLink).toBeVisible();
  await expect(providerLink).toHaveAttribute("href", "/compare#providers");
  expect(failures, failures.join("\n")).toEqual([]);
});

test("provider review page links back to the diagnosis finder", async ({ page }) => {
  const failures = attachDiagnostics(page);
  const response = await page.goto("/reviews/sakura-mobile?qa=funnel", { waitUntil: "domcontentloaded" });
  expect(response!.status()).toBeLessThan(500);
  await expect(page.getByRole("link", { name: /Not sure yet\? Take the 30-sec check/i })).toHaveAttribute(
    "href",
    "/diagnosis",
  );
  expect(failures, failures.join("\n")).toEqual([]);
});

test("compare page renders all providers from the single data source", async ({ page }) => {
  const failures = attachDiagnostics(page);
  const response = await page.goto("/compare?qa=funnel", { waitUntil: "domcontentloaded" });
  expect(response!.status()).toBeLessThan(500);
  await expect(page.getByRole("heading", { name: "Sakura Mobile" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "NINJA WiFi" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Visit provider website/i }).first()).toHaveAttribute(
    "href",
    /^https:\/\//,
  );
  expect(failures, failures.join("\n")).toEqual([]);
});

test("japan-wireless review page renders from the merged provider data", async ({ page }) => {
  const failures = attachDiagnostics(page);
  const response = await page.goto("/reviews/japan-wireless?qa=funnel", { waitUntil: "domcontentloaded" });
  expect(response!.status()).toBeLessThan(500);
  await expect(page.getByRole("heading", { name: /Japan Wireless review/i })).toBeVisible();
  expect(failures, failures.join("\n")).toEqual([]);
});
