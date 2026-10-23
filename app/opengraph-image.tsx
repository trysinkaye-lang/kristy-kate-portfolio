import { ImageResponse } from "next/og";

export const alt = "Kristy Kate Taylor — software developer portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
      justifyContent: "space-between", padding: "56px 70px",
      background: "#ffffff", color: "#171717", fontFamily: "sans-serif"
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontSize: 16, borderBottom: "1px solid #dedede", paddingBottom: 23
      }}>
        <span>KT / Portfolio</span><span>Software developer · Philippines</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 114, lineHeight: .98, fontWeight: 650, letterSpacing: "-8px" }}>Kristy Kate</span>
        <span style={{ fontSize: 114, lineHeight: .98, fontWeight: 650, letterSpacing: "-8px" }}>Taylor.</span>
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 40, paddingTop: 25, borderTop: "1px solid #dedede", fontSize: 19
      }}>
        <span>Desktop apps / Web systems / Information systems</span>
        <span>RBIM · AHDIS</span>
      </div>
    </div>, size,
  );
}
