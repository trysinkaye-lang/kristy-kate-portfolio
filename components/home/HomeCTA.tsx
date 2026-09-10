import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site } from "@/data/site";
import styles from "./home.module.css";
export function HomeCTA() {
  return <section className={`shell ${styles.contact}`} aria-labelledby="contact-title"><div><p className="eyebrow">Have something in mind?</p><h2 id="contact-title">Let’s put it<br /><span>into practice.</span></h2></div><div className={styles.contactAside}><p>A software project, a website, or a role that connects design with development. I’d like to hear about it.</p><TrackedLink href="/contact" className="text-link" eventName="contact_start" eventData={{ source: "home_contact" }}>Start a conversation <span aria-hidden="true">↗</span></TrackedLink><a href={`mailto:${site.email}`} className={styles.email}>{site.email}</a></div></section>;
}
