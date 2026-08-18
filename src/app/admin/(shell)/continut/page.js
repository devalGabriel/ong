import Link from "next/link";
import { CONTENT_REGISTRY } from "@/lib/content/registry";
import styles from "./page.module.css";

export const metadata = {
  title: "Conținut · Admin",
  robots: { index: false, follow: false },
};

export default function AdminContinutListPage() {
  const pages = Object.entries(CONTENT_REGISTRY);

  return (
    <>
      <h1>Conținut</h1>
      <p>Alege o pagină pentru a edita textele disponibile pentru administrare.</p>
      <ul className={styles.list}>
        {pages.map(([pageKey, page]) => (
          <li key={pageKey}>
            <Link href={`/admin/continut/${pageKey}`}>
              <span>{page.label}</span>
              <span className={styles.fieldCount}>{page.fields.length} câmpuri</span>
            </Link>
          </li>
        ))}
      </ul>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginTop: "var(--space-4)" }}>
        Pagina Donează nu are încă un formular de conținut — structura ei finală este implementată în Stage 9.
      </p>
    </>
  );
}
