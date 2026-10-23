import Link from "next/link";
import styles from "./HomeEditorial.module.css";

export function HomeAbout() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={["shell",styles.aboutInner].join(" ")}>
        <div>
          <p className={styles.marker}>Behind the work / 02</p>
          <h2 id="about-title">From data models to the final screen.</h2>
        </div>
        <div className={styles.aboutCopy}>
          <p>I&apos;m a BS Information Technology graduate from USTP, working across application interfaces, data structures, and the workflows connecting them.</p>
          <p>I’ve worked on RBIM’s municipal data workflows and AHDIS’s offline records and reporting. Those projects shaped how I think about accuracy, usability, and implementation.</p>
          <Link href="/about">More about me <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
