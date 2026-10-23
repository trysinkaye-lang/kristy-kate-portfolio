import { services } from "@/data/site";
import styles from "./HomeEditorial.module.css";

export function HomeCapabilities() {
  return (
    <section id="services" className={styles.capabilities} aria-labelledby="capabilities-title">
      <div className="shell">
        <div className={styles.capabilitiesHeader}>
          <p className={styles.marker}>In practice / 03</p>
          <h2 id="capabilities-title">What I work on</h2>
        </div>
        <div className={styles.disciplines}>
          {services.map((service, index) => (
            <details key={service.title}>
              <summary>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.disciplineTitle}>{service.title}</span>
                <span className={styles.plus} aria-hidden="true">+</span>
              </summary>
              <p>{service.items.join(" / ")}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
