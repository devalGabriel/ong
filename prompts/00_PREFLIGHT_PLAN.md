# STAGE 0 — PREFLIGHT / PLAN ONLY

Work strictly in Plan Mode. Do not modify application files, install packages, or create migrations.

Read:
- CLAUDE.md
- PROJECT_PLAN.md
- PROJECT_STATUS.md
- docs/ARCHITECTURE.md
- docs/DATA_MODEL.md
- docs/SECURITY.md
- docs/SOURCE_FILES.md

Then inspect:
- the entire `mockup/` folder
- the entire `assets/` folder
- current repository/environment

Required analysis:
1. OS, Node, package manager, Git, working directory.
2. Confirm working directory is the project root `ong`.
3. Confirm `mockup/` and `assets/` exist.
4. Inventory every file in `mockup/` and map it to an inferred public route/page with confidence.
5. Inventory every file in `assets/`; include dimensions when easy to inspect and probable page/section use.
6. Identify obvious mock-up ↔ asset matches.
7. Report missing/ambiguous asset mappings.
8. Confirm there is intentionally no admin/dashboard mock-up.
9. Inspect whether Next.js/Prisma/Git already exist.
10. Validate Next.js + Prisma + SQLite + persistent local storage architecture.
11. Propose exact final file tree.
12. Propose auth, migration/seed, PDF upload/serving, and runtime-asset strategy.
13. Propose exact Stage 1 implementation and commands.

Do NOT:
- create package.json
- run npm install
- create/move/rename/delete files in mockup or assets
- modify PROJECT_STATUS.md
- implement code

Output exactly:
### A. Working directory / repository state
### B. Environment
### C. Mock-up inventory and route mapping
### D. Asset inventory and probable usage
### E. Mock-up ↔ asset mapping gaps
### F. Architecture understood
### G. Contradictions / ambiguities
### H. Proposed final file tree
### I. Database / migration / seed strategy
### J. Auth strategy
### K. PDF storage/upload/serving strategy
### L. Runtime asset strategy
### M. Stage 1 exact plan
### N. Stage 1 commands
### O. Risks
### P. Missing real NGO data
### Q. GO / BLOCKED

STOP.
