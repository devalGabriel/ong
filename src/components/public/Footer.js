import Link from "next/link";
import Logo from "./Logo";
import styles from "./Footer.module.css";

const USEFUL_LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/despre-noi", label: "Despre noi" },
  { href: "/proiecte", label: "Proiecte" },
  { href: "/implica-te", label: "Implică-te" },
  { href: "/transparenta", label: "Transparență" },
  { href: "/noutati", label: "Noutăți" },
  { href: "/contact", label: "Contact" },
];

const INVOLVE_LINKS = [
  { href: "/doneaza", label: "Donează" },
  { href: "/implica-te", label: "Devino voluntar" },
  { href: "/contact", label: "Parteneriate" },
];

const SOCIAL_LINKS = [
  { key: "facebookUrl", label: "Facebook", initial: "f" },
  { key: "instagramUrl", label: "Instagram", initial: "i" },
  { key: "tiktokUrl", label: "TikTok", initial: "t" },
];

export default function Footer({ settings }) {
  const year = new Date().getFullYear();
  const s = settings ?? {};
  const activeSocialLinks = SOCIAL_LINKS.filter((link) => s[link.key]);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo organizationName={s.organizationName} />
          <p>[DE CONFIGURAT: scurtă descriere a organizației, misiune și domeniu de activitate.]</p>
          {activeSocialLinks.length > 0 && (
            <div className={styles.social} aria-label="Rețele sociale">
              {activeSocialLinks.map((link) => (
                <a key={link.key} href={s[link.key]} target="_blank" rel="noreferrer" aria-label={link.label}>
                  {link.initial}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className={styles.colTitle}>Linkuri utile</h2>
          <ul className={styles.linkList}>
            {USEFUL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.colTitle}>Implică-te</h2>
          <ul className={styles.linkList}>
            {INVOLVE_LINKS.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.colTitle}>Contact</h2>
          <ul className={styles.contactList}>
            <li>{s.address || "[DE CONFIGURAT: adresă]"}</li>
            <li>{s.phone || "[DE CONFIGURAT: telefon]"}</li>
            <li>{s.email || "[DE CONFIGURAT: email]"}</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          &copy; {year} {s.organizationName || "[Numele Organizației]"}. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
