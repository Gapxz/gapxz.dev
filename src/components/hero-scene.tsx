"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Icon } from "./icon";
import { useMotion } from "./motion";
export function HeroScene() {
  const scene = useRef<HTMLDivElement>(null);
  const { paused, reduced, toggle } = useMotion();
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.visible = String(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="scene-parallax" data-parallax>
      <div ref={scene} className="hero-scene">
        <div
          className="absolute inset-[5%] rounded-full bg-surface/60"
          aria-hidden="true"
        />
        <Image
          src="/images/coffee-mustache-code.png"
          alt="Xícara de café com um bigode e teclas com símbolos de código"
          width={1280}
          height={1280}
          sizes="(max-width: 1023px) 360px, 480px"
          preload
          className="coffee-art continuous relative z-10 h-full w-full object-contain p-6"
        />
        <div
          className="scene-label scene-label-first continuous z-20"
          aria-hidden="true"
        >
          <Icon name="code" width="16" height="16" />
          Café. Bigode. Código.
        </div>
        <div
          className="scene-label scene-label-second continuous z-20"
          aria-hidden="true"
        >
          <span className="status-dot" />
          Uma ideia de cada vez.
        </div>
      </div>
      <div className="scene-controls px-5">
        <span>Feito de curiosidade e café.</span>
        <button
          type="button"
          className="icon-button soft-press"
          onClick={toggle}
          disabled={reduced}
          aria-label={
            reduced
              ? "Animações reduzidas pelo sistema"
              : paused
                ? "Retomar animações"
                : "Pausar animações"
          }
          aria-pressed={paused || reduced}
        >
          <Icon
            name={paused || reduced ? "play" : "pause"}
            width="14"
            height="14"
          />
        </button>
      </div>
    </div>
  );
}
