import { test, expect } from "@playwright/test";

test.describe("Homepage recruiter journey", () => {
  test("communicates identity, role, proof of work, and next action", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const hero = page.locator(".studio-hero");
    await expect(hero).toBeVisible();
    await expect(hero.getByText("Kristy Kate Taylor", { exact: true })).toBeVisible();
    await expect(hero.getByText("Design engineer · full-stack developer", { exact: true })).toBeVisible();
    await expect(hero.getByRole("heading", { name: /design.*code.*systems/i })).toBeVisible();
    await expect(hero.getByRole("link", { name: /Explore selected work/i })).toBeVisible();
    await expect(hero.getByRole("link", { name: /Start a conversation/i })).toBeVisible();

    await expect(page.getByRole("heading", { name: "RBIM" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "AHDIS" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "C.O. DESIGNS" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "MARCI METZGER" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /What I bring to a project/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /LET.*BUILD.*SOMETHING USEFUL/i })).toBeVisible();
  });

  test("uses editorial project visuals instead of the old live iframe grid", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    await expect(page.locator(".studio-hero video")).toHaveCount(0);
    await expect(page.locator(".home-site-browser-frame")).toHaveCount(0);

    const projectVisuals = page.locator(".studio-project-visual");
    await expect(projectVisuals).toHaveCount(4);
    await expect(projectVisuals.nth(0)).toHaveAttribute("href", "/projects/rbim");
    await expect(projectVisuals.nth(1)).toHaveAttribute("href", "/projects/co-designs-website");
    await expect(projectVisuals.nth(2)).toHaveAttribute("href", "/projects/ahdis");
    await expect(projectVisuals.nth(3)).toHaveAttribute("href", "/projects/marci-metzger-redesign");
  });

  test("website packages page offers direct contact actions", async ({ page }) => {
    await page.goto("/packages");

    await expect(
      page.getByRole("heading", { name: /Choose a package, then view it in your currency/i }),
    ).toBeVisible();

    const currencySelect = page.locator("#package-currency");
    await expect(currencySelect).toBeVisible();
    await currencySelect.selectOption("PHP");

    await expect(page.getByRole("link", { name: "Discuss Basic" })).toHaveAttribute(
      "href",
      "/contact?package=basic&currency=PHP",
    );
    await expect(page.getByRole("link", { name: "Discuss Professional" })).toHaveAttribute(
      "href",
      "/contact?package=professional&currency=PHP",
    );
    await expect(page.getByRole("link", { name: "Discuss Premium" })).toHaveAttribute(
      "href",
      "/contact?package=premium&currency=PHP",
    );
  });

  test("primary hero CTA jumps to selected work", async ({ page }) => {
    await page.goto("/");
    await page.locator(".studio-hero").getByRole("link", { name: /Explore selected work/i }).click();
    await expect(page).toHaveURL(/#selected-work$/);
    await expect(page.locator("#selected-work")).toBeVisible();
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
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasOverflow).toBe(false);
    });
  }
});
