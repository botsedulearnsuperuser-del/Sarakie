import { computed, ref } from "vue";
import { session } from "./auth";
import { supabase } from "./supabase";

/**
 * Real TOTP two-factor authentication, backed by Supabase Auth.
 *
 * Enrolling creates a factor in `auth.mfa_factors` and returns a genuine
 * `otpauth://` secret, so Google Authenticator, Microsoft Authenticator, Authy,
 * 1Password and any other RFC 6238 app works. Verifying a code upgrades the
 * session from AAL1 (password only) to AAL2 (password + code), and a session
 * that is still AAL1 while an AAL2 factor exists is held at the code prompt.
 *
 * `profiles.mfa_enabled` mirrors the state so the database itself shows which
 * accounts are protected.
 */

export interface TotpFactorInfo {
  id: string;
  status: string;
  friendlyName: string | null;
}

export const mfaFactors = ref<TotpFactorInfo[]>([]);
export const mfaLoaded = ref(false);
/** The authenticator setup dialog is open (one instance, mounted in App.vue). */
export const mfaSetupOpen = ref(false);

export function openMfaSetup(): void {
  mfaSetupOpen.value = true;
}
/** A signed-in session that still needs its authenticator code. */
export const mfaRequired = ref(false);

export const mfaEnabled = computed(() =>
  mfaFactors.value.some((factor) => factor.status === "verified"),
);

export const verifiedFactor = computed(
  () => mfaFactors.value.find((factor) => factor.status === "verified") ?? null,
);

function errorMessage(error: { message: string }): string {
  const message = error.message ?? "Something went wrong.";
  if (/invalid|not found|expired|challenge/i.test(message)) {
    return "That code is not valid. Check the current code in your authenticator app and try again.";
  }
  if (/factor/i.test(message) && /exist/i.test(message)) {
    return "An authenticator app is already connected to this account.";
  }
  return message;
}

/** Re-read factors and the assurance level. Safe to call often. */
export async function refreshMfa(): Promise<void> {
  if (!supabase) {
    mfaFactors.value = [];
    mfaRequired.value = false;
    mfaLoaded.value = true;
    return;
  }

  const signedIn = Boolean(session.value);
  if (!signedIn) {
    mfaFactors.value = [];
    mfaRequired.value = false;
    mfaLoaded.value = true;
    return;
  }

  const [{ data: listed }, { data: level }] = await Promise.all([
    supabase.auth.mfa.listFactors(),
    supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
  ]);

  mfaFactors.value = (listed?.all ?? [])
    .filter((factor) => factor.factor_type === "totp")
    .map((factor) => ({
      id: factor.id,
      status: factor.status ?? "unverified",
      friendlyName: factor.friendly_name ?? null,
    }));

  mfaRequired.value =
    level?.nextLevel === "aal2" && level?.currentLevel !== "aal2";
  mfaLoaded.value = true;
}

/** Keep `profiles` in step with `auth.mfa_factors`. */
export async function mirrorMfaToProfile(enabled: boolean): Promise<void> {
  const userId = session.value?.user.id;
  if (!supabase || !userId) return;
  const { error } = await supabase
    .from("profiles")
    .update({
      mfa_enabled: enabled,
      mfa_enrolled_at: enabled ? new Date().toISOString() : null,
    })
    .eq("id", userId);
  if (error) {
    console.warn("[mfa] Could not update the profile flag:", error.message);
  }
}

export interface EnrollResult {
  ok: boolean;
  error?: string;
  factorId?: string;
  qrCode?: string;
  secret?: string;
  uri?: string;
}

/** Start (or restart) authenticator setup. Clears half-finished attempts. */
export async function startTotpEnrollment(): Promise<EnrollResult> {
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  // Abandoned setups would otherwise block a fresh QR code for the same app.
  const { data: listed } = await supabase.auth.mfa.listFactors();
  for (const factor of listed?.all ?? []) {
    if (factor.status !== "verified") {
      await supabase.auth.mfa.unenroll({ factorId: factor.id });
    }
  }

  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: "totp",
    friendlyName: "Authenticator app",
  });
  if (error) return { ok: false, error: errorMessage(error) };

  return {
    ok: true,
    factorId: data.id,
    qrCode: data.totp.qr_code,
    secret: data.totp.secret,
    uri: data.totp.uri,
  };
}

/** Check the 6-digit code and, on success, raise the session to AAL2. */
export async function confirmTotpEnrollment(
  factorId: string,
  code: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const { error } = await supabase.auth.mfa.challengeAndVerify({
    factorId,
    code: code.trim(),
  });
  if (error) return { ok: false, error: errorMessage(error) };

  await refreshMfa();
  await mirrorMfaToProfile(true);
  return { ok: true };
}

/** Verify a code for an already-enrolled factor (used by the sign-in gate). */
export async function verifyMfaCode(
  code: string,
): Promise<{ ok: boolean; error?: string }> {
  const factor = verifiedFactor.value;
  if (!factor) {
    return { ok: false, error: "No authenticator app is connected to this account." };
  }
  return confirmTotpEnrollment(factor.id, code);
}

/** Remove the authenticator app and clear the database flag. */
export async function disableTotp(
  factorId: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "Supabase is not configured." };
  const { error } = await supabase.auth.mfa.unenroll({ factorId });
  if (error) return { ok: false, error: errorMessage(error) };
  await refreshMfa();
  await mirrorMfaToProfile(false);
  return { ok: true };
}

/** Split a base32 secret into readable groups for manual entry. */
export function formatSecret(secret: string): string {
  return secret.replace(/\s+/g, "").replace(/(.{4})/g, "$1 ").trim();
}
