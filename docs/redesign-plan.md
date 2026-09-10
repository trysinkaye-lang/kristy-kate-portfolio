# Portfolio rebuild — September 2026

## Repository audit

The starting site is Next.js 16.1.1 / React 19 with strict TypeScript. App Router exposes `/`, `/projects`, `/projects/[slug]`, `/about`, and `/contact`. Four typed project records are preserved: RBIM, AHDIS, ERP, and design work. Existing analytics and Speed Insights are useful and retained. Contact is currently mailto-only; no API, server action, provider configuration, or environment file exists. The resume and LinkedIn URL are unset and must not become fabricated links.

The layout imports 17 global stylesheets. Other styles remain attached to alternate homepages and effect components. The active homepage imports BlueprintHero and four home sections; PortfolioHome, PortfolioShowcaseCarousel, and the sections directory provide overlapping older implementations. React Bits effects, Lenis, OGL, GSAP, and motion are responsible for unnecessary global or obsolete effects. All obsolete code will be removed only after the replacement import graph is verified. Original public assets remain available.

Tests cover four routes and desktop/mobile interactions but assert obsolete role copy, sidebar behavior, old classes, and contradictory screenshot sizing. They will be replaced with behavior-focused coverage of the new product, not suppressed. The existing GitHub Actions workflow and Vercel integration will be retained and improved. No merge or deployment is part of this task.

Adjacent repositories provide real C.O. Designs and Marci Metzger images and implementation evidence. The C.O. source is a Next.js architecture portfolio with React Three Fiber and GSAP; Marci is a React/Vite redesign assessment. Their implementation is still in development. No confirmed deployment URL is available. Lacomus is included from the user's brief as work in progress; no project image or detailed implementation evidence is available. Existing design SVGs are placeholders, so the public archive will use actual interface screenshots instead.

## Art direction: The working portfolio

- **Concept:** an editorial record of a designer who engineers systems. Identity first, then work; generous but unequal spacing. A quiet masthead, composed portrait and name, a technical flagship, image-led architecture, analytical software, lifestyle imagery, a restrained brand study, operations, and an interface archive.
- **Typography:** self-hosted Manrope variable for identity, interface and body; Cormorant Garamond for a few reflective statements and editorial website titles. Micro 12px, caption 14px, body 16–18px, subheading 24–32px, display 48–80px, identity up to 132px. Titles reflow intentionally; avoid clipped words and arbitrary italics.
- **Grid:** 12 conceptual columns in a maximum 1440px shell. Desktop portrait on the right, role list below the name on the left. RBIM spans the shell, C.O. imagery offsets from its heading, AHDIS uses an analytical split, Marci uses a landscape/portrait pairing, Lacomus uses a quiet typographic WIP composition, ERP uses an operations strip, archive uses native horizontal scroll.
- **Spacing:** 8px base; 16/24/32/48/64/96/144px intervals. Shell gutters 24px mobile, 40px tablet, 64px desktop. Project spacing varies by content and emphasis.
- **Color:** ivory #f4f1eb, ink #252621, neutral #67675f, line #d3d0c8, charcoal #232722; muted oxide #a14332 is the sole UI accent. Dark mode reverses the canvas while preserving readable photographic surfaces.
- **Motion:** native scrolling, immediate static content, restrained 180–300ms link/image feedback, and one CSS scroll-driven flagship expansion where supported. No loading sequence, animation dependency, hidden-on-load content, or forced scrolling. Reduced-motion removes movement.
- **Images:** original portrait with intentional rectangular crop; real application captures without artificial browser frames. C.O. and Marci use their own project photography, with captions distinguishing source imagery from interface screenshots. Source dimensions and asset provenance documented. No fake Lacomus product photography.
- **Project logic:** centralized typed records and fixed order: RBIM, C.O. Designs, AHDIS, Marci Metzger, Lacomus, ERP, Interface & Digital Design Work. Shared metadata and link primitives; separate visual project compositions. Case studies carry narrative and architecture detail. Unknown dates omitted; status explicit.
- **Desktop:** asymmetry, horizontal role/availability register, large flagship screenshot, contrasting project widths and a disciplined bottom contact section.
- **Tablet:** reduced gutters, recomposed two-column hero, single-column project prose where necessary, images retain their hierarchy.
- **Mobile:** name across two lines, portrait paired with shorter identity details, roles in a readable register. Compact project intros and uncropped software screens; native archive scrolling. Full-screen native dialog menu with focus containment, Escape and return focus.

## Implementation sequence

1. Create redesign branch and preserve the pre-existing generated next-env change.
2. Consolidate project/site data and copy verified assets with licenses/provenance.
3. Replace the root style stack with tokens, a small global foundation, and scoped CSS modules.
4. Build all homepage compositions, project index/case studies, about, contact, navigation, footer, and not-found experience.
5. Implement validated contact API, honest provider states, honeypot, bounded request size, rate limiting, and nonsensitive analytics.
6. Complete metadata, canonical URLs, sitemap, robots, structured data, and OpenGraph identity.
7. Remove unused components/styles/dependencies after verifying imports.
8. Install, lint, build, run Playwright across browsers and all requested sizes, inspect screenshots, fix defects, and document remaining content/configuration gaps.
