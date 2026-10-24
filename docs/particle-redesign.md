# Particle portfolio redesign

Base: `92965ba`. Feature branch: `feat/particle-portfolio-redesign`.

The homepage identifies Kristy Kate Taylor as a Software Developer. Its project reel prioritizes RBIM, AHDIS, and ERP System, followed by C.O. Designs and Marci Metzger. Project records, case studies, links, and original media remain intact. Lacomus and the design collection retain their existing unpublished status.

## Rendering and motion

- A deferred Three.js WebGL renderer owns one persistent point cloud. Scene geometry morphs reversibly with vertical scroll. An orthographic camera uses the canvas's actual CSS dimensions, including scrollbar-gutter effects, so a spherical shell projects to a circle.
- The portrait is segmented from `public/media/kristy-kate-professional-portrait-v2.webp` (960 × 960). A flood fill removes only near-white background connected to the image borders; interior highlights and source luminance remain. No generic bust is used. Luminance and a shallow rounded relief supply depth, with rotation limited to about four degrees.
- Portrait depth is an artistic photographic relief, not a recovered anatomical mesh. A supplied depth map or multi-angle portrait scan would be needed for accurate side views or larger rotation. The attached reference photo has a different crop from the existing square source; the existing source was used without inventing missing features.
- Sphere positions lie on a Fibonacci spherical shell with real positive and negative depth. Its curved SVG labels and radius share the renderer's measurements and scroll state.
- The Philippines uses Natural Earth country geometry. Longitude is scaled by the cosine of 12.5° latitude; both axes then use the same display scale. This avoids stretching the archipelago to fit a rectangular mask. The location text appears only after the map finishes forming and fades before the next morph.
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

The complete suite passed 192 tests across the configured browsers and server suite during implementation. All ten scenes were inspected in desktop and mobile captures. Release verification reruns the checks after the final geometry corrections; the task report records the final result and deployed commit.

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
