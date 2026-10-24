import Link from "next/link";
import { site } from "@/data/site";
import { ParticleField } from "./ParticleField";
import styles from "./HeroRefresh.module.css";

const capabilities = [
  { id: "01", label: "Websites & web apps" },
  { id: "02", label: "Offline desktop software" },
  { id: "03", label: "Data systems & reporting" },
];

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <ParticleField />
      <div className={["shell", styles.inner].join(" ")}>
        <div className={styles.topline}>
          <span className={styles.sender}><span className={styles.signal} aria-hidden="true" /> A NOTE FROM THE DEVELOPER</span>
          <span className={styles.index}>KRISTY KATE TAYLOR <span aria-hidden="true">/</span> SOFTWARE DEVELOPER</span>
        </div>
        <div className={styles.composition}>
          <div className={styles.main}>
            <p className={styles.kicker}>Websites. Applications. Systems.</p>
            <h1 id="identity" className={styles.heading}>
              Have a project
              <span>in mind<span className={styles.question}>?</span></span>
            </h1>
            <div className={styles.descriptionRow}>
              <span className={styles.editorialIndex}>[ 01 — THE INTRODUCTION ]</span>
              <div className={styles.introCopy}>
                <p className={styles.lead}>
                  I design and develop websites, web applications, and offline desktop software —
                  from the experience people see to the functionality and data behind it.
                </p>
                <div className={styles.actions}>
                  <Link href="#work" className={styles.primary}>Explore my projects <span aria-hidden="true">↗</span></Link>
                  <Link href="/contact" className={styles.secondary}>Get in touch <span aria-hidden="true">↗</span></Link>
                </div>
              </div>
            </div>
          </div>
          <aside className={styles.capabilities} aria-label="What I develop">
            <div className={styles.capabilitiesHeader}><span>WHAT I BUILD</span><span>↗</span></div>
            {capabilities.map(item => <div key={item.id} className={styles.capability}><span className={styles.number}>{item.id}</span><span>{item.label}</span></div>)}
            <div className={styles.capabilitiesFooter}><span>INTERFACE — LOGIC — DATA</span><span>© 2026</span></div>
          </aside>
        </div>
        <div className={styles.bottom}>
          <span>AVAILABLE FOR SELECT PROJECTS</span>
          <span className={styles.coordinates}>BASED IN THE PHILIPPINES / WORKING WORLDWIDE</span>
          <Link href="#work">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></Link>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Person", name: site.name, url: site.url,
        jobTitle: ["Web Developer", "Software Developer", "Full-Stack Developer"], sameAs: [site.github],
        knowsAbout: ["Website design and development", "Web applications", "Offline desktop software", "Information systems", "Database development"]
      }).replace(/</g, "\\u003c") }} />
    </section>
  );
}
