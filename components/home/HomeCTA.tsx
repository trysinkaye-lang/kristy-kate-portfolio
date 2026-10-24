import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site } from "@/data/site";
import styles from "./HomeEditorial.module.css";

export function HomeCTA() {
  return (
    <section data-particle-scene="frame" className={styles.contact} aria-labelledby="contact-title">
      <div className={["shell",styles.contactInner].join(" ")}>
        <p className={styles.contactTag}>GET IN TOUCH</p>
        <a className={styles.bigEmail} href={"mailto:"+site.email}>{site.email}</a>
        <h2 id="contact-title">Let&apos;s talk <span>projects.</span></h2>
        <p className={styles.contactInvitation}>Building a website, web app, desktop application, or information system?</p>
        <TrackedLink className={styles.contactAction} href="/contact"
          eventName="contact_start" eventData={{ source:"home_contact" }}>
          Send a message <span aria-hidden="true">↗</span>
        </TrackedLink>
        <div className={styles.contactEmail}><span>Or email me directly</span><a href={"mailto:"+site.email}>{site.email}</a></div>
      </div>
    </section>
  );
}
