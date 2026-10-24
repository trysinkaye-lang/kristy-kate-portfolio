import { chromium } from "playwright";
import fs from "node:fs/promises";
const base = process.env.REVIEW_URL || "http://127.0.0.1:3101";
const output = process.env.REVIEW_OUTPUT || ".artifacts/particle-review";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];
try {
  for (const [width, height] of [[1440, 900], [390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(base);
    await page.locator('[data-particle-field][data-renderer="webgl"]').waitFor();
    await page.evaluate(() => document.fonts.ready);
    for (const shape of ["portrait", "portraitRight", "sphere", "philippines", "ribbon", "work", "torus", "orb", "ribbonLow", "frame"]) {
      await page.locator(`[data-particle-scene="${shape}"]`).evaluate(el => scrollTo({top: el.getBoundingClientRect().top + scrollY + el.clientHeight / 2 - innerHeight / 2, behavior:"instant"}));
      await page.waitForFunction(shape => document.querySelector('[data-particle-field]').dataset.activeShape === shape, shape);
      await page.waitForTimeout(850);
      await page.screenshot({ path: `${output}/${width}-${shape}.png` });
    }
    await page.close();
  }
  await fs.writeFile(`${output}/errors.json`, JSON.stringify(errors));
  console.log(JSON.stringify({ output, errors }));
  if (errors.length) process.exitCode = 1;
} finally { await browser.close(); }
