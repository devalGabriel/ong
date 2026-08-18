import styles from "./StatusPill.module.css";

export default function StatusPill({ status }) {
  const ok = status?.ok;

  return (
    <span className={styles.pill}>
      <span className={`${styles.dot} ${ok ? styles.ok : styles.bad}`} aria-hidden="true" />
      Stare sistem: {ok ? "Toate bune" : "Probleme detectate"}
    </span>
  );
}
