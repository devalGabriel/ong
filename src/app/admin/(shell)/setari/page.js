import { SETTINGS_FIELDS } from "@/lib/settings/fields";
import { getSiteSettings } from "@/lib/settings/get-site-settings";
import SettingsField from "@/components/admin/SettingsField";
import styles from "./page.module.css";

export const metadata = {
  title: "Setări · Admin",
  robots: { index: false, follow: false },
};

const GROUPS = [
  { title: "Organizație", keys: ["organizationName", "legalName", "fiscalCode", "address"] },
  { title: "Contact", keys: ["email", "phone"] },
  { title: "Rețele sociale", keys: ["facebookUrl", "instagramUrl", "tiktokUrl"] },
];

export default async function AdminSetariPage({ searchParams }) {
  const query = await searchParams;
  const saved = query?.saved === "1";
  const hasError = query?.error === "1";
  const errorField = query?.field;

  const settings = await getSiteSettings();

  return (
    <>
      <h1>Setări</h1>
      <p>Date despre organizație, contact și rețele sociale — reutilizate în footer și pagina de contact. Datele bancare și de donații s-au mutat în secțiunea Donații.</p>

      {saved && <p className={`${styles.banner} ${styles.success}`}>Setările au fost salvate.</p>}
      {hasError && (
        <p className={`${styles.banner} ${styles.error}`} role="alert">
          Nu am putut salva{errorField ? ` câmpul „${errorField}”` : ""}. Verifică formatul valorii (email/URL/IBAN) și încearcă din nou.
        </p>
      )}

      <form method="POST" action="/api/admin/settings">
        {GROUPS.map((group) => (
          <section className={styles.section} key={group.title}>
            <h2 className={styles.sectionTitle}>{group.title}</h2>
            <div className={styles.grid}>
              {group.keys.map((key) => {
                const field = SETTINGS_FIELDS.find((item) => item.key === key);
                const wide = field.type === "textarea";
                return (
                  <div className={`${styles.field} ${wide ? styles.fullWidth : ""}`} key={key}>
                    <label htmlFor={`settings-${key}`}>{field.label}</label>
                    <SettingsField field={field} value={settings[key]} />
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <button type="submit" className="btn-primary">
          Salvează
        </button>
      </form>
    </>
  );
}
