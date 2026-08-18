/**
 * Controlled registry of editable content slots per public page.
 *
 * This is the single source of truth for:
 *  - which text fields the admin can edit (drives the admin form),
 *  - the fallback/seed value used when no override exists yet,
 *  - server-side validation (only keys defined here can be written).
 *
 * Admin edits values inside these slots only — it cannot add sections,
 * change page structure, or write HTML/CSS/JS.
 */
export const CONTENT_REGISTRY = {
  home: {
    label: "Acasă",
    route: "/",
    fields: [
      {
        sectionKey: "hero",
        contentKey: "eyebrow",
        type: "text",
        label: "Text scurt deasupra titlului principal",
        maxLength: 80,
        fallback: "Împreună, pentru oameni",
      },
      {
        sectionKey: "hero",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere sub titlul principal",
        maxLength: 400,
        fallback: "[DE CONFIGURAT: descriere misiune]",
      },
      {
        sectionKey: "about",
        contentKey: "body",
        type: "textarea",
        label: "Text secțiunea „Cine suntem”",
        maxLength: 600,
        fallback: "[DE CONFIGURAT: prezentare organizație — cine suntem, ce facem și pentru cine.]",
      },
    ],
  },
  "despre-noi": {
    label: "Despre noi",
    route: "/despre-noi",
    fields: [
      {
        sectionKey: "hero",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere sub titlul principal",
        maxLength: 400,
        fallback: "[DE CONFIGURAT: prezentare organizație — cine suntem, ce facem și pentru cine.]",
      },
      {
        sectionKey: "story",
        contentKey: "paragraph1",
        type: "textarea",
        label: "Povestea noastră — primul paragraf",
        maxLength: 500,
        fallback: "[DE CONFIGURAT: povestea organizației — cum și de ce a luat naștere.]",
      },
      {
        sectionKey: "story",
        contentKey: "paragraph2",
        type: "textarea",
        label: "Povestea noastră — al doilea paragraf",
        maxLength: 500,
        fallback: "[DE CONFIGURAT: parcursul de până acum și direcția actuală.]",
      },
    ],
  },
  proiecte: {
    label: "Proiecte",
    route: "/proiecte",
    fields: [
      {
        sectionKey: "hero",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere sub titlul principal",
        maxLength: 400,
        fallback: "[DE CONFIGURAT: descriere proiecte]",
      },
      {
        sectionKey: "spotlight",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere proiect de impact",
        maxLength: 400,
        fallback: "[DE CONFIGURAT: descriere proiect de impact]",
      },
    ],
  },
  "implica-te": {
    label: "Implică-te",
    route: "/implica-te",
    fields: [
      {
        sectionKey: "hero",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere sub titlul principal",
        maxLength: 400,
        fallback: "[DE CONFIGURAT: descriere invitație la implicare]",
      },
    ],
  },
  transparenta: {
    label: "Transparență",
    route: "/transparenta",
    fields: [
      {
        sectionKey: "hero",
        contentKey: "lead",
        type: "textarea",
        label: "Descriere sub titlul principal",
        maxLength: 400,
        fallback: "Credem în onestitate, responsabilitate și comunicare deschisă. [DE CONFIGURAT: cum folosim fiecare donație pentru a aduce schimbări reale.]",
      },
      {
        sectionKey: "org",
        contentKey: "registrationInfo",
        type: "textarea",
        label: "Date de înregistrare organizație",
        maxLength: 400,
        fallback: "[DE CONFIGURAT: date de înregistrare organizație — statut juridic, cod fiscal, an înființare.]",
      },
    ],
  },
  noutati: {
    label: "Noutăți",
    route: "/noutati",
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
};

export function getRegistryPage(pageKey) {
  return CONTENT_REGISTRY[pageKey] ?? null;
}

export function getRegistryField(pageKey, sectionKey, contentKey) {
  const page = getRegistryPage(pageKey);
  if (!page) return null;
  return page.fields.find((field) => field.sectionKey === sectionKey && field.contentKey === contentKey) ?? null;
}
