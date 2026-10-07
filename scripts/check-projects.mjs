import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { filterProjects, readFavorites } from "../src/lib/project-model.ts";
const projects = [
  {
    id: "campo-minado",
    name: "Campo Minado",
    description: "Lógica e matrizes",
    languages: ["Python"],
    tags: ["Arquivos"],
  },
  {
    id: "portfolio",
    name: "gapxz.dev",
    description: "Um portfólio web",
    languages: ["TypeScript", "CSS"],
    tags: ["Tailwind CSS"],
  },
];
assert.deepEqual(readFavorites("broken"), []);
assert.deepEqual(readFavorites('{"id":1}'), []);
assert.deepEqual(readFavorites('["campo-minado",null,"campo-minado"]'), [
  "campo-minado",
]);
assert.equal(
  filterProjects(projects, "Python", "logica", false, [])[0]?.id,
  "campo-minado",
);
assert.equal(
  filterProjects(projects, "TypeScript", "", false, [])[0]?.id,
  "portfolio",
);
assert.equal(
  filterProjects(projects, "Todos", "", true, ["portfolio"]).length,
  1,
);
assert.equal(
  filterProjects(projects, "Python", "", true, ["portfolio"]).length,
  0,
);
assert.equal(
  filterProjects(projects, "Todos", "inexistente", false, []).length,
  0,
);
console.log("Project filtering, combined search and favorites checks passed.");
