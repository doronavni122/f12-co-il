"use client";

import { useState } from "react";

type Props = {
  url: string;
};

export function CopyLinkButton({ url }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("[share] clipboard failed", error);
    }
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3 text-sm text-muted hover:border-brand hover:text-foreground"
      aria-live="polite"
    >
      {copied ? "הועתק" : "העתקת קישור"}
    </button>
  );
}
