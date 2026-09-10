import { test, expect } from "@playwright/test";

const slugs = ["rbim", "co-designs", "ahdis", "marci-metzger", "lacomus", "erp-system", "design-systems"];

test("identity, three roles, interactive split, and project order", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#home");
  await expect(page).toHaveTitle(/Kristy Kate Taylor/);
  await expect(page.locator("body")).toHaveCSS("font-family", /manrope/i);
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText("Kristy Kate Taylor");
  for (const role of ["Full-Stack Developer", "UI/UX Designer", "Creative Developer"]) {
    await expect(hero.getByText(role, { exact: true })).toBeVisible();
  }
  await expect(hero.getByRole("img", { name: "Kristy Kate Taylor", exact: true })).toBeVisible();
  const split = hero.getByRole("slider", { name: "Balance systems and creative experience" });
  await expect(split).toBeVisible();
  await split.focus();
  const before = Number(await split.getAttribute("aria-valuenow"));
  await page.keyboard.press("ArrowRight");
  const after = Number(await split.getAttribute("aria-valuenow"));
  expect(after).toBeGreaterThan(before);

  const projectNav = page.getByRole("navigation", { name: "Selected projects" });
  const projectLinks = projectNav.getByRole("link");
  await expect(projectLinks).toHaveCount(slugs.length);
  expect(await projectLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href")))).toEqual(
    slugs.map((slug) => `/projects/${slug}`),
  );

  await hero.getByRole("link", { name: "Explore the work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(300);
  await page.getByRole("link", { name: "Read RBIM case study" }).click();
  await expect(page).toHaveURL(/\/projects\/rbim$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("RBIM");
});

test("project reel exposes real statuses and external links through case studies", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /View Resume|Download Resume/ })).toHaveCount(0);

  for (const item of [
    { slug: "co-designs", status: "In development" },
    { slug: "marci-metzger", status: "Deployed redesign" },
    { slug: "lacomus", status: "Work in progress" },
  ]) {
    await page.goto(`/projects/${item.slug}`);
    await expect(page.locator("body")).toContainText(item.status);
    await expect(page.getByRole("link", { name: /Live/ }).first()).toHaveAttribute("target", "_blank");
  }
});

for (const [width, height] of [[375,812],[390,844],[430,932],[768,1024],[1024,1366],[1366,768],[1440,900],[1536,864],[1920,1080]]) {
  test(`homepage composition at ${width} × ${height}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("#identity")).toBeVisible();
    const metrics = await page.locator("#identity").evaluate((el) => ({
      left: el.getBoundingClientRect().left,
      right: el.getBoundingClientRect().right,
      viewport: innerWidth,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }));
    expect(metrics.overflow).toBe(false);
    expect(metrics.left).toBeGreaterThanOrEqual(0);
    expect(metrics.right).toBeLessThanOrEqual(metrics.viewport);
    await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: width === 390 || width === 1440, animations: "disabled" });
  });
}

test("static content and project navigation remain usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#identity")).toBeVisible();
  await expect(page.getByText("Full-Stack Developer", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Read RBIM case study" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("RBIM");
  await context.close();
});
