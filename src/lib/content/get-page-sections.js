import { getRegistryPage } from "./registry";

/**
 * Derives the (fixed, read-only) list of sections for a page directly from
 * the registry's field order — no separate "Section" model. Used by the
 * admin editor to display the page's structure without implying it can be
 * added to, removed, or reordered.
 */
export function getPageSections(pageKey) {
  const page = getRegistryPage(pageKey);
  if (!page) return [];

  const order = [];
  for (const field of page.fields) {
    if (!order.includes(field.sectionKey)) order.push(field.sectionKey);
  }

  return order.map((sectionKey, index) => ({
    index: index + 1,
    sectionKey,
    label: page.sectionLabels?.[sectionKey] ?? sectionKey,
    fields: page.fields.filter((field) => field.sectionKey === sectionKey),
  }));
}
