import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import styles from "./HeroRefresh.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <div className={["shell",styles.frame].join(" ")}>
        <div className={styles.rail}>
          <span>( KT )</span>
          <span>PORTFOLIO — 2026</span>
          <span>01 / 03</span>
        </div>
        <div className={styles.composition}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Kristy Kate Taylor / Software developer</p>
            <h1 id="identity" className={styles.title}>
              Kristy Kate
              <span>Taylor<em>.</em></span>
            </h1>
            <div className={styles.foot}>
              <p>Web applications.<br />Desktop software.<br />Information systems.</p>
              <div className={styles.intro}>
                <p>Full-stack development, from interfaces and application logic to databases and reporting.</p>
                <div className={styles.actions}>
                  <Link href="#work">Explore projects <span aria-hidden="true">↗</span></Link>
                  <Link href="/contact">Contact <span aria-hidden="true">↗</span></Link>
                </div>
              </div>
            </div>
          </div>
          <figure className={styles.portrait}>
            <Image
              src="/media/kristy-kate-professional-portrait-v2.webp"
              width={960} height={960}
              sizes="(max-width: 767px) 34vw, 210px"
              alt="Professional portrait of Kristy Kate Taylor"
              priority
            />
            <figcaption>© KT / 2026</figcaption>
          </figure>
        </div>
        <div className={styles.bottom}>
          <span>Based in the Philippines</span>
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
