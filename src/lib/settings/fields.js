/**
 * Controlled registry of SiteSettings fields.
 * Single source of truth for the admin form, server-side validation,
 * and the field list persisted to the singleton SiteSettings row.
 */
export const SETTINGS_FIELDS = [
  { key: "organizationName", label: "Numele organizației", type: "text", maxLength: 150 },
  { key: "legalName", label: "Denumire legală", type: "text", maxLength: 150 },
  { key: "fiscalCode", label: "Cod fiscal / CUI", type: "text", maxLength: 30 },
  { key: "address", label: "Adresă", type: "textarea", maxLength: 300 },
  { key: "email", label: "Email", type: "email", maxLength: 150 },
  { key: "phone", label: "Telefon", type: "tel", maxLength: 30 },
  { key: "facebookUrl", label: "Facebook (URL)", type: "url", maxLength: 300 },
  { key: "instagramUrl", label: "Instagram (URL)", type: "url", maxLength: 300 },
  { key: "tiktokUrl", label: "TikTok (URL)", type: "url", maxLength: 300 },
  { key: "ibanRon", label: "IBAN RON", type: "iban", maxLength: 34 },
  { key: "ibanEur", label: "IBAN EUR", type: "iban", maxLength: 34 },
  { key: "bankName", label: "Bancă", type: "text", maxLength: 150 },
  {
    key: "donationProviderType",
    label: "Provider donații",
    type: "select",
    options: [
      { value: "", label: "Niciunul (doar transfer bancar)" },
      { value: "stripe", label: "Stripe" },
      { value: "paypal", label: "PayPal" },
      { value: "revolut", label: "Revolut" },
      { value: "other", label: "Altul" },
    ],
  },
  { key: "donationProviderPublicUrl", label: "Link public checkout donații (URL)", type: "url", maxLength: 300 },
];

export function getSettingsField(key) {
  return SETTINGS_FIELDS.find((field) => field.key === key) ?? null;
}
