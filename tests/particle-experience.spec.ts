import { test, expect } from "@playwright/test";

test("portrait uses the segmented source, map reveal follows formation, and scrolling reverses", async ({ page }) => {
  await page.goto("/");
  const canvas = page.locator("[data-particle-field]");
  await expect(canvas).toHaveAttribute("data-renderer", "webgl");
  await expect(canvas).toHaveAttribute("data-portrait-source", "kristy-kate-professional-portrait-v2.webp");
  expect(Number(await canvas.getAttribute("data-portrait-samples"))).toBeGreaterThan(40000);
  const sphere = page.locator('[data-particle-scene="sphere"]');
  const location = page.locator('[data-particle-scene="philippines"]');
  const center = async (selector: string) => page.locator(selector).evaluate(el => scrollTo({top:el.getBoundingClientRect().top+scrollY+el.clientHeight/2-innerHeight/2,behavior:"instant"}));
  await center('[data-particle-scene="sphere"]');
  await expect.poll(async () => Number(await canvas.getAttribute("data-morph"))).toBeCloseTo(2, 3);
  const orbit = await page.locator("[data-sphere-type]").boundingBox();
  const radius = Number(await canvas.getAttribute("data-sphere-radius"));
  expect(orbit!.width).toBeCloseTo(orbit!.height, 0);
  expect(orbit!.width).toBeCloseTo(2*(radius+36), 0);
  const projection=await canvas.evaluate(el=>{
    const c=el as HTMLCanvasElement;return {x:c.width/c.clientWidth,y:c.height/c.clientHeight};
  });
  expect(projection.x).toBeCloseTo(projection.y,2);
  const start = await sphere.evaluate(el => el.getBoundingClientRect().top+scrollY+el.clientHeight/2-innerHeight/2);
  const end = await location.evaluate(el => el.getBoundingClientRect().top+scrollY+el.clientHeight/2-innerHeight/2);
  await page.evaluate(y => scrollTo({top:y,behavior:"instant"}), start+(end-start)*.5);
  await expect(page.locator("[data-location-copy]")).toHaveCSS("opacity","0");
  await center('[data-particle-scene="philippines"]');
  await expect.poll(async () => Number(await canvas.getAttribute("data-morph"))).toBeCloseTo(3, 3);
  await expect(page.locator("[data-location-copy]")).toHaveCSS("opacity","1");
  await center('[data-particle-scene="sphere"]');
  await expect.poll(async () => Number(await canvas.getAttribute("data-morph"))).toBeCloseTo(2, 3);
  await center('[data-particle-scene="portrait"]');
  await expect(canvas).toHaveAttribute("data-active-shape","portrait");
});

test("software reel order, keyboard controls, and single centered contact address", async ({page}) => {
  await page.goto("/");
  const gallery=page.getByRole("navigation",{name:"Projects gallery"});
  expect(await gallery.locator("article").evaluateAll(items=>items.map(el=>(el as HTMLElement).dataset.projectSlug))).toEqual(["rbim","ahdis","erp-system","co-designs","marci-metzger"]);
  await gallery.focus();await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button",{name:"Show AHDIS"})).toHaveAttribute("aria-pressed","true");
  const frame=page.locator("[data-particle-frame-target]");
  const email=frame.getByRole("link",{name:"trysinkaye@gmail.com",exact:true});
  await expect(email).toHaveCount(1);
  await frame.scrollIntoViewIfNeeded();
  const a=await frame.boundingBox(),b=await email.boundingBox();
  expect(Math.abs(a!.x+a!.width/2-b!.x-b!.width/2)).toBeLessThan(2);
  expect(Math.abs(a!.y+a!.height/2-b!.y-b!.height/2)).toBeLessThan(2);
});

test("changing reduced motion at runtime stops particle rotation and preserves content",async({page})=>{
  await page.goto("/");
  const canvas=page.locator("[data-particle-field]");
  await expect(canvas).toHaveAttribute("data-renderer","webgl");
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect(page.locator("[data-intro-splash]")).toHaveCSS("display","none");
  await page.locator('[data-particle-scene="philippines"]').scrollIntoViewIfNeeded();
  await expect(page.locator("[data-location-copy]")).toHaveCSS("opacity","1");
  await page.getByRole("button",{name:"Show ERP System"}).click();
  await expect(page.getByRole("button",{name:"Show ERP System"})).toHaveAttribute("aria-pressed","true");
});

test("unavailable WebGL assets leave semantic content and project links usable",async({page})=>{
  await page.route("**/media/philippines.geo.json",route=>route.abort());
  await page.goto("/");
  await expect(page.locator("[data-particle-field]")).toHaveAttribute("data-renderer","unavailable");
  await expect(page.locator("#identity")).toBeVisible();
  await expect(page.locator("[data-location-copy]")).toHaveCSS("opacity","1");
  await page.getByRole("link",{name:"Explore RBIM",exact:true}).click();
  await expect(page.getByRole("heading",{level:1})).toHaveText("RBIM");
});
