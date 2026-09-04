import { test, expect } from "@playwright/test";

test.describe("Homepage recruiter journey", () => {
  test("communicates identity, role, proof of work, and next action", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const hero = page.locator("#home");
    await expect(hero).toBeVisible();
    await expect(hero.getByText("Kristy Kate Taylor", { exact: true })).toBeVisible();
    await expect(hero.getByText("Software Developer & UI/UX Designer", { exact: true })).toBeVisible();
    await expect(hero.getByRole("heading", { name: /developer.*designer/i })).toBeVisible();
    await expect(hero.getByRole("link", { name: /View My Work/i })).toBeVisible();

    await expect(page.getByRole("heading", { name: "RBIM" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "AHDIS" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /The stack behind my strongest systems/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Interested in working together/i })).toBeVisible();
  });

  test("primary recruiter CTA opens Projects", async ({ page }) => {
    await page.goto("/");
    await page.locator("#home").getByRole("link", { name: /View My Work/i }).click();
    await expect(page).toHaveURL(/\/projects$/);
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
      await page.goto("/");
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasOverflow).toBe(false);
    });
  }
});
