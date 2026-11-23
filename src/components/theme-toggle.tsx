"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("f12-theme") as Theme | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial: Theme = stored ?? (prefersDark ? "dark" : "light");
      setTheme(initial);
      applyTheme(initial);
      setReady(true);
    } catch (error) {
      console.error("[theme] failed to init", error);
      setReady(true);
    }
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    try {
      window.localStorage.setItem("f12-theme", next);
    } catch (error) {
      console.error("[theme] failed to persist", error);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 items-center justify-center rounded-full border border-border bg-surface px-3 text-sm text-muted transition hover:border-brand hover:text-foreground"
      aria-label={theme === "dark" ? "מצב בהיר" : "מצב כהה"}
      disabled={!ready}
    >
      {theme === "dark" ? "בהיר" : "כהה"}
    </button>
  );
}
