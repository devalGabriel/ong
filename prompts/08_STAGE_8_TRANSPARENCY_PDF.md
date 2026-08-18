# STAGE 8 — TRANSPARENCY PDF MANAGEMENT

Precondition: Stage 7 PASS. High-security stage.

Admin /admin/transparency:
- list
- upload
- edit metadata
- publish/unpublish
- delete
- sort order
- preview/download

Use storage abstraction and `storage/transparency/`.
Stored filename must be system-generated; never use user path or original filename as physical filename.

Server validation: auth, .pdf extension, PDF MIME, configurable max size, `%PDF-` magic bytes when practical, validated title/year/category/sortOrder.

Public Transparency page: published only, predictable order, correct empty state, controlled viewing/download.

Negative tests: text file, fake renamed PDF if feasible, oversized, unauthenticated upload, path traversal attempt, unpublished public access, invalid delete ID.

Do not claim filesystem+DB atomicity if it is not truly atomic; handle inconsistencies explicitly.

Run lint/build/DB/filesystem/git diff --check.

Output:
### Stage 8 result
### Upload validation
### Storage design
### Public serving
### Negative tests
### Delete behavior
### Security review
### Lint/build
### Recommended commit message

STOP.
