import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://gapxz.dev"),
  title: "Gap | Portfólio",
  description:
    "Gap, estudante de ADS no Senac RS. Projetos em Python, desenvolvimento web e uma jornada de aprendizado na prática.",
  openGraph: {
    title: "Gap — Ideias em código",
    description:
      "O portfólio de Gap. Python, desenvolvimento web e aprendizado na prática.",
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
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("gap-theme");document.documentElement.dataset.theme=t==="light"||t==="dark"?t:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch(e){document.documentElement.dataset.theme=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}})();`,
          }}
        />
      </head>
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
