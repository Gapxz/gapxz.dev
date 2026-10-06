import { Hero } from "@/components/hero";
import { Icon } from "@/components/icon";
import { Motion } from "@/components/motion";
import { Projects } from "@/components/projects";
import { SetupArt } from "@/components/setup-art";
import { profile, setup } from "@/lib/portfolio";

export default function Home() {
  return (
    <>
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <section
          id="sobre"
          className="section-space border-t border-line"
          aria-labelledby="about-title"
        >
          <div
            className="site-container grid gap-12 lg:grid-cols-[.9fr_1.1fr]"
            data-reveal
          >
            <div>
              <p className="eyebrow">01 / Por trás do código</p>
              <h2 id="about-title" className="section-title">
                Prazer, Gustavo.
                <br />
                Na internet,{" "}
                <span className="font-editorial italic text-rose">Gap.</span>
              </h2>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-line px-4 py-2.5 font-mono text-[10px] text-muted">
                <Icon name="code" width="16" height="16" /> ADS · Senac RS · 3º
                semestre
              </div>
            </div>
            <div>
              <p className="text-lg leading-8 tracking-[-.025em] text-foreground/90">
                Gosto de entender como as coisas funcionam.
                <br className="hidden sm:block" /> E gosto ainda mais de
                descobrir construindo.
              </p>
              <p className="mt-5 text-sm leading-7 text-muted">
                Estou concluindo o terceiro semestre de Análise e
                Desenvolvimento de Sistemas no Senac RS. Meu foco está em
                transformar o que aprendo em projetos práticos, conectando
                lógica de programação, interfaces e resolução de problemas.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">
                Hoje, Python e desenvolvimento web têm espaço especial nos meus
                estudos. Fora do código, jogos, música e meu setup também fazem
                parte da rotina. Procuro uma oportunidade de estágio para
                aprender em equipe e contribuir com projetos reais.
              </p>
              <div className="mt-8 border-t border-line pt-6">
                <p className="mb-4 font-mono text-[9px] uppercase tracking-[.16em] text-muted">
                  Tecnologias que fazem parte da jornada
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "HTML & CSS",
                    "Tailwind CSS",
                    "TypeScript",
                    "React",
                    "Git & GitHub",
                    "SQLite",
                  ].map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="projetos"
          className="section-space border-t border-line bg-surface/30"
          aria-label="Projetos selecionados"
        >
          <div className="site-container" data-reveal>
            <Projects />
          </div>
        </section>
        <section
          id="jornada"
          className="section-space border-t border-line"
          aria-labelledby="journey-title"
        >
          <div
            className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]"
            data-reveal
          >
            <div>
              <p className="eyebrow">03 / Um passo de cada vez</p>
              <h2 id="journey-title" className="section-title">
                Uma jornada
                <br />
                em{" "}
                <span className="font-editorial italic text-rose">
                  construção.
                </span>
              </h2>
              <p className="mt-5 max-w-xs text-sm leading-7 text-muted">
                A faculdade traz a base. A prática abre novas perguntas. Cada
                experiência entra no próximo projeto.
              </p>
            </div>
            <div className="relative space-y-9 border-l border-line pl-8 sm:pl-10">
              <article className="timeline-item">
                <p className="eyebrow !mb-3">Agora / Formação</p>
                <h3 className="text-lg tracking-[-.035em]">
                  Análise e Desenvolvimento de Sistemas
                </h3>
                <p className="mt-1 text-xs text-rose">
                  Senac RS · 3º semestre em conclusão
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Lógica, estruturas de dados, redes e desenvolvimento de
                  software. Aprendizados que levo do estudo para os meus
                  projetos.
                </p>
              </article>
              <article className="timeline-item rounded-xl border border-rose/20 bg-accent/15 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[.15em] text-rose">
                    20 jun. 2026 / Reconhecimento
                  </p>
                  <Icon name="trophy" className="text-rose" />
                </div>
                <h3 className="text-xl tracking-[-.04em]">
                  Code League <span className="text-rose">2026</span>
                </h3>
                <p className="mt-2 text-sm">Indicação Atlas Technologies</p>
                <p className="mt-3 text-xs leading-6 text-muted">
                  Nossa equipe recebeu a Indicação Atlas no hackathon de
                  soluções para a área da saúde. Uma experiência de colaboração,
                  construção de ideias e apresentação de uma solução aos
                  avaliadores.
                </p>
              </article>
              <article className="timeline-item">
                <p className="eyebrow !mb-3">
                  Na prática / Aprendizado contínuo
                </p>
                <h3 className="text-lg tracking-[-.035em]">
                  Do exercício ao projeto
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Um Campo Minado para explorar matrizes em Python. Um portfólio
                  para experimentar interfaces. Pequenos projetos, novas
                  possibilidades de aprender.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section
          id="setup"
          className="section-space border-t border-line bg-surface/30"
          aria-labelledby="setup-title"
        >
          <div className="site-container" data-reveal>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="eyebrow">04 / Meu espaço</p>
                <h2 id="setup-title" className="section-title">
                  Onde as ideias{" "}
                  <span className="font-editorial italic text-rose">
                    acontecem.
                  </span>
                </h2>
              </div>
              <p className="max-w-xs text-xs leading-6 text-muted">
                Entre uma aula, algumas linhas de código
                <br className="hidden sm:block" /> e uma partida no fim do dia.
              </p>
            </div>
            <div className="relative my-9 overflow-hidden rounded-xl border border-line bg-background">
              <div className="absolute left-6 top-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.16em] text-muted">
                <span className="status-dot" />
                Meu setup
              </div>
              <SetupArt />
              <p className="absolute bottom-4 right-5 font-mono text-[8px] uppercase tracking-widest text-muted">
                Ilustração do espaço
              </p>
            </div>
            <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {setup.map((item) => (
                <div
                  key={item.type}
                  className="flex items-start gap-4 border-b border-line py-6"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line text-rose">
                    <Icon name={item.icon} />
                  </span>
                  <div>
                    <p className="mb-1 font-mono text-[9px] uppercase tracking-[.15em] text-muted">
                      {item.type}
                    </p>
                    <h3 className="text-sm">{item.name}</h3>
                    <p className="mt-1.5 text-[11px] text-muted">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="contato"
          className="relative overflow-hidden border-t border-line py-24 sm:py-32"
          aria-labelledby="contact-title"
        >
          <div className="contact-glow pointer-events-none absolute inset-0" />
          <div className="site-container relative" data-reveal>
            <p className="eyebrow">05 / A próxima conversa</p>
            <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <h2
                  id="contact-title"
                  className="text-5xl leading-[1.12] font-medium tracking-[-.06em] sm:text-6xl"
                >
                  Boas ideias começam
                  <br />
                  com um{" "}
                  <span className="font-editorial italic text-rose">olá.</span>
                </h2>
                <p className="mt-6 max-w-md text-sm leading-7 text-muted">
                  Uma oportunidade, um projeto ou uma troca de ideias?
                  <br />
                  Vamos nos conectar.
                </p>
              </div>
              <div className="space-y-3">
                <a
                  className="contact-link"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    <span className="mb-1 block font-mono text-[9px] uppercase tracking-[.12em] text-muted">
                      Vamos conversar
                    </span>
                    LinkedIn
                  </span>
                  <Icon name="arrow" />
                </a>
                <a
                  className="contact-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    <span className="mb-1 block font-mono text-[9px] uppercase tracking-[.12em] text-muted">
                      Acompanhe o código
                    </span>
                    GitHub{" "}
                    <span className="ml-1 text-xs text-muted">/ Gapxz</span>
                  </span>
                  <Icon name="arrow" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-line">
        <div className="site-container flex flex-wrap items-center justify-between gap-5 py-8">
          <a
            href="#inicio"
            aria-label="Voltar ao início"
            className="text-xl font-semibold tracking-[-.07em]"
          >
            gap<span className="text-rose">.</span>
          </a>
          <p className="text-[10px] text-muted">
            © 2026 Gustavo Souza Schroder · Feito com curiosidade.
          </p>
          <a
            href="#inicio"
            className="flex items-center gap-2 text-[10px] text-muted"
          >
            De volta ao topo <Icon name="arrow" width="13" height="13" />
          </a>
        </div>
      </footer>
      <Motion />
    </>
  );
}
