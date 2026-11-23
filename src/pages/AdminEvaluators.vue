<template>
  <div :class="$style.page">
    <Main :active-page="'admin-evaluators'" :role="viewerRole" />

    <main :class="$style.mainContent">
      <header :class="$style.header">
        <div>
          <h1 :class="$style.title">Evaluator accounts</h1>
          <p :class="$style.subtitle">
            Invite evaluators, review who has access, and remove access when a reviewer leaves.
          </p>
        </div>
        <router-link to="/profile" :class="$style.userChip">
          <img :class="$style.avatar" src="/innovator-man.webp" :alt="displayName" />
          <span>{{ displayName }}</span>
        </router-link>
      </header>

      <p v-if="error" :class="$style.alertError" role="alert">{{ error }}</p>
      <p v-if="notice" :class="$style.alertOk" role="status">{{ notice }}</p>

      <section :class="$style.stats">
        <div :class="$style.stat">
          <span :class="$style.statValue">{{ accounts.length }}</span>
          <span :class="$style.statLabel">Active evaluators</span>
        </div>
        <div :class="$style.stat">
          <span :class="$style.statValue">{{ pending.length }}</span>
          <span :class="$style.statLabel">Invitations awaiting acceptance</span>
        </div>
        <div :class="$style.stat">
          <span :class="$style.statValue">{{ totalAssignments }}</span>
          <span :class="$style.statLabel">Assigned reviews</span>
        </div>
      </section>

      <div :class="$style.columns">
        <section :class="$style.card">
          <h2 :class="$style.cardTitle">Add an evaluator</h2>
          <p :class="$style.cardSub">
            Administrators and adjudicators can create evaluator accounts. Supabase sends the
            invitation email to the address you enter.
          </p>

          <form :class="$style.form" @submit.prevent="submitInvite">
            <label :class="$style.field">
              <span :class="$style.label">Full name <em>*</em></span>
              <input
                v-model="form.fullName"
                :class="$style.input"
                type="text"
                autocomplete="name"
                placeholder="e.g. Naledi Kgosi"
                required
              />
            </label>

            <label :class="$style.field">
              <span :class="$style.label">Work email <em>*</em></span>
              <input
                v-model="form.email"
                :class="$style.input"
                type="email"
                autocomplete="email"
                placeholder="name@organisation.co.bw"
                required
              />
            </label>

            <div :class="$style.fieldRow">
              <label :class="$style.field">
                <span :class="$style.label">Phone</span>
                <input
                  v-model="form.phone"
                  :class="$style.input"
                  type="tel"
                  autocomplete="tel"
                  placeholder="+267 7x xxx xxx"
                />
              </label>
              <label :class="$style.field">
                <span :class="$style.label">Organisation</span>
                <input
                  v-model="form.organization"
                  :class="$style.input"
                  type="text"
                  placeholder="e.g. CEDA"
                />
              </label>
            </div>

            <button :class="$style.primary" type="submit" :disabled="sending">
              {{ sending ? "Sending invitation…" : "Send invitation email" }}
            </button>
            <p :class="$style.hint">
              The email uses the Supabase <b>Invite user</b> template. Configure Gmail SMTP under
              Authentication → Emails before inviting real evaluators.
            </p>
          </form>
        </section>

        <section :class="$style.card">
          <h2 :class="$style.cardTitle">Email the evaluator will receive</h2>
          <p :class="$style.cardSub">
            Paste this into the Supabase <b>Invite user</b> template. Keep
                          <code>{{ confirmationToken }}</code> so the acceptance link works.
          </p>
          <div :class="$style.mailPreview">
            <div :class="$style.mailHead">
              <span :class="$style.mailLabel">Subject</span>
              <p :class="$style.mailSubject">You've been added as a CEDA evaluator</p>
            </div>
            <div :class="$style.mailBody">
              <p>Hello {{ fullNameToken }},</p>
              <p>
                The CEDA administrator has added you as an evaluator on the CEDA Innovation Portal.
              </p>
              <p>Use the button below to accept the invitation and sign in.</p>
              <p :class="$style.mailButton">Accept invitation</p>
              <p>
                Once you are signed in, open your profile to set a password. You will only see the
                applications assigned to you, and innovator identities stay hidden until
                adjudication.
              </p>
              <p>
                If you were not expecting this invitation, contact CEDA on +267 77 663 331.
              </p>
              <p>— CEDA Innovation Portal</p>
            </div>
          </div>
          <pre :class="$style.mailSource">{{ emailTemplate }}</pre>
        </section>
      </div>

      <section :class="$style.card">
        <div :class="$style.cardHead">
          <div>
            <h2 :class="$style.cardTitle">Evaluators with access</h2>
            <p :class="$style.cardSub">Everyone here can sign in and open assigned applications.</p>
          </div>
          <button :class="$style.ghost" type="button" :disabled="loading" @click="load">
            {{ loading ? "Refreshing…" : "Refresh" }}
          </button>
        </div>

        <div v-if="!accounts.length" :class="$style.empty">
          No evaluator accounts yet. Invite the first one above.
        </div>
        <div v-else :class="$style.tableWrap">
          <table :class="$style.table">
            <thead>
              <tr>
                <th>Evaluator</th>
                <th>Contact</th>
                <th>Organisation</th>
                <th>Reviews</th>
                <th>Added</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="account in accounts" :key="account.id">
                <td>
                  <span :class="$style.name">{{ account.full_name || "Unnamed evaluator" }}</span>
                  <span :class="$style.meta">{{ account.email }}</span>
                </td>
                <td>{{ account.phone || "—" }}</td>
                <td>{{ account.organization || "—" }}</td>
                <td>{{ account.assignments }}</td>
                <td>{{ formatDate(account.created_at) }}</td>
                <td :class="$style.cellAction">
                  <button
                    :class="$style.dangerGhost"
                    type="button"
                    :disabled="busyId === account.id"
                    @click="remove(account)"
                  >
                    {{ busyId === account.id ? "Removing…" : "Remove access" }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section :class="$style.card">
        <div :class="$style.cardHead">
          <div>
            <h2 :class="$style.cardTitle">Invitations</h2>
            <p :class="$style.cardSub">Pending invitations can be revoked before they are accepted.</p>
          </div>
        </div>

        <div v-if="!invitations.length" :class="$style.empty">No invitations have been sent yet.</div>
        <div v-else :class="$style.tableWrap">
          <table :class="$style.table">
            <thead>
              <tr>
                <th>Invited</th>
                <th>Email</th>
                <th>Status</th>
                <th>Sent</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="invite in invitations" :key="invite.id">
                <td :class="$style.name">{{ invite.full_name }}</td>
                <td>{{ invite.email }}</td>
                <td>
                  <span :class="[$style.badge, $style[invite.status]]">{{ statusLabel(invite.status) }}</span>
                </td>
                <td>{{ formatDate(invite.created_at) }}</td>
                <td :class="$style.cellAction">
                  <button
                    v-if="invite.status === 'pending'"
                    :class="$style.ghost"
                    type="button"
                    :disabled="busyId === invite.id"
                    @click="resend(invite)"
                  >
                    {{ busyId === invite.id ? "Sending…" : "Send email" }}
                  </button>
                  <button
                    v-if="invite.status === 'pending'"
                    :class="$style.dangerGhost"
                    type="button"
                    :disabled="busyId === invite.id"
                    @click="revoke(invite)"
                  >
                    Revoke
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from "vue";
  import { useRouter } from "vue-router";
  import Main from "../components/Main.vue";
  import { authReady, currentRole, dashboardForRole, displayName } from "../lib/auth";
  import {
    inviteEvaluator,
    loadEvaluatorDirectory,
    removeEvaluator,
    revokeInvitation,
    type EvaluatorAccount,
    type EvaluatorInvitation,
  } from "../lib/evaluator-admin";

  const router = useRouter();
  const accounts = ref<EvaluatorAccount[]>([]);
  const invitations = ref<EvaluatorInvitation[]>([]);
  const loading = ref(true);
  const sending = ref(false);
  const busyId = ref("");
  const error = ref("");
  const notice = ref("");

  const viewerRole = computed(() =>
    currentRole.value === "adjudicator" ? "adjudicator" : "admin",
  );
  const form = reactive({ fullName: "", email: "", phone: "", organization: "" });
  const confirmationToken = "{{ .ConfirmationURL }}";
  const fullNameToken = "{{ .Data.full_name }}";

  const pending = computed(() => invitations.value.filter((i) => i.status === "pending"));
  const totalAssignments = computed(() => accounts.value.reduce((sum, a) => sum + a.assignments, 0));

  const emailTemplate = `<h2>You've been added as a CEDA evaluator</h2>
<p>Hello {{ .Data.full_name }},</p>
<p>The CEDA administrator has added you as an evaluator on the CEDA Innovation Portal.</p>
<p>Use the button below to accept the invitation and sign in.</p>
<p><a href="{{ .ConfirmationURL }}">Accept invitation</a></p>
<p>Once you are signed in, open your profile to set a password. You will only see the applications assigned to you, and innovator identities stay hidden until adjudication.</p>
<p>If you were not expecting this invitation, contact CEDA on +267 77 663 331.</p>
<p>— CEDA Innovation Portal</p>`;

  function statusLabel(status: EvaluatorInvitation["status"]) {
    return status === "invited"
      ? "Email sent"
      : status === "accepted"
        ? "Active"
        : status === "revoked"
          ? "Revoked"
          : "Sending";
  }

  function formatDate(value: string) {
    return new Date(value).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  async function load() {
    loading.value = true;
    error.value = "";
    try {
      const directory = await loadEvaluatorDirectory();
      accounts.value = directory.accounts;
      invitations.value = directory.invitations;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Could not load evaluator accounts.";
    } finally {
      loading.value = false;
    }
  }

  async function submitInvite() {
    error.value = "";
    notice.value = "";
    if (!form.fullName.trim() || !form.email.trim()) {
      error.value = "Enter the evaluator's full name and email.";
      return;
    }
    sending.value = true;
    try {
      const result = await inviteEvaluator({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        organization: form.organization,
      });
      notice.value = result.message;
      form.fullName = "";
      form.email = "";
      form.phone = "";
      form.organization = "";
      await load();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "The invitation could not be sent.";
    } finally {
      sending.value = false;
    }
  }

  async function remove(account: EvaluatorAccount) {
    const label = account.full_name || account.email;
    if (!window.confirm(`Remove evaluator access for ${label}? Their review assignments will be cleared.`)) {
      return;
    }
    error.value = "";
    notice.value = "";
    busyId.value = account.id;
    try {
      const result = await removeEvaluator(account.id);
      notice.value = result.message;
      await load();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Could not remove the evaluator.";
    } finally {
      busyId.value = "";
    }
  }

  async function resend(invite: EvaluatorInvitation) {
    error.value = "";
    notice.value = "";
    busyId.value = invite.id;
    try {
      const result = await inviteEvaluator({
        fullName: invite.full_name,
        email: invite.email,
        phone: invite.phone ?? "",
        organization: invite.organization ?? "",
      });
      notice.value = result.message;
      await load();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "The invitation email could not be sent.";
    } finally {
      busyId.value = "";
    }
  }

  async function revoke(invite: EvaluatorInvitation) {
    if (!window.confirm(`Revoke the invitation to ${invite.email}?`)) return;
    error.value = "";
    notice.value = "";
    busyId.value = invite.id;
    try {
      await revokeInvitation(invite.id);
      notice.value = `Invitation to ${invite.email} revoked.`;
      await load();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Could not revoke the invitation.";
    } finally {
      busyId.value = "";
    }
  }

  function guard() {
    if (!authReady.value) return;
    if (currentRole.value !== "admin" && currentRole.value !== "adjudicator") {
      router.replace(dashboardForRole(currentRole.value));
      return;
    }
    void load();
  }

  onMounted(guard);
  watch(authReady, guard);
</script>

<style module>
  .page {
    display: flex;
    width: 100vw;
    height: 100vh;
    background: #faf7f2;
    font-family: var(--font-inter);
    overflow: hidden;
  }
  .mainContent {
    flex: 1;
    min-width: 0;
    height: 100vh;
    overflow-y: auto;
    padding: 28px 36px 56px;
    box-sizing: border-box;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 22px;
  }
  .title {
    margin: 0 0 6px;
    font-size: 36px;
    letter-spacing: -0.84px;
    font-weight: 800;
    color: #1f2d27;
  }
  .subtitle {
    margin: 0;
    max-width: 640px;
    color: #5b6661;
    font-size: 15px;
    line-height: 1.5;
  }
  .userChip {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 5px 14px 5px 5px;
    border: 1px solid #e2ded6;
    border-radius: 999px;
    background: #fff;
    color: #1f2d27;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
  }
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }
  .alertError,
  .alertOk {
    margin: 0 0 18px;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 1.45;
  }
  .alertError {
    background: #fdecea;
    border: 1px solid #f3c2bc;
    color: #8a2318;
  }
  .alertOk {
    background: #e9f6ee;
    border: 1px solid #b7e0c6;
    color: #1c5c35;
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 22px;
  }
  .stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 18px 20px;
    background: #fff;
    border: 1px solid #eae5dc;
    border-radius: 14px;
  }
  .statValue {
    font-size: 30px;
    font-weight: 800;
    color: #1f2d27;
  }
  .statLabel {
    font-size: 13px;
    color: #6a746f;
  }
  .columns {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
    gap: 20px;
    margin-bottom: 22px;
    align-items: start;
  }
  @media (max-width: 1050px) {
    .columns,
    .stats {
      grid-template-columns: 1fr;
    }
  }
  .card {
    background: #fff;
    border: 1px solid #eae5dc;
    border-radius: 16px;
    padding: 22px;
    margin-bottom: 22px;
  }
  .cardHead {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .cardTitle {
    margin: 0 0 4px;
    font-size: 19px;
    font-weight: 750;
    color: #1f2d27;
  }
  .cardSub {
    margin: 0 0 16px;
    font-size: 13px;
    line-height: 1.5;
    color: #6a746f;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .fieldRow {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  @media (max-width: 620px) {
    .fieldRow {
      grid-template-columns: 1fr;
    }
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #5b6661;
  }
  .label em {
    color: #a33b2c;
    font-style: normal;
  }
  .input {
    width: 100%;
    box-sizing: border-box;
    padding: 11px 13px;
    border: 1px solid #ddd7cd;
    border-radius: 9px;
    background: #fff;
    color: #1f2d27;
    font: inherit;
    font-size: 14px;
  }
  .input:focus {
    outline: 2px solid #9a7b3f;
    outline-offset: 1px;
    border-color: #9a7b3f;
  }
  .primary {
    align-self: flex-start;
    padding: 11px 20px;
    border: 0;
    border-radius: 9px;
    background: #1f3d33;
    color: #fff;
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }
  .primary:disabled {
    opacity: 0.6;
    cursor: default;
  }
  .ghost,
  .dangerGhost {
    padding: 8px 14px;
    border-radius: 8px;
    font: inherit;
    font-size: 12px;
    font-weight: 650;
    cursor: pointer;
    background: #fff;
  }
  .ghost {
    border: 1px solid #d8d2c8;
    color: #3c4a43;
  }
  .dangerGhost {
    border: 1px solid #e8b7b0;
    color: #8a2318;
  }
  .ghost:disabled,
  .dangerGhost:disabled {
    opacity: 0.55;
    cursor: default;
  }
  .hint {
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
    color: #7a837e;
  }
  .mailPreview {
    border: 1px solid #e6e0d6;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 14px;
  }
  .mailHead {
    padding: 12px 16px;
    background: #f7f3ec;
    border-bottom: 1px solid #e6e0d6;
  }
  .mailLabel {
    display: block;
    margin-bottom: 3px;
    font-size: 10px;
    font-weight: 750;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #8b928d;
  }
  .mailSubject {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    color: #1f2d27;
  }
  .mailBody {
    padding: 16px;
    font-size: 13px;
    line-height: 1.55;
    color: #3c4a43;
  }
  .mailBody p {
    margin: 0 0 10px;
  }
  .mailButton {
    display: inline-block;
    margin: 4px 0 12px !important;
    padding: 8px 14px;
    border-radius: 6px;
    background: #1f3d33;
    color: #fff;
    font-weight: 700;
  }
  .mailSource {
    max-height: 150px;
    overflow: auto;
    margin: 0;
    padding: 12px;
    border-radius: 9px;
    background: #1e2a25;
    color: #dbe6e0;
    font-size: 11px;
    line-height: 1.5;
    white-space: pre-wrap;
  }
  .tableWrap {
    overflow-x: auto;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    text-align: left;
  }
  .table th {
    padding: 8px 10px;
    border-bottom: 1px solid #eae5dc;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #8b928d;
    white-space: nowrap;
  }
  .table td {
    padding: 12px 10px;
    border-bottom: 1px solid #f0ece4;
    color: #3c4a43;
    vertical-align: top;
  }
  .name {
    display: block;
    font-weight: 650;
    color: #1f2d27;
  }
  .meta {
    display: block;
    margin-top: 2px;
    font-size: 12px;
    color: #7a837e;
  }
  .cellAction {
    text-align: right;
    white-space: nowrap;
  }
  .cellAction button + button {
    margin-left: 6px;
  }
  .badge {
    display: inline-block;
    padding: 3px 9px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
  }
  .pending {
    background: #fdf1d8;
    color: #7a5610;
  }
  .invited {
    background: #e5eefb;
    color: #1e4a80;
  }
  .accepted {
    background: #e9f6ee;
    color: #1c5c35;
  }
  .revoked {
    background: #f1efec;
    color: #6a635c;
  }
  .empty {
    padding: 26px 16px;
    border: 1px dashed #ddd7cd;
    border-radius: 10px;
    color: #7a837e;
    font-size: 13px;
    text-align: center;
  }
</style>
