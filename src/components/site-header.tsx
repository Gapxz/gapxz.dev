const navigationItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Jornada", href: "#jornada" },
  { label: "Projetos", href: "#projetos" },
  { label: "Setup", href: "#setup" },
  { label: "Contato", href: "#contato" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-6xl items-center px-3 sm:px-6 lg:px-8">
        <nav aria-label="Navegação principal" className="w-full">
          <ul className="flex items-center justify-center gap-3 whitespace-nowrap sm:gap-8 md:gap-10">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative isolate rounded-sm text-[0.9375rem] font-medium text-foreground/70 transition-colors before:pointer-events-none before:absolute before:inset-[-0.45rem] before:-z-10 before:rounded-full before:bg-accent before:opacity-0 before:blur-md before:transition-opacity before:duration-300 hover:text-foreground hover:before:opacity-80 focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground focus-visible:before:opacity-80 active:before:opacity-80 motion-reduce:before:transition-none sm:text-[1.0625rem]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
