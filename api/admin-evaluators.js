import { createClient } from "@supabase/supabase-js";

/**
 * Admin-only evaluator management.
 *
 * Creating an auth user and sending the Supabase invitation email needs the
 * service key, so it can never happen in the browser. Every call is checked
 * against the caller's own access token and profile role before anything runs.
 */
/* Read these inside the request: vite.config.ts loads .env.local after the
   static imports of this module have already been evaluated. */
function serverConfig() {
  return {
    url: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "",
    publishable:
      process.env.SUPABASE_PUBLISHABLE_KEY ||
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY ||
      "",
    secret: process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  };
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function clean(value, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

async function requireAdmin(req) {
  const { url: SUPABASE_URL, publishable: PUBLISHABLE_KEY, secret: SECRET_KEY } = serverConfig();

  if (!SUPABASE_URL || !PUBLISHABLE_KEY || !SECRET_KEY) {
    return { error: "Evaluator invitations are not configured on the server.", status: 503 };
  }

  const header = String(req.headers?.authorization || "");
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return { error: "Sign in as an administrator first.", status: 401 };

  const caller = createClient(SUPABASE_URL, PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: userData, error: userError } = await caller.auth.getUser(token);
  if (userError || !userData?.user) {
    return { error: "Your session has expired. Sign in again.", status: 401 };
  }

  const { data: profile } = await caller
    .from("profiles")
    .select("id, role, full_name, email")
    .eq("id", userData.user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin") {
    return { error: "Only a CEDA administrator can manage evaluator accounts.", status: 403 };
  }

  return {
    admin: createClient(SUPABASE_URL, SECRET_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
    profile,
    user: userData.user,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    send(res, 405, { error: "Method not allowed" });
    return;
  }

  const authorised = await requireAdmin(req);
  if (authorised.error) {
    send(res, authorised.status || 403, { error: authorised.error });
    return;
  }

  const { admin, profile, user } = authorised;
  const body = req.body && typeof req.body === "object" ? req.body : {};
  const action = clean(body.action, 20) || "invite";

  if (action === "invite") {
    const email = clean(body.email, 320).toLowerCase();
    const fullName = clean(body.fullName, 160);
    const phone = clean(body.phone, 40);
    const organization = clean(body.organization, 160);

    if (!fullName) {
      send(res, 400, { error: "Enter the evaluator's full name." });
      return;
    }
    if (!isEmail(email)) {
      send(res, 400, { error: "Enter a valid email address." });
      return;
    }

    // Someone already in the portal can be promoted instead of invited again.
    const { data: existing } = await admin
      .from("profiles")
      .select("id, role, full_name, email")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      if (existing.role === "admin") {
        send(res, 400, { error: "That email belongs to the administrator account." });
        return;
      }
      if (existing.role === "evaluator") {
        send(res, 409, { error: `${existing.full_name || email} is already an evaluator.` });
        return;
      }

      const { error: promoteError } = await admin
        .from("profiles")
        .update({ role: "evaluator", full_name: fullName || existing.full_name, phone: phone || null, organization: organization || null })
        .eq("id", existing.id);
      if (promoteError) {
        send(res, 500, { error: promoteError.message });
        return;
      }

      await admin.from("evaluator_invitations").insert({
        email,
        full_name: fullName,
        phone: phone || null,
        organization: organization || null,
        status: "accepted",
        invited_by: profile.id,
        user_id: existing.id,
        accepted_at: new Date().toISOString(),
      });

      send(res, 200, {
        ok: true,
        emailSent: false,
        promoted: true,
        userId: existing.id,
        message: "Existing portal account promoted to evaluator. No signup email was needed.",
      });
      return;
    }

    // A pending invitation lets the signup trigger assign the evaluator role.
    const { data: pending } = await admin
      .from("evaluator_invitations")
      .select("id")
      .eq("email", email)
      .in("status", ["pending", "invited"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const inviteRow = {
      email,
      full_name: fullName,
      phone: phone || null,
      organization: organization || null,
      status: "pending",
      invited_by: profile.id,
    };

    const { data: invitation, error: inviteRowError } = pending
      ? await admin
          .from("evaluator_invitations")
          .update(inviteRow)
          .eq("id", pending.id)
          .select("id")
          .maybeSingle()
      : await admin
          .from("evaluator_invitations")
          .insert(inviteRow)
          .select("id")
          .maybeSingle();

    if (inviteRowError) {
      send(res, 500, { error: inviteRowError.message });
      return;
    }

    const origin = String(req.headers?.origin || "").replace(/\/$/, "");
    const redirectTo = /^https?:\/\//.test(origin) ? `${origin}/reset-password` : undefined;

    const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(
      email,
      {
        data: { full_name: fullName, phone, organization, invited_by: user.id },
        ...(redirectTo ? { redirectTo } : {}),
      },
    );

    if (inviteError) {
      send(res, 502, {
        error: `Invitation saved, but Supabase could not send the email: ${inviteError.message}`,
        invitationId: invitation?.id ?? null,
      });
      return;
    }

    if (invitation?.id) {
      await admin
        .from("evaluator_invitations")
        .update({ status: "invited", last_sent_at: new Date().toISOString(), user_id: invited?.user?.id ?? null })
        .eq("id", invitation.id);
    }

    send(res, 200, {
      ok: true,
      emailSent: true,
      userId: invited?.user?.id ?? null,
      message: `Invitation email sent to ${email}.`,
    });
    return;
  }

  if (action === "remove") {
    const userId = clean(body.userId, 64);
    if (!userId) {
      send(res, 400, { error: "Choose an evaluator to remove." });
      return;
    }

    const { data: target } = await admin
      .from("profiles")
      .select("id, role, full_name, email")
      .eq("id", userId)
      .maybeSingle();

    if (!target) {
      send(res, 404, { error: "That account no longer exists." });
      return;
    }
    if (target.role === "admin" || target.id === user.id) {
      send(res, 400, { error: "The administrator account cannot be removed here." });
      return;
    }

    const { error: assignmentsError } = await admin
      .from("evaluation_assignments")
      .delete()
      .eq("evaluator_id", userId);
    if (assignmentsError) {
      send(res, 500, { error: assignmentsError.message });
      return;
    }

    const { error: demoteError } = await admin
      .from("profiles")
      .update({ role: "innovator" })
      .eq("id", userId);
    if (demoteError) {
      send(res, 500, { error: demoteError.message });
      return;
    }

    await admin
      .from("evaluator_invitations")
      .update({ status: "revoked" })
      .eq("user_id", userId);

    send(res, 200, {
      ok: true,
      message: `${target.full_name || target.email} no longer has evaluator access. Their account remains as an innovator account.`,
    });
    return;
  }

  send(res, 400, { error: "Unknown action." });
}
