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
      className="relative isolate overflow-hidden pt-20"
    >
      <div className="site-container grid items-center gap-8 pb-16 pt-14 sm:pt-16 lg:min-h-[680px] lg:grid-cols-[1.15fr_1fr] lg:gap-5 lg:py-20">
        <div className="relative z-10">
          <p className="hero-entrance eyebrow !mb-7" style={entrance(60)}>
            Gustavo Souza Schroder <span className="mx-2">/</span> Portfólio
          </p>
          <h1
            id="hero-title"
            className="hero-title hero-entrance"
            style={entrance(150)}
          >
            <span>Café, código</span>
            <span>e boas ideias.</span>
            <span className="accent-text">Meus projetos.</span>
          </h1>
          <p
            className="hero-entrance mt-6 max-w-[440px] text-[17px] leading-[1.65] text-muted"
            style={entrance(260)}
          >
            Um lugar para reunir o que construo, compartilhar o que aprendo e
            dar vida à próxima ideia. Python, web e desenvolvimento na prática.
          </p>
          <div
            className="hero-entrance mt-8 flex flex-wrap gap-3"
            style={entrance(370)}
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
            style={entrance(480)}
          >
            <span className="status-dot" />
            Estudante de ADS · Aberto a estágio
          </p>
        </div>
        <div
          className="hero-entrance mx-auto w-full max-w-[360px] lg:max-w-[480px]"
          style={entrance(220)}
        >
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
