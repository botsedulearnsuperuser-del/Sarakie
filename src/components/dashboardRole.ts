export type DashboardRole = "innovator" | "evaluator" | "admin";

/** Shared with Main.vue so a page can tell which dashboard the visitor came from. */
export const ROLE_STORAGE_KEY = "sarka-sidebar-role";

export function readDashboardRole(fallback: DashboardRole = "innovator"): DashboardRole {
  const stored = sessionStorage.getItem(ROLE_STORAGE_KEY);
  return stored === "admin" || stored === "evaluator" || stored === "innovator"
    ? stored
    : fallback;
}
