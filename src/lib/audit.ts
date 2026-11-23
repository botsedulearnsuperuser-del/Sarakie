import { session } from "./auth";
import { supabase } from "./supabase";

export interface AuditEntry {
  action: string;
  entityTable?: string | null;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
}

/** Record a key activity in the audit trail. Best-effort, never throws. */
export async function logAudit(entry: AuditEntry): Promise<void> {
  if (!supabase || !session.value?.user) return;
  try {
    await supabase.from("audit_log").insert({
      actor_id: session.value.user.id,
      action: entry.action,
      entity_table: entry.entityTable ?? null,
      entity_id: entry.entityId ?? null,
      metadata: entry.metadata ?? {},
    });
  } catch (err) {
    // Audit logging must never break the user flow.
    console.warn("[audit] failed to record:", err);
  }
}