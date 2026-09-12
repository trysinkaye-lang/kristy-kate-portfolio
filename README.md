# Kristy Kate Taylor — developer & designer portfolio

A personal portfolio built with Next.js 16.3.3, React 19.2, and strict TypeScript. It uses CSS Modules, self-hosted Manrope and Cormorant Garamond through `next/font`, and `next/image` for responsive WebP assets.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview:

```sh
npm run build
npm run start
```

## Structure

- `app/`: homepage, project index, six public case studies, about, website packages, contact, metadata, and API routes.
- `data/projects.ts`: factual project content, status, technology, original imagery, and existing live/repository links.
- `data/site.ts`: identity, contact information, services, and technical vocabulary.
- `data/packages.ts`: shared package definitions and supported currencies.
- `components/home/`: custom editorial compositions plus the Selected Work Drift Wall visual index.
- `components/projects/ImageInspector.tsx`: native dialog with keyboard support, actual-size viewing, and a direct image link without JavaScript.
- `components/effects/PortfolioMotion.tsx`: progressive reveal, spotlight coordinates, and magnetic pointer feedback with reduced-motion safeguards.
- `styles/tokens.css`: theme, typography, spacing, grid, and motion values.
- `tests/`: Playwright behavior, accessibility, responsive, metadata, exchange-rate, and contact verification.
- `docs/redesign-plan.md`: current audit, design decisions, reference links, and content limitations.

## Design and motion

The light-first ivory, ink, and oxide palette is retained, with a complete charcoal dark mode. Manrope carries interface text; Cormorant gives selected editorial statements contrast. Project pages use actual website captures and application screenshots, with supporting photography credited separately.

The Selected Work opener uses an original, React Bits Drift Wall-inspired composition: four drifting columns of real project imagery, restrained spotlight feedback, and direct case-study links. It is intentionally not a copied React Bits component and adds no animation dependency. Desktop columns move subtly; touch layouts become a static 2×2 project grid. Low-resolution software captures are served without additional Next.js image recompression, but their source detail cannot exceed the supplied originals.

Native CSS and a small client motion controller provide the brief hero introduction, viewport reveals, magnetic CTA feedback, spotlight coordinates, and restrained image hover. No animation library, WebGL canvas, custom cursor, scroll controller, or preloader ships. Reduced-motion preferences disable decorative motion; server-rendered content stays visible without JavaScript.

## Contact configuration

Copy `.env.example` to `.env.local` and configure the email provider when ready:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` — a verified sender
- `CONTACT_TO_EMAIL` — optional; defaults to the existing portfolio email
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` — optional shared rate limiting

Without email credentials the UI explains that online messaging is unavailable and offers the real email address. It never claims an unsent message succeeded. The API includes validation, bounded request bodies, an origin check, a honeypot, rate limiting, and provider idempotency. Local rate limiting is process-local; configure the shared limiter for multiple server instances. Automated tests blank provider credentials and never send real email.

Package prices preserve the original PHP amounts. Reference conversions request Frankfurter only after a foreign currency is selected. The server validates the base, date, and positive rates, shares concurrent requests, caches successful rates for an hour, and backs off for a minute after failure. PHP prices stay visible if conversion fails. No exchange-rate API key is needed. Package inquiries prefill the contact subject with the selected package and currency.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install
npm test
```

The test runner starts its own production server on port 3100. The suite covers Chromium, Firefox, and WebKit, all nine requested homepage viewports, route overflow, keyboard navigation, themes, reduced motion, Drift Wall links, case-study links, image inspection, contact states, exchange-rate response behavior, and axe WCAG A/AA checks.

For saved visual evidence, run a production server on port 3100, then:

```sh
node scripts/visual-review.mjs
node scripts/performance-review.mjs
node scripts/resource-review.mjs
```

Captures are written to the ignored `.artifacts/review/` directory. Set `PLAYWRIGHT_BASE_URL` to use a different local server.

Run timing measurements on an otherwise idle machine, separately from tests and resource coverage. The performance script runs three cold-browser samples each for desktop and a throttled, touch-enabled iPhone viewport. The resource script measures JS/CSS coverage separately and inventories image dimensions, fonts, render-blocking requests, and production bundles. Unused coverage includes framework branches and unvisited states; it is not a list of code to delete.

See [the final verification report](docs/verification.md) for measurements, test results, file-review decisions, and exact external requirements.

## Content and publishing

The canonical URL is configured in `data/site.ts`. Sitemap, robots, OpenGraph/Twitter metadata, Person structured data, and project CreativeWork data are included. Analytics and Speed Insights load only when the Vercel environment is present.

No resume, LinkedIn address, employment dates, or unverified results are fabricated. Higher-resolution RBIM, AHDIS, and ERP screenshots would allow larger detailed software presentations; the current captures are deliberately shown at their real source detail and can be inspected at original resolution. Unused placeholder SVGs and one unreadable, unreferenced portrait file were removed; valid portrait sources remain preserved.

## Origin

The earlier portfolio was customized from the visual/architectural direction of DavidHDev/rbp-portfolio. Its original template terms allow personal/commercial use but prohibit redistribution or resale as a template. This repository remains a personal portfolio.
