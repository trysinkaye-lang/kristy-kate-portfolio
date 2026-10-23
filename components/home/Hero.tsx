import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import styles from "./HeroRefresh.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <div className={["shell", styles.masthead].join(" ")}>
        <span>Kristy Kate Taylor — Portfolio</span>
        <span>Software developer / Philippines</span>
      </div>

      <div className={["shell", styles.stage].join(" ")}>
        <div className={styles.copy}>
          <p className={styles.kicker}>Software development / Desktop, web & data</p>
          <h1 id="identity" className={styles.name}>
            Kristy Kate <span>Taylor<span className={styles.period}>.</span></span>
          </h1>
          <div className={styles.intro}>
            <p className={styles.role}>Desktop apps.<br />Web systems.</p>
            <div className={styles.pitch}>
              <p>
                My recent work includes RBIM, an offline and online population registry,
                and AHDIS, a desktop application for adolescent health records.
                I work on everything from data models to the interfaces people use.
              </p>
              <div className={styles.links}>
                <Link href="#work" className={styles.mainLink}>Explore projects <span aria-hidden="true">↗</span></Link>
                <Link href="/contact" className={styles.textLink}>Contact me <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </div>
        </div>
        <figure className={styles.portrait}>
          <Image src="/media/kristy-kate-professional-portrait-v2.webp"
            width={960} height={960}
            alt="Professional portrait of Kristy Kate Taylor" priority
            sizes="(max-width: 767px) 68vw, (max-width: 1150px) 26vw, 320px" />
          <figcaption><span>Portrait / 2026</span><span>Kristy Kate Taylor</span></figcaption>
        </figure>
      </div>

      <div className={["shell",styles.footnote].join(" ")}>
        <span>Current focus</span>
        <div><Link href="/projects/rbim">RBIM — population registry ↗</Link><Link href="/projects/ahdis">AHDIS — adolescent health data ↗</Link></div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Person", name: site.name, url: site.url,
        jobTitle: ["Software Developer", "Full-Stack Developer"],
        sameAs: [site.github],
        knowsAbout: ["Information systems", "Full-stack web development", "Desktop applications", "Database development"],
        alumniOf: { "@type": "CollegeOrUniversity", name: "University of Science and Technology of Southern Philippines" },
      }).replace(/</g, "\\u003c") }} />
    </section>
  );
}
