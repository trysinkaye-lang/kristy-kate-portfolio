import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import styles from "./home.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <div className={`shell ${styles.heroTop}`}>
        <p className="eyebrow">Developer · Designer · Builder</p>
        <p className={styles.availabilityStatus}><span aria-hidden="true" /> Available for selected work</p>
      </div>

      <div className={`shell ${styles.heroStage}`}>
        <div className={styles.heroCopy}>
          <p className={styles.heroKicker}>Full-stack developer / UI/UX designer</p>
          <h1 id="identity" className={styles.identity}>
            <span>Kristy Kate</span>
            <em>Taylor.</em>
          </h1>
          <div className={styles.heroLead}>
            <p>I build information systems, desktop applications, and custom websites with a strong visual point of view.</p>
            <div className={styles.heroActions}>
              <Link href="#work" className={styles.primaryAction}>View work <span aria-hidden="true">↓</span></Link>
              <Link href="/contact" className="text-link">Let’s talk <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>

        <figure className={styles.portrait}>
          <div className={styles.portraitFrame}>
            <Image
              src="/media/kristy-kate-professional-portrait-v2.webp"
              alt="Kristy Kate Taylor"
              width={960}
              height={960}
              preload
              sizes="(max-width: 767px) 78vw, (max-width: 1100px) 42vw, 520px"
            />
            <span className={styles.portraitMark} aria-hidden="true">KT</span>
          </div>
          <figcaption><span>Philippines</span><span>Portfolio / 2026</span></figcaption>
        </figure>
      </div>

      <div className={styles.capabilityRail} aria-label="Core capabilities">
        <div className="shell">
          <span>Information systems</span>
          <span>Creative development</span>
          <span>UI/UX</span>
          <span>Full-stack</span>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Person", name: site.name, url: site.url,
        jobTitle: ["Full-Stack Developer", "UI/UX Designer", "Creative Developer"],
        sameAs: [site.github], knowsAbout: ["Information systems", "UI/UX", "Web development", "Databases", "Desktop applications"],
        alumniOf: { "@type": "CollegeOrUniversity", name: "University of Science and Technology of Southern Philippines" },
      }).replace(/</g, "\\u003c") }} />
    </section>
  );
}
