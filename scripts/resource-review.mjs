import { chromium, devices } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
import sharp from "sharp";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";
const output = ".artifacts/review";
const browser = await chromium.launch({ headless: true });
const results = [];
const errors = [];
const summarize = entries => {
  const files = entries.filter(entry => typeof entry.text === "string").map(entry => ({
    url: entry.url.replace(baseURL, ""),
    decodedBytes: Buffer.byteLength(entry.text),
    usedBytes: entry.ranges.reduce((total, range) => total + Buffer.byteLength(entry.text.slice(range.start, range.end)), 0),
  }));
  return { decodedBytes: files.reduce((sum, file) => sum + file.decodedBytes, 0), unusedBytes: files.reduce((sum, file) => sum + file.decodedBytes - file.usedBytes, 0), files };
};

function jsRanges(entry) {
  if (typeof entry.source !== "string") return { url: entry.url };
  const used = new Uint8Array(entry.source.length);
  // V8 reports nested function/block ranges; narrower blocks override parents.
  const blocks = entry.functions.flatMap(fn => fn.ranges).sort((a, b) => (b.endOffset - b.startOffset) - (a.endOffset - a.startOffset));
  for (const block of blocks) used.fill(block.count > 0 ? 1 : 0, block.startOffset, block.endOffset);
  const ranges = [];
  let start = -1;
  for (let index = 0; index <= used.length; index++) {
    if (used[index] && start < 0) start = index;
    if (!used[index] && start >= 0) { ranges.push({ start, end: index }); start = -1; }
  }
  return { url: entry.url, text: entry.source, ranges };
}

try {
  for (const device of ["desktop", "mobile"]) {
    for (const route of ["/", "/projects", "/projects/co-designs", "/about", "/packages", "/contact"]) {
      const context = await browser.newContext(device === "mobile" ? { ...devices["iPhone 13"] } : { viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      page.on("pageerror", error => errors.push(`${device} ${route}: ${error.message}`));
      page.on("console", message => { if (message.type() === "error") errors.push(`${device} ${route}: ${message.text()}`); });
      page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
      await Promise.all([page.coverage.startJSCoverage(), page.coverage.startCSSCoverage()]);
      await page.goto(baseURL + route, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const initial = await page.evaluate(() => ({
        resources: performance.getEntriesByType("resource").map(entry => ({ url: entry.name.replace(location.origin, ""), type: entry.initiatorType, encodedBytes: entry.encodedBodySize, decodedBytes: entry.decodedBodySize, durationMs: Math.round(entry.duration), renderBlocking: entry.renderBlockingStatus })),
        fontPreloads: [...document.querySelectorAll('link[rel="preload"][as="font"]')].map(link => link.getAttribute("href")),
        canvasCount: document.querySelectorAll("canvas").length,
        animations: document.getAnimations().map(animation => ({ name: animation.animationName, properties: [...new Set(animation.effect.getKeyframes().flatMap(frame => Object.keys(frame)))], iterations: animation.effect.getTiming().iterations })),
      }));
      // Coverage includes the whole page, its theme/menu, disclosures, and preview.
      await page.evaluate(async () => {
        for (const image of document.images) { image.loading = "eager"; await image.decode(); }
        for (const details of document.querySelectorAll("details")) details.open = true;
      });
      for (const article of await page.locator("main article").all()) await article.scrollIntoViewIfNeeded();
      if (device === "mobile") await page.getByRole("button", { name: "Open navigation", exact: true }).click();
      await page.getByRole("button", { name: "Use dark mode" }).click();
      await page.getByRole("button", { name: "Use light mode" }).click();
      if (device === "mobile") await page.getByRole("button", { name: "Close navigation", exact: true }).click();
      const preview = page.locator('main a[aria-haspopup="dialog"]').first();
      if (await preview.count()) {
        await preview.click();
        await page.getByRole("dialog").getByRole("img").evaluate(image => image.decode());
        await page.getByRole("button", { name: "View actual size" }).click();
        await page.getByRole("button", { name: "Close image preview" }).click();
      }
      const images = await page.locator("main img").evaluateAll(elements => elements.map(image => ({ src: image.currentSrc.replace(location.origin, ""), sizes: image.sizes, renderedWidth: Math.round(image.getBoundingClientRect().width), naturalWidth: image.naturalWidth, loading: image.loading })));
      const [js, css] = await Promise.all([page.coverage.stopJSCoverage(), page.coverage.stopCSSCoverage()]);
      results.push({ device, route, initial, exercisedCoverage: { js: summarize(js.map(jsRanges)), css: summarize(css) }, images });
      await context.close();
    }
  }
  const assets = [];
  for (const file of await fs.readdir("public/media")) {
    if (!/\.(webp|png|jpe?g|svg|avif)$/i.test(file)) continue;
    const bytes = await fs.readFile(path.join("public/media", file));
    const metadata = await sharp(bytes).metadata();
    assets.push({ file, bytes: bytes.length, width: metadata.width, height: metadata.height, format: metadata.format });
  }
  const bundles = [];
  for (const file of await fs.readdir(".next/static/chunks", { recursive: true })) {
    if (!/\.(js|css)$/.test(file)) continue;
    const bytes = await fs.readFile(path.join(".next/static/chunks", file));
    bundles.push({ file, bytes: bytes.length, gzipBytes: gzipSync(bytes).length });
  }
  await fs.mkdir(output, { recursive: true });
  await fs.writeFile(`${output}/resources.json`, JSON.stringify({ measuredAt: new Date().toISOString(), baseURL, method: "Unthrottled Chromium coverage, separate from timing runs. Unused means not exercised in these sessions, including other responsive states and framework code; it is not a deletion recommendation. Initial transfer excludes later scroll/preview assets. Image inventory includes retained unused sources. All-build bundle totals are not per-page downloads.", results, assets, bundles, errors }, null, 2));
  console.log(JSON.stringify({ pages: results.length, errors, coverage: results.map(({ device, route, exercisedCoverage }) => ({ device, route, jsBytes: exercisedCoverage.js.decodedBytes, unusedJsBytes: exercisedCoverage.js.unusedBytes, cssBytes: exercisedCoverage.css.decodedBytes, unusedCssBytes: exercisedCoverage.css.unusedBytes })) }, null, 2));
  if (errors.length) process.exitCode = 1;
} finally { await browser.close(); }
