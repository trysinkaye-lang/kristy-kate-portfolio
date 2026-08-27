import { Code2, Database, Layers3, Workflow } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";

const strengths = [
  [Code2, "Software Development", "Build practical applications around real operational workflows."],
  [Database, "Data & Systems", "Structure information, validation, and database-backed processes clearly."],
  [Layers3, "UI/UX Design", "Turn complex requirements into interfaces people can understand and use."],
  [Workflow, "Problem Solving", "Translate constraints and requirements into maintainable system behavior."],
] as const;

export function About() {
  return (
    <section id="about" className="section-wrap border-t border-white/6">
      <SectionTitle
        eyebrow="About"
        title="Development grounded in real workflows"
        copy="I work across software development, information systems, databases, and interface design — with a focus on building tools that remain understandable in day-to-day use."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div>
          <p className="max-w-xl text-xl leading-9 text-slate-200">
            My work combines technical implementation with interface thinking. I care about how data is structured, how users move through a workflow, and how the final system communicates what is happening without unnecessary complexity.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {strengths.map(([Icon, title, copy]) => (
            <div key={title} className="rounded-2xl border border-white/8 bg-white/[.025] p-5">
              <Icon size={19} className="text-cyan-300" />
              <h3 className="mt-4 font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
