import type { CSSProperties } from "react";
import { Icon } from "./icon";
import { HeroScene } from "./hero-scene";
const entrance = (delay: number) =>
  ({ "--enter-delay": `${delay}ms` }) as CSSProperties;
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="hero relative isolate overflow-hidden pt-20"
    >
      <div className="site-container grid items-center gap-8 pb-16 pt-16 sm:pt-20 lg:min-h-[740px] lg:grid-cols-[1.16fr_1fr] lg:gap-3 lg:py-24">
        <div className="relative z-10">
          <div
            className="hero-entrance mb-8 flex items-center gap-3"
            style={entrance(80)}
          >
            <span className="grid size-9 place-items-center rounded-full border border-rose/15 bg-accent/40 text-sm font-semibold text-rose">
              G
            </span>
            <p className="text-sm font-medium text-muted">
              Gustavo Souza Schroder
            </p>
          </div>
          <h1
            id="hero-title"
            className="hero-title hero-entrance"
            style={entrance(160)}
          >
            <span>Ideias em código.</span>
            <span>Curiosidade em</span>
            <span className="accent-text">movimento.</span>
          </h1>
          <p
            className="hero-entrance mt-7 max-w-[450px] text-[17px] leading-[1.6] text-muted sm:text-lg"
            style={entrance(280)}
          >
            Desenvolvedor em formação. Aprendo criando
            <br className="hidden xl:block" /> com Python, interfaces e uma boa
            dose de curiosidade.
          </p>
          <div
            className="hero-entrance mt-8 flex flex-wrap gap-3"
            style={entrance(400)}
          >
            <a href="#projetos" className="button-primary soft-press">
              Explorar projetos <Icon name="arrow" width="16" height="16" />
            </a>
            <a href="#sobre" className="button-secondary soft-press">
              Um pouco sobre mim <Icon name="down" width="16" height="16" />
            </a>
          </div>
          <p
            className="hero-entrance mt-7 flex items-center gap-2 text-xs text-muted"
            style={entrance(520)}
          >
            <span className="status-dot" />
            Aberto a oportunidades de estágio
          </p>
        </div>
        <div
          className="hero-entrance mx-auto w-full max-w-[420px] lg:max-w-[510px]"
          style={entrance(240)}
        >
          <HeroScene />
        </div>
      </div>
      <div className="site-container">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-xs text-muted">
          <p>Baseado em Pelotas, RS</p>
          <p className="hidden sm:block">
            Estudando ADS. Construindo o próximo passo.
          </p>
          <a
            href="#sobre"
            className="soft-press flex min-h-11 items-center gap-2 rounded-full px-3"
          >
            Continue explorando <Icon name="down" width="14" height="14" />
          </a>
        </div>
      </div>
    </section>
  );
}
