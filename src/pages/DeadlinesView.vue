<template>
  <div :class="[$style.page, isGaborone ? $style.isGaborone : '']" :style="pageBackground">
    <Main :active-page="'deadlines'" />

    <main :class="$style.mainContent">
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <div :class="$style.titleRow">
              <h2 :class="$style.dumelaMarion">Deadline</h2>
            </div>
          </div>
          <div :class="$style.pWrap">
            <div :class="$style.sunday4October">
              Submission windows, review turnaround and award dates in one timeline
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
          <span :class="[$style.statValue, stat.tone ? $style[stat.tone] : '']">{{ stat.value }}</span>
          <span :class="$style.statLabel">{{ stat.label }}</span>
        </div>
      </section>

      <section :class="$style.panel">
        <div :class="$style.panelHead">
          <div>
            <h3 :class="$style.panelTitle">What is due next</h3>
            <p :class="$style.panelSub">
              Turnaround is measured per stage, so nothing waits unnoticed
            </p>
          </div>
        </div>

        <div v-for="group in groups" :key="group.label" :class="$style.group">
          <div :class="$style.groupLabel">
            <span>{{ group.label }}</span>
            <span :class="$style.groupCount">{{ group.items.length }}</span>
          </div>

          <div v-for="item in group.items" :key="item.id" :class="$style.row">
            <span :class="$style.dateCell">
              <span :class="$style.dateDay">{{ item.day }}</span>
              <span :class="$style.dateMonth">{{ item.month }}</span>
            </span>
            <span :class="$style.ideaCell">
              <span :class="$style.itemTitle">{{ item.title }}</span>
              <span :class="$style.itemMeta">{{ item.about }} · {{ item.owner }}</span>
            </span>
            <span :class="[$style.badge, $style[item.tone]]">{{ item.status }}</span>
          </div>
        </div>
      </section>
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

  type Item = {
    id: number;
    day: string;
    month: string;
    title: string;
    about: string;
    owner: string;
    status: string;
    tone: string;
  };

  type Group = { label: string; items: Item[] };

  const stats = [
    { label: "Due this week", value: "3", tone: "" },
    { label: "Overdue", value: "1", tone: "danger" },
    { label: "Next call closes", value: "3 Dec", tone: "" },
    { label: "Average review time", value: "4 days", tone: "" },
  ];

  const groups: Group[] = [
    {
      label: "This week",
      items: [
        {
          id: 1,
          day: "21",
          month: "Nov",
          title: "Clarification response — Solar cold storage",
          about: "Awaiting feedback",
          owner: "Kabo Mothusi",
          status: "Due soon",
          tone: "warn",
        },
        {
          id: 2,
          day: "22",
          month: "Nov",
          title: "Panel scoring — Mobile clinic booking",
          about: "In review",
          owner: "Lerato P.",
          status: "Due soon",
          tone: "warn",
        },
        {
          id: 3,
          day: "20",
          month: "Nov",
          title: "Evaluator feedback — Inventory credit scoring",
          about: "Feedback stage",
          owner: "Mpho R.",
          status: "Overdue",
          tone: "danger",
        },
      ],
    },
    {
      label: "Next week",
      items: [
        {
          id: 4,
          day: "26",
          month: "Nov",
          title: "Adjudication committee sits",
          about: "Credit committee",
          owner: "Innovation committee",
          status: "On track",
          tone: "ok",
        },
        {
          id: 5,
          day: "28",
          month: "Nov",
          title: "Resubmission window closes — Water sensors",
          about: "Awaiting resubmission",
          owner: "Tapiwa Ndlovu",
          status: "On track",
          tone: "ok",
        },
      ],
    },
    {
      label: "Later",
      items: [
        {
          id: 6,
          day: "3",
          month: "Dec",
          title: "Award announcement",
          about: "Award stage",
          owner: "CEDA",
          status: "Scheduled",
          tone: "neutral",
        },
      ],
    },
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
  .danger {
    color: #c2410c;
  }

  .panel {
    padding: 20px 22px 12px;
    border: 1px solid var(--color-lightgray-100);
    border-radius: 18px;
    background-color: var(--color-white);
    box-shadow: 0 2px 10px rgba(15, 46, 36, 0.06);
    box-sizing: border-box;
  }
  .panelHead {
    margin-bottom: 6px;
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

  .group {
    margin-top: 18px;
  }
  .groupLabel {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #efeae1;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #9a9488;
  }
  .groupCount {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 999px;
    background-color: #f0ece4;
    color: #6b6355;
    font-size: 10.5px;
    letter-spacing: 0;
  }

  .row {
    display: grid;
    grid-template-columns: 46px minmax(0, 1fr) auto;
    align-items: center;
    gap: 14px;
    padding: 12px 4px;
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
  .dateCell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6px 0;
    border: 1px solid #e8e2d8;
    border-radius: 10px;
    background-color: #fdfbf7;
    box-sizing: border-box;
  }
  .dateDay {
    font-size: var(--fs-16);
    font-weight: 700;
    line-height: 1.1;
    color: #171717;
  }
  .dateMonth {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: #8f887c;
  }
  .ideaCell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .itemTitle {
    font-size: var(--fs-14);
    font-weight: 600;
    color: #171717;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .itemMeta {
    font-size: var(--fs-12);
    color: #8f887c;
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
  .badge.danger {
    background-color: #fdf0ed;
    color: #c2410c;
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
    .row {
      grid-template-columns: 42px minmax(0, 1fr);
      gap: 6px 12px;
    }
    .row .badge {
      grid-column: 2;
      justify-self: start;
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
