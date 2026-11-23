"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const subjects = [
  { value: "editorial", label: "פנייה עריכתית" },
  { value: "correction", label: "בקשת תיקון עובדתי" },
  { value: "partnership", label: "שיתוף פעולה / מסחרי" },
  { value: "other", label: "אחר" },
] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] =
    useState<(typeof subjects)[number]["value"]>("editorial");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
      };
      if (!res.ok || !data.ok) {
        console.error("[contact-form] failed", data);
        setStatus("error");
        setFeedback(data.error ?? "שליחת הפנייה נכשלה. נסו שוב.");
        return;
      }
      setStatus("success");
      setFeedback(data.message ?? "הפנייה נשלחה.");
      setName("");
      setEmail("");
      setSubject("editorial");
      setMessage("");
    } catch (error) {
      console.error("[contact-form] network error", error);
      setStatus("error");
      setFeedback("שגיאת רשת. נסו שוב מאוחר יותר או שלחו אימייל ישירות.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-muted">שם מלא</span>
        <input
          type="text"
          required
          minLength={2}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className="h-12 w-full rounded-xl border border-border bg-surface px-4 outline-none ring-brand focus:ring-2"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-muted">אימייל</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="h-12 w-full rounded-xl border border-border bg-surface px-4 outline-none ring-brand focus:ring-2"
          placeholder="you@example.com"
          dir="ltr"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-muted">נושא</span>
        <select
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value as (typeof subjects)[number]["value"])
          }
          className="h-12 w-full rounded-xl border border-border bg-surface px-4 outline-none ring-brand focus:ring-2"
        >
          {subjects.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-muted">הודעה</span>
        <textarea
          required
          minLength={10}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none ring-brand focus:ring-2"
          placeholder="פרטו את הפנייה — לתיקון עובדתי ציינו קישור לכתבה ואת הטעות."
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-strong disabled:opacity-60"
      >
        {status === "loading" ? "שולח…" : "שליחת פנייה"}
      </button>
      {feedback ? (
        <p
          className={`text-sm ${status === "error" ? "text-danger" : "text-success"}`}
          role="status"
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
