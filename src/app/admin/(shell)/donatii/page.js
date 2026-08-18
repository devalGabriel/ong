import { getSettingsFieldsByGroup } from "@/lib/settings/fields";
import { getSiteSettings } from "@/lib/settings/get-site-settings";
import SettingsField from "@/components/admin/SettingsField";
import styles from "./page.module.css";

export const metadata = {
  title: "Donații · Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDonatiiPage({ searchParams }) {
  const query = await searchParams;
  const saved = query?.saved === "1";
  const hasError = query?.error === "1";
  const errorField = query?.field;

  const settings = await getSiteSettings();
  const fields = getSettingsFieldsByGroup("donations");

  return (
    <>
      <h1>Donații</h1>
      <p>Date bancare și provider de donații online — reutilizate în footer și pe pagina Donează.</p>

      {saved && <p className={`${styles.banner} ${styles.success}`}>Setările au fost salvate.</p>}
      {hasError && (
        <p className={`${styles.banner} ${styles.error}`} role="alert">
          Nu am putut salva{errorField ? ` câmpul „${errorField}”` : ""}. Verifică formatul valorii (URL/IBAN) și încearcă din nou.
        </p>
      )}

      <form method="POST" action="/api/admin/settings">
        <section className={styles.section}>
          <div className={styles.grid}>
            {fields.map((field) => {
              const wide = field.type === "textarea";
              return (
                <div className={`${styles.field} ${wide ? styles.fullWidth : ""}`} key={field.key}>
                  <label htmlFor={`settings-${field.key}`}>{field.label}</label>
                  <SettingsField field={field} value={settings[field.key]} />
                </div>
              );
            })}
          </div>
        </section>

        <button type="submit" className="btn-primary">
          Salvează
        </button>
      </form>
    </>
  );
}
