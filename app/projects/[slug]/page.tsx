import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-6 pb-24 pt-32 lg:px-8">
      <Link className="social-link" href="/#projects"><ArrowLeft size={16} /> Back to projects</Link>
      <div className="mt-8">
        <p className="eyebrow">Case study · {project.status}</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{project.overview}</p>
      </div>

      <img
        className="mt-10 w-full rounded-[2rem] border border-white/10 bg-white/[.03]"
        src={project.image}
        alt={`${project.title} interface screenshot`}
      />

      <div className="case-grid">
        <Case title="The problem"><p>{project.problem}</p></Case>
        <Case title="The solution"><p>{project.solution}</p></Case>
        <Case title="My role"><p>{project.role}</p></Case>
        <Case title="Technology stack"><div className="flex flex-wrap gap-2">{project.technologies.map((technology) => <span className="tech-chip" key={technology}>{technology}</span>)}</div></Case>
        <Case title="Key features"><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></Case>
        <Case title="Challenges"><ul>{project.challenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul></Case>
        <Case title="UI/UX process"><p>Problem → Research → Wireframe → Interface → Development → Testing → Improvement</p></Case>
        <Case title="System architecture"><p>Architecture details are documented per project as the case study expands, with emphasis on interface, application logic, storage, reporting, and synchronization where applicable.</p></Case>
        <Case title="Lessons learned"><ul>{project.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul></Case>
        <Case title="Screenshots"><p>The portfolio screenshot above shows the project interface. Additional screens and annotated workflows can be added as the case study grows.</p></Case>
      </div>
    </main>
  );
}

function Case({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="case-card">
      <p className="eyebrow">{title}</p>
      <div className="mt-4 leading-7 text-slate-300 [&_li]:mb-2 [&_li]:ml-5 [&_li]:list-disc">{children}</div>
    </section>
  );
}
