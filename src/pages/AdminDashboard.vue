<template>
  <div :class="[$style.page, isGaborone ? $style.isGaborone : '']" :style="pageBackground">
    <Main :active-page="'admin'" :role="viewerRole" />

    <main :class="$style.mainContent">
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <div :class="$style.titleRow">
              <h2 :class="$style.dumelaMarion">
                {{ viewerRole === "adjudicator" ? "Adjudicator overview" : "Admin overview" }}
              </h2>
            </div>
          </div>
          <div :class="$style.pWrap">
            <div :class="$style.sunday4October">
              {{ viewerRole === "adjudicator"
                ? "Evaluator reports, decisions and the applications behind them"
                : "Agency-wide view of submissions, reviewers and decisions" }}
            </div>
          </div>
        </div>
        <div :class="$style.div3">
          <router-link to="/admin/evaluators" :class="$style.manageLink">Manage evaluators</router-link>
          <img :class="$style.notifications2New" alt="" src="/Notifications-2-new.svg" />
          <img :class="$style.notifications2New" alt="" src="/Help.svg" />
          <router-link to="/profile" :class="$style.userA" style="text-decoration: none;">
            <img :class="$style.userAvatarImg" src="/innovator-man.webp" :alt="displayName" />
            <div :class="$style.span3">
              <div :class="$style.marionLucas">{{ displayName }}</div>
            </div>
          </router-link>
        </div>
      </header>

      <section :class="$style.stats">
        <div v-for="stat in stats" :key="stat.label" :class="$style.statCard">
          <span :class="$style.statValue">{{ stat.value }}</span>
          <span :class="$style.statLabel">{{ stat.label }}</span>
        </div>
      </section>

      <section :class="$style.reportPanel">
        <div :class="[$style.panelHead, $style.reportHead]">
          <div>
            <h3 :class="$style.panelTitle">Evaluator reports to adjudicate</h3>
            <p :class="$style.panelSub">
              Final summaries, scores and comments submitted by evaluators
            </p>
          </div>
          <span :class="$style.reportCount">{{ reports.length }} submitted</span>
        </div>

        <div v-if="reports.length === 0" :class="$style.reportEmpty">
          No evaluator reports have been submitted yet.
        </div>
        <div v-else :class="$style.reportList">
          <button
            v-for="report in reports"
            :key="report.id"
            :class="$style.reportRow"
            type="button"
            @click="openReport(report)"
          >
            <span :class="$style.reportMain">
              <span :class="$style.reportTitle">{{ report.application_title }}</span>
              <span :class="$style.reportMeta">
                {{ report.application_reference }} · {{ report.evaluator_name || "Evaluator" }}
              </span>
            </span>
            <span :class="$style.reportScore">
              {{ report.weighted_score ?? "—" }}<small>/100</small>
            </span>
            <span
              :class="[
                $style.badge,
                report.recommendation === 'fund'
                  ? $style.ok
                  : report.recommendation === 'decline'
                    ? $style.warn
                    : $style.neutral,
              ]"
            >
              {{ recommendationLabel(report.recommendation) }}
            </span>
            <span :class="$style.reportOpen">Open →</span>
          </button>
        </div>
      </section>

      <div :class="$style.panels">
        <section :class="$style.panel">
          <div :class="$style.panelHead">
            <div>
              <h3 :class="$style.panelTitle">Applications needing action</h3>
              <p :class="$style.panelSub">Oldest in the queue first · every stage is assigned</p>
            </div>
          </div>

          <div :class="$style.table">
            <div :class="$style.tableHead">
              <span>Applicant</span>
              <span>Type</span>
              <span>Stage</span>
              <span>Officer</span>
            </div>
            <div v-for="row in applications" :key="row.id" :class="$style.row">
              <span :class="$style.cellStrong">
                <span :class="$style.ideaTitle">{{ row.applicant }}</span>
                <span :class="$style.ideaMeta">{{ row.amount }} · {{ row.updated }}</span>
              </span>
              <span :class="$style.cell">{{ row.type }}</span>
              <span :class="$style.cell">
                <span :class="[$style.badge, $style[row.tone]]">{{ row.stage }}</span>
              </span>
              <span :class="$style.cell">{{ row.officer }}</span>
            </div>
          </div>
        </section>

        <section :class="$style.panel">
          <div :class="$style.panelHead">
            <div>
              <h3 :class="$style.panelTitle">Audit trail</h3>
              <p :class="$style.panelSub">Every action is attributed and time-stamped</p>
            </div>
          </div>

          <div :class="$style.trail">
            <div v-for="entry in auditTrail" :key="entry.id" :class="$style.trailRow">
              <span :class="$style.trailTime">{{ entry.time }}</span>
              <span :class="$style.trailBody">
                <span :class="$style.trailAction">{{ entry.action }}</span>
                <span :class="$style.trailMeta">{{ entry.actor }} · {{ entry.ip }}</span>
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed } from "vue";
  import Main from "../components/Main.vue";
  import { usePageTheme } from "../composables/usePageTheme";
  import { THEME_EVENT, isGaboroneTheme } from "../components/themes";
  import { authReady, currentRole, displayName, session } from "../lib/auth";
  import {
    loadAdjudicationReports,
    loadAllApplications,
    loadAuditLog,
    countInnovators,
    statusLabel,
    type AdjudicationReportRow,
    type AdminApplicationRow,
    type AuditLogRow,
  } from "../lib/portal-data";
  import { watch } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const viewerRole = computed(() =>
    currentRole.value === "adjudicator" ? "adjudicator" : "admin",
  );

  const pageBackground = usePageTheme();
  const isGaborone = ref(isGaboroneTheme());
  function syncTheme() {
    isGaborone.value = isGaboroneTheme();
  }
  onMounted(() => window.addEventListener(THEME_EVENT, syncTheme));
  onUnmounted(() => window.removeEventListener(THEME_EVENT, syncTheme));

  // ── Live data ──
  const apps = ref<AdminApplicationRow[]>([]);
  const audit = ref<AuditLogRow[]>([]);
  const innovatorCount = ref(0);
  const reports = ref<AdjudicationReportRow[]>([]);

  async function loadDashboard() {
    if (!session.value) return;
    const [a, l, c, r] = await Promise.all([
      loadAllApplications(),
      loadAuditLog(8),
      countInnovators(),
      loadAdjudicationReports(),
    ]);
    apps.value = a;
    audit.value = l;
    innovatorCount.value = c;
    reports.value = r;
  }

  onMounted(loadDashboard);
  watch([session, authReady], () => void loadDashboard());

  const stats = computed(() => {
    const total = apps.value.length;
    const awaiting = apps.value.filter(
      (a) => !a.evaluator_name && (a.status === "submitted" || a.status === "screening"),
    ).length;
    const approvedThisMonth = apps.value.filter((a) => {
      if (a.status !== "approved") return false;
      const d = new Date(a.updated_at);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    return [
      { label: "Applications in the portal", value: String(total) },
      { label: "Awaiting assignment", value: String(awaiting) },
      { label: "Approved this month", value: String(approvedThisMonth) },
      { label: "Active innovators", value: String(innovatorCount.value) },
    ];
  });

  const applications = computed(() =>
    apps.value
      .filter((a) => a.status !== "approved" && a.status !== "rejected")
      .slice(0, 8)
      .map((a) => ({
        id: a.id,
        applicant: a.innovator_name ?? "Unknown applicant",
        amount: `P ${Number(a.funding_requested ?? 0).toLocaleString()}`,
        type: a.sector ?? "Idea",
        stage: statusLabel(a.status),
        tone:
          a.status === "submitted" || a.status === "screening"
            ? "warn"
            : a.status === "approved"
              ? "ok"
              : "neutral",
        officer: a.evaluator_name ?? "Unassigned",
        updated: formatRelative(a.updated_at),
      })),
  );

  const actionMap: Record<string, string> = {
    application_status_changed: "Application status changed",
    application_created: "Application submitted",
  };
  const auditTrail = computed(() =>
    audit.value.map((e) => ({
      id: e.id,
      time: new Date(e.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      action: actionMap[e.action] ?? e.action,
      actor: e.actor_name ?? "System",
      ip: e.ip ?? "—",
    })),
  );

  function openReport(report: AdjudicationReportRow) {
    router.push({ name: "ApplicationView", query: { id: report.application_id } });
  }

  function recommendationLabel(value: string | null) {
    if (value === "fund") return "Recommend funding";
    if (value === "decline") return "Not recommended";
    if (value === "revise") return "Revise";
    return "No recommendation";
  }

  function formatRelative(iso: string) {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const days = Math.floor(diff / 86400000);
    if (days <= 0) return "Updated today";
    if (days === 1) return "Updated yesterday";
    if (days < 7) return `Updated ${days} days ago`;
    return `Updated ${d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`;
  }
</script>

<style module>
  .page {
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #faf7f2;
    font-family: var(--font-inter);
    overflow: hidden;
  }

  .mainContent {
    flex: 1;
    height: 100vh;
    overflow-y: auto;
    padding: 24px 36px 48px;
    box-sizing: border-box;
    min-width: 0;
  }

  .div {
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--gap-0);
    max-width: 100%;
    row-gap: var(--gap-20);
    text-align: left;
    font-family: var(--font-inter);
    margin-bottom: 22px;
    flex-wrap: wrap;
  }
  .div2 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    min-width: 0;
    max-width: 100%;
  }
  .h2actH {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .dumelaMarion {
    margin: 0;
    position: relative;
    font-size: 36px;
    letter-spacing: -0.84px;
    font-weight: 800;
    font-family: inherit;
    color: var(--color-darkslategray-500);
  }
  .pWrap {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
    font-size: var(--fs-16);
    color: var(--color-darkslategray-200);
  }
  .sunday4October {
    position: relative;
    white-space: pre-wrap;
    display: inline-block;
    flex-shrink: 0;
    max-width: 100%;
    box-sizing: border-box;
  }
  .div3 {
    height: var(--height-48);
    display: flex;
    align-items: center;
    gap: var(--gap-10);
    font-size: var(--fs-14);
    color: var(--color-goldenrod-200);
  }
  .notifications2New {
    height: 46px;
    width: 46px;
    position: relative;
    border-radius: 23px;
    cursor: pointer;
  }
  .manageLink {
    display: inline-flex;
    align-items: center;
    height: 40px;
    padding: 0 16px;
    border-radius: 999px;
    background-color: var(--color-darkslategray-500);
    color: #fff;
    font-size: var(--fs-13);
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
  }
  .userA {
    height: var(--height-48);
    border-radius: var(--br-999);
    background-color: var(--color-white);
    border: 1px solid var(--color-lightgray-100);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: var(--padding-5) var(--padding-14) var(--padding-5) var(--padding-5);
    gap: 9px;
    min-height: var(--min-h-46);
    cursor: pointer;
    text-decoration: none;
  }
  .userAvatarImg {
    width: 36px;
    height: 36px;
    min-width: 36px;
    border-radius: 50%;
    object-fit: cover;
  }
  .span3 {
    height: var(--height-17);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .marionLucas {
    font-size: var(--fs-13);
    font-weight: 600;
    color: var(--color-darkslategray-500);
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
    margin-bottom: 18px;
  }
  .statCard {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px 18px;
    border: 1px solid var(--color-lightgray-100);
    border-radius: 16px;
    background-color: var(--color-white);
    box-shadow: 0 2px 8px rgba(15, 46, 36, 0.05);
    box-sizing: border-box;
  }
  .statValue {
    font-size: 26px;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.5px;
    color: #013525;
  }
  .statLabel {
    font-size: var(--fs-13);
    font-weight: 500;
    color: #737373;
  }

  .reportPanel {
    padding: 20px 22px 14px;
    border: 1px solid var(--color-lightgray-100);
    border-radius: 18px;
    background-color: var(--color-white);
    box-shadow: 0 2px 10px rgba(15, 46, 36, 0.06);
    box-sizing: border-box;
    margin-bottom: 18px;
  }
  .reportHead {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .reportCount {
    display: inline-flex;
    align-items: center;
    height: 30px;
    padding: 0 12px;
    border-radius: 999px;
    background-color: #f3efe7;
    color: #6b6355;
    font-size: var(--fs-12);
    font-weight: 700;
    white-space: nowrap;
  }
  .reportEmpty {
    padding: 18px 4px;
    font-size: var(--fs-13);
    color: #8f887c;
  }
  .reportList {
    display: flex;
    flex-direction: column;
  }
  .reportRow {
    display: grid;
    grid-template-columns: minmax(0, 1.8fr) auto auto auto;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 12px 10px;
    border: none;
    border-bottom: 1px solid #f3efe7;
    border-radius: 12px;
    background: transparent;
    text-align: left;
    font-family: inherit;
    cursor: pointer;
  }
  .reportRow:hover {
    background-color: #fdfbf7;
  }
  .reportRow:last-child {
    border-bottom: none;
  }
  .reportMain {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .reportTitle {
    font-size: var(--fs-14);
    font-weight: 600;
    color: #171717;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .reportMeta {
    font-size: var(--fs-12);
    color: #8f887c;
  }
  .reportScore {
    font-size: var(--fs-16);
    font-weight: 800;
    color: #013525;
    white-space: nowrap;
  }
  .reportScore small {
    font-size: var(--fs-11);
    font-weight: 600;
    color: #8f887c;
  }
  .reportOpen {
    font-size: var(--fs-12);
    font-weight: 700;
    color: #013525;
    white-space: nowrap;
  }

  .panels {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
    gap: 18px;
    align-items: start;
  }

  .panel {
    padding: 20px 22px 14px;
    border: 1px solid var(--color-lightgray-100);
    border-radius: 18px;
    background-color: var(--color-white);
    box-shadow: 0 2px 10px rgba(15, 46, 36, 0.06);
    box-sizing: border-box;
  }
  .panelHead {
    margin-bottom: 14px;
  }
  .panelTitle {
    margin: 0;
    font-size: var(--fs-18);
    font-weight: 700;
    color: var(--color-darkslategray-500);
  }
  .panelSub {
    margin: 4px 0 0;
    font-size: var(--fs-13);
    color: #737373;
  }

  .table {
    display: flex;
    flex-direction: column;
  }
  .tableHead,
  .row {
    display: grid;
    grid-template-columns: minmax(0, 1.8fr) minmax(0, 0.7fr) minmax(0, 1fr) minmax(0, 0.8fr);
    align-items: center;
    gap: 12px;
  }
  .tableHead {
    padding: 0 10px 10px;
    border-bottom: 1px solid #efeae1;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #9a9488;
  }
  .row {
    padding: 12px 10px;
    border-bottom: 1px solid #f3efe7;
    border-radius: 12px;
    transition: background-color 0.16s ease;
  }
  .row:hover {
    background-color: #fdfbf7;
  }
  .row:last-child {
    border-bottom: none;
  }
  .cellStrong {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .ideaTitle {
    font-size: var(--fs-14);
    font-weight: 600;
    color: #171717;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ideaMeta {
    font-size: var(--fs-12);
    color: #8f887c;
  }
  .cell {
    font-size: var(--fs-13);
    color: #4c473f;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11.5px;
    font-weight: 700;
    white-space: nowrap;
  }
  .neutral {
    background-color: #f0ece4;
    color: #6b6355;
  }
  .warn {
    background-color: #fdf0ed;
    color: #c2410c;
  }
  .ok {
    background-color: #e6f0e9;
    color: #14603f;
  }

  .trail {
    display: flex;
    flex-direction: column;
  }
  .trailRow {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 11px 4px;
    border-bottom: 1px solid #f3efe7;
  }
  .trailRow:last-child {
    border-bottom: none;
  }
  .trailTime {
    width: 42px;
    flex-shrink: 0;
    font-size: var(--fs-12);
    font-weight: 700;
    color: #9a9488;
  }
  .trailBody {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .trailAction {
    font-size: var(--fs-13);
    font-weight: 600;
    color: #171717;
  }
  .trailMeta {
    font-size: var(--fs-12);
    color: #8f887c;
  }

  @media screen and (max-width: 1100px) {
    .panels {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media screen and (max-width: 760px) {
    .page {
      display: block;
      width: 100%;
      min-height: 100vh;
      overflow: visible;
    }
    .mainContent {
      height: auto;
      min-height: 100vh;
      overflow: visible;
      padding: 68px 14px 40px;
    }
    .div {
      flex-direction: column-reverse;
      align-items: stretch;
      row-gap: 12px;
      margin-bottom: 16px;
    }
    .div3 {
      width: 100%;
      height: auto;
      justify-content: flex-end;
      gap: 8px;
    }
    .dumelaMarion {
      font-size: 26px;
      line-height: 1.15;
      letter-spacing: -0.4px;
    }
    .sunday4October {
      font-size: 14px;
      line-height: 1.45;
    }
    .stats {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }
    .statCard {
      padding: 14px;
    }
    .statValue {
      font-size: 22px;
    }
    .panel {
      padding: 16px 14px 8px;
    }
    .reportPanel {
      padding: 16px 14px 8px;
    }
    .reportRow {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 6px 12px;
    }
    .reportOpen {
      display: none;
    }
    .tableHead {
      display: none;
    }
    .row {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 6px 12px;
      padding: 12px 4px;
    }
    .row .cell:nth-child(2) {
      display: none;
    }
    .row .cell:nth-child(4) {
      display: none;
    }
  }

  .isGaborone .dumelaMarion {
    color: #ffffff;
  }
  .isGaborone .pWrap {
    color: rgba(255, 255, 255, 0.9);
  }
  .isGaborone .sunday4October {
    color: #ffffff;
  }
  .isGaborone .marionLucas {
    color: var(--color-darkslategray-500);
  }
</style>
