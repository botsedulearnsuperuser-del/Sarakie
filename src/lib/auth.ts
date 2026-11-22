import { computed, ref } from "vue";
import type { Session, User } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "./supabase";

export type AppRole = "innovator" | "evaluator" | "admin";

export interface UserProfile {
  id: string;
  role: AppRole;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  organization: string | null;
}

/** Shared, reactive auth state for every page. */
export const session = ref<Session | null>(null);
export const profile = ref<UserProfile | null>(null);
export const authReady = ref(false);
export const authError = ref("");

const VALID_ROLES: AppRole[] = ["innovator", "evaluator", "admin"];

function asRole(value: unknown): AppRole | null {
  return typeof value === "string" && (VALID_ROLES as string[]).includes(value)
    ? (value as AppRole)
    : null;
}

function roleFromUser(user: User | null | undefined): AppRole | null {
  return asRole(user?.user_metadata?.role) ?? asRole(user?.app_metadata?.role);
}

async function loadProfile(user: User | null) {
  if (!supabase || !user) {
    profile.value = null;
    return;
  }
  const { data } = await supabase
    .from("profiles")
    .select("id, role, full_name, email, phone, city, organization")
    .eq("id", user.id)
    .maybeSingle();

  profile.value = data
    ? { ...data, role: asRole(data.role) ?? "innovator" }
    : {
        id: user.id,
        role: roleFromUser(user) ?? "innovator",
        full_name: (user.user_metadata?.full_name as string) ?? null,
        email: user.email ?? null,
        phone: (user.user_metadata?.phone as string) ?? null,
        city: null,
        organization: null,
      };
}

/** Current role: profile row first, then auth metadata, then innovator. */
export const currentRole = computed<AppRole>(
  () => profile.value?.role ?? roleFromUser(session.value?.user) ?? "innovator",
);

export const displayName = computed(
  () => profile.value?.full_name ?? (session.value?.user.user_metadata?.full_name as string) ?? "Innovator",
);

export function dashboardForRole(role: AppRole): string {
  if (role === "admin") return "/admin-dashboard";
  if (role === "evaluator") return "/evaluator-dashboard";
  return "/innovator-dashboard";
}

let initialised = false;

/** Restore the stored session once, then keep the state in sync. */
export async function initAuth(): Promise<void> {
  if (initialised || !supabase) {
    authReady.value = true;
    return;
  }
  initialised = true;

  const { data } = await supabase.auth.getSession();
  session.value = data.session;
  await loadProfile(data.session?.user ?? null);
  authReady.value = true;

  supabase.auth.onAuthStateChange(async (_event, next) => {
    session.value = next;
    await loadProfile(next?.user ?? null);
    authReady.value = true;
  });
}

export async function signInWithPassword(
  identifier: string,
  password: string,
): Promise<{ ok: boolean; error?: string; role?: AppRole }> {
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const email = identifier.trim();
  if (!email.includes("@")) {
    return { ok: false, error: "Please sign in with your email address." };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };

  session.value = data.session ?? null;
  await loadProfile(data.user ?? null);
  return { ok: true, role: currentRole.value };
}

export async function signUpWithPassword(input: {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<{ ok: boolean; error?: string; needsConfirmation?: boolean }> {
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const { data, error } = await supabase.auth.signUp({
    email: input.email.trim(),
    password: input.password,
    options: {
      data: {
        full_name: input.fullName.trim(),
        role: "innovator",
        phone: input.phone?.trim() || null,
      },
    },
  });
  if (error) return { ok: false, error: error.message };

  // With email confirmation switched on, Supabase returns a user but no session.
  if (!data.session) return { ok: true, needsConfirmation: true };

  session.value = data.session;
  await loadProfile(data.user ?? null);
  return { ok: true };
}

export async function signOutNow(): Promise<void> {
  if (supabase) await supabase.auth.signOut();
  session.value = null;
  profile.value = null;
}

export { isSupabaseConfigured };
