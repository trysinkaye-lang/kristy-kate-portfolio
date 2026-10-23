import Link from "next/link";
import styles from "./home.module.css";

export function HomeAbout() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={["shell", styles.aboutInner].join(" ")}>
        <p className="eyebrow">The person behind the work</p>
        <div className={styles.aboutGrid}>
          <h2 id="about-title">Code that works.<br /><span>Design that makes sense.</span></h2>
          <div className={styles.aboutCopy}>
            <p>I&apos;m Kristy, a BS Information Technology graduate from USTP. I enjoy finding the simplest usable solution to a complicated technical problem — and building it from interface to database.</p>
            <Link href="/about" className="text-link">About me <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
