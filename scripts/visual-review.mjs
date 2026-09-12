import { chromium } from "@playwright/test";
import fs from "node:fs/promises";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";
const output = ".artifacts/review";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
const captures = [];
page.on("pageerror", error => errors.push(error.message));
page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
// Reference conversion availability is independent of the visual review.
await page.route("**/api/exchange-rates", route => route.fulfill({ json: { base: "PHP", rates: {} } }));

async function capture(name, route, width, height, fullPage = true) {
  await page.setViewportSize({ width, height });
  await page.goto(baseURL + route, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const image of document.images) { image.loading = "eager"; await image.decode(); }
  });
  await page.screenshot({ path: `${output}/${name}.png`, fullPage, animations: "disabled" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  captures.push({ name, route, width, height, overflow });
  if (overflow) errors.push(`Horizontal overflow: ${name}`);
}

try {
  for (const [width, height] of [[1920,1080],[1536,864],[1440,900],[1366,768],[1024,1366],[768,1024],[430,932],[390,844],[375,812]]) {
    await capture(`home-${width}`, "/", width, height, false);
    if ([1440, 390].includes(width)) await page.screenshot({ path: `${output}/home-${width}-full.png`, fullPage: true, animations: "disabled" });
  }
  await capture("home-desktop", "/", 1440, 900);
  for (const slug of ["rbim", "co-designs", "ahdis", "marci-metzger", "lacomus", "erp-system", "design-systems"]) {
    await page.locator(`[data-project="${slug}"]`).screenshot({ path: `${output}/${slug}.png`, animations: "disabled", style: "body > header, .skip-link { visibility: hidden; }" });
  }
  await page.getByRole("button", { name: "Use dark mode" }).click();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: `${output}/home-dark.png`, fullPage: true, animations: "disabled" });
  await page.getByRole("button", { name: "Use light mode" }).click();
  for (const [name, route] of [["index", "/projects"], ["about", "/about"], ["contact", "/contact"], ["packages", "/packages"], ["rbim-case", "/projects/rbim"], ["co-designs-case", "/projects/co-designs"], ["lacomus-case", "/projects/lacomus"]]) {
    await capture(`${name}-desktop`, route, 1440, 900);
    await capture(`${name}-mobile`, route, 390, 844);
  }
  await capture("inspector-start", "/projects/co-designs", 390, 844, false);
  await page.locator('main a[aria-haspopup="dialog"]').first().click();
  await page.getByRole("dialog").getByRole("img").evaluate(image => image.decode());
  await page.screenshot({ path: `${output}/image-inspector-mobile.png` });
  await fs.writeFile(`${output}/verification.json`, JSON.stringify({ baseURL, captures, errors }, null, 2));
  console.log(JSON.stringify({ captures: captures.length, errors }));
  if (errors.length) process.exitCode = 1;
} finally {
  await browser.close();
}
