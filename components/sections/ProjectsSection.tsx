"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { projectCategories, projects } from "@/data/projects";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ProjectsSection(){
 const [filter,setFilter]=useState("All");
 const shown=filter==="All"?projects:projects.filter(p=>p.category.includes(filter));
 return <section id="projects" className="section-wrap"><SectionTitle eyebrow="Featured software projects" title="Case studies, not just thumbnails" copy="Project cards show the problem, role, technologies, and development context. Private or unavailable repository links are not exposed."/>
 <div className="mt-8 flex flex-wrap gap-2">{projectCategories.map(c=><button onClick={()=>setFilter(c)} className={`filter-chip ${filter===c?'active':''}`} key={c}>{c}</button>)}</div>
 <div className="mt-10 grid gap-6">{shown.map((p,i)=><article className="project-card" key={p.slug}><div className="project-image-wrap"><img src={p.image} alt={`${p.title} portfolio placeholder — replace with real project screenshot`} loading="lazy"/></div><div className="p-6 sm:p-8"><div className="flex flex-wrap items-center gap-2">{p.category.slice(0,3).map(c=><span className="tag" key={c}>{c}</span>)}<span className="ml-auto text-xs text-cyan-300">{p.status}</span></div><h3 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{p.title}</h3><p className="mt-4 max-w-3xl leading-7 text-slate-300">{p.overview}</p><p className="mt-4 text-sm text-slate-400"><span className="text-slate-200">Role:</span> {p.role}</p><div className="mt-4 flex flex-wrap gap-2">{p.technologies.slice(0,7).map(t=><span className="tech-chip" key={t}>{t}</span>)}</div><div className="mt-7 flex flex-wrap gap-3"><Link className="primary-cta" href={`/projects/${p.slug}`}>View Case Study <ArrowUpRight size={16}/></Link>{p.github&&<a className="secondary-cta" href={p.github}><Github size={16}/> GitHub</a>}</div></div></article>)}</div></section>
}
