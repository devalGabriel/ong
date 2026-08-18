# STAGE 5 — AUTH + ADMIN SHELL

Precondition: Stage 4 PASS.
There is intentionally NO admin/dashboard mock-up. Do not search for one and do not copy public-page marketing styling into admin.

Implement:
- AdminUser usage
- secure admin seed approach; password from env/input, hashed before DB
- /admin/login email + password
- secure session
- route protection
- logout
- noindex admin
- minimal admin shell: Dashboard, Conținut, Transparență, Setări, Vezi site, Logout

Admin visual rule: restrained, compact, clear, functional; left navigation; standard forms; no decorative hero/charts.

Test: valid login, invalid login, unauthenticated /admin, authenticated /admin, logout.
Run lint/build/git diff --check and migration/seed checks if relevant.

Output:
### Stage 5 result
### Auth approach
### Seed approach
### Route protection
### Admin UI rationale
### Scenarios tested
### Lint/build
### Security risks
### Recommended commit message

STOP.
