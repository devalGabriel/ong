import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth/session";
import { storage } from "@/lib/storage";
import { validatePdfFile } from "@/lib/documents/validate-pdf";
import { validateDocumentMetadata } from "@/lib/documents/validate-metadata";
import { generateStoredName } from "@/lib/documents/generate-stored-name";

function redirectWithError(request, reason) {
  return NextResponse.redirect(new URL(`/admin/transparenta?error=${encodeURIComponent(reason)}`, request.url), { status: 303 });
}

export async function POST(request) {
  const cookieStore = await cookies();
  const session = await getSessionFromCookies(cookieStore);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    // A request body larger than the proxy's buffering limit arrives here
    // truncated/malformed rather than throwing earlier — treat it the same
    // as an oversized file instead of letting it surface as a raw 500.
    return redirectWithError(request, "file-size");
  }

  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return redirectWithError(request, "file-missing");
  }

  const metadataResult = validateDocumentMetadata({
    title: formData.get("title"),
    year: formData.get("year"),
    category: formData.get("category"),
    sortOrder: formData.get("sortOrder"),
    published: formData.get("published") === "on",
  });

  if (!metadataResult.ok) {
    return redirectWithError(request, "metadata");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const pdfCheck = validatePdfFile({ filename: file.name, mimeType: file.type, buffer });

  if (!pdfCheck.ok) {
    return redirectWithError(request, `file-${pdfCheck.reason}`);
  }

  const storedName = generateStoredName();

  try {
    await storage.saveFile(storedName, buffer);
  } catch {
    return redirectWithError(request, "storage-write");
  }

  try {
    await prisma.transparencyDocument.create({
      data: {
        ...metadataResult.value,
        originalName: file.name.slice(0, 200),
        storedName,
        mimeType: file.type,
        sizeBytes: buffer.length,
      },
    });
  } catch {
    // The filesystem write and the DB write are two separate operations,
    // not one atomic transaction. If the DB write fails after the file was
    // already saved, clean up the orphaned file rather than leaving a
    // physical PDF with no metadata row pointing at it.
    await storage.deleteFile(storedName).catch(() => {});
    return redirectWithError(request, "db-write");
  }

  revalidatePath("/transparenta");
  return NextResponse.redirect(new URL("/admin/transparenta?uploaded=1", request.url), { status: 303 });
}
