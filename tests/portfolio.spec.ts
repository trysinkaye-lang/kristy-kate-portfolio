import { test, expect } from '@playwright/test';

const BASE_URL = 'https://kristy-kate-dev-portfolio.vercel.app';

test.describe('Kristy Kate Portfolio Automation', () => {

  test('homepage loads correctly', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page).toHaveTitle(/Kristy|Portfolio/i);

    await expect(page.locator('body')).toBeVisible();

    await page.screenshot({
      path: 'screenshots/homepage.png',
      fullPage: true,
    });
  });

  test('all main pages load successfully', async ({ page }) => {
    const routes = [
      '/',
      '/about',
      '/projects',
      '/contact',
      '/projects/rbim',
      '/projects/ahdis',
      '/projects/erp-system',
      '/projects/design-systems',
    ];

    for (const route of routes) {
      const response = await page.goto(`${BASE_URL}${route}`);

      expect(response).not.toBeNull();

      if (response) {
        expect(response.status()).toBeLessThan(400);
      }

      console.log(`✓ ${route} loaded successfully`);
    }
  });

  test('desktop view is responsive', async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 900,
    });

    await page.goto(BASE_URL);

    const hasHorizontalOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      );
    });

    expect(hasHorizontalOverflow).toBe(false);

    await page.screenshot({
      path: 'screenshots/desktop.png',
      fullPage: true,
    });
  });

  test('tablet view is responsive', async ({ page }) => {
    await page.setViewportSize({
      width: 768,
      height: 1024,
    });

    await page.goto(BASE_URL);

    const hasHorizontalOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      );
    });

    expect(hasHorizontalOverflow).toBe(false);

    await page.screenshot({
      path: 'screenshots/tablet.png',
      fullPage: true,
    });
  });

  test('mobile view is responsive', async ({ page }) => {
    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await page.goto(BASE_URL);

    const hasHorizontalOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      );
    });

    expect(hasHorizontalOverflow).toBe(false);

    await page.screenshot({
      path: 'screenshots/mobile.png',
      fullPage: true,
    });
  });

  test('navigation links work', async ({ page }) => {
    await page.goto(BASE_URL);

    const links = await page.locator('a').evaluateAll((elements) =>
      elements
        .map((element) => element.getAttribute('href'))
        .filter((href): href is string => Boolean(href))
    );

    for (const href of links) {
      if (
        href.startsWith('/') &&
        !href.startsWith('/#') &&
        !href.startsWith('/api')
      ) {
        const response = await page.request.get(`${BASE_URL}${href}`);

        expect(
          response.status(),
          `Broken link detected: ${href}`
        ).toBeLessThan(400);
      }
    }
  });

});