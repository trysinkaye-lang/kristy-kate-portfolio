import { test, expect } from "@playwright/test";

test("desktop work section uses the restored expandable four-card gallery", async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  const work=page.locator("#work");
  const gallery=page.getByRole("navigation",{name:"Projects gallery"});
  await expect(gallery.locator("article")).toHaveCount(4);
  const height=await work.evaluate(el=>el.getBoundingClientRect().height);
  expect(height).toBeLessThan(2200);
  const widths=await gallery.locator("article").evaluateAll(items=>items.map(el=>el.getBoundingClientRect().width));
  expect(widths[0]).toBeGreaterThan(widths[1]*1.7);
  await page.getByRole("button",{name:"Next project"}).click();
  await expect(page.getByRole("button",{name:"Show AHDIS"})).toHaveAttribute("aria-pressed","true");
  await expect.poll(async()=>gallery.locator("article").nth(1).evaluate(el=>el.getBoundingClientRect().width))
    .toBeGreaterThan(widths[1]*1.4);
});

test("small system screenshots stay within their original image resolution", async ({ page }) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  const cards=page.getByRole("navigation",{name:"Projects gallery"});
  for(const slug of ["rbim","ahdis"]) {
    const image=cards.locator('article[data-project-slug="'+slug+'"] img');
    const dimensions=await image.evaluate((element)=>{
      const img=element as HTMLImageElement;
      return {rendered:img.getBoundingClientRect().width,native:img.naturalWidth};
    });
    expect(dimensions.rendered).toBeLessThanOrEqual(dimensions.native+1);
  }
});

test("particle contact rectangle measures the actual email container", async ({ page }) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  const frame=page.locator("[data-particle-frame-target]");
  await frame.scrollIntoViewIfNeeded();
  const largeEmail=frame.locator('a[href="mailto:trysinkaye@gmail.com"]').first();
  await expect(largeEmail).toBeVisible();
  const frameBox=await frame.boundingBox();
  const emailBox=await largeEmail.boundingBox();
  expect(frameBox).toBeTruthy();
  expect(emailBox).toBeTruthy();
  expect(emailBox!.x).toBeGreaterThan(frameBox!.x);
  expect(emailBox!.x+emailBox!.width).toBeLessThan(frameBox!.x+frameBox!.width);
  expect(emailBox!.y).toBeGreaterThan(frameBox!.y);
  expect(emailBox!.y+emailBox!.height).toBeLessThan(frameBox!.y+frameBox!.height);
});
