import Link from "next/link";
import { site } from "@/data/site";
import styles from "./HeroRefresh.module.css";

export function Hero() {
  return (
    <div id="home" className={styles.journey}>
      <section data-particle-scene="portrait" className={styles.opening} aria-labelledby="identity">
        <div className={styles.heroLabels}>
          <h1 id="identity">Kristy Kate Taylor</h1>
          <p>Software Developer</p>
        </div>
        <div className={styles.openingBottom}>
          <span>PORTFOLIO © 2026</span>
          <a href="#introduction">SCROLL TO EXPLORE ↓</a>
        </div>
      </section>

      <section id="introduction" data-particle-scene="portraitRight" className={styles.introduction} aria-label="An introduction">
        <div className={styles.introductionCopy}>
          <p>I turn complex workflows into dependable software. Information systems, desktop applications, and web platforms—built for people, not just screens.</p>
          <div className={styles.introLinks}><Link href="#work" className={styles.quietLink}>Explore my work ↗</Link><Link href="/contact" className={styles.quietLink}>Get in touch ↗</Link></div>
        </div>
      </section>

      <section data-particle-scene="sphere" className={styles.spherePanel} aria-label="Working remotely">
        <svg data-sphere-type className={styles.sphereType} viewBox="0 0 600 600" role="img" aria-label="Available remotely. Working worldwide.">
          <defs>
            <path id="orbit-above" d="M 20,300 A 280,280 0 0,1 580,300"/>
            <path id="orbit-below" d="M 580,300 A 280,280 0 0,1 20,300"/>
          </defs>
          <text textAnchor="middle"><textPath href="#orbit-above" startOffset="50%">Available remotely</textPath></text>
          <text textAnchor="middle"><textPath href="#orbit-below" startOffset="50%">Working worldwide</textPath></text>
        </svg>
      </section>

      <section data-particle-scene="philippines" className={styles.locationPanel} aria-labelledby="location-title">
        <p id="location-title" data-location-copy>Based in the Philippines<span className={styles.lightDot} /></p>
      </section>

      <section data-particle-scene="ribbon" className={styles.ribbonPanel} aria-label="How I work">
        <p>I don&apos;t just make interfaces look good. I build the systems, data structures, and functionality that make them work.</p>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"Person",name:site.name,url:site.url,
        jobTitle:["Software Developer","Web Developer","Full-Stack Developer"],
        sameAs:[site.github],knowsAbout:["Websites","Web applications","Desktop software","Information systems"]
      }).replace(/</g,"\\u003c") }}/>
    </div>
  );
}
