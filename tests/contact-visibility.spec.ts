import { test, expect } from '@playwright/test';

const CONTACT_URL = 'https://kristy-kate-dev-portfolio.vercel.app/contact';

async function expectContactContent(page: import('@playwright/test').Page) {
  const main = page.locator('main.contact-page');
  const shell = main.locator('.contact-classic-shell');
  const heading = main.getByRole('heading', { level: 1 });

  await expect(main).toBeVisible();
  await expect(shell).toBeVisible();
  await expect(heading).toBeVisible();
  await expect(heading).toContainText(/Let.?s make/i);
  await expect(heading).toContainText(/something/i);
  await expect(heading).toContainText(/useful\./i);
  await expect(main.getByText(/Have a software project, information system, website, or UI\/UX opportunity/i)).toBeVisible();
  await expect(main.getByRole('link', { name: /trysinkaye@gmail\.com/i }).first()).toBeVisible();
  await expect(main.getByText('Email', { exact: true })).toBeVisible();
  await expect(main.getByText('GitHub', { exact: true })).toBeVisible();
  await expect(main.getByText('Based in', { exact: true })).toBeVisible();
}

test.describe('Contact page visibility regression', () => {
  test('contact content remains visible in dark mode', async ({ page }) => {
    await page.goto(CONTACT_URL);

    const themeButton = page.getByRole('button', { name: /Use (dark|light) mode/ });
    await expect(themeButton).toBeVisible();

    const label = await themeButton.getAttribute('aria-label');
    if (label === 'Use dark mode') {
      await themeButton.click();
    }

    await expect(page.getByRole('button', { name: 'Use light mode' })).toBeVisible();
    await expectContactContent(page);
  });

  test('contact content remains visible after switching to light mode', async ({ page }) => {
    await page.goto(CONTACT_URL);

    const themeButton = page.getByRole('button', { name: /Use (dark|light) mode/ });
    await expect(themeButton).toBeVisible();

    const label = await themeButton.getAttribute('aria-label');
    if (label === 'Use light mode') {
      await themeButton.click();
    }

    await expect(page.getByRole('button', { name: 'Use dark mode' })).toBeVisible();
    await expectContactContent(page);
  });
});
