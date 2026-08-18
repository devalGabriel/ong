export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--color-bg-alt)", marginTop: "var(--space-6)" }}>
      <div className="container" style={{ paddingBlock: "var(--space-5)" }}>
        <p>[Numele Organizației] — [DE CONFIGURAT: date de contact]</p>
        <p>&copy; {year} [Numele Organizației]. Toate drepturile rezervate.</p>
      </div>
    </footer>
  );
}
