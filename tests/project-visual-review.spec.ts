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
