# gapxz.dev

Portfólio de Gustavo Souza Schroder (Gap), em português. Interface inspirada nos controles, materiais, tipografia e hierarquia do iOS, mantendo o vinho `#49111c` como cor base.

## Executar

Requer Node.js 20.9 ou superior e npm.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. Para a versão de produção:

```sh
npm run build
npm start
```

## Interface e tipografia

- Next.js 16, React 19, TypeScript e Tailwind CSS 4.
- Fontes de sistema com stacks distintos para SF Pro Text e SF Pro Display. Em dispositivos Apple, `-apple-system` / `BlinkMacSystemFont` usam San Francisco nativamente. Windows e outras plataformas usam suas fontes locais de fallback.
- Nenhum arquivo proprietário de SF Pro é distribuído ou baixado pelo site. Não há requisições ao Google Fonts. Consulte [as fontes e a licença da Apple](https://developer.apple.com/fonts/).
- Controles com área de toque de pelo menos 44 px, navegação com material translúcido ao rolar, filtro segmentado e diálogos nativos com gerenciamento de foco.
- Superfícies arredondadas, espaçamento consistente e hierarquia clara entre títulos, texto e legendas. Referência: [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines).

## Movimento real

- Entrada escalonada do nome, título, descrição e ações, com fade e deslocamento vertical.
- Canvas com 64 partículas em órbitas procedurais, atualizado em até 30 FPS, com densidade de pixels limitada a 2.
- Anéis em rotação, monograma flutuante, reflexo de luz e etiquetas com movimento suave em CSS.
- Microinterações de hover e pressão, controles segmentados animados e entrada dos detalhes dos projetos.
- Parallax leve, executado por `requestAnimationFrame`, sem renderizar o React a cada quadro.
- O canvas para quando está fora da tela ou a aba está oculta. Os efeitos CSS contínuos param fora da tela. Todos os recursos e observadores são liberados ao desmontar.
- O botão do hero permite pausar e retomar o movimento contínuo. `prefers-reduced-motion` desativa movimento, parallax e transições automaticamente, mantendo o conteúdo legível. `prefers-reduced-transparency` fornece superfícies opacas nos navegadores compatíveis.

## Atualizar conteúdo

- `src/lib/portfolio.ts`: perfis públicos, projetos e equipamentos.
- `src/app/page.tsx`: apresentação, formação, reconhecimento e seções.
- `src/app/globals.css`: tokens visuais, componentes e keyframes.
- `src/components/hero.tsx`: título, conteúdo e sequência de entrada.
- `src/components/hero-scene.tsx`: partículas, monograma e controle de animação.
- `src/components/motion.tsx`: preferência de movimento, pausa, revelações e parallax.
- `src/components/setup-art.tsx`: ilustração vetorial do setup.

O conteúdo é pré-renderizado e não requer back-end. O contato é feito apenas pelos perfis públicos do LinkedIn e GitHub. As ilustrações dos projetos e do setup são representações visuais, não fotografias ou capturas de tela.

## Verificar

```sh
npm run lint
npm run typecheck
npm run format:check
npm run build
```

Revisão funcional: larguras de 320, 390, 768 e 1440 px; menu mobile e Escape; filtros; detalhes e restauração de foco; links de contato; movimento contínuo, pausa e retomada; preferência de movimento reduzido do sistema. O comportamento nativo de SF Pro deve ser conferido em um dispositivo Apple.
