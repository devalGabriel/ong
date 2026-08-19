import { getRegistryStats } from "@/lib/content/get-registry-stats";
import { IconPages, IconDashboard, IconCalendar, IconCheck } from "@/components/admin/icons";
import styles from "./page.module.css";

export const metadata = {
  title: "Dashboard admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const stats = await getRegistryStats();

  const lastUpdatedLabel = stats.lastUpdatedAt
    ? new Intl.DateTimeFormat("ro-RO", { dateStyle: "long" }).format(stats.lastUpdatedAt)
    : "—";

  const cards = [
    { icon: IconPages, label: "Pagini active", value: `${stats.pageCount}`, caption: `din ${stats.pageCount} pagini` },
    { icon: IconDashboard, label: "Secțiuni editabile", value: `${stats.totalFields}`, caption: "câmpuri" },
    { icon: IconCalendar, label: "Ultima actualizare", value: lastUpdatedLabel, caption: stats.lastUpdatedAt ? "" : "niciun text salvat încă" },
    { icon: IconCheck, label: "Texte personalizate", value: `${stats.publishedPct}%`, caption: "din total câmpuri" },
  ];

  return (
    <>
      <div className={styles.intro}>
        <h1>Dashboard</h1>
        <p>Bine ai venit în panoul de administrare.</p>
      </div>

      <div className={styles.statsGrid}>
        {cards.map(({ icon: Icon, label, value, caption }) => (
          <div className={styles.statCard} key={label}>
            <span className={styles.statIcon}>
              <Icon />
            </span>
            <div className={styles.statText}>
              <p className={styles.statLabel}>{label}</p>
              <p className={styles.statValue}>{value}</p>
              {caption && <p className={styles.statCaption}>{caption}</p>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
