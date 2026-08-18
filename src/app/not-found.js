import Link from "next/link";

export const metadata = {
  title: "Pagina nu a fost găsită",
};

export default function NotFound() {
  return (
    <div className="container" style={{ paddingBlock: "var(--space-6)" }}>
      <h1>Pagina nu a fost găsită</h1>
      <p>Ne pare rău, pagina căutată nu există.</p>
      <Link href="/">Înapoi la pagina principală</Link>
    </div>
  );
}
