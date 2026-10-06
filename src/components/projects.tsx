"use client";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/portfolio";
import { Icon } from "./icon";
import { ProjectArt } from "./project-art";
type Project = (typeof projects)[number];
export function Projects() {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!selected) return;
    dialog.current?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [selected]);
  function close() {
    dialog.current?.close();
    setSelected(null);
  }
  const visible = projects.filter(
    (project) => filter === "Todos" || project.category === filter,
  );
  return (
    <>
      <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">02 / Projetos selecionados</p>
          <h2 className="section-title">
            Aprender. Construir.{" "}
            <span className="font-editorial italic text-rose">Evoluir.</span>
          </h2>
        </div>
        <div
          className="flex gap-1 rounded-full border border-line p-1"
          aria-label="Filtrar projetos"
        >
          {["Todos", "Python", "Web"].map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-5 py-2 text-xs transition-colors ${filter === item ? "bg-foreground text-background" : "text-muted hover:text-foreground"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} projetos exibidos
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((project) => (
          <article
            key={project.id}
            className="group overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-rose/35"
          >
            <ProjectArt id={project.id} />
            <div className="p-6 sm:p-7">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-[9px] uppercase tracking-[.13em] text-muted">
                  {project.kind}
                </p>
                <span className="text-[9px] text-rose">{project.status}</span>
              </div>
              <h3>
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  aria-label={`Conhecer projeto ${project.name}`}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <span className="text-2xl font-medium tracking-[-.05em]">
                    {project.name}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:bg-accent">
                    <Icon name="arrow" width="16" height="16" />
                  </span>
                </button>
              </h3>
              <p className="mt-3 max-w-sm text-xs leading-6 text-muted">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        onCancel={close}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-labelledby="project-title"
        aria-describedby="project-summary"
        className="project-dialog m-auto max-h-[85svh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border border-line bg-surface p-7 text-foreground shadow-2xl sm:p-10"
      >
        {selected && (
          <>
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow">{selected.kind}</p>
              <button
                type="button"
                autoFocus
                onClick={close}
                aria-label="Fechar projeto"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-line"
              >
                <Icon name="close" />
              </button>
            </div>
            <h2 id="project-title" className="mt-3 text-3xl tracking-[-.05em]">
              {selected.name}
            </h2>
            <p
              id="project-summary"
              className="mt-5 text-sm leading-7 text-muted"
            >
              {selected.summary}
            </p>
            <h3 className="mt-7 text-sm">O que faz parte do projeto</h3>
            <ul className="mt-4 space-y-3">
              {selected.details.map((detail) => (
                <li
                  key={detail}
                  className="flex gap-3 text-xs leading-6 text-muted"
                >
                  <span className="text-rose">↗</span>
                  {detail}
                </li>
              ))}
            </ul>
            <div className="mt-7 rounded-lg border border-line bg-background p-5">
              <h3 className="text-xs text-rose">Aprendizados em prática</h3>
              <p className="mt-2 text-xs leading-6 text-muted">
                {selected.learning}
              </p>
            </div>
            {"url" in selected && (
              <a
                className="button-primary mt-6"
                href={selected.url}
                target="_blank"
                rel="noreferrer"
              >
                Ver repositório <Icon name="arrow" width="16" height="16" />
              </a>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
