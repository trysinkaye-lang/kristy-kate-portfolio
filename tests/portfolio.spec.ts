import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000';

test.describe('Kristy Kate Portfolio Interactive Automation', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Kristy|Portfolio/i);
    await expect(page.locator('body')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/design|digital systems/i);
  });

  test('cinematic home hero and fallback layer render', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);

    await expect(page.locator('.cinematic-home-hero')).toBeVisible();
    await expect(page.getByText(/Kristy Kate Taylor.*Software Developer/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /View Projects/i })).toBeVisible();

    const visualLayers = page.locator('.portfolio-webgl-canvas, .cinematic-static-core');
    await expect(visualLayers.first()).toBeAttached();
  });

  test('desktop navigation works through real clicks', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);

    const navigation = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(navigation).toBeVisible();

    await navigation.getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL(/\/projects$/);

    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about$/);

    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test('dark and light mode toggle works', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);

    const themeButton = page.getByRole('button', { name: /Use (dark|light) mode/ });
    await expect(themeButton).toBeVisible();
    const originalLabel = await themeButton.getAttribute('aria-label');
    await themeButton.click();
    await expect(themeButton).not.toHaveAttribute('aria-label', originalLabel ?? '');
  });

  test('mobile sidebar opens and navigates correctly', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);

    const menuButton = page.getByRole('button', { name: 'Open navigation sidebar' });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(mobileNavigation).toBeVisible();
    await mobileNavigation.getByRole('link', { name: /Projects/ }).click();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test('mobile sidebar can be opened and closed', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Open navigation sidebar' }).click();
    const closeButton = page.getByRole('button', { name: 'Close navigation sidebar' });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    await expect(page.getByRole('button', { name: 'Open navigation sidebar' })).toBeVisible();
  });

  test('RBIM project opens from Projects page', async ({ page }) => {
    await page.goto(`${BASE_URL}/projects`);
    const rbimLink = page.locator('a[href="/projects/rbim"]').first();
    await expect(rbimLink).toBeVisible();
    await rbimLink.click();
    await expect(page).toHaveURL(/\/projects\/rbim$/);
  });

  test('all project detail pages load successfully', async ({ page }) => {
    const projects = ['/projects/rbim', '/projects/ahdis', '/projects/erp-system', '/projects/design-systems'];
    for (const route of projects) {
      const response = await page.goto(`${BASE_URL}${route}`);
      expect(response).not.toBeNull();
      if (response) expect(response.status(), `${route} failed`).toBeLessThan(400);
    }
  });

  test('desktop tablet and mobile have no horizontal overflow', async ({ page }) => {
    const viewports = [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'tablet', width: 820, height: 1180 },
      { name: 'mobile', width: 390, height: 844 },
      { name: 'small-mobile', width: 320, height: 720 },
    ];

    const routes = ['/', '/about', '/projects', '/contact'];
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      for (const route of routes) {
        await page.goto(`${BASE_URL}${route}`);
        const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
        expect(hasOverflow, `${viewport.name} ${route} has horizontal overflow`).toBe(false);
      }
    }
  });

  test('no uncaught JavaScript errors on main pages', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of ['/', '/about', '/projects', '/contact']) {
      await page.goto(`${BASE_URL}${route}`);
      await page.waitForLoadState('domcontentloaded');
    }
    expect(errors, `JavaScript errors detected:\n${errors.join('\n')}`).toEqual([]);
  });

  test('reduced motion preserves readable home content', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(BASE_URL);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/I turn complex workflows/i)).toBeVisible();
    await context.close();
  });

  test('internal navigation links are not broken', async ({ page }) => {
    await page.goto(BASE_URL);
    const links = await page.locator('a').evaluateAll(elements =>
      elements
        .map(element => element.getAttribute('href'))
        .filter((href): href is string => Boolean(href) && href!.startsWith('/') && !href!.startsWith('/#') && !href!.startsWith('/api'))
    );

    for (const href of [...new Set(links)]) {
      const response = await page.request.get(`${BASE_URL}${href}`);
      expect(response.status(), `Broken link: ${href}`).toBeLessThan(400);
    }
  });
});
