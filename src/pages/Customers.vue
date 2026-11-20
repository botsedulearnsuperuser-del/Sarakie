<template>
  <div :class="[$style.page, isGaborone ? $style.isGaborone : '']" :style="pageBackground">
    <!-- Reusable Stationary Sidebar -->
    <Main :active-page="'customers'" />

    <!-- Main Scrollable Content -->
    <main :class="$style.mainContent">
      <!-- Top Bar Header matching DashboardSample -->
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <h2 :class="$style.dumelaMarion">Feedback Centre</h2>
          </div>
          <div :class="$style.pWrap">
            <div :class="$style.sunday4October">
              View and respond to every evaluator comment across all your ideas
            </div>
          </div>
        </div>
        <div :class="$style.div3">
          <img
            :class="$style.notifications2New"
            alt=""
            src="/Notifications-2-new.svg"
          />
          <img :class="$style.notifications2New" alt="" src="/Help.svg" />
          <router-link to="/admin-profile" :class="$style.userA" style="text-decoration: none;">
            <img :class="$style.userAvatarImg" src="/innovator-man.webp" alt="Marion Lucas" />
            <div :class="$style.span3">
              <div :class="$style.marionLucas">Marion Lucas</div>
            </div>
          </router-link>
        </div>
      </header>

            <!-- Popup Overlay -->
      <Teleport to="body">
        <Transition name="popupFade">
          <div v-if="showPopup" :class="$style.popupOverlay" @click.self="closePopup">
            <div :class="$style.popupCard">
              <div :class="$style.popupSidebar">
                <Main :active-page="'customers'" />
              </div>

              <div :class="$style.popupContent">
                <div :class="$style.popupHeader">
                  <h2 :class="$style.popupTitle">{{ popupComment.ideaName }}</h2>
                  <button :class="$style.popupClose" type="button" @click="closePopup">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <div :class="$style.popupBanner">
                  <img
                    :class="$style.popupBannerPattern"
                    src="/pattern-2.webp"
                    alt=""
                  />
                  <div :class="$style.popupBannerContent">
                    <div :class="$style.popupTermGroup">
                      <span :class="$style.popupTermBadge">Total Evaluator Comments</span>
                    </div>
                    <div :class="$style.popupBalanceAmount">{{ popupComment.totalCount }}</div>
                    <div :class="$style.popupBorrowedInfo">
                      {{ popupComment.bannerText }}
                    </div>
                  </div>
                </div>

                <div :class="$style.popupDetailBox">
                  <div :class="$style.popupRow">
                    <span :class="$style.popupLabel">Evaluator</span>
                    <span :class="$style.popupValue">{{ popupComment.evaluator }}</span>
                  </div>
                  <div :class="$style.popupRow">
                    <span :class="$style.popupLabel">Status</span>
                    <span :class="[
                      $style.popupStatusBadge,
                      popupComment.status === 'unread' ? $style.popupStatusUnread : $style.popupStatusAnswered,
                    ]">
                      {{ popupComment.status === 'unread' ? 'Unread' : 'Answered' }}
                    </span>
                  </div>
                  <div :class="$style.popupRow">
                    <span :class="$style.popupLabel">Submitted</span>
                    <span :class="$style.popupValue">{{ popupComment.submittedDate }}</span>
                  </div>
                </div>

                <div :class="$style.popupCommentBox">
                  <div :class="$style.popupCommentLabel">Comment</div>
                  <p :class="$style.popupCommentText">{{ popupComment.comment }}</p>
                </div>

                <div :class="$style.popupActions">
                  <button
                    :class="$style.popupResubmitBtn"
                    type="button"
                    @click="resubmitFromPopup()"
                  >
                    Resubmit
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                  <button
                    :class="$style.popupReplyBtn"
                    type="button"
                    @click="toggleReply(popupComment)"
                  >
                    {{ popupComment.status === 'unread' ? 'Reply' : 'Add reply' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Popup Overlay -->
      <Teleport to="body">
        <Transition name="popupFade">
          <div v-if="showPopup" :class="$style.popupOverlay" @click.self="closePopup">
            <div :class="$style.popupCard">
              <div :class="$style.popupSidebar">
                <Main :active-page="'customers'" />
              </div>

              <div :class="$style.popupContent">
                <div :class="$style.popupHeader">
                  <h2 :class="$style.popupTitle">{{ popupComment.ideaName }}</h2>
                  <button :class="$style.popupClose" type="button" @click="closePopup">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <div :class="$style.popupBanner">
                  <img
                    :class="$style.popupBannerPattern"
                    src="/pattern-2.webp"
                    alt=""
                  />
                  <div :class="$style.popupBannerContent">
                    <div :class="$style.popupTermGroup">
                      <span :class="$style.popupTermBadge">Total Evaluator Comments</span>
                    </div>
                    <div :class="$style.popupBalanceAmount">{{ popupComment.totalCount }}</div>
                    <div :class="$style.popupBorrowedInfo">
                      {{ popupComment.bannerText }}
                    </div>
                  </div>
                </div>

                <div :class="$style.popupDetailBox">
                  <div :class="$style.popupRow">
                    <span :class="$style.popupLabel">Evaluator</span>
                    <span :class="$style.popupValue">{{ popupComment.evaluator }}</span>
                  </div>
                  <div :class="$style.popupRow">
                    <span :class="$style.popupLabel">Status</span>
                    <span :class="[
                      $style.popupStatusBadge,
                      popupComment.status === 'unread' ? $style.popupStatusUnread : $style.popupStatusAnswered,
                    ]">
                      {{ popupComment.status === 'unread' ? 'Unread' : 'Answered' }}
                    </span>
                  </div>
                  <div :class="$style.popupRow">
                    <span :class="$style.popupLabel">Submitted</span>
                    <span :class="$style.popupValue">{{ popupComment.submittedDate }}</span>
                  </div>
                </div>

                <div :class="$style.popupCommentBox">
                  <div :class="$style.popupCommentLabel">Comment</div>
                  <p :class="$style.popupCommentText">{{ popupComment.comment }}</p>
                </div>

                <div :class="$style.popupActions">
                  <button
                    :class="$style.popupResubmitBtn"
                    type="button"
                    @click="resubmitFromPopup()"
                  >
                    Resubmit
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                  <button
                    :class="$style.popupReplyBtn"
                    type="button"
                    @click="toggleReply(popupComment)"
                  >
                    {{ popupComment.status === 'unread' ? 'Reply' : 'Add reply' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Filter Pills Row -->
      <div :class="$style.filtersRow">
        <button
          v-for="filter in filterOptions"
          :key="filter.key"
          :class="[
            $style.filterPill,
            activeFilter === filter.key ? $style.filterPillActive : ''
          ]"
          type="button"
          @click="activeFilter = filter.key as any"
        >
          <span>{{ filter.label }}</span>
          <span :class="$style.filterCount">{{ filter.count }}</span>
        </button>
      </div>

      <!-- Main White Card Container -->
      <section :class="$style.cardContainer">
        <!-- Top Dark Green Banner -->
        <div :class="$style.balanceBanner">
          <img
            :class="$style.bannerPattern"
            src="/pattern-2.webp"
            alt=""
          />

          <div :class="$style.bannerContent">
            <div :class="$style.termToggleGroup">
              <span :class="$style.termBadge">Total Evaluator Comments</span>
            </div>

            <div :class="$style.balanceAmount">5</div>
            <div :class="$style.borrowedInfo">
              across 4 ideas &middot; last comment 18 November 2026
            </div>
          </div>
        </div>

        <!-- Search Bar -->
        <div :class="$style.searchWrapper">
          <input
            v-model="searchQuery"
            :class="$style.searchInput"
            type="text"
            placeholder="Search comments by idea or evaluator"
          />
          <svg
            :class="$style.searchIcon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <!-- Feedback Table -->
        <div :class="$style.tableSection">
          <h2 :class="$style.tableHeading">Evaluator Comments</h2>

          <div :class="$style.tableResponsive">
            <table :class="$style.loansTable">
              <thead>
                <tr>
                  <th :class="$style.thLeft">Idea</th>
                  <th :class="$style.thCenter">Evaluator</th>
                  <th :class="$style.thCenter">Comment</th>
                  <th :class="$style.thCenter">Status</th>
                  <th :class="$style.thLeft">Submitted</th>
                  <th :class="$style.thRight">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(comment, index) in filteredComments"
                  :key="index"
                  :class="$style.tableRow"
                >
                  <td :class="$style.tdCustomer">
                    <span :class="$style.customerNameClickable" @click="openIdea(comment)">
                      {{ comment.ideaName }}
                    </span>
                  </td>
                  <td :class="$style.tdAmount">{{ comment.evaluator }}</td>
                  <td :class="$style.tdTerm">
                    <div class="$style.commentCell">
                      <p :class="[$style.p2, comment.commentLong ? $style.p2Truncated : '']">{{ comment.comment }}</p>
                      <button
                        v-if="comment.commentLong"
                        :class="$style.viewMoreBtn"
                        type="button"
                        @click="viewMore(comment)"
                      >
                        View more
                      </button>
                      <div v-if="comment.showReply" :class="$style.replyBox">
                        <input
                          v-model="replyText"
                          type="text"
                          :class="$style.replyInput"
                          @keyup.enter="sendReply(comment)"
                          placeholder="Type a reply…"
                        />
                        <button :class="$style.replySend" type="button" @click="sendReply(comment)">
                          Send reply
                        </button>
                      </div>
                      <button :class="$style.replyToggle" type="button" @click="toggleReply(comment)">
                        {{ comment.status === 'unread' ? 'Reply' : 'Add reply' }}
                      </button>
                    </div>
                  </td>
                  <td :class="$style.tdStatusCenter">
                    <span :class="[
                      $style.unreadBadge,
                      comment.status === 'unread' ? $style.unreadOn : '',
                      comment.status === 'answered' ? $style.answeredOn : '',
                    ]">
                      {{ comment.status === 'unread' ? 'Unread' : 'Answered' }}
                    </span>
                  </td>
                  <td :class="$style.tdTerm">
                    <span :class="$style.p4">{{ comment.submittedDate }}</span>
                  </td>
                  <td :class="$style.tdAction">
                    <button
                      :class="$style.resubmitBtn"
                      type="button"
                      @click="resubmitIdea(comment.ideaId)"
                    >
                      Resubmit
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredComments.length === 0">
                  <td :class="$style.noResults" colspan="6">
                    No comments match your search criteria.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
    <ChatWithAgent />
  </div>
</template>

<script setup lang="ts">
  import { usePageTheme } from "../composables/usePageTheme";

  const pageBackground = usePageTheme();
  const isGaborone = ref(isGaboroneTheme());
  onMounted(() => {
    window.addEventListener(THEME_EVENT, () => (isGaborone.value = isGaboroneTheme()));
  });

import { onMounted, ref, computed } from "vue";
import { THEME_EVENT, isGaboroneTheme } from "../components/themes";
import { useRouter, type RouteLocationRaw } from "vue-router";
import Main from "../components/Main.vue";
import ChatWithAgent from "../components/ChatWithAgent.vue";

const router = useRouter();

const activeFilter = ref<"all" | "unread" | "answered">("all" as const);
const searchQuery = ref("");

const filterOptions = [
  { key: "all", label: "All", count: 5 },
  { key: "unread", label: "Unread", count: 3 },
  { key: "answered", label: "Answered", count: 2 },
];

interface FeedbackRecord {
  ideaId: string;
  ideaName: string;
  evaluator: string;
  comment: string;
  severity: "High" | "Medium" | "Low";
  submittedDate: string;
  status: "unread" | "answered";
  showReply: boolean;
  commentLong: boolean;
  totalCount: number;
  bannerText: string;
  hasCorrections: boolean;
}

const feedbackData: FeedbackRecord[] = [
  {
    ideaId: "irrigation-kit",
    ideaName: "Irrigation Kit",
    evaluator: "Marion Lucas",
    comment: "Clarify how the drip kit scales to commercial farms. Include capacity per station, pipe lengths for plots up to 2 hectares, and the cost difference between the smallholder and commercial configurations so the review team can assess scalability.",
    severity: "Medium",
    submittedDate: "18 November 2026",
    status: "unread",
    showReply: false,
    commentLong: true,
    totalCount: 1,
    bannerText: "1 comment on Irrigation Kit · last comment 18 November 2026",
    hasCorrections: false,
  },
  {
    ideaId: "solar-dryer",
    ideaName: "Solar Dryer",
    evaluator: "Marion Lucas",
    comment: "Add CIPA registration number to the application. Please include the CIPA company registration certificate and the current membership status so the review team can verify compliance before proceeding with the assessment.",
    severity: "Medium",
    submittedDate: "2 October 2026",
    status: "answered",
    showReply: false,
    commentLong: true,
    totalCount: 1,
    bannerText: "1 comment on Solar Dryer · last comment 2 October 2026",
    hasCorrections: false,
  },
  {
    ideaId: "edu-app",
    ideaName: "Edu App",
    evaluator: "Marion Lucas",
    comment: "Provide itemised cost estimates for development and hosting. Break down the costs for the mobile app development, server hosting, content creation, and ongoing maintenance so the budget can be reviewed in detail.",
    severity: "High",
    submittedDate: "2 October 2026",
    status: "unread",
    showReply: false,
    commentLong: true,
    totalCount: 1,
    bannerText: "1 comment on Edu App · last comment 2 October 2026",
    hasCorrections: true,
  },
  {
    ideaId: "agri-drone",
    ideaName: "Agri Drone",
    evaluator: "Marion Lucas",
    comment: "Demonstrate pesticide reduction metrics from pilot results. Include the before-and-after pesticide usage figures, the sampling methodology, and the confidence interval around the reported 30% reduction so the claim can be validated.",
    severity: "High",
    submittedDate: "2 October 2026",
    status: "unread",
    showReply: false,
    commentLong: true,
    totalCount: 1,
    bannerText: "1 comment on Agri Drone · last comment 2 October 2026",
    hasCorrections: false,
  },
  {
    ideaId: "irrigation-kit-draft",
    ideaName: "Irrigation Kit Draft",
    evaluator: "Marion Lucas",
    comment: "Working draft still being refined — resubmit once the budget is finalised. The current draft shows promise but the budget breakdown is incomplete; please finalise the component costs and resubmit for review when ready.",
    severity: "Low",
    submittedDate: "18 November 2026",
    status: "answered",
    showReply: false,
    commentLong: true,
    totalCount: 1,
    bannerText: "1 comment on Irrigation Kit Draft · last comment 18 November 2026",
    hasCorrections: true,
  },
]

const filteredComments = computed(() => {
  let list = [...feedbackData];

  if (activeFilter.value === "unread") {
    list = list.filter((c) => c.status === "unread");
  } else if (activeFilter.value === "answered") {
    list = list.filter((c) => c.status === "answered");
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (c) =>
        c.ideaName.toLowerCase().includes(q) ||
        c.evaluator.toLowerCase().includes(q) ||
        c.comment.toLowerCase().includes(q)
    );
  }

  return list;
});

const replyText = ref("");

const showPopup = ref(false);
const popupComment = ref<FeedbackRecord>({
  ideaId: "",
  ideaName: "",
  evaluator: "",
  comment: "",
  severity: "Medium",
  submittedDate: "",
  status: "unread",
  showReply: false,
  commentLong: false,
  totalCount: 0,
  bannerText: "",
  hasCorrections: false,
});

function viewMore(comment: FeedbackRecord) {
  popupComment.value = { ...comment };
  showPopup.value = true;
}

function closePopup() {
  showPopup.value = false;
}

function resubmitFromPopup() {
  closePopup();
  resubmitIdea(popupComment.value.ideaId);
}

function toggleReply(comment: FeedbackRecord) {
  comment.showReply = !comment.showReply;
  if (comment.showReply) replyText.value = "";
}

function sendReply(comment: FeedbackRecord) {
  if (!replyText.value.trim()) return;
  comment.status = "answered";
  comment.showReply = false;
  replyText.value = "";
}

function resubmitIdea(ideaId: string) {
  const names: Record<string, string> = {
    "irrigation-kit": "Irrigation Kit",
    "solar-dryer": "Solar Dryer",
    "edu-app": "Edu App",
    "agri-drone": "Agri Drone",
    "irrigation-kit-draft": "Irrigation Kit Draft",
  };
  const ideaName = names[ideaId] || ideaId;
  const comment = feedbackData.find((c) => c.ideaId === ideaId);
  const target: Partial<RouteLocationRaw> = {
    name: "IdeaView",
    query: { name: ideaName },
  };
  if (comment?.hasCorrections) {
    (target as any).hash = "#corrections";
  }
  router.push(target);
}

function openIdea(comment: FeedbackRecord) {
  router.push({ name: "IdeaView", query: { name: comment.ideaName } });
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
}

.div {
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  box-sizing: border-box;
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

.span2 {
  height: 36px;
  width: 36px;
  border-radius: var(--br-18);
  background-color: var(--color-darkslategray-500);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mlText {
  position: relative;
  color: var(--color-goldenrod-200);
  font-size: 13px;
  font-weight: 700;
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
  font-size: var(--fs-15);
}

.filtersRow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.filterPill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.filterPill:hover {
  border-color: #d1d5db;
}

.filterPillActive {
  background-color: var(--color-darkslategray-600);
  color: #ffffff;
  border-color: var(--color-darkslategray-600);
}

.filterCount {
  font-size: 13px;
  opacity: 0.9;
}

.cardContainer {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border: 1px solid var(--color-darkslategray-500);
  padding-bottom: 24px;
}

.balanceBanner {
  position: relative;
  background-color: var(--color-darkslategray-600);
  border-radius: 20px 20px 0 0;
  padding: 28px 32px 32px;
  overflow: hidden;
  box-sizing: border-box;
}

.bannerPattern {
  position: absolute;
  top: 0;
  right: -10px;
  height: 100%;
  width: 140px;
  object-fit: cover;
  object-position: center top;
  opacity: 0.9;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
}

.bannerContent {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.termToggleGroup {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.termBadge {
  border: 1.5px solid var(--color-darkslategray-500);
  color: var(--color-darkslategray-500);
  background-color: #ffffff;
  border-radius: 9999px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 700;
}

.balanceAmount {
  font-size: clamp(34px, 4vw, 48px);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.borrowedInfo {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
}

.searchWrapper {
  margin: 24px 28px 20px;
  position: relative;
  display: flex;
  align-items: center;
}

.searchInput {
  width: 100%;
  height: 44px;
  background-color: #f3f5f4;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 0 44px 0 20px;
  font-size: 14px;
  font-family: var(--font-inter);
  color: #1a202c;
  outline: none;
  text-align: center;
  transition: border-color 0.2s, background-color 0.2s;
  box-sizing: border-box;
}

.searchInput:focus {
  background-color: #ffffff;
  border-color: var(--color-goldenrod-300);
}

.searchInput::placeholder {
  color: #718096;
}

.searchIcon {
  position: absolute;
  right: 18px;
  width: 18px;
  height: 18px;
  color: #4a5568;
  pointer-events: none;
}

.tableSection {
  padding: 0 28px;
}

.tableHeading {
  margin: 0 0 14px;
  font-size: 18px;
  font-weight: 800;
  color: #1a202c;
}

.tableResponsive {
  width: 100%;
  overflow-x: auto;
}

.loansTable {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.loansTable thead th {
  padding: 10px 12px 14px;
  font-size: 12.5px;
  font-weight: 600;
  color: #718096;
  border-bottom: 1px solid #edf2f7;
}

.thLeft {
  text-align: left;
  padding-left: 0 !important;
}

.thCenter {
  text-align: center;
}

.thRight {
  text-align: right;
  padding-right: 0 !important;
}

.tableRow td {
  padding: 14px 12px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13.5px;
  vertical-align: middle;
}

.p2 {
  margin: 0 0 4px;
  font-size: 13px;
  line-height: 1.4;
  color: #374151;
  max-width: 340px;
}

.tdCustomer {
  font-weight: 700;
  color: #1a202c;
  padding-left: 0 !important;
}

.customerNameClickable {
  cursor: pointer;
  transition: color 0.15s ease;
  font-size: 13.5px;
}

.customerNameClickable:hover {
  color: #2e7d5b;
  text-decoration: underline;
}

.tdAmount {
  text-align: center;
  font-weight: 600;
  color: #4a5568;
  font-size: 13.5px;
}

.tdTerm {
  text-align: center;
  color: #4a5568;
  font-weight: 500;
  font-size: 13.5px;
}

.tdStatus {
  text-align: right;
  padding-right: 0 !important;
}

.tdStatusCenter {
  text-align: center;
}

.tdAction {
  text-align: right;
  padding-right: 0 !important;
}

.replyBox {
  margin-top: 8px;
  padding: 8px;
  background-color: #f3f5f4;
  border-radius: 8px;
  border: 1px solid var(--color-goldenrod-200);
  display: flex;
  gap: 8px;
  align-items: center;
}

.replyInput {
  flex: 1;
  height: 32px;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0 10px;
  font-size: 13px;
  font-family: var(--font-inter);
  color: #1a202c;
  outline: none;
}

.replyInput:focus {
  border-color: var(--color-goldenrod-300);
  box-shadow: 0 0 0 2px rgba(237, 196, 47, 0.18);
}

.replySend {
  background-color: var(--color-darkslategray-500);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12.5px;
  font-weight: 700;
  font-family: var(--font-inter);
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.15s ease;
}

.replySend:hover {
  background-color: var(--color-darkslategray-600);
}

.replyToggle {
  margin-top: 8px;
  background: none;
  border: none;
  color: var(--color-goldenrod-300);
  font-size: 12.5px;
  font-weight: 600;
  font-family: var(--font-inter);
  cursor: pointer;
  text-decoration: underline;
}

.replyToggle:hover {
  color: var(--color-goldenrod-200);
}

.unreadBadge {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.3px;
  padding: 4px 10px;
  border-radius: 9999px;
  border: 1.5px solid var(--color-softred-200);
  color: var(--color-softred-700);
  background-color: #fff5f5;
  text-transform: uppercase;
}

.unreadOn {
  background-color: var(--color-softred-200) !important;
  color: var(--color-softred-900) !important;
  border-color: var(--color-softred-200) !important;
}

.answeredOn {
  background-color: #f0fdf4;
  color: var(--color-darkslategray-500);
  border-color: #bbf7d0;
}

.p2Truncated {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.viewMoreBtn {
  margin-top: 6px;
  background: none;
  border: none;
  color: var(--color-goldenrod-300);
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-inter);
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

.viewMoreBtn:hover {
  color: var(--color-goldenrod-200);
}

.commentCell {
  display: flex;
  flex-direction: column;
}

.p4 {
  font-size: 12.5px;
  color: #92691b;
}

.resubmitBtn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid var(--color-darkslategray-400);
  background-color: var(--color-darkslategray-600);
  color: #ffffff;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.resubmitBtn:hover {
  background-color: var(--color-darkslategray-500);
  border-color: var(--color-darkslategray-500);
}

.noResults {
  text-align: center;
  padding: 32px 0;
  color: #718096;
  font-size: 14px;
}

/* Popup overlay */
.popupOverlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  font-family: var(--font-inter);
}

.popupCard {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.popupSidebar {
  width: 240px;
  flex-shrink: 0;
  background-color: var(--color-darkslategray-500);
  height: 100vh;
  overflow-y: auto;
  font-family: var(--font-inter);
}

.popupContent {
  flex: 1;
  background-color: #ffffff;
  overflow-y: auto;
  padding: 28px 36px 36px;
  box-sizing: border-box;
}

.popupHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.popupTitle {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: var(--color-darkslategray-500);
  letter-spacing: -0.4px;
}

.popupClose {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #6b7280;
  border-radius: 6px;
  transition: background-color 0.15s ease;
}

.popupClose:hover {
  background-color: #f3f4f6;
}

.popupBanner {
  position: relative;
  background-color: var(--color-darkslategray-600);
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 22px;
  overflow: hidden;
  box-sizing: border-box;
}

.popupBannerPattern {
  position: absolute;
  top: 0;
  right: -8px;
  height: 100%;
  width: 120px;
  object-fit: cover;
  opacity: 0.85;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
}

.popupBannerContent {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.popupTermGroup {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.popupTermBadge {
  border: 1.5px solid var(--color-darkslategray-500);
  color: var(--color-darkslategray-500);
  background-color: #ffffff;
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 11.5px;
  font-weight: 700;
}

.popupBalanceAmount {
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 4px;
  letter-spacing: -0.3px;
}

.popupBorrowedInfo {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.popupDetailBox {
  background-color: #faf7f2;
  border: 1px solid #ede4d6;
  border-radius: 14px;
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.popupRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13.5px;
}

.popupLabel {
  color: #6b7280;
  font-weight: 500;
}

.popupValue {
  color: #111827;
  font-weight: 700;
  text-align: right;
  max-width: 60%;
}

.popupStatusBadge {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.3px;
  padding: 3px 9px;
  border-radius: 9999px;
  text-transform: uppercase;
}

.popupStatusUnread {
  background-color: var(--color-softred-200);
  color: var(--color-softred-900);
  border: 1.5px solid var(--color-softred-200);
}

.popupStatusAnswered {
  background-color: #f0fdf4;
  color: var(--color-darkslategray-500);
  border: 1.5px solid #bbf7d0;
}

.popupCommentBox {
  border: 1px solid #fed7aa;
  border-radius: 14px;
  padding: 16px 20px;
  margin-bottom: 20px;
  background-color: #fff7ed;
}

.popupCommentLabel {
  font-size: 14px;
  font-weight: 800;
  color: #7c2d12;
  margin-bottom: 4px;
}

.popupCommentText {
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: #9a3412;
}

.popupActions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.popupResubmitBtn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1px solid var(--color-darkslategray-400);
  background-color: var(--color-darkslategray-600);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.popupResubmitBtn:hover {
  background-color: var(--color-darkslategray-500);
  border-color: var(--color-darkslategray-500);
}

.popupReplyBtn {
  background: none;
  border: none;
  color: var(--color-goldenrod-300);
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-inter);
  cursor: pointer;
  text-decoration: underline;
  padding: 6px 0;
}

.popupReplyBtn:hover {
  color: var(--color-goldenrod-200);
}

.popupFade-enter-active,
.popupFade-leave-active {
  transition: opacity 0.2s ease;
}

.popupFade-enter-from,
.popupFade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 1050px) {
  .mainContent {
    padding-top: 64px;
  }
}

/* ── Mobile ── */
@media screen and (max-width: 760px) {
  .page {
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
    padding: 68px 14px 40px;
    box-sizing: border-box;
  }

  .div {
    flex-direction: column-reverse;
    align-items: stretch;
    row-gap: 12px;
    margin-bottom: 16px;
  }

  .div2 {
    width: 100%;
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

  .balanceBanner {
    padding: 20px 16px 22px;
    border-radius: 16px 16px 0 0;
  }

  .cardContainer {
    border-radius: 16px;
  }

  .filtersRow {
    gap: 8px;
    margin-bottom: 16px;
  }

  .filterPill {
    padding: 8px 12px;
    font-size: 12.5px;
  }

  .loansTable {
    min-width: 520px;
  }


  .bannerPattern {
    width: 92px;
    opacity: 0.6;
  }
}

@media screen and (max-width: 760px) {
  .loansTable {
    min-width: 470px;
  }

  .tableResponsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .loansTable thead th {
    padding: 8px 6px 10px;
    font-size: 10.5px;
    letter-spacing: 0.3px;
  }

  .tableRow td {
    padding: 12px 6px;
    font-size: 12.5px;
  }

  .loansTable th:nth-child(2),
  .loansTable td:nth-child(2),
  .loansTable th:nth-child(5),
  .loansTable td:nth-child(5) {
    display: none;
  }
}

/* Gaborone theme: white header text only on this preset. */
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
