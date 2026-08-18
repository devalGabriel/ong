import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { getSystemStatus } from "@/lib/system/status";
import AdminNav from "@/components/admin/AdminNav";
import Topbar from "@/components/admin/Topbar";
import HelpBox from "@/components/admin/HelpBox";
import Logo from "@/components/public/Logo";
import { IconLeafSprig } from "@/components/public/icons";
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

  const [adminUser, status] = await Promise.all([
    prisma.adminUser.findUnique({ where: { id: session.sub } }),
    getSystemStatus(),
  ]);

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <Logo organizationName="Fii Schimbarea" href="/admin" />
        </div>

        <AdminNav />

        <div className={styles.leaf} aria-hidden="true">
          <IconLeafSprig width={90} height={110} />
        </div>

        <HelpBox />
      </aside>

      <div className={styles.content}>
        <Topbar status={status} email={session.email} role={adminUser?.role ?? "ADMIN"} />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
