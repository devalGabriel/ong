import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { hashPassword } from "../src/lib/auth/password.js";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment before seeding.");
    process.exitCode = 1;
    return;
  }

  if (password.length < 8) {
    console.error("ADMIN_PASSWORD must be at least 8 characters.");
    process.exitCode = 1;
    return;
  }

  const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const passwordHash = hashPassword(password);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, active: true },
    create: { email, passwordHash, role: "ADMIN", active: true },
  });

  console.log(`Admin user ready: ${user.email}`);
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  process.exitCode = 1;
});
