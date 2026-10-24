import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site } from "@/data/site";
import styles from "./HomeEditorial.module.css";

export function HomeCTA() {
  return (
    <section data-particle-scene="frame" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.contactFrame} data-particle-frame-target><div className={["shell",styles.contactInner].join(" ")}>
        <div className={styles.contactPrelude}>
          <p className={styles.contactTag}>GET IN TOUCH</p>
          <h2 id="contact-title">Let&apos;s talk <span>projects.</span></h2>
        </div>
        <a className={styles.bigEmail} href={"mailto:"+site.email}>{site.email}</a>
        <div className={styles.contactFollowup}>
          <p className={styles.contactInvitation}>Building a website, web app, desktop application, or information system?</p>
          <TrackedLink className={styles.contactAction} href="/contact"
          eventName="contact_start" eventData={{ source:"home_contact" }}>
          Send a message <span aria-hidden="true">↗</span>
          </TrackedLink>
        </div>
      </div></div>
    </section>
  );
}
