import type { AppRole } from "./auth";

/** Routes that do not require an authenticated session. */
export const PUBLIC_ROUTE_NAMES = new Set<string>([
  "LandingPage",
  "LandingFirst",
  "LandingPageUI",
  "AboutPage",
  "AiAgent",
  "BlogPage",
  "ArticlePage",
  "FaqPage",
  "PrivacyPolicy",
  "TermsConditions",
  "NotFound",
  "NotFoundCatchAll",
  "Login",
  "SignUp",
  "ForgotPassword",
  "ResetPassword",
  "CloudShaderHero",
  "ParallaxLayersDemo",
  "FolderRevealDemo",
]);

/** Protected routes and the roles allowed to reach them. Admin always allowed. */
export const ROUTE_ROLES: Record<string, AppRole[]> = {
  InnovatorDashboard: ["innovator"],
  MyApplications: ["innovator"],
  NewIdea: ["innovator"],
  EvaluatorDashboard: ["evaluator", "adjudicator"],
  ReviewQueue: ["evaluator", "adjudicator"],
  FeedbackCenter: ["innovator", "evaluator", "adjudicator"],
  ProfileView: ["innovator", "evaluator", "adjudicator", "admin"],
  TeamView: ["evaluator", "adjudicator", "admin"],
  IdeasView: ["innovator", "evaluator", "adjudicator", "admin"],
  DeadlinesView: ["innovator", "evaluator", "adjudicator", "admin"],
  ApplicationView: ["innovator", "evaluator", "adjudicator", "admin"],
  ApplicationViewWithId: ["innovator", "evaluator", "adjudicator", "admin"],
  ChatPage: ["innovator", "evaluator", "adjudicator", "admin"],
  ChatPageWithId: ["innovator", "evaluator", "adjudicator", "admin"],
  AllApplications: ["evaluator", "adjudicator", "admin"],
  AdminDashboard: ["admin", "adjudicator"],
  AdminEvaluators: ["admin", "adjudicator"],
};

export function isPublicRoute(name: string | null | undefined): boolean {
  return !!name && PUBLIC_ROUTE_NAMES.has(name);
}

export function canAccessRoute(role: AppRole, name: string | null | undefined): boolean {
  if (!name) return true;
  if (isPublicRoute(name)) return true;
  const allowed = ROUTE_ROLES[name];
  if (!allowed) return true; // unknown route: allow authenticated users
  if (allowed.includes("admin") && role === "admin") return true;
  return allowed.includes(role);
}