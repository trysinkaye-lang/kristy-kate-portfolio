import * as THREE from "three";
import { clamp, mix, projectPhilippines, segmentPortrait, smooth, spherePoint, type PortraitSample } from "./particle-geometry";
const TAU = Math.PI * 2;
// Relative depth proportions estimated from the supplied front/left/back/right reference.
// These silhouette ratios calibrate the volumetric relief; they do not pretend to be
// a photogrammetric reconstruction of a real scanned head.
const FOUR_VIEW_DEPTH_RATIO = [
  .62, .90, 1.18, 1.17, 1.14, 1.07, 1.06, 1.06,
  1.06, 1.03, 1.04, 1.10, 1.13, 1.10, 1.08, 1.06,
  1.06, .98, .70, .66, .63, .70, .78, .81,
  .85, .88, .91, .94, .98, 1, 1, 1,
];
const shapes = ["portrait", "portraitRight", "sphere", "spherePhilippines", "philippines", "ribbon", "work", "ambientAbout", "ambientServices", "frame"] as const;
type Shape = typeof shapes[number];
type Cloud = { positions: Float32Array; tones: Float32Array };

async function loadPortrait(signal: AbortSignal) {
  const response = await fetch("/media/kristy-kate-professional-portrait-v2.webp", { signal });
  if (!response.ok) throw new Error("Portrait unavailable");
  const bitmap = await createImageBitmap(await response.blob());
  const canvas = document.createElement("canvas"); canvas.width = 384; canvas.height = 384;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(bitmap, 0, 0, 384, 384); bitmap.close();
  return segmentPortrait(ctx.getImageData(0, 0, 384, 384).data, 384, 384);
}
async function loadMap(signal: AbortSignal) {
  const response = await fetch("/media/philippines.geo.json", { signal });
  if (!response.ok) throw new Error("Map unavailable");
  const data = await response.json(), rings = projectPhilippines(data.coordinates);
  const canvas = document.createElement("canvas"); canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.beginPath();
  for (const ring of rings) {
    ring.forEach(([x, y], i) => { if (!i) ctx.moveTo(256 + x * 490, 256 + y * 490); else ctx.lineTo(256 + x * 490, 256 + y * 490); });
    ctx.closePath();
  }
  ctx.fill("evenodd");
  const pixels = ctx.getImageData(0, 0, 512, 512).data, samples: number[][] = [];
  for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) {
    if (pixels[(y * 512 + x) * 4 + 3] > 100) samples.push([(x - 256) / 490, (y - 256) / 490]);
  }
  return { samples, edges: rings.flat() };
}
function cloudsFor(w: number, h: number, count: number, portrait: PortraitSample[], map: Awaited<ReturnType<typeof loadMap>>) {
  const clouds = {} as Record<Shape, Cloud>;
  for (const shape of shapes) clouds[shape] = { positions: new Float32Array(count * 3), tones: new Float32Array(count) };
  const mobile = w < 768;
  // Keep the actual photo-derived silhouette center-stage without clipping it on shorter screens.
  const portraitSize = Math.min(w * (mobile ? 1.12 : w < 1200 ? .62 : .70), h * (mobile ? .83 : .94), 940);
  const radius = Math.min(w * .295, h * .37, 340);
  const mapSize = Math.min(h * .89, w * (mobile ? 1.22 : .82), 840);
  let seed = 42717;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  for (let i = 0; i < count; i++) {
    const set = (shape: Shape, x: number, y: number, z: number, tone = .7) => {
      clouds[shape].positions.set([x, y, z], i * 3); clouds[shape].tones[i] = tone;
    };
    const p = portrait[Math.floor(random() * portrait.length)];
    // Front/back shell samples are paired from the actual portrait silhouette.
    // It rotates in 3D without inventing eyes, mouth or nose.
    const profileBand = Math.min(FOUR_VIEW_DEPTH_RATIO.length - 1,
      Math.max(0, Math.floor((p.y + .5) * FOUR_VIEW_DEPTH_RATIO.length)));
    const shellZ = p.depth * portraitSize * FOUR_VIEW_DEPTH_RATIO[profileBand] *
      (i % 2 === 0 ? 1 : -.95);
    set("portrait", w * .5 + p.x * portraitSize, h * (mobile ? .43 : .49) + p.y * portraitSize, shellZ, .68);
    const introScale = mobile ? .76 : .86;
    set("portraitRight", w * (mobile ? .60 : .72) + p.x * portraitSize * introScale, h * (mobile ? .34 : .49) + p.y * portraitSize * introScale, shellZ * introScale, .68);
    const [sx, sy, sz] = spherePoint(i, count, radius);
    set("sphere", w / 2 + sx, h / 2 + sy, sz);
    const pmap = i % 4 === 0 ? map.edges[Math.floor(random() * map.edges.length)] : map.samples[Math.floor(random() * map.samples.length)];
    // Reveal the real archipelago in brighter particles ON the surface of a globe.
    // Remaining particles retain its circular wireframe before the camera moves closer.
    if (i % 3 === 0) {
      set("spherePhilippines", w / 2 + sx, h / 2 + sy, sz, .25);
    } else {
      const gx = pmap[0] * radius * 1.46, gy = pmap[1] * radius * 1.46;
      const frontZ = Math.sqrt(Math.max(0, radius * radius - gx * gx - gy * gy));
      set("spherePhilippines", w / 2 + gx, h / 2 + gy, frontZ + 5, 1);
    }
    // Geographic point correspondences flow outward from the globe into a zoomed map.
    set("philippines", w * (mobile ? .5 : .43) + pmap[0] * mapSize, h * .48 + pmap[1] * mapSize, (random() - .5) * 6, .9);
    const u = i / count * 2 - 1, a = random() * TAU;
    set("ribbon", w * .5 + u * w * .65, h * .5 + Math.sin(u * 4) * h * .14 + Math.cos(a) * h * .045, Math.sin(a) * 50, .32);
    set("work", w * random(), h * random(), (random() - .5) * 60, .025);
    // The information sections use unobtrusive dust, not a torus or giant orb.
    set("ambientAbout", w * (.35 + random() * .65), h * (.10 + random() * .80), (random() - .5) * 60, .035);
    set("ambientServices", w * random(), h * (.20 + random() * .65), (random() - .5) * 60, .025);
    const edge = i % 4, t = random(), fw = Math.min(w * .86, 1040), fh = Math.min(h * .48, 400);
    set("frame", w / 2 + (edge === 0 ? -fw / 2 : edge === 1 ? fw / 2 : (t - .5) * fw) + (random() - .5) * 10,
      h / 2 + (edge === 2 ? -fh / 2 : edge === 3 ? fh / 2 : (t - .5) * fh) + (random() - .5) * 10, (random() - .5) * 12);
  }
  return { clouds, radius };
}
export async function mountParticleScene(canvas: HTMLCanvasElement, signal: AbortSignal) {
  const [portrait, map] = await Promise.all([loadPortrait(signal), loadMap(signal)]);
  if (signal.aborted) return () => {};
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const count = innerWidth < 768 ? 11000 : 26000;
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" }); }
  catch { canvas.dataset.renderer = "unavailable"; return () => {}; }
  renderer.setClearColor(0x000000, 0);
  canvas.dataset.renderer = "webgl";
  canvas.dataset.portraitSource = "kristy-kate-professional-portrait-v2.webp";
  canvas.dataset.portraitSamples = String(portrait.length);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, innerWidth, 0, innerHeight, -2000, 2000);
  camera.position.z = 1000;
  const positions = new Float32Array(count * 3), tones = new Float32Array(count);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute("tone", new THREE.BufferAttribute(tones, 1).setUsage(THREE.DynamicDrawUsage));
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { pixelRatio: { value: 1 } },
    vertexShader: `attribute float tone; varying float vTone; uniform float pixelRatio;
      void main(){vTone=tone;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=1.8*pixelRatio;}`,
    fragmentShader: `varying float vTone; void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;
      gl_FragColor=vec4(vec3(1.,1.,1.),vTone*smoothstep(.5,.15,d));}`,
  });
  const points = new THREE.Points(geometry, material); points.frustumCulled = false; scene.add(points);
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-particle-scene]"));
  const orbit = document.querySelector<SVGElement>("[data-sphere-type]");
  const location = document.querySelector<HTMLElement>("[data-location-copy]");
  const frameTarget = document.querySelector<HTMLElement>("[data-particle-frame-target]");
  let width = innerWidth, height = innerHeight, radius = 1;
  let clouds: Record<Shape, Cloud>, centers: number[] = [], target = 0, current = 0, phase = 0, segment = 0, turnProgress = 0;
  let raf = 0, time = 0, last = 0, dead = false, lost = false;
  const measure = () => {
    // CSS pixels, excluding the reserved scrollbar gutter. Using innerWidth here
    // squeezes the projection into an ellipse when the canvas is narrower.
    width = canvas.clientWidth; height = canvas.clientHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); renderer.setSize(width, height, false);
    material.uniforms.pixelRatio.value = renderer.getPixelRatio();
    camera.right = width; camera.bottom = height; camera.updateProjectionMatrix();
    ({ clouds, radius } = cloudsFor(width, height, count, portrait, map));
    centers = sections.map(el => el.getBoundingClientRect().top + scrollY + el.offsetHeight / 2);
    orbit?.style.setProperty("width", `${(radius + 36) * 2}px`);
    orbit?.style.setProperty("height", `${(radius + 36) * 2}px`);
    scroll();
  };
  const scroll = () => {
    const mid = scrollY + height / 2;
    // Read scroll displacement through the tall introduction; one continuous full turn
    // covers front, either profile and back with no automatic spinning or abrupt snapping.
    const intro = sections.find(el => el.dataset.particleScene === "portraitRight");
    if (intro) {
      const start = intro.getBoundingClientRect().top + scrollY;
      turnProgress = clamp((scrollY - start + height * .2) / Math.max(1, intro.offsetHeight - height * .6));
    }
    // One continuous morph per pair of scene centers, reversible in both scroll directions.
    target = mid <= centers[0] ? 0 : centers.length - 1;
    for (let i = 0; i < centers.length - 1; i++) {
      if (mid < centers[i] || mid >= centers[i + 1]) continue;
      segment = i;
      phase = clamp((mid - centers[i]) / Math.max(1, centers[i + 1] - centers[i]));
      target = i + phase;
      break;
    }
    if (media.matches) { current = Math.round(target); draw(); } else request();
  };
  const draw = () => {
    if (!clouds || lost) return;
    const fromIndex = Math.min(shapes.length - 1, Math.floor(current));
    const toIndex = Math.min(shapes.length - 1, fromIndex + 1), blend = current - fromIndex;
    const from = shapes[fromIndex], to = shapes[toIndex];
    const weight = (shape: Shape) => (from === shape ? 1 - blend : 0) + (to === shape ? blend : 0);
    const sphereWeight = weight("sphere") + weight("spherePhilippines"), mapWeight = weight("philippines");
    const portraitWeight = weight("portrait") + weight("portraitRight");
    const frameRect = weight("frame") > 0 ? frameTarget?.getBoundingClientRect() : undefined;
    const orbitRect = sphereWeight > 0 ? orbit?.getBoundingClientRect() : undefined;
    // Rotation is driven by scroll through the introduction: front -> profile ->
    // back -> opposite profile -> front. Shapes are inferred from one photo,
    // so this is a stylized volumetric shell rather than a captured 3D scan.
    const yaw = media.matches ? 0 : smooth(turnProgress) * TAU;
    const spin = media.matches ? 0 : time * .000065;
    const cosSpin = Math.cos(spin), sinSpin = Math.sin(spin), cosAngle = Math.cos(yaw), sinAngle = Math.sin(yaw);
    const transform = (shape: Shape, offset: number, output: Float64Array) => {
      const cloud = clouds[shape], x = cloud.positions[offset], y = cloud.positions[offset + 1], z = cloud.positions[offset + 2];
      output[0] = x; output[1] = y; output[2] = z;
      if (shape === "sphere") {
        const cx = width / 2, dx = x - cx;
        output[0] = cx + dx * cosSpin + z * sinSpin + (shape === "sphere" && orbitRect ? orbitRect.left + orbitRect.width / 2 - width / 2 : 0);
        output[1] = y + (shape === "sphere" && orbitRect ? orbitRect.top + orbitRect.height / 2 - height / 2 : 0);
        output[2] = z * cosSpin - dx * sinSpin;
      } else if (shape === "portrait" || shape === "portraitRight") {
        const cx = shape === "portrait" ? width / 2 : width * (width < 768 ? .60 : .72);
        output[0] = cx + (x - cx) * cosAngle + z * sinAngle;
        output[2] = z * cosAngle - (x - cx) * sinAngle;
      } else if (shape === "frame" && frameRect) {
        output[0] = frameRect.left + frameRect.width / 2 + (x - width / 2) * frameRect.width / Math.min(width * .86, 1040);
        output[1] = frameRect.top + frameRect.height / 2 + (y - height / 2) * frameRect.height / Math.min(height * .48, 400);
      }
    };
    const a = new Float64Array(3), b = new Float64Array(3);
    const frameLight = media.matches ? 1 : .9 + Math.sin(time * .001) * .1;
    for (let i = 0; i < count; i++) {
      const offset = i * 3;
      transform(from, offset, a); transform(to, offset, b);
      const z = mix(a[2], b[2], blend);
      positions[offset] = mix(a[0], b[0], blend); positions[offset + 1] = mix(a[1], b[1], blend); positions[offset + 2] = z;
      const surfaceLight = .20 + .60 * clamp((z / radius + 1) / 2);
      tones[i] = mix(clouds[from].tones[i], clouds[to].tones[i], blend) * mix(surfaceLight, .9, portraitWeight) * mix(1, frameLight, weight("frame"));
    }
    geometry.attributes.position.needsUpdate = true; geometry.attributes.tone.needsUpdate = true;
    canvas.dataset.activeShape = shapes[Math.round(current)]; canvas.dataset.morph = String(current); canvas.dataset.sphereRadius = String(radius); canvas.dataset.portraitYaw = String(yaw); canvas.dataset.turnProgress = String(turnProgress); canvas.dataset.mapReveal = String(weight("spherePhilippines"));
    if (orbit) orbit.style.opacity = String(media.matches ? 1 : smooth((sphereWeight - .72) / .24));
    // The label appears only once the zoomed map is recognizable, and remains
    // readable through the center of the map section instead of instantly vanishing.
    if (location) location.style.opacity = String(media.matches ? 1 : smooth((mapWeight - .62) / .32));
    renderer.render(scene, camera);
  };
  const tick = (stamp: number) => {
    raf = 0; const delta = last ? Math.min(stamp - last, 50) : 16; last = stamp;
    if (!media.matches) time += delta;
    current = Math.abs(target - current) < .00001 ? target : current + (target - current) * (1 - Math.exp(-delta / 65));
    draw(); request();
  };
  const request = () => { if (!raf && !dead && !lost && !document.hidden && !media.matches) raf = requestAnimationFrame(tick); };
  const visibility = () => { cancelAnimationFrame(raf); raf = 0; last = 0; request(); };
  const preference = () => { cancelAnimationFrame(raf); raf = 0; current = target; draw(); request(); };
  const contextLost = (event: Event) => { event.preventDefault(); lost = true; cancelAnimationFrame(raf); raf = 0; canvas.dataset.renderer = "context-lost"; if (orbit) orbit.style.opacity = "1"; if (location) location.style.opacity = "1"; };
  const contextRestored = () => { lost = false; canvas.dataset.renderer = "webgl"; measure(); request(); };
  measure(); current = target; draw(); request();
  const observer = new ResizeObserver(measure); sections.forEach(section => observer.observe(section));
  addEventListener("scroll", scroll, { passive: true }); addEventListener("resize", measure);
  document.addEventListener("visibilitychange", visibility); media.addEventListener("change", preference);
  canvas.addEventListener("webglcontextlost", contextLost); canvas.addEventListener("webglcontextrestored", contextRestored);
  return () => {
    dead = true; cancelAnimationFrame(raf); observer.disconnect();
    removeEventListener("scroll", scroll); removeEventListener("resize", measure);
    document.removeEventListener("visibilitychange", visibility); media.removeEventListener("change", preference);
    canvas.removeEventListener("webglcontextlost", contextLost); canvas.removeEventListener("webglcontextrestored", contextRestored);
    orbit?.style.removeProperty("opacity"); location?.style.removeProperty("opacity");
    geometry.dispose(); material.dispose(); renderer.dispose();
  };
}
