import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth/session";
import { storage } from "@/lib/storage";

export async function POST(request, { params }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const session = await getSessionFromCookies(cookieStore);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.transparencyDocument.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  // Not one atomic operation: delete the physical file first. A dangling
  // DB row pointing at a missing file is worse for the public site (a
  // broken download link) than an orphaned file left on disk, so if the
  // file delete fails we still remove the DB row and report the mismatch.
  const fileResult = await storage.deleteFile(existing.storedName).then(
    () => ({ ok: true }),
    () => ({ ok: false })
  );

  await prisma.transparencyDocument.delete({ where: { id } });

  revalidatePath("/transparenta");

  const flag = fileResult.ok ? "deleted=1" : "deleted=1&fileWarning=1";
  return NextResponse.redirect(new URL(`/admin/transparenta?${flag}`, request.url), { status: 303 });
}
