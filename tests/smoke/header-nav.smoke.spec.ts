import { expect, test } from "@playwright/test";

test("header navigation has no broken or misdirected links", async ({ page, baseURL }) => {
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(`PAGE_ERROR ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") failures.push(`CONSOLE_ERROR ${message.text()}`);
  });

  const response = await page.goto("/?qa=header-nav", { waitUntil: "domcontentloaded" });
  expect(response!.status()).toBeLessThan(500);

  await page.getByRole("button", { name: /toggle navigation/i }).click();
  const nav = page.getByRole("navigation", { name: "Primary navigation" });

  const expected = [
    { name: "Home", href: "/" },
    { name: "Compare", href: "/compare" },
    { name: "eSIM", href: "/esim" },
    { name: "Pocket WiFi", href: "/pocket-wifi" },
    { name: "SIM Card", href: "/sim-card" },
    { name: "Diagnosis", href: "/diagnosis" },
  ];

  for (const item of expected) {
    const link = nav.getByRole("link", { name: item.name, exact: true });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", item.href);
  }

  await expect(nav.getByRole("link", { name: /sitemap/i })).toHaveCount(0);
  const sitemapLinks = await nav.locator('a[href="/sitemap"]').count();
  expect(sitemapLinks).toBe(0);

  const plannerLink = nav.getByRole("link", { name: /build my travel kit/i });
  await expect(plannerLink).toHaveAttribute("href", "/#planner");

  for (const item of expected) {
    if (item.href === "/") continue;
    const res = await page.request.get(`${baseURL}${item.href}`);
    expect(res.status(), `${item.href} should resolve`).toBeLessThan(400);
  }

  expect(failures, failures.join("\n")).toEqual([]);
});
