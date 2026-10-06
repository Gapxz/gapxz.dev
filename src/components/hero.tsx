import { Icon } from "./icon";
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-20"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="site-container relative grid min-h-[730px] items-center gap-8 py-16 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div className="relative z-10">
          <p className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[.17em] text-muted">
            <span className="h-px w-7 bg-rose" />
            Gustavo Souza Schroder <span className="text-rose">/</span> Gap
          </p>
          <h1
            id="hero-title"
            className="max-w-3xl text-[clamp(3.1rem,5.5vw,5.3rem)] leading-[1.08] font-medium tracking-[-.065em]"
          >
            Ideias em código.
            <br />
            Curiosidade em
            <br />
            <span className="font-editorial italic font-normal tracking-[-.06em] text-rose">
              movimento.
            </span>
          </h1>
          <p className="mt-7 max-w-md text-sm leading-7 text-muted">
            Estudante de ADS e desenvolvedor em formação.
            <br className="hidden sm:block" /> Entre Python, interfaces e
            automações, aprendo construindo coisas que fazem parte da vida real.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#projetos" className="button-primary">
              Explorar projetos <Icon name="arrow" width="16" height="16" />
            </a>
            <a href="#sobre" className="button-secondary">
              Um pouco sobre mim <Icon name="down" width="16" height="16" />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-2 text-[11px] text-muted">
            <span className="status-dot" />
            Aberto a oportunidades de estágio
          </div>
        </div>
        <div
          className="hero-art relative mx-auto aspect-square w-full max-w-[480px]"
          aria-hidden="true"
          data-parallax
        >
          <div className="absolute inset-6 rounded-full border border-white/8" />
          <div className="absolute inset-16 rounded-full border border-dashed border-white/10" />
          <div className="hero-orbit absolute inset-0 rounded-full border border-white/5">
            <span className="absolute left-1/2 -top-1 size-2 rounded-full bg-rose" />
          </div>
          <div className="hero-sculpture absolute inset-[18%] grid place-items-center rounded-[30%] border border-[#a55063]/30 bg-accent">
            <span className="relative -top-3 -left-2 text-[clamp(8rem,18vw,14rem)] font-semibold leading-none tracking-[-.12em] text-[#eadbd6]">
              g<span className="text-[#be7f8a]">.</span>
            </span>
          </div>
          <span className="art-label absolute left-0 top-[20%]">
            <span className="mr-2 text-rose">&lt;/&gt;</span> construindo ideias
          </span>
          <span className="art-label absolute right-0 bottom-[19%]">
            <span className="status-dot mr-2" />
            aprendizado contínuo
          </span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[.25em] text-muted">
            Python · Web · Automação
          </span>
          <span className="absolute right-2 top-8 font-mono text-xl text-rose/60">
            +
          </span>
          <span className="absolute left-10 bottom-10 font-mono text-xl text-rose/60">
            +
          </span>
        </div>
      </div>
      <div className="site-container flex items-center justify-between border-t border-line py-6 font-mono text-[10px] text-muted">
        <span>
          PELOTAS, RS <span className="mx-2 text-rose">↗</span> BRASIL
        </span>
        <a href="#sobre" className="flex items-center gap-3">
          Conheça a jornada <Icon name="down" width="14" height="14" />
        </a>
        <span className="hidden sm:block">PORTFÓLIO / 2026</span>
      </div>
    </section>
  );
}
