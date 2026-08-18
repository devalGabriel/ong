import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import { IconHeart, IconHandsRaised, IconMegaphone, IconHandshake, IconUsers, IconLeaf } from "@/components/public/icons";
import { getPageContent } from "@/lib/content/get-page-content";
import styles from "./page.module.css";

export const metadata = {
  title: "Implică-te",
  description: "[DE CONFIGURAT: descriere implicare pentru motoare de căutare]",
};

const INVOLVE_CARDS = [
  { icon: IconHeart, title: "Donează", desc: "Susține financiar proiectele noastre și ajută-ne să oferim speranță acolo unde este cea mai mare nevoie.", href: "/doneaza", label: "Donează" },
  { icon: IconHandsRaised, title: "Devino voluntar", desc: "Dăruiește din timpul tău și implică-te alături de o echipă dedicată.", href: "#devino-voluntar", label: "Înscrie-te" },
  { icon: IconMegaphone, title: "Spune mai departe", desc: "Distribuie misiunea noastră și ajută-ne să ajungem la cât mai mulți oameni.", href: "/contact", label: "Distribuie" },
  { icon: IconHandshake, title: "Parteneriate", desc: "Construim parteneriate solide cu organizații și companii care cred în puterea binelui.", href: "/contact", label: "Colaborează" },
];

const REASONS = [
  { icon: IconUsers, title: "Schimbi vieți", desc: "Implicarea ta aduce speranță și îmbunătățește calitatea vieții celor pe care îi sprijinim." },
  { icon: IconHeart, title: "Faci parte dintr-o comunitate", desc: "Alături de oameni implicați, vei simți că faci parte din ceva mai mare decât tine." },
  { icon: IconLeaf, title: "Îți dezvolți abilitățile", desc: "Voluntariatul îți oferă experiență, încredere și ocazia de a învăța lucruri noi." },
  { icon: IconHandsRaised, title: "Lași o moștenire bună", desc: "Fiecare gest contează și poate inspira alți oameni să se implice." },
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
        primaryCta={{ href: "/doneaza", label: "Donează acum" }}
        secondaryCta={{ href: "#cum-te-implici", label: "Află mai multe" }}
        imageSrc="/assets/4-maini-tinute.png"
        imageAlt="Mâini ținute cu grijă"
        badgeText="Împreună facem diferența"
      />

      <section id="cum-te-implici" className="section section-alt">
        <div className="container">
          <h2 className="u-center">Cum te poți implica</h2>
          <div className={styles.involveGrid}>
            {INVOLVE_CARDS.map(({ icon: Icon, title, desc, href, label }) => (
              <div className={`card ${styles.involveCard}`} key={title}>
                <Icon className={styles.involveIcon} />
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
              {REASONS.map(({ icon: Icon, title, desc }) => (
                <li key={title}>
                  <span className={styles.reasonIcon}>
                    <Icon width={22} height={22} />
                  </span>
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

      <section className="container section">
        <div className="cta-band">
          <div className="cta-band-image">
            <Image src="/assets/8-mana-inima.png" alt="" fill sizes="100vw" />
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
