import { test, expect } from '@playwright/test';

test.describe('AHDIS case study preview', () => {
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 390, height: 844 },
  ];

  test('uses a large screenshot without the removed technical caption', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/projects/ahdis');

    await expect(page.getByText('AHDIS interface preview', { exact: true })).toBeVisible();
    await expect(page.getByText('Interface preview shown at its native source resolution to preserve sharpness.')).toHaveCount(0);

    const image = page.getByRole('img', { name: 'AHDIS interface screenshot' });
    await expect(image).toBeVisible();

    const dimensions = await image.evaluate((element: HTMLImageElement) => ({
      width: element.getBoundingClientRect().width,
      viewportWidth: window.innerWidth,
    }));

    expect(dimensions.width).toBeGreaterThan(dimensions.viewportWidth * 0.7);
  });

  test('preserves aspect ratio and avoids overflow across desktop tablet and mobile', async ({ page }) => {
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/projects/ahdis');

      const image = page.getByRole('img', { name: 'AHDIS interface screenshot' });
      await expect(image).toBeVisible();

      const metrics = await image.evaluate((element: HTMLImageElement) => {
        const rect = element.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          naturalWidth: element.naturalWidth,
          naturalHeight: element.naturalHeight,
          pageOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        };
      });

      expect(metrics.naturalWidth).toBeGreaterThan(0);
      expect(metrics.naturalHeight).toBeGreaterThan(0);
      expect(metrics.pageOverflow, `${viewport.name} has horizontal overflow`).toBe(false);

      const renderedRatio = metrics.width / metrics.height;
      const naturalRatio = metrics.naturalWidth / metrics.naturalHeight;
      expect(Math.abs(renderedRatio - naturalRatio), `${viewport.name} distorted the AHDIS screenshot`).toBeLessThan(0.02);
    }
  });
});
