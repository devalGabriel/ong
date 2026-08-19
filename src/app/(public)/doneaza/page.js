import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import DonationAmountPicker from "@/components/public/DonationAmountPicker";
import CopyButton from "@/components/public/CopyButton";
import { IconHeart, IconShield, IconLock } from "@/components/public/icons";
import { getSiteSettings } from "@/lib/settings/get-site-settings";
import { getPageContent } from "@/lib/content/get-page-content";
import styles from "./page.module.css";

export const metadata = {
  title: "Donează",
  description: "Susține Fii Schimbarea printr-o donație unică sau recurentă, online sau prin transfer bancar.",
};

const PROVIDER_LABELS = {
  stripe: "Stripe",
  paypal: "PayPal",
  revolut: "Revolut",
  other: "provider extern",
};

const USE_CASES = [
  { icon: "/icons/hospital.png", title: "Spitale și pacienți", desc: "Sprijinim secțiile de pediatrie și pacienții cu echipamente și tratamente." },
  { icon: "/icons/hand-heart.png", title: "Comunități vulnerabile", desc: "Oferim alimente, îmbrăcăminte și sprijin esențial familiilor care trec prin momente dificile." },
  { icon: "/icons/human-heart.png", title: "Copii și educație", desc: "Finanțăm programe educaționale și activități care le oferă copiilor șansa la un viitor mai bun." },
  { icon: "/icons/people.png", title: "Proiecte de impact", desc: "Dezvoltăm inițiative durabile care aduc speranță și schimbare pe termen lung." },
];

const TRUST_ITEMS = [
  { Icon: IconShield, title: "Transparență totală", desc: "Publicăm periodic rapoarte și rezultate." },
  { Icon: IconLock, title: "Date protejate", desc: "Informațiile tale sunt confidențiale și în siguranță." },
  { iconSrc: "/icons/people.png", title: "Peste 10 ani de impact", desc: "Mii de vieți schimbate împreună cu susținătorii noștri." },
  { iconSrc: "/icons/heart.png", title: "Donații deductibile", desc: "Donațiile sunt deductibile fiscal conform legislației în vigoare." },
];

export default async function DoneazaPage() {
  const settings = await getSiteSettings();
  const content = await getPageContent("doneaza");
  const providerConfigured = Boolean(settings.donationProviderType && settings.donationProviderPublicUrl);
  const providerLabel = PROVIDER_LABELS[settings.donationProviderType] ?? "provider extern";

  return (
    <>
      <PageHero
        breadcrumb="Acasă / Donează"
        eyebrow="Împreună putem face diferența"
        title={
          <>
            O donație mică poate <span className="accent">schimba o viață</span>.
          </>
        }
        lead={content["hero.lead"]}
        imageSrc="/assets/1-hero-copil-spital.png"
        imageAlt="Copil ținând o jucărie de pluș"
        badgeText="Împreună facem diferența"
      />

      <section id="alege-suma" className="section section-surface">
        <div className={`container ${styles.splitGrid}`}>
          <div className={styles.panel}>
            <h2>Alege cum vrei să donezi</h2>
            <DonationAmountPicker />
          </div>

          <div className={styles.panel}>
            <h2>Datele tale</h2>
            <form>
              <div className={styles.field}>
                <label htmlFor="donor-name">Nume și prenume</label>
                <input id="donor-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={styles.field}>
                <label htmlFor="donor-email">Email</label>
                <input id="donor-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={styles.checkboxRow}>
                <input id="donor-anonymous" name="anonymous" type="checkbox" />
                <label htmlFor="donor-anonymous">Donez anonim</label>
              </div>
              <p className={styles.formNote}>
                [DE CONFIGURAT] Aceste date nu sunt încă trimise nicăieri — nu există un provider de donații online configurat. Dacă alegi transferul bancar, folosește-le doar ca referință proprie.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Alege metoda de plată</h2>

          {providerConfigured ? (
            <p className={`${styles.providerBanner} ${styles.providerAvailable}`}>
              Plata online este disponibilă prin {providerLabel}.
            </p>
          ) : (
            <p className={`${styles.providerBanner} ${styles.providerUnavailable}`}>
              [DE CONFIGURAT] Plata online nu este încă disponibilă — nu există un provider de donații configurat. Poți dona prin transfer bancar, folosind datele de mai jos.
            </p>
          )}

          <div className={styles.methodGrid}>
            <div className={`card ${styles.methodCard}`}>
              <h3>Plată online {!providerConfigured && "(indisponibilă)"}</h3>
              <p>
                {providerConfigured
                  ? `Vei fi redirecționat către pagina securizată de plată ${providerLabel}. Poți alege suma direct acolo.`
                  : "Va fi disponibilă imediat ce organizația configurează un provider de plăți."}
              </p>
              {providerConfigured ? (
                <a href={settings.donationProviderPublicUrl} target="_blank" rel="noreferrer" className="btn-primary">
                  <IconHeart width={16} height={16} strokeWidth={2} /> Continuă către plată
                </a>
              ) : (
                <button type="button" className="btn-secondary" disabled aria-disabled="true">
                  Indisponibil momentan
                </button>
              )}
            </div>

            <div className={`card ${styles.methodCard}`}>
              <h3>Transfer bancar</h3>
              <p>Efectuează plata direct în contul {settings.organizationName || "Fii Schimbarea"}, folosind datele de mai jos.</p>

              {settings.ibanRon && (
                <div className={styles.ibanRow}>
                  <span>RON: {settings.ibanRon}</span>
                  <CopyButton value={settings.ibanRon} className={styles.copyBtn} />
                </div>
              )}
              {settings.ibanEur && (
                <div className={styles.ibanRow}>
                  <span>EUR: {settings.ibanEur}</span>
                  <CopyButton value={settings.ibanEur} className={styles.copyBtn} />
                </div>
              )}
              {!settings.ibanRon && !settings.ibanEur && <p className={styles.formNote}>[DE CONFIGURAT: IBAN RON / EUR]</p>}
              {settings.bankName && <p className={styles.formNote}>Bancă: {settings.bankName}</p>}
              <p className={styles.formNote}>Menționează numele tău și „Donație” la detaliile transferului.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-surface">
        <div className="container">
          <h2 className="u-center">Unde merg donațiile tale</h2>
          <div className={styles.useGrid}>
            {USE_CASES.map(({ icon, title, desc }) => (
              <div className={styles.useCard} key={title}>
                <Image src={icon} alt="" width={32} height={32} className={styles.useIcon} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <p className="u-center" style={{ marginTop: "var(--space-4)" }}>
            <Link href="/proiecte" className="link-arrow">
              Vezi proiectele noastre →
            </Link>
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className={styles.trustGrid}>
            {TRUST_ITEMS.map(({ Icon, iconSrc, title, desc }) => (
              <div className={styles.trustItem} key={title}>
                {Icon ? <Icon className={styles.trustIcon} width={28} height={28} /> : <Image src={iconSrc} alt="" width={28} height={28} className={styles.trustIcon} />}
                <h3>{title}</h3>
                <p>{desc}</p>
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
            <p>Fii schimbarea de care lumea are nevoie.</p>
            <p>Orice gest contează. Mulțumim din inimă pentru sprijin!</p>
          </div>
          <Link href="#alege-suma" className="btn-primary">
            <IconHeart width={16} height={16} strokeWidth={2} /> Donează acum
          </Link>
        </div>
      </section>
    </>
  );
}
