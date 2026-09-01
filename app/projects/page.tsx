import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main id="main-content" className="portfolio-v2 min-h-screen pb-24 pt-36">
      <div className="portfolio-shell">
        <p className="v2-kicker">Selected work</p>
        <h1 className="v2-heading mt-4">Projects and case studies.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-500">Information systems, desktop applications, business tools, and interfaces designed around real workflows.</p>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Link href={`/projects/${project.slug}`} key={project.slug} className="project-page-card group overflow-hidden rounded-[2rem] border border-white/[.08]">
              <div className="relative aspect-[16/10] overflow-hidden bg-black/10">
                <Image src={project.image} alt={`${project.shortTitle} interface`} fill className="object-contain p-4 transition duration-500 group-hover:scale-[1.025]" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="p-7 sm:p-8">
                <div className="flex items-center justify-between text-xs uppercase tracking-[.16em] text-zinc-600"><span>0{index + 1}</span><span>{project.status}</span></div>
                <h2 className="mt-5 flex items-center justify-between gap-4 text-2xl font-semibold text-white sm:text-3xl">{project.shortTitle}<ArrowUpRight className="transition group-hover:-translate-y-1 group-hover:translate-x-1" /></h2>
                <p className="mt-3 leading-7 text-zinc-500">{project.overview}</p>
                <div className="mt-6 flex flex-wrap gap-2">{project.technologies.slice(0, 5).map((item) => <span className="v2-chip" key={item}>{item}</span>)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
