"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { projects as published } from "@/lib/portfolio";
import {
  FAVORITES_KEY,
  filterProjects,
  readFavorites,
  type Project,
} from "@/lib/project-model";
import { Icon } from "./icon";
import { ProjectArt } from "./project-art";
function subscribeFavorites(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("favorites-changed", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("favorites-changed", callback);
  };
}
function favoriteSnapshot() {
  try {
    return localStorage.getItem(FAVORITES_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}
function Bookmark({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M6 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4V4Z" />
    </svg>
  );
}
export function Projects() {
  const [catalog, setCatalog] = useState<Project[]>(published);
  const [language, setLanguage] = useState("Todos");
  const [query, setQuery] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [notice, setNotice] = useState("");
  const rawFavorites = useSyncExternalStore(
    subscribeFavorites,
    favoriteSnapshot,
    () => "[]",
  );
  const favorites = readFavorites(rawFavorites);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_PORTFOLIO_API_ENABLED !== "true") return;
    const controller = new AbortController();
    const load = () =>
      fetch("/api/projects", { signal: controller.signal, cache: "no-store" })
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) setCatalog(data);
          }
        })
        .catch(() => {});
    load();
    window.addEventListener("focus", load);
    return () => {
      controller.abort();
      window.removeEventListener("focus", load);
    };
  }, []);
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
  function save(id: string) {
    const next = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("favorites-changed"));
      setNotice(
        next.includes(id)
          ? "Projeto salvo nos favoritos deste navegador."
          : "Projeto removido dos favoritos.",
      );
    } catch {
      setNotice(
        "O navegador bloqueou o armazenamento. Não foi possível salvar o favorito.",
      );
    }
  }
  const languages = [
    "Todos",
    ...new Set(catalog.flatMap((project) => project.languages)),
  ];
  const visible = filterProjects(
    catalog,
    language,
    query,
    savedOnly,
    favorites,
  );
  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">A coleção</p>
          <h2 className="section-title">
            Meus projetos
            <span className="ml-3 align-top text-lg font-normal tracking-normal text-muted">
              {catalog.length.toString().padStart(2, "0")}
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">
            Ideias que saíram do papel. Explore por linguagem, conheça os
            detalhes e salve seus favoritos.
          </p>
        </div>
        <a
          href="https://github.com/Gapxz"
          target="_blank"
          rel="noreferrer"
          className="button-secondary soft-press"
        >
          Ver GitHub <Icon name="arrow" width="15" height="15" />
        </a>
      </div>
      <div className="surface mb-7 p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <label className="search-field min-w-0 flex-1">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
            <input
              aria-label="Buscar projetos"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar um projeto..."
              type="search"
            />
          </label>
          <button
            type="button"
            onClick={() => setSavedOnly(!savedOnly)}
            aria-pressed={savedOnly}
            className={`soft-press flex min-h-[52px] items-center gap-2 rounded-[15px] border border-line px-4 text-sm font-medium ${savedOnly ? "bg-foreground text-background" : "bg-background"}`}
          >
            <Bookmark filled={savedOnly} />
            Favoritos{" "}
            <span className="opacity-60">
              {catalog.filter((p) => favorites.includes(p.id)).length}
            </span>
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-medium text-muted">Linguagem</span>
          <div
            role="group"
            aria-label="Filtrar projetos por linguagem"
            className="segmented-control"
          >
            {languages.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={language === item}
                onClick={() => setLanguage(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-5 flex flex-wrap justify-between gap-2 text-xs text-muted">
        <p aria-live="polite">
          {visible.length}{" "}
          {visible.length === 1 ? "projeto encontrado" : "projetos encontrados"}
        </p>
        <p>Favoritos ficam salvos neste navegador.</p>
      </div>
      <p className="sr-only" role="status">
        {notice}
      </p>
      {visible.length === 0 ? (
        <div className="surface p-10 text-center">
          <h3 className="text-xl font-semibold">Nenhum projeto por aqui.</h3>
          <p className="mt-3 text-muted">
            Tente outra busca ou salve um projeto nos favoritos.
          </p>
          <button
            type="button"
            className="button-secondary soft-press mt-6"
            onClick={() => {
              setQuery("");
              setLanguage("Todos");
              setSavedOnly(false);
            }}
          >
            Mostrar todos
          </button>
        </div>
      ) : (
        <div className="project-grid grid gap-6 md:grid-cols-2">
          {visible.map((project) => (
            <article
              key={project.id}
              className="project-card surface relative overflow-hidden"
            >
              <ProjectArt id={project.id} />
              <button
                type="button"
                onClick={() => save(project.id)}
                aria-label={`${favorites.includes(project.id) ? "Remover dos favoritos" : "Salvar nos favoritos"}: ${project.name}`}
                aria-pressed={favorites.includes(project.id)}
                className="soft-press absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-line bg-surface shadow-sm"
              >
                <Bookmark filled={favorites.includes(project.id)} />
              </button>
              <div className="p-6 sm:p-8">
                <p className="mb-3 text-xs font-medium text-muted">
                  {project.kind}
                </p>
                <h3 className="font-display text-[28px] font-semibold tracking-tight">
                  {project.name}
                </h3>
                <p className="mt-3 text-base leading-7 text-muted">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                  <span className="text-xs text-muted">{project.status}</span>
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    aria-label={`Conhecer projeto ${project.name}`}
                    className="soft-press flex min-h-11 items-center gap-2 rounded-full bg-fill px-4 text-sm font-medium"
                  >
                    Conhecer projeto{" "}
                    <Icon name="chevron" width="14" height="14" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      <dialog
        ref={dialog}
        onCancel={close}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const r = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
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
            <h3 className="mt-8 font-semibold">Sobre o projeto</h3>
            <ul className="mt-3 divide-y divide-line">
              {selected.details.map((detail) => (
                <li key={detail} className="py-4 text-sm leading-6 text-muted">
                  {detail}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-[20px] bg-background p-6">
              <h3 className="text-sm font-semibold">O que aprendi</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {selected.learning}
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {selected.url && (
                <a
                  className="button-secondary soft-press"
                  href={selected.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Repositório <Icon name="arrow" width="15" height="15" />
                </a>
              )}
              {selected.demo && (
                <a
                  className="button-primary soft-press"
                  href={selected.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir projeto <Icon name="arrow" width="15" height="15" />
                </a>
              )}
              <button
                type="button"
                onClick={() => save(selected.id)}
                aria-pressed={favorites.includes(selected.id)}
                className="button-secondary soft-press"
              >
                <Bookmark filled={favorites.includes(selected.id)} />
                {favorites.includes(selected.id) ? "Salvo" : "Salvar"}
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
