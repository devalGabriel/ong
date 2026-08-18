# DASH_UPDATE.md — Admin Dashboard Rebuild (Phase A)

## Context

The user supplied `mockup/dashboard.png` — a rich, SaaS-style admin dashboard (10-item sidebar, top bar with search/notifications/user menu, dashboard stat cards, a page-content editor with rich-text toolbars, a page-builder-style section list with add/remove/reorder/toggle, and a live-preview panel) — and asked for the admin dashboard to be rebuilt to match its sidebar and menu, with real functionality.

This conflicts with `CLAUDE.md`'s admin section, which says no admin mock-up exists "intentionally" and explicitly excludes: image management, page builder, layout editing, arbitrary HTML/CSS/JS, multi-role RBAC, editorial workflow, analytics dashboard, and forbids raw-HTML/rich-text storage. Per this project's own source-of-truth hierarchy ("explicit user instruction in the current session" outranks `CLAUDE.md`), the user's direction stands — same as the earlier "content-population pass" (see `PROJECT_STATUS.md`), this is documented explicitly as a deliberate override rather than silently absorbed. `CLAUDE.md` itself is left unedited, matching how that earlier override was handled.

The mock-up splits cleanly into:
- **Phase A** (this document, implemented) — real, buildable now with the existing architecture: no new Prisma models, no forbidden patterns.
- **Phase B** (explicitly not implemented) — rich-text/HTML editing, section drag-reorder/add/delete backed by real state, a Media library, multi-user management, `Noutăți`/`Proiecte` as real CRUD, draft/publish editorial workflow, a notification system, per-page SEO metadata.

**Decisions confirmed with the user before implementation:**
1. Out-of-scope nav items (SEO, Noutăți, Proiecte, Media, Utilizatori) → shown in the sidebar with icons, matching the mock-up, but visually disabled / "în curând" — not omitted, not faked as functional.
2. "Pagini website" vs "Texte" → unified into a single "Texte" nav item.
3. Donation fields (IBAN, bancă, provider) → moved exclusively into a new `/admin/donatii` page, removed from `/admin/setari`.

## Phase A — implementation plan

### 0. Shared groundwork
- `src/components/admin/icons.js` (new) — admin-only hand-built inline-SVG icon set (same pattern as `src/components/public/icons.js`). **Not** extracted from the mock-up PNG — hand-drawn to match the existing stroke style (this project already tried and reverted a screenshot-extraction approach earlier this session).
- Reuse `IconLeafSprig` from `src/components/public/icons.js` for the sidebar's decorative leaf.
- `src/lib/system/status.js` (new) — real DB + storage reachability check (no fabricated "always green" badge).

### 1. Admin shell visual rebuild
Sidebar (logo/leaf/nav/help box) + topbar (breadcrumb/search/status/user) rebuild. Coming-soon nav items render disabled with an "în curând" badge, no real `href`. Search bar rendered `disabled` (same "visibly disabled, not fake" precedent as the public newsletter/contact forms). Notification bell omitted entirely (no real notification system exists). User avatar is initials-based (no fabricated photo). Role label maps the real `AdminUser.role` field to "Super administrator".

### 2. Nav rename + "Donații" page
`AdminNav` becomes: Dashboard, Texte, Donații, Transparență, Setări (+ 5 disabled coming-soon items). New `/admin/donatii` page reuses `SETTINGS_FIELDS` from `src/lib/settings/fields.js`, filtered to the 5 donation-related fields, posting to the existing `src/app/api/admin/settings/route.js` unchanged. Those 5 fields are removed from `/admin/setari`.

### 3. Dashboard home — real stats
New `src/lib/content/get-registry-stats.js` computes: page count (8/8, after adding a minimal `doneaza` registry entry), total editable-field count, most recent `PageContent.updatedAt`, and "% of fields with a live DB override vs still on fallback" — all real, replacing the mock-up's fictional numbers (42, 92%, a fixed date) with actual data. No "de Admin" attribution (no `updatedBy` column exists; not adding one speculatively for a single-admin system).

### 4. Page editor UX
Kept the existing two-route structure (`/admin/continut/[pageKey]`) rather than collapsing to a single client-tabbed page — preserves the plain-`<form>`/no-JS save path and deep-linkable URLs. Restyled with a visible tab strip across the 8 pages. The mock-up's "Salvează draft" / "Publică pagina" pair collapses to the single existing "Salvează modificările" button — there is no draft/publish state in `PageContent` (a save is immediately live), so two buttons would be either non-functional or require an out-of-scope migration. The "Publicat" badge is real (every page is always live in this architecture).

### 5. CTA button-text fields
Added `hero.ctaPrimary`/`hero.ctaSecondary` registry fields (real, `maxLength: 25` matching the mock-up's hint) to exactly the 3 pages that have hero CTA buttons: home, despre-noi, implica-te. Wired end-to-end to the actual public page JSX.

### 6. Field restyling
Boxed "editor card" visual treatment, no rich-text toolbar (a non-functional Bold/Italic/Link toolbar is worse UX than none, and real rich-text/HTML storage is forbidden by the editable-content rule and a real XSS surface).

### 7. Section list
Read-only, derived purely from the registry (`src/lib/content/get-page-sections.js`) — no toggle/drag/delete (those would either be fake or require page-builder architecture, explicitly out of scope). Expand/collapse is real (client-side only, no persistence needed).

### 8. Live preview panel
Real `<iframe src={page.route}>` of the last-saved public page, manual refresh + auto-remount after save — not a live-typing sync (would require duplicating every page's render logic client-side).

### 9. SEO fields
Explicitly deferred to Phase B — would require converting all 8 public pages from static `export const metadata` to `generateMetadata()`, roughly doubling the registry. Too large to bundle into this pass.

## Phase B — explicitly not implemented this pass
- Rich-text/WYSIWYG editing with HTML storage+rendering
- Section-level show/hide toggle backed by real DB state
- Section drag-reorder backed by real DB state
- "Adaugă secțiune nouă" — arbitrary section/page-builder
- Media library (new model + storage + upload UI)
- Utilizatori — multi-admin user management CRUD
- Noutăți / Proiecte as real CRUD (need new `NewsArticle`/`Project` Prisma models)
- Draft/publish editorial workflow
- Notification system
- Command-palette-grade global search
- Per-page SEO metadata

## Migrations
None required for Phase A.

## Verification plan
1. `npm run lint` && `npm run build`.
2. Auth flow: unauthenticated `/admin` → login redirect; login → dashboard; logout → login.
3. Dashboard stats reflect real `PageContent` state after a save.
4. Texte editor: tab strip across all 8 pages; save via plain form POST; new CTA fields propagate to public pages.
5. Donații page: fields save to `SiteSettings`, no longer present on `/admin/setari`; public consumers (footer IBAN, `/doneaza`) unaffected.
6. Live preview: correct route per tab, refreshes after save.
7. Coming-soon nav items: disabled, no navigation, keyboard-inert but visible.
8. Playwright screenshot of `/admin` and `/admin/continut/home` vs `mockup/dashboard.png` at 1440px.
