"use client";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/portfolio";
import { Icon } from "./icon";
import { ProjectArt } from "./project-art";
type Project = (typeof projects)[number];
const filters = ["Todos", "Python", "Web"];
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
      <div className="mb-10 flex flex-wrap items-end justify-between gap-7">
        <div>
          <p className="eyebrow">Projetos selecionados</p>
          <h2 className="section-title">
            Feitos para aprender.
            <br />
            <span className="text-muted">Construídos para funcionar.</span>
          </h2>
        </div>
        <div
          role="group"
          className="segmented-control"
          aria-label="Filtrar projetos"
        >
          <span
            aria-hidden="true"
            className="segmented-thumb"
            style={{
              transform: `translateX(${filters.indexOf(filter) * 100}%)`,
            }}
          />
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} projetos exibidos
      </p>
      <div className="project-grid grid gap-6 md:grid-cols-2">
        {visible.map((project) => (
          <article
            key={project.id}
            className="project-card surface overflow-hidden"
          >
            <ProjectArt id={project.id} />
            <div className="p-7 sm:p-8">
              <p className="mb-3 text-xs font-medium text-rose">
                {project.kind}
              </p>
              <h3 className="font-display text-[28px] font-semibold tracking-tight">
                {project.name}
              </h3>
              <p className="mt-3 max-w-sm text-base leading-7 text-muted">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-5">
                <span className="text-xs text-muted">{project.status}</span>
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  aria-label={`Conhecer projeto ${project.name}`}
                  className="soft-press flex min-h-11 items-center gap-2 rounded-full bg-white/[.06] px-4 text-sm font-medium"
                >
                  Conhecer projeto{" "}
                  <Icon name="chevron" width="14" height="14" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        onCancel={close}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            close();
        }}
        aria-labelledby="project-title"
        aria-describedby="project-summary"
        className="project-dialog"
      >
        {selected && (
          <>
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow pt-3">{selected.kind}</p>
              <button
                type="button"
                autoFocus
                onClick={close}
                aria-label="Fechar projeto"
                className="icon-button soft-press"
              >
                <Icon name="close" />
              </button>
            </div>
            <h2
              id="project-title"
              className="font-display mt-3 text-4xl font-semibold tracking-tight"
            >
              {selected.name}
            </h2>
            <p
              id="project-summary"
              className="mt-5 text-base leading-7 text-muted"
            >
              {selected.summary}
            </p>
            <h3 className="mt-8 text-base font-semibold">
              O que faz parte do projeto
            </h3>
            <ul className="mt-4 divide-y divide-line">
              {selected.details.map((detail) => (
                <li
                  key={detail}
                  className="flex gap-3 py-4 text-sm leading-6 text-muted"
                >
                  <span className="text-rose" aria-hidden="true">
                    ✓
                  </span>
                  {detail}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-[20px] bg-white/[.035] p-6">
              <h3 className="text-sm font-semibold text-rose">
                Aprendizados em prática
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {selected.learning}
              </p>
            </div>
            {"url" in selected && (
              <a
                className="button-primary soft-press mt-7"
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
