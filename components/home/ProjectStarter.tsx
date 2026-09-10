"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./project-starter.module.css";

type Need = "portfolio" | "business" | "system" | "redesign" | "app";
type Priority = "identity" | "customers" | "ux" | "operations" | "data";
type Size = "small" | "medium" | "large" | "unsure";

const needs: { value: Need; label: string }[] = [
  { value: "portfolio", label: "Portfolio" },
  { value: "business", label: "Business website" },
  { value: "system", label: "Information system" },
  { value: "redesign", label: "Website redesign" },
  { value: "app", label: "Custom web application" },
];

const priorities: { value: Priority; label: string }[] = [
  { value: "identity", label: "Strong visual identity" },
  { value: "customers", label: "More customer inquiries" },
  { value: "ux", label: "Better UX" },
  { value: "operations", label: "Internal operations" },
  { value: "data", label: "Data & reporting" },
];

const sizes: { value: Size; label: string }[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "unsure", label: "Not sure yet" },
];

function recommend(need: Need, priority: Priority, size: Size) {
  if (need === "system" || need === "app" || priority === "operations" || priority === "data") {
    return size === "large"
      ? { packageName: "Premium / custom scope", slug: "premium", message: "This needs discovery, architecture and a custom implementation plan." }
      : { packageName: "Professional / custom scope", slug: "professional", message: "A structured discovery phase is the right starting point before implementation." };
  }

  if (size === "small" && need === "portfolio") {
    return { packageName: "Basic", slug: "basic", message: "A focused portfolio build should cover the essential pages without over-scoping the project." };
  }

  if (size === "large" || priority === "identity" || priority === "customers") {
    return { packageName: "Premium", slug: "premium", message: "A more art-directed build gives room for stronger interaction, content structure and conversion work." };
  }

  return { packageName: "Professional", slug: "professional", message: "This is the strongest middle ground for custom design, responsive development and launch support." };
}

export function ProjectStarter() {
  const [need, setNeed] = useState<Need>("business");
  const [priority, setPriority] = useState<Priority>("ux");
  const [size, setSize] = useState<Size>("medium");
  const recommendation = useMemo(() => recommend(need, priority, size), [need, priority, size]);

  const contactHref = `/contact?package=${recommendation.slug}&project=${need}&priority=${priority}&size=${size}`;

  return (
    <section className={styles.starter} aria-labelledby="project-starter-title">
      <div className={`shell ${styles.inner}`}>
        <header className={styles.header}>
          <p className={styles.kicker}>For prospective clients</p>
          <h2 id="project-starter-title">What are we building?</h2>
          <p>Choose a direction. I’ll show you the most sensible starting point instead of forcing every project into the same package.</p>
        </header>

        <div className={styles.builder}>
          <fieldset className={styles.step}>
            <legend><span>01</span> What do you need?</legend>
            <div className={styles.options}>
              {needs.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={need === option.value ? styles.activeOption : ""}
                  aria-pressed={need === option.value}
                  onClick={() => setNeed(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.step}>
            <legend><span>02</span> What matters most?</legend>
            <div className={styles.options}>
              {priorities.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={priority === option.value ? styles.activeOption : ""}
                  aria-pressed={priority === option.value}
                  onClick={() => setPriority(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.step}>
            <legend><span>03</span> How large is the scope?</legend>
            <div className={styles.options}>
              {sizes.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={size === option.value ? styles.activeOption : ""}
                  aria-pressed={size === option.value}
                  onClick={() => setSize(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <aside className={styles.result} aria-live="polite">
            <p className={styles.resultLabel}>Recommended starting point</p>
            <strong>{recommendation.packageName}</strong>
            <p>{recommendation.message}</p>
            <div className={styles.resultLinks}>
              <Link href={contactHref}>Start this project <span aria-hidden="true">↗</span></Link>
              <Link href="/packages">Compare packages & currencies <span aria-hidden="true">→</span></Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
