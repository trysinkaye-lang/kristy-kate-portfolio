"use client";

import { designs } from "@/data/designs";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function DesignSection() {
  return (
    <section id="designs" className="section-wrap">
      <SectionTitle
        eyebrow="Design & creative work"
        title="Visual work beyond software"
        copy="A separate gallery for UI/UX concepts, dashboard layouts, carousel designs, marketing visuals, and other creative work. These are not software-project entries."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {designs.map((design) => (
          <article key={design.title} className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[.025]">
            <div className="aspect-[4/3] overflow-hidden bg-slate-950">
              <img
                src={design.image}
                alt={`${design.title} design placeholder`}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
              />
            </div>
            <div className="p-5 sm:p-6">
              <p className="eyebrow">{design.category}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{design.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{design.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
