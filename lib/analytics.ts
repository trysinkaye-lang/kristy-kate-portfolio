import { track } from "@vercel/analytics";
export type PortfolioEventName = "project_open" | "live_project_open" | "contact_start" | "contact_submit" | "github_open" | "package_open";
type EventProperties = Record<string, string | number | boolean | null>;
export function trackPortfolioEvent(event: PortfolioEventName, properties?: EventProperties) {
  try { track(event, properties); } catch { /* Analytics must never interrupt an interaction. */ }
}
