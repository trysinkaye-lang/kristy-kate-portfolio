import { test, expect } from "@playwright/test";

test.describe("Homepage recruiter journey", () => {
  test("communicates identity, role, proof of work, and next action", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const hero = page.locator("#home");
    await expect(hero).toBeVisible();
    await expect(hero.getByText("Kristy Kate Taylor", { exact: true })).toBeVisible();
    await expect(hero.getByText("Website Designer & Developer · Full-Stack Developer", { exact: true })).toBeVisible();
    await expect(hero.getByRole("heading", { name: /developer.*designer/i })).toBeVisible();
    await expect(hero.getByRole("link", { name: /View My Work/i })).toBeVisible();

    await expect(page.getByRole("heading", { name: "RBIM" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "AHDIS" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "LACOMUS" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "C.O. DESIGNS" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /The stack behind my strongest work/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Interested in working together/i })).toBeVisible();
  });

  test("shows a visible Higgsfield hero reel and verified website imagery", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const reel = page.locator("video.cover-reel-video");
    await expect(reel).toBeVisible();
    await expect(reel.locator("source")).toHaveAttribute("src", /hf_20260909_164047_d56032a8/);

    const videoPresentation = await reel.evaluate((video) => {
      const styles = getComputedStyle(video);
      const rect = video.getBoundingClientRect();
      return {
        opacity: styles.opacity,
        width: rect.width,
        height: rect.height,
      };
    });

    expect(Number(videoPresentation.opacity)).toBeGreaterThanOrEqual(0.95);
    expect(videoPresentation.width).toBeGreaterThan(300);
    expect(videoPresentation.height).toBeGreaterThan(180);

    const lacomusPreview = page.getByAltText("LACOMUS current project preview");
    await expect(lacomusPreview).toBeVisible();
    await expect(lacomusPreview).toHaveAttribute("src", /3a2421a2-54a6-4574-9e9d-d883afdd3644\.png/);

    const architecturePreview = page.getByAltText("C.O. DESIGNS current project preview");
    await expect(architecturePreview).toBeVisible();
    await expect(architecturePreview).toHaveAttribute("src", /contemporary-home\.webp/);
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
