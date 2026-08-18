import Link from "next/link";
import { notFound } from "next/navigation";
import { getRegistryPage } from "@/lib/content/registry";
import { getPageContent } from "@/lib/content/get-page-content";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { pageKey } = await params;
  const page = getRegistryPage(pageKey);
  return {
    title: page ? `${page.label} · Conținut · Admin` : "Conținut · Admin",
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

  return (
    <>
      <Link href="/admin/continut" className={styles.back}>
        ← Toate paginile
      </Link>
      <h1>{page.label}</h1>
      <p>Editează textele disponibile pentru această pagină. Structura și designul paginii nu se modifică.</p>

      {saved && <p className={`${styles.banner} ${styles.success}`}>Modificările au fost salvate.</p>}
      {hasError && (
        <p className={`${styles.banner} ${styles.error}`} role="alert">
          Nu am putut salva{errorField ? ` câmpul „${errorField}”` : ""}. Verifică lungimea textului și încearcă din nou.
        </p>
      )}

      <form method="POST" action={`/api/admin/content/${pageKey}`}>
        {page.fields.map((field) => {
          const key = `${field.sectionKey}.${field.contentKey}`;
          const inputId = `field-${pageKey}-${field.sectionKey}-${field.contentKey}`;

          return (
            <div className={styles.field} key={key}>
              <label htmlFor={inputId}>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea id={inputId} name={key} rows={4} maxLength={field.maxLength} defaultValue={content[key]} />
              ) : (
                <input id={inputId} name={key} type="text" maxLength={field.maxLength} defaultValue={content[key]} />
              )}
              <span className={styles.hint}>Maximum {field.maxLength} de caractere. Lasă gol pentru a reveni la textul implicit.</span>
            </div>
          );
        })}

        <button type="submit" className="btn-primary">
          Salvează
        </button>
      </form>
    </>
  );
}
