export function ProjectArt({ id }: { id: string }) {
  if (id === "campo-minado")
    return (
      <div className="project-art mine-art" aria-hidden="true">
        <div className="grid -rotate-6 grid-cols-9 gap-1">
          {Array.from({ length: 81 }, (_, i) => (
            <span
              key={i}
              className={`grid size-5 place-items-center rounded-sm border text-[10px] font-mono ${[8, 9, 15, 16, 17, 22, 23, 24].includes(i) ? "border-transparent bg-white/[.02] text-rose" : "border-white/10 bg-white/5 text-muted"}`}
            >
              {
                (
                  {
                    8: "1",
                    9: "1",
                    15: "1",
                    16: "",
                    17: "2",
                    22: "1",
                    23: "2",
                    24: "⚑",
                  } as Record<number, string>
                )[i]
              }
            </span>
          ))}
        </div>
        <span className="art-caption">9 × 9 / PYTHON NO TERMINAL</span>
      </div>
    );
  return (
    <div className="project-art portfolio-art" aria-hidden="true">
      <div className="w-[75%] -rotate-3 rounded-md border border-white/10 bg-background p-5 shadow-2xl">
        <div className="flex justify-between border-b border-line pb-3 text-[10px]">
          <strong>
            gap<span className="text-rose">.</span>
          </strong>
          <span className="text-muted">
            sobre &nbsp; projetos &nbsp; contato
          </span>
        </div>
        <div className="flex items-center justify-between py-6">
          <p className="text-xl font-medium leading-tight tracking-[-.06em] sm:text-2xl">
            Ideias em código.
            <br />
            <em className="font-editorial text-rose">movimento.</em>
          </p>
          <span className="text-5xl font-bold tracking-[-.1em] text-rose/60">
            g.
          </span>
        </div>
        <div className="h-1 w-12 bg-accent" />
      </div>
      <span className="art-caption">UM ESPAÇO EM CONSTANTE CONSTRUÇÃO</span>
    </div>
  );
}
