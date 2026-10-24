import styles from "./IntroSplash.module.css";
/** Brief nonblocking entrance, not a simulated download percentage. */
export function IntroSplash() {
  return <div data-intro-splash className={styles.splash} aria-hidden="true">
    <span className={styles.dust} />
    <span className={styles.name}>KRISTY KATE TAYLOR</span>
    <span className={styles.label}>SOFTWARE DEVELOPER</span>
  </div>;
}
