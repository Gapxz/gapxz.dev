"use client";
import { useEffect, useState, type FormEvent } from "react";
import type { Project } from "@/lib/project-model";
import Link from "next/link";
import { Icon } from "@/components/icon";

const fields = [
  {
    key: "name",
    label: "Nome do projeto",
    max: 100,
    placeholder: "Meu novo projeto",
  },
  {
    key: "id",
    label: "Identificador",
    max: 80,
    placeholder: "meu-novo-projeto",
  },
  { key: "category", label: "Categoria", max: 50, placeholder: "Web" },
  {
    key: "kind",
    label: "Tipo de projeto",
    max: 100,
    placeholder: "Projeto pessoal · Site",
  },
  {
    key: "description",
    label: "Descrição curta",
    max: 240,
    placeholder: "O que o projeto faz, em uma frase.",
  },
  { key: "summary", label: "Descrição completa", max: 2000, multiline: true },
  {
    key: "languages",
    label: "Linguagens (separadas por vírgula)",
    max: 480,
    placeholder: "TypeScript, HTML, CSS",
  },
  {
    key: "tags",
    label: "Tecnologias (separadas por vírgula)",
    max: 720,
    placeholder: "React, Tailwind CSS, Python",
  },
  { key: "status", label: "Status", max: 80, placeholder: "Concluído" },
  {
    key: "details",
    label: "Funcionalidades (uma por linha)",
    max: 6000,
    multiline: true,
  },
  { key: "learning", label: "O que você aprendeu", max: 1500, multiline: true },
  {
    key: "url",
    label: "Repositório no GitHub (opcional)",
    max: 1000,
    placeholder: "https://github.com/Gapxz/meu-projeto",
    optional: true,
  },
  {
    key: "demo",
    label: "Site ou demonstração (opcional)",
    max: 1000,
    placeholder: "https://meu-projeto.com",
    optional: true,
  },
] as const;
export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [items, setItems] = useState<Project[]>([]);
  const [version, setVersion] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  async function request(method = "GET", project?: Project, id?: string) {
    const response = await fetch(
      `/api/admin/projects${id ? `/${encodeURIComponent(id)}` : ""}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${password}`,
          "Content-Type": "application/json",
          "If-Match": version,
        },
        body: project ? JSON.stringify(project) : undefined,
      },
    );
    if (!response.headers.get("content-type")?.includes("application/json"))
      throw new Error(
        "Serviço Python indisponível. Inicie o back-end e habilite a API local.",
      );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error ?? "Não foi possível concluir a operação.");
    setItems(data);
    setVersion(response.headers.get("etag") ?? "");
    return data as Project[];
  }
  async function login(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      await request();
      setAuthenticated(true);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Não foi possível conectar.",
      );
    } finally {
      setBusy(false);
    }
  }
  function choose(project: Project | null) {
    if (
      dirty &&
      !window.confirm("Descartar as alterações que ainda não foram salvas?")
    )
      return;
    setSelected(project);
    setFormKey((k) => k + 1);
    setDirty(false);
    setMessage("");
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = (key: string) => String(form.get(key) ?? "").trim();
    const project: Project = {
      id: selected?.id ?? text("id"),
      name: text("name"),
      category: text("category"),
      kind: text("kind"),
      description: text("description"),
      summary: text("summary"),
      languages: text("languages")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      tags: text("tags")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      status: text("status"),
      details: text("details")
        .split(/\r?\n/)
        .map((x) => x.trim())
        .filter(Boolean),
      learning: text("learning"),
      url: text("url"),
      demo: text("demo"),
    };
    setBusy(true);
    setMessage("");
    try {
      const updated = await request(
        selected ? "PUT" : "POST",
        project,
        selected?.id,
      );
      setSelected(updated.find((p) => p.id === project.id) ?? null);
      setDirty(false);
      setFormKey((k) => k + 1);
      setMessage(
        "Projeto salvo. Já está disponível no portfólio conectado a este serviço. Versione o catálogo no GitHub para incluí-lo no próximo deploy.",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Falha ao salvar. Seu formulário foi preservado.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (
      !selected ||
      !window.confirm(
        `Remover “${selected.name}” do catálogo? O último catálogo ficará no backup local.`,
      )
    )
      return;
    setBusy(true);
    try {
      await request("DELETE", undefined, selected.id);
      setSelected(null);
      setDirty(false);
      setFormKey((k) => k + 1);
      setMessage("Projeto removido do catálogo.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Falha ao remover.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main id="conteudo" className="site-container min-h-screen pb-20 pt-32">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Área administrativa</p>
          <h1 className="section-title">Seu próximo projeto começa aqui.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            Cadastre, atualize e organize os projetos do seu portfólio.
          </p>
        </div>
        <Link href="/#projetos" className="button-secondary soft-press">
          Ver portfólio <Icon name="arrow" width="16" height="16" />
        </Link>
      </div>
      {!authenticated ? (
        <form onSubmit={login} className="surface max-w-xl p-7 sm:p-9">
          <h2 className="text-xl font-semibold">Entrar no editor</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Use a senha do serviço Python. Ela fica no arquivo local{" "}
            <code>.portfolio-admin.key</code> e não é enviada ao GitHub.
          </p>
          <label className="mt-6 block text-sm font-medium">
            Senha administrativa
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 min-h-12 w-full rounded-xl border border-line bg-background px-4"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="button-primary soft-press mt-5"
          >
            {busy ? "Conectando…" : "Entrar"}
          </button>
          <details className="mt-6 text-sm text-muted">
            <summary className="cursor-pointer">
              Como iniciar o editor local
            </summary>
            <p className="mt-3 leading-6">
              Na pasta do projeto, execute <code>python backend/server.py</code>
              . Configure <code>NEXT_PUBLIC_PORTFOLIO_API_ENABLED=true</code> no
              arquivo <code>.env.local</code> e inicie <code>npm run dev</code>.
              A senha é criada automaticamente no primeiro início.
            </p>
          </details>
        </form>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="surface p-5">
            <button
              type="button"
              onClick={() => choose(null)}
              disabled={busy}
              className="button-primary soft-press w-full"
            >
              Novo projeto +
            </button>
            <ul className="mt-5 space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => choose(item)}
                    disabled={busy}
                    className={`min-h-12 w-full rounded-xl px-3 py-3 text-left text-sm ${selected?.id === item.id ? "bg-fill font-semibold" : "text-muted"}`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  await request();
                  setMessage(
                    "Catálogo atualizado. Seu formulário foi preservado.",
                  );
                } catch (error) {
                  setMessage(
                    error instanceof Error
                      ? error.message
                      : "Falha ao recarregar.",
                  );
                } finally {
                  setBusy(false);
                }
              }}
              className="mt-5 min-h-11 text-sm underline"
            >
              Recarregar catálogo
            </button>
            <button
              type="button"
              disabled={busy}
              className="ml-4 min-h-11 text-sm text-muted"
              onClick={() => {
                if (dirty && !window.confirm("Sair sem salvar as alterações?"))
                  return;
                setAuthenticated(false);
                setPassword("");
                setDirty(false);
              }}
            >
              Sair
            </button>
          </aside>
          <form
            key={formKey}
            onSubmit={save}
            onChange={() => setDirty(true)}
            className="surface p-6 sm:p-9"
          >
            <h2 className="mb-7 text-2xl font-semibold">
              {selected ? `Editar ${selected.name}` : "Adicionar projeto"}
            </h2>
            <fieldset disabled={busy} className="grid gap-5 sm:grid-cols-2">
              {fields.map((field) => {
                const value = selected?.[field.key];
                const initial = Array.isArray(value)
                  ? value.join(field.key === "details" ? "\n" : ", ")
                  : (value ?? "");
                const inputClass =
                  "mt-2 min-h-12 w-full rounded-xl border border-line bg-background px-4 py-3 text-sm";
                return (
                  <label
                    key={field.key}
                    className={`block text-sm font-medium ${"multiline" in field ? "sm:col-span-2" : ""}`}
                  >
                    {field.label}
                    {"multiline" in field ? (
                      <textarea
                        name={field.key}
                        required
                        rows={field.key === "details" ? 4 : 3}
                        maxLength={field.max}
                        defaultValue={initial}
                        className={inputClass}
                      />
                    ) : (
                      <input
                        name={field.key}
                        type={
                          field.key === "url" || field.key === "demo"
                            ? "url"
                            : "text"
                        }
                        required={!("optional" in field)}
                        maxLength={field.max}
                        readOnly={field.key === "id" && !!selected}
                        pattern={
                          field.key === "id"
                            ? "[a-z0-9]+(-[a-z0-9]+)*"
                            : undefined
                        }
                        defaultValue={initial}
                        placeholder={
                          "placeholder" in field ? field.placeholder : undefined
                        }
                        className={inputClass}
                      />
                    )}
                  </label>
                );
              })}
            </fieldset>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={busy}
                className="button-primary soft-press"
              >
                {busy ? "Salvando…" : "Salvar projeto"}
              </button>
              {selected && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={remove}
                  className="button-secondary soft-press"
                >
                  Remover projeto
                </button>
              )}
              <span className="text-xs text-muted">
                {dirty ? "Alterações não salvas" : "Catálogo em dia"}
              </span>
            </div>
          </form>
        </div>
      )}
      {message && (
        <p role="status" className="surface mt-6 p-5 text-sm leading-6">
          {message}
        </p>
      )}
    </main>
  );
}
