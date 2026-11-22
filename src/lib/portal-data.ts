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

/** Parse a portal date. Deadlines are stored as midnight UTC calendar dates, so
 *  read the date part in the viewer's timezone instead of shifting back a day. */
export function parsePortalDate(value: string): Date {
  const calendar = /^(\d{4})-(\d{2})-(\d{2})(?:$|T00:00:00(?:\.\d+)?(?:Z|[+-]00:00)$)/.exec(value);
  if (calendar) {
    return new Date(Number(calendar[1]), Number(calendar[2]) - 1, Number(calendar[3]));
  }
  return new Date(value);
}

export function formatShortDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = parsePortalDate(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

export function formatLongDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = parsePortalDate(iso);
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

/** Document metadata for the signed-in user's applications. */
export interface ApplicationDocumentRow {
  application_id: string;
  file_name: string;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
}

export async function loadApplicationDocuments(): Promise<ApplicationDocumentRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("application_documents")
    .select("application_id, file_name, mime_type, size_bytes, created_at")
    .order("created_at", { ascending: true });
  if (error) {
    console.warn("[portal] Could not load documents:", error.message);
    return [];
  }
  return (data ?? []) as ApplicationDocumentRow[];
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

/** Evaluator's assigned queue (anonymised view). */
export interface EvaluatorQueueRow {
  assignment_id: string;
  application_id: string;
  reference: string;
  title: string;
  sector: string | null;
  innovation_type: string | null;
  maturity_level: string | null;
  funding_requested: number | null;
  expected_impact: string | null;
  submitted_at: string;
  status: DbStatus;
  assignment_status: "assigned" | "in_progress" | "submitted" | "overdue";
  due_at: string | null;
  innovator_code: string;
}

export async function loadEvaluatorQueue(): Promise<EvaluatorQueueRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("evaluator_queue")
    .select("*")
    .order("submitted_at", { ascending: false });
  if (error) {
    console.warn("[portal] Could not load evaluator queue:", error.message);
    return [];
  }
  return (data ?? []) as unknown as EvaluatorQueueRow[];
}

/** Rubric criteria (read by everyone signed in). */
export interface RubricCriterion {
  key: string;
  name: string;
  weight: number;
  hint: string | null;
  position: number;
}

export async function loadRubricCriteria(): Promise<RubricCriterion[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("rubric_criteria")
    .select("key, name, weight, hint, position")
    .eq("active", true)
    .order("position", { ascending: true });
  if (error) {
    console.warn("[portal] Could not load rubric:", error.message);
    return [];
  }
  return (data ?? []) as unknown as RubricCriterion[];
}

/** All applications, admin only (RLS). */
export interface AdminApplicationRow {
  id: string;
  reference: string;
  title: string;
  status: DbStatus;
  sector: string | null;
  funding_requested: number | null;
  updated_at: string;
  submitted_at: string;
  innovator_name: string | null;
  evaluator_name: string | null;
}

export async function loadAllApplications(): Promise<AdminApplicationRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("applications")
    .select(
      "id, reference, title, status, sector, funding_requested, updated_at, submitted_at, innovator:profiles!innovator_id(full_name), assignments:evaluation_assignments(evaluator:profiles!evaluator_id(full_name))",
    )
    .order("submitted_at", { ascending: true });
  if (error) {
    console.warn("[portal] Could not load all applications:", error.message);
    return [];
  }
  return ((data ?? []) as Record<string, any>[]).map((row) => {
    const innovator = Array.isArray(row.innovator) ? row.innovator[0] : row.innovator;
    const assignments = Array.isArray(row.assignments) ? row.assignments : [];
    const evaluator = assignments[0]?.evaluator;
    const ev = Array.isArray(evaluator) ? evaluator[0] : evaluator;
    return {
      id: row.id,
      reference: row.reference,
      title: row.title,
      status: row.status,
      sector: row.sector,
      funding_requested: row.funding_requested,
      updated_at: row.updated_at,
      submitted_at: row.submitted_at,
      innovator_name: innovator?.full_name ?? null,
      evaluator_name: ev?.full_name ?? null,
    };
  });
}

/** Audit log entries, admin only. */
export interface AuditLogRow {
  id: number;
  action: string;
  actor_name: string | null;
  ip: string | null;
  created_at: string;
  entity_table: string | null;
  entity_id: string | null;
}

export async function loadAuditLog(limit = 10): Promise<AuditLogRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("audit_log")
    .select("id, action, entity_table, entity_id, ip, created_at, actor:profiles!actor_id(full_name)")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.warn("[portal] Could not load audit log:", error.message);
    return [];
  }
  return ((data ?? []) as Record<string, any>[]).map((row) => {
    const actor = Array.isArray(row.actor) ? row.actor[0] : row.actor;
    return {
      id: row.id,
      action: row.action,
      actor_name: actor?.full_name ?? null,
      ip: row.ip,
      created_at: row.created_at,
      entity_table: row.entity_table,
      entity_id: row.entity_id,
    };
  });
}

/** Evaluations submitted by the signed-in evaluator. */
export interface MyEvaluationRow {
  id: string;
  application_id: string;
  weighted_score: number | null;
  recommendation: string | null;
  submitted_at: string | null;
}

export async function loadMyEvaluations(): Promise<MyEvaluationRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("evaluations")
    .select("id, application_id, weighted_score, recommendation, submitted_at")
    .order("submitted_at", { ascending: false });
  if (error) {
    console.warn("[portal] Could not load evaluations:", error.message);
    return [];
  }
  return (data ?? []) as unknown as MyEvaluationRow[];
}

/** Deadlines visible to the signed-in user (RLS by audience). */
export interface DeadlineRow {
  id: string;
  title: string;
  description: string | null;
  due_on: string;
  audience: string | null;
}

export async function loadDeadlines(): Promise<DeadlineRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("deadlines")
    .select("id, title, description, due_on, audience")
    .order("due_on", { ascending: true });
  if (error) {
    console.warn("[portal] Could not load deadlines:", error.message);
    return [];
  }
  return (data ?? []) as DeadlineRow[];
}

/** Notifications for the signed-in user. */
export interface NotificationRow {
  id: string;
  title: string;
  body: string | null;
  link: string | null;
  read_at: string | null;
  created_at: string;
}

export async function loadNotifications(): Promise<NotificationRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("notifications")
    .select("id, title, body, link, read_at, created_at")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) {
    console.warn("[portal] Could not load notifications:", error.message);
    return [];
  }
  return (data ?? []) as NotificationRow[];
}

export async function markNotificationRead(id: string): Promise<void> {
  if (!supabase) return;
  await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", id)
    .is("read_at", null);
}

export async function markAllNotificationsRead(): Promise<void> {
  if (!supabase) return;
  await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .is("read_at", null);
}

/** Count innovator profiles (admin only). */
export async function countInnovators(): Promise<number> {
  if (!supabase) return 0;
  const { count, error } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("role", "innovator");
  if (error) return 0;
  return count ?? 0;
}
