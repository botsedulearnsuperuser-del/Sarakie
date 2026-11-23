import { requireSupabase, supabase } from "./supabase";
import { session } from "./auth";

export interface EvaluatorAccount {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  created_at: string;
  assignments: number;
}

export interface EvaluatorInvitation {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  organization: string | null;
  status: "pending" | "invited" | "accepted" | "revoked";
  created_at: string;
  accepted_at: string | null;
  user_id: string | null;
}

export interface EvaluatorDirectory {
  accounts: EvaluatorAccount[];
  invitations: EvaluatorInvitation[];
}

/** Administrators can read every evaluator profile and invitation. */
export async function loadEvaluatorDirectory(): Promise<EvaluatorDirectory> {
  const db = requireSupabase();
  const [profiles, assignments, invitations] = await Promise.all([
    db
      .from("profiles")
      .select("id, full_name, email, phone, organization, created_at")
      .eq("role", "evaluator")
      .order("full_name"),
    db.from("evaluation_assignments").select("evaluator_id"),
    db
      .from("evaluator_invitations")
      .select("id, email, full_name, phone, organization, status, created_at, accepted_at, user_id")
      .order("created_at", { ascending: false }),
  ]);

  if (profiles.error) throw new Error(profiles.error.message);
  if (invitations.error) throw new Error(invitations.error.message);

  const counts = new Map<string, number>();
  for (const row of assignments.data ?? []) {
    const id = (row as { evaluator_id: string }).evaluator_id;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }

  return {
    accounts: (profiles.data ?? []).map((row) => ({
      ...(row as Omit<EvaluatorAccount, "assignments">),
      assignments: counts.get(row.id) ?? 0,
    })),
    invitations: (invitations.data ?? []) as EvaluatorInvitation[],
  };
}

async function callAdminEndpoint<T>(payload: Record<string, unknown>): Promise<T> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const token = session.value?.access_token;
  if (!token) throw new Error("Sign in as an administrator or adjudicator first.");

  const response = await fetch("/api/admin-evaluators", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    throw new Error(data.error || "The evaluator request failed.");
  }
  return data;
}

export function inviteEvaluator(input: {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
}) {
  return callAdminEndpoint<{ ok: true; emailSent: boolean; message: string }>({
    action: "invite",
    ...input,
  });
}

export function removeEvaluator(userId: string) {
  return callAdminEndpoint<{ ok: true; message: string }>({
    action: "remove",
    userId,
  });
}

/** Admin action on a still-pending invitation. */
export async function revokeInvitation(id: string): Promise<void> {
  const db = requireSupabase();
  const { error } = await db
    .from("evaluator_invitations")
    .update({ status: "revoked" })
    .eq("id", id);
  if (error) throw new Error(error.message);
}
