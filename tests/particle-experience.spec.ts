import { test, expect } from "@playwright/test";

test("portrait uses the segmented source, map reveal follows formation, and scrolling reverses", async ({ page }) => {
  await page.goto("/");
  const canvas = page.locator("[data-particle-field]");
  await expect(canvas).toHaveAttribute("data-renderer", "webgl");
  await expect(canvas).toHaveAttribute("data-portrait-source", "kristy-kate-professional-portrait-v2.webp");
  expect(Number(await canvas.getAttribute("data-portrait-samples"))).toBeGreaterThan(40000);
  const sphere = page.locator('[data-particle-scene="sphere"]');
  const globeMap = page.locator('[data-particle-scene="spherePhilippines"]');
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
  await center('[data-particle-scene="spherePhilippines"]');
  await expect.poll(async () => Number(await canvas.getAttribute("data-morph"))).toBeCloseTo(3, 3);
  await expect(globeMap).toBeVisible();
  const end = await location.evaluate(el => el.getBoundingClientRect().top+scrollY+el.clientHeight/2-innerHeight/2);
  await page.evaluate(y => scrollTo({top:y,behavior:"instant"}), start+(end-start)*.5);
  await expect(page.locator("[data-location-copy]")).toHaveCSS("opacity","0");
  await center('[data-particle-scene="philippines"]');
  await expect.poll(async () => Number(await canvas.getAttribute("data-morph"))).toBeCloseTo(4, 3);
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

test("faceless rotating portrait and single-project carousel", async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  const field = page.locator("[data-particle-field]");
  await expect(field).toHaveAttribute("data-renderer","webgl");
  await expect(page.locator('[data-particle-scene="strata"],[data-particle-scene="torus"],[data-particle-scene="orb"]')).toHaveCount(0);
  await page.locator('[data-particle-scene="portraitRight"]').evaluate(el =>
    scrollTo({top:el.getBoundingClientRect().top+scrollY+el.clientHeight/2-innerHeight/2,behavior:"instant"}));
  await expect.poll(async()=>Number(await field.getAttribute("data-morph"))).toBeCloseTo(1,2);
  const intro = page.locator('[data-particle-scene="portraitRight"]');
  await intro.evaluate(el => scrollTo({
    top:el.getBoundingClientRect().top+scrollY+el.clientHeight*.58-innerHeight/2,behavior:"instant"
  }));
  await expect.poll(async()=>Number(await field.getAttribute("data-turn-progress"))).toBeGreaterThan(.3);
  await expect.poll(async()=>Number(await field.getAttribute("data-portrait-yaw"))).toBeGreaterThan(.3);
  const gallery=page.getByRole("navigation",{name:"Projects gallery"});
  const sizes=await gallery.evaluate(el=>({width:el.clientWidth,cards:Array.from(el.querySelectorAll("article")).map(item=>item.getBoundingClientRect().width)}));
  expect(sizes.cards).toHaveLength(5);
  expect(sizes.cards[0]).toBeGreaterThanOrEqual(sizes.width-2);
  await page.getByRole("button",{name:"Next project"}).click();
  await expect(page.getByRole("button",{name:"Show AHDIS"})).toHaveAttribute("aria-pressed","true");
});

test("homepage has no navigation bar or obsolete globe caption", async ({page}) => {
  await page.goto("/");
  await expect(page.locator("header")).toHaveCount(0);
  await expect(page.getByText("SOFTWARE DEVELOPMENT WITHOUT BORDERS")).toHaveCount(0);
  await expect(page.getByRole("link",{name:"Explore my work"})).toHaveAttribute("href","#work");
  await page.goto("/projects");
  await expect(page.getByRole("navigation",{name:"Main navigation"})).toBeVisible();
});

test("desktop carousel keeps image, caption and description in pinned viewport", async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  await page.locator("#work").evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY,behavior:"instant"}));
  const shell=page.locator("#work .shell"), reel=page.getByRole("navigation",{name:"Projects gallery"});
  for (let n=0;n<2;n++){
    if (n) await page.getByRole("button",{name:"Next project"}).click();
    const item=reel.locator("article").nth(n);
    const stage=item.locator('[class*="imageContainer"]');
    const [bounds,visual,title,note,image] = await Promise.all([
      shell.boundingBox(),stage.boundingBox(),
      page.locator("#work h3").boundingBox(),
      page.locator("#work [class*='projectNote']").boundingBox(),item.locator("img").boundingBox()
    ]);
    expect(bounds&&visual&&title&&note&&image).toBeTruthy();
    // Full screenshot fits the preview both vertically and horizontally.
    expect(image!.x).toBeGreaterThanOrEqual(visual!.x-2);
    expect(image!.x+image!.width).toBeLessThanOrEqual(visual!.x+visual!.width+2);
    expect(image!.y).toBeGreaterThanOrEqual(visual!.y-2);
    expect(image!.y+image!.height).toBeLessThanOrEqual(visual!.y+visual!.height+2);
    expect(title!.y+title!.height).toBeLessThan(bounds!.y+bounds!.height-4);
    expect(note!.y+note!.height).toBeLessThan(bounds!.y+bounds!.height-4);
  }
});

test("sphere highlights Philippines then zooms slowly to readable location",async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  const orbit=page.locator("[data-sphere-type]");
  await expect(orbit).toHaveAttribute("aria-label","Available remotely. Development has no boundaries.");
  await expect(orbit.getByText("Development has no boundaries")).toHaveCount(1);
  const field=page.locator("[data-particle-field]");
  const globe=page.locator('[data-particle-scene="spherePhilippines"]');
  const map=page.locator('[data-particle-scene="philippines"]');
  expect(await globe.evaluate(el=>el.getBoundingClientRect().height)).toBeGreaterThan(1000);
  expect(await map.evaluate(el=>el.getBoundingClientRect().height)).toBeGreaterThan(1500);
  await globe.evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY+el.clientHeight/2-innerHeight/2,behavior:"instant"}));
  await expect.poll(async()=>Number(await field.getAttribute("data-morph"))).toBeCloseTo(3,2);
  await expect(page.locator("[data-location-copy]")).toHaveCSS("opacity","0");
  await map.evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY+el.clientHeight/2-innerHeight/2,behavior:"instant"}));
  await expect.poll(async()=>Number(await field.getAttribute("data-morph"))).toBeCloseTo(4,2);
  await expect(page.locator("[data-location-copy]")).toHaveCSS("opacity","1");
  await expect(page.getByText("Based in the Philippines")).toBeVisible();
});

test("cursor glow reacts gently to pointer and disables with reduced motion",async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  const canvas = page.locator("[data-particle-field]");
  await expect(canvas).toHaveAttribute("data-renderer","webgl");
  const glow = page.locator("[data-particle-cursor]");
  await expect(glow).toHaveCSS("opacity","0");
  await page.mouse.move(710,445);
  await expect.poll(async()=>Number(await canvas.getAttribute("data-cursor-influence"))).toBeGreaterThan(.9);
  await expect(glow).toHaveCSS("opacity","1");
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect(glow).toHaveCSS("opacity","0");
  await expect(canvas).toHaveAttribute("data-renderer","webgl");
});



test("selected work animates on arrival and reacts gently to cursor motion",async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  const section=page.locator("#work");
  await section.evaluate(el=>{
    const top=el.getBoundingClientRect().top+scrollY;
    scrollTo({top:top+innerHeight*.3,behavior:"instant"});
  });
  await expect(section).toHaveAttribute("data-motion-ready","true");
  const gallery=page.getByRole("navigation",{name:"Projects gallery"});
  const first=gallery.locator('article[data-project-slug="rbim"]');
  const preview=first.locator('[class*="imageContainer"]');
  await expect.poll(async()=>preview.evaluate(el=>getComputedStyle(el).animationName)).toContain("projectImageEnter");
  const box=await preview.boundingBox();
  expect(box).toBeTruthy();
  await page.mouse.move(box!.x+box!.width*.64,box!.y+box!.height*.42);
  await expect.poll(async()=>preview.evaluate(el=>el.style.getPropertyValue("--tilt-y"))).not.toBe("");
  await page.getByRole("button",{name:"Next project"}).click();
  await expect(page.getByRole("button",{name:"Show AHDIS"})).toHaveAttribute("aria-pressed","true");
  await expect(page.locator("#work h3")).toHaveText("AHDIS");
  await page.emulateMedia({reducedMotion:"reduce"});
  const ahdis=gallery.locator('article[data-project-slug="ahdis"] [class*="imageContainer"]');
  await expect(ahdis).toHaveCSS("animation-name","none");
  await expect(page.locator("#work h3")).toHaveText("AHDIS");
});
