<template>
  <div :class="[$style.page, isGaborone ? $style.isGaborone : '']" :style="pageBackground">
    <!-- Reusable Stationary Sidebar -->
    <Main :active-page="'my-applications'" />

    <!-- Main Scrollable Content -->
    <main :class="$style.mainContent">
      <!-- Top Bar Header matching InnovatorDashboard -->
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <h2 :class="$style.dumelaMarion">My Applications</h2>
          </div>
          <div :class="$style.p">
            <div :class="$style.sunday4October">
              Every funding application you’ve submitted to CEDA, and where each one stands.
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
          <router-link to="/profile" :class="$style.a" style="text-decoration: none;">
            <img :class="$style.userAvatarImg" src="/innovator-man.webp" alt="Marion Lucas" />
            <div :class="$style.span3">
              <div :class="$style.marionLucas">Marion Lucas</div>
            </div>
          </router-link>
        </div>
      </header>

      <!-- Filter Pills Row -->
      <div :class="$style.filtersRow">
        <button
          v-for="filter in filterOptions"
          :key="filter.label"
          :class="[
            $style.filterPill,
            activeFilter === filter.key ? $style.filterPillActive : ''
          ]"
          type="button"
          @click="activeFilter = filter.key"
        >
          <span>{{ filter.label }}</span>
          <span :class="$style.filterCount">{{ filter.count }}</span>
        </button>
      </div>

      <!-- Main White Card Container -->
      <section :class="$style.cardContainer">
        <!-- Top Dark Green Balance Banner -->
        <div :class="$style.balanceBanner">
          <!-- Botswana vertical chevron pattern along the right edge -->
          <img
            :class="$style.bannerPattern"
            src="/pattern-2.webp"
            alt=""
          />

          <div :class="$style.bannerContent">
            <!-- Term Toggles -->
            <div :class="$style.termToggleGroup">
              <button
                :class="[
                  $style.termToggleBtn,
                  activeView === 'all' ? $style.termToggleBtnActive : ''
                ]"
                type="button"
                @click="activeView = 'all'"
              >
                All applications
              </button>
              <button
                :class="[
                  $style.termToggleBtn,
                  activeView === 'awaiting' ? $style.termToggleBtnActive : ''
                ]"
                type="button"
                @click="activeView = 'awaiting'"
              >
                Awaiting decision
              </button>
            </div>

            <!-- Funding requested -->
            <span :class="$style.balanceLabel">Total funding requested</span>
            <div :class="$style.balanceAmount">{{ totalFunding }}</div>
            <div :class="$style.borrowedInfo">
              across {{ applicationsData.length }} applications
              <template v-if="applicationsData.length > 0">
                · last submitted {{ applicationsData[0]?.submitted }}
              </template>
              <button :class="$style.teamBtn" type="button" @click="goToTeam">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 1024 1024"
                >
                  <path d="M0 0h1024v1024H0z" fill="none" />
                  <path fill="currentColor" d="M824.2 699.9a301.6 301.6 0 0 0-86.4-60.4C783.1 602.8 812 546.8 812 484c0-110.8-92.4-201.7-203.2-200c-109.1 1.7-197 90.6-197 200c0 62.8 29 118.8 74.2 155.5a301 301 0 0 0-86.4 60.4C345 754.6 314 826.8 312 903.8a8 8 0 0 0 8 8.2h56c4.3 0 7.9-3.4 8-7.7c1.9-58 25.4-112.3 66.7-153.5A226.62 226.62 0 0 1 612 684c60.9 0 118.2 23.7 161.3 66.8C814.5 792 838 846.3 840 904.3c.1 4.3 3.7 7.7 8 7.7h56a8 8 0 0 0 8-8.2c-2-77-33-149.2-87.8-203.9M612 612c-34.2 0-66.4-13.3-90.5-37.5a126.86 126.86 0 0 1-37.5-91.8c.3-32.8 13.4-64.5 36.3-88c24-24.6 56.1-38.3 90.4-38.7c33.9-.3 66.8 12.9 91 36.6c24.8 24.3 38.4 56.8 38.4 91.4c0 34.2-13.3 66.3-37.5 90.5A127.3 127.3 0 0 1 612 612M361.5 510.4c-.9-8.7-1.4-17.5-1.4-26.4c0-15.9 1.5-31.4 4.3-46.5c.7-3.6-1.2-7.3-4.5-8.8c-13.6-6.1-26.1-14.5-36.9-25.1a127.54 127.54 0 0 1-38.7-95.4c.9-32.1 13.8-62.6 36.3-85.6c24.7-25.3 57.9-39.1 93.2-38.7c31.9.3 62.7 12.6 86 34.4c7.9 7.4 14.7 15.6 20.4 24.4c2 3.1 5.9 4.4 9.3 3.2c17.6-6.1 36.2-10.4 55.3-12.4c5.6-.6 8.8-6.6 6.3-11.6c-32.5-64.3-98.9-108.7-175.7-109.9c-110.9-1.7-203.3 89.2-203.3 199.9c0 62.8 28.9 118.8 74.2 155.5c-31.8 14.7-61.1 35-86.5 60.4c-54.8 54.7-85.8 126.9-87.8 204a8 8 0 0 0 8 8.2h56.1c4.3 0 7.9-3.4 8-7.7c1.9-58 25.4-112.3 66.7-153.5c29.4-29.4 65.4-49.8 104.7-59.7c3.9-1 6.5-4.7 6-8.7" />
                </svg>
                Team
              </button>
            </div>
          </div>

          <router-link to="/new-idea" :class="$style.newApplicationBtn" style="text-decoration: none;">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New application
          </router-link>
        </div>

        <!-- Settle Early Notice Banner -->
        <div :class="$style.settleBanner">
          <div :class="$style.settleTextGroup">
            <span :class="$style.settleTitle">Two applications need your attention</span>
            <span :class="$style.settleDesc">
              Edu App has feedback waiting, and Irrigation Kit is still under review.
            </span>
          </div>
          <a :class="$style.debitOrderLink" href="#view-feedback" @click.prevent>
            Open feedback
          </a>
        </div>

        <!-- Search Bar -->
        <div :class="$style.searchWrapper">
          <input
            v-model="searchQuery"
            :class="$style.searchInput"
            type="text"
            placeholder="Search applications by name"
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

        <!-- Folder View: List view toggle -->
        <div v-if="folderView" :class="$style.folderViewTopBar">
          <h2 :class="$style.tableHeading">Applications</h2>
          <button
            :class="$style.listViewToggleBtn"
            type="button"
            @click="folderView = false"
          >
            List view
          </button>
        </div>

        <!-- Folder View Grid -->
        <div v-if="folderView" :class="$style.folderViewWrapper">
          <div
            v-for="app in applicationsData"
            :key="app.applicationId"
            :class="$style.folderCard"
            @mouseenter="hoveredFolder = app.applicationId"
            @mouseleave="hoveredFolder = (hoveredFolder === app.applicationId) ? null : hoveredFolder"
          >
            <FolderReveal
              :color="folderColor(app.name)"
              :items="folderItems"
              :label="app.name"
              :size="150"
              :open="hoveredFolder === app.applicationId"
            />
            <div :class="$style.folderIconActions">
              <button :class="$style.folderIconBtn" type="button" title="Rename folder" @click="openRenamePopup(app)">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <g fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="3.5" stroke-width="1.5">
                    <path d="M4 4.5C4 3.67 4.67 3 5.5 3H13l5 5v4.5" />
                    <path d="M13 3v5h5m-7.5 13h-5c-.83 0-1.5-.67-1.5-1.5v-15M14.75 22l.5-2.5L20 14.75l2 2l-4.75 4.75Z" />
                  </g>
                </svg>
              </button>
              <button :class="$style.folderIconBtn" type="button" title="Open" @click="doOpen(app)">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <g fill="none">
                    <path fill="currentColor" d="M19.99 8.46c.24.53.36.8.36 1.01a1 1 0 0 1-.6.91c-.19.1-.48.1-1.06.1H6.42c-.62 0-.92 0-1.17.15s-.37.43-.64.98L1.7 17.77l.38-11.31c.02-.82.04-1.23.29-1.5s.65-.32 1.46-.42l1.33-.16h2.33c.36 0 .54 0 .71.06s.3.18.58.41l2.43 2.06c.27.22.4.33.55.4c.16.05.33.06.67.07l6.32.24c.26.01.38.02.5.05a1 1 0 0 1 .52.35c.07.1.12.21.23.44" opacity=".2" />
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.29 19.59h-3.6c-2.83 0-4.25 0-5.13-.88s-.87-2.3-.87-5.12V6.9a2.4 2.4 0 0 1 2.4-2.4h2.06c.51 0 .77 0 1.02.03a4 4 0 0 1 1.82.71c.2.15.4.32.77.66c.38.35.56.52.77.67a4 4 0 0 0 1.82.7c.25.04.5.04 1.02.04h4.45c1.7 0 3.07 1.37 3.07 3.07" />
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.8 10.42h6.87c2.67 0 4 0 4.6.87c.6.88.1 2.12-.89 4.6l-.46 1.17c-.49 1.23-.73 1.84-1.24 2.18c-.5.35-1.16.35-2.48.35H7.38c-2.59 0-3.88 0-4.48-.85c-.6-.86-.16-2.07.72-4.51l.42-1.17c.47-1.28.7-1.92 1.21-2.28c.52-.36 1.2-.36 2.56-.36z" />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Rename folder popup -->
        <div v-if="renamePopupApp" :class="$style.renameOverlay" @click.self="closeRenamePopup">
          <div :class="$style.renamePopup">
            <h3 :class="$style.renameTitle">Rename folder</h3>
            <input
              v-model="renameDraft"
              :class="$style.renameInput"
              type="text"
              placeholder="Folder name"
              @keydown.enter="saveRenamePopup"
              @keydown.escape="closeRenamePopup"
            />
            <p :class="$style.renameNote">
              This will only rename the folder and will not affect the name of the application file.
            </p>
            <div :class="$style.renameActions">
              <button :class="$style.renameCancelBtn" type="button" @click="closeRenamePopup">Cancel</button>
              <button :class="$style.renameSaveBtn" type="button" @click="saveRenamePopup">Save</button>
            </div>
          </div>
        </div>

        <!-- Loans Table (List View) -->
        <div v-if="!folderView" :class="$style.tableSection">
          <div :class="$style.tableHeadingRow">
            <h2 :class="$style.tableHeading">Applications</h2>
            <button
              :class="$style.folderViewToggleBtn"
              type="button"
              @click="folderView = true"
            >
              Folder view
            </button>
          </div>

          <div :class="$style.tableResponsive">
            <table :class="$style.loansTable">
              <thead>
                <tr>
                  <th :class="$style.thLeft">Application</th>
                  <th :class="$style.thCenter">Funding requested</th>
                  <th :class="$style.thCenter">Duration</th>
                  <th :class="$style.thCenter">Status</th>
                  <th :class="$style.thRight">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="application in filteredApplications"
                  :key="application.applicationId"
                  :class="$style.tableRow"
                >
                  <td :class="$style.tdCustomer">
                    <span :class="$style.customerNameClickable" @click="openApplication(application)">
                      {{ application.name }}
                    </span>
                    <span :class="$style.appMeta">{{ application.applicationId }} · Submitted {{ application.submitted }}</span>
                  </td>
                  <td :class="$style.tdAmount">{{ application.funding }}</td>
                  <td :class="$style.tdTerm">{{ application.duration }}</td>
                  <td :class="$style.tdStatusCenter">
                    <span :class="getStatusClass(application.status)">
                      {{ application.status }}
                    </span>
                  </td>
                  <td :class="$style.tdAction">
                    <button
                      :class="$style.viewLoanBtn"
                      type="button"
                      @click="openApplication(application)"
                    >
                      View application
                      <svg v-if="application.status !== 'FEEDBACK'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                      <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredApplications.length === 0">
                  <td :class="$style.noResults" colspan="5">
                    No applications match your search criteria.
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

import { onMounted, ref, computed, useCssModule } from "vue";
import { THEME_EVENT, isGaboroneTheme } from "../components/themes";

import { useRouter } from "vue-router";
import Main from "../components/Main.vue";
import ChatWithAgent from "../components/ChatWithAgent.vue";
import FolderReveal from "../components/ui/FolderReveal.vue";
import { supabase } from "../lib/supabase";
import { session } from "../lib/auth";

const router = useRouter();
const activeFilter = ref("all");
const activeView = ref<"all" | "awaiting">("all");
const searchQuery = ref("");
const folderView = ref(false);
const hoveredFolder = ref<string | null>(null);
const renamePopupApp = ref<ApplicationRecord | null>(null);
const renameDraft = ref("");

function openRenamePopup(app: ApplicationRecord) {
  renamePopupApp.value = app;
  renameDraft.value = app.name;
}
function closeRenamePopup() {
  renamePopupApp.value = null;
}
async function saveRenamePopup() {
  const app = renamePopupApp.value;
  const v = renameDraft.value.trim();
  if (app && v) {
    app.name = v;
    if (app.dbId && supabase) {
      const { error } = await supabase
        .from("applications")
        .update({ title: v })
        .eq("id", app.dbId);
      if (error) loadError.value = error.message;
    }
  }
  closeRenamePopup();
}

const docCard = (title: string, size: string, bg = "#f4f4f5") => `
<div style="display:flex;flex-direction:column;height:100%;">
  <div style="flex:1;padding:6px;display:flex;flex-direction:column;gap:3px;background:${bg};">
    <div style="height:2px;border-radius:9999px;background:rgba(0,0,0,0.15);width:88%;"></div>
    <div style="height:2px;border-radius:9999px;background:rgba(0,0,0,0.15);width:70%;"></div>
    <div style="height:2px;border-radius:9999px;background:rgba(0,0,0,0.15);width:78%;"></div>
  </div>
  <div style="border-top:1px solid rgba(0,0,0,0.1);padding:2px 4px;background:#ffffff;">
    <p style="font-size:8px;font-weight:600;margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#1a202c;">${title}</p>
    <p style="font-size:6px;color:#718096;margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${size}</p>
  </div>
</div>`;

const folderItems = [
  { id: "doc-1", content: docCard("Business Plan.pdf", "PDF • 2.1 MB") },
  { id: "doc-2", content: docCard("Prototype Photos.docx", "DOCX • 8.4 MB", "oklch(0.975 0.014 150)") },
  { id: "doc-3", content: docCard("Budget Breakdown.xlsx", "XLSX • 340 KB") },
];

type ApplicationStatus =
  | "UNDER REVIEW"
  | "APPROVED"
  | "FEEDBACK"
  | "AWARDED"
  | "DECLINED"
  | "DRAFT";

interface ApplicationRecord {
  /** Supabase row id, present once the list is loaded from the database. */
  dbId?: string;
  applicationId: string;
  name: string;
  funding: string;
  duration: string;
  status: ApplicationStatus;
  submitted: string;
}

// Shown until Supabase answers (or when nobody is signed in).
const applicationsData = ref<ApplicationRecord[]>([
  {
    applicationId: "CEDA-IN-2026-0481",
    name: "Irrigation Kit",
    funding: "P 900.00",
    duration: "12 months",
    status: "UNDER REVIEW",
    submitted: "25 Sep 2026",
  },
  {
    applicationId: "CEDA-IN-2026-0482",
    name: "Solar Dryer",
    funding: "P 1,000.00",
    duration: "9 months",
    status: "APPROVED",
    submitted: "25 Sep 2026",
  },
  {
    applicationId: "CEDA-IN-2026-0483",
    name: "Edu App",
    funding: "P 3,000.00",
    duration: "6 months",
    status: "FEEDBACK",
    submitted: "2 Oct 2026",
  },
  {
    applicationId: "CEDA-IN-2026-0484",
    name: "Agri Drone",
    funding: "P 6,000.00",
    duration: "18 months",
    status: "AWARDED",
    submitted: "2 Oct 2026",
  },
]);

const loadingApplications = ref(false);
const loadError = ref("");

function mapStatus(status: string): ApplicationStatus {
  switch (status) {
    case "approved":
      return "APPROVED";
    case "rejected":
      return "DECLINED";
    case "returned":
      return "FEEDBACK";
    case "draft":
      return "DRAFT";
    default:
      return "UNDER REVIEW";
  }
}

function mapRow(row: Record<string, any>): ApplicationRecord {
  return {
    dbId: row.id,
    applicationId: row.reference ?? row.id,
    name: row.title ?? "Untitled submission",
    funding: `P ${Number(row.funding_requested ?? 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    duration: row.duration_months ? `${row.duration_months} months` : "—",
    status: mapStatus(String(row.status)),
    submitted: row.submitted_at
      ? new Date(row.submitted_at).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Not submitted yet",
  };
}

async function loadApplications() {
  if (!supabase || !session.value) return;

  loadingApplications.value = true;
  loadError.value = "";
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("submitted_at", { ascending: false });
  loadingApplications.value = false;

  if (error) {
    loadError.value = error.message;
    return;
  }
  if (data) applicationsData.value = data.map(mapRow);
}

onMounted(() => {
  void loadApplications();
});

const totalFunding = computed(() => {
  const total = applicationsData.value.reduce((sum, application) => {
    const value = Number(application.funding.replace(/[^0-9.]/g, ""));
    return sum + (Number.isFinite(value) ? value : 0);
  }, 0);
  return `P ${total.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
});

const statusKey = (status: ApplicationStatus) =>
  status === "UNDER REVIEW" || status === "DRAFT"
    ? "review"
    : status === "APPROVED"
      ? "approved"
      : status === "FEEDBACK"
        ? "feedback"
        : status === "AWARDED"
          ? "awarded"
          : "declined";

const filterOptions = computed(() => {
  const countFor = (key: string) =>
    applicationsData.value.filter((application) => statusKey(application.status) === key).length;

  return [
    { key: "all", label: "All", count: applicationsData.value.length },
    { key: "review", label: "Under review", count: countFor("review") },
    { key: "approved", label: "Approved", count: countFor("approved") },
    { key: "feedback", label: "Feedback", count: countFor("feedback") },
    { key: "awarded", label: "Awarded", count: countFor("awarded") },
  ];
});

function openApplication(application: ApplicationRecord) {
  const target = application.status === "FEEDBACK"
    ? {
        name: "ApplicationView",
        query: { name: application.name, id: application.dbId },
        hash: "#corrections",
      }
    : { name: "ApplicationView", query: { name: application.name, id: application.dbId } };
  router.push(target);
}

function goToTeam() {
  router.push({ name: "TeamView" });
}

const filteredApplications = computed(() => {
  let list = applicationsData.value;

  if (activeView.value === "awaiting") {
    list = list.filter(
      (application) => application.status === "UNDER REVIEW" || application.status === "FEEDBACK",
    );
  }

  if (activeFilter.value !== "all") {
    list = list.filter((application) => statusKey(application.status) === activeFilter.value);
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter((application) => application.name.toLowerCase().includes(q));
  }

  return list;
});

const style = useCssModule();

function folderColor(name: string): "manila" | "brand" | "blue" | "green" | "slate" {
  const map: Record<string, "manila" | "brand" | "blue" | "green" | "slate"> = {
    "Irrigation Kit": "green",
    "Solar Dryer": "blue",
    "Edu App": "brand",
    "Agri Drone": "slate",
  };
  return map[name] ?? "manila";
}

function doOpen(app: ApplicationRecord) {
  openApplication(app);
}

const getStatusClass = (status: string) => {
  switch (status) {
    case "APPROVED":
      return style.statusActive;
    case "UNDER REVIEW":
    case "DRAFT":
      return style.statusReview;
    case "FEEDBACK":
      return style.statusReturn;
    case "AWARDED":
      return style.statusAwarded;
    case "DECLINED":
      return style.statusRejected;
    default:
      return style.statusActive;
  }
};
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

/* Header matching InnovatorDashboard */
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

.ml {
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

/* Filter Pills Row */
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

.newApplicationBtn {
  position: absolute;
  top: 28px;
  right: 32px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 9999px;
  background-color: var(--color-goldenrod-200);
  color: #0f2e24;
  font-size: 13.5px;
  font-weight: 700;
  white-space: nowrap;
  transition: background-color 0.2s ease;
}

.newApplicationBtn:hover {
  background-color: #fbe3a8;
}

@media screen and (max-width: 700px) {
  .newApplicationBtn {
    position: static;
    margin-top: 16px;
  }
}

/* Card Container */
.cardContainer {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border: 1px solid #ede9e1;
  padding-bottom: 24px;
}

/* Top Dark Banner */
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

.termToggleBtn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #ffffff;
  border-radius: 9999px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.termToggleBtnActive {
  border: 1.5px solid var(--color-goldenrod-200);
  color: var(--color-goldenrod-200);
  font-weight: 700;
}

.balanceLabel {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.72);
  margin-bottom: 4px;
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
  display: flex;
  align-items: center;
  gap: 10px;
}

.teamBtn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 12px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.15s;
  white-space: nowrap;
}

.teamBtn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.teamBtn:active {
  transform: translateY(1px);
}

.teamBtn svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* Settle Early Banner */
.settleBanner {
  background-color: #fbf3e2;
  border-radius: 12px;
  margin: 20px 28px 18px;
  padding: 14px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.settleTextGroup {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.settleTitle {
  font-size: 14px;
  font-weight: 800;
  color: #1a202c;
}

.settleDesc {
  font-size: 13px;
  color: #4a5568;
}

.debitOrderLink {
  font-size: 13.5px;
  font-weight: 700;
  color: #1a202c;
  text-decoration: underline;
  cursor: pointer;
}

/* Search Box */
.searchWrapper {
  margin: 0 28px 20px;
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

/* Table Section */
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

.tdCustomer {
  font-weight: 700;
  color: #1a202c;
  padding-left: 0 !important;
}

.customerNameClickable {
  cursor: pointer;
  transition: color 0.15s ease;
}

.customerNameClickable:hover {
  color: #2e7d5b;
  text-decoration: underline;
}

.tdAmount {
  text-align: center;
  font-weight: 600;
  color: #92691b;
}

.tdTerm {
  text-align: center;
  color: #4a5568;
  font-weight: 500;
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

.viewLoanBtn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #0f2e24;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.viewLoanBtn:hover {
  background-color: #0f2e24;
  border-color: #0f2e24;
  color: #ffffff;
}

/* Status Badges */
.statusActive {
  display: inline-block;
  background-color: #00b67a;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 4px 14px;
  border-radius: 6px;
  text-transform: uppercase;
}

.statusReview {
  display: inline-block;
  background-color: #d99b26;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 4px 14px;
  border-radius: 6px;
  text-transform: uppercase;
}

.statusReturn {
  display: inline-block;
  background-color: #8c3310;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 4px 14px;
  border-radius: 6px;
  text-transform: uppercase;
}

.statusRejected {
  display: inline-block;
  background-color: #dc2626;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 4px 14px;
  border-radius: 6px;
  text-transform: uppercase;
}

.statusAwarded {
  display: inline-block;
  background-color: var(--color-darkslategray-500);
  color: var(--color-goldenrod-200);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 4px 14px;
  border-radius: 6px;
  text-transform: uppercase;
}

.appMeta {
  display: block;
  margin-top: 3px;
  font-size: 12px;
  font-weight: 500;
  color: #718096;
}

.noResults {
  text-align: center;
  padding: 32px 0;
  color: #718096;
  font-size: 14px;
}

/* View Toggle */
.tableHeadingRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.folderViewToggleBtn {
  display: inline-flex;
  align-items: center;
  padding: 7px 16px;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.folderViewToggleBtn:hover {
  border-color: var(--color-goldenrod-300);
  color: var(--color-darkslategray-500);
}

.listViewToggleBtn {
  display: inline-flex;
  align-items: center;
  padding: 7px 16px;
  border-radius: 9999px;
  background-color: var(--color-darkslategray-600);
  border-color: var(--color-darkslategray-600);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.listViewToggleBtn:hover {
  background-color: var(--color-darkslategray-500);
  border-color: var(--color-darkslategray-500);
}

.folderViewTopBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px 14px;
}

/* Folder View */
.folderViewWrapper {
  display: flex;
  gap: 28px;
  padding: 40px 28px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  background: #ffffff;
  border: 1px solid #ede9e1;
  border-radius: 16px;
  margin: 0 28px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.folderViewBtn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 28px 24px 44px;
  border-radius: 16px;
  border: 1px solid #ede9e1;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
  min-height: 150px;
  min-width: 140px;
}

.folderViewBtn:hover {
  border-color: var(--color-goldenrod-300);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.folderIcon {
  color: var(--color-darkslategray-400);
  transition: all 0.15s ease;
}

.folderViewBtn:hover .folderIcon {
  color: var(--color-darkslategray-500);
}

.folderIconOpen {
  color: var(--color-goldenrod-300);
  width: 48px;
  height: 48px;
}

.folderIconName {
  font-size: 14px;
  font-weight: 700;
  color: #1a202c;
  text-align: center;
}

.folderActions {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  border: 1px solid #ede9e1;
  border-radius: 10px;
  padding: 7px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 10;
  min-width: 145px;
}

.folderActionBtn {
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #0f2e24;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-inter);
  border-radius: 6px;
  transition: background-color 0.15s ease;
}

.folderActionBtn:hover {
  background-color: #f3f5f4;
  color: var(--color-darkslategray-500);
}

.folderFade-enter-active,
.folderFade-leave-active {
  transition: all 0.15s ease;
}

.folderFade-enter-from,
.folderFade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
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

  .termToggleGroup {
    flex-wrap: wrap;
    gap: 8px;
  }
}

@media screen and (max-width: 760px) {
  .loansTable {
    min-width: 0;
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

  .loansTable th:nth-child(3),
  .loansTable td:nth-child(3) {
    display: none;
  }

  .bannerTags,
  .termToggleGroup {
    flex-wrap: wrap;
    gap: 8px;
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

/* FolderReveal folder cards */
.folderCard {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  min-height: 0;
  min-width: 0;
}

/* icon actions revealed on hover, bottom-right of folder (no container) */
.folderIconActions {
  position: absolute;
  bottom: 30px;
  right: 8px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 20;
}

.folderCard:hover .folderIconActions {
  opacity: 1;
  pointer-events: auto;
}

.folderIconBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.folderIconBtn:hover {
  opacity: 0.75;
}

/* Rename folder popup */
.renameOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.renamePopup {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  width: 320px;
  max-width: 90vw;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.renameTitle {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-darkslategray-600);
}

.renameInput {
  padding: 8px 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-family: var(--font-inter);
  outline: none;
}

.renameInput:focus {
  border-color: var(--color-darkslategray-600);
}

.renameNote {
  margin: 0;
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}

.renameActions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.renameCancelBtn {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.renameSaveBtn {
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  background: var(--color-darkslategray-600);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.renameSaveBtn:hover {
  background: var(--color-darkslategray-500);
}

/* small popup container */
.popup {
  position: fixed;
  z-index: 50;
  background: #ffffff;
  color: var(--color-darkslategray-600);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
}

.popupTitle {
  font-weight: 600;
  margin: 0 0 4px;
  font-size: 14px;
}

.popupBtn {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: var(--color-darkslategray-600);
  color: #ffffff;
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-inter);
}

.popupBtn:hover {
  opacity: 0.9;
}

.popupClose {
  position: absolute;
  top: 6px;
  right: 8px;
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  color: #737373;
}

.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translate(-50%, -48%) scale(0.96);
}

</style>
