import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";
export function HomeAbout() {
  return <section id="about" className={`shell ${styles.about}`} aria-labelledby="about-title"><p className="eyebrow">The person behind the work</p>
    <div className={styles.aboutGrid}><h2 id="about-title">Design is how<br />it makes sense.<br /><span>Engineering is<br />how it holds up.</span></h2><div className={styles.aboutCopy}><Image src="/media/kristy-kate-professional-portrait-v2.webp" width={960} height={960} alt="Kristy Kate Taylor, developer and designer" sizes="160px" /><p>I’m a BS Information Technology graduate working across full-stack development, software systems, UI/UX, websites, databases, and desktop applications.</p><p>My work begins with the people using a system: the records they maintain, the decisions they make, and the information they need to trust.</p><Link href="/about" className="text-link">More about my approach <span aria-hidden="true">↗</span></Link></div></div>
  </section>;
}
