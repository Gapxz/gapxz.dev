import { ImageResponse } from "next/og";

export const alt =
  "Gap — Gustavo Souza Schroder. Ideias em código, curiosidade em movimento.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px 80px",
        background: "#09080b",
        color: "#f5f5f7",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#e5a6b4",
        }}
      >
        <span>gap.</span>
        <span>Gustavo Souza Schroder</span>
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
            lineHeight: 1.15,
          }}
        >
          <span>Ideias em código.</span>
          <span>Curiosidade em</span>
          <span style={{ color: "#e5a6b4" }}>movimento.</span>
        </div>
        <div
          style={{
            display: "flex",
            width: 245,
            height: 245,
            background: "#49111c",
            borderRadius: 140,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 180,
            letterSpacing: -15,
            border: "1px solid #e5a6b440",
          }}
        >
          g.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #39282c",
          paddingTop: 25,
          fontSize: 20,
          color: "#a5a3ad",
        }}
      >
        <span>Python · Desenvolvimento web · ADS</span>
        <span>gapxz.dev</span>
      </div>
    </div>,
    size,
  );
}
