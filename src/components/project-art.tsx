import { Icon } from "./icon";
export function ProjectArt({ id }: { id: string }) {
  if (id === "campo-minado")
    return (
      <div className="project-art" aria-hidden="true">
        <div className="rounded-[22px] border border-line bg-surface p-4 shadow-lg">
          <div className="mb-3 flex items-center justify-between gap-12 text-[10px] text-muted">
            <span>Campo Minado</span>
            <span>9 × 9</span>
          </div>
          <div className="grid grid-cols-9 gap-1">
            {Array.from({ length: 81 }, (_, i) => (
              <span
                key={i}
                className={`grid size-[17px] place-items-center rounded-[4px] text-[9px] font-medium ${[10, 11, 12, 19, 20, 21, 28, 29, 30, 37, 38, 39].includes(i) ? "bg-background text-foreground" : "bg-fill text-muted"}`}
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
        <span className="art-caption">Python · Lógica em cada movimento.</span>
      </div>
    );
  if (id === "portfolio")
    return (
      <div className="project-art" aria-hidden="true">
        <div className="w-[80%] max-w-[350px] overflow-hidden rounded-2xl border border-line bg-surface shadow-lg">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
            <i className="size-1.5 rounded-full bg-muted/40" />
            <i className="size-1.5 rounded-full bg-muted/30" />
            <i className="size-1.5 rounded-full bg-muted/20" />
            <span className="ml-auto text-[9px] text-muted">gapxz.dev</span>
          </div>
          <div className="px-6 py-7">
            <span className="text-[9px] text-muted">Gap / Portfólio</span>
            <p className="mt-3 text-2xl leading-tight font-semibold tracking-tight">
              Café, código
              <br />e boas ideias.
            </p>
            <div className="mt-4 flex gap-2">
              <div className="h-4 w-16 rounded-full bg-foreground" />
              <div className="h-4 w-12 rounded-full bg-fill" />
            </div>
          </div>
        </div>
        <span className="art-caption">Web · Um espaço para criar.</span>
      </div>
    );
  return (
    <div className="project-art" aria-hidden="true">
      <div className="flex size-32 items-center justify-center rounded-[30px] border border-line bg-surface shadow-lg">
        <Icon name="code" width="60" height="60" />
      </div>
      <span className="art-caption">
        Um novo projeto. Novas possibilidades.
      </span>
    </div>
  );
}
