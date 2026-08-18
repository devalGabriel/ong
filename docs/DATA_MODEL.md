# DATA_MODEL.md

## AdminUser
id, email unique, passwordHash, role, active, createdAt, updatedAt. MVP role: ADMIN.

## PageContent
id, pageKey, sectionKey, contentKey, contentType, value, updatedAt.
Unique: `pageKey + sectionKey + contentKey`.
No arbitrary HTML.

## SiteSettings
Singleton-style record: organizationName, legalName, fiscalCode, address, email, phone, facebookUrl, instagramUrl, tiktokUrl, ibanRon, ibanEur, bankName, donationProviderType, donationProviderPublicUrl, updatedAt. Missing fields may be null.

## TransparencyDocument
id, title, year, category, originalName, storedName, mimeType, sizeBytes, published, sortOrder, createdAt, updatedAt. `storedName` is system-generated.

## Project / NewsArticle
Do not add unless the user explicitly requests admin management for them.
