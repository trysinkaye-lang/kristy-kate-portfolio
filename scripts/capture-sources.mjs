import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

// Captures actual project pages. No synthetic interface or product imagery.
await fs.mkdir('.artifacts/sources', { recursive: true });
const browser = await chromium.launch({ headless: true });
for (const [slug, url] of [
  ['co-designs', 'https://co-designs-website.vercel.app/'],
  ['marci-metzger', 'https://marci-metzger-redesign-2026.vercel.app/'],
  ['lacomus', 'https://lacomus-revamp.vercel.app/'],
]) {
  if (process.argv[2] && process.argv[2] !== slug) continue;
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.screenshot({ path: `.artifacts/sources/${slug}.png` });
    if (slug === 'co-designs') {
      await page.getByText('Skip to completed house', { exact: true }).focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      await page.screenshot({ path: '.artifacts/sources/co-designs-completed.png' });
    }
    const evidence = await page.evaluate(() => ({ title: document.title, text: document.body.innerText, images: Array.from(document.images).map(i => ({ src: i.currentSrc, alt: i.alt, width: i.naturalWidth, height: i.naturalHeight })) }));
    await fs.writeFile(`.artifacts/sources/${slug}.json`, JSON.stringify(evidence, null, 2));
    console.log(slug, response?.status(), JSON.stringify(evidence).slice(0, 6000));
  } catch (error) { console.log(slug, error.message); }
  await page.close();
}
await browser.close();
