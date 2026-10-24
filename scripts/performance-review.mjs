import { chromium, devices } from "@playwright/test";
import fs from "node:fs/promises";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const device of ["desktop", "mobile"]) {
    for (let run = 1; run <= 3; run++) {
      const context = await browser.newContext(device === "mobile" ? { ...devices["iPhone 13"] } : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
      const page = await context.newPage();
      page.setDefaultTimeout(60_000);
      const session = await context.newCDPSession(page);
      await session.send("Network.enable");
      await session.send("Network.setCacheDisabled", { cacheDisabled: true });
      await session.send("Performance.enable");
      if (device === "mobile") {
        await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
        await session.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1_600_000 / 8, uploadThroughput: 750_000 / 8, connectionType: "cellular3g" });
      }
      await page.addInitScript(() => {
        const metrics = { lcp: 0, lcpElement: "", cls: 0, longTasks: [], interactions: [] };
        window.__portfolioMetrics = metrics;
        new PerformanceObserver(list => { for (const entry of list.getEntries()) { metrics.lcp = entry.startTime; metrics.lcpElement = entry.element?.outerHTML.slice(0, 220); } }).observe({ type: "largest-contentful-paint", buffered: true });
        let start = 0, previous = 0, score = 0;
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (entry.hadRecentInput) continue;
            if (entry.startTime - previous > 1000 || entry.startTime - start > 5000) { score = 0; start = entry.startTime; }
            score += entry.value;
            previous = entry.startTime;
            metrics.cls = Math.max(metrics.cls, score);
          }
        }).observe({ type: "layout-shift", buffered: true });
        new PerformanceObserver(list => { for (const entry of list.getEntries()) metrics.longTasks.push(entry.duration); }).observe({ type: "longtask", buffered: true });
        new PerformanceObserver(list => { for (const entry of list.getEntries()) if (entry.interactionId) metrics.interactions.push({ duration: entry.duration, name: entry.name, target: entry.target?.getAttribute("aria-label") || entry.target?.textContent?.slice(0, 60) }); }).observe({ type: "event", buffered: true, durationThreshold: 16 });
      });
      await page.goto(baseURL, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1200);
      const initial = await page.evaluate(() => {
        const resources = performance.getEntriesByType("resource");
        const sum = filter => resources.filter(filter).reduce((total, entry) => total + entry.encodedBodySize, 0);
        return {
          lcpMs: Math.round(window.__portfolioMetrics.lcp),
          lcpElement: window.__portfolioMetrics.lcpElement,
          fcpMs: Math.round(performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0),
          cls: window.__portfolioMetrics.cls,
          initialJsBytes: sum(entry => entry.initiatorType === "script"),
          initialFontBytes: sum(entry => /\.woff2/.test(entry.name)),
          initialImageBytes: sum(entry => entry.initiatorType === "img" || entry.name.includes("/_next/image")),
          initialCssBytes: sum(entry => /\.css(?:\?|$)/.test(entry.name)),
          initialBlockingMs: Math.round(window.__portfolioMetrics.longTasks.reduce((total, duration) => total + Math.max(0, duration - 50), 0)),
        };
      });
      const { metrics: timings } = await session.send("Performance.getMetrics");
      const timing = name => Math.round((timings.find(item => item.name === name)?.value ?? 0) * 1000);
      Object.assign(initial, { mainThreadMs: timing("TaskDuration"), scriptMs: timing("ScriptDuration"), layoutMs: timing("LayoutDuration"), styleMs: timing("RecalcStyleDuration") });
      if (device === "mobile") await page.getByRole("button", { name: "Open navigation", exact: true }).click();
      await page.getByRole("button", { name: "Use light mode" }).click();
      await page.getByRole("button", { name: "Use dark mode" }).click();
      if (device === "mobile") await page.getByRole("button", { name: "Close navigation", exact: true }).click();
      // Homepage has project links, not an image-inspector dialog. Record homepage
      // interactions before navigating, because navigation resets PerformanceObserver state.
      const homeInteraction = await page.evaluate(() => ({
        interactions: window.__portfolioMetrics.interactions.map(entry => ({ ...entry, page: "home" })),
        clsAfterInteractions: window.__portfolioMetrics.cls,
      }));
      await page.goto(new URL("/projects/rbim", baseURL).href, { waitUntil: "networkidle" });
      const inspector = page.locator('main figure[data-spotlight] a[aria-haspopup="dialog"]').first();
      await inspector.click({ timeout: 15_000 });
      await page.getByRole("button", { name: "View actual size" }).click();
      await page.getByRole("button", { name: "Close image preview" }).click();
      await page.waitForTimeout(300);
      const caseStudyInteraction = await page.evaluate(() => ({
        interactions: window.__portfolioMetrics.interactions.map(entry => ({ ...entry, page: "rbim-case-study" })),
        clsAfterInteractions: window.__portfolioMetrics.cls,
      }));
      const allInteractions = [...homeInteraction.interactions, ...caseStudyInteraction.interactions];
      results.push({
        device, run, ...initial,
        sampledInteractionMs: Math.max(0, ...allInteractions.map(entry => entry.duration)),
        interactions: allInteractions,
        clsAfterInteractions: homeInteraction.clsAfterInteractions,
        caseStudyClsAfterInteractions: caseStudyInteraction.clsAfterInteractions,
      });
      await context.close();
    }
  }
  await fs.mkdir(".artifacts/review", { recursive: true });
  const report = { measuredAt: new Date().toISOString(), baseURL, method: "Three cold-browser runs per viewport. Desktop 1440x900, DPR 1, unthrottled; mobile iPhone 13, 390x844, DPR 3, touch, 4x CPU, 1.6 Mbps down, 150ms latency. Local production server, no production analytics. Long-task blocking sums duration over 50ms through initial idle (not Lighthouse TBT). CDP main-thread durations cover the same interval. Interaction figures combine homepage menu/theme actions and RBIM case-study image-inspector actions, labeled by page; layout shift after interactions is reported separately for home and case study. Values below the 16ms observation threshold are omitted. These are lab samples, not field INP.", results };
  await fs.writeFile(".artifacts/review/performance.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
