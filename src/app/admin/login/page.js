import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Autentificare admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const hasError = params?.error === "1";

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1>Autentificare admin</h1>
        <p>Introdu datele de acces pentru a administra site-ul.</p>

        {hasError && (
          <p className={styles.error} role="alert">
            Email sau parolă incorectă.
          </p>
        )}

        <form method="POST" action="/api/admin/login">
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="username" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Parolă</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <button type="submit" className={`btn-primary ${styles.submit}`}>
            Autentificare
          </button>
        </form>

        <Link href="/" className={styles.back}>
          ← Înapoi la site
        </Link>
      </div>
    </div>
  );
}
