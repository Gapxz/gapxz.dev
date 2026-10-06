import { Hero } from "@/components/hero";
import { Icon } from "@/components/icon";
import { Projects } from "@/components/projects";
import { SetupArt } from "@/components/setup-art";
import { profile, setup } from "@/lib/portfolio";

const technologies = [
  "Python",
  "HTML & CSS",
  "Tailwind CSS",
  "TypeScript",
  "React",
  "Git & GitHub",
  "SQLite",
];
export default function Home() {
  return (
    <>
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <section
          id="projetos"
          className="section-space"
          aria-label="Projetos selecionados"
        >
          <div className="site-container" data-reveal>
            <Projects />
          </div>
        </section>
        <section
          id="sobre"
          className="section-space"
          aria-labelledby="about-title"
        >
          <div className="site-container">
            <div className="mb-10 max-w-2xl" data-reveal>
              <p className="eyebrow">Um pouco sobre mim</p>
              <h2 id="about-title" className="section-title">
                A curiosidade é o ponto de partida.
              </h2>
              <p className="section-description">
                Prazer, Gustavo. Na internet, Gap. Gosto de entender como as
                coisas funcionam — e de descobrir construindo.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
              <article className="surface p-7 sm:p-10" data-reveal>
                <span className="mb-7 grid size-12 place-items-center rounded-2xl bg-fill text-foreground">
                  <Icon name="code" width="24" height="24" />
                </span>
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Aprendizado que vira prática.
                </h3>
                <p className="mt-4 text-base leading-7 text-muted">
                  Estou concluindo o terceiro semestre de Análise e
                  Desenvolvimento de Sistemas no Senac RS. Conecto o que aprendo
                  na faculdade com projetos em Python e desenvolvimento web.
                </p>
                <p className="mt-4 text-base leading-7 text-muted">
                  Entre lógica, interfaces e resolução de problemas, busco uma
                  oportunidade de estágio para aprender em equipe e contribuir
                  com projetos reais.
                </p>
                <div className="mt-7 flex items-center gap-2 border-t border-line pt-6 text-sm text-foreground">
                  <span className="status-dot" />
                  ADS · Senac RS · 3º semestre
                </div>
              </article>
              <div className="grid gap-5">
                <article className="surface p-7 sm:p-8" data-reveal>
                  <p className="mb-5 text-sm font-semibold text-foreground">
                    Na minha caixa de ferramentas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span key={tech} className="tag !px-4 !py-2.5 !text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
                <article className="surface p-7 sm:p-8" data-reveal>
                  <p className="mb-3 text-sm font-semibold">Além do código</p>
                  <p className="text-base leading-7 text-muted">
                    Jogos, música e um setup do meu jeito. Espaço para desligar
                    um pouco — e encontrar a próxima ideia.
                  </p>
                  <a
                    href="#setup"
                    className="soft-press mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-medium text-foreground"
                  >
                    Conheça meu espaço{" "}
                    <Icon name="arrow" width="15" height="15" />
                  </a>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section
          id="jornada"
          className="section-space"
          aria-labelledby="journey-title"
        >
          <div className="site-container">
            <div className="mb-10 max-w-2xl" data-reveal>
              <p className="eyebrow">Minha jornada</p>
              <h2 id="journey-title" className="section-title">
                Cada passo conta.
              </h2>
              <p className="section-description">
                A base vem dos estudos. A experiência, de colocar as ideias em
                movimento.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <article className="surface p-7 sm:p-8" data-reveal>
                <span className="mb-7 grid size-12 place-items-center rounded-2xl bg-fill text-muted">
                  <Icon name="code" width="24" height="24" />
                </span>
                <p className="mb-3 text-xs font-medium text-muted">
                  Agora · Formação
                </p>
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">
                  Análise e Desenvolvimento de Sistemas
                </h3>
                <p className="mt-4 text-[15px] leading-6 text-muted">
                  Senac RS, terceiro semestre em conclusão. Lógica, estruturas
                  de dados, redes e desenvolvimento de software.
                </p>
              </article>
              <article className="surface  p-7 sm:p-8" data-reveal>
                <span className="mb-7 grid size-12 place-items-center rounded-2xl bg-fill text-foreground">
                  <Icon name="trophy" width="24" height="24" />
                </span>
                <p className="mb-3 text-xs font-medium text-foreground">
                  20 de junho de 2026
                </p>
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Code League 2026
                </h3>
                <p className="mt-2 text-sm font-medium text-foreground">
                  Indicação Atlas Technologies
                </p>
                <p className="mt-4 text-[15px] leading-6 text-muted">
                  Reconhecimento da nossa equipe no hackathon de soluções para a
                  saúde. Colaboração, ideias e uma solução apresentada aos
                  avaliadores.
                </p>
              </article>
              <article className="surface p-7 sm:p-8" data-reveal>
                <span className="mb-7 grid size-12 place-items-center rounded-2xl bg-fill text-muted">
                  <Icon name="arrow" width="24" height="24" />
                </span>
                <p className="mb-3 text-xs font-medium text-muted">
                  Sempre · Na prática
                </p>
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Do exercício ao projeto.
                </h3>
                <p className="mt-4 text-[15px] leading-6 text-muted">
                  Um Campo Minado para explorar matrizes em Python. Um portfólio
                  para experimentar interfaces. Novas possibilidades de
                  aprender.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section
          id="setup"
          className="section-space"
          aria-labelledby="setup-title"
        >
          <div className="site-container">
            <div
              className="mb-10 flex flex-wrap items-end justify-between gap-5"
              data-reveal
            >
              <div>
                <p className="eyebrow">Meu espaço</p>
                <h2 id="setup-title" className="section-title">
                  Pensado para criar.
                  <br />
                  <span className="text-muted">E aproveitar o caminho.</span>
                </h2>
              </div>
              <p className="max-w-xs text-base leading-7 text-muted">
                Entre uma aula, algumas linhas de código e uma partida no fim do
                dia.
              </p>
            </div>
            <div className="surface overflow-hidden" data-reveal>
              <div className="setup-stage relative px-0 pb-4 pt-6 sm:px-12">
                <SetupArt />
                <p className="absolute bottom-5 right-6 text-[11px] text-muted">
                  Ilustração do setup
                </p>
              </div>
              <div className="grid px-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
                {setup.map((item) => (
                  <div
                    key={item.type}
                    className="flex items-start gap-4 border-t border-line py-7 sm:pr-5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-fill text-foreground">
                      <Icon name={item.icon} />
                    </span>
                    <div>
                      <p className="mb-1 text-xs text-muted">{item.type}</p>
                      <h3 className="text-[15px] font-medium">{item.name}</h3>
                      <p className="mt-1 text-xs leading-5 text-muted">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="contato"
          className="section-space"
          aria-labelledby="contact-title"
        >
          <div className="site-container">
            <div
              className="contact-panel surface p-7 sm:p-12 lg:p-16"
              data-reveal
            >
              <div className="mx-auto max-w-2xl text-center">
                <p className="eyebrow">Vamos conversar</p>
                <h2 id="contact-title" className="section-title">
                  Seu próximo projeto.
                  <br />
                  Nossa próxima conversa.
                </h2>
                <p className="section-description mx-auto">
                  Uma oportunidade, uma ideia ou só um olá.
                  <br className="hidden sm:block" /> Estou por aqui.
                </p>
              </div>
              <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
                <a
                  className="contact-link soft-press"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <p className="text-lg font-semibold">LinkedIn</p>
                    <p className="mt-1 text-sm text-muted">
                      Vamos nos conectar
                    </p>
                  </div>
                  <Icon name="arrow" />
                </a>
                <a
                  className="contact-link soft-press"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <p className="text-lg font-semibold">GitHub</p>
                    <p className="mt-1 text-sm text-muted">
                      Acompanhe o código · Gapxz
                    </p>
                  </div>
                  <Icon name="arrow" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-container">
        <div className="flex justify-end">
          <a
            href="/admin"
            className="flex min-h-11 items-center text-xs text-muted"
          >
            Gerenciar projetos
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-line py-7">
          <a
            href="#inicio"
            aria-label="Voltar ao início"
            className="flex min-h-11 items-center text-2xl font-semibold tracking-[-.06em]"
          >
            gap<span className="text-foreground">.</span>
          </a>
          <p className="text-xs text-muted">
            © 2026 Gustavo Souza Schroder · Portfólio
          </p>
          <a
            href="#inicio"
            className="soft-press flex min-h-11 items-center gap-2 rounded-full px-3 text-xs text-muted"
          >
            De volta ao topo <Icon name="arrow" width="14" height="14" />
          </a>
        </div>
      </footer>
    </>
  );
}
