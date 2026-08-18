# PROJECT_PLAN.md

## STAGE 0 — Preflight + source inventory
Read-only. Inventory environment, repository, `mockup/`, `assets/`. Map every public mock-up to route/page. Map assets to likely pages/sections. Validate architecture. No implementation.
Gate: complete mapping + Stage 1 plan.

## STAGE 1 — Foundation + DB
Next.js App Router JavaScript, CSS foundation, Prisma + SQLite, initial migration, storage abstraction shell, root layouts, minimal public/admin placeholders. Preserve `mockup/` and `assets/`.
Gate: lint/build/Prisma/migration PASS.

## STAGE 2 — Homepage
Implement homepage using its matching mock-up and actual matching files from `assets/`. No other public pages.
Gate: 390/768/1024/1440 review + lint/build PASS.

## STAGE 3 — Homepage visual refinement
No new pages/features. Compare homepage to mock-up and correct visual differences.
Gate: stable responsive homepage + lint/build PASS.

## STAGE 4 — Public pages
Implement every remaining public page according to its own file in `mockup/`, using matching `assets/`. No admin CMS yet.
Gate: route-by-route mock-up mapping confirmed, routes/SEO/lint/build PASS.

## STAGE 5 — Auth + Admin shell
Login, session, protection, logout, admin shell. There is NO dashboard mock-up; build minimal functional admin UI.
Gate: valid/invalid login, protected route, logout, lint/build PASS.

## STAGE 6 — Page content management
Controlled registry of editable text slots per page, PageContent mutations, front reflects saved changes.
Gate: authorized update, unauthorized rejection, validation, front update, lint/build PASS.

## STAGE 7 — Site settings
Organization/contact/social/bank/provider public settings. Reuse in footer/contact/donations.
Gate: single source of truth + validation + lint/build PASS.

## STAGE 8 — Transparency PDFs
Upload, validate, store, edit metadata, publish/unpublish, sort, delete, public listing/download.
Gate: positive and negative upload/security tests + lint/build PASS.

## STAGE 9 — Donations
External provider only, IBAN fallback from settings, proper error/provider-unavailable UX.
Gate: no card collection, no secrets, lint/build PASS.

## STAGE 10 — Hardening + deployment
SEO, accessibility, security, backup/restore, Nginx/runtime deployment docs, release checklist.
Gate: release candidate.
