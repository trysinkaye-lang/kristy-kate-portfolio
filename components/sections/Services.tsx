import { Braces, MonitorCog, Palette, PanelsTopLeft } from "lucide-react";
import { services } from "@/data/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
const icons=[MonitorCog, Braces, PanelsTopLeft, Palette];
export function Services(){return <section className="section-wrap"><SectionTitle eyebrow="What I do" title="From system logic to visual communication"/><div className="mt-10 grid gap-4 md:grid-cols-2">{services.map((s,i)=>{const Icon=icons[i];return <article className="service-card" key={s.title}><Icon size={24}/><h3>{s.title}</h3><div className="mt-5 flex flex-wrap gap-2">{s.items.map(x=><span className="tag" key={x}>{x}</span>)}</div></article>})}</div></section>}
