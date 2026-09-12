import Image from "next/image";
import type { Project } from "@/data/projects";
import { ImageInspector } from "./ImageInspector";
import styles from "./projects.module.css";

export function ProjectScreenshot({
  project,
  priority = false,
  sizes = "(max-width: 700px) 90vw, 640px",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={styles.screenshot} style={{ maxWidth: project.imageWidth }} data-spotlight>
      <ImageInspector
        src={project.image}
        alt={project.imageAlt ?? `${project.shortTitle} interface screenshot`}
        width={project.imageWidth}
        height={project.imageHeight}
      >
        <Image
          src={project.image}
          alt={project.imageAlt ?? `${project.shortTitle} interface screenshot`}
          width={project.imageWidth}
          height={project.imageHeight}
          preload={priority}
          sizes={sizes}
          unoptimized
          draggable={false}
        />
      </ImageInspector>
      <figcaption>{project.imageCaption ?? `${project.shortTitle} — actual application interface.`}</figcaption>
    </figure>
  );
}
