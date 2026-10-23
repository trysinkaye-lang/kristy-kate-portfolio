import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site } from "@/data/site";
import styles from "./HomeEditorial.module.css";

export function HomeCTA() {
  return (
    <section className={styles.contact} aria-labelledby="contact-title">
      <div className={["shell", styles.contactInner].join(" ")}>
        <div className={styles.contactLead}>
          <p className={styles.marker}>Contact / Next project</p>
          <h2 id="contact-title">
            Tell me{" "}
            <span>about it.</span>
          </h2>
        </div>

        <div className={styles.contactDetails}>
          <p className={styles.contactInvitation}>
            A website to launch, a web app to develop, or a system to improve?
            I&apos;d like to hear what you&apos;re working on.
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
