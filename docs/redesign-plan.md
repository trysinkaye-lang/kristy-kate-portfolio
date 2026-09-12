# Portfolio refinement — September 12, 2026

## Audit of the existing repository

The current starting point was already a custom editorial portfolio, not the older template described in its README. The live import graph used Next.js 16.3.3, React 19.2.3, strict TypeScript, CSS Modules, next-themes, self-hosted Manrope/Cormorant, Next Image, Vercel Analytics/Speed Insights, and Zod. There was no installed GSAP, Motion, OGL, Lenis, or Tailwind runtime. Preserve this light stack.

Routes already included the homepage, project index, seven complete case studies, about, packages, contact, contact API, and exchange-rate API. All seven records, real source assets, email/GitHub addresses, live previews, repository links, software features, challenges, and lessons were reviewed before editing. The pre-existing next-env.d.ts change belongs to the starting working tree.

### What worked

- A disciplined ivory/ink/oxide palette, a complete light/dark theme, and an identifiable personal voice.
- Real project data and meaningful RBIM/AHDIS technical narratives, including offline storage, validation, desktop deployment, and age-aware reporting.
- Native scrolling, server-rendered content, responsive image handling, static case-study generation, and modest dependencies.
- Contact validation, provider error handling, honeypot, idempotency, bounded requests, and rate limiting.
- Existing canonical URLs, sitemap, robots, social metadata, structured data, responsive/keyboard tests, and conditional analytics.

### What needed work

1. The hero had one dominant sans-serif treatment, excessive mobile separation between portrait and roles, and a supporting note positioned with absolute pixel offsets. It looked composed at selected sizes but was fragile to copy changes.
2. Photographs led C.O. Designs, Marci, and Lacomus on the homepage. Actual site screenshots were available but harder to find, weakening proof of development work.
3. The project index compressed mobile images to 95px and desktop images to 220px. Large case-study images offered no deliberate inspection behavior.
4. The long homepage had no direct project jump navigation. Case-study anchors combined scroll padding and scroll margin, producing excessive offsets.
5. Motion timings were scattered. The old scroll-expansion was subtle enough to contribute little. There was no reason to add a canvas, cursor effects, or another framework.
6. Small source screenshots limit RBIM to 640px and AHDIS/ERP to 480px. Enlarging these assets cannot recover detail; preserve their resolution and offer actual-size inspection.
7. Mobile menu behavior already supported focus and Escape, but did not expose current-page state. Its JavaScript-free fallback lacked a full navigation route.
8. Package links included query parameters, but Contact ignored them. Currency formatting used an unspecified locale, risking server/client differences. Failed conversion removed the visible base amount despite copy promising it remained available.
9. Case-study shares reused the general portfolio social image. The original education fact was buried, while the homepage repeated the same portrait.
10. Ten abandoned decorative/placeholder SVGs and a README claiming removed components were still present. Original portraits remain preserved as source material.

Baseline browser captures covered 1920×1080, 1536×864, 1440×900, 1366×768, 1024×1366, 768×1024, 430×932, 390×844, and 375×812. The original homepage had no horizontal overflow at those sizes. Initial screenshot automation mutated image loading attributes too early; this was an audit-harness timing issue, corrected by waiting for hydration before capture, not a site hydration defect.

## Research and design principles

Reviewed September 12, 2026:

- [Corentin Bernadou, Codrops](https://tympanus.net/codrops/2026/03/05/inside-corentin-bernadous-portfolio-swiss-inspired-layouts-webgl-geometry-and-thoughtful-motion/): a limited palette and editorial grid can support personal experimentation without making the interface dependent on it. Applied the composition principle, not the WebGL environment or identity.
- [R—K ’26, Codrops](https://tympanus.net/codrops/2026/04/07/r-k-26-the-thinking-and-code-behind-a-portfolio-led-by-presence/): identity, page rhythm, and interaction need a coherent structure. Applied consistent typography and aligned but varied project spreads; omitted its preloader, audio, and canvas.
- [Siteinspire](https://www.siteinspire.com/), [Lapa Ninja](https://www.lapa.ninja/), and [Godly / Recent](https://recent.design/?ref=godly): surveyed typographic, minimal, portfolio, and image-led compositions. These reinforced large previews and controlled variation rather than repeated rounded cards.
- Awwwards portfolio pages repeatedly failed to load through the research tool; Land-book returned 403. No claim is made to have inspected their unavailable pages.
- [React Bits index](https://reactbits.dev/get-started/index), [Split Text](https://reactbits.dev/text-animations/split-text), [Animated Content](https://reactbits.dev/animations/animated-content), plus the official repository implementations of Split Text, Animated Content, and Tilted Card were reviewed. Pixel Transition, Magnet, and background options were evaluated and rejected as unnecessary here.

## Design system and implementation

**Identity:** retain the personal portfolio and its existing palette. A 12-column hero pairs Manrope first names with a large Cormorant surname. Oxide punctuation and a single portrait corner mark connect the type and image. The role, location, and real scope of work are explicit.

**Typography:** two self-hosted variable fonts only. Manrope handles body and UI; Cormorant handles the surname and selected project/section statements. Both load through next/font. Clamp-based type, controlled line lengths, and restrained weights preserve hierarchy.

**Spacing/grid:** 8px scale, shared 24–72px gutters, 1440px maximum shell, 72–120px section spacing, 12-column hero, and complementary asymmetric project layouts. Square image surfaces and single rules replace decorative containers.

**Color:** ivory #f4f1eb, ink #252621, oxide #a14332; charcoal #20231f and peach #e3977d in dark mode. Modal accents resolve from the page theme rather than the inverse project section they were opened from.

**Projects:** retain the order and all real facts. Website screenshots now lead their homepage sections, index entries, case-study openings, and social shares. Supporting studio/product photography is captioned distinctly. Project index previews span the mobile shell. Native jump links let visitors reach a specific project directly.

**Inspection:** an original shared image inspector uses a native dialog, explicit close/actual-size controls, scrollable keyboard region, focus containment/return, and original-image links. Its full-size asset mounts only on open. Without JavaScript, the trigger remains a functional image link.

**About:** retain the verified degree and institution; surface them on the homepage without inventing education dates or employment history. Keep detailed technical vocabulary on About instead of adding a wall of badges.

**Contact/packages:** preserve amounts, currencies, provider behavior, and links. Extract shared package data, use deterministic formatting, keep PHP amounts visible if rates fail, bound the rate request to eight seconds, prefill contact subjects from allowlisted package/currency values, and refresh idempotency IDs when a visitor edits the message.

## React Bits and motion

No React Bits source code or package was copied. Two ideas were adapted with original CSS:

- Split Text: two explicit name lines, 18px travel, 650ms shared cubic-bezier easing, 80ms surname offset. No runtime text splitting, per-character cascade, layout mutation, or loading gate.
- Animated Content: progressive 18px scroll-linked heading movement on supported desktop/tablet browsers. Content remains opaque and readable throughout; unsupported browsers receive static content.

Preview hover is 1.015 scale. Navigation underlines, arrows, and disclosure symbols use 180/300ms timing. Reduced motion disables animation, transforms from transitions, and smooth scrolling. Mobile drops scroll choreography and retains ordinary taps. No permanent animation loop, canvas, particle system, pinned scrolling, custom cursor, or animation dependency exists.

## Accessibility and responsive behavior

Preserve semantic headings, alt text, skip link, visible focus, native form validation, live status, and honest delivery errors. Strengthen 44px controls, mobile active-page indication, JavaScript-free navigation, keyboard image panning, and theme-aware modal contrast. Image content is never available only on hover.

Desktop gets the 12-column masthead, asymmetric website spreads, large index previews, and sticky case-study contents. Tablet recomposes hero supporting copy and narrows project columns. Mobile pairs role/copy with the portrait, places previews before index descriptions, stacks project spreads, and uses native scrolling. Software source dimensions remain the maximum rendered detail size.

## Performance and SEO

No new dependencies. Static rendering remains in place for the homepage/index/about/packages and seven case studies. Only the nav/theme, analytics links, inspector, pricing selector, and contact form need client behavior. Next Image provides responsive lazy-loaded WebP previews; portrait and case-study lead images use preload. Two local font files total about 61 KiB. Retained raw photos do not enter page transfers unless used. Original-size inspector images are loaded on demand.

The canonical domain, sitemap, robots, favicon, and analytics were retained. The description now states the actual specialty, Person data includes the verified university, and case-study OpenGraph/Twitter images show the relevant project. No unsupported dates, resume URL, social profile, metrics, or work claims were added.

## Verification evidence

The browser suite tests navigation, all routes/images, seven project links, all nine homepage sizes, mobile/tablet/desktop overflow, source-resolution limits, contact validation and delivery states, dark/light persistence, reduced motion, JavaScript-free content, keyboard skip/menu/inspector behavior, package handoff, metadata, and WCAG A/AA checks in both themes. The test contact provider is isolated and never sends real mail.

`node scripts/visual-review.mjs` saves full/viewport images and a machine-readable capture report to `.artifacts/review/`. Final measured results are recorded in `docs/verification.md` after the verification pass.

## Information genuinely unavailable

- Higher-resolution software screenshots: RBIM 640×341, AHDIS 480×256, ERP 480×270 are the supplied limits.
- A real resume file and LinkedIn profile, if wanted.
- Confirmed employment/education dates and quantified outcomes, if they should appear publicly.
- Email-provider credentials and a verified sending address for real online form delivery.

These are content/configuration limitations, not unfinished implementation placeholders.
