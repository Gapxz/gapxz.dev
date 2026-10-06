import publishedProjects from "@/data/projects.json";
import type { Project } from "./project-model";
export const profile = {
  name: "Gustavo Souza Schroder",
  github: "https://github.com/Gapxz",
  linkedin: "https://www.linkedin.com/in/gustavo-souza-schroder-08b3b1388/",
};
export const projects: Project[] = publishedProjects;
export const setup = [
  { type: "Gabinete", name: "K-Mex Aquário", detail: "CG-W620", icon: "case" },
  { type: "Mouse", name: "AJAZZ AJ159 APEX", detail: "Branco", icon: "mouse" },
  {
    type: "Teclado",
    name: "Redragon Draconic K530",
    detail: "Branco",
    icon: "keyboard",
  },
  {
    type: "Microfone",
    name: "Fifine AM8",
    detail: "Dinâmico · Branco",
    icon: "mic",
  },
  { type: "Fone", name: "Edifier W830NB", detail: "Áudio", icon: "headphones" },
  {
    type: "Monitores",
    name: "ASUS + Samsung",
    detail: "Principal 200 Hz · Secundário 60 Hz",
    icon: "monitor",
  },
] as const;
