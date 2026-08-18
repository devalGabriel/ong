"use client";

import { usePathname } from "next/navigation";

const LABELS = {
  "/admin": "Dashboard",
  "/admin/continut": "Texte",
  "/admin/donatii": "Donații",
  "/admin/transparenta": "Transparență",
  "/admin/setari": "Setări",
};

function getLabel(pathname) {
  if (LABELS[pathname]) return LABELS[pathname];
  if (pathname.startsWith("/admin/continut/")) return "Texte";
  if (pathname.startsWith("/admin/transparenta/")) return "Transparență";
  return null;
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const label = getLabel(pathname);

  if (!label || label === "Dashboard") {
    return <span>Dashboard</span>;
  }

  return (
    <span>
      Dashboard <span aria-hidden="true">›</span> {label}
    </span>
  );
}
