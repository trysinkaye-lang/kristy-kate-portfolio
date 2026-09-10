import Image from "next/image";
import Link from "next/link";
import { stack } from "@/data/site";
import { HomeCTA } from "@/components/home/HomeCTA";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/styles/pages.module.css";
export const metadata = pageMetadata("About", "Meet Kristy Kate Taylor: BS Information Technology graduate working across full-stack development, information systems, UI/UX, and creative websites.", "/about");
export default function AboutPage() {
  return <main id="main-content" tabIndex={-1}>
    <section className={`shell ${styles.page} ${styles.aboutIntro}`}><p className="eyebrow">About Kristy Kate Taylor</p><div className={styles.aboutOpening}><div><h1>Between design<br /><span>& engineering.</span></h1><p>I work across the parts of a product that people see and the systems they depend on.</p></div><figure><Image src="/media/kristy-kate-professional-portrait-v2.webp" width={960} height={960} alt="Professional portrait of Kristy Kate Taylor" priority sizes="(max-width: 767px) 70vw, 340px" /><figcaption>Kristy Kate Taylor · Philippines</figcaption></figure></div>
    <div className={styles.biography}><h2>Software should respect<br />the people using it.</h2><div><p>I’m a BS Information Technology graduate from the University of Science and Technology of Southern Philippines. My work spans full-stack development, software systems, UI/UX, websites, databases, and desktop applications.</p><p>In RBIM and AHDIS, that means thinking through how records are captured, validated, stored, and reported. In website work, it means developing a visual language and implementing it with care across devices.</p><p>I connect requirements analysis, data modeling, application development, and interface design. Those decisions belong in the same conversation.</p><Link href="/projects" className="text-link">See the work <span aria-hidden="true">↗</span></Link></div></div></section>
    <section className={styles.method}><div className="shell"><p className="eyebrow">How I work</p><div className={styles.methodRows}>{[
      ["Understand the workflow", "Start with the records, tasks, constraints, and decisions. Map the places where information gets lost or work becomes difficult."],
      ["Give information structure", "Define relationships, validation rules, and access needs. Establish the application’s logic before polishing its surfaces."],
      ["Design the experience", "Turn that structure into clear hierarchy, predictable interaction, and responsive layouts. Make important states understandable."],
      ["Build, test, refine", "Implement the whole flow, check it across devices, and revisit assumptions when the application’s behavior exposes a better approach."]
    ].map(([title, copy]) => <div key={title}><h2>{title}</h2><p>{copy}</p></div>)}</div></div></section>
    <section className={`shell ${styles.toolbox}`}><div><p className="eyebrow">Technical vocabulary</p><h2>The tools follow<br />the problem.</h2></div><dl>{Object.entries(stack).map(([label, items]) => <div key={label}><dt>{label}</dt><dd>{items.join(" / ")}</dd></div>)}</dl></section>
    <HomeCTA />
  </main>;
}
