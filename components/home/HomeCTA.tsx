import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site } from "@/data/site";
import styles from "./HomeEditorial.module.css";

export function HomeCTA() {
  return (
    <section className={styles.contact} aria-labelledby="contact-title">
      <div className={["shell", styles.contactInner].join(" ")}>
        <div className={styles.contactLead}>
          <p className={styles.marker}>Contact</p>
          <h2 id="contact-title">
            Let&apos;s talk
            <span>projects.</span>
          </h2>
        </div>

        <div className={styles.contactDetails}>
          <p className={styles.contactInvitation}>
            Building a website, web app, desktop application, or information system?
            Tell me what you need and what you want it to do.
          </p>
          <TrackedLink
            className={styles.contactAction}
            href="/contact"
            eventName="contact_start"
            eventData={{ source: "home_contact" }}
          >
            <span>Send a message</span>
            <span className={styles.contactArrow} aria-hidden="true">↗</span>
          </TrackedLink>
          <div className={styles.contactEmail}>
            <span>Or email me directly</span>
            <a href={"mailto:" + site.email}>{site.email}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
