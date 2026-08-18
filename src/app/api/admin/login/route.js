import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/auth/session";

let dummyHash;
function getDummyHash() {
  if (!dummyHash) dummyHash = hashPassword("dummy-password-for-constant-time-comparison");
  return dummyHash;
}

function redirectTo(request, path) {
  return NextResponse.redirect(new URL(path, request.url), { status: 303 });
}

export async function POST(request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return redirectTo(request, "/admin/login?error=1");
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  const passwordOk = verifyPassword(password, user?.passwordHash ?? getDummyHash());

  if (!user || !user.active || !passwordOk) {
    return redirectTo(request, "/admin/login?error=1");
  }

  const token = await createSessionToken({ sub: user.id, email: user.email }, process.env.SESSION_SECRET);

  const response = redirectTo(request, "/admin");
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
