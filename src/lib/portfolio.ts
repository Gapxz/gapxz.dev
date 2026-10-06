export const profile = {
  name: "Gustavo Souza Schroder",
  github: "https://github.com/Gapxz",
  linkedin: "https://www.linkedin.com/in/gustavo-souza-schroder-08b3b1388/",
};
export const projects = [
  {
    id: "campo-minado",
    name: "Campo Minado",
    category: "Python",
    kind: "Projeto acadêmico · Jogo",
    description: "Lógica, matrizes e um clássico reinventado no terminal.",
    summary:
      "Jogo de Campo Minado inteiramente em Python, desenvolvido para aplicar os conteúdos da faculdade em uma experiência jogável no terminal.",
    tags: ["Python", "Matrizes", "Arquivos"],
    status: "Projeto acadêmico",
    details: [
      "Tabuleiro 9 × 9 representado por matrizes, com abertura de casas e bandeiras.",
      "Pontuação baseada no tempo de jogo e ranking de jogadores.",
      "Persistência de nomes e resultados em arquivo texto.",
    ],
    learning:
      "Aplicar estruturas de dados, decompor regras em funções e cuidar da legibilidade de uma interface de terminal.",
  },
  {
    id: "portfolio",
    name: "gapxz.dev",
    category: "Web",
    kind: "Projeto pessoal · Web",
    description: "Meu espaço na internet. Feito para acompanhar a jornada.",
    summary:
      "Este portfólio reúne os projetos, os estudos e as coisas que fazem parte do meu dia a dia. Uma experiência responsiva com a minha identidade visual.",
    tags: ["Tailwind CSS", "Next.js", "TypeScript"],
    status: "Você está aqui",
    details: [
      "Interface responsiva construída com Tailwind CSS e componentes React.",
      "Animações sutis, parallax e respeito às preferências de movimento reduzido.",
      "Conteúdo organizado em componentes e dados fáceis de atualizar.",
    ],
    learning:
      "Dar forma às ideias na interface, com atenção à hierarquia visual, acessibilidade e navegação em diferentes telas.",
    url: "https://github.com/Gapxz/gapxz.dev",
  },
] as const;
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
