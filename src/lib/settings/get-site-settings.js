import { prisma } from "@/lib/db";
import { SETTINGS_FIELDS } from "./fields";

function emptyDefaults() {
  const defaults = {};
  for (const field of SETTINGS_FIELDS) defaults[field.key] = "";
  return defaults;
}

/**
 * Reads the singleton SiteSettings row (there is at most one).
 * Missing/null fields are normalized to "" so consumers never null-check.
 */
export async function getSiteSettings() {
  const row = await prisma.siteSettings.findFirst();
  const merged = { ...emptyDefaults(), ...(row ?? {}) };

  for (const key of Object.keys(merged)) {
    if (merged[key] == null) merged[key] = "";
  }

  return merged;
}
