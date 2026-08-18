import { randomUUID } from "node:crypto";

/**
 * System-generated physical filename — never derived from the client's
 * original filename or any other request input.
 */
export function generateStoredName() {
  return `${randomUUID()}.pdf`;
}
