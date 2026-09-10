import { test, expect } from "@playwright/test";

test.describe("Homepage recruiter journey", () => {
  test("communicates identity, role, proof of work, and next action", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const hero = page.locator(".cp26-hero");
    await expect(hero).toBeVisible();
    await expect(hero.getByText("Kristy Kate Taylor", { exact: true })).toBeVisible();
    await expect(page.getByText("FULL-STACK DEVELOPER", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("UI/UX DESIGNER", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("CREATIVE DEVELOPER", { exact: true }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /I DESIGN DIGITAL EXPERIENCES/i })).toBeVisible();

    for (const heading of ["RBIM", "C.O. DESIGNS", "AHDIS", "MARCI METZGER", "LACOMUS"]) {
      await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    }

    await expect(page.getByRole("heading", { name: /WHAT I BRING TO A PROJECT/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /LET'S MAKE/i })).toBeVisible();
  });

  test("homepage uses project imagery without a hero video", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    await expect(page.locator(".cp26-hero video")).toHaveCount(0);
    await expect(page.locator(".cp26-project-media img")).toHaveCount(5);
  });

  test("website packages page offers direct contact actions", async ({ page }) => {
    await page.goto("/packages");
    await expect(page.getByRole("heading", { name: /Choose a package, then view it in your currency/i })).toBeVisible();

    const currencySelect = page.locator("#package-currency");
    await expect(currencySelect).toBeVisible();
    await currencySelect.selectOption("PHP");

    await expect(page.getByRole("link", { name: "Discuss Basic" })).toHaveAttribute("href", "/contact?package=basic&currency=PHP");
    await expect(page.getByRole("link", { name: "Discuss Professional" })).toHaveAttribute("href", "/contact?package=professional&currency=PHP");
    await expect(page.getByRole("link", { name: "Discuss Premium" })).toHaveAttribute("href", "/contact?package=premium&currency=PHP");
  });

  test("selected-work jump link reaches the featured work section", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Selected work/i }).click();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.locator("#work")).toBeVisible();
  });

  test("does not expose a broken resume link while no resume file exists", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /View Resume|Download Resume/i })).toHaveCount(0);
  });

  for (const viewport of [
    { name: "mobile-375", width: 375, height: 812 },
    { name: "mobile-390", width: 390, height: 844 },
    { name: "mobile-430", width: 430, height: 932 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "tablet-1024", width: 1024, height: 1366 },
    { name: "laptop-1366", width: 1366, height: 768 },
    { name: "desktop-1440", width: 1440, height: 900 },
    { name: "desktop-1536", width: 1536, height: 864 },
  ]) {
    test(`homepage has no horizontal overflow at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(hasOverflow).toBe(false);
    });
  }
});
