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
          <p className={styles.kicker}>
            <span className={styles.kickerLine} aria-hidden="true" />
            Welcome to my portfolio
          </p>
          <h1 id="identity" className={styles.heading}>
            <span>From complexity</span>
            <em>to clarity.</em>
          </h1>
          <p className={styles.lead}>
            I&apos;m Kristy Kate Taylor, a full-stack developer building digital tools
            that make complicated work easier — from information systems and desktop
            applications to thoughtful websites.
          </p>
          <div className={styles.actions}>
            <Link href="#work" className={styles.primary}>
              Explore projects <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/contact" className={styles.secondary}>
              Get in touch <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className={styles.detail}>Software development <span aria-hidden="true">/</span> Interface design <span aria-hidden="true">/</span> Problem-solving</p>
        </div>

        <figure className={styles.visual}>
          <div className={styles.portrait}>
            <Image
              src="/media/kristy-kate-professional-portrait-v2.webp"
              width={960}
              height={960}
              alt="Professional portrait of Kristy Kate Taylor"
              priority
              sizes="(max-width: 767px) 78vw, (max-width: 1100px) 32vw, 380px"
            />
          </div>
          <figcaption className={styles.visualMeta}>
            <span>Kristy Kate Taylor</span>
            <span>Full-stack software developer</span>
          </figcaption>
        </figure>
      </div>

      <div className={["shell", styles.bottom].join(" ")}>
        <p>Thoughtful code. Practical solutions.</p>
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
