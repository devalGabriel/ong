import { prisma } from "@/lib/db";
import { CONTENT_REGISTRY } from "./registry";

/**
 * Real dashboard stats derived from the registry + PageContent table —
 * no fabricated numbers. "Published %" means "fields with a live DB
 * override vs. still on their fallback", which is the only honest
 * definition available in an architecture with no draft/publish state.
 */
export async function getRegistryStats() {
  const pages = Object.entries(CONTENT_REGISTRY);
  const totalFields = pages.reduce((sum, [, page]) => sum + page.fields.length, 0);

  const rows = await prisma.pageContent.findMany();

  const validKeys = new Set(
    pages.flatMap(([pageKey, page]) => page.fields.map((field) => `${pageKey}.${field.sectionKey}.${field.contentKey}`))
  );

  const liveOverrides = rows.filter(
    (row) => validKeys.has(`${row.pageKey}.${row.sectionKey}.${row.contentKey}`) && row.value.trim().length > 0
  );

  const lastUpdatedAt = rows.reduce((latest, row) => (!latest || row.updatedAt > latest ? row.updatedAt : latest), null);

  return {
    pageCount: pages.length,
    totalFields,
    liveOverrideCount: liveOverrides.length,
    publishedPct: totalFields ? Math.round((liveOverrides.length / totalFields) * 100) : 0,
    lastUpdatedAt,
  };
}
