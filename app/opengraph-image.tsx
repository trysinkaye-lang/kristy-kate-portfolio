import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          background: "linear-gradient(145deg, #120f16 0%, #211722 55%, #120f16 100%)",
          color: "#f8f1f5",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 24, letterSpacing: "0.16em", textTransform: "uppercase", color: "#c9a8bb" }}>Portfolio</div>
          <div style={{ fontSize: 22, color: "#a99aa5" }}>{site.location}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 66, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 38, color: "#d8b5ca", fontStyle: "italic" }}>{site.title}</div>
          <div style={{ maxWidth: 940, fontSize: 27, lineHeight: 1.45, color: "#c2b4be" }}>{site.headline}</div>
        </div>

        <div style={{ display: "flex", gap: 18, fontSize: 20, color: "#938590" }}>
          <span>Information Systems</span><span>•</span><span>Web Applications</span><span>•</span><span>Offline-first Software</span>
        </div>
      </div>
    ),
    size,
  );
}
