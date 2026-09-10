import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
await fs.mkdir(".artifacts/review", { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", error => errors.push(error.message));
page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
for (const [name, route, width, height] of [
  ["home-desktop", "/", 1440, 900], ["home-tablet", "/", 768, 1024], ["home-mobile", "/", 390, 844],
  ["about", "/about", 1440, 900], ["contact", "/contact", 1440, 900], ["rbim-case", "/projects/rbim", 1440, 900], ["lacomus-case", "/projects/lacomus", 1440, 900]
]) {
  await page.setViewportSize({ width, height });
  await page.goto("http://127.0.0.1:3100" + route);
  await page.evaluate(async () => { await document.fonts.ready; for (const img of Array.from(document.images)) { img.loading = "eager"; await img.decode(); } });
  await page.screenshot({ path: `.artifacts/review/${name}.png`, fullPage: true, animations: "disabled" });
  if (route === "/") {
    await page.screenshot({ path: `.artifacts/review/${name}-hero.png`, animations: "disabled" });
    if (width === 1440) for (const slug of ["rbim", "co-designs", "ahdis", "marci-metzger", "lacomus", "erp-system", "design-systems"]) await page.locator(`[data-project="${slug}"]`).screenshot({ path: `.artifacts/review/${slug}.png`, animations: "disabled" });
  }
  console.log(name, await page.title(), "overflow:", await page.evaluate(() => document.documentElement.scrollWidth > innerWidth));
}
await page.goto("http://127.0.0.1:3100");
await page.getByRole("button", { name: "Use dark mode" }).click();
await page.screenshot({ path: ".artifacts/review/home-dark.png", fullPage: true, animations: "disabled" });
console.log("Errors:", errors);
await browser.close();

