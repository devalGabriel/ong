"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHeart, IconShield, IconUsers } from "@/components/public/icons";
import { IconDashboard, IconPages, IconGear, IconMagnifier, IconNewspaper, IconFolder, IconImage } from "./icons";
import styles from "./AdminNav.module.css";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: IconDashboard },
  { href: "/admin/continut", label: "Texte", icon: IconPages },
  { href: "/admin/donatii", label: "Donații", icon: IconHeart },
  { href: "/admin/transparenta", label: "Transparență", icon: IconShield },
  { href: "/admin/setari", label: "Setări", icon: IconGear },
];

const COMING_SOON_ITEMS = [
  { label: "SEO", icon: IconMagnifier },
  { label: "Noutăți", icon: IconNewspaper },
  { label: "Proiecte", icon: IconFolder },
  { label: "Media", icon: IconImage },
  { label: "Utilizatori", icon: IconUsers },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigare admin">
      <ul className={styles.nav} style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link href={item.href} aria-current={isActive ? "page" : undefined}>
                <Icon width={18} height={18} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className={styles.comingSoonGroup} style={{ listStyle: "none", margin: 0, padding: 0 }} aria-label="Funcționalități viitoare">
        {COMING_SOON_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <span className={styles.comingSoonItem} aria-disabled="true">
                <Icon width={18} height={18} />
                {item.label}
                <span className={styles.badge}>În curând</span>
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
