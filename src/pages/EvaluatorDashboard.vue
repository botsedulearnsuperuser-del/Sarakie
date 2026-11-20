<template>
  <div :class="[$style.evaluatorDashboard, isGaborone ? $style.isGaborone : '']" :style="dashboardBackground">
    <Main :active-page="'evaluator'" />
    <main :class="$style.mainContent">
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <h2 :class="$style.dumelaMarion">
              Dumela,
              <PointerHighlight>
                <span :class="$style.highlightWord">Evaluator</span>
              </PointerHighlight>
            </h2>
          </div>
          <div :class="$style.p">
            <div :class="$style.sunday4October">
              Friday 20 November 2026. You have 5 submissions waiting for your score.
            </div>
          </div>
        </div>
        <div :class="$style.div3">
          <div :class="$style.iconWrap">
            <button
              :class="$style.iconBtn"
              type="button"
              aria-label="Notifications"
              @click="showNotifications = !showNotifications"
            >
              <img :class="$style.notifications2New" alt="" src="/Notifications-2-new.svg" />
            </button>
            <NotificationsPanel
              :open="showNotifications"
              @close="showNotifications = false"
            />
          </div>
          <div :class="$style.iconWrap">
            <button
              :class="$style.iconBtn"
              type="button"
              aria-label="Help and frequently asked questions"
              @click="openFaq"
            >
              <img :class="$style.notifications2New" alt="" src="/Help.svg" />
            </button>
          </div>
          <router-link to="/admin-profile" :class="$style.a" style="text-decoration: none">
            <img :class="$style.userAvatarImg" src="/innovator-man.webp" alt="Marion Lucas" />
            <div :class="$style.span3">
              <div :class="$style.marionLucas">Marion Lucas</div>
            </div>
          </router-link>
        </div>
      </header>

      <!-- Review load + rubric highlight -->
      <section :class="$style.reviewCardsRow">
        <div :class="$style.reviewLoadCard">
          <img :class="$style.reviewLoadPattern" alt="" src="/pattern-3.webp" />
          <div :class="$style.reviewLoadBody">
            <div :class="$style.reviewPills">
              <div :class="$style.reviewPill">
                <div :class="$style.reviewPillText">Evaluation queue</div>
              </div>
              <button :class="$style.reviewPillGhost" type="button" @click="scrollToQueue">
                <span>5 awaiting score</span>
              </button>
            </div>
            <div :class="$style.reviewLoadLabel">Submissions assigned to you</div>
            <div :class="$style.reviewLoadValue">05</div>
            <div :class="$style.reviewLoadMeta">
              of 12 assigned this cycle, 2 are due today and 3 more this week
            </div>
            <div :class="$style.reviewTrack">
              <div :class="$style.reviewTrackFill" />
            </div>
            <div :class="$style.reviewLoadFooter">
              <div :class="$style.reviewLoadLabel">Next deadline 24 November</div>
              <div :class="$style.reviewLoadLabel">Average turnaround 1.8 days</div>
            </div>
          </div>
          <div :class="$style.reviewLoadSide">
            <div>
              <b :class="$style.reviewLoadLabel">Next: Irrigation Kit</b>
              <div :class="$style.reviewLoadHint">SRK-IN-2026-0481 · due today</div>
            </div>
            <div :class="$style.reviewActions">
              <button :class="$style.reviewPrimaryBtn" type="button" @click="openReview('Irrigation Kit')">
                <b>Start review</b>
              </button>
              <button :class="$style.reviewGhostBtn" type="button" @click="scrollToQueue">
                View queue
              </button>
            </div>
          </div>
        </div>

        <div :class="$style.rubricPromo">
          <div :class="$style.rubricPromoFrame">
            <div :class="$style.rubricPhotoArea">
              <img :class="$style.rubricPattern" alt="" src="/untitled-3-21.webp" />
              <img :class="$style.rubricPhoto" alt="" src="/colin-watts-newE0057quQ-unsplash (1).jpg" />
            </div>
            <div :class="$style.rubricPromoFooter">
              <div :class="$style.rubricPromoText">
                <div :class="$style.rubricPromoTitle">Score against the rubric</div>
                <div :class="$style.rubricPromoSub">
                  Every submission is assessed on the same five published criteria.
                </div>
              </div>
              <router-link to="/faq" :class="$style.rubricPromoBtn" style="text-decoration: none">
                <b>Open scoring guide</b>
                <img :class="$style.arrowIcon" alt="" src="/Frame7.svg" />
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Summary strip -->
      <section :class="$style.accountSummary">
        <div :class="$style.summaryCell">
          <div :class="$style.summaryLabel">Assigned to me</div>
          <h2 :class="$style.summaryValue">12</h2>
          <div :class="$style.summaryMeta">3 new since Monday</div>
        </div>
        <div :class="[$style.summaryCell, $style.summaryDivider]">
          <div :class="$style.summaryLabel">Awaiting my score</div>
          <h2 :class="$style.summaryValue">5 of 12</h2>
          <div :class="$style.summaryDots">
            <span
              v-for="(item, index) in assignmentDots"
              :key="index"
              :class="[$style.summaryDot, $style[item]]"
            />
          </div>
          <div :class="$style.summaryMeta">2 due today · 3 this week</div>
        </div>
        <div :class="[$style.summaryCell, $style.summaryDivider]">
          <div :class="$style.summaryLabel">Completed this month</div>
          <h2 :class="$style.summaryValue">7</h2>
          <div :class="$style.summaryMeta">Average score given 74 / 100</div>
        </div>
      </section>

      <!-- Queue + rubric -->
      <section :class="$style.divgCalc">
        <section :class="$style.section" id="evaluation-queue">
          <div :class="$style.queueHead">
            <div>
              <h3 :class="$style.sectionTitle">Submissions awaiting evaluation</h3>
              <div :class="$style.sectionSub">
                Innovator identities are hidden until adjudication, as required by the review policy.
              </div>
            </div>
            <div :class="$style.tabs">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                :class="[$style.tab, activeTab === tab.id ? $style.tabActive : '']"
                type="button"
                @click="activeTab = tab.id"
              >
                {{ tab.label }} ({{ tab.count }})
              </button>
            </div>
          </div>

          <div :class="$style.tableWrap">
            <table :class="$style.table">
              <thead>
                <tr>
                  <th :class="$style.th">Submission</th>
                  <th :class="$style.th">Category</th>
                  <th :class="$style.th">Requested</th>
                  <th :class="$style.th">Deadline</th>
                  <th :class="$style.th">Status</th>
                  <th :class="$style.thRight">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="review in filteredReviews" :key="review.ref">
                  <td :class="$style.td">
                    <div :class="$style.ideaTitle">{{ review.title }}</div>
                    <div :class="$style.ideaRef">
                      {{ review.ref }} · Innovator {{ review.innovator }}
                    </div>
                  </td>
                  <td :class="$style.td">{{ review.category }}</td>
                  <td :class="$style.td">{{ review.amount }}</td>
                  <td :class="$style.td">{{ review.deadline }}</td>
                  <td :class="$style.td">
                    <span :class="[$style.badge, $style[review.statusClass]]">
                      {{ review.status }}
                    </span>
                  </td>
                  <td :class="$style.tdRight">
                    <button :class="$style.evalBtn" type="button" @click="openReview(review.title)">
                      {{ activeTab === "returned" ? "View" : "Evaluate" }}
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredReviews.length === 0">
                  <td :class="$style.emptyCell" colspan="6">
                    Nothing in this tab right now.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section :class="$style.section2">
          <div :class="$style.rubricHeader">
            <h3 :class="$style.sectionTitle">Scoring rubric</h3>
            <div :class="$style.sectionSub">Weighted criteria used in every evaluation</div>
          </div>
          <div :class="$style.rubricRows">
            <div v-for="criterion in rubric" :key="criterion.name" :class="$style.rubricRow">
              <div :class="$style.rubricName">{{ criterion.name }}</div>
              <div :class="$style.rubricWeight">{{ criterion.weight }}</div>
            </div>
          </div>
          <div :class="$style.scoreCard">
            <img :class="$style.scorePattern" alt="" src="/pattern-1.webp" />
            <div :class="$style.scoreLabel">My average score this month</div>
            <h2 :class="$style.scoreValue">74</h2>
            <div :class="$style.scoreMeta">out of 100 across 7 completed evaluations</div>
            <div :class="$style.scoreFooter">
              <div :class="$style.scoreStat">
                <b>1.8 days</b>
                <span>average turnaround</span>
              </div>
              <div :class="$style.scoreStat">
                <b>100%</b>
                <span>scored before deadline</span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
    <ChatWithAgent />
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref } from "vue"
  import { useRouter } from "vue-router"
  import Main from "../components/Main.vue"
  import ChatWithAgent from "../components/ChatWithAgent.vue"
  import PointerHighlight from "../components/ui/pointer-highlight.vue"
  import NotificationsPanel from "../components/NotificationsPanel.vue"
  import {
    CUSTOM_IMAGE_STORAGE_KEY,
    CUSTOM_THEME_ID,
    dashboardThemes,
    isGaboroneTheme,
    THEME_EVENT,
    THEME_STORAGE_KEY,
  } from "../components/themes"
  import type { DashboardTheme } from "../components/themes"

  const router = useRouter()
  const showNotifications = ref(false)

  type TabId = "awaiting" | "progress" | "returned"

  const tabs: Array<{ id: TabId; label: string; count: number }> = [
    { id: "awaiting", label: "Awaiting score", count: 5 },
    { id: "progress", label: "In progress", count: 2 },
    { id: "returned", label: "Returned", count: 7 },
  ]

  interface ReviewItem {
    ref: string
    title: string
    innovator: string
    category: string
    amount: string
    deadline: string
    status: string
    statusClass: "badgeDue" | "badgeProgress" | "badgeReview" | "badgeDone"
    tab: TabId
  }

  const reviews: ReviewItem[] = [
    {
      ref: "SRK-IN-2026-0481",
      title: "Irrigation Kit",
      innovator: "0481",
      category: "Agri-Tech",
      amount: "P 900.00",
      deadline: "Today",
      status: "Due today",
      statusClass: "badgeDue",
      tab: "awaiting",
    },
    {
      ref: "SRK-IN-2026-0476",
      title: "Solar Dryer",
      innovator: "0476",
      category: "Renewable energy",
      amount: "P 1,000.00",
      deadline: "24 Nov 2026",
      status: "Due this week",
      statusClass: "badgeProgress",
      tab: "awaiting",
    },
    {
      ref: "SRK-IN-2026-0468",
      title: "Edu App",
      innovator: "0468",
      category: "EdTech",
      amount: "P 3,000.00",
      deadline: "26 Nov 2026",
      status: "Awaiting score",
      statusClass: "badgeReview",
      tab: "awaiting",
    },
    {
      ref: "SRK-IN-2026-0455",
      title: "Agri Drone",
      innovator: "0455",
      category: "Agri-Tech",
      amount: "P 6,000.00",
      deadline: "30 Nov 2026",
      status: "Awaiting score",
      statusClass: "badgeReview",
      tab: "awaiting",
    },
    {
      ref: "SRK-IN-2026-0442",
      title: "Cold-chain crate",
      innovator: "0442",
      category: "Logistics",
      amount: "P 4,500.00",
      deadline: "2 Dec 2026",
      status: "Awaiting score",
      statusClass: "badgeReview",
      tab: "awaiting",
    },
    {
      ref: "SRK-IN-2026-0468",
      title: "Edu App",
      innovator: "0468",
      category: "EdTech",
      amount: "P 3,000.00",
      deadline: "26 Nov 2026",
      status: "Scoring in progress",
      statusClass: "badgeProgress",
      tab: "progress",
    },
    {
      ref: "SRK-IN-2026-0455",
      title: "Agri Drone",
      innovator: "0455",
      category: "Agri-Tech",
      amount: "P 6,000.00",
      deadline: "30 Nov 2026",
      status: "Clarification sent",
      statusClass: "badgeReview",
      tab: "progress",
    },
    {
      ref: "SRK-IN-2026-0431",
      title: "Solar Dryer",
      innovator: "0431",
      category: "Renewable energy",
      amount: "P 1,000.00",
      deadline: "10 Nov 2026",
      status: "Score submitted",
      statusClass: "badgeDone",
      tab: "returned",
    },
    {
      ref: "SRK-IN-2026-0429",
      title: "Irrigation Kit",
      innovator: "0429",
      category: "Agri-Tech",
      amount: "P 900.00",
      deadline: "7 Nov 2026",
      status: "Score submitted",
      statusClass: "badgeDone",
      tab: "returned",
    },
    {
      ref: "SRK-IN-2026-0418",
      title: "Edu App",
      innovator: "0418",
      category: "EdTech",
      amount: "P 3,000.00",
      deadline: "3 Nov 2026",
      status: "Feedback returned",
      statusClass: "badgeDone",
      tab: "returned",
    },
  ]

  const activeTab = ref<TabId>("awaiting")

  const filteredReviews = computed(() =>
    reviews.filter((review) => review.tab === activeTab.value),
  )

  const assignmentDots = [
    "dotDue",
    "dotDue",
    "dotWeek",
    "dotWeek",
    "dotWeek",
    "dotDone",
    "dotDone",
    "dotDone",
    "dotDone",
    "dotDone",
    "dotDone",
    "dotDone",
  ]

  const rubric = [
    { name: "Problem and market need", weight: "25%" },
    { name: "Solution and feasibility", weight: "25%" },
    { name: "Team and capability", weight: "20%" },
    { name: "Financial projections", weight: "20%" },
    { name: "Impact and youth ownership", weight: "10%" },
  ]

  function openReview(name: string) {
    router.push({ name: "IdeaView", query: { name } })
  }

  function openFaq() {
    router.push("/faq")
  }

  function scrollToQueue() {
    document.getElementById("evaluation-queue")?.scrollIntoView({ behavior: "smooth" })
  }

  // Dashboard background theme, shared with the innovator dashboard.
  const activeTheme = ref<DashboardTheme | null>(null)
  const isGaborone = ref(isGaboroneTheme())

  function syncGaborone() {
    isGaborone.value = isGaboroneTheme()
  }
  onMounted(() => {
    syncGaborone()
    window.addEventListener(THEME_EVENT, syncGaborone)
  })
  onBeforeUnmount(() => {
    window.removeEventListener(THEME_EVENT, syncGaborone)
  })

  function loadTheme() {
    const themeId = localStorage.getItem(THEME_STORAGE_KEY)

    if (themeId === CUSTOM_THEME_ID) {
      const customImage = localStorage.getItem(CUSTOM_IMAGE_STORAGE_KEY)
      activeTheme.value = customImage
        ? { id: CUSTOM_THEME_ID, name: "Your image", image: customImage }
        : null
      return
    }

    activeTheme.value = dashboardThemes.find((theme) => theme.id === themeId) ?? null
  }

  function onThemeChange(event: Event) {
    const detail = (event as CustomEvent<{ id: string; image: string }>).detail

    if (detail?.image) {
      const preset = dashboardThemes.find((theme) => theme.id === detail.id)
      activeTheme.value = {
        id: detail.id,
        name: preset?.name ?? "Your image",
        image: detail.image,
      }
      return
    }

    loadTheme()
  }

  onMounted(() => {
    loadTheme()
    window.addEventListener(THEME_EVENT, onThemeChange)
  })

  onBeforeUnmount(() => {
    window.removeEventListener(THEME_EVENT, onThemeChange)
  })

  const dashboardBackground = computed(() =>
    activeTheme.value
      ? {
          backgroundImage: `url(${activeTheme.value.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }
      : undefined,
  )
</script>

<style module>
  .evaluatorDashboard {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    position: relative;
    background-color: var(--color-floralwhite);
    overflow: hidden;
    display: grid;
    grid-template-columns: 232px minmax(0, 1fr);
    align-items: stretch;
    gap: 0;
    line-height: normal;
    letter-spacing: normal;
  }
  .mainContent {
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    min-width: 0;
    max-width: none;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 28px 36px 40px;
    box-sizing: border-box;
    gap: 20px;
  }
  .div {
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: center;
    padding: var(--padding-0) 7px;
    box-sizing: border-box;
    gap: var(--gap-0);
    max-width: 100%;
    row-gap: var(--gap-20);
    text-align: left;
    font-size: 40.5px;
    color: var(--color-darkslategray-500);
    font-family: var(--font-inter);
  }
  .div2 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-6);
    min-width: 0;
    max-width: 100%;
  }
  .h2actH {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .highlightWord {
    display: inline-block;
  }
  .dumelaMarion {
    margin: 0;
    padding-bottom: 22px;
    position: relative;
    font-size: 36px;
    letter-spacing: -0.84px;
    font-weight: 800;
    font-family: inherit;
  }
  .p {
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
    padding-right: var(--padding-20);
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
  }
  .iconWrap {
    position: relative;
    display: flex;
  }
  .iconBtn {
    display: flex;
    padding: 0;
    border: none;
    background: none;
    border-radius: 50%;
    cursor: pointer;
  }
  .iconBtn:hover {
    opacity: 0.85;
  }
  .a {
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
    color: var(--color-darkslategray-500);
  }
  .marionLucas {
    position: relative;
    font-weight: 600;
  }

  /* ── Review load + rubric promo row ── */
  .reviewCardsRow {
    align-self: stretch;
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    align-items: stretch;
    gap: 16px;
    max-width: 100%;
  }
  .reviewLoadCard {
    flex: 1;
    border-radius: var(--br-26);
    background-color: var(--color-darkslategray-500);
    overflow: hidden;
    display: flex;
    align-items: stretch;
    padding: 24px 28px;
    box-sizing: border-box;
    position: relative;
    isolation: isolate;
    gap: 22px;
    min-width: 0;
    min-height: 300px;
    text-align: left;
    font-size: var(--fs-13);
    color: var(--color-gainsboro);
    font-family: var(--font-inter);
  }
  .reviewLoadPattern {
    width: 112px;
    height: 120%;
    position: absolute;
    margin: 0 !important;
    top: -24px;
    right: -28px;
    object-fit: cover;
    object-position: center top;
    opacity: 0.9;
    mix-blend-mode: screen;
    z-index: 0;
    pointer-events: none;
  }
  .reviewLoadBody {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 2;
  }
  .reviewPills {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .reviewPill {
    border-radius: var(--br-12);
    background-color: rgba(255, 255, 255, 0.12);
    padding: 6px 12px;
  }
  .reviewPillGhost {
    border-radius: var(--br-12);
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 6px 12px;
    color: var(--color-gainsboro);
    font-family: inherit;
    font-size: var(--fs-12);
    cursor: pointer;
  }
  .reviewPillText {
    font-weight: 600;
    color: var(--color-white);
  }
  .reviewLoadLabel {
    position: relative;
    color: var(--color-gainsboro);
    font-size: var(--fs-13);
  }
  .reviewLoadValue {
    font-size: 54px;
    line-height: 1;
    font-weight: 800;
    color: var(--color-goldenrod-200);
    letter-spacing: -1px;
  }
  .reviewLoadMeta {
    font-size: var(--fs-12);
    color: var(--color-silver-200);
    max-width: 280px;
  }
  .reviewTrack {
    height: 10px;
    width: 100%;
    max-width: 320px;
    border-radius: 999px;
    background-color: rgba(255, 255, 255, 0.18);
    overflow: hidden;
    margin-top: 6px;
  }
  .reviewTrackFill {
    width: 42%;
    height: 100%;
    border-radius: 999px;
    background-color: var(--color-goldenrod-200);
  }
  .reviewLoadFooter {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
    margin-top: auto;
    padding-top: 8px;
  }
  .reviewLoadSide {
    width: 210px;
    flex-shrink: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 18px;
    padding-left: 20px;
    border-left: 1px solid rgba(255, 255, 255, 0.14);
  }
  .reviewLoadHint {
    margin-top: 4px;
    font-size: var(--fs-12);
    color: var(--color-silver-200);
  }
  .reviewActions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .reviewPrimaryBtn {
    height: 44px;
    border: none;
    border-radius: var(--br-12);
    background-color: var(--color-goldenrod-200);
    color: var(--color-darkslategray-500);
    font-size: var(--fs-14);
    font-family: inherit;
    cursor: pointer;
  }
  .reviewPrimaryBtn:hover {
    filter: brightness(1.04);
  }
  .reviewGhostBtn {
    height: 44px;
    border-radius: var(--br-12);
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: var(--color-white);
    font-size: var(--fs-14);
    font-family: inherit;
    cursor: pointer;
  }
  .reviewGhostBtn:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  .rubricPromo {
    min-width: 0;
    border-radius: var(--br-26);
    background-color: var(--color-white);
    border: var(--border-2);
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .rubricPromoFrame {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    background-color: var(--color-white);
    height: 100%;
  }
  .rubricPhotoArea {
    flex: 1;
    width: 100%;
    position: relative;
    overflow: hidden;
    min-height: 190px;
    background-color: var(--color-white);
  }
  .rubricPattern {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140%;
    height: 140%;
    object-fit: cover;
    opacity: 0.38;
    z-index: 1;
    pointer-events: none;
  }
  .rubricPhoto {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 2;
    pointer-events: none;
  }
  .rubricPromoFooter {
    flex: 0 0 auto;
    position: relative;
    z-index: 3;
    background-color: var(--color-darkslategray-600);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 16px 24px;
    box-sizing: border-box;
    gap: 16px;
    border-radius: 0 0 24px 24px;
  }
  .rubricPromoText {
    min-width: 0;
  }
  .rubricPromoTitle {
    font-weight: 800;
    font-size: 18.9px;
    color: var(--color-white);
  }
  .rubricPromoSub {
    margin-top: 4px;
    font-size: var(--fs-13);
    color: var(--color-gainsboro);
  }
  .rubricPromoBtn {
    height: 44px;
    flex-shrink: 0;
    border-radius: var(--br-12);
    background-color: var(--color-goldenrod-200);
    display: flex;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    gap: var(--gap-8);
    font-size: var(--fs-14);
    color: var(--color-darkslategray-500);
    cursor: pointer;
    white-space: nowrap;
  }
  .arrowIcon {
    height: var(--height-16);
    width: var(--width-16);
  }

  /* ── Summary strip ── */
  .accountSummary {
    width: 100%;
    border-radius: var(--br-22);
    background-color: var(--color-white);
    border: var(--border-2);
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: stretch;
    font-family: var(--font-inter);
  }
  .summaryCell {
    padding: 22px 28px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    min-width: 0;
  }
  .summaryDivider {
    border-left: 1px solid var(--color-antiquewhite-200);
  }
  .summaryLabel {
    font-size: var(--fs-14);
    color: var(--color-darkslategray-100);
  }
  .summaryValue {
    margin: 0;
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -0.6px;
    color: var(--color-darkslategray-500);
  }
  .summaryMeta {
    font-size: var(--fs-12);
    color: var(--color-darkslategray-100);
  }
  .summaryDots {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
    padding: 4px 0;
  }
  .summaryDot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }
  .dotDue {
    background-color: var(--color-saddlebrown);
  }
  .dotWeek {
    background-color: var(--color-goldenrod-200);
  }
  .dotDone {
    background-color: var(--color-limegreen);
  }

  /* ── Queue + rubric grid ── */
  .divgCalc {
    align-self: stretch;
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.85fr);
    gap: 16px;
    max-width: 100%;
  }
  .section,
  .section2 {
    position: relative;
    border-radius: var(--br-26);
    background-color: var(--color-white);
    border: var(--border-2);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 24px 28px;
    gap: var(--gap-16);
    max-width: 100%;
    min-width: 0;
    text-align: left;
    font-family: var(--font-inter);
    color: var(--color-darkslategray-500);
  }
  .queueHead {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .sectionTitle {
    margin: 0;
    font-size: 20.6px;
    font-weight: 800;
    letter-spacing: -0.06px;
  }
  .sectionSub {
    margin-top: 4px;
    font-size: var(--fs-13);
    color: var(--color-darkslategray-100);
  }
  .tabs {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .tab {
    height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    border: 1px solid var(--color-lightgray-200);
    background-color: var(--color-white);
    color: var(--color-darkslategray-300);
    font-family: inherit;
    font-size: var(--fs-12);
    font-weight: 600;
    cursor: pointer;
  }
  .tab:hover {
    background-color: var(--color-blanchedalmond);
  }
  .tabActive {
    background-color: var(--color-darkslategray-500);
    border-color: var(--color-darkslategray-500);
    color: var(--color-white);
  }
  .tableWrap {
    width: 100%;
    overflow-x: auto;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    min-width: 620px;
  }
  .th {
    text-align: left;
    padding: 10px 12px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-darkslategray-100);
    border-bottom: 1px solid var(--color-antiquewhite-200);
    white-space: nowrap;
  }
  .thRight {
    text-align: right;
    padding: 10px 12px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-darkslategray-100);
    border-bottom: 1px solid var(--color-antiquewhite-200);
    white-space: nowrap;
  }
  .td {
    padding: 14px 12px;
    font-size: var(--fs-13);
    color: var(--color-darkslategray-500);
    border-bottom: 1px solid var(--color-antiquewhite-200);
    vertical-align: middle;
  }
  .tdRight {
    text-align: right;
    padding: 14px 12px;
    font-size: var(--fs-13);
    color: var(--color-darkslategray-500);
    border-bottom: 1px solid var(--color-antiquewhite-200);
    vertical-align: middle;
  }
  .ideaTitle {
    font-weight: 700;
  }
  .ideaRef {
    margin-top: 3px;
    font-size: 11px;
    color: var(--color-darkslategray-100);
  }
  .badge {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
  }
  .badgeDue {
    background-color: #f6e2d8;
    color: var(--color-saddlebrown);
  }
  .badgeProgress {
    background-color: var(--color-blanchedalmond);
    color: var(--color-saddlebrown);
  }
  .badgeReview {
    background-color: #e9efe2;
    color: var(--color-darkslategray-500);
  }
  .badgeDone {
    background-color: #e4f2e0;
    color: #2c6b32;
  }
  .evalBtn {
    height: 34px;
    padding: 0 14px;
    border-radius: 10px;
    border: none;
    background-color: var(--color-goldenrod-200);
    color: var(--color-darkslategray-500);
    font-family: inherit;
    font-size: var(--fs-12);
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
  }
  .evalBtn:hover {
    filter: brightness(1.04);
  }
  .emptyCell {
    padding: 26px 12px;
    text-align: center;
    font-size: var(--fs-13);
    color: var(--color-darkslategray-100);
  }

  .rubricHeader {
    display: flex;
    flex-direction: column;
  }
  .rubricRows {
    display: flex;
    flex-direction: column;
  }
  .rubricRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 11px 0;
    border-bottom: 1px dashed var(--color-antiquewhite-200);
    font-size: var(--fs-13);
  }
  .rubricName {
    color: var(--color-darkslategray-500);
  }
  .rubricWeight {
    font-weight: 700;
    color: var(--color-darkslategray-500);
    white-space: nowrap;
  }
  .scoreCard {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border-radius: 20px;
    background-color: var(--color-darkslategray-500);
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: var(--color-gainsboro);
  }
  .scorePattern {
    width: 88px;
    height: 100%;
    position: absolute;
    top: 0;
    right: -22px;
    object-fit: cover;
    object-position: center top;
    opacity: 0.85;
    mix-blend-mode: screen;
    z-index: 0;
    pointer-events: none;
  }
  .scoreLabel {
    position: relative;
    z-index: 2;
    font-size: var(--fs-12);
  }
  .scoreValue {
    position: relative;
    z-index: 2;
    margin: 0;
    font-size: 36px;
    line-height: 1.1;
    font-weight: 800;
    color: var(--color-goldenrod-200);
  }
  .scoreMeta {
    position: relative;
    z-index: 2;
    font-size: var(--fs-12);
    color: var(--color-silver-200);
  }
  .scoreFooter {
    position: relative;
    z-index: 2;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 10px;
    padding-top: 12px;
    border-top: 1px solid var(--color-gray-300);
  }
  .scoreStat {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: var(--fs-12);
    color: var(--color-silver-200);
  }
  .scoreStat b {
    font-size: var(--fs-14);
    color: var(--color-white);
  }

  @media screen and (max-width: 1200px) {
    .mainContent {
      padding: 24px 20px 32px;
    }
    .reviewLoadSide {
      width: 190px;
    }
  }
  @media screen and (max-width: 1100px) {
    .evaluatorDashboard {
      grid-template-columns: 1fr;
    }
    .reviewCardsRow,
    .divgCalc {
      grid-template-columns: 1fr;
    }
  }
  @media screen and (max-width: 1050px) {
    .mainContent {
      padding-top: 62px;
      padding-left: 14px;
      padding-right: 14px;
      padding-bottom: 20px;
    }
    .dumelaMarion {
      font-size: 24px;
    }
  }
  @media screen and (max-width: 750px) {
    .mainContent {
      padding-left: 12px;
      padding-right: 12px;
      padding-bottom: 96px;
      gap: 14px;
    }
    .div {
      flex-direction: column-reverse;
      align-items: stretch;
      row-gap: 12px;
      padding: 0;
    }
    .dumelaMarion {
      font-size: 28px;
      letter-spacing: -0.3px;
    }
    .sunday4October {
      padding-right: 0;
      font-size: var(--fs-14);
      line-height: 1.45;
    }
    .div3 {
      height: auto;
      justify-content: flex-end;
      gap: 8px;
    }
    .notifications2New {
      height: 40px;
      width: 40px;
    }
    .a {
      height: 40px;
      min-height: 40px;
      padding: 4px 12px 4px 4px;
    }
    .userAvatarImg {
      width: 30px;
      height: 30px;
      min-width: 30px;
    }
    .span3 {
      height: auto;
    }
    .marionLucas {
      font-size: var(--fs-13);
    }
    .section,
    .section2 {
      padding: 18px 16px;
      border-radius: 20px;
    }
    .reviewLoadCard {
      flex-direction: column;
      padding: 20px 18px;
      min-height: 0;
    }
    .reviewLoadSide {
      width: 100%;
      padding-left: 0;
      padding-top: 16px;
      border-left: none;
      border-top: 1px solid rgba(255, 255, 255, 0.14);
    }
    .accountSummary {
      grid-template-columns: 1fr;
    }
    .summaryDivider {
      border-left: none;
      border-top: 1px solid var(--color-antiquewhite-200);
    }
    .rubricPromoFooter {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
      border-radius: 0 0 20px 20px;
    }
    .rubricPromoBtn {
      justify-content: center;
    }
  }

@media screen and (max-width: 760px) {
  .evaluatorDashboard {
    display: block;
    width: 100%;
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }

  .mainContent {
    height: auto;
    min-height: 100vh;
    overflow: visible;
    padding: 68px 14px 32px;
    gap: 14px;
  }

  .reviewLoadCard {
    flex-direction: column;
    padding: 18px 16px;
    border-radius: 18px;
    min-height: 0;
    gap: 14px;
  }

  .rubricCard {
    padding: 18px 16px;
    border-radius: 18px;
  }

  .rubricPhotoArea {
    min-height: 140px;
  }

  .tableWrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .table {
    min-width: 560px;
  }

  .table th,
  .table td {
    padding: 10px 8px;
    font-size: 12.5px;
  }
}

/* Gaborone theme: white header text only on this preset. */
.isGaborone .dumelaMarion {
  color: #ffffff;
}
.isGaborone .p {
  color: rgba(255, 255, 255, 0.9);
}
.isGaborone .sunday4October {
  color: #ffffff;
}
.isGaborone .marionLucas {
  color: var(--color-darkslategray-500);
}
</style>
