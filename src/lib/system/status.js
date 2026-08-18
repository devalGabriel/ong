import { prisma } from "@/lib/db";
import { localStorage } from "@/lib/storage/local";

/**
 * Real reachability check (DB + storage), not a hardcoded "always green" badge.
 */
export async function getSystemStatus() {
  const [dbOk, storageOk] = await Promise.all([
    prisma
      .$queryRaw`SELECT 1`
      .then(() => true)
      .catch(() => false),
    localStorage
      .ensureStorageRoot()
      .then(() => true)
      .catch(() => false),
  ]);

  return { ok: dbOk && storageOk, database: dbOk, storage: storageOk };
}
