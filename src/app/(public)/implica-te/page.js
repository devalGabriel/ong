import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import { IconHeart, IconLeaf } from "@/components/public/icons";
import { getPageContent } from "@/lib/content/get-page-content";
import styles from "./page.module.css";

export const metadata = {
  title: "Implică-te",
  description: "Donează, devino voluntar sau construiește un parteneriat cu Fii Schimbarea.",
};

const INVOLVE_CARDS = [
  { icon: "/icons/heart.png", title: "Donează", desc: "Susține financiar proiectele noastre și ajută-ne să oferim speranță acolo unde este cea mai mare nevoie.", href: "/doneaza", label: "Donează" },
  { icon: "/icons/handsup.png", title: "Devino voluntar", desc: "Dăruiește din timpul tău și implică-te alături de o echipă dedicată.", href: "#devino-voluntar", label: "Înscrie-te" },
  { icon: "/icons/news.png", title: "Spune mai departe", desc: "Distribuie misiunea noastră și ajută-ne să ajungem la cât mai mulți oameni.", href: "/contact", label: "Distribuie" },
  { icon: "/icons/handshake.png", title: "Parteneriate", desc: "Construim parteneriate solide cu organizații și companii care cred în puterea binelui.", href: "/contact", label: "Colaborează" },
];

const REASONS = [
  { icon: "/icons/people.png", title: "Schimbi vieți", desc: "Implicarea ta aduce speranță și îmbunătățește calitatea vieții celor pe care îi sprijinim." },
  { icon: "/icons/heart.png", title: "Faci parte dintr-o comunitate", desc: "Alături de oameni implicați, vei simți că faci parte din ceva mai mare decât tine." },
  { icon: null, title: "Îți dezvolți abilitățile", desc: "Voluntariatul îți oferă experiență, încredere și ocazia de a învăța lucruri noi." },
  { icon: "/icons/handsup.png", title: "Lași o moștenire bună", desc: "Fiecare gest contează și poate inspira alți oameni să se implice." },
];

const TESTIMONIALS = [
  { name: "Andreea M.", role: "Voluntar din 2022", quote: "Voluntariatul m-a învățat cât de mult poate schimba un gest mic în viața unui copil. Sunt mândră că fac parte din această familie." },
  { name: "Alex D.", role: "Susținător din 2021", quote: "Am ales să donez lunar pentru că știu că fiecare contribuție ajută la echiparea spitalelor și la salvarea de vieți." },
  { name: "Ioana P.", role: "Reprezentant companie parteneră", quote: "Parteneriatul cu Fii Schimbarea ne-a oferit ocazia să fim aproape de comunitate și să creăm impact real." },
];

export default async function ImplicaTePage() {
  const content = await getPageContent("implica-te");

  return (
    <>
      <PageHero
        eyebrow="Împreună putem face diferența"
        title={
          <>
            Implică-te și fii parte din <span className="accent">schimbare</span>.
          </>
        }
        lead={content["hero.lead"]}
        primaryCta={{ href: "/doneaza", label: content["hero.ctaPrimary"] }}
        secondaryCta={{ href: "#cum-te-implici", label: content["hero.ctaSecondary"] }}
        imageSrc="/assets/4-maini-tinute.png"
        imageAlt="Mâini ținute cu grijă"
        badgeText="Împreună facem diferența"
      />

      <section id="cum-te-implici" className="section section-alt">
        <div className="container">
          <h2 className="u-center">Cum te poți implica</h2>
          <div className={styles.involveGrid}>
            {INVOLVE_CARDS.map(({ icon, title, desc, href, label }) => (
              <div className={`card ${styles.involveCard}`} key={title}>
                <span className={styles.involveIcon}>
                  <Image src={icon} alt="" width={28} height={28} />
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link href={href} className="link-arrow">
                  {label} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="devino-voluntar" className="section section-surface">
        <div className={`container ${styles.splitGrid}`}>
          <div className={styles.formCard}>
            <h2>
              Devino <span className="accent">voluntar</span>
            </h2>
            <p>Completează formularul și te vom contacta pentru a te integra în echipa noastră.</p>
            <form>
              <div className={styles.formRow}>
                <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="volunteer-name">Nume și prenume</label>
                  <input id="volunteer-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="volunteer-email">Email</label>
                  <input id="volunteer-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="volunteer-phone">Telefon</label>
                  <input id="volunteer-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="volunteer-city">Oraș</label>
                  <select id="volunteer-city" name="city" defaultValue="">
                    <option value="" disabled>
                      Alege orașul
                    </option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="volunteer-interest">Domenii de interes</label>
                  <select id="volunteer-interest" name="interest" defaultValue="">
                    <option value="" disabled>
                      Alege domeniul
                    </option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary" disabled aria-describedby="volunteer-form-note">
                Mă înscriu
              </button>
              <p id="volunteer-form-note" className={styles.formNote}>
                [DE CONFIGURAT] Formularul de înscriere nu este încă activ — nu există un provider de procesare configurat.
              </p>
            </form>
          </div>

          <div>
            <h2>
              De ce merită să te <span className="accent">implici</span>
            </h2>
            <ul className={styles.reasonsList}>
              {REASONS.map(({ icon, title, desc }) => (
                <li key={title}>
                  <span className={styles.reasonIcon}>{icon ? <Image src={icon} alt="" width={22} height={22} /> : <IconLeaf width={22} height={22} />}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="u-center">
            Povești din <span className="accent">comunitatea</span> noastră
          </h2>
          <div className={styles.testimonialsGrid}>
            {TESTIMONIALS.map(({ name, role, quote }) => (
              <div className={`card ${styles.testimonialCard}`} key={name}>
                <p className={styles.testimonialQuote}>&ldquo;{quote}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <span className={styles.testimonialAvatar}>
                    <Image src="/icons/human-heart.png" alt="" width={26} height={26} />
                  </span>
                  <div>
                    <p className={styles.testimonialName}>{name}</p>
                    <p className={styles.testimonialRole}>{role}</p>
                  </div>
                </div>
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
            <p>Împreună putem scrie povești de speranță.</p>
            <p>Alege cum vrei să te implici și fii parte din schimbare!</p>
          </div>
          <Link href="/doneaza" className="btn-primary">
            <IconHeart width={16} height={16} strokeWidth={2} /> Donează acum
          </Link>
        </div>
      </section>
    </>
  );
}
