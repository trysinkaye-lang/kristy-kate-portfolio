import {
  Atom,
  Braces,
  CircleDashed,
  Code2,
  Cog,
  Database,
  Feather,
  GitBranch,
  Github,
  Monitor,
  Package,
  Play,
  Workflow,
} from "lucide-react";

type TechLogoProps = {
  name: string;
  size?: number;
  className?: string;
};

const colors: Record<string, string> = {
  React: "#61dafb",
  TypeScript: "#3178c6",
  "Tailwind CSS": "#38bdf8",
  "Node.js": "#5fa04e",
  PostgreSQL: "#4169e1",
  SQLite: "#55a7d7",
  Rust: "#f38b5f",
  Tauri: "#24c8d8",
  PHP: "#777bb4",
  Figma: "#f24e1e",
  GitHub: "currentColor",
  Vercel: "currentColor",
  HTML: "#e34f26",
  CSS: "#663399",
  JavaScript: "#f7df1e",
  Vite: "#a855f7",
  "REST APIs": "#a78bfa",
  MySQL: "#4479a1",
  "PHP Desktop": "#777bb4",
  Git: "#f05032",
  "VS Code": "#007acc",
  npm: "#cb3837",
  "GitHub Actions": "#2088ff",
  Canva: "#00c4cc",
};

function LetterMark({ text, size, color }: { text: string; size: number; color: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        alignItems: "center",
        background: color,
        borderRadius: Math.max(5, Math.round(size * 0.18)),
        color: color === "#f7df1e" ? "#111" : "#fff",
        display: "inline-flex",
        fontSize: Math.max(9, Math.round(size * 0.34)),
        fontWeight: 800,
        height: size,
        justifyContent: "center",
        letterSpacing: "-.04em",
        lineHeight: 1,
        width: size,
      }}
    >
      {text}
    </span>
  );
}

export function TechLogo({ name, size = 32, className }: TechLogoProps) {
  const color = colors[name] ?? "currentColor";
  const iconProps = { "aria-hidden": true, className, color, size, strokeWidth: 1.7 } as const;

  if (name === "React") return <Atom {...iconProps} />;
  if (name === "TypeScript") return <LetterMark text="TS" size={size} color={color} />;
  if (name === "JavaScript") return <LetterMark text="JS" size={size} color={color} />;
  if (name === "HTML") return <LetterMark text="5" size={size} color={color} />;
  if (name === "CSS") return <LetterMark text="CSS" size={size} color={color} />;
  if (name === "Node.js") return <LetterMark text="JS" size={size} color={color} />;
  if (name === "PHP" || name === "PHP Desktop") return <LetterMark text="PHP" size={size} color={color} />;
  if (name === "npm") return <LetterMark text="npm" size={size} color={color} />;

  if (name === "Tailwind CSS") {
    return (
      <svg aria-hidden="true" className={className} height={size} viewBox="0 0 48 48" width={size}>
        <path d="M12 19c2.7-7.2 7.2-10.8 13.5-10.8 9.5 0 10.7 7.1 15.5 8.3-2.7 7.2-7.2 10.8-13.5 10.8-9.5 0-10.7-7.1-15.5-8.3Zm-5 12.5c2.7-7.2 7.2-10.8 13.5-10.8 9.5 0 10.7 7.1 15.5 8.3-2.7 7.2-7.2 10.8-13.5 10.8-9.5 0-10.7-7.1-15.5-8.3Z" fill={color} />
      </svg>
    );
  }

  if (name === "Figma") {
    return (
      <svg aria-hidden="true" className={className} height={size} viewBox="0 0 32 48" width={size}>
        <path d="M8 0h8v16H8A8 8 0 0 1 8 0Z" fill="#f24e1e" />
        <path d="M16 0h8a8 8 0 0 1 0 16h-8Z" fill="#ff7262" />
        <path d="M8 16h8v16H8a8 8 0 0 1 0-16Z" fill="#a259ff" />
        <circle cx="24" cy="24" r="8" fill="#1abcfe" />
        <path d="M8 32h8v8a8 8 0 1 1-8-8Z" fill="#0acf83" />
      </svg>
    );
  }

  if (name === "Vercel") {
    return <svg aria-hidden="true" className={className} height={size} viewBox="0 0 24 24" width={size}><path d="M12 3 23 21H1L12 3Z" fill={color} /></svg>;
  }

  if (name === "GitHub") return <Github {...iconProps} />;
  if (name === "PostgreSQL" || name === "MySQL") return <Database {...iconProps} />;
  if (name === "SQLite") return <Feather {...iconProps} />;
  if (name === "Rust") return <Cog {...iconProps} />;
  if (name === "Tauri") return <CircleDashed {...iconProps} />;
  if (name === "Git") return <GitBranch {...iconProps} />;
  if (name === "VS Code") return <Monitor {...iconProps} />;
  if (name === "GitHub Actions") return <Workflow {...iconProps} />;
  if (name === "Vite") return <Play {...iconProps} />;
  if (name === "REST APIs") return <Braces {...iconProps} />;
  if (name === "Canva") return <LetterMark text="C" size={size} color={color} />;
  if (name === "Package") return <Package {...iconProps} />;
  return <Code2 {...iconProps} />;
}
