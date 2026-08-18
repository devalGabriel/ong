# PROJECT_STATUS.md

- Project root: `ong/`
- Existing source folders: `mockup/`, `assets/`
- Architecture: Next.js full-stack on VPS
- Database: SQLite + Prisma
- PDF storage: local persistent disk
- Current stage: STAGE 1
- Overall status: STAGE 1 PASS

| Stage | Status | Lint | Build | DB/Migration | Review |
|---|---|---|---|---|---|
| 0 Preflight | APPROVED | N/A | N/A | N/A | Approved |
| 1 Foundation | PASS | PASS | PASS | PASS | Pending |
| 2 Homepage | NOT STARTED | Pending | Pending | N/A | Pending |
| 3 Visual refinement | NOT STARTED | Pending | Pending | N/A | Pending |
| 4 Public pages | NOT STARTED | Pending | Pending | N/A | Pending |
| 5 Auth/Admin | NOT STARTED | Pending | Pending | Pending | Pending |
| 6 Content management | NOT STARTED | Pending | Pending | Pending | Pending |
| 7 Site settings | NOT STARTED | Pending | Pending | Pending | Pending |
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

## Stage 1 known risk
`npm audit` reports 3 high-severity advisories against `deepmerge-ts` (via `@prisma/config`), affecting all current Prisma 7.x releases. `npm audit fix --force` would downgrade to `prisma@6.12.0`, which conflicts with the required Prisma major version 7 — left unfixed, tracked for re-check when a patched Prisma 7 release is available.
