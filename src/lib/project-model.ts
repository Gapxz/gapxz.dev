export type Project = {
  id: string;
  name: string;
  category: string;
  kind: string;
  description: string;
  summary: string;
  languages: string[];
  tags: string[];
  status: string;
  details: string[];
  learning: string;
  url?: string;
  demo?: string;
};
export const FAVORITES_KEY = "gap-favorites";
export function readFavorites(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(value)
      ? [...new Set(value.filter((id): id is string => typeof id === "string"))]
      : [];
  } catch {
    return [];
  }
}
export function filterProjects(
  projects: Project[],
  language: string,
  query: string,
  savedOnly: boolean,
  favorites: string[],
) {
  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("pt-BR");
  const search = normalize(query.trim());
  return projects.filter(
    (project) =>
      (language === "Todos" || project.languages.includes(language)) &&
      (!savedOnly || favorites.includes(project.id)) &&
      normalize(
        [
          project.name,
          project.description,
          ...project.tags,
          ...project.languages,
        ].join(" "),
      ).includes(search),
  );
}
