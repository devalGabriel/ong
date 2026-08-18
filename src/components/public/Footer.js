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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo />
          <p>[DE CONFIGURAT: scurtă descriere a organizației, misiune și domeniu de activitate.]</p>
          <div className={styles.social} aria-label="Rețele sociale">
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="Instagram">
              i
            </a>
            <a href="#" aria-label="TikTok">
              t
            </a>
          </div>
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
            <li>[DE CONFIGURAT: adresă]</li>
            <li>[DE CONFIGURAT: telefon]</li>
            <li>[DE CONFIGURAT: email]</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {year} [Numele Organizației]. Toate drepturile rezervate.</p>
      </div>
    </footer>
  );
}
