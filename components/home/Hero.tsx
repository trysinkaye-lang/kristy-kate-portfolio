import Link from "next/link";
import { site } from "@/data/site";
import styles from "./HeroLanding.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <div className={`shell ${styles.heroTop}`}>
        <p className={styles.eyebrow}>Portfolio / 2026</p>
        <p className={styles.availabilityStatus}><span aria-hidden="true" /> Open to remote developer roles & selected projects</p>
      </div>

      <div className={`shell ${styles.heroStage}`}>
        <div className={styles.heroCopy}>
          <p className={styles.heroKicker}>Full-stack development · Front-end engineering · UI/UX</p>
          <h1 id="identity" className={styles.identity}>
            <span>Useful systems.</span>
            <em>Sharp interfaces.</em>
          </h1>

          <div className={styles.heroLead}>
            <p>I build production-minded web and desktop applications with React, TypeScript, Next.js, APIs, databases, and offline-first workflows—turning complex requirements into clear, usable software.</p>
            <div className={styles.heroActions}>
              <Link href="#work" className={styles.primaryAction} data-magnetic="true">View case studies <span aria-hidden="true">↓</span></Link>
              <Link href="/contact" className={styles.textAction}>Contact me <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Person", name: site.name, url: site.url,
        jobTitle: ["Full-Stack Developer", "Front-End Developer", "UI/UX Designer", "Creative Developer"],
        sameAs: [site.github], knowsAbout: ["Information systems", "UI/UX", "Web development", "Databases", "Desktop applications"],
        alumniOf: { "@type": "CollegeOrUniversity", name: "University of Science and Technology of Southern Philippines" },
      }).replace(/</g, "\\u003c") }} />
    </section>
  );
}
