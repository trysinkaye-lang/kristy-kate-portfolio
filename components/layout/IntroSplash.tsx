import styles from "./IntroSplash.module.css";

/**
 * Visual-only opening transition. It does not block access to page content
 * or simulate real network progress. CSS makes it disappear on its own,
 * even with JavaScript disabled, and removes it for reduced-motion users.
 */
export function IntroSplash() {
  return (
    <div data-intro-splash className={styles.splash} aria-hidden="true">
      <div className={styles.inner}>
        <div className={styles.top}>
          <span>PORTFOLIO / 2026</span>
          <span>SOFTWARE DEVELOPMENT</span>
        </div>
        <div className={styles.center}>
          <span className={styles.mark}>/</span>
          <span className={styles.word}>Portfolio</span>
        </div>
        <div className={styles.bottom}>
          <span>Opening</span>
          <span className={styles.track}><span className={styles.fill} /></span>
          <span>↗</span>
        </div>
      </div>
    </div>
  );
}
