import { test, expect } from "@playwright/test";

const selectedSlugs = ["rbim", "co-designs", "ahdis", "marci-metzger"];

test("work-first hero, selected project gallery, and primary interactions", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#home");
  await expect(page).toHaveTitle(/Kristy Kate Taylor/);
  await expect(page.locator("body")).toHaveCSS("font-family", /manrope/i);
  await expect(hero.getByRole("heading", { level: 1 })).toContainText("useful software.");
  await expect(hero.getByRole("heading", { level: 1 })).toContainText("And make it feel effortless.");
  await expect(hero.getByRole("img", { name: "Kristy Kate Taylor", exact: true })).toHaveCount(0);

  await expect(page.locator("#work-title")).toHaveText("Projects");
  const gallery = page.getByRole("navigation", { name: "Projects gallery" });
  await expect(gallery).toBeVisible();
  for (const slug of selectedSlugs) {
    await expect(gallery.locator(`a[href="/projects/${slug}"]`).first()).toBeVisible();
  }

  await hero.getByRole("link", { name: "View projects" }).click();
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
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects.");
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
  await expect(page.locator("#home").getByText(/I.m Kristy/)).toBeVisible();
  await page.getByRole("navigation", { name: "Projects gallery" }).locator('a[href="/projects/rbim"]').first().click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("RBIM");
  await context.close();
});


test("project stories are distinct, responsive, and navigable", async ({ page }) => {
  await page.goto("/projects");
  const stories = page.locator("main article");
  await expect(stories).toHaveCount(5);
  const sources = await stories.locator("img").evaluateAll(images =>
    images.map(img => new URL((img as HTMLImageElement).src).pathname)
  );
  expect(new Set(sources).size).toBe(5);
  await expect(stories.first().getByRole("heading", { name: "RBIM" })).toBeVisible();
  await expect(page.getByText("INTERFACE & DIGITAL DESIGN WORK", { exact: true })).toHaveCount(0);
  for (const slug of ["rbim", "co-designs", "ahdis", "marci-metzger", "erp-system"]) {
    await expect(stories.locator('a[href="/projects/' + slug + '"]').first()).toBeVisible();
  }
});


test("portfolio hero features the developer rather than repeating RBIM imagery", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#home");
  await expect(hero.getByRole("img", { name: /Professional portrait/ })).toBeVisible();
  await expect(hero.locator('img[src*="rbim-dashboard"]')).toHaveCount(0);
});


test("project details do not show Challenges & Learning", async ({ page }) => {
  for (const slug of ["rbim", "ahdis", "co-designs", "marci-metzger", "erp-system"]) {
    await page.goto("/projects/" + slug);
    await expect(page.getByRole("heading", { name: /Challenges|What I learned|Reflection/i })).toHaveCount(0);
    await expect(page.locator('a[href="#reflection"]')).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "What it does" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Project results" })).toBeVisible();
  }
});

test("directory screenshots stay modest at desktop widths", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/projects");
  const images = page.locator("main article a img");
  await expect(images).toHaveCount(5);
  for (const image of await images.all()) {
    const width = await image.evaluate(el => el.getBoundingClientRect().width);
    expect(width).toBeLessThanOrEqual(475);
  }
});
