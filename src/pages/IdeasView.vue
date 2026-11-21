<template>
  <div :class="[$style.page, isGaborone ? $style.isGaborone : '']" :style="pageBackground">
    <Main :active-page="'ideas'" />

    <main :class="$style.mainContent">
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <div :class="$style.titleRow">
              <h2 :class="$style.dumelaMarion">Ideas</h2>
            </div>
          </div>
          <div :class="$style.pWrap">
            <div :class="$style.sunday4October">
              Every idea submitted to the portal, from first draft to award
            </div>
          </div>
        </div>
        <div :class="$style.div3">
          <img :class="$style.notifications2New" alt="" src="/Notifications-2-new.svg" />
          <img :class="$style.notifications2New" alt="" src="/Help.svg" />
          <router-link to="/admin-profile" :class="$style.userA" style="text-decoration: none;">
            <img :class="$style.userAvatarImg" src="/innovator-man.webp" alt="Marion Lucas" />
            <div :class="$style.span3">
              <div :class="$style.marionLucas">Marion Lucas</div>
            </div>
          </router-link>
        </div>
      </header>

      <div :class="$style.quickNav">
        <router-link
          to="/team"
          :class="$style.quickNavItem"
          :active-class="$style.quickNavItemActive"
          >Team</router-link
        >
        <router-link
          to="/ideas"
          :class="$style.quickNavItem"
          :active-class="$style.quickNavItemActive"
          >Ideas</router-link
        >
        <router-link
          to="/deadlines"
          :class="$style.quickNavItem"
          :active-class="$style.quickNavItemActive"
          >Deadline</router-link
        >
      </div>

      <section :class="$style.stats">
        <div v-for="stat in stats" :key="stat.label" :class="$style.statCard">
          <span :class="$style.statValue">{{ stat.value }}</span>
          <span :class="$style.statLabel">{{ stat.label }}</span>
        </div>
      </section>

      <section :class="$style.panel">
        <div :class="$style.panelHead">
          <div>
            <h3 :class="$style.panelTitle">Idea repository</h3>
            <p :class="$style.panelSub">
              {{ visibleIdeas.length }} of {{ ideas.length }} ideas · stage follows submission → review →
              feedback → approval → award
            </p>
          </div>
          <div :class="$style.filters">
            <button
              v-for="filter in filters"
              :key="filter"
              :class="[$style.filter, stage === filter ? $style.filterActive : '']"
              type="button"
              @click="stage = filter"
            >
              {{ filter }}
            </button>
          </div>
        </div>

        <div :class="$style.table">
          <div :class="$style.tableHead">
            <span>Idea</span>
            <span>Submitter</span>
            <span>Stage</span>
            <span>Evaluator</span>
            <span>Submitted</span>
          </div>
          <div v-for="idea in visibleIdeas" :key="idea.id" :class="$style.row">
            <span :class="$style.ideaCell">
              <span :class="$style.ideaTitle">{{ idea.title }}</span>
              <span :class="$style.ideaMeta">{{ idea.sector }} · {{ idea.documents }} documents</span>
            </span>
            <span :class="$style.cell">{{ idea.submitter }}</span>
            <span :class="$style.cell">
              <span :class="[$style.badge, $style[idea.tone]]">{{ idea.stage }}</span>
            </span>
            <span :class="$style.cell">{{ idea.evaluator }}</span>
            <span :class="$style.cell">{{ idea.submitted }}</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from "vue";
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

  type Idea = {
    id: number;
    title: string;
    sector: string;
    documents: number;
    submitter: string;
    stage: string;
    evaluator: string;
    submitted: string;
    tone: string;
  };

  const filters = ["All", "Submitted", "In review", "Awaiting feedback", "Approved"];

  const ideas: Idea[] = [
    {
      id: 1,
      title: "Solar-powered cold storage for farmers",
      sector: "Agritech",
      documents: 6,
      submitter: "Kabo Mothusi",
      stage: "In review",
      evaluator: "Thabo S.",
      submitted: "14 Nov 2026",
      tone: "warn",
    },
    {
      id: 2,
      title: "Mobile clinic booking for rural districts",
      sector: "Health",
      documents: 4,
      submitter: "Neo Kgang",
      stage: "Awaiting feedback",
      evaluator: "Lerato P.",
      submitted: "12 Nov 2026",
      tone: "warn",
    },
    {
      id: 3,
      title: "SME inventory credit scoring",
      sector: "Fintech",
      documents: 8,
      submitter: "Refilwe Dube",
      stage: "Approved",
      evaluator: "Mpho R.",
      submitted: "9 Nov 2026",
      tone: "ok",
    },
    {
      id: 4,
      title: "Community water-quality sensors",
      sector: "Cleantech",
      documents: 3,
      submitter: "Tapiwa Ndlovu",
      stage: "Submitted",
      evaluator: "Unassigned",
      submitted: "18 Nov 2026",
      tone: "neutral",
    },
    {
      id: 5,
      title: "Setswana learning app for primary schools",
      sector: "Edtech",
      documents: 5,
      submitter: "Boitumelo A.",
      stage: "In review",
      evaluator: "Thabo S.",
      submitted: "13 Nov 2026",
      tone: "warn",
    },
    {
      id: 6,
      title: "Waste-to-briquette micro factory",
      sector: "Manufacturing",
      documents: 7,
      submitter: "Kgotso Molefe",
      stage: "Approved",
      evaluator: "Mpho R.",
      submitted: "7 Nov 2026",
      tone: "ok",
    },
    {
      id: 7,
      title: "Livestock traceability ledger",
      sector: "Agritech",
      documents: 2,
      submitter: "Amantle Seb",
      stage: "Submitted",
      evaluator: "Unassigned",
      submitted: "19 Nov 2026",
      tone: "neutral",
    },
  ];

  const stats = [
    { label: "Ideas in repository", value: "7" },
    { label: "In review", value: "2" },
    { label: "Awaiting feedback", value: "1" },
    { label: "Approved to date", value: "2" },
  ];

  const stage = ref("All");
  const visibleIdeas = computed(() =>
    stage.value === "All" ? ideas : ideas.filter((idea) => idea.stage === stage.value),
  );
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

  .quickNav {
    display: flex;
    align-items: center;
    gap: 4px;
    width: max-content;
    max-width: 100%;
    margin: 0 0 22px auto;
    padding: 6px;
    border: 1px solid var(--color-lightgray-100);
    border-radius: 14px;
    background-color: var(--color-white);
    box-shadow: 0 2px 8px rgba(15, 46, 36, 0.06);
    box-sizing: border-box;
  }
  .quickNavItem {
    padding: 6px 14px;
    border-radius: 9px;
    font-size: var(--fs-13);
    font-weight: 600;
    color: var(--color-darkslategray-500);
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.18s ease;
  }
  .quickNavItem:hover {
    background-color: #f4efe6;
  }
  .quickNavItemActive {
    background-color: #f4efe6;
    color: #013525;
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

  .panel {
    padding: 20px 22px 22px;
    border: 1px solid var(--color-lightgray-100);
    border-radius: 18px;
    background-color: var(--color-white);
    box-shadow: 0 2px 10px rgba(15, 46, 36, 0.06);
    box-sizing: border-box;
  }
  .panelHead {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 16px;
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
  .filters {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }
  .filter {
    padding: 7px 13px;
    border: 1px solid #e8e2d8;
    border-radius: 999px;
    background-color: #ffffff;
    color: #6b6355;
    font-family: inherit;
    font-size: var(--fs-13);
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
  }
  .filter:hover {
    background-color: #f4efe6;
  }
  .filterActive {
    border-color: #013525;
    background-color: #013525;
    color: #ffffff;
  }

  .table {
    display: flex;
    flex-direction: column;
  }
  .tableHead,
  .row {
    display: grid;
    grid-template-columns: minmax(0, 2.2fr) minmax(0, 1fr) minmax(0, 0.9fr) minmax(0, 0.9fr) minmax(0, 0.8fr);
    align-items: center;
    gap: 14px;
  }
  .tableHead {
    padding: 0 12px 10px;
    border-bottom: 1px solid #efeae1;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #9a9488;
  }
  .row {
    padding: 13px 12px;
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
  .ideaCell {
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
      padding: 16px 14px 18px;
    }
    .tableHead {
      display: none;
    }
    .row {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 8px 12px;
      padding: 12px 6px;
    }
    .row .cell:nth-child(2) {
      display: none;
    }
    .row .cell:nth-child(4) {
      display: none;
    }
    .row .cell:nth-child(5) {
      grid-column: 1 / -1;
      font-size: var(--fs-12);
      color: #8f887c;
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
