import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import { IconHeart, IconLeaf } from "@/components/public/icons";
import { getPageContent } from "@/lib/content/get-page-content";
import { getPublishedDocuments } from "@/lib/documents/get-published-documents";
import { getCategoryLabel } from "@/lib/documents/categories";
import { formatFileSize } from "@/lib/documents/format-size";
import styles from "./page.module.css";

export const metadata = {
  title: "Transparență",
  description: "Vezi cum folosim donațiile și ce rapoarte publicăm despre activitatea Fii Schimbarea.",
};

const REASONS = [
  { icon: "/icons/heart.png", title: "Integritate", desc: "Respectăm cei mai înalți standarde etice." },
  { icon: "/icons/people.png", title: "Responsabilitate", desc: "Răspundem pentru impactul și resursele noastre." },
  { icon: "/icons/hospital.png", title: "Deschidere", desc: "Comunicăm clar și la timp, fără informații ascunse." },
  { icon: "/icons/heart.png", title: "Încredere", desc: "Credem că încrederea se construiește zi de zi." },
];

const DONATION_USE = [
  { pct: "72%", title: "Proiecte și programe", desc: "Dotări medicale, renovări, programe pentru pacienți și comunități." },
  { pct: "14%", title: "Administrare", desc: "Cheltuieli administrative necesare pentru buna funcționare a organizației." },
  { pct: "8%", title: "Campanii și fundraising", desc: "Comunicare, strângere de fonduri și implicare a comunității." },
  { pct: "6%", title: "Rezerve și dezvoltare", desc: "Fonduri alocate pentru situații neprevăzute și dezvoltarea organizației." },
];

const TIMELINE = [
  { year: "2018", event: "Am început cu dorința de a aduce schimbare în sistemul medical." },
  { year: "2019", event: "Primele proiecte de dotare și renovare în spitale publice." },
  { year: "2020", event: "Am extins sprijinul către comunități și programe pentru pacienți." },
  { year: "2021", event: "Mai multă implicare, mai mulți oameni alături de misiunea noastră." },
  { year: "2022", event: "Peste 100 de proiecte susținute în întreaga Românie." },
  { year: "2023+", event: "Continuăm să construim împreună un viitor mai bun." },
];

export default async function TransparentaPage() {
  const content = await getPageContent("transparenta");
  const documents = await getPublishedDocuments();

  return (
    <>
      <PageHero
        breadcrumb="Acasă / Transparență"
        title={
          <>
            Transparență din respect pentru <span className="accent">oameni și pentru tine</span>.
          </>
        }
        lead={content["hero.lead"]}
        imageSrc="/assets/1-hero-copil-spital.png"
        imageAlt="Copil ținând o jucărie de pluș"
        badgeText="Împreună facem diferența"
      />

      <section className="section section-surface">
        <div className={`container ${styles.whyGrid}`}>
          <div>
            <p className="eyebrow">De ce transparența contează</p>
            <h2>Responsabilitate față de misiunea noastră</h2>
            <p>Suntem o organizație non-profit și fiecare leu primit este o promisiune că vom face bine. De aceea, ne angajăm să fim transparenți în actele noastre, în decizii și în modul în care gestionăm resursele.</p>
            <div className={styles.reasonsRow}>
              {REASONS.map(({ icon, title, desc }) => (
                <div className={`card ${styles.reasonCard}`} key={title}>
                  <span className={styles.reasonIcon}>
                    <Image src={icon} alt="" width={26} height={26} />
                  </span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.infoBox}>
            <p style={{ fontWeight: 600, color: "var(--color-text)" }}>Fii Schimbarea</p>
            <p>{content["org.registrationInfo"]}</p>
            <Link href="/contact" className="link-arrow">
              Vezi date organizație →
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <p className="eyebrow">Cum folosim donațiile</p>
          <h2>Fiecare donație are un scop clar</h2>
          <p style={{ maxWidth: "40rem" }}>Resursele primite sunt direcționate cu grijă către proiecte care aduc impact real și măsurabil.</p>
          <div className={styles.donutsGrid}>
            {DONATION_USE.map(({ pct, title, desc }) => (
              <div className={styles.donutCard} key={title}>
                <div className={styles.donut}>{pct}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "var(--space-4)" }}>
            Ne străduim să menținem costurile administrative la un nivel minim, pentru ca impactul în beneficiul oamenilor să fie cât mai mare.{" "}
            <Link href="/contact" className="link-arrow" style={{ marginTop: 0 }}>
              Vezi politica financiară →
            </Link>
          </p>
        </div>
      </section>

      <section className="section section-surface">
        <div className="container">
          <p className="eyebrow">Rapoarte și documente</p>
          <h2>Documente disponibile</h2>
          <p style={{ maxWidth: "40rem" }}>Ne dorim ca informațiile despre activitatea noastră să fie ușor de accesat. Rapoartele și documentele relevante sunt publicate aici.</p>
          {documents.length === 0 ? (
            <div className="empty-state" style={{ marginTop: "var(--space-4)" }}>
              Niciun document publicat momentan.
            </div>
          ) : (
            <div className={styles.documentsGrid}>
              {documents.map((doc) => (
                <div className={`card ${styles.documentCard}`} key={doc.id}>
                  <span className={styles.documentBadge}>PDF</span>
                  <h3>{doc.title}</h3>
                  <p className={styles.documentMeta}>
                    {getCategoryLabel(doc.category)} · {doc.year} · {formatFileSize(doc.sizeBytes)}
                  </p>
                  <a href={`/api/documents/${doc.id}?download=1`} className="link-arrow">
                    Descarcă →
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <p className="eyebrow">Drumul nostru, împreună</p>
          <h2>Repere importante</h2>
          <div className={styles.timeline}>
            {TIMELINE.map(({ year, event }) => (
              <div className={styles.timelineItem} key={year}>
                <span className={styles.timelineDot}>
                  <IconLeaf width={20} height={20} />
                </span>
                <h3>{year}</h3>
                <p>{event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="cta-band">
          <div className="cta-band-image">
            <Image src="/icons/badge.png" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="cta-band-content">
            <p>Transparența creează încredere.</p>
            <p>Împreună putem face mai mult bine.</p>
          </div>
          <Link href="/doneaza" className="btn-primary">
            <IconHeart width={16} height={16} strokeWidth={2} /> Donează acum
          </Link>
        </div>
      </section>
    </>
  );
}
