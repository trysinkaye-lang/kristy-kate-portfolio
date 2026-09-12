import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site } from "@/data/site";
import styles from "./home.module.css";

export function HomeCTA() {
  return (
    <section className={`shell ${styles.contact}`} aria-labelledby="contact-title">
      <div>
        <p className="eyebrow">Have something worth building?</p>
        <h2 id="contact-title">Let’s make it<br /><span>real.</span></h2>
      </div>
      <div className={styles.contactAside}>
        <p>Software, websites, or product work.</p>
        <TrackedLink href="/contact" className="text-link" eventName="contact_start" eventData={{ source: "home_contact" }}>Start a conversation <span aria-hidden="true">↗</span></TrackedLink>
        <a href={`mailto:${site.email}`} className={styles.email}>{site.email}</a>
      </div>
    </section>
  );
}
