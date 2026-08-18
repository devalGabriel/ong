"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { IconHeart } from "./icons";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/despre-noi", label: "Despre noi" },
  { href: "/proiecte", label: "Proiecte" },
  { href: "/implica-te", label: "Implică-te" },
  { href: "/transparenta", label: "Transparență" },
  { href: "/noutati", label: "Noutăți" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ organizationName }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Logo organizationName={organizationName} />

        <nav className={styles.nav} aria-label="Navigare principală">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <Link href="/doneaza" className={styles.donate}>
            <IconHeart width={14} height={14} strokeWidth={2} /> Donează
          </Link>
          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className={`container ${styles.mobileNav}`} aria-label="Navigare mobilă">
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
