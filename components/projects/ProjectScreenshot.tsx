import Image from "next/image";
import type { Project } from "@/data/projects";

type ProjectScreenshotProps = {
  project: Project;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  showLabel?: boolean;
  constrainToSourceWidth?: boolean;
};

export function ProjectScreenshot({
  project,
  priority = false,
  sizes = "100vw",
  className = "",
  imageClassName = "",
  showLabel = true,
  constrainToSourceWidth = true,
}: ProjectScreenshotProps) {
  return (
    <figure
      className={`overflow-hidden rounded-[1.35rem] border border-white/[.10] bg-[#08090b] shadow-[0_18px_48px_rgba(0,0,0,.24)] ${className}`}
    >
      <div className="flex min-h-10 items-center gap-3 border-b border-white/[.08] bg-[#0d0e11] px-3 sm:px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        {showLabel ? (
          <figcaption className="truncate text-[.65rem] font-medium uppercase tracking-[.12em] text-zinc-500 sm:text-[.7rem]">
            {project.shortTitle} interface preview
          </figcaption>
        ) : null}
      </div>

      <div className="flex items-center justify-center bg-[#090a0c] p-2 sm:p-3 md:p-4">
        <Image
          src={project.image}
          alt={`${project.shortTitle} interface screenshot`}
          width={project.imageWidth}
          height={project.imageHeight}
          priority={priority}
          unoptimized
          sizes={sizes}
          className={`block h-auto w-full rounded-[.65rem] border border-white/[.06] object-contain ${imageClassName}`}
          style={constrainToSourceWidth ? { maxWidth: `${project.imageWidth}px` } : undefined}
        />
      </div>
    </figure>
  );
}
