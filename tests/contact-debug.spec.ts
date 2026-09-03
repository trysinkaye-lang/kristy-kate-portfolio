import { test, expect } from '@playwright/test';

const URL = 'https://kristy-kate-dev-portfolio.vercel.app/contact';

test('debug live contact rendering', async ({ page }) => {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  const result = await page.evaluate(() => {
    const main = document.querySelector('main.contact-page') as HTMLElement | null;
    const wrapper = main?.querySelector(':scope > div.relative.z-10') as HTMLElement | null;
    const heading = main?.querySelector('h1') as HTMLElement | null;

    const inspect = (el: HTMLElement | null) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        className: el.className,
        text: el.textContent?.trim().slice(0, 180),
        display: s.display,
        visibility: s.visibility,
        opacity: s.opacity,
        transform: s.transform,
        filter: s.filter,
        position: s.position,
        zIndex: s.zIndex,
        color: s.color,
        clipPath: s.clipPath,
        overflow: s.overflow,
        contentVisibility: s.contentVisibility,
        width: r.width,
        height: r.height,
        top: r.top,
        left: r.left,
      };
    };

    return {
      url: location.href,
      htmlClass: document.documentElement.className,
      bodyClass: document.body.className,
      main: inspect(main),
      wrapper: inspect(wrapper),
      heading: inspect(heading),
      mainHTML: main?.innerHTML.slice(0, 1200) ?? null,
    };
  });

  console.log('CONTACT_DEBUG=' + JSON.stringify(result));
  expect(result.main).not.toBeNull();
});
