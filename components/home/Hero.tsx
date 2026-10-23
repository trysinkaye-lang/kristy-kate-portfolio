import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import styles from "./HeroRefresh.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <div className={["shell", styles.topline].join(" ")}>
        <p>Kristy Kate Taylor / Portfolio 2026</p>
        <p>Software developer · Philippines</p>
      </div>

      <div className={["shell",styles.content].join(" ")}>
        <div className={styles.copy}>
          <p className={styles.kicker}><span aria-hidden="true">●</span> Developer / Designer / Problem solver</p>
          <h1 id="identity" className={styles.heading}>
            I build <span>useful software.</span>
            <em>And make it feel effortless.</em>
          </h1>
          <p className={styles.lead}>
            I&apos;m Kristy, a full-stack developer creating information systems, desktop apps,
            and websites. I turn complex workflows into software that feels clear and practical.
          </p>
          <div className={styles.actions}>
            <Link href="#work" className={styles.primary}>
              View projects <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/about" className={styles.secondary}>
              More about me <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <figure className={styles.visual}>
          <div className={styles.portrait}>
            <Image
              src="/media/kristy-kate-professional-portrait-v2.webp"
              width={960}
              height={960}
              alt="Professional portrait of Kristy Kate Taylor"
              priority
              sizes="(max-width: 767px) 78vw, (max-width: 1100px) 35vw, 490px"
            />
          </div>
          <figcaption className={styles.visualMeta}>
            <span>Kristy Kate Taylor</span>
            <span>Software & interface development</span>
          </figcaption>
        </figure>
      </div>

      <div className={["shell",styles.bottom].join(" ")}>
        <p>Build for people. Design for clarity.</p>
        <p>React / TypeScript / PostgreSQL / Tauri / PHP</p>
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
