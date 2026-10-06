"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
const query = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const media = matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function snapshot() {
  return matchMedia(query).matches;
}
const MotionContext = createContext({
  enabled: true,
  paused: false,
  reduced: false,
  toggle: () => {},
});
export function useMotion() {
  return useContext(MotionContext);
}
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(subscribe, snapshot, () => false);
  const [paused, setPaused] = useState(false);
  const enabled = !paused && !reduced;
  const value = useMemo(
    () => ({ enabled, paused, reduced, toggle: () => setPaused((p) => !p) }),
    [enabled, paused, reduced],
  );
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    const art = document.querySelector<HTMLElement>("[data-parallax]");
    let frame = 0;
    const update = () => {
      frame = 0;
      art?.style.setProperty(
        "--parallax-y",
        enabled ? `${Math.min(scrollY, 900) * 0.045}px` : "0px",
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (enabled) entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]:not(.reveal-in)")
      .forEach((el) => observer.observe(el));
    if (enabled) window.addEventListener("scroll", schedule, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);
  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}
