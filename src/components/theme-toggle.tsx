"use client";
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const media = matchMedia("(prefers-color-scheme: dark)");
  const sync = () => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("gap-theme");
    } catch {}
    document.documentElement.dataset.theme =
      stored === "light" || stored === "dark"
        ? stored
        : media.matches
          ? "dark"
          : "light";
    callback();
  };
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  media.addEventListener("change", sync);
  window.addEventListener("storage", sync);
  sync();
  return () => {
    observer.disconnect();
    media.removeEventListener("change", sync);
    window.removeEventListener("storage", sync);
  };
}
export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
  function toggle() {
    const theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("gap-theme", theme);
    } catch {
      /* The chosen theme still works for this page. */
    }
  }
  return (
    <button
      type="button"
      role="switch"
      aria-label="Modo escuro"
      aria-checked={dark}
      onClick={toggle}
      className="theme-switch soft-press"
      title={dark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      <span aria-hidden="true">
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
        </svg>
      </span>
      <span aria-hidden="true">
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />
        </svg>
      </span>
    </button>
  );
}
