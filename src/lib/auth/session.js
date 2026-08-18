const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const SESSION_COOKIE_NAME = "ong_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function toBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function getKey(secret) {
  if (!secret) {
    throw new Error("SESSION_SECRET is not configured");
  }
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function createSessionToken(payload, secret, maxAgeSeconds = SESSION_MAX_AGE_SECONDS) {
  const body = { ...payload, exp: Math.floor(Date.now() / 1000) + maxAgeSeconds };
  const bodyB64 = toBase64Url(encoder.encode(JSON.stringify(body)));
  const key = await getKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(bodyB64));
  const sigB64 = toBase64Url(new Uint8Array(signature));
  return `${bodyB64}.${sigB64}`;
}

export async function getSessionFromCookies(cookieStore) {
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token, process.env.SESSION_SECRET);
}

export async function verifySessionToken(token, secret) {
  if (!token) return null;
  const [bodyB64, sigB64] = token.split(".");
  if (!bodyB64 || !sigB64) return null;

  try {
    const key = await getKey(secret);
    const valid = await crypto.subtle.verify("HMAC", key, fromBase64Url(sigB64), encoder.encode(bodyB64));
    if (!valid) return null;

    const payload = JSON.parse(decoder.decode(fromBase64Url(bodyB64)));
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
