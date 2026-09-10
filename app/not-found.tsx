import Link from "next/link";
import styles from "@/styles/pages.module.css";
export default function NotFound() {
  return <main id="main-content" tabIndex={-1} className={`shell ${styles.notFound}`}><p className="eyebrow">404 / Page not found</p><h1>Let’s get you<br />back to the work.</h1><p>This page isn’t available. Explore the project index to find a case study.</p><Link href="/projects" className="text-link">Explore projects <span aria-hidden="true">↗</span></Link></main>;
}
