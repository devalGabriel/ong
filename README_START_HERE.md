# START HERE

Extract this bootstrap DIRECTLY inside the existing `ong/` folder, not into a nested bootstrap folder.

After extraction:
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
├─ mockup/     # existing
└─ assets/     # existing
```

`mockup/` and `assets/` remain untouched source folders.

First Claude session from `ong/`:
```bash
claude --permission-mode plan
```
Then inside Claude:
```text
Read and execute prompts/00_PREFLIGHT_PLAN.md exactly. Do not modify files. Stop after the Stage 0 report.
```
Do not start Stage 1 until Stage 0 is reviewed.
