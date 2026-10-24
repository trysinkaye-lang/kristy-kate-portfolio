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
  expect(await gallery.locator("article").evaluateAll(items=>items.map(el=>(el as HTMLElement).dataset.projectSlug))).toEqual(["rbim","ahdis","co-designs","marci-metzger"]);
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
  await page.getByRole("button",{name:"Show C.O. Designs"}).click();
  await expect(page.getByRole("button",{name:"Show C.O. Designs"})).toHaveAttribute("aria-pressed","true");
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

test("faceless rotating portrait and restored expanding four-card gallery", async ({page}) => {
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
  expect(sizes.cards).toHaveLength(4);
  expect(sizes.cards[0]).toBeGreaterThan(sizes.cards[1]*1.7);
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

test("four-card previews and supporting notes remain readable without sticky clipping",async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  const work=page.locator("#work"), gallery=page.getByRole("navigation",{name:"Projects gallery"});
  await work.scrollIntoViewIfNeeded();
  const bounds=await work.boundingBox();
  expect(bounds).toBeTruthy();
  const cards=gallery.locator("article");
  await expect(cards).toHaveCount(4);
  for(const card of await cards.all()){
    const frame=card.locator('[class*="imageContainer"]');
    const img=frame.locator("img");
    const [outer,inner]=await Promise.all([frame.boundingBox(),img.boundingBox()]);
    expect(outer&&inner).toBeTruthy();
    expect(inner!.x).toBeGreaterThanOrEqual(outer!.x-2);
    expect(inner!.x+inner!.width).toBeLessThanOrEqual(outer!.x+outer!.width+2);
    expect(inner!.y).toBeGreaterThanOrEqual(outer!.y-2);
    expect(inner!.y+inner!.height).toBeLessThanOrEqual(outer!.y+outer!.height+2);
  }
  await gallery.locator('article[data-project-slug="co-designs"]').hover();
  await expect(page.getByRole("button",{name:"Show C.O. Designs"})).toHaveAttribute("aria-pressed","true");
  await expect(work.getByRole("link",{name:"View project"})).toHaveAttribute("href","/projects/co-designs");
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



test("restored gallery expands hovered and keyboard-selected projects with reduced motion support",async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  const gallery=page.getByRole("navigation",{name:"Projects gallery"});
  const rbim=gallery.locator('article[data-project-slug="rbim"]');
  const ahdis=gallery.locator('article[data-project-slug="ahdis"]');
  const before=await rbim.evaluate(el=>el.getBoundingClientRect().width);
  await ahdis.hover();
  await expect(page.getByRole("button",{name:"Show AHDIS"})).toHaveAttribute("aria-pressed","true");
  await expect.poll(()=>ahdis.evaluate(el=>el.getBoundingClientRect().width)).toBeGreaterThan(before*.8);
  await gallery.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button",{name:"Show C.O. Designs"})).toHaveAttribute("aria-pressed","true");
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect(ahdis).toHaveCSS("transition-duration","0s");
  await expect(gallery.locator("article")).toHaveCount(4);
});

