import { test, expect } from "@playwright/test";

const selectedSlugs = ["rbim", "co-designs", "ahdis", "marci-metzger"];

test("project-first hero, project gallery, and primary interactions", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#home");
  await expect(page).toHaveTitle(/Kristy Kate Taylor/);
  await expect(page.locator("body")).toHaveCSS("font-family", /manrope/i);
  await expect(hero.getByRole("heading", { level: 1 })).toContainText("Have a project");
  await expect(hero.getByRole("heading", { level: 1 })).toContainText("in mind?");
  await expect(hero.locator("img")).toHaveCount(0);
  await expect(hero.getByText("PORTFOLIO · 2026")).toBeVisible();
  await expect(hero.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "/contact");

  await expect(page.locator("#work-title")).toHaveText("Projects");
  const gallery = page.getByRole("navigation", { name: "Projects gallery" });
  await expect(gallery).toBeVisible();
  for (const slug of selectedSlugs) {
    await expect(gallery.locator(`a[href="/projects/${slug}"]`).first()).toBeVisible();
  }

  await hero.getByRole("link", { name: "Explore my projects" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(300);

  await gallery.locator('a[href="/projects/rbim"]').first().click();
  await expect(page).toHaveURL(/\/projects\/rbim$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("RBIM");
});

test("no fabricated resume link and project status stays explicit", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /View Resume|Download Resume/ })).toHaveCount(0);

  await page.goto("/projects");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects.");
  const coDesigns = page.locator("article").filter({ has: page.locator('a[href="/projects/co-designs"]') }).first();
  await expect(coDesigns).toContainText("In development");
  await expect(page.getByText("LACOMUS", { exact: true })).toHaveCount(0);
});

for (const [width, height] of [[375,812],[390,844],[430,932],[768,1024],[1024,1366],[1366,768],[1440,900],[1536,864],[1920,1080]]) {
  test(`homepage composition at ${width} × ${height}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("#identity")).toBeVisible();
    const metrics = await page.locator("#identity").evaluate(el => ({ left: el.getBoundingClientRect().left, right: el.getBoundingClientRect().right, viewport: innerWidth, overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth }));
    expect(metrics.overflow).toBe(false);
    expect(metrics.left).toBeGreaterThanOrEqual(0);
    expect(metrics.right).toBeLessThanOrEqual(metrics.viewport);
    await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: width === 390 || width === 1440, animations: "disabled" });
  });
}

test("static content and navigation remain usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#identity")).toBeVisible();
  await expect(page.locator("#identity")).toContainText("in mind?");
  await page.getByRole("navigation", { name: "Projects gallery" }).locator('a[href="/projects/rbim"]').first().click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("RBIM");
  await context.close();
});


test("project stories are distinct, responsive, and navigable", async ({ page }) => {
  await page.goto("/projects");
  const stories = page.locator("main article");
  await expect(stories).toHaveCount(5);
  const sources = await stories.locator("img").evaluateAll(images =>
    images.map(img => new URL((img as HTMLImageElement).src).pathname)
  );
  expect(new Set(sources).size).toBe(5);
  await expect(stories.first().getByRole("heading", { name: "RBIM" })).toBeVisible();
  await expect(page.getByText("INTERFACE & DIGITAL DESIGN WORK", { exact: true })).toHaveCount(0);
  for (const slug of ["rbim", "co-designs", "ahdis", "marci-metzger", "erp-system"]) {
    await expect(stories.locator('a[href="/projects/' + slug + '"]').first()).toBeVisible();
  }
});


test("portfolio hero showcases development disciplines without a portrait or duplicate project image", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#home");
  await expect(hero.locator("img")).toHaveCount(0);
  await expect(hero.locator('img[src*="rbim-dashboard"]')).toHaveCount(0);
});


test("project details do not show Challenges & Learning", async ({ page }) => {
  for (const slug of ["rbim", "ahdis", "co-designs", "marci-metzger", "erp-system"]) {
    await page.goto("/projects/" + slug);
    await expect(page.getByRole("heading", { name: /Challenges|What I learned|Reflection/i })).toHaveCount(0);
    await expect(page.locator('a[href="#reflection"]')).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "What it does" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Project results" })).toBeVisible();
  }
});

test("directory screenshots stay modest at desktop widths", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/projects");
  const images = page.locator("main article a img");
  await expect(images).toHaveCount(5);
  for (const image of await images.all()) {
    const width = await image.evaluate(el => el.getBoundingClientRect().width);
    expect(width).toBeLessThanOrEqual(475);
  }
});


test("homepage evidence is specific, images load, and small screens do not overflow", async ({ page }) => {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({width, height:900});
    await page.goto("/");
    await expect(page.locator("#identity")).toContainText("in mind?");
    await expect(page.getByText(/An offline and online population registry for household records/)).toBeVisible();
    await expect(page.getByRole("navigation", {name:"Projects gallery"}).locator("article")).toHaveCount(4);
    const images = await page.locator("#work img").evaluateAll(async images => {
      await Promise.all(images.map(async image => {
        const img = image as HTMLImageElement;
        img.loading = "eager";
        await img.decode();
      }));
      return images.every(image => (image as HTMLImageElement).naturalWidth > 0);
    });
    expect(images).toBe(true);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  }
});


test("home project filmstrip offers distinct previews and usable controls", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#work");
  const gallery = page.getByRole("navigation", {name:"Projects gallery"});
  await expect(gallery.locator("article")).toHaveCount(4);
  await expect(section.getByText("PROJECT 01", {exact:false})).toBeVisible();
  await section.getByRole("button", {name:"Next project"}).click();
  await expect(section.getByText("PROJECT 02", {exact:false})).toBeVisible();
  await expect(section.getByRole("link", {name:"View project"})).toHaveAttribute("href","/projects/ahdis");
  await section.getByRole("button",{name:"Previous project"}).click();
  await expect(section.getByRole("link", {name:"View project"})).toHaveAttribute("href","/projects/rbim");
  const images = await gallery.locator("img").evaluateAll(items => items.map(img => (img as HTMLImageElement).src));
  expect(new Set(images).size).toBe(4);
});


test("hero avoids personal photo and oversized name while keeping navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const hero = page.locator("#home");
  await expect(hero.locator("img")).toHaveCount(0);
  await expect(hero.getByRole("heading", { level: 1 })).toContainText("Have a project");
  await expect(hero.getByRole("heading", { level: 1 })).not.toContainText("Kristy Kate");
  await expect(hero.getByRole("link", { name: "Explore my projects" })).toHaveAttribute("href", "#work");
  await expect(hero.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "/contact");
  await expect(page.getByRole("link", { name: /Kristy Kate/ }).first()).toHaveAttribute("href", "/");
});


test("loading intro is visible only as a temporary nonblocking visual transition", async ({ page }) => {
  await page.goto("/");
  const splash = page.locator("[data-intro-splash]");
  await expect(splash).toHaveAttribute("aria-hidden", "true");
  await expect(splash).toHaveCSS("pointer-events", "none");
  await expect(splash).toHaveCSS("visibility", "hidden", { timeout: 5000 });
  await expect(page.locator("#identity")).toBeVisible();
});

test("prefers-reduced-motion skips the intro animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-intro-splash]")).toHaveCSS("display", "none");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Have a project");
});


test("Onlines-inspired introduction uses a solo developer voice and genuine capabilities", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#home");
  await expect(hero.getByRole("heading", { level: 1 })).toContainText("Have a project");
  await expect(hero.getByRole("heading", { level: 1 })).toContainText("in mind?");
  await expect(hero.getByText("A NOTE FROM THE DEVELOPER")).toBeVisible();
  await expect(hero.getByText(/I design and develop websites, web applications, and offline desktop software/)).toBeVisible();
  await expect(hero.getByRole("complementary", { name: "What I develop" })).toContainText("Websites & web apps");
  await expect(hero.getByRole("complementary", { name: "What I develop" })).toContainText("Offline desktop software");
  await expect(hero.getByRole("complementary", { name: "What I develop" })).toContainText("Data systems & reporting");
  await expect(hero.locator("img")).toHaveCount(0);
  await expect(hero.getByRole("link", { name: "Explore my projects" })).toHaveAttribute("href", "#work");
  await expect(hero.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "/contact");
});

test("intro stays legible with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({width: 375, height: 812});
  await page.goto("/");
  await expect(page.locator("#home aside")).toHaveCSS("animation-name", "none");
  await expect(page.locator("#identity")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});


test("contact section has visual presence without breaking theme or access", async ({ page }, testInfo) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const contact = page.locator('section[aria-labelledby="contact-title"]');
    await expect(contact.getByRole("heading", { name: /Tell me\s+about it\./ })).toBeVisible();
    const action = contact.getByRole("link", { name: "Send a message" });
    await expect(action).toHaveAttribute("href", "/contact");
    await expect(contact.getByRole("link", { name: /trysinkaye@gmail.com/ })).toHaveAttribute("href", "mailto:trysinkaye@gmail.com");

    const metrics = await contact.evaluate(element => ({
      background: getComputedStyle(element).backgroundColor,
      bodyBackground: getComputedStyle(document.body).backgroundColor,
      height: element.getBoundingClientRect().height,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }));
    expect(metrics.background).toBe(metrics.bodyBackground);
    expect(metrics.height).toBeGreaterThan(300);
    expect(metrics.height).toBeLessThan(width < 600 ? 800 : 630);
    expect(metrics.overflow).toBe(false);
    await contact.screenshot({ path: testInfo.outputPath("contact-light-" + width + ".png"), animations: "disabled" });

    await page.getByRole("button", { name: "Use dark mode" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    const darkColors = await contact.evaluate(element => ({
      background: getComputedStyle(element).backgroundColor,
      bodyBackground: getComputedStyle(document.body).backgroundColor,
    }));
    expect(darkColors.background).toBe(darkColors.bodyBackground);
    await contact.screenshot({ path: testInfo.outputPath("contact-dark-" + width + ".png"), animations: "disabled" });
  }
});
