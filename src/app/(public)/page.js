import Image from "next/image";
import Link from "next/link";
import { IconHeart, IconArrowRight } from "@/components/public/icons";
import { getPageContent } from "@/lib/content/get-page-content";
import styles from "./page.module.css";

export const metadata = {
  title: "Acasă",
  description: "Fii Schimbarea susține oamenii și spitalele din România — donează, implică-te sau descoperă proiectele noastre.",
};

const STATS = [
  { icon: "/icons/hospital.png", value: "2+", label: "Spitale susținute", desc: "Echipamente și consumabile medicale donate." },
  { icon: "/icons/people.png", value: "5000+", label: "Oameni ajutați", desc: "Pacienți, copii și cadre medicale sprijinite." },
  { icon: "/icons/hand-heart.png", value: "20+", label: "Proiecte realizate", desc: "Campanii și inițiative cu impact real." },
  { icon: "/icons/human-heart.png", value: "100+", label: "Voluntari implicați", desc: "O comunitate unită pentru binele comun." },
];

const INVOLVE_CARDS = [
  {
    icon: "/icons/heart.png",
    title: "Donează",
    desc: "Orice sumă ne ajută să aducem speranță și resurse acolo unde sunt cele mai necesare.",
    href: "/doneaza",
    label: "Donează",
  },
  {
    icon: "/icons/handsup.png",
    title: "Devino voluntar",
    desc: "Timpul tău poate schimba vieți. Alătură-te echipei noastre.",
    href: "/implica-te",
    label: "Înscrie-te",
  },
  {
    icon: "/icons/news.png",
    title: "Spune mai departe",
    desc: "Distribuie misiunea noastră și ajută-ne să ajungem la cât mai mulți oameni.",
    href: "/implica-te",
    label: "Distribuie",
  },
  {
    icon: "/icons/handshake.png",
    title: "Parteneriate",
    desc: "Dacă reprezinți o companie, hai să lucrăm împreună pentru bine.",
    href: "/contact",
    label: "Colaborează",
  },
];

export default async function HomePage() {
  const content = await getPageContent("home");

  return (
    <>
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>{content["hero.eyebrow"]}</p>
            <h1>
              Fii schimbarea pe care vrei să o vezi <span className={styles.accent}>în lume</span>.
            </h1>
            <div className={styles.divider} aria-hidden="true" />
            <p className={styles.heroLead}>{content["hero.lead"]}</p>
            <div className={styles.heroActions}>
              <Link href="/doneaza" className={styles.btnPrimary}>
                <IconHeart width={16} height={16} strokeWidth={2} /> {content["hero.ctaPrimary"]}
              </Link>
              <Link href="/despre-noi" className={styles.btnSecondary}>
                {content["hero.ctaSecondary"]}
              </Link>
            </div>
          </div>
          <div className={styles.heroImageOuter}>
            <Image src="/icons/leaf.png" alt="" width={90} height={180} className={styles.leafSprig} />
            <Image src="/icons/dots.png" alt="" width={64} height={64} className={styles.dotGrid} />
            <div className={styles.heroImageWrap}>
              <Image
                src="/assets/1-hero-copil-spital.png"
                alt="Copil ținând o jucărie de pluș"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                priority
              />
              <div className={styles.badge}>
                <Image src="/assets/9-badge-inima.png" alt="" fill sizes="140px" />
                <span className={styles.badgeText}>Împreună facem diferența</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.about}>
        <div className={`container ${styles.aboutGrid}`}>
          <div className={styles.aboutImageWrap}>
            <Image
              src="/assets/2-maini-comunitate.png"
              alt="Mâini unite, simbol al comunității"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
            <div className={styles.aboutBadge}>
              <span>Din grijă pentru viață</span>
            </div>
          </div>
          <div className={styles.aboutTextWrap}>
            <p className={styles.eyebrow}>Despre noi</p>
            <h2>Cine suntem</h2>
            <p>{content["about.body"]}</p>
            <Link href="/despre-noi" className={styles.linkArrow}>
              Citește povestea noastră <IconArrowRight />
            </Link>
            <Image src="/icons/hello.png" alt="" width={64} height={64} className={styles.aboutDecor} />
          </div>
        </div>
      </section>

      <section className={styles.impact}>
        <div className="container">
          <p className={`${styles.eyebrow} ${styles.center}`}>Impactul nostru</p>
          <h2 className={styles.center}>
            Împreună facem <span className={styles.accent}>diferența</span>
          </h2>
          <div className={styles.statsGrid}>
            {STATS.map(({ icon, value, label, desc }) => (
              <div className={styles.statCard} key={label}>
                <span className={styles.statIcon}>
                  <Image src={icon} alt="" width={28} height={28} />
                </span>
                <p className={styles.statValue}>{value}</p>
                <p className={styles.statLabel}>{label}</p>
                <p className={styles.statDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.involve}>
        <div className="container">
          <h2 className={styles.center}>Cum te poți implica</h2>
          <div className={styles.involveGrid}>
            {INVOLVE_CARDS.map(({ icon, title, desc, href, label }) => (
              <div className={styles.involveCard} key={title}>
                <span className={styles.involveIcon}>
                  <Image src={icon} alt="" width={28} height={28} />
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link href={href} className={styles.linkArrow}>
                  {label} <IconArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`container ${styles.finalCtaSection}`}>
        <div className={styles.ctaBand}>
          <div className={styles.ctaImageWrap}>
            <Image src="/icons/badge.png" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <div className={styles.ctaContent}>
            <p>Împreună putem scrie povești de speranță.</p>
            <p>Fii și tu parte din schimbare!</p>
          </div>
          <Link href="/doneaza" className={styles.btnPrimary}>
            <IconHeart width={16} height={16} strokeWidth={2} /> Donează acum
          </Link>
        </div>
      </section>
    </>
  );
}
