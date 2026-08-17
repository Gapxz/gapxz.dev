"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

const initialOffsets = {
  "--parallax-glow": "0px",
  "--parallax-far": "0px",
  "--parallax-middle": "0px",
  "--parallax-near": "0px",
  "--parallax-front": "0px",
  "--parallax-title": "0px",
} as CSSProperties;

type ParallaxBackdropProps = {
  children: ReactNode;
};

export function ParallaxBackdrop({ children }: ParallaxBackdropProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;

    if (!backdrop) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame: number | null = null;

    const resetOffsets = () => {
      backdrop.style.setProperty("--parallax-glow", "0px");
      backdrop.style.setProperty("--parallax-far", "0px");
      backdrop.style.setProperty("--parallax-middle", "0px");
      backdrop.style.setProperty("--parallax-near", "0px");
      backdrop.style.setProperty("--parallax-front", "0px");
      backdrop.style.setProperty("--parallax-title", "0px");
    };

    const updateOffsets = () => {
      animationFrame = null;

      if (reducedMotion.matches) {
        resetOffsets();
        return;
      }

      const parallaxDistance = Math.min(
        Math.max(window.scrollY, 0),
        window.innerHeight * 0.5,
      );

      backdrop.style.setProperty(
        "--parallax-glow",
        `${parallaxDistance * -0.015}px`,
      );
      backdrop.style.setProperty(
        "--parallax-far",
        `${parallaxDistance * -0.04}px`,
      );
      backdrop.style.setProperty(
        "--parallax-middle",
        `${parallaxDistance * -0.08}px`,
      );
      backdrop.style.setProperty(
        "--parallax-near",
        `${parallaxDistance * -0.13}px`,
      );
      backdrop.style.setProperty(
        "--parallax-front",
        `${parallaxDistance * -0.18}px`,
      );
      backdrop.style.setProperty(
        "--parallax-title",
        `${parallaxDistance * -0.1}px`,
      );
    };

    const requestUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateOffsets);
      }
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        resetOffsets();
        return;
      }

      requestUpdate();
    };

    updateOffsets();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      reducedMotion.removeEventListener("change", handleMotionPreference);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div
      ref={backdropRef}
      className="absolute inset-0 overflow-hidden bg-background"
      style={initialOffsets}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: "translate3d(0, var(--parallax-glow), 0)",
          }}
        >
          <div className="absolute left-1/2 top-[44%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/35 blur-3xl sm:h-[46rem] sm:w-[46rem]" />
        </div>

        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: "translate3d(0, var(--parallax-far), 0)" }}
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M-100 580C160 500 300 540 510 475C720 410 860 515 1030 455C1230 385 1430 470 1700 390V980H-100Z"
              fill="var(--color-accent)"
              opacity="0.18"
            />
          </svg>
        </div>

        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: "translate3d(0, var(--parallax-middle), 0)",
          }}
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M-100 670C120 565 320 660 500 545C670 435 820 650 1020 535C1220 420 1420 610 1700 500V980H-100Z"
              fill="var(--color-accent)"
              opacity="0.35"
            />
          </svg>
        </div>

        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: "translate3d(0, var(--parallax-near), 0)" }}
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M-100 750C140 610 330 760 540 625C740 500 910 760 1120 610C1330 465 1480 700 1700 590V980H-100Z"
              fill="var(--color-accent)"
              opacity="0.65"
            />
          </svg>
        </div>

        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: "translate3d(0, var(--parallax-front), 0)",
          }}
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M-100 835C170 690 360 850 600 710C820 590 980 850 1230 700C1450 570 1580 760 1700 690V980H-100Z"
              fill="var(--color-background)"
            />
          </svg>
        </div>
      </div>

      <div
        className="absolute inset-0 z-10 grid place-items-center px-4 will-change-transform"
        style={{ transform: "translate3d(0, var(--parallax-title), 0)" }}
      >
        {children}
      </div>
    </div>
  );
}
