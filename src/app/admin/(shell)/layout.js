import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";
import AdminNav from "@/components/admin/AdminNav";
import styles from "./layout.module.css";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminShellLayout({ children }) {
  const cookieStore = await cookies();
  const session = await getSessionFromCookies(cookieStore);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <p className={styles.brand}>[Numele Organizației] · Admin</p>
        <AdminNav />
        <Link href="/" target="_blank" rel="noreferrer" className={styles.viewSite}>
          Vezi site ↗
        </Link>
        <div className={styles.userRow}>
          <p className={styles.userEmail}>{session.email}</p>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className={styles.logoutBtn}>
              Deconectare
            </button>
          </form>
        </div>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
