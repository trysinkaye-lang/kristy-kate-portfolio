import { test, expect } from "@playwright/test";
test("software captures preserve aspect ratio and stay within source resolution", async ({ page }) => {
  for (const [slug, sourceWidth] of [["rbim",640],["ahdis",480],["erp-system",480]] as const) {
    for (const width of [390,768,1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/projects/${slug}`);
      const image = page.getByRole("img", { name: new RegExp(`${slug === "erp-system" ? "ERP System" : slug.toUpperCase()} interface screenshot`) });
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((el: HTMLImageElement) => el.decode());
      const metrics = await image.evaluate((el: HTMLImageElement) => ({ width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height, ratio: el.naturalWidth / el.naturalHeight }));
      expect(metrics.width).toBeLessThanOrEqual(sourceWidth + 1);
      expect(Math.abs(metrics.width / metrics.height - metrics.ratio)).toBeLessThan(.02);
    }
  }
});

