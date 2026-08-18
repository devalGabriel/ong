"use client";

import { useState } from "react";

export default function CopyButton({ value, className }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may be unavailable (older browser, insecure context);
      // the IBAN text is still visible and selectable manually.
    }
  }

  return (
    <button type="button" className={className} onClick={handleCopy}>
      {copied ? "Copiat ✓" : "Copiază"}
    </button>
  );
}
