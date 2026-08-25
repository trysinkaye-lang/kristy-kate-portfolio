import { MonitorSmartphone, PanelsTopLeft, Gauge, Smartphone } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";

const showcase = [
  {
    icon: Gauge,
    title: "Dashboard Design",
    problem: "Operational dashboards can become crowded when totals, charts, filters, maps, and recent activity compete for attention.",
    goal: "Keep the most important information scannable while preserving access to deeper system data.",
    decisions: "Clear hierarchy, grouped statistics, restrained color, predictable navigation, and progressive detail.",
    result: "Replace this placeholder with a verified dashboard screenshot or before/after redesign.",
  },
  {
    icon: PanelsTopLeft,
    title: "System Interface Design",
    problem: "Long data-entry workflows can overwhelm encoders when validation and conditional questions are not visible at the right time.",
    goal: "Make forms feel guided without hiding the rules that protect data quality.",
    decisions: "Section grouping, clear labels, conditional states, inline validation, readable spacing, and review-before-submit patterns.",
    result: "Replace with a real RBIM/AHDIS form flow or annotated system screen.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive Web Interfaces",
    problem: "Desktop-first system screens often break down on smaller laptops, tablets, and mobile devices.",
    goal: "Preserve task clarity and hierarchy across 1366×768 laptops through mobile widths.",
    decisions: "Responsive grids, controlled density, collapsible navigation, touch-friendly controls, and adaptive typography.",
    result: "Replace with real responsive captures from your web work.",
  },
  {
    icon: Smartphone,
    title: "Mobile / Focused Views",
    problem: "Small screens require stricter prioritization than desktop dashboards.",
    goal: "Surface one clear task at a time without losing context.",
    decisions: "Single-column flows, concise actions, clear status states, and minimal visual noise.",
    result: "Replace with a verified mobile interface or prototype.",
  },
];

export function UIUXShowcase() {
  return (
    <section className="section-wrap" aria-labelledby="uiux-showcase-title">
      <SectionTitle
        eyebrow="UI/UX showcase"
        title="Interfaces designed around real tasks"
        copy="A dedicated view of how I think about dashboard, system, web, and mobile interfaces — from the problem to the design decisions and final result."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {showcase.map(({ icon: Icon, title, problem, goal, decisions, result }) => (
          <article key={title} className="service-card">
            <Icon size={24} />
            <h3 className="mt-5 text-2xl font-semibold text-white">{title}</h3>
            <dl className="mt-5 space-y-4 text-sm leading-6">
              <div><dt className="eyebrow">Problem</dt><dd className="mt-1 text-slate-400">{problem}</dd></div>
              <div><dt className="eyebrow">Design goal</dt><dd className="mt-1 text-slate-400">{goal}</dd></div>
              <div><dt className="eyebrow">Design decisions</dt><dd className="mt-1 text-slate-400">{decisions}</dd></div>
              <div><dt className="eyebrow">Final result</dt><dd className="mt-1 text-slate-400">{result}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
