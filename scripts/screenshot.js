import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Dev-only QA tool: captures screenshots of local pages at fixed breakpoints
 * so pages can be checked against their mock-ups without a browser extension.
 *
 * Usage:
 *   node scripts/screenshot.js <route> [route2] [...]
 *   node scripts/screenshot.js / /despre-noi /proiecte
 *
 * Env vars:
 *   BASE_URL   default "http://localhost:3100"
 *   WIDTHS     comma-separated viewport widths, default "390,768,1024,1440"
 *   OUT_DIR    default "scripts/screenshots"
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3100";
const WIDTHS = (process.env.WIDTHS || "390,768,1024,1440").split(",").map((w) => parseInt(w.trim(), 10));
const OUT_DIR = process.env.OUT_DIR || "scripts/screenshots";

function slugify(route) {
  if (route === "/") return "home";
  return route.replace(/^\//, "").replace(/\//g, "-");
}

async function main() {
  const routes = process.argv.slice(2);
  if (routes.length === 0) {
    console.error("Usage: node scripts/screenshot.js <route> [route2] ...");
    process.exitCode = 1;
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  try {
    for (const route of routes) {
      const url = new URL(route, BASE_URL).toString();
      for (const width of WIDTHS) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        await page.goto(url, { waitUntil: "networkidle" });
        const file = path.join(OUT_DIR, `${slugify(route)}-${width}.png`);
        await page.screenshot({ path: file, fullPage: true });
        console.log(`saved ${file}`);
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
