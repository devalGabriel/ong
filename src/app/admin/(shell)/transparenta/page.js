import Link from "next/link";
import { prisma } from "@/lib/db";
import { DOCUMENT_CATEGORIES, getCategoryLabel } from "@/lib/documents/categories";
import { formatFileSize } from "@/lib/documents/format-size";
import styles from "./page.module.css";

export const metadata = {
  title: "Transparență · Admin",
  robots: { index: false, follow: false },
};

const ERROR_MESSAGES = {
  "file-missing": "Selectează un fișier PDF.",
  metadata: "Verifică titlul, anul, categoria și ordinea de sortare.",
  "file-extension": "Fișierul trebuie să aibă extensia .pdf.",
  "file-mime": "Fișierul nu este de tip PDF (MIME invalid).",
  "file-empty": "Fișierul este gol.",
  "file-size": "Fișierul depășește limita maximă permisă.",
  "file-signature": "Fișierul nu este un PDF valid (semnătură lipsă sau incorectă).",
  "storage-write": "Nu am putut salva fișierul pe disc.",
  "db-write": "Fișierul a fost salvat, dar înregistrarea în baza de date a eșuat. Încearcă din nou.",
};

export default async function AdminTransparentaPage({ searchParams }) {
  const query = await searchParams;
  const uploaded = query?.uploaded === "1";
  const deleted = query?.deleted === "1";
  const fileWarning = query?.fileWarning === "1";
  const errorCode = query?.error;

  const documents = await prisma.transparencyDocument.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <h1>Transparență</h1>
      <p>Administrează documentele PDF publicate pe pagina publică de transparență.</p>

      {uploaded && <p className={`${styles.banner} ${styles.success}`}>Document încărcat cu succes.</p>}
      {deleted && (
        <p className={`${styles.banner} ${styles.success}`}>
          Document șters.{fileWarning ? " (fișierul de pe disc nu a putut fi șters — verifică manual.)" : ""}
        </p>
      )}
      {errorCode && (
        <p className={`${styles.banner} ${styles.error}`} role="alert">
          {ERROR_MESSAGES[errorCode] ?? "A apărut o eroare. Încearcă din nou."}
        </p>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Titlu</th>
            <th>An</th>
            <th>Categorie</th>
            <th>Dimensiune</th>
            <th>Ordine</th>
            <th>Stare</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {documents.length === 0 && (
            <tr>
              <td colSpan={7}>Niciun document încărcat momentan.</td>
            </tr>
          )}
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.title}</td>
              <td>{doc.year}</td>
              <td>{getCategoryLabel(doc.category)}</td>
              <td>{formatFileSize(doc.sizeBytes)}</td>
              <td>{doc.sortOrder}</td>
              <td>
                <span className={`${styles.badge} ${doc.published ? styles.badgePublished : styles.badgeDraft}`}>
                  {doc.published ? "Publicat" : "Ciornă"}
                </span>
              </td>
              <td>
                <div className={styles.rowActions}>
                  <Link href={`/admin/transparenta/${doc.id}`} className={styles.smallBtn}>
                    Editează
                  </Link>
                  <a href={`/api/documents/${doc.id}`} target="_blank" rel="noreferrer" className={styles.smallBtn}>
                    Previzualizare
                  </a>
                  <form action={`/api/admin/documents/${doc.id}`} method="POST">
                    <input type="hidden" name="title" value={doc.title} />
                    <input type="hidden" name="year" value={doc.year} />
                    <input type="hidden" name="category" value={doc.category} />
                    <input type="hidden" name="sortOrder" value={doc.sortOrder} />
                    {!doc.published && <input type="hidden" name="published" value="on" />}
                    <button type="submit" className={styles.smallBtn}>
                      {doc.published ? "Retrage" : "Publică"}
                    </button>
                  </form>
                  <form action={`/api/admin/documents/${doc.id}/delete`} method="POST">
                    <button type="submit" className={`${styles.smallBtn} ${styles.danger}`}>
                      Șterge
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.uploadCard}>
        <h2 style={{ marginTop: 0 }}>Încarcă document nou</h2>
        <form action="/api/admin/documents" method="POST" encType="multipart/form-data">
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label htmlFor="doc-title">Titlu</label>
              <input id="doc-title" name="title" type="text" maxLength={200} required />
            </div>
            <div className={styles.field}>
              <label htmlFor="doc-year">An</label>
              <input id="doc-year" name="year" type="number" min={2000} max={new Date().getFullYear() + 1} defaultValue={new Date().getFullYear()} required />
            </div>
            <div className={styles.field}>
              <label htmlFor="doc-category">Categorie</label>
              <select id="doc-category" name="category" defaultValue={DOCUMENT_CATEGORIES[0].value}>
                {DOCUMENT_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="doc-sort">Ordine sortare</label>
              <input id="doc-sort" name="sortOrder" type="number" min={0} defaultValue={0} />
            </div>
          </div>
          <div className={styles.checkboxRow}>
            <input id="doc-published" name="published" type="checkbox" />
            <label htmlFor="doc-published">Publică imediat</label>
          </div>
          <div className={styles.field} style={{ marginBottom: "var(--space-3)" }}>
            <label htmlFor="doc-file">Fișier PDF</label>
            <input id="doc-file" name="file" type="file" accept=".pdf,application/pdf" required />
          </div>
          <button type="submit" className="btn-primary">
            Încarcă
          </button>
        </form>
      </div>
    </>
  );
}
