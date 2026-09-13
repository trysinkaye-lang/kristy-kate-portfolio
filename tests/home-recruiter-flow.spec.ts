import { test, expect } from "@playwright/test";

const selectedSlugs = ["rbim", "co-designs", "ahdis", "marci-metzger"];

test("work-first hero, selected project gallery, and primary interactions", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#home");
  await expect(page).toHaveTitle(/Kristy Kate Taylor/);
  await expect(page.locator("body")).toHaveCSS("font-family", /manrope/i);
  await expect(hero.getByRole("heading", { level: 1 })).toContainText("Useful systems.");
  await expect(hero.getByRole("heading", { level: 1 })).toContainText("Sharp interfaces.");
  await expect(hero.getByRole("img", { name: "Kristy Kate Taylor", exact: true })).toHaveCount(0);

  const gallery = page.getByRole("navigation", { name: "Selected projects gallery" });
  await expect(gallery).toBeVisible();
  for (const slug of selectedSlugs) {
    await expect(gallery.locator(`a[href="/projects/${slug}"]`).first()).toBeVisible();
  }

  await hero.getByRole("link", { name: "Explore work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(300);

  await gallery.locator('a[href="/projects/rbim"]').first().click();
  await expect(page).toHaveURL(/\/projects\/rbim$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("RBIM");
});

test("no fabricated resume link and project status stays explicit", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /View Resume|Download Resume/ })).toHaveCount(0);

  await page.goto("/projects");
  const coDesigns = page.locator("article").filter({ has: page.locator('a[href="/projects/co-designs"]') }).first();
  await expect(coDesigns).toContainText("In development");
  await expect(page.getByText("LACOMUS", { exact: true })).toHaveCount(0);
});

for (const [width, height] of [[375,812],[390,844],[430,932],[768,1024],[1024,1366],[1366,768],[1440,900],[1536,864],[1920,1080]]) {
  test(`homepage composition at ${width} × ${height}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("#identity")).toBeVisible();
    const metrics = await page.locator("#identity").evaluate(el => ({ left: el.getBoundingClientRect().left, right: el.getBoundingClientRect().right, viewport: innerWidth, overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth }));
    expect(metrics.overflow).toBe(false);
    expect(metrics.left).toBeGreaterThanOrEqual(0);
    expect(metrics.right).toBeLessThanOrEqual(metrics.viewport);
    await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: width === 390 || width === 1440, animations: "disabled" });
  });
}

test("static content and navigation remain usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#identity")).toBeVisible();
  await expect(page.getByText("Full-stack development · UI/UX · Information systems", { exact: true })).toBeVisible();
  await page.getByRole("navigation", { name: "Selected projects gallery" }).locator('a[href="/projects/rbim"]').first().click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("RBIM");
  await context.close();
});
