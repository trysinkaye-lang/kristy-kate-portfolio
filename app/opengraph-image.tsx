import { ImageResponse } from "next/og";

export const alt = "Kristy Kate Taylor — Full-Stack Software Developer";
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
        padding: "60px 72px",
        background: "#ffffff",
        color: "#171717",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #dddddd",
          paddingBottom: 25,
          fontSize: 18,
          letterSpacing: "1px",
        }}
      >
        <span>KRISTY KATE TAYLOR</span>
        <span>PORTFOLIO / 2026</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 108, fontWeight: 700, letterSpacing: "-7px", lineHeight: 1.05 }}>Software.</span>
        <span style={{ fontSize: 108, fontWeight: 450, letterSpacing: "-7px", lineHeight: 1.05, color: "#777777" }}>Designed well.</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #dddddd",
          paddingTop: 23,
          fontSize: 19,
        }}
      >
        <span>Full-stack development · Information systems · UI/UX</span>
        <span>PHILIPPINES</span>
      </div>
    </div>,
    size,
  );
}
