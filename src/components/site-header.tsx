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
      <div className="mx-auto flex h-16 max-w-6xl items-center px-3 sm:px-6 lg:px-8">
        <nav aria-label="Navegação principal" className="w-full">
          <ul className="flex items-center justify-center gap-3 whitespace-nowrap sm:gap-6 md:gap-8">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-sm text-xs text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:text-sm"
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
