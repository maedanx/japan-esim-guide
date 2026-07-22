import { test, expect, Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const outputRoot = path.join(process.cwd(), "artifacts", "qa", "screenshots");

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}


async function prepareVisualSnapshot(page: Page) {
  await page.addStyleTag({
    content: `
      .v23-mobile-sticky-cta,
      .v25-mobile-sticky-cta {
        display: none !important;
      }
    `,
  });
}

async function collectLayoutReport(page: Page) {
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    const all = Array.from(document.querySelectorAll<HTMLElement>("body *"));

    const visible = all.filter((el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0
      );
    });

    const overflowing = visible
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          className: String(el.className || "").slice(0, 160),
          text: (el.innerText || "").trim().replace(/\s+/g, " ").slice(0, 120),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      })
      .filter((item) => item.left < -2 || item.right > viewportWidth + 2)
      .slice(0, 50);

    const tinyTargets = Array.from(
      document.querySelectorAll<HTMLElement>("button, a, input, select")
    )
      .filter((el) => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0
        );
      })
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          text: (
            el.innerText ||
            el.getAttribute("aria-label") ||
            el.getAttribute("title") ||
            ""
          )
            .trim()
            .replace(/\s+/g, " ")
            .slice(0, 100),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      })
      .filter((item) => item.width < 44 || item.height < 44)
      .slice(0, 50);

    const fixedElements = visible
      .filter((el) => getComputedStyle(el).position === "fixed")
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          className: String(el.className || "").slice(0, 160),
          text: (el.innerText || "").trim().replace(/\s+/g, " ").slice(0, 100),
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
          height: Math.round(rect.height),
          viewportHeight,
        };
      });

    return {
      viewportWidth,
      viewportHeight,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      horizontalOverflow:
        Math.max(
          document.documentElement.scrollWidth,
          document.body.scrollWidth
        ) - viewportWidth,
      overflowing,
      tinyTargets,
      fixedElements,
    };
  });
}

function testIdPart(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const choiceTestId = (name: string) => {
  const airportCodes: Record<string, string> = {
    Narita: "nrt",
    Haneda: "hnd",
    Kansai: "kix",
    Fukuoka: "fuk",
  };
  if (airportCodes[name]) return `airport-${airportCodes[name]}`;
  if (["3–5 days", "7 days", "14 days", "30+ days"].includes(name)) {
    return `duration-${testIdPart(name)}`;
  }
  if (["Tokyo", "Kyoto", "Osaka", "Hokkaido"].includes(name)) {
    return `city-${testIdPart(name)}`;
  }
  if (["Easy", "Budget", "Fast", "Family"].includes(name)) {
    return `style-${testIdPart(name)}`;
  }
  return `need-${testIdPart(name)}`;
};

async function visibleTestId(page: Page, testId: string) {
  const candidates = page.getByTestId(testId);
  const count = await candidates.count();
  for (let i = 0; i < count; i += 1) {
    const candidate = candidates.nth(i);
    if (await candidate.isVisible()) return candidate;
  }
  return candidates.first();
}

async function clickChoice(page: Page, name: string) {
  const button = await visibleTestId(page, choiceTestId(name));
  await expect(button, `Visible control not found: ${name}`).toBeVisible();
  await button.scrollIntoViewIfNeeded();
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
}

async function waitForPressedState(
  page: Page,
  testId: string,
  expected: "true" | "false",
  timeout = 2500
) {
  const deadline = Date.now() + timeout;

  while (Date.now() < deadline) {
    const button = await visibleTestId(page, testId);
    if ((await button.getAttribute("aria-pressed")) === expected) return true;
    await page.waitForTimeout(100);
  }

  return false;
}

async function ensureCities(page: Page, wanted: string[]) {
  for (const city of ["Tokyo", "Kyoto", "Osaka", "Hokkaido"]) {
    const testId = `city-${testIdPart(city)}`;
    const expected: "true" | "false" = wanted.includes(city)
      ? "true"
      : "false";

    let settled = false;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      let button = await visibleTestId(page, testId);
      await expect(button).toBeVisible();
      await button.scrollIntoViewIfNeeded();

      if ((await button.getAttribute("aria-pressed")) === expected) {
        settled = true;
        break;
      }

      await button.click();
      settled = await waitForPressedState(page, testId, expected);
      if (settled) break;

      // The compact iPhone layout can re-render the city row after a tap.
      // Re-resolve the visible button before retrying instead of keeping a stale locator.
      await page.waitForTimeout(200);
    }

    expect(
      settled,
      `${city} selection did not settle to ${expected} after retries`
    ).toBe(true);

    const finalButton = await visibleTestId(page, testId);
    await expect(finalButton).toHaveAttribute("aria-pressed", expected);
  }
}


test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("baseline layout, runtime health, and visual regression", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "desktop-chromium",
    "Mobile Travel Kit visual baseline is intentionally hidden on desktop"
  );
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedResponses: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) {
      failedResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto("/?qa=baseline", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Your Travel Kit").first()).toBeVisible();
  await prepareVisualSnapshot(page);

  const projectName = testInfo.project.name;
  const dir = path.join(outputRoot, projectName);
  ensureDir(dir);

  await page.screenshot({
    path: path.join(dir, "homepage-full.png"),
    fullPage: true,
    animations: "disabled",
  });
  await page.screenshot({
    path: path.join(dir, "homepage-viewport.png"),
    fullPage: false,
    animations: "disabled",
  });

  const report = await collectLayoutReport(page);
  fs.writeFileSync(
    path.join(dir, "layout-report.json"),
    JSON.stringify(report, null, 2)
  );

  expect(
    report.horizontalOverflow,
    JSON.stringify(report.overflowing, null, 2)
  ).toBeLessThanOrEqual(2);

  expect(pageErrors).toEqual([]);
  expect(
    consoleErrors.filter(
      (message) => !/favicon|Download the React DevTools/i.test(message)
    )
  ).toEqual([]);
  expect(
    failedResponses.filter(
      (line) => !/favicon|apple-icon|icon\.png|robots\.txt/i.test(line)
    )
  ).toEqual([]);

  await expect(page).toHaveScreenshot("homepage-full.png", {
    fullPage: true,
    animations: "disabled",
  });
});

test("budget Tokyo recommendation", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name === "desktop-chromium",
    "Mobile planner recommendation flow is intentionally hidden on desktop"
  );

  await page.goto("/?qa=budget", { waitUntil: "domcontentloaded" });

  await clickChoice(page, "Haneda");
  await clickChoice(page, "3–5 days");
  await ensureCities(page, ["Tokyo"]);
  await clickChoice(page, "Budget");

  const update = page.getByRole("link", {
    name: /Update My Recommended Kit/i,
  });
  await update.scrollIntoViewIfNeeded();
  await update.click();

  const kit = page.locator("#mobile-travel-kit");
  await prepareVisualSnapshot(page);
  await expect(kit).toContainText("Lower-cost picks for Tokyo");
  await expect(kit).toContainText("Travel eSIM");
  await expect(kit).toContainText("Airport transfer");
  await expect(kit).toContainText("IC transit card");
  await expect(kit).toContainText("HND arrival considered");
  await expect(kit).toContainText("1 city selected");

  const dir = path.join(outputRoot, testInfo.project.name);
  ensureDir(dir);
  await kit.screenshot({
    path: path.join(dir, "budget-travel-kit.png"),
    animations: "disabled",
  });
  await expect(kit).toHaveScreenshot("budget-travel-kit.png", {
    animations: "disabled",
  });
});

test("family multi-city recommendation", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name === "desktop-chromium",
    "Mobile planner recommendation flow is intentionally hidden on desktop"
  );

  await page.goto("/?qa=family", { waitUntil: "domcontentloaded" });

  await clickChoice(page, "Narita");
  await clickChoice(page, "7 days");
  await ensureCities(page, ["Tokyo", "Kyoto", "Osaka"]);
  await clickChoice(page, "Family");

  const update = page.getByRole("link", {
    name: /Update My Recommended Kit/i,
  });
  await update.scrollIntoViewIfNeeded();
  await update.click();

  const kit = page.locator("#mobile-travel-kit");
  await prepareVisualSnapshot(page);
  await expect(kit).toContainText(
    "Family-friendly picks for Tokyo + Kyoto + Osaka"
  );
  await expect(kit).toContainText("Pocket WiFi");
  await expect(kit).toContainText("Long-distance rail check");
  await expect(kit).toContainText("IC transit card");
  await expect(kit).toContainText("NRT arrival considered");
  await expect(kit).toContainText("3 cities selected");

  const dir = path.join(outputRoot, testInfo.project.name);
  ensureDir(dir);
  await kit.screenshot({
    path: path.join(dir, "family-travel-kit.png"),
    animations: "disabled",
  });
  await expect(kit).toHaveScreenshot("family-travel-kit.png", {
    animations: "disabled",
  });
});

test("core touch controls remain selectable", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name === "desktop-chromium",
    "Mobile touch controls are intentionally hidden on desktop"
  );

  await page.goto("/?qa=touch", { waitUntil: "domcontentloaded" });

  await clickChoice(page, "Haneda");
  await clickChoice(page, "14 days");
  await clickChoice(page, "Budget");

  const tokyo = await visibleTestId(page, "city-tokyo");
  const kyoto = await visibleTestId(page, "city-kyoto");

  await tokyo.scrollIntoViewIfNeeded();
  await expect(tokyo).toBeVisible();
  await expect(kyoto).toBeVisible();

  const startLink = page
    .getByRole("link", { name: /Start My Travel Plan/i })
    .first();
  await expect(startLink).toBeVisible();
  await expect(startLink).toBeEnabled();
});
