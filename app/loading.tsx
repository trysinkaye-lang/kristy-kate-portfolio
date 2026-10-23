import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={styles.loading} role="status" aria-live="polite" aria-label="Loading page">
      <div className={styles.content}>
        <p>PORTFOLIO / LOADING</p>
        <div className={styles.track} aria-hidden="true"><span /></div>
        <p className={styles.caption}>Loading page…</p>
      </div>
    </main>
  );
}
