import { stack } from "@/data/site";

const strengths = ["Software Development", "Information Systems", "UI/UX Design", "Database Design"];

export default function AboutPage() {
  return (
    <main id="main-content" className="portfolio-v2 min-h-screen pb-24 pt-36">
      <div className="portfolio-shell">
        <p className="v2-kicker">About me</p>
        <h1 className="v2-heading mt-4">I turn complex requirements into usable systems.</h1>
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-xl leading-9 text-zinc-300">I’m Kristy Kate Taylor, a software developer and UI/UX designer from the Philippines. I work across application development, databases, system workflows, and interface design.</p>
            <p className="mt-6 text-lg leading-8 text-zinc-500">My work focuses on practical tools that make data entry, reporting, and day-to-day operations clearer and more reliable.</p>
            <div className="mt-10 border-y border-white/[.08] py-7"><p className="v2-kicker">Education</p><h2 className="mt-3 text-xl font-semibold text-white">BS Information Technology</h2><p className="mt-2 text-zinc-500">University of Science and Technology of Southern Philippines</p></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {strengths.map((item, index) => <div key={item} className="about-skill-card rounded-2xl border border-white/[.08] p-6"><span className="text-xs text-zinc-600">0{index + 1}</span><p className="mt-2 font-medium text-zinc-200">{item}</p></div>)}
          </div>
        </div>
        <section className="mt-24"><p className="v2-kicker">Technology</p><h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Tools I work with</h2><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Object.entries(stack).map(([group, items]) => <div className="about-skill-card rounded-2xl border border-white/[.08] p-6" key={group}><h3 className="font-semibold text-white">{group}</h3><div className="mt-4 flex flex-wrap gap-2">{items.filter((item) => !item.includes("replace with")).map((item) => <span className="v2-chip" key={item}>{item}</span>)}</div></div>)}</div></section>
      </div>
    </main>
  );
}
