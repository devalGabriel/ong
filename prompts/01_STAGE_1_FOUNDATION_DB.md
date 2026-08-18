# STAGE 1 — FOUNDATION / APP + DB

Implement ONLY Stage 1.
Preconditions: Stage 0 reviewed/approved; read project rules; verify git status.

Requirements:
- scaffold Next.js in the CURRENT `ong/` root without deleting or moving existing bootstrap, `mockup/`, or `assets/`;
- App Router, JavaScript only, no Tailwind, no static export;
- if create-next-app refuses the non-empty directory, use a safe temporary scaffold/merge or manual scaffold; never overwrite source folders;
- create final CSS/design-token foundation;
- configure Prisma + SQLite;
- models: AdminUser, PageContent, SiteSettings, TransparencyDocument only;
- initial migration + Prisma generate;
- `.env.example` without real secrets;
- DB helper;
- storage abstraction shell only;
- minimal public layout/header/footer/home placeholder/not-found;
- minimal admin route placeholder, with no real writes yet;
- decide and document how source assets will be used/copied into runtime `public/assets/`; do not mutate root assets.

Checks:
- install
- prisma generate
- initial migration
- lint
- build
- git diff --check

If migration/build fails, Stage 1 is BLOCKED.

Output:
### Stage 1 result: PASS / BLOCKED
### Files created
### Files modified
### Prisma schema summary
### Migration result
### Source-folder preservation check
### Runtime asset strategy implemented
### Commands run
### Lint result
### Build result
### Risks / TODO
### Recommended commit message

STOP.
