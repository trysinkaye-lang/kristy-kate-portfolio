import Link from "next/link";
import { ArrowUpRight, Database, Figma, Layers3, MonitorSmartphone } from "lucide-react";
import { InteractiveToolGrid } from "@/components/InteractiveToolGrid";

const experience = [
  { name: "RBIM", role: "Software Developer · UI/UX Designer", detail: "Offline-first and hybrid population information system" },
  { name: "AHDIS", role: "Software Developer · UI Designer", detail: "Adolescent health and development information system" },
  { name: "ERP System", role: "Software Developer · UI Designer", detail: "Business operations and resource planning system" },
];

const services = [
  { icon: MonitorSmartphone, label: "Software Development" },
  { icon: Layers3, label: "Information Systems" },
  { icon: Figma, label: "UI/UX Design" },
  { icon: Database, label: "Database Design" },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="portfolio-v2 min-h-screen pb-20 pt-36">
      <div className="portfolio-shell">
        <header className="grid gap-10 border-b border-white/[.09] pb-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:pb-24">
          <h1 className="text-[clamp(3.6rem,7vw,6.8rem)] font-semibold leading-[.9] tracking-[-.06em] text-white">Hello! I’m Kristy Kate.</h1>
          <div className="space-y-6 text-lg leading-8 text-zinc-400 lg:pt-3"><p>I’m a software developer and UI/UX designer passionate about building clear, reliable digital systems for real people and real workflows.</p><p>My work combines requirements analysis, database design, application development, and interface design. I care about making powerful tools feel organized rather than overwhelming.</p><p>I’m especially interested in information systems, offline-first applications, public-sector workflows, and products where thoughtful design improves the quality of data and decisions.</p></div>
        </header>
        <section className="grid gap-10 border-b border-white/[.09] py-16 lg:grid-cols-[.38fr_.62fr] lg:py-24">
          <div><p className="v2-kicker">Experience</p><h2 className="mt-4 text-3xl font-semibold text-white">Selected systems</h2></div>
          <div className="divide-y divide-white/[.09] border-y border-white/[.09]">{experience.map((item, index) => <div key={item.name} className="about-experience-row grid gap-4 py-7 sm:grid-cols-[50px_1fr_auto] sm:items-center"><span className="text-xs text-zinc-600">0{index + 1}</span><div><h3 className="text-lg font-semibold text-white">{item.name}</h3><p className="mt-1 text-sm text-zinc-500">{item.detail}</p></div><p className="text-sm text-zinc-400 sm:text-right">{item.role}</p></div>)}</div>
        </section>
        <section className="grid gap-10 border-b border-white/[.09] py-16 lg:grid-cols-[.38fr_.62fr] lg:py-24"><div><p className="v2-kicker">Education</p></div><div className="about-education-card rounded-[2rem] border border-white/[.09] p-7 sm:p-9"><div className="ustp-logo-shell"><img src="https://www.ustp.edu.ph/wp-content/uploads/2023/11/USTP-Logo-against-Light-Background-273x300.png" alt="University of Science and Technology of Southern Philippines logo" /></div><h2 className="mt-7 text-2xl font-semibold text-white">University of Science and Technology of Southern Philippines</h2><p className="mt-3 text-zinc-500">Bachelor of Science in Information Technology</p></div></section>
        <section className="py-16 lg:py-24"><p className="v2-kicker">What I do</p><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{services.map(({ icon: Icon, label }) => <div className="about-service-card rounded-2xl border border-white/[.09] p-6" key={label}><Icon size={22} /><p className="mt-12 font-semibold text-white">{label}</p></div>)}</div></section>
        <section className="border-y border-white/[.09] py-16 lg:py-24"><p className="v2-kicker">Stack</p><h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Tools I work with</h2><InteractiveToolGrid /></section>
        <section className="py-24 text-center"><p className="v2-kicker">Let’s connect</p><h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">I’m open to thoughtful projects and opportunities.</h2><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/contact" className="v2-button v2-button-primary">Contact me <ArrowUpRight size={16} /></Link><Link href="/projects" className="v2-button">See projects</Link></div></section>
      </div>
    </main>
  );
}
