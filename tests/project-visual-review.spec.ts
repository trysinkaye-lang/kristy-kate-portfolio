import { test, expect } from "@playwright/test";

test("editorial project showcase is legible at desktop and mobile sizes", async ({ page }, testInfo) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/projects");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects.");
    await expect(page.locator("main article")).toHaveCount(5);
    await expect(page.locator("main article").first().getByRole("heading", { name: "RBIM" })).toBeVisible();

    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow, "Horizontal overflow at width " + viewport.width).toBe(false);

    await page.locator("main article img").evaluateAll(async images => {
      for (const image of images) {
        (image as HTMLImageElement).loading = "eager";
        await (image as HTMLImageElement).decode();
      }
    });
    const brokenImages = await page.locator("main article img").evaluateAll(images =>
      images.filter(image => !(image as HTMLImageElement).complete ||
        (image as HTMLImageElement).naturalWidth === 0).length
    );
    expect(brokenImages).toBe(0);

    if (testInfo.project.name === "chromium") {
      await page.screenshot({
        path: testInfo.outputPath("editorial-projects-" + viewport.width + ".png"),
        fullPage: true,
        animations: "disabled",
      });
    }
  }
});


test("project case studies use the editorial layout without oversized media or overflow", async ({ page }, testInfo) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/projects/rbim");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("RBIM");
    await expect(page.getByRole("heading", { name: "The details." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What it does" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Project results" })).toBeVisible();
    await expect(page.getByText("Challenges & learning.")).toHaveCount(0);
    await expect(page.getByRole("link", { name: /C.O. DESIGNS/ })).toBeVisible();

    const heroMedia = page.locator("main figure[data-spotlight]");
    const mediaSize = await heroMedia.evaluate(el => el.getBoundingClientRect().width);
    expect(mediaSize).toBeLessThanOrEqual(780);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow, "No horizontal overflow at " + width + "px").toBe(false);

    if (testInfo.project.name === "chromium") {
      await page.screenshot({
        path: testInfo.outputPath("rbim-case-" + width + ".png"),
        fullPage: true,
        animations: "disabled",
      });
    }
  }
});
