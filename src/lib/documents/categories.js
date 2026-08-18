/**
 * Controlled category list for TransparencyDocument.
 * Admin picks from this fixed set — category is not free text.
 */
export const DOCUMENT_CATEGORIES = [
  { value: "raport-anual", label: "Raport anual" },
  { value: "situatie-financiara", label: "Situație financiară" },
  { value: "document-util", label: "Document util" },
];

export function getCategoryLabel(value) {
  return DOCUMENT_CATEGORIES.find((category) => category.value === value)?.label ?? value;
}

export function isValidCategory(value) {
  return DOCUMENT_CATEGORIES.some((category) => category.value === value);
}
