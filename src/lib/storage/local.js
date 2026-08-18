import { mkdir, writeFile, readFile, unlink, access } from "node:fs/promises";
import path from "node:path";

const STORAGE_ROOT = path.join(process.cwd(), "storage", "transparency");

function resolveStoredPath(storedName) {
  const safeName = path.basename(storedName);
  if (safeName !== storedName) {
    throw new Error("Invalid stored file name");
  }
  return path.join(STORAGE_ROOT, safeName);
}

async function ensureStorageRoot() {
  await mkdir(STORAGE_ROOT, { recursive: true });
}

async function saveFile(storedName, buffer) {
  await ensureStorageRoot();
  const filePath = resolveStoredPath(storedName);
  await writeFile(filePath, buffer);
  return filePath;
}

async function readStoredFile(storedName) {
  const filePath = resolveStoredPath(storedName);
  return readFile(filePath);
}

async function deleteFile(storedName) {
  const filePath = resolveStoredPath(storedName);
  await unlink(filePath);
}

async function fileExists(storedName) {
  try {
    await access(resolveStoredPath(storedName));
    return true;
  } catch {
    return false;
  }
}

export const localStorage = {
  root: STORAGE_ROOT,
  ensureStorageRoot,
  saveFile,
  readFile: readStoredFile,
  deleteFile,
  fileExists,
};

export default localStorage;
