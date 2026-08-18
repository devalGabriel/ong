"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminNav.module.css";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/continut", label: "Conținut" },
  { href: "/admin/transparenta", label: "Transparență" },
  { href: "/admin/setari", label: "Setări" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Navigare admin">
      {NAV_ITEMS.map((item) => (
        <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
