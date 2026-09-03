import { test, expect } from '@playwright/test';

const CONTACT_URL = 'https://kristy-kate-dev-portfolio.vercel.app/contact';

async function expectContactContent(page: import('@playwright/test').Page) {
  await expect(page.getByText('Available for opportunities')).toBeVisible();
  await expect(page.getByText(/Let.?s make/i)).toBeVisible();
  await expect(page.getByText(/something/i)).toBeVisible();
  await expect(page.getByText(/useful\./i)).toBeVisible();
  await expect(page.getByText(/Have a software project/i)).toBeVisible();
  await expect(page.getByText('trysinkaye@gmail.com').first()).toBeVisible();
  await expect(page.getByText('Based in')).toBeVisible();
}

test.describe('Contact page visibility regression', () => {
  test('contact content remains visible in dark mode', async ({ page }) => {
    await page.goto(CONTACT_URL);
    await expectContactContent(page);
  });

  test('contact content remains visible after switching to light mode', async ({ page }) => {
    await page.goto(CONTACT_URL);

    const themeButton = page.getByRole('button', {
      name: /Use (dark|light) mode/,
    });

    await expect(themeButton).toBeVisible();

    const label = await themeButton.getAttribute('aria-label');
    if (label === 'Use light mode') {
      await themeButton.click();
    }

    await expect(page.getByRole('button', { name: 'Use dark mode' })).toBeVisible();
    await expectContactContent(page);
  });
});
