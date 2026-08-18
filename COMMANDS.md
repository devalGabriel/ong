# COMMANDS.md

All commands are run from the project root `ong/`.

## Verify location
PowerShell:
```powershell
Get-Location
Get-ChildItem
```
Bash:
```bash
pwd
ls -la
```
You must see `mockup/` and `assets/`, plus bootstrap files after extraction.

## Optional Git baseline
If this is not already a Git repository:
```bash
git init
git status
git add CLAUDE.md PROJECT_PLAN.md PROJECT_STATUS.md README_START_HERE.md COMMANDS.md docs prompts handoff mockup assets
git commit -m "chore: bootstrap ONG website project"
```

## Stage 0
```bash
claude --permission-mode plan
```
Inside Claude:
```text
Read and execute prompts/00_PREFLIGHT_PLAN.md exactly. Do not modify files. Stop after the Stage 0 report.
```

## Stage 1
```bash
claude
```
Inside Claude:
```text
Read and execute prompts/01_STAGE_1_FOUNDATION_DB.md exactly. Stop after the Stage 1 report.
```

## Later stages
Use the same Claude session or reopen from `ong/`, then send exactly one stage prompt at a time:
```text
Read and execute prompts/02_STAGE_2_HOMEPAGE.md exactly. Stop after the Stage 2 report.
Read and execute prompts/03_STAGE_3_VISUAL_REFINEMENT.md exactly. Stop after the Stage 3 report.
Read and execute prompts/04_STAGE_4_PUBLIC_PAGES.md exactly. Stop after the Stage 4 report.
Read and execute prompts/05_STAGE_5_AUTH_ADMIN.md exactly. Stop after the Stage 5 report.
Read and execute prompts/06_STAGE_6_CONTENT_MANAGEMENT.md exactly. Stop after the Stage 6 report.
Read and execute prompts/07_STAGE_7_SITE_SETTINGS.md exactly. Stop after the Stage 7 report.
Read and execute prompts/08_STAGE_8_TRANSPARENCY_PDF.md exactly. Stop after the Stage 8 report.
Read and execute prompts/09_STAGE_9_DONATIONS.md exactly. Stop after the Stage 9 report.
Read and execute prompts/10_STAGE_10_HARDENING_DEPLOY.md exactly. Stop after the Stage 10 report.
```

## After every stage
Outside Claude:
```bash
git status
git diff --check
git diff
```
Commit only after review:
```bash
git add .
git commit -m "<approved commit message>"
```
