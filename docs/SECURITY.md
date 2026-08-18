# SECURITY.md

## Auth
Protect all admin routes except login and protect every write on the server. Hash passwords. Keep auth secrets server-only.

## Input
Validate every mutation server-side. Do not render arbitrary stored HTML.

## PDF upload
Require session, `.pdf` extension, PDF MIME, configured size limit, generated stored filename, no input-derived filesystem path, and `%PDF-` signature check when practical. Test negative cases.

## File serving
Public routes serve only published documents. Never expose arbitrary filesystem paths.

## Delete
Confirm in UI and authorize on server. Handle DB/file inconsistencies explicitly.

## Secrets
Never commit auth secrets, real passwords, payment secrets, or SMTP credentials. Provide `.env.example` only.

## Donations
Never collect card data on the application domain.

## Logging
Never log passwords, sessions, tokens, secrets, or payment data.

## Operations
Backup and restore are release requirements.
