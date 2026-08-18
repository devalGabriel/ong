import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth/session";
import { SETTINGS_FIELDS } from "@/lib/settings/fields";
import { validateSettingsField } from "@/lib/settings/validate";

export async function POST(request) {
  const cookieStore = await cookies();
  const session = await getSessionFromCookies(cookieStore);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const data = {};

  for (const field of SETTINGS_FIELDS) {
    if (!formData.has(field.key)) continue;

    const result = validateSettingsField(field, formData.get(field.key));
    if (!result.ok) {
      return NextResponse.redirect(
        new URL(`/admin/setari?error=1&field=${encodeURIComponent(field.label)}`, request.url),
        { status: 303 }
      );
    }
    data[field.key] = result.value;
  }

  const existing = await prisma.siteSettings.findFirst();
  if (existing) {
    await prisma.siteSettings.update({ where: { id: existing.id }, data });
  } else {
    await prisma.siteSettings.create({ data });
  }

  revalidatePath("/", "layout");

  return NextResponse.redirect(new URL("/admin/setari?saved=1", request.url), { status: 303 });
}
