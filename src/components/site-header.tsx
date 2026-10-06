"use client";
import { useEffect, useState } from "react";
import { Icon } from "./icon";
const items = [
  ["Sobre", "sobre"],
  ["Projetos", "projetos"],
  ["Jornada", "jornada"],
  ["Setup", "setup"],
  ["Contato", "contato"],
];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
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
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", escape);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-background/90 backdrop-blur-xl">
      <div className="site-container flex h-20 items-center justify-between">
        <a
          href="#inicio"
          aria-label="Gap, início"
          onClick={() => setOpen(false)}
          className="text-2xl font-semibold tracking-[-.08em]"
        >
          gap<span className="text-rose">.</span>
          <span className="ml-1 font-mono text-xs font-normal tracking-normal text-muted">
            / dev
          </span>
        </a>
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-8 md:flex"
        >
          {items.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={`nav-link ${active === id ? "is-active" : ""}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="hidden items-center gap-2 text-xs lg:flex"
        >
          <span className="status-dot" />
          Vamos conversar <Icon name="arrow" width="14" height="14" />
        </a>
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
          className="grid size-11 place-items-center rounded-lg border border-line md:hidden"
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      <nav
        id="mobile-nav"
        aria-label="Navegação mobile"
        hidden={!open}
        className="border-t border-line bg-background px-6 pb-5 md:hidden"
      >
        {items.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setOpen(false)}
            className="block border-b border-line py-4 text-sm"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
