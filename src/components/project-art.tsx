export function ProjectArt({ id }: { id: string }) {
  if (id === "campo-minado")
    return (
      <div className="project-art mine-art" aria-hidden="true">
        <div className="rounded-[22px] border border-white/10 bg-[#211b23]/70 p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between text-[10px] text-muted">
            <span>Campo Minado</span>
            <span className="text-rose">9 × 9</span>
          </div>
          <div className="grid grid-cols-9 gap-1">
            {Array.from({ length: 81 }, (_, i) => (
              <span
                key={i}
                className={`grid size-[17px] place-items-center rounded-[4px] text-[9px] font-medium ${[10, 11, 12, 19, 20, 21, 28, 29, 30, 37, 38, 39].includes(i) ? "bg-white/[.025] text-rose" : "bg-white/[.09] text-muted"}`}
              >
                {
                  (
                    {
                      10: "1",
                      11: "1",
                      12: "2",
                      19: "1",
                      21: "2",
                      28: "1",
                      29: "2",
                      30: "⚑",
                    } as Record<number, string>
                  )[i]
                }
              </span>
            ))}
          </div>
        </div>
        <span className="art-caption">Lógica em cada movimento.</span>
      </div>
    );
  return (
    <div className="project-art portfolio-art" aria-hidden="true">
      <div className="w-[82%] max-w-[390px] overflow-hidden rounded-[16px] border border-white/10 bg-[#0e0b10] shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <i className="size-1.5 rounded-full bg-white/20" />
          <i className="size-1.5 rounded-full bg-white/15" />
          <i className="size-1.5 rounded-full bg-white/10" />
          <span className="ml-auto text-[9px] text-muted">gapxz.dev</span>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-8 sm:px-6">
          <div>
            <p className="mb-3 text-[9px] text-muted">Gustavo Souza Schroder</p>
            <p className="text-[17px] sm:text-xl leading-[1.12] font-semibold tracking-[-.04em]">
              Ideias em código.
              <br />
              Curiosidade em
              <br />
              <span className="text-rose">movimento.</span>
            </p>
            <div className="mt-4 h-4 w-20 rounded-full bg-rose/70" />
          </div>
          <div className="relative grid size-16 shrink-0 sm:size-20 place-items-center rounded-full border border-rose/15">
            <div className="grid size-12 place-items-center sm:size-14 rounded-full border border-rose/20 bg-accent/60 text-3xl font-semibold tracking-[-.08em] text-[#f1dce3]">
              g.
            </div>
          </div>
        </div>
      </div>
      <span className="art-caption">Um espaço para o próximo passo.</span>
    </div>
  );
}
