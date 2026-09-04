import { test, expect } from '@playwright/test';

test.describe('Kristy Kate Portfolio Interactive Automation', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Kristy|Portfolio/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('homepage remains usable after scrolling beyond the hero', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const hero = page.locator('#home');
    await expect(hero).toBeVisible();

    await page.getByRole('heading', { name: /Real systems, built around real workflows/i }).scrollIntoViewIfNeeded();

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
    await expect(page.getByRole('heading', { name: /Real systems, built around real workflows/i })).toBeVisible();
  });

  test('desktop navigation works through real clicks', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

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
    await page.goto('/');

    const themeButton = page.getByRole('button', { name: /Use (dark|light) mode/ });
    await expect(themeButton).toBeVisible();

    const originalLabel = await themeButton.getAttribute('aria-label');
    await themeButton.click();

    await expect(themeButton).not.toHaveAttribute('aria-label', originalLabel ?? '');
  });

  test('mobile sidebar opens and navigates correctly', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: 'Open navigation sidebar' });
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(mobileNavigation).toBeVisible();

    await mobileNavigation.getByRole('link', { name: /Projects/ }).click();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test('mobile sidebar closes with button and Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const openButton = page.getByRole('button', { name: 'Open navigation sidebar' });
    await openButton.click();

    const closeButton = page.getByRole('button', { name: 'Close navigation sidebar' });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    await expect(openButton).toBeVisible();

    await openButton.click();
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-navigation-panel')).toHaveAttribute('aria-hidden', 'true');
  });

  test('RBIM project opens from Projects page', async ({ page }) => {
    await page.goto('/projects');

    const rbimLink = page.locator('a[href="/projects/rbim"]').first();
    await expect(rbimLink).toBeVisible();
    await rbimLink.click();
    await expect(page).toHaveURL(/\/projects\/rbim$/);
  });

  test('all project detail pages load successfully', async ({ page }) => {
    const projects = [
      '/projects/rbim',
      '/projects/ahdis',
      '/projects/erp-system',
      '/projects/design-systems',
    ];

    for (const route of projects) {
      const response = await page.goto(route);
      expect(response).not.toBeNull();
      if (response) expect(response.status(), `${route} failed`).toBeLessThan(400);
    }
  });

  test('main pages have no horizontal overflow on desktop tablet and mobile', async ({ page }) => {
    const routes = ['/', '/projects', '/about', '/contact'];
    const viewports = [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 390, height: 844 },
    ];

    for (const route of routes) {
      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(route);

        const hasOverflow = await page.evaluate(() =>
          document.documentElement.scrollWidth > document.documentElement.clientWidth
        );

        expect(hasOverflow, `${route} at ${viewport.name} has horizontal overflow`).toBe(false);
      }
    }
  });

  test('no uncaught JavaScript errors on main pages', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));

    for (const route of ['/', '/about', '/projects', '/contact']) {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');
    }

    expect(errors, `JavaScript errors detected:\n${errors.join('\n')}`).toEqual([]);
  });

  test('internal navigation links are not broken', async ({ page, request }) => {
    await page.goto('/');

    const links = await page.locator('a').evaluateAll(elements =>
      elements
        .map(element => element.getAttribute('href'))
        .filter((href): href is string => Boolean(href) && href!.startsWith('/') && !href!.startsWith('/#') && !href!.startsWith('/api'))
    );

    const uniqueLinks = [...new Set(links)];
    const origin = new URL(page.url()).origin;

    for (const href of uniqueLinks) {
      const response = await request.get(new URL(href, origin).toString());
      expect(response.status(), `Broken link: ${href}`).toBeLessThan(400);
    }
  });
});
