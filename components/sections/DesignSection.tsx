"use client";
import { useMemo, useState } from "react";
import DepthCarousel from "@/components/react-bits/DepthCarousel";
import { designs } from "@/data/designs";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function DesignSection(){
 const [active,setActive]=useState(0);
 const items=useMemo(()=>designs.map(d=>({image:d.image,alt:`${d.title} placeholder`})),[]);
 return <section id="designs" className="section-wrap"><SectionTitle eyebrow="Design & creative work" title="Visual thinking beyond development" copy="Digital designs focused on clear communication, visual storytelling, and usable interface systems."/><div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr]"><div className="h-[520px] min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.02]"><DepthCarousel items={items} cardWidth={300} cardHeight={390} depth={190} spread={80} tilt={18} perspective={1300} visibleCards={4} falloff={0.16} blur={3} loop showControls showIndicators onChange={(i:any)=>setActive(i)}/></div><div className="glass-card p-7"><p className="eyebrow">{designs[active].category}</p><h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">{designs[active].title}</h3><p className="mt-5 leading-7 text-slate-300">{designs[active].note}</p><div className="mt-6 space-y-3 text-sm"><p><b className="text-slate-100">Problem</b><br/><span className="text-slate-400">Add the real communication or usability problem.</span></p><p><b className="text-slate-100">Design goal</b><br/><span className="text-slate-400">Explain what the interface or visual needed to improve.</span></p><p><b className="text-slate-100">Design decisions</b><br/><span className="text-slate-400">Document hierarchy, layout, interaction, and visual choices.</span></p></div></div></div></section>}
