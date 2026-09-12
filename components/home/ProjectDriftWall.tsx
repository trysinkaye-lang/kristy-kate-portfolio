import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectDriftWall.module.css";

type DriftTile = {
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  category: string;
};

const columns: DriftTile[][] = [
  [
    {
      href: "/projects/rbim",
      src: "/media/rbim-dashboard.webp",
      alt: "RBIM dashboard interface",
      width: 640,
      height: 341,
      title: "RBIM",
      category: "Information system",
    },
    {
      href: "/projects/marci-metzger",
      src: "/media/marci-landscape.webp",
      alt: "Pahrump landscape used in the Marci Metzger redesign",
      width: 1600,
      height: 1063,
      title: "Marci Metzger",
      category: "Photography direction",
    },
  ],
  [
    {
      href: "/projects/co-designs",
      src: "/media/co-designs-preview.webp",
      alt: "C.O. Designs architecture website preview",
      width: 1440,
      height: 1000,
      title: "C.O. Designs",
      category: "Creative development",
    },
    {
      href: "/projects/co-designs",
      src: "/media/co-designs-interior.webp",
      alt: "Wellness interior featured in the C.O. Designs website",
      width: 640,
      height: 480,
      title: "C.O. Designs",
      category: "Interior portfolio",
    },
  ],
  [
    {
      href: "/projects/ahdis",
      src: "/media/ahdis-dashboard.webp",
      alt: "AHDIS dashboard interface",
      width: 480,
      height: 256,
      title: "AHDIS",
      category: "Desktop system",
    },
    {
      href: "/projects/co-designs",
      src: "/media/co-designs-residence.webp",
      alt: "Residence imagery featured in the C.O. Designs portfolio",
      width: 817,
      height: 631,
      title: "C.O. Designs",
      category: "Residential portfolio",
    },
  ],
  [
    {
      href: "/projects/marci-metzger",
      src: "/media/marci-preview.webp",
      alt: "Marci Metzger real-estate website preview",
      width: 1440,
      height: 1000,
      title: "Marci Metzger",
      category: "Real-estate redesign",
    },
    {
      href: "/projects/marci-metzger",
      src: "/media/marci-lifestyle.webp",
      alt: "Buyer-focused imagery from the Marci Metzger project",
      width: 1200,
      height: 648,
      title: "Marci Metzger",
      category: "Buyer experience",
    },
  ],
];

export function ProjectDriftWall() {
  return (
    <section className={styles.section} aria-labelledby="drift-wall-title" data-motion-section>
      <div className={`shell ${styles.heading}`}>
        <div>
          <p className="eyebrow">Visual index</p>
          <h3 id="drift-wall-title">Explore the work.</h3>
        </div>
        <p>Four projects. Real interfaces and project imagery.</p>
      </div>

      <nav className={styles.viewport} aria-label="Selected projects gallery">
        <div className={styles.grid}>
          {columns.map((column, columnIndex) => (
            <div
              className={styles.column}
              data-drift-column
              key={columnIndex}
              style={{
                "--drift-duration": `${12 + columnIndex * 2}s`,
                "--drift-delay": `${columnIndex * -1.8}s`,
              } as CSSProperties}
            >
              {column.map((tile, tileIndex) => (
                <Link
                  className={styles.tile}
                  data-spotlight
                  href={tile.href}
                  key={`${tile.src}-${tileIndex}`}
                  aria-label={`View ${tile.title} case study`}
                >
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    width={tile.width}
                    height={tile.height}
                    sizes="(max-width: 767px) 44vw, (max-width: 1100px) 38vw, 24vw"
                    unoptimized
                  />
                  <span className={styles.meta}>
                    <strong>{tile.title}</strong>
                    <span>{tile.category}</span>
                    <span className={styles.cta} aria-hidden="true">View case study ↗</span>
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </nav>
    </section>
  );
}
