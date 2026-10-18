<template>
  <div :class="$style.page">
    <!-- Reusable Stationary Sidebar -->
    <Main :active-page="'customers'" />

    <!-- Main Scrollable Content -->
    <main :class="$style.mainContent">
      <!-- Top Bar Header matching DashboardSample -->
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <h2 :class="$style.dumelaMarion">Customers</h2>
          </div>
          <div :class="$style.pWrap">
            <div :class="$style.sunday4October">
              Repayments, statements and settlement for every loan you've had with Sarakie.
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
            <img :class="$style.userAvatarImg" src="/7 2.png" alt="Marion Lucas" />
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
          :key="filter.key"
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
        <!-- Top Dark Green Banner -->
        <div :class="$style.balanceBanner">
          <!-- Botswana vertical chevron pattern along the right edge -->
          <img
            :class="$style.bannerPattern"
            src="/8917b8dbc1777d73b88cd8d55f299be4-png2@2x.png"
            alt=""
          />

          <div :class="$style.bannerContent">
            <!-- Badge -->
            <div :class="$style.termToggleGroup">
              <span :class="$style.termBadge">Total Customers Registered</span>
            </div>

            <!-- Total Amount -->
            <div :class="$style.balanceAmount">P 1000.00</div>
            <div :class="$style.borrowedInfo">
              as of October 30 2025
            </div>
          </div>
        </div>

        <!-- Search Bar -->
        <div :class="$style.searchWrapper">
          <input
            v-model="searchQuery"
            :class="$style.searchInput"
            type="text"
            placeholder="Search Profiles by Customer Name"
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

        <!-- Customers Table -->
        <div :class="$style.tableSection">
          <h2 :class="$style.tableHeading">Customers</h2>

          <div :class="$style.tableResponsive">
            <table :class="$style.loansTable">
              <thead>
                <tr>
                  <th :class="$style.thLeft">Customer Name</th>
                  <th :class="$style.thCenter">Loan Amount</th>
                  <th :class="$style.thCenter">Loan Term</th>
                  <th :class="$style.thCenter">Status</th>
                  <th :class="$style.thRight">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(customer, index) in filteredCustomers"
                  :key="index"
                  :class="$style.tableRow"
                >
                  <td :class="$style.tdCustomer">
                    <span :class="$style.customerNameClickable" @click="openLoan(customer)">
                      {{ customer.customerName }}
                    </span>
                  </td>
                  <td :class="$style.tdAmount">{{ customer.loanAmount }}</td>
                  <td :class="$style.tdTerm">{{ customer.loanTerm }}</td>
                  <td :class="$style.tdStatusCenter">
                    <span :class="getStatusClass(customer.status)">
                      {{ customer.status }}
                    </span>
                  </td>
                  <td :class="$style.tdAction">
                    <button
                      :class="$style.viewLoanBtn"
                      type="button"
                      @click="openLoan(customer)"
                    >
                      View loan
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredCustomers.length === 0">
                  <td :class="$style.noResults" colspan="5">
                    No customers match your search criteria.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useCssModule } from "vue";
import { useRouter } from "vue-router";
import Main from "../components/Main.vue";

const router = useRouter();
const activeFilter = ref("all");
const searchQuery = ref("");

const filterOptions = [
  { key: "all", label: "All", count: 300 },
  { key: "active", label: "Active", count: 290 },
  { key: "review", label: "In review", count: 1 },
  { key: "sent12", label: "Sent Back", count: 12 },
  { key: "sent3", label: "Sent Back", count: 3 },
];

interface CustomerRecord {
  loanId?: string;
  customerName: string;
  loanAmount: string;
  loanTerm: string;
  status: "ACTIVE" | "REVIEW" | "RETURN" | "REJECTED";
}

const customersData: CustomerRecord[] = [
  { loanId: "SRK-L-10847", customerName: "Kamogelo Lekaba", loanAmount: "P 308.20", loanTerm: "12 months", status: "ACTIVE" },
  { loanId: "SRK-L-10848", customerName: "Jacob Maleo", loanAmount: "P 2900.91", loanTerm: "3 months", status: "ACTIVE" },
  { loanId: "SRK-L-10849", customerName: "Susan Chikuma", loanAmount: "P 1800.00", loanTerm: "9 months", status: "REVIEW" },
  { loanId: "SRK-L-10842", customerName: "Lantern Matho", loanAmount: "P 1400.00", loanTerm: "3 months", status: "RETURN" },
  { loanId: "SRK-L-10839", customerName: "Naledi Seneo", loanAmount: "P 2000.00", loanTerm: "9 months", status: "REJECTED" },
  { loanId: "SRK-L-10845", customerName: "Keamogetse Leone", loanAmount: "P 2000.00", loanTerm: "6 months", status: "ACTIVE" },
  { loanId: "SRK-L-10846", customerName: "Seneo Jacob", loanAmount: "P 2000.00", loanTerm: "10 months", status: "ACTIVE" },
  { loanId: "SRK-L-10846", customerName: "Seneo Jacob", loanAmount: "P 2000.00", loanTerm: "10 months", status: "ACTIVE" },
  { loanId: "SRK-L-10846", customerName: "Seneo Jacob", loanAmount: "P 2000.00", loanTerm: "10 months", status: "ACTIVE" },
  { loanId: "SRK-L-10846", customerName: "Seneo Jacob", loanAmount: "P 2000.00", loanTerm: "10 months", status: "ACTIVE" },
  { loanId: "SRK-L-10846", customerName: "Seneo Jacob", loanAmount: "P 2000.00", loanTerm: "10 months", status: "ACTIVE" },
  { loanId: "SRK-L-10846", customerName: "Seneo Jacob", loanAmount: "P 2000.00", loanTerm: "10 months", status: "ACTIVE" },
  { loanId: "SRK-L-10846", customerName: "Seneo Jacob", loanAmount: "P 2000.00", loanTerm: "10 months", status: "ACTIVE" },
];

const filteredCustomers = computed(() => {
  let list: CustomerRecord[] = [...customersData];

  if (activeFilter.value === "active") {
    list = list.filter((c) => c.status === "ACTIVE");
  } else if (activeFilter.value === "review") {
    list = list.filter((c) => c.status === "REVIEW");
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter((c) => c.customerName.toLowerCase().includes(q));
  }

  return list;
});

function openLoan(customer: CustomerRecord) {
  router.push({
    name: "LoanView",
    query: {
      id: customer.loanId || "SRK-L-10847",
      name: customer.customerName,
    },
  });
}

const style = useCssModule();

const getStatusClass = (status: string) => {
  switch (status) {
    case "ACTIVE": return style.statusActive;
    case "REVIEW": return style.statusReview;
    case "RETURN": return style.statusReturn;
    case "REJECTED": return style.statusRejected;
    default: return style.statusActive;
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

/* Header matching DashboardSample */
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

.termBadge {
  border: 1.5px solid var(--color-goldenrod-200);
  color: var(--color-goldenrod-200);
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

/* Search Box */
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

.noResults {
  text-align: center;
  padding: 32px 0;
  color: #718096;
  font-size: 14px;
}
</style>
