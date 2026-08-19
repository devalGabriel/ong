# PROJECT_STATUS.md

- Project root: `ong/`
- Existing source folders: `mockup/`, `assets/`
- Architecture: Next.js full-stack on VPS
- Database: SQLite + Prisma
- PDF storage: local persistent disk
- Current stage: STAGE 9 + content-population pass + admin dashboard rebuild (all out-of-band, user-directed)
- Overall status: STAGE 9 PASS; see "Content-population pass" and "Admin dashboard rebuild" notes below for significant post-Stage-9 changes
- GitHub: https://github.com/devalGabriel/ong (branch `master`, pushed through Stage 9 + content-population pass so far)
- Dev tooling: Playwright installed (`npm run screenshot -- <route> [route2] ...`) for visual QA against mock-ups — run from PowerShell, not Git Bash (Git Bash mangles leading `/` route arguments into Windows paths)

| Stage | Status | Lint | Build | DB/Migration | Review |
|---|---|---|---|---|---|
| 0 Preflight | APPROVED | N/A | N/A | N/A | Approved |
| 1 Foundation | PASS | PASS | PASS | PASS | Pending |
| 2 Homepage | PASS | PASS | PASS | N/A | Superseded by Stage 3 |
| 3 Visual refinement | PASS | PASS | PASS | N/A | Pending — no screenshots at the time (Playwright now installed since Stage 8 prep; a real visual re-check is still owed) |
| 4 Public pages | PASS | PASS | PASS | N/A | Pending |
| 5 Auth/Admin | PASS | PASS | PASS | PASS (seed only, no new migration) | Pending |
| 6 Content management | PASS | PASS | PASS | PASS (no new migration, existing `PageContent` table) | Pending |
| 7 Site settings | PASS | PASS | PASS | PASS (no new migration, existing `SiteSettings` table) | Pending |
| 8 Transparency PDFs | PASS | PASS | PASS | PASS (no new migration, existing `TransparencyDocument` table) | Pending |
| 9 Donations | PASS | PASS | PASS | N/A | Pending |
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

## Stage 8 notes
- Real bug caught by testing, not by inspection: Next.js's Proxy buffers request bodies up to `experimental.proxyClientMaxBodySize` (default 10MB) *before* the route handler ever sees them; my own `TRANSPARENCY_MAX_UPLOAD_BYTES` app-level check also defaulted to 10MB. An 11MB upload landed exactly in the gap — the proxy silently truncated the body, `request.formData()` then threw on the broken multipart boundary, and it surfaced as a raw 500. Fixed by raising `proxyClientMaxBodySize` to `"15mb"` in `next.config.mjs` (headroom above the app limit) and wrapping `request.formData()` in a try/catch that redirects with a clean `file-size` error either way — so this is handled even if someone sends a request bigger than the raised proxy limit too.
- Upload validation never trusts the client: extension check, then declared MIME check, then `%PDF-` magic-byte check on the actual buffer, then size check — in that order, all server-side, before anything touches disk or DB.
- Stored filenames are `crypto.randomUUID() + ".pdf"` (`src/lib/documents/generate-stored-name.js`) — never derived from the client's original filename, which is kept only as DB metadata (`originalName`) and reused solely for the `Content-Disposition` header on download (stripped of quotes/newlines).
- Filesystem write and DB write are explicitly non-atomic and handled as such: upload cleans up the orphaned file if the DB `create` fails after the file was already written; delete removes the physical file first and still deletes the DB row even if the file delete fails (a dangling DB row pointing at a missing file is worse for the public site than an orphaned file on disk) — surfaced to the admin via a `fileWarning` flag rather than silently claiming success either way.
- Category is a controlled 3-option select (`src/lib/documents/categories.js`: raport-anual / situatie-financiara / document-util) — not free text, consistent with the project's "controlled select, no arbitrary content" rule.
- Full negative-test matrix run against a **production** build (`next start`), using real fixture files (valid PDF header, plain `.txt`, a `.pdf`-renamed file with a spoofed `application/pdf` client MIME but no real PDF header, an 11MB file, and Windows-path curl uploads — Git Bash's `curl -F @path` needed native `C:\...` paths, not POSIX `/c/...`, to actually find the file):

| Test | Result |
|---|---|
| Unauthenticated upload | 401, nothing written |
| Valid upload (authenticated) | saved, file on disk with a UUID name, DB row created |
| Wrong extension (`.txt`) | rejected (`file-extension`), before any content is read |
| Spoofed MIME, fake PDF content | rejected (`file-signature`) — proves the magic-byte check catches what extension+MIME alone would miss |
| Oversized file (>10MB) | rejected (`file-size`) after the proxy-body-limit fix, no crash |
| Path traversal (`../../../etc/passwd`, backslash variants) | rejected at the storage layer (`path.basename` guard) — tested directly against `src/lib/storage/local.js` since no HTTP parameter ever accepts a raw filename by design |
| Unpublished doc via public `/api/documents/[id]` | 404 |
| Published doc via public `/api/documents/[id]` | 200, correct `Content-Type`/`Content-Disposition`/`Content-Length`; `?download=1` switches to `attachment` |
| Invalid delete/update ID | 404, no crash |
| Unauthenticated delete | 401 |
| Full delete lifecycle | file removed from `storage/transparency/`, DB row removed, public page reverts to empty state |

Dev storage/DB reset to empty afterward.

## Stage 9 notes
- Provider classification at time of implementation: **B — not configured** (`SiteSettings.donationProviderType`/`donationProviderPublicUrl` empty in the dev DB, no real credentials given). Verified both states actually render correctly by temporarily setting a test provider (`stripe` / a placeholder `donate.stripe.com` URL) via the Stage 7 admin settings API, screenshotting both, then reverting — not just reasoned about in the abstract.
- No card fields, payment secrets, or improvised payment backend anywhere — grepped the new code for card/CVV/expiry/API-key terms, zero matches. When a provider *is* configured, the page only ever links out (`target="_blank"`) to the admin-entered `donationProviderPublicUrl` exactly as stored — no query-string amount/donor-data is appended, since I don't know any real provider's expected contract and CLAUDE.md forbids inventing one. The donor-info form and amount picker are local UI state only (Client Components, nothing submitted anywhere); a visible `[DE CONFIGURAT]` note says so explicitly, matching the pattern already used on Contact/Implică-te.
- IBAN/bank-name from `SiteSettings` render with a working "Copiază" (clipboard) button when set, and a bracketed placeholder when not — reused, not reimplemented.
- Mock-up's 3-way payment method list (Card bancar / Transfer bancar / Plată prin redirecționare) was intentionally simplified to 2 (online-via-provider-link / bank transfer) — the first two both really mean "hand off to an external provider," which is one code path here, not two we can meaningfully distinguish without a real integration. Noted as a deliberate adaptation, not an oversight.
- No `/doneaza/succes` or `/doneaza/eroare` pages were added — MVP is fixed at exactly 8 routes (`CLAUDE.md`), and with no live provider there's no real callback to design a success/error UX around yet; deferred to whenever a real provider is actually integrated (reported as separate scope per the stage prompt, not improvised).
- Dev DB/settings reset to empty after testing.

## Content-population pass (out-of-band, explicit user override of the "no invented NGO facts" default)
The user directed (after being shown the conflict and choosing to proceed twice, once for icon extraction — later abandoned as low-quality and reverted — and once specifically for this) that **all page content should match the mock-ups exactly**, reversing the `[DE CONFIGURAT]`-bracket convention used through Stages 2–9. This is a deliberate, explicit, informed override of `CLAUDE.md`'s "no invented NGO facts" rule for demo purposes — not an oversight. Concretely:
- Org identity is now "Fii Schimbarea" / "pe care vrei să o vezi în lume" everywhere (`Logo.js`, `Footer.js`, root `layout.js` metadata, admin shell branding) — previously `[Numele Organizației]`.
- `src/lib/content/registry.js` fallback strings (hero copy, about/story text, org-registration blurb) now hold the mock-ups' exact copy instead of bracket placeholders — still overridable later via the Stage 6 admin editor, same mechanism as before.
- Real stat numbers restored per page (Home: 2+/5000+/20+/100+; Proiecte: 25+/5000+/40+/120+ — the mock-ups use different numbers on different pages; kept each page faithful to its own mock-up rather than reconciling the inconsistency myself).
- Despre-noi: real team names/roles (Andreea Popescu, Radu Ionescu, Maria Dinu, Vlad Munteanu) with generic person-icon avatars (no fabricated photos); a partner strip with the 5 real company names from the mock-up (Regina Maria, MedLife, BCR, Star Storage, ENGIE) — **rendered as plain text labels, not fabricated logo graphics**, since recreating real trademarks was never in scope even under this content decision.
- Implică-te: the 3 testimonials from the mock-up restored (Andreea M., Alex D., Ioana P.) with generic avatars, no fabricated photos.
- Noutăți: rebuilt from an empty-state back to the mock-up's featured article + 6-article grid (specific dates, read-times, and the "peste 40.000 lei" fundraising figure) — **this specific extension was inferred by me from the user's clear pattern of answers, not separately asked** as a third confirmation; flagged here explicitly so it's easy to revisit if that inference was wrong. 4 of the 7 article images are substitutions (no matching photo exists in `assets/`) — reused existing real assets rather than downloading/generating anything.
- Transparență: real donut percentages (72/14/8/6%) and a real 2018–2023+ timeline restored; the 4 "Documente disponibile" cards are **real uploads through the actual Stage 8 system** (not faked DB rows) — trivial one-line placeholder PDFs, titled/categorized to match the mock-up, uploaded via the tested admin upload flow so downloads genuinely work; real byte sizes shown (don't match the mock-up's fictional "2.4 MB" etc., which is correct — sizes should never be fabricated).
- Donează: restored the mock-up's exact trust-bar copy including "Peste 10 ani de impact" — this is **inconsistent with Transparență's timeline** (which reads as founded ~2018, i.e. not yet 10 years). This contradiction exists in the source mock-ups themselves (independently AI-generated pages); left both pages faithful to their own mock-up rather than silently reconciling them.
- A real bug was caught by the screenshot-comparison pass itself: one document title saved as "Situa?ii financiare 2023" — a shell/curl UTF-8 encoding issue with the `ț` character when passed as a plain `-F` argument in Git Bash, not an application bug. Fixed by re-uploading with the title read from a UTF-8 file (`-F "title=<file"`) instead of a shell argument; verified the corrected value both in the DB and on the rendered page.
- Visually verified all 8 pages via Playwright screenshots against their mock-ups at 1440px (the extraction/screenshot tooling from earlier this session) — composition, spacing, and now content all match closely.
- Added: "Acces administrator" link in the footer bottom bar, pointing at `/admin` (Proxy already redirects unauthenticated visitors to `/admin/login` and authenticated ones straight to the dashboard, so no extra logic was needed).
- Reverted: an earlier attempt to extract icons/masks/illustrations from the mock-up PNGs (a background subagent produced 13 low-quality crops) was abandoned by the user as not good enough; the `sharp` dependency was removed again and `public/assets/extracted/` deleted. The site continues to use the hand-built inline SVG icon set from Stages 2–4.

## Admin dashboard rebuild (out-of-band, explicit user override of "no admin mock-up" default) — IMPLEMENTED
The user supplied `mockup/dashboard.png` and directed the admin dashboard be rebuilt to match its sidebar/menu, overriding `CLAUDE.md`'s "no admin mock-up exists intentionally" note and several MVP exclusions (page builder, rich-text editing, multi-user management). Planned via `/plan` (formal plan mode + a Plan sub-agent) with the user's explicit sign-off before implementation; full plan and rationale in `docs/DASH_UPDATE.md` — read that file for the complete Phase A/Phase B breakdown. `CLAUDE.md` itself was deliberately left unedited (same convention as the content-population override).

Implemented (Phase A), all verified against a real production server (`next start`), not just dev:
- Admin shell visually rebuilt to match the mock-up: sidebar with hand-built icons (`src/components/admin/icons.js` — not extracted from the mock-up PNG, same policy as before), pink active pill, decorative leaf (reused `IconLeafSprig`), "Ai nevoie de ajutor?" box linking to a new real `/admin/ghid` page (not a dead link), topbar with breadcrumb, a disabled/honest search input, a **real** DB+storage status check (`src/lib/system/status.js`), and a user menu (initials avatar, real `AdminUser.role`, "Vezi site"/"Deconectare" moved here from the old sidebar).
- Nav renamed to "Texte", 5 out-of-scope items (SEO, Noutăți, Proiecte, Media, Utilizatori) shown with icons but rendered as inert `<span aria-disabled="true">` with an "În curând" badge — visible per the mock-up, never a fake link.
- New `/admin/donatii` page: the 5 donation-related `SiteSettings` fields moved here exclusively (removed from `/admin/setari`), reusing the existing settings API route unchanged.
- Dashboard home: 4 real stat cards from a new `getRegistryStats()` — page count is now truthfully 8/8 (added a minimal `doneaza` registry entry + wired it into the public page), real editable-field count, real last-updated date, real "% fields with a live override" — no numbers copied from the mock-up's fiction (42, 92%, a fixed date).
- `/admin/continut/[pageKey]` restyled with a real tab strip across all 8 pages, boxed field cards (no fake rich-text toolbar — a non-functional Bold/Italic/Link toolbar would be worse than none, and real HTML storage is forbidden), a real always-true "Publicat" badge (no draft/publish state exists, so two buttons collapsed to one honest "Salvează modificările"), a read-only section list derived from the registry (`getPageSections()` — no add/remove/reorder, that's explicitly page-builder territory), and a real `<iframe>` live-preview panel of the last-saved page.
- Added `hero.ctaPrimary`/`hero.ctaSecondary` registry fields (real, `maxLength: 25`) to the 3 pages with hero CTA buttons (home, despre-noi, implica-te), wired end-to-end to the public JSX.
- Explicitly not built (Phase B, listed in `docs/DASH_UPDATE.md`): rich-text/HTML editing, section drag-reorder/add/delete backed by real state, Media library, multi-user management, Noutăți/Proiecte as real CRUD (need new Prisma models), draft/publish workflow, notifications, per-page SEO metadata.
- Real bug caught during testing (not the app's fault): the same Git-Bash/curl UTF-8 argument-encoding issue from Stage 8 resurfaced when testing a `ț`-containing CTA value via `--data-urlencode`; worked around the same way (value read from a UTF-8 file via `--data-urlencode "field@file"` with a Windows-style path), confirmed the save round-trips correctly in the actual app.
- Dev DB reset to empty (`PageContent` table) after all testing.

### Follow-up: color/spacing fidelity correction (2026-08-19)
User rejected the initial dashboard-rebuild pass as not matching `mockup/dashboard.png`'s actual tone — specifically, public-page background colors read as far more saturated than the mock-up's subtle, near-white/muted palette. Sampled authoritative pixel colors from the mock-up PNGs (`mockup/dashboard.png`, home page) via a Playwright canvas `getImageData()` script (temporary, deleted after use — not the earlier-rejected asset-extraction approach; this only read color values, produced no derived files) and corrected `src/styles/tokens.css` accordingly:
- `--color-bg` `#fbf6ee` → `#fdfaf7`, `--color-bg-alt` `#f4ead9` → `#f4f1ea` (both measurably less saturated, matching sampled mock-up values)
- `--color-primary` `#e0637a` → `#d65d79` (sampled from hero "Donează acum" button)
- `--color-secondary` `#8ba888` → `#bcc1ac` (sampled from the CTA band; was a much darker/more saturated green than the mock-up's pale muted sage — the largest confirmed discrepancy). Verified all `color: var(--color-secondary)` text usages are paired with `--color-secondary-contrast` dark text on a now-lighter background — contrast improved, not regressed (checked each usage site).
- `--color-border` `#e5dccb` → `#e7e2d5` (minor, lower-confidence sample)
- Admin shell (`layout.module.css` `.shell`) switched from `--color-bg-alt` to `--color-bg` — the dashboard mock-up's page background sampled near-white, closer to the public site's base `--color-bg` than its alt-section tone.
- Admin dashboard stat cards (`src/app/admin/(shell)/page.js` + `.module.css`) rebuilt from the public site's stacked/centered stat-card layout to a dedicated horizontal card (icon left, label/value/caption right) matching the mock-up's actual structure — this was a real layout mismatch, not just color.
- `SectionCard.module.css` `.field` background changed from `--color-bg-alt` (read as tan/khaki) to `--color-bg` (clean, barely-tinted white), matching the mock-up's field-box look.
- Verified via full production build + authenticated Playwright screenshots of `/`, `/admin`, and `/admin/continut/home`, compared directly against both mock-ups — confirmed close visual match. Font family and detailed spacing scale were not changed (already matched the mock-up's category — serif headings/sans body — closely enough that no further correction was warranted); only color tokens and the two structural sizing issues above needed fixing.
- Temporary sampling/screenshot scripts deleted; dev DB untouched (no data was seeded this pass).

## Icon-set integration pass (out-of-band, user-supplied PNGs in `public/icons/`)
The user added 13 real PNG icons (transparent background, 180×180 except `badge.png` 2172×724 and `leaf.png` 180×360) to `public/icons/` and asked for the public pages to be visually rebuilt around them, aligned with `mockup/`. Mapped each PNG to its mockup usage by visually comparing all 8 mock-ups against the new files, then applied:
- `logo.png` → header/footer mark (`Logo.js`, replacing the hand-built two-circle SVG).
- `leaf.png` (rotated ~35° via CSS `transform`) → the decorative sprig next to every hero photo (`PageHero.js` shared component + homepage's own hero, which duplicates the same markup).
- `dots.png` → the dot-grid accent next to every hero photo (same two locations), replacing a CSS `radial-gradient`.
- `badge.png` → full-bleed background (previously a 0.18-opacity photo fade) on every page's bottom "cta-band" (shared `.cta-band-image` in `components.css` + homepage's own `.ctaImageWrap`), across all 8 public pages.
- `hospital.png`/`people.png`/`hand-heart.png`/`human-heart.png` → the 4-stat icon row (home, proiecte) and equivalent icon slots elsewhere (transparenta reasons, doneaza use-cases/trust items, despre-noi values/team avatars, implica-te reasons/testimonial avatars) — matched by the concept each PNG depicts, not by prior code's (sometimes mismatched) icon choice.
- `heart.png`/`handsup.png`/`news.png`/`handshake.png` → the 4 "cum te poți implica" method cards (home, implica-te).
- `hello.png` → new decorative accent added next to the "Cine suntem"/"Povestea noastră" body text on home and despre-noi (this element didn't exist in code before; mock-ups 1 and 2 both show it).
- Added circular tinted-chip backgrounds (alternating primary/secondary tint, same pattern as the pre-existing `.stat-icon`) behind icon groups that were previously bare in code but circled in the mock-ups: home/implica-te involve cards, despre-noi values, transparenta's 4-reason row.

Deliberately **not** replaced (no matching asset, or a real contrast/legibility risk):
- Small inline icons on colored buttons (e.g. the 16px heart before every "Donează acum" label) stay hand-built SVG using `currentColor` — `heart.png`'s stroke is a fixed pink, which would vanish against the pink primary button.
- Contact page's address/email/phone icons, transparenta's shield/document icons, doneaza's shield/lock trust icons, the small single-leaf glyph used standalone (despre-noi "Solidaritate", implica-te "Îți dezvolți abilitățile", transparenta timeline dots) — none of the 13 PNGs are a compact single-glyph match, so these keep the existing inline-SVG icon set (`src/components/public/icons.js`, unchanged).
- Proiecte's "Echipamente. Grijă. Viață." badge icon (a medical kit, not in the PNG set) and the teddy-bear icon on doneaza — no matching asset, left as-is.

Verified: `npm run lint` clean, `npm run build` succeeds (all 8 public routes still prerender `○ Static`), and all 8 pages screenshotted via Playwright (`npm run screenshot`, production build on port 3100) at 1440px and compared directly against their mock-ups — close visual match, no broken images, CTA-band text stays legible over `badge.png` (band text color is the pre-existing dark `--color-secondary-contrast`, not white, so it reads fine against the image's pale panel). Screenshots deleted after review (gitignored `scripts/screenshots/` anyway). Dev/prod servers stopped after testing.

## Stage 1 known risk
`npm audit` reports 3 high-severity advisories against `deepmerge-ts` (via `@prisma/config`), affecting all current Prisma 7.x releases. `npm audit fix --force` would downgrade to `prisma@6.12.0`, which conflicts with the required Prisma major version 7 — left unfixed, tracked for re-check when a patched Prisma 7 release is available.
