import { test, expect } from "@playwright/test";

test("the desktop project reel advances horizontally with normal vertical scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const work=page.locator("#work");
  const gallery=page.getByRole("navigation",{name:"Projects gallery"});
  await work.evaluate(element=>{
    const top=element.getBoundingClientRect().top+scrollY;
    scrollTo({top,behavior:"instant"});
  });
  await expect.poll(()=>gallery.evaluate(element=>element.scrollLeft)).toBeLessThan(100);
  await work.evaluate(element=>{
    const top=element.getBoundingClientRect().top+scrollY;
    const travel=Math.max(0,element.clientHeight-innerHeight);
    scrollTo({top:top+travel*.82,behavior:"instant"});
  });
  await expect.poll(()=>gallery.evaluate(element=>element.scrollLeft),{timeout:6000}).toBeGreaterThan(200);
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
