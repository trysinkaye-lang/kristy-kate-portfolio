# Kristy Kate Taylor — Software Developer & Designer Portfolio

Customized from the visual/architectural direction of DavidHDev/rbp-portfolio and extended for a developer + designer portfolio.

## What is included

- Next.js 16 App Router + TypeScript + Tailwind CSS v4
- Dark/light theme support
- Lenis smooth scrolling
- React Bits integrations supplied by the portfolio owner:
  - MaskedHeading (GSAP)
  - ScrollExpand
  - DepthCarousel (GSAP)
  - MoltenMetal (OGL)
- Featured project filters and dedicated case-study routes
- RBIM and AHDIS project entries
- Design carousel with clearly labeled placeholder visuals
- UI/UX showcase, services, stack, development/design process, skills, journey, resume placeholder, GitHub and contact sections
- SEO metadata, sitemap, robots, skip link, keyboard focus, reduced-motion support
- MoltenMetal is code-split so the WebGL effect does not block the initial page paint

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Before publishing

1. Replace `https://example.com` in `app/sitemap.ts` with the real deployed domain.
2. Replace placeholder SVG project images in `public/media/` with real screenshots.
3. Add the real resume as `public/resume.pdf`, then convert the resume placeholder button to a download link.
4. Replace the LinkedIn placeholder in `data/site.ts`.
5. Verify education/employment dates and add only facts that should be public.
6. Keep private system repositories private; use verified screenshots and case studies instead.

## React Bits integrations

The portfolio directly includes the supplied React Bits component implementations:

- `components/react-bits/MaskedHeading.jsx`
- `components/react-bits/ScrollExpand.jsx`
- `components/react-bits/DepthCarousel.jsx`
- `components/react-bits/MoltenMetal.jsx`

## Deploy

Recommended: import this GitHub repository into Vercel and deploy with the default Next.js settings.

## Template note

The referenced `rbp-portfolio` README states that its template is free to use for personal and commercial projects but should not be resold or redistributed as a template. This project is a customized personal portfolio, not a redistribution of the original template.
