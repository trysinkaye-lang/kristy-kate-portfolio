import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import styles from "./HeroRefresh.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <div className={["shell", styles.topline].join(" ")}>
        <p>Independent developer / Portfolio 2026</p>
        <p className={styles.status}><i aria-hidden="true" /> Open to software opportunities</p>
      </div>

      <div className={["shell", styles.content].join(" ")}>
        <div className={styles.copy}>
          <p className={styles.kicker}>Hi, I&apos;m Kristy Kate Taylor</p>
          <h1 id="identity" className={styles.heading}>
            I build <span>useful software.</span>
            <em>And make it feel effortless.</em>
          </h1>
          <p className={styles.lead}>
            Full-stack developer turning complicated workflows into clear, practical digital experiences — from data-rich information systems and offline desktop apps to thoughtful websites.
          </p>
          <div className={styles.actions}>
            <Link href="#work" className={styles.primary} data-magnetic="true">
              Explore work <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/contact" className={styles.secondary}>
              Get in touch <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <Link className={styles.visualCard} href="/projects/rbim" aria-label="Explore the RBIM information system case study">
            <span className={styles.browser} aria-hidden="true">
              <i /><i /><i /><span>RBIM / SYSTEM PREVIEW</span>
            </span>
            <span className={styles.preview}>
              <Image
                src="/media/rbim-dashboard.webp"
                alt="RBIM application dashboard screenshot"
                width={640}
                height={341}
                priority
                unoptimized
                sizes="(max-width: 767px) 85vw, (max-width: 1100px) 40vw, 580px"
              />
            </span>
            <span className={styles.visualMeta}>
              <span><small>Featured project · 01</small><strong>Records, reporting, and real-world workflows.</strong></span>
              <b aria-hidden="true">↗</b>
            </span>
          </Link>
          <div className={styles.floatingTag} aria-hidden="true">
            <span>Engineering meets UX</span>
            <strong>Offline + online systems</strong>
          </div>
        </div>
      </div>

      <div className={["shell", styles.bottom].join(" ")}>
        <p>Based in the Philippines · Building for the real world</p>
        <div className={styles.stack} aria-label="Selected technologies">
          {["React", "TypeScript", "Node.js", "PostgreSQL", "Tauri"].map(technology => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Person", name: site.name, url: site.url,
        jobTitle: ["Full-Stack Developer", "Software Developer", "UI/UX Designer"],
        sameAs: [site.github],
        knowsAbout: ["Information systems", "Full-stack web development", "Desktop applications", "Databases", "UI/UX design"],
        alumniOf: { "@type": "CollegeOrUniversity", name: "University of Science and Technology of Southern Philippines" },
      }).replace(/</g, "\\u003c") }} />
    </section>
  );
}
