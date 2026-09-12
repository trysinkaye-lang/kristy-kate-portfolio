"use client";

import { useEffect, useState } from "react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import styles from "./PackagePricingPage.module.css";

import { currencyMeta, packages, isCurrencyCode, type CurrencyCode, type PackageDefinition } from "@/data/packages";

function formatMoney(amount: number, currency: CurrencyCode) {
  return new Intl.NumberFormat("en-PH", {
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
  const [ratesRequested, setRatesRequested] = useState(false);

  useEffect(() => {
    if (!ratesRequested) return;
    const controller = new AbortController();
    async function loadRates() {
      try {
        const response = await fetch("/api/exchange-rates", {
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10_000)]),
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Unable to load rates");
        const data = (await response.json()) as { date?: string | null; rates?: Record<string, number> };
        setRates(data.rates ?? {});
        setRateDate(data.date ?? null);
        setRateStatus("ready");
      } catch {
        if (controller.signal.aborted) return;
        setRateStatus("error");
      }
    }
    void loadRates();
    return () => controller.abort();
  }, [ratesRequested]);

  const rate = currency === "PHP" ? 1 : rates[currency];
  const selectedCurrency = currencyMeta[currency];

  const changeCurrency = (value: string) => {
    if (!isCurrencyCode(value)) return;
    setCurrency(value);
    if (value !== "PHP") setRatesRequested(true);
  };

  const displayPrice = (item: PackageDefinition) => {
    if (!Number.isFinite(rate) || rate <= 0) {
      const base = formatMoney(item.priceMin, "PHP");
      return `${base}${item.priceMax ? `–${formatMoney(item.priceMax, "PHP")}` : ""} PHP`;
    }
    const min = formatMoney(Math.round(item.priceMin * rate), currency);
    if (!item.priceMax) return min;
    return `${min}–${formatMoney(Math.round(item.priceMax * rate), currency)}`;
  };

  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
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
