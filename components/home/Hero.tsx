import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import styles from "./HeroRefresh.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <div className={["shell", styles.topline].join(" ")}>
        <p>Kristy Kate Taylor / Portfolio</p>
        <p>Full-stack developer · Philippines</p>
      </div>

      <div className={["shell", styles.content].join(" ")}>
        <div className={styles.copy}>
          <p className={styles.kicker}>Software developer & UI/UX designer</p>
          <h1 id="identity" className={styles.heading}>
            I build <span>useful software.</span>
            <em>And make it feel effortless.</em>
          </h1>
          <p className={styles.lead}>
            I turn complex workflows into practical digital experiences, from information systems
            and offline desktop applications to modern websites.
          </p>
          <div className={styles.actions}>
            <Link href="#work" className={styles.primary}>View projects <span aria-hidden="true">↗</span></Link>
            <Link href="/contact" className={styles.secondary}>Contact me <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <div className={styles.visual}>
          <Link href="/projects/rbim" className={styles.visualCard} aria-label="Explore the RBIM information system case study">
            <div className={styles.preview}>
              <Image
                src="/media/rbim-dashboard.webp"
                alt="RBIM application dashboard screenshot"
                width={640}
                height={341}
                priority
                unoptimized
                sizes="(max-width: 767px) 90vw, (max-width: 1100px) 42vw, 580px"
              />
            </div>
            <div className={styles.visualMeta}>
              <span><small>Featured case study / 01</small><strong>RBIM — Information system</strong></span>
              <span aria-hidden="true">↗</span>
            </div>
          </Link>
        </div>
      </div>

      <div className={["shell", styles.bottom].join(" ")}>
        <p>Building software for real-world needs.</p>
        <p>React · TypeScript · PostgreSQL · Tauri</p>
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
