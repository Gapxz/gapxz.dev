# Gap — portfólio

Uma página em HTML, Tailwind CSS e JavaScript puro. O Vite serve a prévia e gera os arquivos estáticos; não há back-end.

## Executar

Requer Node.js 22.12+ e npm.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. Para conferir a produção, encerre a prévia anterior e execute:

```sh
npm run build
npm run preview
```

Publique a pasta `dist/` em uma hospedagem estática. Comando de build: `npm run build`; diretório de saída: `dist`. Ao atualizar uma hospedagem que usava Next.js, selecione o preset Vite ou site estático e remova a configuração da antiga API.

## Adicionar um projeto

1. Abra `index.html` e procure o comentário `NOVO PROJETO`.
2. Duplique um bloco inteiro `<a class="project-card ...">...</a>`.
3. Troque o `href` pelo endereço do repositório **público**, o título, a descrição e as tecnologias.
4. Use IDs únicos no título/descrição e atualize `aria-labelledby`/`aria-describedby` do link. Preserve `project-link-hint`.
5. Confira no celular e execute `npm run build`. Faça commit e push para publicar pela hospedagem configurada.

Os cards atuais apontam para `gapxz.dev` e `engenharia-software-2`. O conteúdo é manual, sem consultas à API do GitHub no navegador.

## Onde editar

- `index.html`: apresentação, projetos, contatos e aplicação inicial do tema.
- `src/styles.css`: Tailwind, cores dos temas, tipografia e pequenos efeitos.
- `src/main.js`: tema, menu mobile, seção ativa e cópia do Discord.
- `public/`: imagens e favicon. Estes arquivos são copiados para `dist/`.

O tema segue o sistema até a primeira escolha e salva a preferência quando possível. O Discord permanece visível para cópia manual se o navegador bloquear a área de transferência. Os links do conteúdo continuam disponíveis sem JavaScript.

A navbar usa uma interpretação em CSS de [Liquid Glass](https://developer.apple.com/design/human-interface-guidelines/materials), com desfoque, bordas reflexivas e um brilho que acompanha o cursor. Com redução de transparência no sistema ou sem suporte a desfoque, usa um acabamento opaco com profundidade. A redução de movimento desativa o brilho móvel; o modo de alto contraste prioriza superfícies sólidas.

Fontes nativas de sistema, incluindo San Francisco em dispositivos Apple. A imagem de café é uma ilustração conceitual gerada com IA na versão anterior, não uma foto pessoal. Reutilizada de `public/images/coffee-mustache-code.png`.

## Revisar

```sh
npm run format:check
node --check src/main.js
npm run build
```

Confira também temas, menu (Enter/Escape), âncoras, links externos e cópia do Discord, com largura de 320 px e desktop. As animações respeitam `prefers-reduced-motion`.

A versão anterior está preservada na tag `archive/before-static-2026-10-14`.

## Abrir no Windows

Abra a pasta `gapxz.dev` no Explorador de Arquivos, digite `cmd` na barra de endereço e pressione Enter. No terminal, execute:

```bat
npm run dev
```

Na primeira execução após baixar o projeto, rode `npm ci` antes. Abra o endereço mostrado pelo Vite (normalmente http://localhost:3000) no Chrome, Edge ou outro navegador. No terminal do VS Code, Ctrl + clique costuma abrir o link; no CMD, copie e cole o endereço no navegador.

Mantenha o terminal aberto enquanto usa a prévia. Para encerrar, pressione Ctrl + C. Se a porta 3000 já estiver ocupada, o Vite escolhe a próxima disponível (por exemplo, 3001). Abra sempre o endereço exibido no terminal. Isso também vale para `npm run preview`. Não é necessário abrir `index.html` diretamente.

## Ícones das redes

Os PNGs ficam em `public/images/social/` e são servidos localmente:

- GitHub e LinkedIn: cópias dos PNGs já presentes na pasta do usuário; os originais foram preservados.
- Discord: símbolo preto do [kit oficial](https://discord.com/branding).
- Instagram: versão PNG transparente do [símbolo no Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Instagram_simple_icon.svg).

Os símbolos monocromáticos de GitHub, Instagram e Discord ficam claros no tema escuro via CSS. O LinkedIn mantém sua cor. As marcas identificam os respectivos perfis, sem indicar vínculo com as plataformas.
