import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site } from "@/data/site";
import styles from "./home.module.css";

export function HomeCTA() {
  return (
    <section className={styles.contact} aria-labelledby="contact-title">
      <div className={["shell", styles.contactInner].join(" ")}>
        <div>
          <p className="eyebrow">Open to building the next thing</p>
          <h2 id="contact-title">Let&apos;s build <span>better.</span></h2>
        </div>
        <div className={styles.contactAside}>
          <TrackedLink href="/contact" className={styles.contactButton} eventName="contact_start" eventData={{ source: "home_contact" }}>
            Get in touch <span aria-hidden="true">↗</span>
          </TrackedLink>
          <a href={"mailto:" + site.email} className={styles.email}>{site.email}</a>
        </div>
      </div>
    </section>
  );
}
