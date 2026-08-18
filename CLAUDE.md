# CLAUDE.md — ONG Website

## Working directory
Claude Code is always opened from the project root folder named `ong`.

Expected root:

```text
ong/
├─ CLAUDE.md
├─ PROJECT_PLAN.md
├─ PROJECT_STATUS.md
├─ README_START_HERE.md
├─ COMMANDS.md
├─ docs/
├─ prompts/
├─ handoff/
├─ mockup/      # already exists; one mock-up for every PUBLIC page
├─ assets/      # already exists; page imagery/assets
├─ src/         # created during implementation
├─ prisma/      # created during implementation
└─ storage/     # created during implementation
```

`mockup/` and `assets/` are user-owned source folders. NEVER delete, move, mass-rename, or overwrite them.

## Source-of-truth hierarchy
1. Explicit user instruction in the current session.
2. `CLAUDE.md`.
3. `PROJECT_PLAN.md`.
4. `docs/ARCHITECTURE.md`.
5. `docs/DATA_MODEL.md`.
6. `docs/SECURITY.md`.
7. `docs/SOURCE_FILES.md`.
8. Matching public-page mock-up in `mockup/`.
9. Files in `assets/`.
10. Existing code.
11. Your own assumptions.

For PUBLIC design, the matching mock-up has priority.
For ADMIN/DASHBOARD there is intentionally NO mock-up. Build a minimal, sober, functional admin UI; do not invent a decorative SaaS dashboard.

## Mandatory handling of source folders
### `mockup/`
- Inventory it in Stage 0.
- Map every file to its inferred route/page and report confidence.
- If ambiguous, report it instead of silently guessing.
- Never modify mock-up files.
- Never use screenshots as runtime page assets.

### `assets/`
- Inventory it in Stage 0.
- Use these assets before placeholders.
- Do not download substitutes from the internet.
- Do not generate substitutes.
- If a mock-up requires a missing asset, report it.
- Never modify source assets.
- You may copy/derive implementation-ready variants into `public/assets/`, preserving traceability to the source file.

## Stack
- Next.js App Router
- JavaScript only; NO TypeScript
- Full-stack Next.js runtime on VPS
- NO `output: "export"`
- Prisma ORM
- SQLite for MVP
- Local persistent filesystem for transparency PDFs
- Custom CSS
- NO Tailwind unless explicitly requested
- NO external CMS in MVP
- NO page builder
- NO arbitrary HTML editor

## Public pages
- / (Home)
- /despre-noi (Despre noi)
- /proiecte (Proiecte)
- /implica-te (Implică-te)
- /transparenta (Transparență)
- /noutati (Noutăți)
- /contact (Contact)
- /doneaza (Donează)

MVP has exactly these 8 routes. No detail/slug routes (`/proiecte/[slug]`, `/noutati/[slug]`) and no legal pages (`/confidentialitate`, `/termeni`) in MVP.

Every public page must follow its matching file from `mockup/`.

## Admin scope
- `/admin/login`
- `/admin`
- page-text management
- transparency PDF management
- site settings
- logout

MVP excludes image management, page builder, layout editing, arbitrary HTML/CSS/JS, multi-role RBAC, public signup, editorial workflow, analytics dashboard.

## Editable-content rule
Admin edits content slots, not page structure.
Allowed: text, textarea, URL, email, phone, number, controlled boolean/select.
Forbidden: raw HTML, raw CSS, JavaScript, arbitrary blocks/sections.

## Database
MVP models: `AdminUser`, `PageContent`, `SiteSettings`, `TransparencyDocument`.
Do not add `Project`/`NewsArticle` unless explicitly required later.

## Authentication
- ADMIN only in MVP.
- Email + password.
- Password hashes only.
- Secure session.
- Server-side protection for admin routes and every write.
- No public signup.
- Secrets are server-only environment variables.

## PDF upload
Required: authenticated write, server-side extension + MIME validation, configurable size limit, generated internal filename, original name as metadata only, path-traversal protection, controlled storage, publish/unpublish, sort order, controlled delete, public page shows published docs only, and `%PDF-` magic-byte verification when practical.

Never trust client filename or MIME alone.

## Storage
Target: Linux VPS with persistent disk.
Files: `storage/transparency/<generated-name>.pdf`.
Use abstraction: `src/lib/storage/index.js`, `src/lib/storage/local.js`.
Do not design for ephemeral/serverless storage.

## Donations
The site never processes card data.
Forbidden: card number, CVV, expiry, browser payment secrets, improvised payment backend.
Use external provider / hosted checkout / approved iframe, plus IBAN fallback from SiteSettings.
Do not invent provider URLs/config.

## Public visual direction
Follow mock-ups: warm/editorial, ivory/cream, warm pink CTA, sage secondary, serif headings, sans body, human imagery, generous whitespace, rounded/organic imagery, restrained shadows, no generic SaaS look.

## Admin visual direction
No mock-up exists intentionally. Use restrained neutral layout, left navigation, clear page title, simple forms, strong save/error/success feedback, no decorative hero, no gratuitous charts.

## Accessibility
Mandatory on public and admin: semantic HTML, logical H1, landmarks, skip link, keyboard navigation, visible focus, labels, contextual alt text, sufficient contrast, suitable hit areas, reduced motion.

## SEO
Public: title, description, canonical strategy, Open Graph, sitemap, robots, heading hierarchy.
Admin: noindex and excluded from sitemap.

## Coding rules
- JavaScript only.
- Server Components by default.
- `"use client"` only when required.
- Validate every write server-side.
- Separate UI from DB/auth/storage logic.
- No dead debug code.
- No hidden lint/build failures.
- No secrets in repo.
- No invented NGO facts.

## Stage workflow
For every stage: read prompt/docs, verify prerequisites and `git status`, inspect relevant mock-up/assets before public UI edits, state short plan, implement only current scope, run checks, fix stage-caused errors, update `PROJECT_STATUS.md`, report files/commands/checks/risks/recommended commit, then STOP.

Never continue to the next stage automatically.

## Git
Do not automatically run commit/push/force-push/destructive reset/clean. Read-only git commands are allowed.

## Definition of Done
PASS only if scope is implemented, lint/build pass, relevant Prisma/migration/auth/security checks pass, no secrets or invented real data exist, mock-up fidelity is assessed where relevant, `PROJECT_STATUS.md` is updated, and no critical blocker remains. Otherwise mark BLOCKED or IN PROGRESS.
