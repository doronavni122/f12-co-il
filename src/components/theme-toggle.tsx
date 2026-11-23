"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
}

function readTheme(): Theme {
  try {
    const stored = window.localStorage.getItem("f12-theme") as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch (error) {
    console.error("[theme] failed to read", error);
    return "light";
  }
}

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getClientTheme(): Theme {
  return readTheme();
}

function getServerTheme(): Theme {
  return "light";
}

/** Blocking bootstrap — keep in sync with ThemeToggle storage key `f12-theme`. */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("f12-theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s==="light"||s==="dark"?s:(d?"dark":"light");var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.dataset.theme=t;}catch(e){console.error("[theme] bootstrap failed",e);}})();`;

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getClientTheme, getServerTheme);

  const toggle = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : "light";
    try {
      window.localStorage.setItem("f12-theme", next);
    } catch (error) {
      console.error("[theme] failed to persist", error);
    }
    applyTheme(next);
    emit();
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 items-center justify-center rounded-full border border-border bg-surface px-3 text-sm text-muted transition hover:border-brand hover:text-foreground"
      aria-label={theme === "dark" ? "מצב בהיר" : "מצב כהה"}
    >
      {theme === "dark" ? "בהיר" : "כהה"}
    </button>
  );
}
