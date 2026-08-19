import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import { IconHeart, IconBuilding, IconHeartHand } from "@/components/public/icons";
import { getPageContent } from "@/lib/content/get-page-content";
import { getSiteSettings } from "@/lib/settings/get-site-settings";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact",
  description: "Contactează Asociația Fii Schimbarea — date de contact, formular și program.",
};

const FAQ = [
  { q: "Cum pot deveni voluntar?", a: "Completează formularul din pagina Implică-te și te vom contacta pentru pașii următori." },
  { q: "Cum pot face o donație?", a: "Poți dona online din pagina Donează sau prin transfer bancar, folosind datele publicate acolo." },
  { q: "Pot direcționa 3,5% din impozit?", a: "Da, poți redirecționa până la 3,5% din impozitul pe venit către organizații non-profit înregistrate, conform legislației din România. [DE CONFIGURAT: detalii și formular specifice organizației.]" },
  { q: "Cum pot deveni partener al asociației?", a: "Scrie-ne prin formularul de contact și vom reveni cu detalii despre colaborare." },
];

export default async function ContactPage() {
  const content = await getPageContent("contact");
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Suntem aici pentru tine. <span className="accent">Hai să vorbim!</span>
          </>
        }
        lead={content["hero.lead"]}
        imageSrc="/assets/5-copil-inima.png"
        imageAlt="Copil formând un gest de inimă cu mâinile"
        badgeText="Împreună facem diferența"
      />

      <section id="trimite-mesaj" className="section section-surface">
        <div className={`container ${styles.splitGrid}`}>
          <div className={`card ${styles.formCard}`}>
            <h2>
              Trimite-ne un <span className="accent">mesaj</span>
            </h2>
            <form>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="contact-name">Nume și prenume</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" />
                </div>
              </div>
              <div className={styles.field} style={{ marginBottom: "var(--space-3)" }}>
                <label htmlFor="contact-phone">Telefon (opțional)</label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={styles.field} style={{ marginBottom: "var(--space-3)" }}>
                <label htmlFor="contact-subject">Subiect</label>
                <input id="contact-subject" name="subject" type="text" />
              </div>
              <div className={styles.field} style={{ marginBottom: "var(--space-3)" }}>
                <label htmlFor="contact-message">Mesajul tău</label>
                <textarea id="contact-message" name="message" rows={5} />
              </div>
              <button type="submit" className="btn-primary" disabled aria-describedby="contact-form-note">
                Trimite mesajul
              </button>
              <p id="contact-form-note" className={styles.formNote}>
                [DE CONFIGURAT] Formularul nu trimite încă mesaje — nu există un provider de e-mail configurat. Datele tale nu sunt stocate.
              </p>
            </form>
          </div>

          <div>
            <h2>
              Date de <span className="accent">contact</span>
            </h2>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactIcon}>
                  <IconBuilding width={20} height={20} />
                </span>
                <div>
                  <h3>Adresă</h3>
                  <p>{settings.address || "București, România — Str. Speranței nr. 10, sector 1, Cod poștal 010123"}</p>
                </div>
              </li>
              <li>
                <span className={styles.contactIcon}>
                  <IconHeart width={20} height={20} />
                </span>
                <div>
                  <h3>Email</h3>
                  <p>{settings.email || "contact@fiischimbarea.ro"}</p>
                </div>
              </li>
              <li>
                <span className={styles.contactIcon}>
                  <IconHeartHand width={20} height={20} />
                </span>
                <div>
                  <h3>Telefon</h3>
                  <p>{settings.phone || "+40 712 345 678"}</p>
                  <p className={styles.formNote} style={{ marginTop: "0.15rem" }}>
                    Luni – Vineri: 09:00 – 17:00
                  </p>
                </div>
              </li>
            </ul>
            <p className={styles.formNote} style={{ marginTop: "var(--space-4)" }}>
              Ne poți scrie oricând. Îți vom răspunde în cel mai scurt timp.
            </p>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className={styles.mapPlaceholder}>
          <div className={styles.mapCard}>
            <h2 style={{ marginTop: 0 }}>
              Unde ne <span className="accent">găsești</span>
            </h2>
            <p>Suntem în inima Bucureștiului, aproape de comunitățile pe care le susținem. [DE CONFIGURAT: hartă interactivă — va fi publicată după confirmarea unui provider de hărți.]</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className={`container ${styles.faqGrid}`}>
          <div>
            <h2>Întrebări frecvente</h2>
            {FAQ.map(({ q, a }) => (
              <details className={styles.faqItem} key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
          <div className={styles.helpBox}>
            <Image src="/icons/hand-heart.png" alt="" width={36} height={36} />
            <h3>Ai nevoie de ajutor?</h3>
            <p>Dacă nu găsești răspunsul pe care îl cauți, echipa noastră îți stă la dispoziție.</p>
            <Link href="#trimite-mesaj" className="btn-primary">
              <IconHeart width={16} height={16} strokeWidth={2} /> Scrie-ne acum
            </Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="cta-band">
          <div className="cta-band-image">
            <Image src="/icons/badge.png" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="cta-band-content">
            <p>Împreună putem crea povești de speranță.</p>
            <p>Contactează-ne sau susține-ne misiunea de a fi schimbarea în lume!</p>
          </div>
          <Link href="/doneaza" className="btn-primary">
            <IconHeart width={16} height={16} strokeWidth={2} /> Donează acum
          </Link>
        </div>
      </section>
    </>
  );
}
