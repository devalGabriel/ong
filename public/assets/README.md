# public/assets/

Runtime, implementation-ready copies of files from root `assets/`.

Rules:
- Root `assets/` is the immutable source; never edit it.
- Copy (never move) a source file here only when a page actually uses it.
- Keep traceability: prefix the copied file with the source filename, e.g. `assets/3.png` -> `public/assets/3-hero-despre-noi.png`.
- No substitute/placeholder imagery is downloaded or generated; missing assets are reported instead.

Copied so far:
- `assets/1.png` -> `1-hero-copil-spital.png` (Home/Proiecte/Transparență hero; reused for a Proiecte project card — see Stage 4 report)
- `assets/2.png` -> `2-maini-comunitate.png` (Home about-preview; Despre-noi hero; reused for a Proiecte project card)
- `assets/3.png` -> `3-copil-fereastra.png` (Noutăți hero)
- `assets/4.png` -> `4-maini-tinute.png` (Implică-te hero)
- `assets/5.png` -> `5-copil-inima.png` (Contact hero)
- `assets/6.png` -> `6-monitor-medical.png` (Proiecte "Dotăm cu grijă" section + matching project card)
- `assets/7.png` -> `7-maini-casa.png` (Noutăți featured-article thumbnail)
- `assets/8.png` -> `8-mana-inima.png` (final CTA band image, all pages; reused for a Proiecte project card)
- `assets/9.png` -> `9-badge-inima.png` (decorative hero badge, all pages via `PageHero`)
