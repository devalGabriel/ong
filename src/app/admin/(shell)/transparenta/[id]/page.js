import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { DOCUMENT_CATEGORIES } from "@/lib/documents/categories";
import { formatFileSize } from "@/lib/documents/format-size";
import styles from "./page.module.css";

export const metadata = {
  title: "Editează document · Admin",
  robots: { index: false, follow: false },
};

export default async function AdminEditDocumentPage({ params, searchParams }) {
  const { id } = await params;
  const query = await searchParams;
  const saved = query?.saved === "1";
  const hasError = query?.error === "1";

  const doc = await prisma.transparencyDocument.findUnique({ where: { id } });
  if (!doc) {
    notFound();
  }

  return (
    <>
      <Link href="/admin/transparenta" className={styles.back}>
        ← Toate documentele
      </Link>
      <h1>Editează document</h1>

      {saved && <p className={`${styles.banner} ${styles.success}`}>Modificările au fost salvate.</p>}
      {hasError && (
        <p className={`${styles.banner} ${styles.error}`} role="alert">
          Nu am putut salva. Verifică titlul, anul și categoria.
        </p>
      )}

      <form action={`/api/admin/documents/${doc.id}`} method="POST">
        <div className={styles.field}>
          <label htmlFor="doc-title">Titlu</label>
          <input id="doc-title" name="title" type="text" maxLength={200} defaultValue={doc.title} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="doc-year">An</label>
          <input id="doc-year" name="year" type="number" min={2000} max={new Date().getFullYear() + 1} defaultValue={doc.year} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="doc-category">Categorie</label>
          <select id="doc-category" name="category" defaultValue={doc.category}>
            {DOCUMENT_CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="doc-sort">Ordine sortare</label>
          <input id="doc-sort" name="sortOrder" type="number" min={0} defaultValue={doc.sortOrder} />
        </div>
        <div className={styles.checkboxRow}>
          <input id="doc-published" name="published" type="checkbox" defaultChecked={doc.published} />
          <label htmlFor="doc-published">Publicat</label>
        </div>

        <button type="submit" className="btn-primary">
          Salvează
        </button>
      </form>

      <p className={styles.meta}>
        Fișier original: {doc.originalName} · {formatFileSize(doc.sizeBytes)} ·{" "}
        <a href={`/api/documents/${doc.id}`} target="_blank" rel="noreferrer">
          previzualizare
        </a>
      </p>
    </>
  );
}
