# gapxz.dev

Portfólio pessoal de Gustavo Souza Schroder (Gap). Interface em português, com identidade vinho, projetos, formação, reconhecimento no Code League e setup.

## Executar

Requer Node.js 20.9 ou superior e npm.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. Para verificar a versão de produção:

```sh
npm run build
npm start
```

## Tecnologias

- Next.js 16 e React 19, com TypeScript.
- Tailwind CSS 4 para layout, cores, tipografia e responsividade.
- CSS e SVG locais para as ilustrações; sem dependência de imagens externas.
- Animações CSS e parallax leve, desativados com a preferência de movimento reduzido.

O conteúdo é pré-renderizado. Não há API, banco ou serviço de back-end neste portfólio. O contato é feito pelos perfis públicos do LinkedIn e GitHub.

## Atualizar conteúdo

- `src/lib/portfolio.ts`: perfis públicos, projetos, detalhes e equipamentos.
- `src/app/page.tsx`: apresentação, formação, reconhecimento e seções.
- `src/app/globals.css`: tokens visuais e efeitos. A cor base é `#49111c`.
- `src/components/hero.tsx`: abertura e monograma.
- `src/components/setup-art.tsx`: ilustração vetorial do setup.

Os projetos têm filtros por tecnologia e detalhes em diálogo acessível por teclado. As ilustrações representam os projetos e o setup; não são capturas de tela nem fotografias.

## Verificar

```sh
npm run lint
npm run typecheck
npm run format:check
npm run build
```

Na revisão visual, conferir desktop e celular, navegação por âncoras, menu mobile, filtros, abertura e fechamento dos projetos por Escape, links de contato e preferência de movimento reduzido.
