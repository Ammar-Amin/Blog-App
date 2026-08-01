// Copies the self-hosted TinyMCE runtime from node_modules into public/tinymce.
// Runs on postinstall (and before dev/build) so no API key or CDN is needed.
import { cpSync, existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(root, "node_modules/tinymce");
const dest = resolve(root, "public/tinymce");

if (!existsSync(src)) {
  console.warn("[copy-tinymce] node_modules/tinymce not found; skipping.");
  process.exit(0);
}

rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true });
console.log("[copy-tinymce] copied TinyMCE -> public/tinymce");
