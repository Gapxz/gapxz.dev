"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
const items = [
  ["Projetos", "projetos"],
  ["Sobre", "sobre"],
  ["Jornada", "jornada"],
  ["Setup", "setup"],
  ["Contato", "contato"],
];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = () => {
      if (innerWidth >= 768) setOpen(false);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header
      className="site-header fixed inset-x-0 top-0 z-50"
      data-scrolled={scrolled}
      data-open={open}
    >
      <div className="site-container nav-entrance flex h-[72px] items-center justify-between gap-5">
        <Link
          href="/#inicio"
          aria-label="Gap, início"
          onClick={() => setOpen(false)}
          className="flex min-h-11 items-center gap-3 text-[25px] font-semibold tracking-[-.065em]"
        >
          <span>gap.</span>
          <span className="hidden border-l border-line pl-3 text-xs font-medium tracking-normal text-muted xl:inline">
            Portfólio
          </span>
        </Link>
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 md:flex"
        >
          {items.map(([label, id]) => (
            <Link
              key={id}
              href={`/#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={`nav-link ${active === id ? "is-active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/#contato"
            onClick={() => setOpen(false)}
            className="soft-press hidden min-h-11 items-center gap-2 rounded-full border border-line bg-foreground text-background px-4 text-[13px] font-semibold sm:inline-flex"
          >
            Vamos conversar <Icon name="arrow" width="13" height="13" />
          </Link>
          <button
            ref={toggle}
            type="button"
            className="icon-button soft-press md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        hidden={!open}
        aria-label="Navegação mobile"
        className="mobile-menu site-container pb-5 md:hidden"
      >
        {items.map(([label, id]) => (
          <Link
            key={id}
            href={`/#${id}`}
            onClick={() => setOpen(false)}
            className="flex min-h-14 items-center justify-between border-t border-line px-1 text-lg font-medium"
          >
            {label}
            <Icon
              name="chevron"
              width="17"
              height="17"
              className="text-muted"
            />
          </Link>
        ))}
      </nav>
    </header>
  );
}
