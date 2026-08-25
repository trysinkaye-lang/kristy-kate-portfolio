import { Code2, Layers3, WandSparkles } from "lucide-react";
import MaskedHeading from "@/components/react-bits/MaskedHeading";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function About() {
  return <section id="about" className="section-wrap">
    <SectionTitle eyebrow="About" title="Development + design + problem solving" copy="I create digital solutions that are technically functional, visually clear, and practical for the people who use them." />
    <div className="mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
      <div className="glass-card min-h-[360px] p-4"><div className="about-visual"><div className="about-code">&lt;developer<br/><span>designer</span><br/>problemSolver /&gt;</div></div></div>
      <div className="flex flex-col justify-center">
        <p className="text-xl leading-9 text-slate-200">I&apos;m a software developer and designer focused on turning real requirements into useful systems. My work combines software engineering, interface design, databases, user experience, and visual communication.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[ [Code2,"Development","Build reliable workflows and applications."], [Layers3,"Design","Make complex systems easier to understand."], [WandSparkles,"Problem Solving","Translate constraints into practical solutions."] ].map(([Icon,title,copy]: any) => <div key={title} className="soft-card"><Icon size={20}/><h3>{title}</h3><p>{copy}</p></div>)}
        </div>
      </div>
    </div>
    <div className="mt-20 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.025] px-3 py-10 sm:px-8"><MaskedHeading text="Software × Design" src="/media/masked-bg.svg" reveal="rise" trigger="view" parallax={18} drift={8} brightness={1.1} saturation={1.1} textScale={0.105}/></div>
  </section>;
}
