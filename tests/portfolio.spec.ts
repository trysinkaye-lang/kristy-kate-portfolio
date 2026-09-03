import { test, expect } from '@playwright/test';

const BASE_URL = 'https://kristy-kate-dev-portfolio.vercel.app';

test.describe('Kristy Kate Portfolio Interactive Automation', () => {

  test('homepage loads successfully', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page).toHaveTitle(/Kristy|Portfolio/i);
    await expect(page.locator('body')).toBeVisible();

    await page.screenshot({
      path: 'screenshots/homepage.png',
      fullPage: true,
    });
  });


  test('desktop navigation works through real clicks', async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 900,
    });

    await page.goto(BASE_URL);

    const navigation = page.getByRole('navigation', {
      name: 'Main navigation',
    });

    await expect(navigation).toBeVisible();

    // Click Projects
    await navigation.getByRole('link', {
      name: 'Projects',
    }).click();

    await expect(page).toHaveURL(/\/projects$/);

    // Click About
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'About' })
      .click();

    await expect(page).toHaveURL(/\/about$/);

    // Click Contact
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Contact' })
      .click();

    await expect(page).toHaveURL(/\/contact$/);
  });


  test('dark and light mode toggle works', async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 900,
    });

    await page.goto(BASE_URL);

    const themeButton = page.getByRole('button', {
      name: /Use (dark|light) mode/,
    });

    await expect(themeButton).toBeVisible();

    const originalLabel =
      await themeButton.getAttribute('aria-label');

    await themeButton.click();

    await expect(themeButton).not.toHaveAttribute(
      'aria-label',
      originalLabel ?? ''
    );

    await page.waitForTimeout(700);

    await page.screenshot({
      path: 'screenshots/theme-toggle.png',
      fullPage: true,
    });
  });


  test('mobile sidebar opens and navigates correctly', async ({ page }) => {
    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await page.goto(BASE_URL);

    const menuButton = page.getByRole('button', {
      name: 'Open navigation sidebar',
    });

    await expect(menuButton).toBeVisible();

    await menuButton.click();

    const mobileNavigation = page.getByRole('navigation', {
      name: 'Mobile navigation',
    });

    await expect(mobileNavigation).toBeVisible();

    await mobileNavigation
      .getByRole('link', { name: /Projects/ })
      .click();

    await expect(page).toHaveURL(/\/projects$/);

    await page.screenshot({
      path: 'screenshots/mobile-projects.png',
      fullPage: true,
    });
  });


  test('mobile sidebar can be opened and closed', async ({ page }) => {
    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await page.goto(BASE_URL);

    await page
      .getByRole('button', {
        name: 'Open navigation sidebar',
      })
      .click();

    const closeButton = page.getByRole('button', {
      name: 'Close navigation sidebar',
    });

    await expect(closeButton).toBeVisible();

    await closeButton.click();

    await expect(
      page.getByRole('button', {
        name: 'Open navigation sidebar',
      })
    ).toBeVisible();
  });


  test('RBIM project opens from Projects page', async ({ page }) => {
    await page.goto(`${BASE_URL}/projects`);

    const rbimLink = page.locator(
      'a[href="/projects/rbim"]'
    ).first();

    await expect(rbimLink).toBeVisible();

    await rbimLink.click();

    await expect(page).toHaveURL(
      /\/projects\/rbim$/
    );

    await page.screenshot({
      path: 'screenshots/rbim-project.png',
      fullPage: true,
    });
  });


  test('all project detail pages load successfully', async ({ page }) => {
    const projects = [
      '/projects/rbim',
      '/projects/ahdis',
      '/projects/erp-system',
      '/projects/design-systems',
    ];

    for (const route of projects) {
      const response = await page.goto(
        `${BASE_URL}${route}`
      );

      expect(response).not.toBeNull();

      if (response) {
        expect(
          response.status(),
          `${route} failed`
        ).toBeLessThan(400);
      }

      console.log(`✓ ${route}`);
    }
  });


  test('desktop tablet and mobile have no horizontal overflow', async ({
    page,
  }) => {

    const viewports = [
      {
        name: 'desktop',
        width: 1440,
        height: 900,
      },
      {
        name: 'tablet',
        width: 768,
        height: 1024,
      },
      {
        name: 'mobile',
        width: 390,
        height: 844,
      },
    ];

    for (const viewport of viewports) {

      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      await page.goto(BASE_URL);

      const hasOverflow = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth
        );
      });

      expect(
        hasOverflow,
        `${viewport.name} has horizontal overflow`
      ).toBe(false);

      console.log(
        `✓ ${viewport.name} ${viewport.width}x${viewport.height}`
      );
    }
  });


  test('no uncaught JavaScript errors on main pages', async ({ page }) => {
    const errors: string[] = [];

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    const pages = [
      '/',
      '/about',
      '/projects',
      '/contact',
    ];

    for (const route of pages) {
      await page.goto(`${BASE_URL}${route}`);

      await page.waitForLoadState('domcontentloaded');
    }

    expect(
      errors,
      `JavaScript errors detected:\n${errors.join('\n')}`
    ).toEqual([]);
  });


  test('internal navigation links are not broken', async ({ page }) => {
    await page.goto(BASE_URL);

    const links = await page.locator('a').evaluateAll(elements =>
      elements
        .map(element => element.getAttribute('href'))
        .filter(
          (href): href is string =>
            Boolean(href) &&
            href!.startsWith('/') &&
            !href!.startsWith('/#') &&
            !href!.startsWith('/api')
        )
    );

    const uniqueLinks = [...new Set(links)];

    for (const href of uniqueLinks) {

      const response = await page.request.get(
        `${BASE_URL}${href}`
      );

      expect(
        response.status(),
        `Broken link: ${href}`
      ).toBeLessThan(400);

      console.log(`✓ ${href}`);
    }
  });

});