# SOURCE_FILES.md

## Existing folders in `ong/`

### `mockup/`
Contains one visual mock-up for each PUBLIC page. There is deliberately no admin/dashboard mock-up.

Stage 0 must create an inventory table with: filename, inferred route/page, confidence, notes/ambiguities.
Every public implementation stage must inspect the matching mock-up before editing that route.

### `assets/`
Contains images/assets intended for public pages.

Stage 0 must inventory: filename, extension, dimensions when easy to inspect, probable page/section usage, and obvious duplicates/near-duplicates.

Rules:
- source files are immutable inputs;
- do not rename/move/delete them;
- do not fetch or generate alternatives;
- implementation-ready copies may go to `public/assets/`;
- preserve traceability from source asset to runtime asset.

## Missing-asset behavior
If a mock-up references an asset that cannot be matched: report it first. Use a neutral placeholder only when review is still meaningful. Do not silently substitute unrelated imagery.
