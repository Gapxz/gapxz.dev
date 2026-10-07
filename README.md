# gapxz.dev

Portfólio de Gustavo Souza Schroder (Gap), em português. Projetos em destaque, filtros por linguagem, busca, favoritos e um editor local para acompanhar novos repositórios.

## Executar o portfólio

Requer Node.js 20.9+ e npm. Para os testes TypeScript nativos, use Node.js 22.18+.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. Para produção: `npm run build` e `npm start`.

## Adicionar ou editar projetos

O editor usa **Python 3.10+**, sem dependências externas. Ele salva o catálogo em `src/data/projects.json`. O site publicado funciona com esse arquivo e não precisa de um servidor Python em produção.

1. Crie `.env.local` na raiz com `NEXT_PUBLIC_PORTFOLIO_API_ENABLED=true`.
2. Em um terminal, execute `python backend/server.py`.
3. Em outro terminal, execute `npm run dev` (reinicie se mudou a configuração).
4. Abra http://localhost:3000/admin. A senha é gerada no primeiro início e fica em `.portfolio-admin.key`. Abra esse arquivo localmente e copie a senha para o painel.
5. Clique em **Novo projeto**, preencha os dados e salve. Também é possível editar e remover projetos existentes. Repositório e demonstração são links HTTPS opcionais.
6. Confira a página pública e publique a alteração do catálogo:

```sh
npx prettier src/data/projects.json --write
git add src/data/projects.json
git commit -m "content: add new portfolio project"
git push origin main
```

O próximo build/deploy incluirá o catálogo atualizado. Salvar no painel **não faz push ou deploy automaticamente**. A integração com GitHub é feita por links para os repositórios; não há importação automática. Os filtros de linguagem são gerados a partir dos projetos cadastrados.

### Funcionamento do editor

- API escuta apenas em `127.0.0.1:8766`, acessada pelo proxy local do Next.js. Este é um editor de desenvolvimento local, não um serviço de administração hospedado.
- Não defina `NEXT_PUBLIC_PORTFOLIO_API_ENABLED=true` na hospedagem pública. Sem essa variável, o site usa o catálogo incluído no build e não expõe o proxy da API.
- Senha, `.env.local`, arquivos temporários e backup são ignorados pelo Git. A senha fica somente na memória da aba durante a sessão. **Sair** ou recarregar encerra a sessão.
- Gravação atômica, backup da versão anterior em `src/data/projects.json.bak`, validação de campos/links, limite de 100 projetos e proteção contra sobrescrita de alterações concorrentes por ETag.
- Se outro editor alterar o catálogo, use **Recarregar catálogo**, confira os dados e salve novamente. O formulário é preservado.
- Para recuperar um backup, pare o editor e copie `src/data/projects.json.bak` sobre `src/data/projects.json`; confira antes de versionar.
- Opcional: `PORTFOLIO_ADMIN_KEY` define uma senha de pelo menos 24 caracteres no ambiente do Python. Nunca use prefixo `NEXT_PUBLIC_` para a senha.

## Interface

- Next.js 16, React 19, TypeScript e Tailwind CSS 4.
- Temas claro e escuro com superfícies neutras de sistema; vermelho em ações principais. O primeiro acesso segue o sistema e o interruptor salva a escolha neste navegador.
- SF Pro nativa em plataformas Apple via `-apple-system` e `BlinkMacSystemFont`, com stacks para texto e títulos. Em Windows/Android, fontes locais equivalentes. Nenhum arquivo proprietário de fonte é redistribuído. Referências: [fontes Apple](https://developer.apple.com/fonts/) e [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines).
- Navegação translúcida ao rolar, controles de toque, busca sem distinção de acentos, filtros combináveis e diálogos nativos com Escape/restauração de foco.
- Favoritos em `localStorage`, independentes para cada navegador. Não há conta de visitante nem sincronização entre dispositivos. Se o armazenamento estiver bloqueado, a interface informa o problema.
- Contato apenas por LinkedIn e GitHub.

## Movimento e acessibilidade

Entradas escalonadas, flutuação suave da xícara e etiquetas, parallax leve, feedback de hover e pressão. O hero permite pausar o movimento. `prefers-reduced-motion` reduz os efeitos e `prefers-reduced-transparency` fornece superfícies opacas. As animações contínuas param fora da tela.

## Conteúdo e arte

- `src/data/projects.json`: catálogo publicado e editado pelo painel.
- `src/lib/portfolio.ts`: perfis públicos e equipamentos.
- `src/app/page.tsx`: apresentação, formação, reconhecimento e demais seções.
- `src/app/globals.css`: cores, tipografia, componentes e animações.
- `src/components/hero-scene.tsx`: imagem, etiquetas e controle de movimento.
- `src/components/motion.tsx`: preferências, revelações e parallax.
- `backend/server.py`: API local de edição.

A imagem `public/images/coffee-mustache-code.png` foi criada com **ImageGen integrado**, em modo **generate**, fundo transparente. Direção do prompt: fotografia/ilustração 3D de estúdio, xícara branca de espresso com bigode preto, pires prateado e teclas grafite com símbolos de código, composição minimalista em branco, preto e prata. É uma ilustração conceitual, não uma fotografia pessoal. As capas de projetos e a ilustração do setup também são representações, não capturas reais.

## Verificar

```sh
npm run lint
npm run typecheck
npm run format:check
node scripts/check-projects.mjs
python backend/test_server.py
npm run build
```

Os testes cobrem busca, filtros, favoritos inválidos, autenticação, criação, edição, remoção, validação, persistência, backup e conflitos. O teste Python usa arquivos temporários e não altera o catálogo real. Confira também temas, responsividade, navegação por teclado e movimento reduzido no navegador; SF Pro deve ser conferida em um dispositivo Apple.
