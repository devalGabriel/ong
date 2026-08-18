import { prisma } from "@/lib/db";

/**
 * Public-facing query: published documents only, in a predictable order
 * (explicit sortOrder first, newest first as a tiebreaker).
 */
export async function getPublishedDocuments() {
  return prisma.transparencyDocument.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}
