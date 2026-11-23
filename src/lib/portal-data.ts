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

/** A chat message between innovator and reviewer (evaluator/adjudicator/admin). */
export interface ChatMessageRow {
  id: string;
  application_id: string;
  author_id: string;
  author_role: "innovator" | "evaluator" | "adjudicator" | "admin";
  parent_id: string | null;
  body: string;
  status: "unread" | "read" | "answered";
  created_at: string;
  author_name: string | null;
}

export async function loadChatMessages(applicationId: string): Promise<ChatMessageRow[]> {
  if (!supabase || !applicationId) return [];
  const { data, error } = await supabase
    .from("feedback_comments")
    .select("id, application_id, author_id, author_role, parent_id, body, status, created_at, author:profiles!author_id(full_name)")
    .eq("application_id", applicationId)
    .order("created_at", { ascending: true });
  if (error) {
    console.warn("[portal] Could not load chat:", error.message);
    return [];
  }
  return ((data ?? []) as Record<string, any>[]).map((row) => {
    const author = Array.isArray(row.author) ? row.author[0] : row.author;
    return {
      id: row.id,
      application_id: row.application_id,
      author_id: row.author_id,
      author_role: row.author_role,
      parent_id: row.parent_id,
      body: row.body,
      status: row.status,
      created_at: row.created_at,
      author_name: author?.full_name ?? null,
    };
  });
}

export async function sendChatMessage(
  applicationId: string,
  body: string,
  authorRole: "innovator" | "evaluator" | "adjudicator" | "admin",
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "Supabase is not configured." };
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return { ok: false, error: "Sign in again to send a message." };
  const text = body.trim();
  if (!text) return { ok: false, error: "Message cannot be empty." };
  const { error } = await supabase.from("feedback_comments").insert({
    application_id: applicationId,
    author_id: userId,
    author_role: authorRole,
    body: text,
    status: "unread",
    visible_to_innovator: true,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function requestApplicationChanges(
  applicationId: string,
  body: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "Supabase is not configured." };
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return { ok: false, error: "Sign in again." };
  const text = body.trim();
  if (!text) return { ok: false, error: "Describe the changes required." };
  const { error: corrError } = await supabase.from("application_corrections").insert({
    application_id: applicationId,
    requested_by: userId,
    body: text,
  });
  if (corrError) return { ok: false, error: corrError.message };
  const { error: statusError } = await supabase
    .from("applications")
    .update({ status: "returned" })
    .eq("id", applicationId);
  if (statusError) return { ok: false, error: statusError.message };
  return { ok: true };
}

export async function approveApplication(
  applicationId: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "Supabase is not configured." };
  const { error } = await supabase
    .from("applications")
    .update({ status: "approved", decided_at: new Date().toISOString() })
    .eq("id", applicationId);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
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

/** A completed evaluator review, including the final summary for adjudication. */
export interface ApplicationEvaluationRow {
  id: string;
  application_id: string;
  evaluator_id: string;
  evaluator_name: string | null;
  scores: Record<string, number>;
  weighted_score: number | null;
  recommendation: "fund" | "revise" | "decline" | null;
  comments: string | null;
  submitted_at: string | null;
}

export interface AdjudicationReportRow extends ApplicationEvaluationRow {
  application_title: string;
  application_reference: string;
  application_status: string;
}

function mapEvaluationRow(row: Record<string, any>): ApplicationEvaluationRow {
  const evaluator = Array.isArray(row.evaluator) ? row.evaluator[0] : row.evaluator;
  return {
    id: row.id,
    application_id: row.application_id,
    evaluator_id: row.evaluator_id,
    evaluator_name: evaluator?.full_name ?? null,
    scores: (row.scores ?? {}) as Record<string, number>,
    weighted_score: row.weighted_score == null ? null : Number(row.weighted_score),
    recommendation: row.recommendation ?? null,
    comments: row.comments ?? null,
    submitted_at: row.submitted_at ?? null,
  };
}

/** Submitted evaluation reports for one application. */
export async function loadApplicationEvaluations(
  applicationId: string,
): Promise<ApplicationEvaluationRow[]> {
  if (!supabase || !applicationId) return [];
  const { data, error } = await supabase
    .from("evaluations")
    .select(
      "id, application_id, evaluator_id, scores, weighted_score, recommendation, comments, submitted_at, evaluator:profiles!evaluator_id(full_name)",
    )
    .eq("application_id", applicationId)
    .not("submitted_at", "is", null)
    .order("submitted_at", { ascending: false });
  if (error) {
    console.warn("[portal] Could not load evaluation reports:", error.message);
    return [];
  }
  return ((data ?? []) as Record<string, any>[]).map(mapEvaluationRow);
}

/** Every submitted report, for the adjudicator dashboard. */
export async function loadAdjudicationReports(): Promise<AdjudicationReportRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("evaluations")
    .select(
      "id, application_id, evaluator_id, scores, weighted_score, recommendation, comments, submitted_at, evaluator:profiles!evaluator_id(full_name), application:applications(title, reference, status)",
    )
    .not("submitted_at", "is", null)
    .order("submitted_at", { ascending: false })
    .limit(50);
  if (error) {
    console.warn("[portal] Could not load adjudication reports:", error.message);
    return [];
  }
  return ((data ?? []) as Record<string, any>[]).map((row) => {
    const application = Array.isArray(row.application) ? row.application[0] : row.application;
    return {
      ...mapEvaluationRow(row),
      application_title: application?.title ?? "Untitled application",
      application_reference: application?.reference ?? "—",
      application_status: application?.status ?? "submitted",
    };
  });
}

/**
 * Save the evaluator's scored report. The assignment row is the anchor, so a
 * reviewer can revise their report before adjudication without duplicating it.
 */
export async function submitEvaluation(input: {
  applicationId: string;
  scores: Record<string, number>;
  weightedScore: number;
  recommendation: "fund" | "revise" | "decline";
  comments: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "Supabase is not configured." };
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return { ok: false, error: "Sign in again to submit your report." };

  const { data: assignment, error: assignmentError } = await supabase
    .from("evaluation_assignments")
    .select("id")
    .eq("application_id", input.applicationId)
    .eq("evaluator_id", userId)
    .maybeSingle();
  if (assignmentError) return { ok: false, error: assignmentError.message };
  if (!assignment) {
    return { ok: false, error: "This application is not assigned to you for evaluation." };
  }

  const { error } = await supabase.from("evaluations").upsert(
    {
      assignment_id: assignment.id,
      application_id: input.applicationId,
      evaluator_id: userId,
      scores: input.scores,
      weighted_score: Number(input.weightedScore.toFixed(2)),
      recommendation: input.recommendation,
      comments: input.comments.trim() || null,
      submitted_at: new Date().toISOString(),
    },
    { onConflict: "assignment_id" },
  );
  if (error) return { ok: false, error: error.message };

  // Mark the assignment complete for the queue; RLS allows the assigned reviewer.
  await supabase
    .from("evaluation_assignments")
    .update({ status: "submitted" })
    .eq("id", assignment.id);

  // Put the report in front of every adjudicator without changing their queue.
  const { data: adjudicators } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "adjudicator");
  if (adjudicators?.length) {
    await supabase.from("notifications").insert(
      adjudicators.map((adjudicator) => ({
        user_id: adjudicator.id,
        title: "New evaluator report",
        body: "A scored report is ready for adjudication.",
        link: `/application?id=${input.applicationId}`,
      })),
    );
  }

  void import("./audit").then(({ logAudit }) =>
    logAudit({
      action: "evaluation.submitted",
      entityTable: "evaluations",
      entityId: input.applicationId,
      metadata: { weighted_score: input.weightedScore, recommendation: input.recommendation },
    }),
  );

  return { ok: true };
}

/** Adjudicator decision: updates the application, leaves feedback and notifies the innovator. */
export async function decideApplication(input: {
  applicationId: string;
  decision: "approved" | "rejected";
  feedback: string;
  authorRole: "adjudicator" | "admin";
}): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "Supabase is not configured." };
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return { ok: false, error: "Sign in again to record a decision." };

  const { data: application, error: readError } = await supabase
    .from("applications")
    .select("innovator_id, title, reference")
    .eq("id", input.applicationId)
    .maybeSingle();
  if (readError) return { ok: false, error: readError.message };
  if (!application) return { ok: false, error: "Application not found." };

  const note = input.feedback.trim();
  const { error: updateError } = await supabase
    .from("applications")
    .update({
      status: input.decision,
      decision_note: note || null,
      decided_at: new Date().toISOString(),
    })
    .eq("id", input.applicationId);
  if (updateError) return { ok: false, error: updateError.message };

  if (note) {
    await supabase.from("feedback_comments").insert({
      application_id: input.applicationId,
      author_id: userId,
      author_role: input.authorRole,
      body: note,
      status: "unread",
      visible_to_innovator: true,
    });
  }

  await supabase.from("notifications").insert({
    user_id: application.innovator_id,
    title: input.decision === "approved" ? "Application approved" : "Application declined",
    body:
      note ||
      `${application.reference} has been ${input.decision === "approved" ? "approved" : "declined"}.`,
    link: `/application?id=${input.applicationId}`,
  });

  void import("./audit").then(({ logAudit }) =>
    logAudit({
      action: `application.${input.decision}`,
      entityTable: "applications",
      entityId: input.applicationId,
      metadata: { reference: application.reference },
    }),
  );

  return { ok: true };
}
