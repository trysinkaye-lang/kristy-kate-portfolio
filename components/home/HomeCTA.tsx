import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site } from "@/data/site";
import styles from "./HomeEditorial.module.css";

export function HomeCTA() {
  return (
    <section className={styles.contact} aria-labelledby="contact-title">
      <div className={["shell",styles.contactInner].join(" ")}>
        <div>
          <p className={styles.marker}>Contact / 04</p>
          <h2 id="contact-title">Get in touch.</h2>
        </div>
        <div className={styles.contactLinks}>
          <TrackedLink href="/contact" eventName="contact_start"
            eventData={{source:"home_contact"}}>Send a message <span aria-hidden="true">↗</span></TrackedLink>
          <a href={"mailto:" + site.email}>{site.email}</a>
        </div>
      </div>
    </section>
  );
}
