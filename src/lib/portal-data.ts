import { supabase } from "./supabase";

/**
 * Read helpers for the innovator-facing pages.
 *
 * Everything here runs as the signed-in user, so the database RLS policies
 * (not this file) decide what can be read. Queries never take a user id from
 * the caller: they always use `auth.uid()` through the policies.
 */

export type DbStatus =
  | "draft"
  | "submitted"
  | "screening"
  | "committee"
  | "due_diligence"
  | "approved"
  | "rejected"
  | "returned";

export interface ApplicationRow {
  id: string;
  reference: string;
  title: string;
  status: DbStatus;
  submitted_at: string;
  updated_at: string;
  sector: string | null;
  funding_requested: number | null;
  expected_impact: string | null;
}

export const IN_REVIEW_STATUSES: DbStatus[] = [
  "submitted",
  "screening",
  "committee",
  "due_diligence",
];

/** Human label used across the dashboards. */
export function statusLabel(status: DbStatus): string {
  switch (status) {
    case "draft":
      return "Draft";
    case "submitted":
      return "Under Review";
    case "screening":
      return "Screening";
    case "committee":
      return "Committee";
    case "due_diligence":
      return "Due Diligence";
    case "approved":
      return "Approved";
    case "rejected":
      return "Not Successful";
    case "returned":
      return "Feedback Required";
    default:
      return "Under Review";
  }
}

/** Short label for compact rows. */
export function statusShortLabel(status: DbStatus): string {
  switch (status) {
    case "returned":
      return "Feedback required";
    case "submitted":
      return "Under review";
    case "due_diligence":
      return "Due diligence";
    default:
      return statusLabel(status);
  }
}

export function formatShortDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

export function formatLongDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function todaySentence(): string {
  const now = new Date();
  const day = now.toLocaleDateString("en-GB", { weekday: "long" });
  const rest = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${day} ${rest}. Here's your innovation overview.`;
}

export async function loadInnovatorApplications(): Promise<ApplicationRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("applications")
    .select(
      "id, reference, title, status, submitted_at, updated_at, sector, funding_requested, expected_impact",
    )
    .order("submitted_at", { ascending: false });
  if (error) {
    console.warn("[portal] Could not load applications:", error.message);
    return [];
  }
  return (data ?? []) as ApplicationRow[];
}

export interface MonthlyCount {
  key: string;
  label: string;
  count: number;
}

/** Last `months` calendar months of submissions, oldest first. */
export function monthlySubmissions(
  rows: ApplicationRow[],
  months = 6,
): MonthlyCount[] {
  const now = new Date();
  const buckets: MonthlyCount[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleDateString("en-GB", { month: "short" }),
      count: 0,
    });
  }
  const index = new Map(buckets.map((b) => [b.key, b]));
  for (const row of rows) {
    const d = new Date(row.submitted_at);
    if (Number.isNaN(d.getTime())) continue;
    const bucket = index.get(`${d.getFullYear()}-${d.getMonth()}`);
    if (bucket) bucket.count += 1;
  }
  return buckets;
}

export interface CorrectionRow {
  id: string;
  application_id: string;
  body: string;
  created_at: string;
  resolved_at: string | null;
  application: { title: string; reference: string } | null;
}

export async function loadCorrections(): Promise<CorrectionRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("application_corrections")
    .select(
      "id, application_id, body, created_at, resolved_at, application:applications(title, reference)",
    )
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) {
    console.warn("[portal] Could not load corrections:", error.message);
    return [];
  }
  return (data ?? []) as unknown as CorrectionRow[];
}

export interface FeedbackRow {
  id: string;
  application_id: string;
  author_id: string;
  author_role: "innovator" | "evaluator" | "admin";
  parent_id: string | null;
  body: string;
  status: "unread" | "read" | "answered";
  visible_to_innovator: boolean;
  created_at: string;
  application: { title: string; reference: string } | null;
}

export async function loadFeedback(): Promise<FeedbackRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("feedback_comments")
    .select(
      "id, application_id, author_id, author_role, parent_id, body, status, visible_to_innovator, created_at, application:applications(title, reference)",
    )
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    console.warn("[portal] Could not load feedback:", error.message);
    return [];
  }
  return (data ?? []) as unknown as FeedbackRow[];
}

/** Innovator reply to an evaluator comment. */
export async function replyToFeedback(
  applicationId: string,
  parentId: string | null,
  body: string,
  authorId: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "Supabase is not configured." };
  const { error } = await supabase.from("feedback_comments").insert({
    application_id: applicationId,
    author_id: authorId,
    author_role: "innovator",
    parent_id: parentId,
    body: body.trim(),
    status: "answered",
  });
  if (error) return { ok: false, error: error.message };

  if (parentId) {
    await supabase
      .from("feedback_comments")
      .update({ status: "answered" })
      .eq("id", parentId);
  }

  return { ok: true };
}

export async function markFeedbackRead(ids: string[]): Promise<void> {
  if (!supabase || ids.length === 0) return;
  await supabase
    .from("feedback_comments")
    .update({ status: "read" })
    .in("id", ids)
    .eq("status", "unread");
}

/** Documents attached to the signed-in user's applications. */
export async function countDocumentsByApplication(): Promise<Record<string, number>> {
  if (!supabase) return {};
  const { data, error } = await supabase
    .from("application_documents")
    .select("application_id");
  if (error || !data) return {};
  const counts: Record<string, number> = {};
  for (const row of data as { application_id: string }[]) {
    counts[row.application_id] = (counts[row.application_id] ?? 0) + 1;
  }
  return counts;
}
