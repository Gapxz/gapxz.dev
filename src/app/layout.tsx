import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://gapxz.dev"),
  title: "Gap — Gustavo Souza Schroder | Portfólio",
  description:
    "Gustavo Souza Schroder, estudante de ADS no Senac RS. Projetos em Python, desenvolvimento web e uma jornada de aprendizado na prática.",
  openGraph: {
    title: "Gap — Ideias em código",
    description:
      "O portfólio de Gustavo Souza Schroder. Python, desenvolvimento web e aprendizado na prática.",
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background font-sans font-normal text-foreground antialiased">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <SiteHeader />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
