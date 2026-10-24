# Particle portfolio redesign

Base: `92965ba`. Feature branch: `feat/particle-portfolio-redesign`.

The homepage identifies Kristy Kate Taylor as a Software Developer. Its project reel prioritizes RBIM, AHDIS, and ERP System, followed by C.O. Designs and Marci Metzger. Project records, case studies, links, and original media remain intact. Lacomus and the design collection retain their existing unpublished status.

## Rendering and motion

- A deferred Three.js WebGL renderer owns one persistent point cloud. Scene geometry morphs reversibly with vertical scroll. An orthographic camera uses the canvas's actual CSS dimensions, including scrollbar-gutter effects, so a spherical shell projects to a circle.
- The portrait is segmented from `public/media/kristy-kate-professional-portrait-v2.webp` (960 × 960). A flood fill removes border-connected near-white background. Facial luminance is intentionally suppressed for a featureless silhouette. A front-and-back rounded particle shell gives a controlled 360° artistic rotation during the tall sticky introduction.
- Depth is calibrated with approximate head and shoulder breadth ratios measured from the user-supplied four-angle reference board (front, left, back, right). A single existing portrait is still the underlying mask for both front and back. This produces a **stylized point-cloud visual hull, not an identity-accurate 3D scan**; actual multi-view photogrammetry is needed for exact anatomical reconstruction.
- Sphere positions lie on a Fibonacci spherical shell with real positive and negative depth. Its curved SVG labels and radius share the renderer's measurements and scroll state.
- The Philippines uses Natural Earth country geometry. Longitude is scaled by the cosine of 12.5° latitude, with uniform axes. A separate `spherePhilippines` stage highlights the archipelago on the globe surface; the subsequent long scroll morph zooms those particles into a larger standalone map. “Based in the Philippines” fades in once enough of the map is formed.
- Desktop vertical scrolling drives the horizontal reel. Buttons and keyboard controls map back to that same scroll range; mobile and reduced-motion layouts use a native horizontal reel. Indicators follow actual scroll position.
- The frame measures the real contact container. The single visible address is centered on both axes. Its particles gently pulse when motion is enabled.
- The 650 ms introduction is decorative and nonblocking. It does not simulate loading percentages. Reduced motion removes it and stops continuous particle rotation. Preference changes are handled at runtime.
- Geometry, materials, observers, event listeners, and animation frames are disposed on unmount. Hidden tabs stop animation. WebGL/context or asset failures leave semantic HTML and links usable.

## Geographic provenance

`public/media/philippines.geo.json` contains the PHL MultiPolygon extracted from Natural Earth's 1:10m Admin 0 Countries dataset, downloaded 2026-10-24.

- [Natural Earth dataset](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/)
- [Source GeoJSON](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_admin_0_countries.geojson)
- [Natural Earth public-domain terms](https://www.naturalearthdata.com/about/terms-of-use/)

This is generalized cartographic boundary data for a portfolio illustration, not survey geometry. Small islands receive dedicated boundary particles as well as filled-area sampling.

## Source media limitations

RBIM is 640 × 341; AHDIS is 480 × 256; ERP is 480 × 270. Rendering is capped at source dimensions with contained, uncropped framing and no image filters or hover enlargement. Original high-resolution application captures would improve fine dashboard text on high-density displays. Website covers are 1440 × 1000 and remain available with their existing detail galleries.

## Verification

Run `npm run lint`, `npm run typecheck`, `npm run build`, and `npm test`. The Playwright configuration runs server, Chromium, Firefox, and WebKit suites against the production build.

New coverage checks spherical depth and equal axes, connected-background segmentation, geographic proportions, source-derived portrait sampling, delayed map text, reverse scrolling, keyboard reel controls, project order, exact email centering, runtime reduced motion, and asset failure fallback. Existing assertions remain; content expectations change only for the requested Software Developer identity and the added verified ERP project.

`node scripts/capture-particle-scenes.mjs` captures all ten scenes at 1440 × 900 and 390 × 844. Start the production server on port 3101 first, or set `REVIEW_URL`. Captures and runtime error results are saved under `.artifacts/particle-review/` (ignored by Git). `REVIEW_OUTPUT` selects another output directory.

An earlier implementation reported 192 passing tests; these newer visual and scroll revisions have not yet completed a full local cross-browser suite. The capture script now includes the Philippines-on-globe state, without the removed bands or torus. Release verification reruns the checks after the final geometry corrections; the task report records the final result and deployed commit.

## Changed files

| Files | Change |
| --- | --- |
| `app/page.tsx` | Simplified selected-work heading |
| `components/home/Hero.tsx`, `HeroRefresh.module.css` | Software Developer identity, scene typography, sphere labels, map reveal target, responsive composition |
| `components/home/ParticleField.tsx` | Deferred engine lifecycle |
| `lib/particle-scene.ts`, `lib/particle-geometry.ts` | Segmentation, geographic projection, 3D geometry, lighting, shared scroll timeline, resource management |
| `public/media/philippines.geo.json` | Geographic boundary source |
| `components/home/ProjectDriftWall.tsx`, `SelectedWork.module.css` | Five-project reel, source-size images, scroll/keyboard/button synchronization |
| `components/home/HomeCTA.tsx`, `HomeEditorial.module.css` | One centered email, consistent scene spacing and colors, accessible shared contact styling |
| `components/layout/IntroSplash.tsx`, `IntroSplash.module.css` | Brief particle entrance without fake loading progress |
| `package.json`, `package-lock.json` | Three.js and TypeScript declarations |
| `tests/particle-experience.spec.ts`, `particle-geometry.server.spec.ts` | Geometry, synchronization, accessibility and fallback regression coverage |
| `tests/home-recruiter-flow.spec.ts`, `refinement.spec.ts` | Updated identity and five-project expectations |
| `scripts/capture-particle-scenes.mjs` | Repeatable desktop/mobile scene captures |
| `scripts/performance-review.mjs` | Correct theme-toggle order for the existing dark default in CI's performance review |
| `docs/particle-redesign.md` | Implementation, provenance, validation, and limitations |

## October 24 motion cleanup

The four horizontal bands, torus/donut, and oversized background orb remain removed. The portrait now has a front-and-back convex point cloud, with a full scroll-controlled turn whose depth proportions draw on the four-view reference. The motion is an artistic approximation, not a scanned model; the original photograph does not contain true captured rear-facing texture. The continuous scroll interpolation no longer pauses at dead zones.

The projects section is now a single featured card in a scroll-synchronized horizontal reel, preserving the actual screenshot's maximum native resolution. Dark rectangular overlays behind About, services and the ribbon text were removed. Following the change, rerun Playwright, lint, TypeScript and desktop/mobile visual checks before a production merge.

## October 24 — sculpting and cursor interaction

- The featureless silhouette now receives controlled convex thickness plus contour-aware grayscale highlights. Brightness is **not** derived from eyes, lips, or nose in the source photo. The silhouette remains based on the existing portrait, rather than copying the reference model’s hairstyle.
- Individual edge particles shimmer fractionally (sub-pixel scale); portrait shading changes with the 3D rotation to distinguish front, sides, and back.
- A luminous pointer orb follows mouse movement with gentle lag on fine-pointer devices; nearby particles repel by at most 23 CSS pixels before naturally returning when the cursor moves. There is no pointer force on touch screens or in reduced-motion mode.
- The orb and listeners are cleaned up on unmount; semantic page content, links, and keyboard navigation remain accessible.
- The Vercel build and preview deployment status are checked independently. Source-level tests are added; a READY deployment is not a substitute for full Playwright visual acceptance.
