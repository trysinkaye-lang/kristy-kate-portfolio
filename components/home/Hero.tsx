import Link from "next/link";
import { site } from "@/data/site";
import styles from "./HeroRefresh.module.css";

const capabilities = [
  { id: "01", label: "Web applications" },
  { id: "02", label: "Offline desktop software" },
  { id: "03", label: "Databases & reporting" },
];

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <div className={["shell", styles.inner].join(" ")}>
        <div className={styles.topline}>
          <span>SOFTWARE DEVELOPMENT / PHILIPPINES</span>
          <span>PORTFOLIO · 2026</span>
        </div>

        <div className={styles.composition}>
          <div className={styles.main}>
            <div className={styles.sender}>
              <span className={styles.signal} aria-hidden="true" />
              <span>A NOTE FROM THE DEVELOPER</span>
            </div>

            <h1 id="identity" className={styles.heading}>
              Have a system
              <span>in mind<span className={styles.question}>?</span></span>
            </h1>

            <p className={styles.lead}>
              I develop web applications and offline desktop software — from the screens
              people use to the databases, access controls, and reports behind them.
            </p>

            <div className={styles.actions}>
              <Link href="#work" className={styles.primary}>Explore my projects <span aria-hidden="true">↗</span></Link>
              <Link href="/contact" className={styles.secondary}>Get in touch <span aria-hidden="true">↗</span></Link>
            </div>
          </div>

          <aside className={styles.capabilities} aria-label="What I develop">
            <div className={styles.capabilitiesHeader}>
              <span>WHAT I BUILD</span>
              <span aria-hidden="true">↗</span>
            </div>
            {capabilities.map(item => (
              <div key={item.id} className={styles.capability}>
                <span className={styles.number}>{item.id}</span>
                <span>{item.label}</span>
              </div>
            ))}
            <div className={styles.capabilitiesFooter}>
              <span>Interface → Logic → Data</span>
              <span aria-hidden="true">/ KT</span>
            </div>
          </aside>
        </div>

        <div className={styles.bottom}>
          <span>REAL WORK / REAL SYSTEMS</span>
          <Link href="#work">PROJECTS BELOW <span aria-hidden="true">↓</span></Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Person", name: site.name, url: site.url,
        jobTitle: ["Software Developer", "Full-Stack Developer"], sameAs: [site.github],
        knowsAbout: ["Web applications", "Offline desktop software", "Information systems", "Database development"]
      }).replace(/</g, "\\u003c") }} />
    </section>
  );
}
