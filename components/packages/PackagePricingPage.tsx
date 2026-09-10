"use client";

import { useEffect, useMemo, useState } from "react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import styles from "./PackagePricingPage.module.css";

const currencyMeta = {
  PHP: { label: "Philippine Peso" },
  USD: { label: "US Dollar" },
  EUR: { label: "Euro" },
  GBP: { label: "British Pound" },
  CAD: { label: "Canadian Dollar" },
  AUD: { label: "Australian Dollar" },
  SGD: { label: "Singapore Dollar" },
  JPY: { label: "Japanese Yen" },
  NZD: { label: "New Zealand Dollar" },
  CHF: { label: "Swiss Franc" },
  INR: { label: "Indian Rupee" },
  KRW: { label: "South Korean Won" },
  MYR: { label: "Malaysian Ringgit" },
  THB: { label: "Thai Baht" },
} as const;

type CurrencyCode = keyof typeof currencyMeta;

type PackageDefinition = {
  name: string;
  priceMin: number;
  priceMax?: number;
  description: string;
  note?: string;
  features: string[];
};

const packages: PackageDefinition[] = [
  {
    name: "Basic",
    priceMin: 15000,
    description: "A focused website for individuals, professionals, and small brands that need a clear, credible online presence.",
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
    note: "Most flexible starting point",
    description: "For established professionals, authors, consultants and brands that need stronger presentation, richer content and polished interaction.",
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
    description: "A fully custom experience for clients who need richer content, advanced interaction, individual content pages and easier long-term management.",
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

function isCurrencyCode(value: string): value is CurrencyCode {
  return value in currencyMeta;
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
    const controller = new AbortController();
    async function loadRates() {
      try {
        const response = await fetch("/api/exchange-rates", {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Unable to load rates");
        const data = (await response.json()) as { date?: string | null; rates?: Record<string, number> };
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
  };

  const displayPrice = (item: PackageDefinition) => {
    if (!rate) return "Rate unavailable";
    const min = formatMoney(Math.round(item.priceMin * rate), currency);
    if (!item.priceMax) return min;
    return `${min}–${formatMoney(Math.round(item.priceMax * rate), currency)}`;
  };

  return (
    <main id="main-content" className={styles.page}>
      <section className={`shell ${styles.hero}`} aria-labelledby="packages-title">
        <div className={styles.heroIndex}>
          <p className="eyebrow">Website commissions</p>
          <span className="caption">Three starting points / scope stays flexible</span>
        </div>
        <div className={styles.heroStatement}>
          <h1 id="packages-title">A clear starting point.<br /><span>Not a template.</span></h1>
          <p>Website packages for professionals, authors, consultants and brands. The final scope, timeline and deliverables are agreed before development begins.</p>
        </div>
        <div className={styles.currency}>
          <label htmlFor="package-currency">View prices in</label>
          <select id="package-currency" value={currency} onChange={(event) => changeCurrency(event.target.value)}>
            {(Object.keys(currencyMeta) as CurrencyCode[]).map((code) => (
              <option key={code} value={code}>{code} — {currencyMeta[code].label}</option>
            ))}
          </select>
          <p aria-live="polite">
            {currency === "PHP"
              ? "Base pricing in Philippine Peso."
              : rateStatus === "loading"
                ? "Loading reference exchange rate…"
                : rateStatus === "error" || !rate
                  ? "Live conversion unavailable; base PHP prices remain valid."
                  : `Approximate ${selectedCurrency.label} conversion${rateDate ? ` · rates dated ${rateDate}` : ""}.`}
          </p>
        </div>
      </section>

      <section className={`shell ${styles.pricing}`} aria-label="Website package options">
        {packages.map((item, index) => (
          <article key={item.name} className={styles.package}>
            <header className={styles.packageHead}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{item.name}</h2>
                {item.note ? <p className={styles.note}>{item.note}</p> : null}
              </div>
              <p className={styles.price}>{displayPrice(item)}</p>
            </header>
            <div className={styles.packageBody}>
              <p className={styles.description}>{item.description}</p>
              <ul className={styles.features}>
                {item.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <TrackedLink
                href={`/contact?package=${item.name.toLowerCase()}&currency=${currency}`}
                eventName="package_open"
                eventData={{ package: item.name.toLowerCase(), source: "packages_page", currency }}
                className="text-link"
              >
                Discuss {item.name} <span aria-hidden="true">↗</span>
              </TrackedLink>
            </div>
          </article>
        ))}
        <div className={styles.disclaimer}>
          <span className="eyebrow">Reference pricing</span>
          <p>Converted prices are estimates and may change with exchange rates. The final quotation, invoice currency, project scope, timeline and payment terms are confirmed before development starts.</p>
        </div>
      </section>

      <section className={`shell ${styles.process}`} aria-labelledby="package-process-title">
        <div>
          <p className="eyebrow">How it begins</p>
          <h2 id="package-process-title">Scope before software.</h2>
        </div>
        <ol>
          <li><span>01</span><div><strong>Select</strong><p>Choose the starting point closest to what you need.</p></div></li>
          <li><span>02</span><div><strong>Define</strong><p>We confirm pages, content, integrations, deliverables and timeline.</p></div></li>
          <li><span>03</span><div><strong>Build</strong><p>Development begins after scope and payment terms are approved.</p></div></li>
        </ol>
      </section>
    </main>
  );
}
