import Link from "next/link";
import { site } from "@/data/site";
import styles from "./HeroRefresh.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <div className={["shell", styles.frame].join(" ")}>
        <div className={styles.overline}>
          <span>01 / Introduction</span>
          <span>Software developer · Philippines</span>
        </div>

        <div className={styles.content}>
          <div className={styles.headingBlock}>
            <p className={styles.eyebrow}>Web applications / Desktop systems / Data</p>
            <h1 id="identity" className={styles.heading}>
              Web &amp; desktop <span>development.</span>
            </h1>
          </div>

          <div className={styles.details}>
            <p>
              I develop software for web and desktop — from user interfaces and application
              logic to databases, record management, and reporting.
            </p>
            <div className={styles.actions}>
              <Link href="#work" className={styles.primary}>View projects <span aria-hidden="true">↗</span></Link>
              <Link href="/contact" className={styles.secondary}>Contact <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>

        <div className={styles.footnote}>
          <span>Portfolio / 2026</span>
          <span>Selected projects below <span aria-hidden="true">↓</span></span>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
        "@context":"https://schema.org","@type":"Person",name:site.name,url:site.url,
        jobTitle:["Software Developer","Full-Stack Developer"],sameAs:[site.github],
        knowsAbout:["Web applications","Desktop applications","Information systems","Database development"]
      }).replace(/</g,"\\u003c")}} />
    </section>
  );
}
