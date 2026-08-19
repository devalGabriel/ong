import Image from "next/image";
import Link from "next/link";

export default function Logo({ organizationName, href = "/" }) {
  const name = organizationName?.trim() || "Fii Schimbarea";

  return (
    <Link href={href} aria-label={`Pagina principală ${name}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
      <Image src="/icons/logo.png" alt="" width={34} height={34} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: "bold", fontSize: "1.1rem", color: "var(--color-text)" }}>{name}</span>
        <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>pe care vrei să o vezi în lume</span>
      </span>
    </Link>
  );
}
