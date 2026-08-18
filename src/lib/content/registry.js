/**
 * Controlled registry of editable content slots per public page.
 *
 * This is the single source of truth for:
 *  - which text fields the admin can edit (drives the admin form),
 *  - the fallback/seed value used when no override exists yet,
 *  - server-side validation (only keys defined here can be written),
 *  - the (read-only) section list shown in the admin editor.
 *
 * Admin edits values inside these slots only — it cannot add sections,
 * change page structure, or write HTML/CSS/JS.
 */
export const CONTENT_REGISTRY = {
  home: {
    label: "Acasă",
    route: "/",
    sectionLabels: { hero: "Secțiunea principală (Hero)", about: "Cine suntem" },
    fields: [
      {
        sectionKey: "hero",
        contentKey: "eyebrow",
        type: "text",
        label: "Text scurt deasupra titlului principal",
        maxLength: 80,
        fallback: "Împreună pentru oameni. Împreună pentru spitale.",
      },
      {
        sectionKey: "hero",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere sub titlul principal",
        maxLength: 400,
        fallback: "Susținem oamenii și spitalele din România, pentru un viitor mai bun și mai demn pentru toți.",
      },
      {
        sectionKey: "hero",
        contentKey: "ctaPrimary",
        type: "text",
        label: "Text buton principal",
        maxLength: 25,
        fallback: "Donează acum",
      },
      {
        sectionKey: "hero",
        contentKey: "ctaSecondary",
        type: "text",
        label: "Text buton secundar",
        maxLength: 25,
        fallback: "Află mai multe",
      },
      {
        sectionKey: "about",
        contentKey: "body",
        type: "textarea",
        label: "Text secțiunea „Cine suntem”",
        maxLength: 600,
        fallback: "Asociația „Fii Schimbarea pe care vrei să o vezi în lume” s-a născut din dorința de a face bine acolo unde este cea mai mare nevoie: în spitalele din România. Ne propunem să aducem echipamente și consumabile medicale esențiale și să susținem oamenii și comunitățile să ducă mai departe binele.",
      },
    ],
  },
  "despre-noi": {
    label: "Despre noi",
    route: "/despre-noi",
    sectionLabels: { hero: "Secțiunea principală (Hero)", story: "Povestea noastră" },
    fields: [
      {
        sectionKey: "hero",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere sub titlul principal",
        maxLength: 400,
        fallback: "Suntem o comunitate de oameni implicați care cred în puterea binelui de a transforma vieți și de a construi un viitor mai bun pentru toți.",
      },
      {
        sectionKey: "hero",
        contentKey: "ctaPrimary",
        type: "text",
        label: "Text buton principal",
        maxLength: 25,
        fallback: "Donează acum",
      },
      {
        sectionKey: "hero",
        contentKey: "ctaSecondary",
        type: "text",
        label: "Text buton secundar",
        maxLength: 25,
        fallback: "Află mai multe",
      },
      {
        sectionKey: "story",
        contentKey: "paragraph1",
        type: "textarea",
        label: "Povestea noastră — primul paragraf",
        maxLength: 500,
        fallback: "Asociația Fii Schimbarea pe care vrei să o vezi în lume a luat naștere din dorința de a face bine acolo unde este cea mai mare nevoie: în spitalele din România.",
      },
      {
        sectionKey: "story",
        contentKey: "paragraph2",
        type: "textarea",
        label: "Povestea noastră — al doilea paragraf",
        maxLength: 500,
        fallback: "Am început prin a sprijini secții și pacienți cu echipamente și consumabile medicale esențiale. Astăzi, implicarea noastră merge mai departe: susținem oamenii și comunitățile să devină mai puternice, mai unite și mai sănătoase. Credem că fiecare gest contează și că, împreună, putem aduce schimbări reale și durabile.",
      },
    ],
  },
  proiecte: {
    label: "Proiecte",
    route: "/proiecte",
    sectionLabels: { hero: "Secțiunea principală (Hero)", spotlight: "Proiect de impact" },
    fields: [
      {
        sectionKey: "hero",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere sub titlul principal",
        maxLength: 400,
        fallback: "De la spitale la comunități, fiecare proiect aduce mai aproape o lume în care grija și solidaritatea fac diferența.",
      },
      {
        sectionKey: "spotlight",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere proiect de impact",
        maxLength: 400,
        fallback: "Susținem spitalele din România prin echipamente medicale esențiale, pentru ca medicii să poată face mai bine ceea ce contează cel mai mult: să salveze vieți.",
      },
    ],
  },
  "implica-te": {
    label: "Implică-te",
    route: "/implica-te",
    sectionLabels: { hero: "Secțiunea principală (Hero)" },
    fields: [
      {
        sectionKey: "hero",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere sub titlul principal",
        maxLength: 400,
        fallback: "Fiecare gest contează. Împreună construim comunități unite și spitale mai bine echipate.",
      },
      {
        sectionKey: "hero",
        contentKey: "ctaPrimary",
        type: "text",
        label: "Text buton principal",
        maxLength: 25,
        fallback: "Donează acum",
      },
      {
        sectionKey: "hero",
        contentKey: "ctaSecondary",
        type: "text",
        label: "Text buton secundar",
        maxLength: 25,
        fallback: "Află mai multe",
      },
    ],
  },
  transparenta: {
    label: "Transparență",
    route: "/transparenta",
    sectionLabels: { hero: "Secțiunea principală (Hero)", org: "Date organizație" },
    fields: [
      {
        sectionKey: "hero",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere sub titlul principal",
        maxLength: 400,
        fallback: "Credem în onestitate, responsabilitate și comunicare deschisă. Îți arătăm clar cum folosim fiecare donație pentru a aduce schimbări reale în spitale și în comunități.",
      },
      {
        sectionKey: "org",
        contentKey: "registrationInfo",
        type: "textarea",
        label: "Date de înregistrare organizație",
        maxLength: 400,
        fallback: "Asociația „Fii Schimbarea pe care vrei să o vezi în lume” este înregistrată în România și funcționează în conformitate cu legislația în vigoare.",
      },
    ],
  },
  noutati: {
    label: "Noutăți",
    route: "/noutati",
    sectionLabels: { hero: "Secțiunea principală (Hero)" },
    fields: [
      {
        sectionKey: "hero",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere sub titlul principal",
        maxLength: 400,
        fallback: "Descoperă povești reale, rezultate și inițiative din comunitățile în care activăm.",
      },
    ],
  },
  contact: {
    label: "Contact",
    route: "/contact",
    sectionLabels: { hero: "Secțiunea principală (Hero)" },
    fields: [
      {
        sectionKey: "hero",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere sub titlul principal",
        maxLength: 400,
        fallback: "Ai o întrebare, o propunere de parteneriat sau vrei să afli mai multe despre activitatea noastră? Scrie-ne sau sună-ne. Răspundem cu drag și cât mai repede posibil.",
      },
    ],
  },
  doneaza: {
    label: "Donează",
    route: "/doneaza",
    sectionLabels: { hero: "Secțiunea principală (Hero)" },
    fields: [
      {
        sectionKey: "hero",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere sub titlul principal",
        maxLength: 400,
        fallback: "Susține copiii și pacienții din spitale, comunitățile vulnerabile și proiectele care aduc speranță acolo unde este cea mai mare nevoie.",
      },
    ],
  },
};

export function getRegistryPage(pageKey) {
  return CONTENT_REGISTRY[pageKey] ?? null;
}

export function getRegistryField(pageKey, sectionKey, contentKey) {
  const page = getRegistryPage(pageKey);
  if (!page) return null;
  return page.fields.find((field) => field.sectionKey === sectionKey && field.contentKey === contentKey) ?? null;
}
