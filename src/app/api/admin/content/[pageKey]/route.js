import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth/session";
import { getRegistryPage } from "@/lib/content/registry";

export async function POST(request, { params }) {
  const { pageKey } = await params;

  const cookieStore = await cookies();
  const session = await getSessionFromCookies(cookieStore);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page = getRegistryPage(pageKey);
  if (!page) {
    return NextResponse.json({ error: "Unknown page" }, { status: 404 });
  }

  const formData = await request.formData();
  const redirectBase = `/admin/continut/${pageKey}`;

  for (const field of page.fields) {
    const key = `${field.sectionKey}.${field.contentKey}`;
    if (!formData.has(key)) continue;

    const raw = String(formData.get(key) ?? "").trim();

    if (raw.length > field.maxLength) {
      return NextResponse.redirect(
        new URL(`${redirectBase}?error=1&field=${encodeURIComponent(field.label)}`, request.url),
        { status: 303 }
      );
    }

    if (raw.length === 0) {
      await prisma.pageContent.deleteMany({
        where: { pageKey, sectionKey: field.sectionKey, contentKey: field.contentKey },
      });
      continue;
    }

    await prisma.pageContent.upsert({
      where: { pageKey_sectionKey_contentKey: { pageKey, sectionKey: field.sectionKey, contentKey: field.contentKey } },
      update: { value: raw, contentType: field.type },
      create: { pageKey, sectionKey: field.sectionKey, contentKey: field.contentKey, contentType: field.type, value: raw },
    });
  }

  if (page.route) {
    revalidatePath(page.route);
  }

  return NextResponse.redirect(new URL(`${redirectBase}?saved=1`, request.url), { status: 303 });
}
