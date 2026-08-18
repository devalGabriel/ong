import styles from "./layout.module.css";

export const metadata = {
  title: "Dashboard admin",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      <p>Bine ai venit în panoul de administrare.</p>
      <ul>
        <li>Conținut — administrare texte pagini (disponibil din Stage 6)</li>
        <li>Transparență — administrare documente PDF (disponibil din Stage 8)</li>
        <li>Setări — date organizație și configurare (disponibil din Stage 7)</li>
      </ul>
    </>
  );
}
