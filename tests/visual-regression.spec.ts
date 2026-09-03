import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000';

async function settle(page: import('@playwright/test').Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);
}

test.describe('Portfolio visual QA captures', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Visual QA captures use Chromium only');

  test('capture desktop portfolio views', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto(BASE_URL);
    await settle(page);
    await expect(page.locator('.cinematic-home-hero')).toBeVisible();
    await page.screenshot({ path: 'screenshots/desktop-home-hero.png' });

    await page.mouse.wheel(0, 720);
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/desktop-home-scroll.png' });

    await page.goto(`${BASE_URL}/projects`);
    await settle(page);
    await page.screenshot({ path: 'screenshots/desktop-projects.png', fullPage: true });

    await page.goto(`${BASE_URL}/about`);
    await settle(page);
    await page.screenshot({ path: 'screenshots/desktop-about.png', fullPage: true });

    await page.goto(`${BASE_URL}/contact`);
    await settle(page);
    await page.screenshot({ path: 'screenshots/desktop-contact.png', fullPage: true });
  });

  test('capture mobile portfolio views', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto(BASE_URL);
    await settle(page);
    await page.screenshot({ path: 'screenshots/mobile-home.png', fullPage: true });

    await page.goto(`${BASE_URL}/projects`);
    await settle(page);
    await page.screenshot({ path: 'screenshots/mobile-projects.png', fullPage: true });

    await page.goto(`${BASE_URL}/about`);
    await settle(page);
    await page.screenshot({ path: 'screenshots/mobile-about.png', fullPage: true });

    await page.goto(`${BASE_URL}/contact`);
    await settle(page);
    await page.screenshot({ path: 'screenshots/mobile-contact.png', fullPage: true });
  });
});
