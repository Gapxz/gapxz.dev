"use client";
import { useEffect } from "react";
export function Motion() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const art = document.querySelector<HTMLElement>("[data-parallax]");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (art)
        art.style.setProperty(
          "--parallax-y",
          preference.matches ? "0px" : `${Math.min(scrollY, 800) * 0.07}px`,
        );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!preference.matches) entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    window.addEventListener("scroll", schedule, { passive: true });
    preference.addEventListener("change", schedule);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      preference.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
