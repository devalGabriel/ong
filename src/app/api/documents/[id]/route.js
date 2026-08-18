import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { storage } from "@/lib/storage";

/**
 * Public route: serves only published documents, streamed through the
 * storage abstraction. Never exposes the physical file path.
 */
export async function GET(request, { params }) {
  const { id } = await params;

  const doc = await prisma.transparencyDocument.findUnique({ where: { id } });
  if (!doc || !doc.published) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let buffer;
  try {
    buffer = await storage.readFile(doc.storedName);
  } catch {
    return NextResponse.json({ error: "File unavailable" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const disposition = searchParams.get("download") === "1" ? "attachment" : "inline";
  const safeName = doc.originalName.replace(/["\r\n]/g, "");

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="${safeName}"`,
      "Content-Length": String(buffer.length),
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
