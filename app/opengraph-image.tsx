import { ImageResponse } from "next/og";
export const alt = "Kristy Kate Taylor — Full-Stack Developer, UI/UX Designer, Creative Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 72px", background: "#f4f1eb", color: "#252621", fontFamily: "sans-serif" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}><span>DESIGN & ENGINEERING</span><span>PHILIPPINES</span></div>
    <div style={{ display: "flex", flexDirection: "column", fontSize: 100, letterSpacing: "-6px", fontWeight: 600, lineHeight: 1 }}><span>Kristy Kate</span><span style={{ marginLeft: 100 }}>Taylor<span style={{ color: "#a14332" }}>.</span></span></div>
    <div style={{ display: "flex", gap: 30, borderTop: "1px solid #d3d0c8", paddingTop: 24, fontSize: 22 }}><span>Full-Stack Developer</span><span>UI/UX Designer</span><span>Creative Developer</span></div>
  </div>, size);
}
