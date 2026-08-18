const PDF_MAGIC_BYTES = Buffer.from("%PDF-", "ascii");
const DEFAULT_MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export function getMaxUploadBytes() {
  const fromEnv = Number.parseInt(process.env.TRANSPARENCY_MAX_UPLOAD_BYTES ?? "", 10);
  return Number.isFinite(fromEnv) && fromEnv > 0 ? fromEnv : DEFAULT_MAX_BYTES;
}

/**
 * Validates an uploaded file as a real PDF, never trusting the client's
 * filename or declared MIME type alone.
 */
export function validatePdfFile({ filename, mimeType, buffer }) {
  const maxBytes = getMaxUploadBytes();

  if (!filename || !/\.pdf$/i.test(filename)) {
    return { ok: false, reason: "extension" };
  }

  if (mimeType !== "application/pdf") {
    return { ok: false, reason: "mime" };
  }

  if (!buffer || buffer.length === 0) {
    return { ok: false, reason: "empty" };
  }

  if (buffer.length > maxBytes) {
    return { ok: false, reason: "size" };
  }

  if (!buffer.subarray(0, PDF_MAGIC_BYTES.length).equals(PDF_MAGIC_BYTES)) {
    return { ok: false, reason: "signature" };
  }

  return { ok: true };
}
