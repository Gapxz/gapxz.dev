import { ParallaxBackdrop } from "./parallax-backdrop";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate h-[150svh]"
    >
      <div className="sticky top-0 grid h-svh place-items-center overflow-hidden px-4">
        <ParallaxBackdrop>
          <h1
            id="hero-title"
            className="font-sans text-[clamp(4.5rem,14vw,12rem)] font-extrabold leading-none tracking-[-0.08em] text-foreground"
          >
            Gap
          </h1>
        </ParallaxBackdrop>
      </div>
    </section>
  );
}
