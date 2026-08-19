import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import { IconHeart, IconLeaf } from "@/components/public/icons";
import { getPageContent } from "@/lib/content/get-page-content";
import styles from "./page.module.css";

export const metadata = {
  title: "Despre noi",
  description: "Asociația Fii Schimbarea susține spitale, comunități vulnerabile și proiecte de impact din România.",
};

const VALUES = [
  { icon: "/icons/heart.png", title: "Empatie", desc: "Punem oamenii în centrul tuturor acțiunilor noastre și răspundem cu grijă nevoilor reale." },
  { icon: "/icons/people.png", title: "Integritate", desc: "Acționăm cu onestitate, transparență și respect față de fiecare partener, donator și beneficiar." },
  { icon: "/icons/hand-heart.png", title: "Implicare", desc: "Ne pasă și ne implicăm activ pentru a aduce schimbări pozitive și durabile în comunitate." },
  { icon: null, title: "Solidaritate", desc: "Credem în puterea comunității și în faptul că împreună putem face diferența." },
];

const TEAM = [
  { name: "Andreea Popescu", role: "Președinte & Fondator" },
  { name: "Radu Ionescu", role: "Vicepreședinte" },
  { name: "Maria Dinu", role: "Coordonator Proiecte" },
  { name: "Vlad Munteanu", role: "Responsabil Comunicare" },
];

const PARTNERS = ["Regina Maria", "MedLife", "BCR", "Star Storage", "ENGIE"];

export default async function DespreNoiPage() {
  const content = await getPageContent("despre-noi");

  return (
    <>
      <PageHero
        eyebrow="Despre noi"
        title={
          <>
            Cine <span className="accent">suntem</span>
          </>
        }
        lead={content["hero.lead"]}
        primaryCta={{ href: "/doneaza", label: content["hero.ctaPrimary"] }}
        secondaryCta={{ href: "#povestea-noastra", label: content["hero.ctaSecondary"] }}
        imageSrc="/assets/2-maini-comunitate.png"
        imageAlt="Mâini unite, simbol al comunității"
        badgeText="Împreună facem diferența"
      />

      <section id="povestea-noastra" className="section section-surface">
        <div className={`container ${styles.storyGrid}`}>
          <div className={styles.storyTextWrap}>
            <p className="eyebrow">Povestea noastră</p>
            <h2>
              De la o idee simplă, la o comunitate care <span className="accent">schimbă vieți</span>.
            </h2>
            <p>{content["story.paragraph1"]}</p>
            <p>{content["story.paragraph2"]}</p>
            <Image src="/icons/hello.png" alt="" width={56} height={56} className={styles.storyDecor} />
          </div>
          <div className={styles.storyImageWrap}>
            <Image src="/assets/3-copil-fereastra.png" alt="Copil privind pe fereastră, ținând o jucărie de pluș" fill sizes="(min-width: 1024px) 40vw, 90vw" />
            <div className={styles.storyBadge}>
              <span>Din grijă pentru viață</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <p className="eyebrow u-center">Ce ne ghidează</p>
          <h2 className="u-center">Valorile noastre</h2>
          <div className={styles.valuesGrid}>
            {VALUES.map(({ icon, title, desc }) => (
              <div className={`card ${styles.valueCard}`} key={title}>
                <span className={styles.valueIcon}>{icon ? <Image src={icon} alt="" width={28} height={28} /> : <IconLeaf width={28} height={28} />}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-surface">
        <div className="container">
          <p className="eyebrow">Echipa noastră</p>
          <h2>
            Oameni dedicați, cu <span className="accent">inima deschisă</span>.
          </h2>
          <p style={{ maxWidth: "40rem" }}>Echipa noastră este formată din profesioniști, voluntari și susținători care își dedică timpul și energia pentru a transforma dorința de a ajuta în fapte bune.</p>
          <div className={styles.teamGrid}>
            {TEAM.map(({ name, role }) => (
              <div className={styles.teamCard} key={name}>
                <div className={styles.teamAvatar}>
                  <Image src="/icons/human-heart.png" alt="" width={40} height={40} />
                </div>
                <h3>{name}</h3>
                <p>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <p className="eyebrow u-center">Parteneri & susținători</p>
          <h2 className="u-center">
            Împreună suntem <span className="accent">mai puternici</span>
          </h2>
          <div className={styles.partnersRow}>
            {PARTNERS.map((partner) => (
              <span className={styles.partnerName} key={partner}>
                {partner}
              </span>
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
            <p>Fii și tu parte din schimbare!</p>
            <p>Implicarea ta poate aduce speranță, echipamente și sprijin de care au nevoie mii de oameni.</p>
          </div>
          <Link href="/doneaza" className="btn-primary">
            <IconHeart width={16} height={16} strokeWidth={2} /> Donează acum
          </Link>
        </div>
      </section>
    </>
  );
}
