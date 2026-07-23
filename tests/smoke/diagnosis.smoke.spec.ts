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

async function choose(page: import("@playwright/test").Page, label: string) {
  await page.getByRole("radio", { name: new RegExp(label, "i") }).click();
  await page.getByRole("button", { name: /continue|see my result/i }).click();
}

test("diagnosis supports navigation, result, comparison, and restart", async ({ page }) => {
  const failures = attachDiagnostics(page);
  const response = await page.goto("/diagnosis?qa=diagnosis", { waitUntil: "domcontentloaded" });

  expect(response).not.toBeNull();
  expect(response!.status()).toBeLessThan(500);
  await expect(page.getByText("Question 1 of 7")).toBeVisible();
  await expect(page.getByRole("button", { name: /continue/i })).toBeDisabled();

  await page.getByRole("radio", { name: /^Yes/i }).first().click();
  await page.getByRole("button", { name: /continue/i }).click();
  await expect(page.getByText("Question 2 of 7")).toBeVisible();

  await page.getByRole("button", { name: /previous/i }).click();
  await expect(page.getByText("Question 1 of 7")).toBeVisible();
  await expect(page.getByRole("radio", { name: /^Yes/i }).first()).toHaveAttribute("aria-checked", "true");
  await page.getByRole("button", { name: /continue/i }).click();

  await choose(page, "Yes");
  await choose(page, "1 person");
  await choose(page, "4–7 days");
  await choose(page, "Regular");
  await choose(page, "Yes, immediately");
  await choose(page, "Digital setup only");

  await expect(page.getByText("Best match").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Travel eSIM" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /How the three methods fit/i })).toBeVisible();
  await expect(page.getByText("This is a fit comparison based on your answers")).toBeVisible();
  await expect(page.getByRole("link", { name: /Japan eSIM guide/i }).first()).toBeVisible();

  await page.getByRole("button", { name: /start again/i }).click();
  await expect(page.getByText("Question 1 of 7")).toBeVisible();
  expect(failures, failures.join("\n")).toEqual([]);
});
