import { SETTINGS_FIELDS } from "@/lib/settings/fields";
import { getSiteSettings } from "@/lib/settings/get-site-settings";
import styles from "./page.module.css";

export const metadata = {
  title: "Setări · Admin",
  robots: { index: false, follow: false },
};

const GROUPS = [
  { title: "Organizație", keys: ["organizationName", "legalName", "fiscalCode", "address"] },
  { title: "Contact", keys: ["email", "phone"] },
  { title: "Rețele sociale", keys: ["facebookUrl", "instagramUrl", "tiktokUrl"] },
  { title: "Date bancare", keys: ["ibanRon", "ibanEur", "bankName"] },
  { title: "Donații", keys: ["donationProviderType", "donationProviderPublicUrl"] },
];

function renderField(field, value) {
  const inputId = `settings-${field.key}`;
  const commonProps = { id: inputId, name: field.key, maxLength: field.maxLength, defaultValue: value };

  if (field.type === "textarea") {
    return <textarea rows={3} {...commonProps} />;
  }

  if (field.type === "select") {
    return (
      <select id={inputId} name={field.key} defaultValue={value}>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  const htmlType = field.type === "iban" ? "text" : field.type;
  return <input type={htmlType} {...commonProps} />;
}

export default async function AdminSetariPage({ searchParams }) {
  const query = await searchParams;
  const saved = query?.saved === "1";
  const hasError = query?.error === "1";
  const errorField = query?.field;

  const settings = await getSiteSettings();

  return (
    <>
      <h1>Setări</h1>
      <p>Date despre organizație, contact, rețele sociale, cont bancar și provider de donații — reutilizate în footer, contact și pagina de donații.</p>

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
                    {renderField(field, settings[key])}
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
