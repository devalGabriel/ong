# STAGE 9 — DONATIONS

Precondition: Stage 8 PASS.
Use the `/doneaza` mock-up from root `mockup/` and matching root `assets/`.

First classify provider configuration:
A. real provider configured
B. not configured

Implement the visual page according to its mock-up, plus provider area, IBAN from SiteSettings, trust/transparency elements, provider-unavailable state and success/error UX where integration permits.

Never add card number/CVV/expiry fields, payment secrets, or improvised payment backend.
If provider requires webhook/server secret, report as separate scope rather than improvising.

Run no-secret/no-card checks, lint, build, git diff --check.

Output:
### Stage 9 result
### Donation mock-up/assets used
### Provider classification
### Donation flow
### Security
### Missing provider data
### Lint/build
### Recommended commit message

STOP.
