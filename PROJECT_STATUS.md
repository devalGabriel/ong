# PROJECT_STATUS.md

- Project root: `ong/`
- Existing source folders: `mockup/`, `assets/`
- Architecture: Next.js full-stack on VPS
- Database: SQLite + Prisma
- PDF storage: local persistent disk
- Current stage: STAGE 7
- Overall status: STAGE 7 PASS
- GitHub: https://github.com/devalGabriel/ong (branch `master`, pushed through Stage 6 so far)

| Stage | Status | Lint | Build | DB/Migration | Review |
|---|---|---|---|---|---|
| 0 Preflight | APPROVED | N/A | N/A | N/A | Approved |
| 1 Foundation | PASS | PASS | PASS | PASS | Pending |
| 2 Homepage | PASS | PASS | PASS | N/A | Superseded by Stage 3 |
| 3 Visual refinement | PASS | PASS | PASS | N/A | Pending — no screenshots (browser tooling unavailable this session) |
| 4 Public pages | PASS | PASS | PASS | N/A | Pending |
| 5 Auth/Admin | PASS | PASS | PASS | PASS (seed only, no new migration) | Pending |
| 6 Content management | PASS | PASS | PASS | PASS (no new migration, existing `PageContent` table) | Pending |
| 7 Site settings | PASS | PASS | PASS | PASS (no new migration, existing `SiteSettings` table) | Pending |
| 8 Transparency PDFs | NOT STARTED | Pending | Pending | Pending | Pending |
| 9 Donations | NOT STARTED | Pending | Pending | N/A | Pending |
| 10 Hardening/Deploy | NOT STARTED | Pending | Pending | Pending | Pending |

## Decisions
- JavaScript only
- no static export
- no Tailwind
- SQLite + Prisma
- local persistent PDF storage
- no page builder / arbitrary HTML
- public pages follow `mockup/`
- public imagery comes from `assets/`
- admin intentionally has no mock-up
- MVP public routes (exactly 8, no slug/legal pages): `/`, `/despre-noi`, `/proiecte`, `/implica-te`, `/transparenta`, `/noutati`, `/contact`, `/doneaza`
- Next.js 16.3.1 (App Router, `src/`), React 19.2.8, `agentRules: false` in `next.config.mjs`
- Prisma 7.9.1 + `@prisma/adapter-better-sqlite3` 7.9.1 + `better-sqlite3` 12.11.1; Prisma Client generated as ESM/TS to `src/generated/prisma` (generated artifact, never hand-edited)
- Prisma 7 removed `datasource.url` from `schema.prisma`; the connection URL lives in `prisma.config.mjs` (CLI) and is passed via the `adapter` to `PrismaClient` at runtime (`src/lib/db/index.js`)
- `DATABASE_URL="file:./prisma/dev.db"`, resolved relative to process cwd by both the Prisma CLI and the runtime adapter — verified they agree on the same file
- storage abstraction shell only (`src/lib/storage/`); no PDF upload/validation logic yet (Stage 8)

## Stage 2 notes
- Full mock-up ↔ route mapping built this session (no Stage 0 report file existed on disk): (1)=`/`, (2)=`/despre-noi`, (3)=`/proiecte`, (4)=`/implica-te`, (5)=`/transparenta`, (6)=`/noutati`, (7)=`/contact`, (8)=`/doneaza`. High confidence — active nav item + content match exactly in each mock-up.
- Homepage uses real assets `1.png`, `2.png`, `8.png`, `9.png` (copied traceably into `public/assets/`). No sourced icon/logo asset files exist, so nav/section icons and the logo mark are hand-built inline SVGs — flagged under Missing/ambiguous assets in the Stage 2 report.
- Any specific factual claim from the mock-up (org name, impact numbers, address, phone, team, partner logos) was replaced with a `[DE CONFIGURAT]`/bracket placeholder; generic slogans/UI labels were kept.

## Stage 3 notes
- Added a real type scale (h1/h2/h3), header nav active-state + uppercase treatment, heart icons on donate CTAs, hero divider rule, hand-built leaf-sprig/dot-grid decorative accents (no source files for these exist in `assets/`), removed hard borders from "how to get involved" cards in favor of shadow, and alternated impact-stat colors — all reasoned from a close re-read of homepage mock-up (1) since no browser screenshot tooling was available to verify visually.
- Still owed: an actual visual/screenshot pass at 390/768/1024/1440 once browser tooling is available — code-reviewed responsive behavior only.

## Stage 4 notes
- Full re-read of mock-ups 2–7 (Despre noi, Proiecte, Implică-te, Transparență, Noutăți, Contact); high-confidence mapping already recorded above (Stage 2 notes).
- Extracted shared UI into `src/styles/components.css` (global classes: `.btn-primary`, `.btn-secondary`, `.eyebrow`, `.divider`, `.link-arrow`, `.card`, `.stats-grid`, `.cta-band`, `.empty-state`) and a reusable `PageHero` component, since every remaining page repeats the same hero/stats/CTA-band pattern from the homepage.
- Content-integrity decisions (no invented NGO facts), most consequential first:
  - **Omitted** the "Parteneri & susținători" section on Despre noi entirely — the mock-up names real, identifiable companies (Regina Maria, MedLife, BCR, Star Storage, ENGIE); reproducing those logos/names without verified partnership would falsely imply an existing relationship. Flagged as missing real content, not filled with a placeholder.
  - **Omitted** the "Povești din comunitate" testimonials on Implică-te — the mock-up attributes specific fabricated quotes to named individuals with photos; inventing speech/endorsement from a nonexistent named person is a stronger integrity issue than a missing statistic, so no bracketed substitute was used either.
  - Despre-noi's team grid keeps the mock-up's 4-card structure but uses placeholder avatars (no photos) and `[DE CONFIGURAT]` name/role — an empty slot for real staff data, not a fabricated identity.
  - Transparență's donation-use "donut" values and the 6-point history timeline keep their structure with `[DE CONFIGURAT]` values (consistent with how stats are handled elsewhere) rather than the mock-up's specific fabricated percentages/years.
  - Transparență's "Documente disponibile" and Noutăți's article grid render an explicit empty-state message instead of the mock-up's fabricated PDF/article cards (dates, file sizes, outcomes) — consistent with the prompt's explicit "empty/controlled demo state" allowance for Transparency, extended to Noutăți for the same no-invented-facts reason (no `NewsArticle` model exists in MVP anyway).
  - Proiecte's project-card images approximate the mock-up using only the 9 real source photos (one card, "Zâmbete în spital", has no matching photo among the 9 and reuses the hero photo as the closest available substitute — flagged, not a perfect match).
- Contact/volunteer/newsletter forms are built with real fields but a disabled submit button and a visible `[DE CONFIGURAT]` note — no backend/provider exists, so nothing fakes a working submission (contact form allowance was explicit in the prompt; applied the same logic to the other two forms for consistency).
- No detail/slug routes exist in MVP, so "Vezi proiectul" / per-card "Află mai multe" links from the mock-up have no real target — Proiecte page states this explicitly instead of linking nowhere.

## Stage 5 notes
- Next.js 16 renamed `middleware.js` → `proxy.js` (exported function `proxy`, fixed Node.js runtime, no `edge` option) — used the new convention at `src/proxy.js`, confirmed via the bundled `node_modules/next/dist/docs` upgrade guide rather than assumed.
- Auth is dependency-free: `node:crypto` `scrypt` (salted, timing-safe compare) for password hashing; Web Crypto (`crypto.subtle` HMAC-SHA256) for signed session cookies — both work identically in `proxy.js`'s Node runtime and in Route Handlers, so no separate Edge-compatible code path was needed.
- Login/logout are plain Route Handlers (`src/app/api/admin/login`, `.../logout`) driven by native `<form method="POST">`, not Server Actions — chosen so the flow is directly testable with `curl` and works without client JS.
- `scripts/seed-admin.js` upserts `AdminUser` from `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars (`npm run seed:admin`); no admin user or credentials are created automatically or committed. It imports the generated `src/generated/prisma/client.ts` directly — Node 24's native TS type-stripping loads it without a build step (verified empirically, not assumed).
- Added `"type": "module"` to `package.json` (all source was already ESM) to remove a Node warning when running the seed script directly.
- `.env` (gitignored, dev-only) now also holds a generated `SESSION_SECRET` and a test `ADMIN_EMAIL`/`ADMIN_PASSWORD`; `.env.example` documents the three new variables with empty placeholders and no real values.

## Stage 6 notes
- Editable-field registry lives in `src/lib/content/registry.js` — one entry per page (`pageKey` → label, public route, field list). Each field carries `sectionKey`/`contentKey` (matching `PageContent`'s unique key), `type` (`text`/`textarea`), `maxLength`, and the fallback/seed string already used on the page. This is the single source of truth for the admin form, server-side validation, and the public page's fallback.
- Deliberately curated, not exhaustive: 1–3 highest-value fields per page (mostly hero lead paragraphs, plus a couple of richer slots like Despre-noi's story paragraphs and Transparență's org-registration blurb) — 13 fields total across 7 pages, not every string on every page. The mechanism is generic, so extending coverage later is just adding registry entries.
- `/doneaza` is intentionally excluded — it's still the Stage 1 placeholder (real structure lands in Stage 9), so there's no real mock-up-driven content to register yet.
- Contact/footer address, phone, and email were deliberately left out of this registry — `DATA_MODEL.md` assigns those to `SiteSettings`, reused across footer/contact/donations in Stage 7, not to `PageContent`.
- Public pages became `async` Server Components calling `getPageContent(pageKey)` (`src/lib/content/get-page-content.js`), which reads all rows for that page in one query and substitutes each field's registry fallback when no override exists or the override is blank — this is what satisfies "fallback remains for missing keys."
- Cache/revalidation strategy: pages stay statically generated by default (confirmed via `next build` output — still `○ Static` after adding the DB read); every successful admin save calls `revalidatePath(page.route)` so the next request regenerates that exact page. Verified this actually works under real production caching (`next start`, not just `next dev`) — a homepage edit showed up on `/` immediately after save, and reverting to empty correctly restored the fallback on both the public page and the admin form.
- Save endpoint is `POST /api/admin/content/[pageKey]` (plain Route Handler + native form, same pattern as Stage 5 login/logout — curl-testable, no client JS required). Empty submitted value deletes the `PageContent` row (revert-to-fallback) rather than storing blank text. Oversized input is rejected without touching the DB.
- `src/proxy.js` matcher extended to `/api/admin/:path*` (still allowlisting `/api/admin/login`) so the new write endpoint gets the same edge-of-request protection as `/admin/*`, on top of the route handler's own session check.

## Stage 7 notes
- `SiteSettings` is a true singleton (no natural business key): the save route does `findFirst()` then `update`-by-id or `create` — never more than one row. Reused the Stage 6/7-consistent pattern: `src/lib/settings/fields.js` (field registry: label, input type, maxLength, select options) → drives both the admin form and server-side validation, same spirit as the content registry.
- Validation (`src/lib/settings/validate.js`) is per-type: `email`/`url`/`tel` regex or `new URL()` checks (URL must be http/https), IBAN via a general `^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$` pattern (not Romania-only, since `ibanEur` could reasonably be a non-RO account), `select` restricted to the registry's fixed option list. All fields are optional — empty is always valid; validation only fires on non-empty values, matching "values may be empty."
- `donationProviderType`/`donationProviderPublicUrl` are admin-entered labels/links only — no real provider is wired up or invented, consistent with "do not invent provider URLs/config." Stage 9 will consume `getSiteSettings()` for the actual donate-page UI.
- Front reuse: `(public)/layout.js` now fetches settings once and passes them into `Header`/`Logo` (organization name) and `Footer` (name, description slot, address/phone/email, social links — icons only render for links that are actually set); the Contact page's "Date de contact" block reads the same address/email/phone. `/doneaza` deliberately untouched — still the Stage 1 placeholder, real IBAN-fallback UI is Stage 9's job.
- Save calls `revalidatePath("/", "layout")` (not a single path) since Footer/Header live in layouts shared by every public route — confirmed via the bundled Next.js docs that revalidating a layout cascades to all nested layouts and pages under it.
- Tested against a production build (`next start`): unauthorized write → 401; invalid email/URL/IBAN each rejected without writing; valid save persists and shows up immediately on both `/` (footer) and `/contact`; clearing one field (blank optional) removes just that value (e.g. Facebook link disappears from the footer) without disturbing the rest. Dev DB reset to empty afterward.

## Stage 1 known risk
`npm audit` reports 3 high-severity advisories against `deepmerge-ts` (via `@prisma/config`), affecting all current Prisma 7.x releases. `npm audit fix --force` would downgrade to `prisma@6.12.0`, which conflicts with the required Prisma major version 7 — left unfixed, tracked for re-check when a patched Prisma 7 release is available.
