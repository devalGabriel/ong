import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import { IconHeart, IconHandsRaised } from "@/components/public/icons";
import { getPageContent } from "@/lib/content/get-page-content";
import styles from "./page.module.css";

export const metadata = {
  title: "Noutăți",
  description: "[DE CONFIGURAT: descriere noutăți pentru motoare de căutare]",
};

const FILTERS = ["Toate noutățile", "Proiecte", "Povești din comunitate", "Evenimente", "Resurse", "Anunțuri"];

export default async function NoutatiPage() {
  const content = await getPageContent("noutati");

  return (
    <>
      <PageHero
        title="Noutăți"
        lead={content["hero.lead"]}
        imageSrc="/assets/3-copil-fereastra.png"
        imageAlt="Copil privind pe fereastră, ținând o jucărie de pluș"
        badgeText="Împreună facem diferența"
      />

      <section className="container section">
        <div className={styles.filters}>
          <div className={styles.filterList} role="group" aria-label="Filtrează noutățile după categorie">
            {FILTERS.map((filter, index) => (
              <button key={filter} type="button" className={styles.filterBtn} aria-pressed={index === 0}>
                {filter}
              </button>
            ))}
          </div>
          <form role="search" aria-label="Caută în noutăți">
            <input type="search" name="q" placeholder="Caută în noutăți..." className={styles.searchField} />
          </form>
        </div>

        <div className="empty-state">Momentan nu există noutăți publicate. Primele articole vor fi adăugate în curând.</div>
      </section>

      <section className="container section">
        <div className={styles.newsletterBand}>
          <div>
            <h2 style={{ margin: 0 }}>Abonează-te la newsletter</h2>
            <p style={{ margin: "0.25rem 0 0" }}>Primești lunar povești care inspiră și informații despre proiectele noastre.</p>
          </div>
          <form className={styles.newsletterForm}>
            <input type="email" name="email" placeholder="Adresa ta de e-mail" aria-label="Adresa ta de e-mail" />
            <button type="submit" className="btn-primary" disabled title="[DE CONFIGURAT] Newsletter-ul nu este încă activ">
              <IconHeart width={16} height={16} strokeWidth={2} /> Abonează-te
            </button>
          </form>
        </div>
      </section>

      <section className="container section">
        <div className="cta-band">
          <div className="cta-band-image">
            <Image src="/assets/8-mana-inima.png" alt="" fill sizes="100vw" />
          </div>
          <div className="cta-band-content">
            <p>Fii parte din schimbare!</p>
            <p>Implicarea ta, oricât de mică, poate avea un impact imens în viața cuiva.</p>
          </div>
          <div style={{ display: "flex", gap: "var(--space-3)", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
            <Link href="/doneaza" className="btn-primary">
              <IconHeart width={16} height={16} strokeWidth={2} /> Donează acum
            </Link>
            <Link href="/implica-te" className="btn-secondary">
              <IconHandsRaised width={16} height={16} strokeWidth={2} /> Devino voluntar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
