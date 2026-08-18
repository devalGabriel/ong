/**
 * Controlled registry of SiteSettings fields.
 * Single source of truth for the admin forms (Setări + Donații), server-side
 * validation, and the field list persisted to the singleton SiteSettings row.
 * `group` lets each admin page derive its own field subset by filtering
 * this one array instead of duplicating key lists.
 */
export const SETTINGS_FIELDS = [
  { key: "organizationName", label: "Numele organizației", type: "text", maxLength: 150, group: "org" },
  { key: "legalName", label: "Denumire legală", type: "text", maxLength: 150, group: "org" },
  { key: "fiscalCode", label: "Cod fiscal / CUI", type: "text", maxLength: 30, group: "org" },
  { key: "address", label: "Adresă", type: "textarea", maxLength: 300, group: "org" },
  { key: "email", label: "Email", type: "email", maxLength: 150, group: "contact" },
  { key: "phone", label: "Telefon", type: "tel", maxLength: 30, group: "contact" },
  { key: "facebookUrl", label: "Facebook (URL)", type: "url", maxLength: 300, group: "social" },
  { key: "instagramUrl", label: "Instagram (URL)", type: "url", maxLength: 300, group: "social" },
  { key: "tiktokUrl", label: "TikTok (URL)", type: "url", maxLength: 300, group: "social" },
  { key: "ibanRon", label: "IBAN RON", type: "iban", maxLength: 34, group: "donations" },
  { key: "ibanEur", label: "IBAN EUR", type: "iban", maxLength: 34, group: "donations" },
  { key: "bankName", label: "Bancă", type: "text", maxLength: 150, group: "donations" },
  {
    key: "donationProviderType",
    label: "Provider donații",
    type: "select",
    group: "donations",
    options: [
      { value: "", label: "Niciunul (doar transfer bancar)" },
      { value: "stripe", label: "Stripe" },
      { value: "paypal", label: "PayPal" },
      { value: "revolut", label: "Revolut" },
      { value: "other", label: "Altul" },
    ],
  },
  { key: "donationProviderPublicUrl", label: "Link public checkout donații (URL)", type: "url", maxLength: 300, group: "donations" },
];

export function getSettingsField(key) {
  return SETTINGS_FIELDS.find((field) => field.key === key) ?? null;
}

export function getSettingsFieldsByGroup(group) {
  return SETTINGS_FIELDS.filter((field) => field.group === group);
}
