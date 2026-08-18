export const metadata = {
  title: "Ghid de utilizare · Admin",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { title: "Dashboard", desc: "Vedere de ansamblu: câte pagini au conținut editabil, câte secțiuni sunt disponibile și când s-a salvat ultima modificare." },
  { title: "Texte", desc: "Editează textele fiecărei pagini publice. Fiecare pagină are propriul tab; salvarea este imediată — nu există stare de „ciornă”." },
  { title: "Donații", desc: "Datele bancare (IBAN, bancă) și providerul de donații online, folosite pe pagina Donează și în subsolul site-ului." },
  { title: "Transparență", desc: "Încarcă, editează și publică/retrage documentele PDF afișate pe pagina publică de transparență." },
  { title: "Setări", desc: "Datele organizației: denumire, contact, rețele sociale." },
];

export default function AdminGhidPage() {
  return (
    <>
      <h1>Ghid de utilizare</h1>
      <p>Un scurt ghid despre unde găsești fiecare funcționalitate din panoul de administrare.</p>
      <dl>
        {SECTIONS.map((section) => (
          <div key={section.title} style={{ marginBottom: "1.25rem" }}>
            <dt style={{ fontWeight: 600 }}>{section.title}</dt>
            <dd style={{ margin: "0.25rem 0 0", color: "var(--color-text-muted)" }}>{section.desc}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
