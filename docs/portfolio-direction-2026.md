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
