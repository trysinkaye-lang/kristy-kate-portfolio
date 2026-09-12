import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("currency requests wait for selection, run once, and preserve base prices on failure", async ({ page }) => {
  let requests = 0;
  await page.route("**/api/exchange-rates", route => {
    requests++;
    return route.fulfill({ status: 503, json: { base: "PHP", date: null, rates: {} } });
  });
  await page.goto("/packages");
  await expect(page.getByRole("button", { name: "Use dark mode" })).toBeEnabled();
  expect(requests).toBe(0);
  await page.getByLabel("View prices in").selectOption("USD");
  await expect(page.getByText("Live conversion unavailable; base PHP prices remain valid.")).toBeVisible();
  await expect(page.getByText("₱15,000 PHP", { exact: true })).toBeVisible();
  await page.getByLabel("View prices in").selectOption("EUR");
  await expect(page.getByText("₱15,000 PHP", { exact: true })).toBeVisible();
  expect(requests).toBe(1);
});

test("image inspection supports keyboard, actual-size viewing, and return focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.locator('#work-rbim a[aria-haspopup="dialog"]');
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "RBIM interface screenshot" });
  await expect(dialog).toBeVisible();
  const close = dialog.getByRole("button", { name: "Close image preview" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: "Open original" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await dialog.getByRole("button", { name: "View actual size" }).click();
  await expect(dialog.getByRole("button", { name: "Fit to screen" })).toHaveAttribute("aria-pressed", "true");
  await expect(dialog.getByRole("img")).toHaveCSS("width", "640px");
  const imageRegion = dialog.getByRole("region");
  await imageRegion.focus();
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => imageRegion.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(accessibility.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("Drift Wall links to every selected case study and stays static without motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const wall = page.getByRole("navigation", { name: "Selected projects gallery" });
  await expect(wall).toBeVisible();
  for (const href of ["/projects/rbim", "/projects/co-designs", "/projects/ahdis", "/projects/marci-metzger"]) {
    await expect(wall.locator(`a[href="${href}"]`).first()).toBeVisible();
  }
  const animationName = await page.locator("[data-drift-column]").first().evaluate(element => getComputedStyle(element).animationName);
  expect(animationName).toBe("none");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("mobile work index gives each project a readable preview", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/projects");
  for (const image of await page.locator("main article img").all()) {
    const box = await image.boundingBox();
    expect(box!.width).toBeGreaterThan(300);
  }
});

test("package selection reaches the contact subject and unknown values are ignored", async ({ page }) => {
  await page.route("**/api/exchange-rates", route => route.fulfill({ json: { base: "PHP", date: "2026-09-12", rates: { USD: 0.0175 } } }));
  await page.goto("/packages");
  await page.getByLabel("View prices in").selectOption("USD");
  await page.getByRole("link", { name: "Discuss Professional" }).click();
  await expect(page.getByLabel("What’s it about?")).toHaveValue("Professional website package · USD");
  await page.goto("/contact?package=unknown&currency=untrusted");
  await expect(page.getByLabel("What’s it about?")).toBeEmpty();
});

for (const route of ["/", "/projects", "/about", "/contact", "/packages", "/projects/rbim", "/projects/co-designs"]) {
  test(`accessible light and dark presentation: ${route}`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.route("**/api/exchange-rates", route => route.fulfill({ json: { base: "PHP", rates: {} } }));
    await page.goto(route);
    await page.getByRole("button", { name: "Use dark mode" }).waitFor();
    for (const theme of ["light", "dark"]) {
      if (theme === "dark") await page.getByRole("button", { name: "Use dark mode" }).click();
      const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(result.violations, `${route}, ${theme}: ${JSON.stringify(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })))}`).toEqual([]);
    }
  });
}
