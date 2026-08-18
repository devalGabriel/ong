import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTENT_REGISTRY, getRegistryPage } from "@/lib/content/registry";
import { getPageContent } from "@/lib/content/get-page-content";
import { getPageSections } from "@/lib/content/get-page-sections";
import SectionCard from "@/components/admin/SectionCard";
import LivePreviewPanel from "@/components/admin/LivePreviewPanel";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { pageKey } = await params;
  const page = getRegistryPage(pageKey);
  return {
    title: page ? `${page.label} · Texte · Admin` : "Texte · Admin",
    robots: { index: false, follow: false },
  };
}

export default async function AdminContinutEditPage({ params, searchParams }) {
  const { pageKey } = await params;
  const page = getRegistryPage(pageKey);

  if (!page) {
    notFound();
  }

  const query = await searchParams;
  const saved = query?.saved === "1";
  const hasError = query?.error === "1";
  const errorField = query?.field;

  const content = await getPageContent(pageKey);
  const sections = getPageSections(pageKey);

  return (
    <>
      <nav className={styles.tabStrip} aria-label="Pagini disponibile pentru editare">
        {Object.entries(CONTENT_REGISTRY).map(([key, entry]) => (
          <Link key={key} href={`/admin/continut/${key}`} className={`${styles.tab} ${key === pageKey ? styles.tabActive : ""}`}>
            {entry.label}
          </Link>
        ))}
      </nav>

      <div className={styles.editorHeader}>
        <div className={styles.editorHeaderLeft}>
          <h1>Editează pagina: {page.label}</h1>
          <span className={styles.publishedBadge}>Publicat</span>
        </div>
        <Link href={page.route} target="_blank" rel="noreferrer" className={styles.previewLink}>
          Previzualizează ↗
        </Link>
      </div>

      {saved && <p className={`${styles.banner} ${styles.success}`}>Modificările au fost salvate.</p>}
      {hasError && (
        <p className={`${styles.banner} ${styles.error}`} role="alert">
          Nu am putut salva{errorField ? ` câmpul „${errorField}”` : ""}. Verifică lungimea textului și încearcă din nou.
        </p>
      )}

      <div className={styles.layout}>
        <form method="POST" action={`/api/admin/content/${pageKey}`}>
          {sections.map((section, index) => (
            <SectionCard key={section.sectionKey} section={section} pageKey={pageKey} content={content} defaultOpen={index === 0} />
          ))}

          <button type="submit" className="btn-primary">
            Salvează modificările
          </button>
        </form>

        <div className={styles.previewCol}>
          <LivePreviewPanel route={page.route} refreshToken={query?.saved ?? "0"} />
        </div>
      </div>
    </>
  );
}
