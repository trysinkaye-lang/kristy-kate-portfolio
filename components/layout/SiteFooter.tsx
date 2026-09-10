import { site } from "@/data/site";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import styles from "./layout.module.css";
export function SiteFooter() {
  return <footer className={styles.footer}><div className={`shell ${styles.footerInner}`}>
    <p>© {new Date().getFullYear()} Kristy Kate Taylor · Design & development</p>
    <div className={styles.footerLinks}><TrackedLink href={site.github} eventName="github_open" eventData={{ source: "footer" }} target="_blank" rel="noreferrer">GitHub</TrackedLink><TrackedLink href={`mailto:${site.email}`} eventName="contact_start" eventData={{ source: "footer_email" }}>Email</TrackedLink></div>
    <a href="#main-content">Back to top ↑</a>
  </div></footer>;
}
