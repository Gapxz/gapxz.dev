"use client";
import { useSyncExternalStore } from "react";

const storageKey = "gap-theme";
function subscribe(callback: () => void) {
  const media = matchMedia("(prefers-color-scheme: dark)");
  const sync = () => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(storageKey);
    } catch {}
    document.documentElement.dataset.theme =
      stored === "light" || stored === "dark"
        ? stored
        : media.matches
          ? "dark"
          : "light";
    callback();
  };
  const storage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) sync();
  };
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  media.addEventListener("change", sync);
  window.addEventListener("storage", storage);
  sync();
  return () => {
    observer.disconnect();
    media.removeEventListener("change", sync);
    window.removeEventListener("storage", storage);
  };
}
export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
  function choose(theme: "light" | "dark") {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      /* The selected theme still works when browser storage is blocked. */
    }
  }
  return (
    <div className="theme-switch" role="group" aria-label="Tema do site">
      <button
        type="button"
        aria-label="Modo claro"
        title="Modo claro"
        aria-pressed={!dark}
        onClick={() => choose("light")}
        className="soft-press"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Modo escuro"
        title="Modo escuro"
        aria-pressed={dark}
        onClick={() => choose("dark")}
        className="soft-press"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />
        </svg>
      </button>
    </div>
  );
}
