import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Gap — Café, código e boas ideias. Meu portfólio de projetos.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const asset = await readFile(
    join(process.cwd(), "public/images/coffee-mustache-code.png"),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "55px 65px",
        background: "#f2f2f7",
        color: "#1c1c1e",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span style={{ fontWeight: 700 }}>Gap / Portfólio</span>
        <span>Gap</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 68,
            letterSpacing: -3,
            lineHeight: 1.12,
          }}
        >
          <span>Café, código</span>
          <span>e boas ideias.</span>
          <span style={{ color: "#636366" }}>Meus projetos.</span>
        </div>
        {/* ImageResponse needs an embedded image rather than next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${asset.toString("base64")}`}
          width={400}
          height={400}
          alt=""
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #d1d1d6",
          paddingTop: 22,
          fontSize: 20,
          color: "#636366",
        }}
      >
        <span>Python · Desenvolvimento web · ADS</span>
        <span>gapxz.dev</span>
      </div>
    </div>,
    size,
  );
}
