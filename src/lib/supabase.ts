import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase browser client.
 *
 * Uses the new publishable key (`sb_publishable_...`). Supabase is retiring the
 * legacy `anon` JWT keys by the end of 2026, so the anon variable is only kept
 * as a temporary fallback for an older .env.
 *
 * Only variables prefixed with VITE_ reach the browser. The secret key
 * (`sb_secret_...`) must never be added here — it bypasses Row Level Security.
 */
const env = import.meta.env as unknown as Record<string, string | undefined>;

const supabaseUrl = env.VITE_SUPABASE_URL?.trim();
const supabaseKey = (
  env.VITE_SUPABASE_PUBLISHABLE_KEY ?? env.VITE_SUPABASE_ANON_KEY
)?.trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/** Throws a readable error instead of a null dereference when env is missing. */
export function requireSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and " +
        "VITE_SUPABASE_PUBLISHABLE_KEY to .env.local, then restart the dev server.",
    );
  }
  return supabase;
}

/** Lightweight connectivity probe for a "is the backend wired?" check. */
export async function pingSupabase(): Promise<
  { ok: true } | { ok: false; error: string }
> {
  if (!supabase) return { ok: false, error: "not-configured" };
  const { error } = await supabase
    .from("rubric_criteria")
    .select("key")
    .limit(1);
  return error ? { ok: false, error: error.message } : { ok: true };
}
