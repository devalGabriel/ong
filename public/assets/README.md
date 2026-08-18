# public/assets/

Runtime, implementation-ready copies of files from root `assets/`.

Rules:
- Root `assets/` is the immutable source; never edit it.
- Copy (never move) a source file here only when a page actually uses it.
- Keep traceability: prefix the copied file with the source filename, e.g. `assets/3.png` -> `public/assets/3-hero-despre-noi.png`.
- No substitute/placeholder imagery is downloaded or generated; missing assets are reported instead.

No files are copied yet as of Stage 1 (foundation only, no visual pages implemented).
