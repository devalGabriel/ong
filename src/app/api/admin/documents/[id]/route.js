import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth/session";
import { validateDocumentMetadata } from "@/lib/documents/validate-metadata";

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

  const formData = await request.formData();
  const metadataResult = validateDocumentMetadata({
    title: formData.get("title"),
    year: formData.get("year"),
    category: formData.get("category"),
    sortOrder: formData.get("sortOrder"),
    published: formData.get("published") === "on",
  });

  if (!metadataResult.ok) {
    return NextResponse.redirect(new URL(`/admin/transparenta/${id}?error=1`, request.url), { status: 303 });
  }

  await prisma.transparencyDocument.update({ where: { id }, data: metadataResult.value });

  revalidatePath("/transparenta");
  return NextResponse.redirect(new URL(`/admin/transparenta/${id}?saved=1`, request.url), { status: 303 });
}
