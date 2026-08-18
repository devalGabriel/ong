const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-.\s]{6,30}$/;
const IBAN_RE = /^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/;

/**
 * Validates one field's raw string value against its registry definition.
 * Returns { ok: true, value } with a normalized value, or { ok: false }.
 * Empty values are always valid (all SiteSettings fields are optional).
 */
export function validateSettingsField(field, rawValue) {
  const value = String(rawValue ?? "").trim();

  if (value.length === 0) {
    return { ok: true, value: "" };
  }

  if (field.maxLength && value.length > field.maxLength) {
    return { ok: false };
  }

  switch (field.type) {
    case "email":
      return EMAIL_RE.test(value) ? { ok: true, value } : { ok: false };
    case "tel":
      return PHONE_RE.test(value) ? { ok: true, value } : { ok: false };
    case "url": {
      try {
        const url = new URL(value);
        if (url.protocol !== "http:" && url.protocol !== "https:") return { ok: false };
        return { ok: true, value };
      } catch {
        return { ok: false };
      }
    }
    case "iban": {
      const normalized = value.replace(/\s+/g, "").toUpperCase();
      return IBAN_RE.test(normalized) ? { ok: true, value: normalized } : { ok: false };
    }
    case "select": {
      const allowed = (field.options ?? []).map((option) => option.value);
      return allowed.includes(value) ? { ok: true, value } : { ok: false };
    }
    case "text":
    case "textarea":
    default:
      return { ok: true, value };
  }
}
