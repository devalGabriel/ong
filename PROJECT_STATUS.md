# PROJECT_STATUS.md

- Project root: `ong/`
- Existing source folders: `mockup/`, `assets/`
- Architecture: Next.js full-stack on VPS
- Database: SQLite + Prisma
- PDF storage: local persistent disk
- Current stage: STAGE 0
- Overall status: NOT STARTED

| Stage | Status | Lint | Build | DB/Migration | Review |
|---|---|---|---|---|---|
| 0 Preflight | NOT STARTED | N/A | N/A | N/A | Pending |
| 1 Foundation | NOT STARTED | Pending | Pending | Pending | Pending |
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
