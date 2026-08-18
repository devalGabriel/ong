# STAGE 10 — HARDENING / DEPLOY / RELEASE

Precondition: Stage 9 PASS. No new features.

Audit architecture, auth, all writes, upload/storage, secrets, SEO, accessibility, performance, direct-route behavior and public/admin separation.

Create:
- DEPLOYMENT.md
- BACKUP_RESTORE.md
- CONTENT_HANDOFF.md
- RELEASE_CHECKLIST.md

Deployment target: Linux VPS, Node, Prisma migration deploy, Nginx reverse proxy, HTTPS, persistent process manager/systemd, SQLite, storage directory permissions, smoke test.

Backup/restore must cover SQLite and `storage/`, with a test-restore procedure.

Final checks: lint, build, Prisma generate, migration status, git diff --check, git status.

Output:
### Stage 10 result: RELEASE CANDIDATE / BLOCKED
### Architecture audit
### Auth audit
### Upload/storage audit
### Security audit
### SEO/accessibility/performance
### Operational docs
### Commands
### Lint/build/migration
### Manual checks before launch
### Recommended release commit

STOP.
