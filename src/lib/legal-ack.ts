import { supabase } from "./supabase";

/**
 * Legal acknowledgement helper.
 *
 * The browser remembers the acceptance so the notice never reappears, and any
 * signed-in user also gets a row in `public.legal_acceptances` (append-only,
 * server timestamped) so CEDA can prove when and to which version they agreed.
 */

/** Bump when the terms/privacy copy changes — everyone is asked again. */
export const LEGAL_VERSION = 1;
export const LEGAL_DOCUMENT = "terms-and-privacy";

const STORAGE_KEY = `ceda-legal-ack-v${LEGAL_VERSION}`;

export interface LegalAck {
  version: number;
  acceptedAt: string;
}

export function readLegalAck(): LegalAck | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LegalAck>;
    if (parsed.version !== LEGAL_VERSION || typeof parsed.acceptedAt !== "string") {
      return null;
    }
    return { version: LEGAL_VERSION, acceptedAt: parsed.acceptedAt };
  } catch {
    return null;
  }
}

export function writeLegalAck(ack: LegalAck): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ack));
  } catch {
    // Storage can be blocked; acceptance is still recorded server-side.
  }
}

/** Has this signed-in user already accepted the current version? */
export async function fetchLegalAcceptance(
  userId: string,
): Promise<LegalAck | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("legal_acceptances")
    .select("version, accepted_at")
    .eq("user_id", userId)
    .eq("document", LEGAL_DOCUMENT)
    .eq("version", LEGAL_VERSION)
    .maybeSingle();
  if (error || !data) return null;
  return { version: data.version as number, acceptedAt: data.accepted_at as string };
}

/**
 * Write the acceptance row. `accepted_at` is left to the database default so
 * the timestamp is server-generated and cannot be backdated by the browser.
 */
export async function recordLegalAcceptance(
  userId: string | null | undefined,
  ack: LegalAck,
): Promise<boolean> {
  if (!supabase || !userId) return false;
  const { error } = await supabase.from("legal_acceptances").upsert(
    {
      user_id: userId,
      document: LEGAL_DOCUMENT,
      version: ack.version,
      user_agent: navigator.userAgent.slice(0, 400),
    },
    { onConflict: "user_id,document,version", ignoreDuplicates: true },
  );
  if (error) {
    console.warn("[legal] Could not record acceptance:", error.message);
    return false;
  }
  return true;
}
