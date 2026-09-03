import { track } from "@vercel/analytics";

export type PortfolioEventName =
  | "home_view_projects"
  | "home_resume_click"
  | "home_contact_click"
  | "project_case_study_click"
  | "contact_email_click"
  | "github_click";

type EventProperties = Record<string, string | number | boolean | null>;

export function trackPortfolioEvent(
  eventName: PortfolioEventName,
  properties?: EventProperties,
) {
  try {
    track(eventName, properties);
  } catch {
    // Analytics should never interrupt navigation or other recruiter actions.
  }
}
