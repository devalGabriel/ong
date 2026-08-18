import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import { IconHeart, IconHandsRaised } from "@/components/public/icons";
import { getPageContent } from "@/lib/content/get-page-content";
import styles from "./page.module.css";

export const metadata = {
  title: "Noutăți",
  description: "Povești, proiecte și evenimente recente din comunitatea Fii Schimbarea.",
};

const FILTERS = ["Toate noutățile", "Proiecte", "Povești din comunitate", "Evenimente", "Resurse", "Anunțuri"];

const FEATURED_ARTICLE = {
  category: "Proiecte",
  title: "Un nou început pentru 120 de copii din centrele de plasament",
  excerpt: "Prin proiectul „Acasă, pas cu pas”, am reușit să renovăm și să dotăm 3 spații de tip familial, oferind copiilor un mediu sigur și cald.",
  date: "10 mai 2024",
  readTime: "5 min read",
  image: "/assets/7-maini-casa.png",
};

const ARTICLES = [
  { category: "Proiecte", title: "Educație cu sens: ateliere care inspiră viitorul", date: "2 mai 2024", readTime: "4 min read", image: "/assets/5-copil-inima.png" },
  { category: "Povești din comunitate", title: "Maria a găsit curajul de a visa din nou", date: "28 aprilie 2024", readTime: "5 min read", image: "/assets/2-maini-comunitate.png" },
  { category: "Evenimente", title: "Aleargă pentru bine: împreună am strâns peste 40.000 lei", date: "20 aprilie 2024", readTime: "3 min read", image: "/assets/8-mana-inima.png" },
  { category: "Resurse", title: "Ghid pentru părinți: sprijin emoțional în momente dificile", date: "15 aprilie 2024", readTime: "6 min read", image: "/assets/3-copil-fereastra.png" },
  { category: "Proiecte", title: "Un spațiu sigur pentru mame și copii", date: "8 aprilie 2024", readTime: "4 min read", image: "/assets/4-maini-tinute.png" },
  { category: "Anunțuri", title: "Program special de Paște: cum puteți ajuta", date: "3 aprilie 2024", readTime: "2 min read", image: "/assets/1-hero-copil-spital.png" },
];

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

        <div className={styles.featured}>
          <div className={styles.featuredImageWrap}>
            <Image src={FEATURED_ARTICLE.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className={styles.featuredBody}>
            <span className={styles.categoryTag}>Articol recomandat · {FEATURED_ARTICLE.category}</span>
            <h2>{FEATURED_ARTICLE.title}</h2>
            <p>{FEATURED_ARTICLE.excerpt}</p>
            <p className={styles.articleMeta}>
              {FEATURED_ARTICLE.date} · {FEATURED_ARTICLE.readTime}
            </p>
          </div>
        </div>

        <h2>Ultimele noutăți</h2>
        <div className={styles.articlesGrid}>
          {ARTICLES.map((article) => (
            <div className={styles.articleCard} key={article.title}>
              <div className={styles.articleImageWrap}>
                <Image src={article.image} alt="" fill sizes="(min-width: 1024px) 30vw, 50vw" />
              </div>
              <div className={styles.articleBody}>
                <span className={styles.categoryTag}>{article.category}</span>
                <h3>{article.title}</h3>
                <p className={styles.articleMeta}>
                  {article.date} · {article.readTime}
                </p>
              </div>
            </div>
          ))}
        </div>
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
