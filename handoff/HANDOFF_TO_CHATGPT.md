# HANDOFF TO CHATGPT

Use after major stages or when a risk appears.

Attach ideally: repo archive without node_modules/.next/.git/secrets/real DB, or tree + git diff + package.json + Prisma schema + modified files + lint/build/migration output + relevant screenshots.

Prompt:
Review independently Stage [X] of the ONG website.
Architecture: Next.js App Router, JavaScript only, full-stack on VPS, SQLite + Prisma, persistent local PDF storage, minimal admin, controlled text editing, secure transparency PDF upload, external donations. Public pages must match their files in `mockup/` and use assets from `assets/`; admin intentionally has no mock-up.

Check: scope, architecture, DB/migrations, auth, write protection, upload/storage if relevant, maintainability, public mock-up fidelity, responsive, accessibility, SEO, security and regressions.
Return PASS / PASS WITH FIXES / FAIL, with critical issues first and an exact remediation prompt for Claude Code.
