import Link from "next/link";
import styles from "./home.module.css";
export function HomeAbout() {
  return <section id="about" className={`shell ${styles.about}`} aria-labelledby="about-title"><p className="eyebrow">The person behind the work</p>
    <div className={styles.aboutGrid}><h2 id="about-title">Design is how<br />it makes sense.<br /><span>Engineering is<br />how it holds up.</span></h2><div className={styles.aboutCopy}><p>I’m Kristy, a developer and designer based in the Philippines. I work on local record systems, desktop applications, and websites with their own visual character.</p><p>My work begins with the people using a system: the records they maintain, the decisions they make, and the information they need to trust.</p><Link href="/about" className="text-link">More about my approach <span aria-hidden="true">↗</span></Link><dl className={styles.background}><dt>Education</dt><dd>BS Information Technology<span>University of Science and Technology of Southern Philippines</span></dd></dl></div></div>
  </section>;
}
