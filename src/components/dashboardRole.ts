export type DashboardRole = "innovator" | "evaluator" | "adjudicator" | "admin";

/** Shared with Main.vue so a page can tell which dashboard the visitor came from. */
export const ROLE_STORAGE_KEY = "sarka-sidebar-role";

/**
 * Shared pages live in all three dashboards, so the sidebar pins the role on the URL when
 * it navigates. Without a role in the URL the page is the innovator's own page.
 */
export function resolveDashboardRole(value: unknown): DashboardRole {
  return value === "admin" || value === "adjudicator" || value === "evaluator"
    ? value
    : "innovator";
}

export function readDashboardRole(fallback: DashboardRole = "innovator"): DashboardRole {
  const stored = sessionStorage.getItem(ROLE_STORAGE_KEY);
  return stored === "admin" ||
    stored === "adjudicator" ||
    stored === "evaluator" ||
    stored === "innovator"
    ? stored
    : fallback;
}
