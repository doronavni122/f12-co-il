"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok || !data.ok) {
        console.error("[newsletter-form] failed", data);
        setStatus("error");
        setMessage(data.error ?? "ההרשמה נכשלה. נסו שוב.");
        return;
      }
      setStatus("success");
      setMessage(data.message ?? "נרשמתם לרשימת ההמתנה.");
      setEmail("");
      setConsent(false);
    } catch (error) {
      console.error("[newsletter-form] network error", error);
      setStatus("error");
      setMessage("שגיאת רשת. נסו שוב מאוחר יותר.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-muted">אימייל</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="h-12 w-full max-w-md rounded-xl border border-border bg-surface px-4 outline-none ring-brand focus:ring-2"
          placeholder="you@example.com"
        />
      </label>
      <label className="flex max-w-md items-start gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
          required
        />
        <span>
          אני מסכים/ה לקבל דיוור מ-F12 בהתאם ל
          <Link href="/privacy" className="text-brand hover:underline">
            מדיניות הפרטיות
          </Link>
          .
        </span>
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-strong disabled:opacity-60"
      >
        {status === "loading" ? "שולח…" : "להצטרפות לרשימת המתנה"}
      </button>
      {message ? (
        <p
          className={`text-sm ${status === "error" ? "text-danger" : "text-success"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
