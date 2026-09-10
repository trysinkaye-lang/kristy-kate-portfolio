import { services } from "@/data/site";
import styles from "./home.module.css";
export function HomeCapabilities() {
  return <section id="services" className={styles.capabilities} aria-labelledby="capabilities-title"><div className="shell">
    <div className={styles.capabilitiesHeading}><p className="eyebrow">Capabilities</p><h2 id="capabilities-title">From the first question<br />to the working product.</h2></div>
    <div className={styles.disciplines}>{services.map(service => <details key={service.title}><summary><span>{service.title}</span><span className={styles.disciplineDescription}>{service.description}</span><span className={styles.plus} aria-hidden="true">+</span></summary><p>{service.items.join(" · ")}</p></details>)}</div>
  </div></section>;
}
