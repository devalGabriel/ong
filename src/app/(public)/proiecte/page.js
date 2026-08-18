import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import { IconBuilding, IconUsers, IconHeartHand, IconPerson, IconHeart } from "@/components/public/icons";
import { getPageContent } from "@/lib/content/get-page-content";
import styles from "./page.module.css";

export const metadata = {
  title: "Proiecte",
  description: "Descoperă proiectele Fii Schimbarea pentru spitale, comunități și campanii cu impact real.",
};

const FILTERS = ["Toate", "Spitale", "Comunități", "Campanii"];

const PROJECTS = [
  { image: "/assets/6-monitor-medical.png", tag: "Spitale", title: "Dotăm cu grijă", desc: "Echipamente medicale esențiale pentru secții și unități spitalicești din România." },
  { image: "/assets/2-maini-comunitate.png", tag: "Comunități", title: "Dăruim pentru viață", desc: "Sprijinim comunitățile vulnerabile prin donații de alimente, produse și servicii esențiale." },
  { image: "/assets/1-hero-copil-spital.png", tag: "Spitale", title: "Zâmbete în spital", desc: "Transformăm secțiile de pediatrie în locuri mai prietenoase pentru copii și familii." },
  { image: "/assets/8-mana-inima.png", tag: "Campanii", title: "Campanii cu impact", desc: "Campanii de conștientizare și strângere de fonduri pentru cauze care contează." },
];

const STATS = [
  { icon: IconBuilding, value: "25+", label: "Spitale susținute", desc: "Echipamente și consumabile medicale donate." },
  { icon: IconUsers, value: "5000+", label: "Oameni ajutați", desc: "Pacienți, copii și cadre medicale sprijinite." },
  { icon: IconHeartHand, value: "40+", label: "Proiecte realizate", desc: "Campanii și inițiative cu impact real." },
  { icon: IconPerson, value: "120+", label: "Voluntari implicați", desc: "O comunitate unită pentru binele comun." },
];

export default async function ProiectePage() {
  const content = await getPageContent("proiecte");

  return (
    <>
      <PageHero
        eyebrow="Proiectele noastre"
        title={
          <>
            Proiecte cu suflet, <span className="accent">rezultate care schimbă vieți</span>.
          </>
        }
        lead={content["hero.lead"]}
        imageSrc="/assets/1-hero-copil-spital.png"
        imageAlt="Copil ținând o jucărie de pluș"
        badgeText="Împreună facem diferența"
      />

      <section className="container section">
        <div className={styles.spotlight}>
          <div className={styles.spotlightText}>
            <p className="eyebrow">Proiecte de impact</p>
            <h2>
              Dotăm <span className="accent">cu grijă</span>.
            </h2>
            <p>{content["spotlight.lead"]}</p>
          </div>
          <div className={styles.spotlightImageWrap}>
            <Image src="/assets/6-monitor-medical.png" alt="Echipament medical într-un salon de spital" fill sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className={styles.spotlightBadge}>
              <span>Echipamente. Grijă. Viață.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <h2>
          Explorează <span className="accent">proiectele noastre</span>
        </h2>
        <div className={styles.filters} role="group" aria-label="Filtrează proiectele după categorie">
          {FILTERS.map((filter, index) => (
            <button key={filter} type="button" className={styles.filterBtn} aria-pressed={index === 0}>
              {filter}
            </button>
          ))}
        </div>
        <div className={styles.projectsGrid}>
          {PROJECTS.map((project) => (
            <div className={styles.projectCard} key={project.title}>
              <div className={styles.projectImageWrap}>
                <Image src={project.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" />
              </div>
              <div className={styles.projectBody}>
                <span className={styles.tag}>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className={styles.note}>Paginile individuale de proiect vor fi disponibile într-o etapă viitoare.</p>
      </section>

      <section className="section section-alt">
        <div className="container">
          <p className="eyebrow u-center">Impactul nostru</p>
          <h2 className="u-center">
            Împreună facem <span className="accent">diferența</span>
          </h2>
          <div className="stats-grid">
            {STATS.map(({ icon: Icon, value, label, desc }) => (
              <div className="stat-card" key={label}>
                <span className="stat-icon">
                  <Icon />
                </span>
                <p className="stat-value">{value}</p>
                <p className="stat-label">{label}</p>
                <p className="stat-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="cta-band">
          <div className="cta-band-image">
            <Image src="/assets/8-mana-inima.png" alt="" fill sizes="100vw" />
          </div>
          <div className="cta-band-content">
            <p>Fiecare proiect are nevoie de oameni ca tine.</p>
            <p>Susține un proiect sau donează pentru a fi parte din schimbare!</p>
          </div>
          <Link href="/doneaza" className="btn-primary">
            <IconHeart width={16} height={16} strokeWidth={2} /> Donează acum
          </Link>
        </div>
      </section>
    </>
  );
}
