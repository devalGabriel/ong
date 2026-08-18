import { prisma } from "@/lib/db";
import { getRegistryPage } from "./registry";

/**
 * Returns an effective content map for a page: `{ "section.key": value }`.
 * Falls back to the registry's seed value whenever no DB override exists,
 * so pages never render blank/missing text.
 */
export async function getPageContent(pageKey) {
  const page = getRegistryPage(pageKey);
  if (!page) {
    throw new Error(`Unknown content pageKey: ${pageKey}`);
  }

  const rows = await prisma.pageContent.findMany({ where: { pageKey } });
  const overrides = new Map(rows.map((row) => [`${row.sectionKey}.${row.contentKey}`, row.value]));

  const content = {};
  for (const field of page.fields) {
    const key = `${field.sectionKey}.${field.contentKey}`;
    const override = overrides.get(key);
    content[key] = override && override.trim().length > 0 ? override : field.fallback;
  }
  return content;
}
