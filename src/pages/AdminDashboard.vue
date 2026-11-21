<template>
  <div :class="[$style.page, isGaborone ? $style.isGaborone : '']" :style="pageBackground">
    <Main :active-page="'admin'" role="admin" />

    <main :class="$style.mainContent">
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <div :class="$style.titleRow">
              <h2 :class="$style.dumelaMarion">Admin overview</h2>
            </div>
          </div>
          <div :class="$style.pWrap">
            <div :class="$style.sunday4October">
              Agency-wide view of submissions, reviewers and decisions
            </div>
          </div>
        </div>
        <div :class="$style.div3">
          <img :class="$style.notifications2New" alt="" src="/Notifications-2-new.svg" />
          <img :class="$style.notifications2New" alt="" src="/Help.svg" />
          <router-link to="/profile" :class="$style.userA" style="text-decoration: none;">
            <img :class="$style.userAvatarImg" src="/innovator-man.webp" alt="Marion Lucas" />
            <div :class="$style.span3">
              <div :class="$style.marionLucas">Marion Lucas</div>
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
  import { ref, onMounted, onUnmounted } from "vue";
  import Main from "../components/Main.vue";
  import { usePageTheme } from "../composables/usePageTheme";
  import { THEME_EVENT, isGaboroneTheme } from "../components/themes";

  const pageBackground = usePageTheme();
  const isGaborone = ref(isGaboroneTheme());
  function syncTheme() {
    isGaborone.value = isGaboroneTheme();
  }
  onMounted(() => window.addEventListener(THEME_EVENT, syncTheme));
  onUnmounted(() => window.removeEventListener(THEME_EVENT, syncTheme));

  const stats = [
    { label: "Applications in the portal", value: "128" },
    { label: "Awaiting assignment", value: "14" },
    { label: "Approved this month", value: "23" },
    { label: "Active innovators", value: "96" },
  ];

  const applications = [
    {
      id: 1,
      applicant: "Kabo Mothusi",
      amount: "P 480,000",
      type: "Loan",
      stage: "Screening",
      tone: "warn",
      officer: "Mpho R.",
      updated: "Updated 2 hours ago",
    },
    {
      id: 2,
      applicant: "Neo Kgang",
      amount: "P 125,000",
      type: "Idea",
      stage: "Committee",
      tone: "warn",
      officer: "Lerato P.",
      updated: "Updated yesterday",
    },
    {
      id: 3,
      applicant: "Refilwe Dube",
      amount: "P 640,000",
      type: "Loan",
      stage: "Approved",
      tone: "ok",
      officer: "Thabo S.",
      updated: "Updated 3 days ago",
    },
    {
      id: 4,
      applicant: "Tapiwa Ndlovu",
      amount: "P 96,000",
      type: "Idea",
      stage: "Submitted",
      tone: "neutral",
      officer: "Unassigned",
      updated: "Submitted yesterday",
    },
    {
      id: 5,
      applicant: "Mochudi Textiles",
      amount: "P 250,000",
      type: "Loan",
      stage: "Due diligence",
      tone: "neutral",
      officer: "Mpho R.",
      updated: "Updated 5 days ago",
    },
  ];

  const auditTrail = [
    { id: 1, time: "08:42", action: "Signed in with password + 2FA", actor: "Marion Lucas", ip: "196.216.164.12" },
    { id: 2, time: "08:55", action: "Assigned evaluator to SRK-L-10847", actor: "Marion Lucas", ip: "196.216.164.12" },
    { id: 3, time: "09:12", action: "Approved SRK-L-10812 for P 10,000", actor: "Thabo S.", ip: "196.216.164.20" },
    { id: 4, time: "09:40", action: "Updated scoring criteria (weighting)", actor: "Lerato P.", ip: "196.216.164.31" },
    { id: 5, time: "10:05", action: "Exported participation report", actor: "Marion Lucas", ip: "196.216.164.12" },
  ];
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
