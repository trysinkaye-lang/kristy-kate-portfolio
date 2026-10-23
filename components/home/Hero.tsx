import Link from "next/link";
import { site } from "@/data/site";
import styles from "./HeroRefresh.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <div className={["shell", styles.frame].join(" ")}>
        <div className={styles.rail}>
          <span>Software development</span>
          <span>Portfolio / 2026</span>
          <span>Based in the Philippines</span>
        </div>

        <div className={styles.composition}>
          <p className={styles.eyebrow}>Web, desktop &amp; data</p>
          <h1 id="identity" className={styles.title}>
            <span className={styles.titleLine}>
              <span className={styles.index}>01</span>
              <span>Web applications<span className={styles.fullStop}>.</span></span>
            </span>
            <span className={styles.titleLine}>
              <span className={styles.index}>02</span>
              <span>Desktop software<span className={styles.fullStop}>.</span></span>
            </span>
            <span className={[styles.titleLine, styles.editorial].join(" ")}>
              <span className={styles.index}>03</span>
              <span>Information systems<span className={styles.fullStop}>.</span></span>
            </span>
          </h1>
        </div>

        <div className={styles.footer}>
          <div className={styles.summary}>
            <p className={styles.label}>The practice</p>
            <p>I develop the interfaces, application logic, and data workflows behind practical software — from offline records to web-based reporting.</p>
          </div>
          <div className={styles.actions}>
            <Link href="#work">Explore projects <span aria-hidden="true">↗</span></Link>
            <Link href="/contact">Contact <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>Real projects, real workflows</span>
          <span>Scroll to explore <span aria-hidden="true">↓</span></span>
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
