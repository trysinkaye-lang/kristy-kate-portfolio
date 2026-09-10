import { test, expect } from "@playwright/test";

const projectSlugs = ["rbim", "co-designs", "ahdis", "marci-metzger", "lacomus", "erp-system", "design-systems"];
const routes = ["/", "/projects", "/about", "/contact", ...projectSlugs.map((slug) => `/projects/${slug}`)];

test("all pages load with one h1, complete images, and no JavaScript or resource errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("response", (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response!.status(), route).toBeLessThan(400);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.evaluate(async () => { for (const image of Array.from(document.images)) { image.loading = "eager"; await image.decode(); } });
    const images = await page.locator("img").evaluateAll((elements) => elements.every((el) => (el as HTMLImageElement).naturalWidth > 0));
    expect(images, route).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("desktop navigation, services disclosures, and next project journey", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation", exact: true });
  await nav.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await nav.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await nav.getByRole("link", { name: "Services", exact: true }).click();
  await expect(page).toHaveURL(/\/#services$/);
  await page.getByText("Full-stack development", { exact: true }).click();
  await expect(page.locator("#services details").first()).toHaveAttribute("open", "");
  await page.goto("/projects/rbim");
  await page.getByRole("link", { name: "C.O. DESIGNS" }).click();
  await expect(page).toHaveURL(/\/projects\/co-designs$/);
});

test("mobile dialog manages focus, escape, links, and viewport changes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const open = page.getByRole("button", { name: "Open navigation", exact: true });
  await open.click();
  const dialog = page.getByRole("dialog", { name: "Navigation", exact: true });
  const close = dialog.getByRole("button", { name: "Close navigation", exact: true });
  await expect(close).toBeFocused();
  await expect(open).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("button", { name: "Use dark mode" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(open).toBeFocused();
  await open.click();
  await dialog.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(dialog).not.toBeVisible();
  await open.click();
  await page.setViewportSize({ width: 1024, height: 1366 });
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("theme persists across routes and reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Use dark mode" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.getByRole("button", { name: "Use light mode" })).toBeVisible();
  await page.getByRole("button", { name: "Use light mode" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
});

test("every primary route avoids overflow at mobile, tablet, and desktop", async ({ page }) => {
  test.setTimeout(90_000);
  for (const viewport of [{ width: 375, height: 812 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `${route} at ${viewport.width}`).toBe(true);
    }
  }
});

test("reduced motion keeps content and interactions available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#identity")).toBeVisible();
  await expect(page.locator('[data-project="rbim"]')).toBeVisible();
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  const animations = await page.evaluate(() => document.getAnimations().filter((animation) => animation.playState === "running").length);
  expect(animations).toBe(0);
  await page.getByRole("link", { name: "Read AHDIS case study" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("AHDIS");
});

test("skip link supports keyboard navigation", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
});

test("website packages keep currency conversion and contact handoff usable", async ({ page }) => {
  await page.route("**/api/exchange-rates", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ base: "PHP", date: "2026-09-10", rates: { USD: 0.0175 } }),
    });
  });
  await page.goto("/packages");
  await expect(page.getByRole("heading", { level: 1, name: /A clear starting point/i })).toBeVisible();
  const currency = page.locator("#package-currency");
  await currency.selectOption("USD");
  await expect(page.getByText(/Approximate US Dollar conversion/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Discuss Basic" })).toHaveAttribute("href", "/contact?package=basic&currency=USD");
  await expect(page.getByRole("link", { name: "Discuss Professional" })).toHaveAttribute("href", "/contact?package=professional&currency=USD");
  await expect(page.getByRole("link", { name: "Discuss Premium" })).toHaveAttribute("href", "/contact?package=premium&currency=USD");
  for (const viewport of [{ width: 375, height: 812 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `packages at ${viewport.width}`).toBe(true);
  }
});

test("SEO covers canonical URLs, social previews, all projects, packages, and not-found", async ({ page, request }) => {
  for (const route of ["/", "/about", "/packages", "/contact", "/projects/rbim", "/projects/lacomus"]) {
    await page.goto(route);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://kristy-kate-dev-portfolio.vercel.app${route === "/" ? "" : route}`);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Kristy Kate Taylor/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const route of projectSlugs.map((slug) => `/projects/${slug}`)) expect(sitemap).toContain(route);
  expect(sitemap).toContain("/packages");
  expect(await (await request.get("/robots.txt")).text()).toContain("/sitemap.xml");
  expect((await request.get("/opengraph-image")).status()).toBe(200);
  expect((await page.goto("/projects/no-such-project"))!.status()).toBe(404);
});
