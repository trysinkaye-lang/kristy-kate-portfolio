"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Check, Globe2, RefreshCw } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import styles from "./PackagePricingPage.module.css";

const currencyMeta = {
  PHP: { label: "Philippine Peso", symbol: "₱" },
  USD: { label: "US Dollar", symbol: "$" },
  EUR: { label: "Euro", symbol: "€" },
  GBP: { label: "British Pound", symbol: "£" },
  CAD: { label: "Canadian Dollar", symbol: "C$" },
  AUD: { label: "Australian Dollar", symbol: "A$" },
  SGD: { label: "Singapore Dollar", symbol: "S$" },
  JPY: { label: "Japanese Yen", symbol: "¥" },
  NZD: { label: "New Zealand Dollar", symbol: "NZ$" },
  CHF: { label: "Swiss Franc", symbol: "CHF" },
  INR: { label: "Indian Rupee", symbol: "₹" },
  KRW: { label: "South Korean Won", symbol: "₩" },
  MYR: { label: "Malaysian Ringgit", symbol: "RM" },
  THB: { label: "Thai Baht", symbol: "฿" },
} as const;

type CurrencyCode = keyof typeof currencyMeta;

type PackageDefinition = {
  name: string;
  priceMin: number;
  priceMax?: number;
  description: string;
  featured?: boolean;
  badge?: string;
  features: string[];
};

const packages: PackageDefinition[] = [
  {
    name: "Basic",
    priceMin: 15000,
    description:
      "A focused website for individuals, professionals, and small brands that need a clean, credible online presence.",
    features: [
      "Up to 5 pages",
      "Responsive desktop, tablet and mobile design",
      "Home, About, Expertise / Services and Contact",
      "Project, product or publication showcase",
      "Basic contact form",
      "Essential SEO setup",
      "Basic performance optimization",
      "Deployment setup",
      "1 revision round",
    ],
  },
  {
    name: "Professional",
    priceMin: 25000,
    description:
      "For established professionals, authors, consultants and brands that need stronger presentation, richer content and polished interaction.",
    featured: true,
    badge: "Most flexible",
    features: [
      "Up to 7–8 pages",
      "Fully custom responsive design",
      "Expanded project, product or publication showcase",
      "Up to 5 books / featured works",
      "Smooth animations and interactions",
      "Contact form and social integrations",
      "Google Analytics setup",
      "SEO basics and image optimization",
      "Deployment and launch support",
      "2 revision rounds",
    ],
  },
  {
    name: "Premium",
    priceMin: 35000,
    priceMax: 40000,
    description:
      "A fully custom experience for clients who need richer content, advanced interaction, individual content pages and easier long-term management.",
    features: [
      "Full custom website design and development",
      "Advanced animations and micro-interactions",
      "Individual book, project or content pages",
      "CMS / content management setup",
      "Advanced SEO configuration",
      "Analytics and Search Console setup",
      "Premium UI/UX refinement",
      "Advanced performance optimization",
      "Extended launch support",
      "3 revision rounds",
    ],
  },
];

const regionCurrency: Partial<Record<string, CurrencyCode>> = {
  PH: "PHP",
  US: "USD",
  GB: "GBP",
  CA: "CAD",
  AU: "AUD",
  SG: "SGD",
  JP: "JPY",
  NZ: "NZD",
  CH: "CHF",
  IN: "INR",
  KR: "KRW",
  MY: "MYR",
  TH: "THB",
  AT: "EUR",
  BE: "EUR",
  CY: "EUR",
  DE: "EUR",
  EE: "EUR",
  ES: "EUR",
  FI: "EUR",
  FR: "EUR",
  GR: "EUR",
  HR: "EUR",
  IE: "EUR",
  IT: "EUR",
  LT: "EUR",
  LU: "EUR",
  LV: "EUR",
  MT: "EUR",
  NL: "EUR",
  PT: "EUR",
  SI: "EUR",
  SK: "EUR",
};

function isCurrencyCode(value: string | null): value is CurrencyCode {
  return Boolean(value && value in currencyMeta);
}

function detectCurrency(): CurrencyCode {
  if (typeof navigator === "undefined") return "PHP";

  for (const language of navigator.languages ?? [navigator.language]) {
    try {
      const region = new Intl.Locale(language).region;
      if (region && regionCurrency[region]) return regionCurrency[region] as CurrencyCode;
    } catch {
      // Ignore malformed browser locale values and try the next locale.
    }
  }

  return "PHP";
}

function formatMoney(amount: number, currency: CurrencyCode) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PackagePricingPage() {
  const [currency, setCurrency] = useState<CurrencyCode>("PHP");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [rateDate, setRateDate] = useState<string | null>(null);
  const [rateStatus, setRateStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-package-currency");
    setCurrency(isCurrencyCode(saved) ? saved : detectCurrency());
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRates() {
      setRateStatus("loading");
      try {
        const response = await fetch("/api/exchange-rates", {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Unable to load rates");

        const data = (await response.json()) as {
          date?: string | null;
          rates?: Record<string, number>;
        };

        setRates(data.rates ?? {});
        setRateDate(data.date ?? null);
        setRateStatus("ready");
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setRateStatus("error");
      }
    }

    void loadRates();
    return () => controller.abort();
  }, []);

  const rate = currency === "PHP" ? 1 : rates[currency];

  const selectedCurrency = useMemo(() => currencyMeta[currency], [currency]);

  const changeCurrency = (value: string) => {
    if (!isCurrencyCode(value)) return;
    setCurrency(value);
    window.localStorage.setItem("portfolio-package-currency", value);
  };

  const displayPrice = (item: PackageDefinition) => {
    if (!rate) return "Rate unavailable";

    const min = formatMoney(Math.round(item.priceMin * rate), currency);
    if (!item.priceMax) return min;

    const max = formatMoney(Math.round(item.priceMax * rate), currency);
    return `${min}–${max}`;
  };

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero} aria-labelledby="packages-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Website packages</p>
          <h1 id="packages-title">Choose a package, then view it in your currency.</h1>
          <p className={styles.lead}>
            Clear starting points for professional websites, personal brands, authors and businesses. Every package is responsive and the final scope is confirmed before development begins.
          </p>
        </div>

        <aside className={styles.currencyPanel} aria-label="Currency converter for package prices">
          <div className={styles.currencyHeading}>
            <span className={styles.currencyIcon}><Globe2 size={18} aria-hidden="true" /></span>
            <div>
              <p>Price display</p>
              <strong>View in your currency</strong>
            </div>
          </div>

          <label className={styles.currencyField} htmlFor="package-currency">
            <span>Currency</span>
            <select
              id="package-currency"
              value={currency}
              onChange={(event) => changeCurrency(event.target.value)}
            >
              {(Object.keys(currencyMeta) as CurrencyCode[]).map((code) => (
                <option key={code} value={code}>
                  {code} — {currencyMeta[code].label}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.rateMeta} aria-live="polite">
            {currency === "PHP" ? (
              <span>Base pricing in Philippine Peso.</span>
            ) : rateStatus === "loading" ? (
              <span><RefreshCw size={13} className={styles.spin} aria-hidden="true" /> Loading live reference rate…</span>
            ) : rateStatus === "error" || !rate ? (
              <span>Live conversion is unavailable. Base PHP prices remain valid.</span>
            ) : (
              <span>
                Approximate {selectedCurrency.label} conversion{rateDate ? ` · rates dated ${rateDate}` : ""}.
              </span>
            )}
          </div>
        </aside>
      </section>

      <section className={styles.pricingSection} aria-label="Website package options">
        <div className={styles.pricingGrid}>
          {packages.map((item) => (
            <article
              key={item.name}
              className={`${styles.card} ${item.featured ? styles.featured : ""}`}
            >
              <div className={styles.cardTop}>
                <div>
                  <p className={styles.packageName}>{item.name}</p>
                  {item.badge ? <span className={styles.badge}>{item.badge}</span> : null}
                </div>
                <div className={styles.priceWrap}>
                  <p className={styles.price}>{displayPrice(item)}</p>
                </div>
              </div>

              <p className={styles.description}>{item.description}</p>

              <ul className={styles.features}>
                {item.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <TrackedLink
                href={`/contact?package=${item.name.toLowerCase()}&currency=${currency}`}
                eventName="website_package_contact_click"
                eventData={{ package: item.name.toLowerCase(), source: "packages_page", currency }}
                className={`${styles.cta} ${item.featured ? styles.ctaPrimary : ""}`}
              >
                Discuss {item.name} <ArrowUpRight size={16} />
              </TrackedLink>
            </article>
          ))}
        </div>

        <div className={styles.disclaimer}>
          <strong>About converted prices</strong>
          <p>
            Currency conversions are estimates based on reference exchange rates and may change. The final quotation, invoice currency, scope, timeline and payment terms are confirmed with the client before development starts.
          </p>
        </div>
      </section>

      <section className={styles.processSection} aria-labelledby="package-process-title">
        <div>
          <p className={styles.kicker}>What happens next</p>
          <h2 id="package-process-title">A package is the starting point, not a rigid box.</h2>
        </div>
        <div className={styles.steps}>
          <div><span>01</span><strong>Select</strong><p>Choose the package closest to your website needs.</p></div>
          <div><span>02</span><strong>Scope</strong><p>We confirm pages, content, integrations, timeline and deliverables.</p></div>
          <div><span>03</span><strong>Build</strong><p>Development begins after the final scope and payment terms are approved.</p></div>
        </div>
      </section>
    </main>
  );
}
