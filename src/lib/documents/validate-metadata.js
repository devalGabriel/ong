import { isValidCategory } from "./categories";

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 2000;
const MAX_YEAR = CURRENT_YEAR + 1;
const TITLE_MAX_LENGTH = 200;

/**
 * Validates TransparencyDocument metadata fields (not the file itself).
 * Returns { ok: true, value } per field or { ok: false, reason }.
 */
export function validateDocumentMetadata({ title, year, category, sortOrder, published }) {
  const errors = {};

  const trimmedTitle = String(title ?? "").trim();
  if (trimmedTitle.length === 0 || trimmedTitle.length > TITLE_MAX_LENGTH) {
    errors.title = true;
  }

  const yearNum = Number.parseInt(year, 10);
  if (!Number.isInteger(yearNum) || yearNum < MIN_YEAR || yearNum > MAX_YEAR) {
    errors.year = true;
  }

  if (!isValidCategory(category)) {
    errors.category = true;
  }

  let sortOrderNum = 0;
  if (sortOrder !== undefined && sortOrder !== null && String(sortOrder).trim() !== "") {
    sortOrderNum = Number.parseInt(sortOrder, 10);
    if (!Number.isInteger(sortOrderNum) || sortOrderNum < 0) {
      errors.sortOrder = true;
    }
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      title: trimmedTitle,
      year: yearNum,
      category,
      sortOrder: sortOrderNum,
      published: Boolean(published),
    },
  };
}
