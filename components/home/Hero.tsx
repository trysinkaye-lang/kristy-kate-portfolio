import Link from "next/link";
import { site } from "@/data/site";
import styles from "./HeroRefresh.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <div className={["shell", styles.inner].join(" ")}>
        <div className={styles.kicker}>
          <span>Portfolio / 2026</span>
          <span>Software developer · Philippines</span>
        </div>
        <div className={styles.content}>
          <h1 id="identity">Projects<span className={styles.period}>.</span></h1>
          <div className={styles.intro}>
            <p>Desktop applications, information systems, and websites — from the interface to the data behind it.</p>
            <div className={styles.links}>
              <Link href="/projects">All projects <span aria-hidden="true">↗</span></Link>
              <Link href="/contact">Contact <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
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
