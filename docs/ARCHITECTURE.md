# ARCHITECTURE.md

## Runtime
Full-stack Next.js as a persistent Node.js service on a Linux VPS.

```text
Internet -> Nginx -> Next.js
                    ├─ Public pages
                    ├─ Admin dashboard
                    ├─ Auth / writes
                    ├─ Prisma -> SQLite
                    └─ Storage -> storage/transparency/
```

No static export.

## Recommended structure
```text
src/
├─ app/
│  ├─ (public)/
│  ├─ admin/
│  ├─ api/documents/[id]/route.js
│  ├─ sitemap.js
│  ├─ robots.js
│  └─ not-found.js
├─ components/{public,admin,ui}/
├─ lib/{auth,db,content,settings,documents,validation,storage}/
└─ styles/
prisma/
storage/transparency/
public/assets/
```

Root `mockup/` and `assets/` remain source inputs, not runtime configuration.

Public components read through a content layer. Early controlled fallback/seed content is allowed; Stage 6 switches editable text to `PageContent` without changing page structure.

`SiteSettings` is the single source for organization/contact/social/bank details.
`TransparencyDocument` stores metadata; bytes live on persistent disk.

Deployment target: Nginx -> Next.js Node process. Back up SQLite and `storage/`.
