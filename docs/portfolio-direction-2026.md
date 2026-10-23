# Portfolio design direction — October 2026

## Intent

Show Kristy Kate Taylor's software work as credible engineering, not as an anonymous agency template. The current portfolio should remain a black-and-white personal site; product screenshots retain their original colors. No invented visitor metrics, clients, awards, or performance results.

## References studied

- **Paco Coursey** — https://paco.me/ — compact, evidence-led project listings and concise first-person writing.
- **Brittany Chiang** — https://brittanychiang.com/ — accessible navigation, concrete experience and explainable technical work.
- **Rauno Freiberg** — https://rauno.me/ — interaction polish without sacrificing the content or browsing path.
- **Awwwards: Hugo Crozet** — https://www.awwwards.com/sites/hugo-crozet-portfolio — disciplined use of typography to establish visual identity.
- **Awwwards: Valentin Mor** — https://www.awwwards.com/sites/valentin-mor-portfolio-2025 — monochrome editorial restraint, hierarchy and personal voice.

These are **study references, not copying targets**. Original text, source images, assets, and identities belong to their respective owners.

## Design rules

1. Lead with the developer's identity, not a template slogan. Describe work actually represented by RBIM and AHDIS.
2. Use a quiet monochrome interface: no colored gradient fog, decorative blobs, fake terminal windows, generated statistics or emoji-as-branding.
3. Show only distinct, genuine project screenshots. Do not reuse RBIM as a generic design-project thumbnail.
4. The homepage has a curated four-project **index**; the full Projects page lists the five published case studies.
5. Keep index images small enough for the writing to remain legible (homepage approx. 280px; full index up to 475px).
6. Project summaries stay brief and factual; detail pages may cover Overview, Features, Technology and Outcome. No Challenges & Learning template.
7. Show honest project status; don't imply a pilot is fully released.
8. Links and details must work by keyboard, on a narrow mobile screen, and with JavaScript disabled where practical.
9. Motion is optional and respects reduced-motion preferences; image and copy remain visible without it.

## Review checklist

- Check light and dark mode for contrast and unintended color accents.
- Check at 375px, 390px, 768px, 1440px and 1920px.
- Verify there are no duplicated thumbnails, missing previews, or horizontally scrolling sections.
- Test hero Projects and Contact links, mobile menu, case-study next links, and in-page anchors.
- Confirm GitHub lint, Next.js build, TypeScript, Playwright, and accessibility checks before merging.
- Keep production unchanged until the user approves a specific preview.


## New case-study reference: Maria Vasilyeva — Península

User-provided inspiration: https://www.mariavasilyeva.com/work/peninsula

### What was verifiable

The exact Península project URL was not retrievable in the available browser/search environment, so **the exact page details were not claimed as directly inspected**. Indexed adjacent pages from the same portfolio (for example https://www.mariavasilyeva.com/work/diir and /work/klarna), the portfolio's work index (https://www.mariavasilyeva.com/work), and a recent editorial study of its visual system (https://dokle.design/awards/maria-vasilyeva-portfolio-laid-out-like-a-score) support these verified cues:

- Minimal black/white frame with narrow rules and small peripheral metadata
- Project-first hero with the title carrying typographic hierarchy
- Original-color media framed by restrained page styling
- Clearly separated role/project details followed by visual evidence
- Deliberate pacing and navigation between projects

### Adaptation for a software-developer portfolio

- Use the supplied Península URL as an **inspiration reference**, not a page to reproduce or an asset source.
- Each of the five project-detail pages has a typographic title, compact number/status, central genuine software screenshot, separate role/technology fact lines, structured feature list, optional technical notes and gallery, and next-project link.
- Maintain small image widths appropriate to dashboards (main preview up to 780px), while allowing legitimate architecture/website imagery to appear natural.
- No handwritten annotations, music-score ornament, borrowed media, audio controls, cursor tricks, or copying of Maria's text.
- Remain keyboard accessible with working image inspection and reduced-motion support.
- Do not add a Challenges & Learning section.



## October 23 — Maria Vasilyeva homepage, Phantom and Sierra references

User-selected URLs:
- https://www.mariavasilyeva.com/
- https://www.mariavasilyeva.com/work/phantom
- https://www.mariavasilyeva.com/work/sierra

Research grounding:
- Maria's own [Codrops design/build breakdown](https://tympanus.net/codrops/2026/10/20/maria-vasilyeva-portfolio/) details how Notes uses a horizontally sequenced, scale-varying image strip, Melody arranges projects in moving horizontal rows, and Overture is restrained and typographic.
- The [Phantom project](https://www.mariavasilyeva.com/work/phantom) describes the actual project, collaborators, design-system contributions and role with minimal surrounding content.
- [Sierra](https://www.mariavasilyeva.com/work/sierra) is listed as a 2025 project on the [work index](https://www.mariavasilyeva.com/work); its exact project page was not retrievable and no Sierra-specific layout claims are made.
- The [third-party portfolio analysis](https://dokle.design/awards/maria-vasilyeva-portfolio-laid-out-like-a-score) describes a black/white site frame, rhythmic image grouping, restrained project metadata and a distinct opening experience.

### Original adaptation in this portfolio

- A tight identity-led introduction followed immediately by an accessible horizontal *interactive project filmstrip*. Four real software/website projects appear once each with mouse/focus selection, progress controls and swipeable cards on narrow screens.
- A **separate** full Projects index uses editorial serif titles, ruled rows, and *small* original-color preview images; no duplicated home-page gallery.
- Five case studies retain original text/images with centered screenshots, truthful development status, role/technology facts and concise outcomes.
- No music theme, instrument names, sound, WebGL effects, copied annotations, third-party media or invented metrics. UI is responsive without JS for basic navigation, and honors reduced motion.
- Site theme remains black/white. Original product screenshots retain their true colors.


## October 23 — Onlines intro reference (user selected)

Reference: https://onlines.com.ar/

The current search-indexed version of the Onlines homepage uses a short conversational Spanish invitation (“Hagamos tu nuevo sitio web.”), a follow-up line about custom design/development, professional role labels, a compact “Onlines justo ahora” message cue, and a direct portfolio/contact path. Onlines is an agency; its team scale, client claims, and Spanish-language copy **must not** be mapped onto an individual software developer.

### Adaptation

- English, first-person singular, no made-up team or customer chat.
- Invitation: **“Have a system in mind?”** This shifts the pitch from websites alone to applications and data workflows.
- Specific support: **“I develop web applications and offline desktop software — from the screens people use to the databases, access controls, and reports behind them.”**
- Secondary frame: “What I build” with *Web applications*, *Offline desktop software*, and *Databases & reporting*.
- Links: “Explore my projects” and “Get in touch”; preserve the original RBIM/AHDIS case studies further down the page.
- Visual language: black-and-white, small developer note, quiet status dot and restrained staggered entry; no portrait, oversized name, fake status messages, copying of original assets or animations.
- Respect reduced-motion preferences. Keep the hero compact enough that the project media starts within an ordinary desktop viewport.

### Verification

The source page was retrieved as indexed HTML, not as a full motion capture. Specific animation timings or exact cursor behaviors are not claimed as verified. The implementation is independently authored.
