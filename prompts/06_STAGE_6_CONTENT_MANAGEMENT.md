# STAGE 6 — PAGE CONTENT MANAGEMENT

Precondition: Stage 5 PASS.

Implement a controlled editable-field registry for every public page based on the existing page structure/mock-ups. Admin may edit text/content slots only; it may not add arbitrary sections or HTML.

Admin:
- page list
- per-page structured edit form
- save
- success/error feedback

Server:
- session check
- server-side validation
- PageContent upsert/update
- predictable cache/revalidation strategy

Front:
- saved changes appear on relevant page
- fallback remains for missing keys
- design/layout from mock-up must not change when text is edited within reasonable field limits

Test authorized update, unauthorized write, invalid input, missing fallback, front reflects update.
Run lint/build/DB checks/git diff --check.

Output:
### Stage 6 result
### Editable-field registry design
### Admin UX
### DB mutations
### Security checks
### Front update verification
### Lint/build
### Recommended commit message

STOP.
