import Link from "next/link";

const NAV_LINKS = [
  { href: "/despre-noi", label: "Despre noi" },
  { href: "/proiecte", label: "Proiecte" },
  { href: "/implica-te", label: "Implică-te" },
  { href: "/transparenta", label: "Transparență" },
  { href: "/noutati", label: "Noutăți" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBlock: "var(--space-3)" }}>
        <Link href="/" style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: "bold" }}>
          [Numele Organizației]
        </Link>
        <nav aria-label="Navigare principală">
          <ul style={{ display: "flex", gap: "var(--space-3)", listStyle: "none", margin: 0, padding: 0 }}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/doneaza"
          style={{
            background: "var(--color-primary)",
            color: "var(--color-primary-contrast)",
            padding: "var(--space-2) var(--space-4)",
            borderRadius: "var(--radius-md)",
            textDecoration: "none",
          }}
        >
          Donează
        </Link>
      </div>
    </header>
  );
}
