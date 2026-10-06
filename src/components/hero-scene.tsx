"use client";
import { useEffect, useRef } from "react";
import { Icon } from "./icon";
import { useMotion } from "./motion";

// Procedural orbital paths: no video, animation library or per-frame React renders.
export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(0);
  const { enabled, paused, reduced, toggle } = useMotion();
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let width = 0,
      height = 0,
      frame = 0,
      previous = 0;
    let visible = true;
    function draw(time: number) {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      const cx = width / 2,
        cy = height / 2,
        scale = Math.min(width, height);
      for (let i = 0; i < 64; i++) {
        const band = i % 3;
        const angle =
          i * 2.399963 + time * (0.055 + band * 0.014) * (band === 1 ? -1 : 1);
        const radius =
          scale * (0.3 + band * 0.07 + Math.sin(time * 0.18 + i * 1.7) * 0.012);
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const alpha = 0.17 + (Math.sin(time * 0.55 + i) + 1) * 0.21;
        const bright = i % 11 === 0;
        context.beginPath();
        context.fillStyle = `rgba(235, ${bright ? 203 : 152}, ${bright ? 217 : 174}, ${alpha})`;
        context.arc(x, y, bright ? 2 : 1, 0, Math.PI * 2);
        context.fill();
        if (bright) {
          context.beginPath();
          context.strokeStyle = `rgba(229,166,180,${alpha * 0.3})`;
          context.lineWidth = 1;
          context.arc(cx, cy, radius, angle - 0.16, angle);
          context.stroke();
        }
      }
    }
    function tick(timestamp: number) {
      frame = 0;
      if (!enabled || !visible || document.hidden) {
        previous = 0;
        return;
      }
      if (!previous) previous = timestamp;
      const delta = timestamp - previous;
      if (delta >= 1000 / 30) {
        elapsedRef.current += Math.min(delta, 80) / 1000;
        previous = timestamp;
        draw(elapsedRef.current);
      }
      frame = requestAnimationFrame(tick);
    }
    function start() {
      if (!frame && enabled && visible && !document.hidden)
        frame = requestAnimationFrame(tick);
    }
    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(elapsedRef.current);
      start();
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      canvas.parentElement?.setAttribute("data-visible", String(visible));
      if (visible) start();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      }
    });
    intersection.observe(canvas);
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      } else start();
    };
    document.addEventListener("visibilitychange", visibility);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [enabled]);
  return (
    <div className="scene-parallax" data-parallax>
      <div className="hero-scene">
        <div aria-hidden="true">
          <div className="scene-halo continuous" />
          <div className="scene-ring continuous" />
          <div className="scene-ring scene-ring-inner continuous" />
        </div>
        <canvas
          ref={canvasRef}
          className="scene-particles"
          aria-hidden="true"
        />
        <div className="scene-disc continuous" aria-hidden="true">
          <div className="scene-monogram">
            g<span>.</span>
          </div>
        </div>
        <div
          className="scene-label scene-label-first continuous"
          aria-hidden="true"
        >
          <Icon name="code" width="15" height="15" className="text-rose" />
          construindo ideias
        </div>
        <div
          className="scene-label scene-label-second continuous"
          aria-hidden="true"
        >
          <span className="status-dot" />
          aprendizado contínuo
        </div>
        <div className="scene-controls">
          <span>Python · Web · Curiosidade</span>
          <button
            className="icon-button soft-press"
            type="button"
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
            title={
              reduced
                ? "Movimento reduzido ativado no sistema"
                : paused
                  ? "Retomar animações"
                  : "Pausar animações"
            }
          >
            <Icon
              name={paused || reduced ? "play" : "pause"}
              width="14"
              height="14"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
