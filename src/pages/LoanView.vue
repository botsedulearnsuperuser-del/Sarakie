<template>
  <div :class="[$style.page, isGaborone ? $style.isGaborone : '']" :style="pageBackground">
    <!-- Reusable Stationary Sidebar (Pinned, never scrolls) -->
    <Main :active-page="'customers'" />

    <!-- Main Scrollable Content -->
    <main :class="$style.mainContent">
      <!-- Top Bar Header matching InnovatorDashboard & Customers -->
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <div :class="$style.titleRow">
              <h2 :class="$style.dumelaMarion">{{ currentLoan.customerName }}</h2>
              <span :class="getStatusClass(currentLoan.status)">
                {{ currentLoan.status }}
              </span>
            </div>
          </div>
          <div :class="$style.pWrap">
            <div :class="$style.sunday4October">
              Loan Account Reference: <b>{{ currentLoan.loanId }}</b> &bull; Managed by Branch Admin <b>Marion Lucas</b>
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

      <!-- Action & Navigation Bar -->
      <div :class="$style.actionBar">
        <div :class="$style.navRow">
          <router-link to="/customers" :class="$style.backLink">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Customers</span>
          </router-link>
          <span :class="$style.navDivider">/</span>
          <span :class="$style.navCurrent">{{ currentLoan.loanId }}</span>
        </div>

        <div :class="$style.actionBtns">
          <button :class="$style.actionOutlineBtn" type="button" @click="triggerPrint">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print Statement
          </button>

          <button :class="$style.actionSolidBtn" type="button" @click="downloadAgreement">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Agreement
          </button>
        </div>
      </div>

      <!-- Main White Card Container matching Customers & MyApplications -->
      <section :class="$style.cardContainer">
        <!-- Top Dark Green Hero Banner with Botswana Chevron Watermark -->
        <div :class="$style.balanceBanner">
          <img
            :class="$style.bannerPattern"
            src="/pattern-2.webp"
            alt=""
          />

          <div :class="$style.bannerContent">
            <!-- Badges Row -->
            <div :class="$style.bannerTags">
              <span :class="$style.termBadge">LOAN ACCOUNT &bull; {{ currentLoan.loanId }}</span>
              <span :class="$style.disbursedTag">Disbursed on {{ currentLoan.disbursedDate }}</span>
            </div>

            <!-- Big Principal Amount -->
            <div :class="$style.balanceAmount">
              <span :class="$style.currencyPrefix">P</span>
              <span>{{ currentLoan.loanAmountClean }}</span>
            </div>

            <div :class="$style.borrowedInfo">
              {{ currentLoan.purpose }} &bull; {{ currentLoan.loanTerm }} term &bull; 25% annual reducing balance rate
            </div>

            <!-- Financial Metrics Strip -->
            <div :class="$style.metricsStrip">
              <div :class="$style.metricItem">
                <span :class="$style.metricTitle">Monthly Repayment</span>
                <span :class="$style.metricValGold">P {{ currentLoan.monthlyRepayment }}</span>
              </div>
              <div :class="$style.metricDivider"></div>
              <div :class="$style.metricItem">
                <span :class="$style.metricTitle">Total to Repay</span>
                <span :class="$style.metricVal">P {{ currentLoan.totalRepay }}</span>
              </div>
              <div :class="$style.metricDivider"></div>
              <div :class="$style.metricItem">
                <span :class="$style.metricTitle">Outstanding Balance</span>
                <span :class="$style.metricVal">P {{ currentLoan.outstandingBalance }}</span>
              </div>
              <div :class="$style.metricDivider"></div>
              <div :class="$style.metricItem">
                <span :class="$style.metricTitle">Next Debit Date</span>
                <span :class="$style.metricVal"><b>{{ currentLoan.nextDueDate }}</b></span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3-Column Info Overview in ONE Single Unified Container -->
        <div :class="$style.unifiedInfoCardWrapper">
          <div :class="$style.unifiedInfoContainer">
            <!-- Col 1: Customer Profile -->
            <div :class="$style.unifiedCol">
              <div :class="$style.cardHead">
                <div>
                  <h3 :class="$style.cardTitle">Customer Profile</h3>
                  <p :class="$style.cardSubtitle">Verified Omang & Contact</p>
                </div>
              </div>

              <div :class="$style.cardDetails">
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Full Name</span>
                  <span :class="$style.dataValue">{{ currentLoan.customerName }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Omang ID</span>
                  <span :class="$style.dataValue">{{ currentLoan.omang }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Phone</span>
                  <span :class="$style.dataValue">{{ currentLoan.phone }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Address</span>
                  <span :class="$style.dataValue">{{ currentLoan.address }}</span>
                </div>
              </div>
            </div>

            <!-- Vertical Divider -->
            <div :class="$style.unifiedColDivider"></div>

            <!-- Col 2: Employment Details -->
            <div :class="$style.unifiedCol">
              <div :class="$style.cardHead">
                <div>
                  <h3 :class="$style.cardTitle">Employment Details</h3>
                  <p :class="$style.cardSubtitle">Income & Workplace Verification</p>
                </div>
              </div>

              <div :class="$style.cardDetails">
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Employer</span>
                  <span :class="$style.dataValue">{{ currentLoan.employer }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Designation</span>
                  <span :class="$style.dataValue">{{ currentLoan.jobTitle }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Net Salary</span>
                  <span :class="$style.dataValue">P {{ currentLoan.netSalary }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Pay Day</span>
                  <span :class="$style.dataValue">{{ currentLoan.payDay }} of month</span>
                </div>
              </div>
            </div>

            <!-- Vertical Divider -->
            <div :class="$style.unifiedColDivider"></div>

            <!-- Col 3: Debit Order Mandate -->
            <div :class="$style.unifiedCol">
              <div :class="$style.cardHead">
                <div>
                  <h3 :class="$style.cardTitle">Debit Order Mandate</h3>
                  <p :class="$style.cardSubtitle">Automatic EFT Collections</p>
                </div>
              </div>

              <div :class="$style.cardDetails">
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Bank</span>
                  <span :class="$style.dataValue">{{ currentLoan.bankName }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Account</span>
                  <span :class="$style.dataValue">{{ currentLoan.accountNumber }}</span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Mandate</span>
                  <span :class="$style.mandateBadge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Active & Signed
                  </span>
                </div>
                <div :class="$style.dataRow">
                  <span :class="$style.dataLabel">Next Due</span>
                  <span :class="$style.dataValue"><b>{{ currentLoan.nextDueDate }}</b></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter Tab Pills matching Customers & MyApplications -->
        <div :class="$style.tabsRow">
          <button
            :class="[
              $style.filterPill,
              activeTab === 'schedule' ? $style.filterPillActive : ''
            ]"
            type="button"
            @click="activeTab = 'schedule'"
          >
            <span>Repayment Schedule</span>
            <span :class="$style.filterCount">{{ currentLoan.installments.length }}</span>
          </button>
          <button
            :class="[
              $style.filterPill,
              activeTab === 'employment' ? $style.filterPillActive : ''
            ]"
            type="button"
            @click="activeTab = 'employment'"
          >
            <span>Next of Kin & Affordability</span>
          </button>
          <button
            :class="[
              $style.filterPill,
              activeTab === 'documents' ? $style.filterPillActive : ''
            ]"
            type="button"
            @click="activeTab = 'documents'"
          >
            <span>Documents Vault</span>
            <span :class="$style.filterCount">3</span>
          </button>
          <button
            :class="[
              $style.filterPill,
              activeTab === 'audit' ? $style.filterPillActive : ''
            ]"
            type="button"
            @click="activeTab = 'audit'"
          >
            <span>Audit Trail & Approvals</span>
          </button>
        </div>

        <!-- Tab Content 1: Repayment Schedule Table matching MyApplications style -->
        <div v-if="activeTab === 'schedule'" :class="$style.tableSection">
          <div :class="$style.sectionHeader">
            <div>
              <h2 :class="$style.tableHeading">Monthly Amortisation Schedule</h2>
              <p :class="$style.tableSub">
                Calculated on a reducing balance basis at 25% annual interest.
              </p>
            </div>
            <div :class="$style.pillStats">
              <span :class="$style.statChip">Paid: <b>{{ paidCount }} / {{ currentLoan.installments.length }}</b></span>
              <span :class="$style.statChip">Remaining Balance: <b>P {{ currentLoan.outstandingBalance }}</b></span>
            </div>
          </div>

          <div :class="$style.tableResponsive">
            <table :class="$style.loansTable">
              <thead>
                <tr>
                  <th :class="$style.thLeft">#</th>
                  <th :class="$style.thLeft">Due Date</th>
                  <th :class="$style.thCenter">Principal</th>
                  <th :class="$style.thCenter">Interest (25%)</th>
                  <th :class="$style.thCenter">Installment</th>
                  <th :class="$style.thCenter">Status</th>
                  <th :class="$style.thRight">Payment Ref</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(inst, i) in currentLoan.installments"
                  :key="i"
                  :class="$style.tableRow"
                >
                  <td :class="$style.tdNum">{{ inst.num }}</td>
                  <td :class="$style.tdDate">{{ inst.dueDate }}</td>
                  <td :class="$style.tdAmount">P {{ inst.principal }}</td>
                  <td :class="$style.tdAmount">P {{ inst.interest }}</td>
                  <td :class="$style.tdInstallment">P {{ inst.total }}</td>
                  <td :class="$style.tdStatusCenter">
                    <span
                      :class="[
                        $style.instBadge,
                        inst.status === 'PAID' ? $style.statusActive : $style.statusReview
                      ]"
                    >
                      {{ inst.status }}
                    </span>
                  </td>
                  <td :class="$style.tdRef">{{ inst.ref }}</td>
                </tr>
                <tr v-if="currentLoan.installments.length === 0">
                  <td :class="$style.noResults" colspan="7">
                    No installments generated yet for this loan status.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tab Content 2: Next of Kin & Affordability Details -->
        <div v-else-if="activeTab === 'employment'" :class="$style.tableSection">
          <h2 :class="$style.tableHeading">Next of Kin & Affordability Breakdown</h2>
          <p :class="$style.tableSub">Emergency contact information and affordability checks.</p>

          <div :class="$style.detailCardsGrid">
            <div :class="$style.subCard">
              <h4 :class="$style.subCardTitle">Next of Kin Details</h4>
              <div :class="$style.dataRow">
                <span :class="$style.dataLabel">Full Name</span>
                <span :class="$style.dataValue">{{ currentLoan.kinName }}</span>
              </div>
              <div :class="$style.dataRow">
                <span :class="$style.dataLabel">Relationship</span>
                <span :class="$style.dataValue">{{ currentLoan.kinRelation }}</span>
              </div>
              <div :class="$style.dataRow">
                <span :class="$style.dataLabel">Phone Number</span>
                <span :class="$style.dataValue">{{ currentLoan.kinPhone }}</span>
              </div>
            </div>

            <div :class="$style.subCard">
              <h4 :class="$style.subCardTitle">Workplace & Salary Verification</h4>
              <div :class="$style.dataRow">
                <span :class="$style.dataLabel">Work Phone</span>
                <span :class="$style.dataValue">{{ currentLoan.workPhone }}</span>
              </div>
              <div :class="$style.dataRow">
                <span :class="$style.dataLabel">Employment Status</span>
                <span :class="$style.dataValue">{{ currentLoan.employmentType }}</span>
              </div>
              <div :class="$style.dataRow">
                <span :class="$style.dataLabel">Debt-to-Income (DSI)</span>
                <span :class="$style.dataValue"><b>18.4% (Passed Affordability)</b></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab Content 3: Document Vault -->
        <div v-else-if="activeTab === 'documents'" :class="$style.tableSection">
          <h2 :class="$style.tableHeading">Attached Borrower Documents</h2>
          <p :class="$style.tableSub">Certified legal and identification documents on file.</p>

          <div :class="$style.docsList">
            <div :class="$style.docItem">
              <div :class="$style.docLeft">
                <div :class="$style.docIconBox">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2e7d5b" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div>
                  <span :class="$style.docTitle">Certified Omang Copy (National ID)</span>
                  <span :class="$style.docMeta">PDF &bull; 1.4 MB &bull; Verified on {{ currentLoan.disbursedDate }}</span>
                </div>
              </div>
              <button :class="$style.docBtn" type="button" @click="mockPreviewDoc('Omang')">
                View Document
              </button>
            </div>

            <div :class="$style.docItem">
              <div :class="$style.docLeft">
                <div :class="$style.docIconBox">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2e7d5b" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div>
                  <span :class="$style.docTitle">Latest 3 Months Bank Statements</span>
                  <span :class="$style.docMeta">PDF &bull; 3.8 MB &bull; Verified against {{ currentLoan.bankName }}</span>
                </div>
              </div>
              <button :class="$style.docBtn" type="button" @click="mockPreviewDoc('Bank Statement')">
                View Document
              </button>
            </div>

            <div :class="$style.docItem">
              <div :class="$style.docLeft">
                <div :class="$style.docIconBox">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2e7d5b" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div>
                  <span :class="$style.docTitle">Signed Automated Debit Order Mandate</span>
                  <span :class="$style.docMeta">PDF &bull; 850 KB &bull; NBFIRA Regulatory Compliance</span>
                </div>
              </div>
              <button :class="$style.docBtn" type="button" @click="mockPreviewDoc('Debit Mandate')">
                View Document
              </button>
            </div>
          </div>
        </div>

        <!-- Tab Content 4: Audit & Compliance Trail -->
        <div v-else-if="activeTab === 'audit'" :class="$style.tableSection">
          <h2 :class="$style.tableHeading">Compliance Audit Trail</h2>
          <p :class="$style.tableSub">Immutable administrative log of branch operations for this loan.</p>

          <div :class="$style.timeline">
            <div :class="$style.timelineItem">
              <div :class="$style.timelineDot"></div>
              <div :class="$style.timelineBody">
                <span :class="$style.timelineDate">Today, 09:12 AM</span>
                <span :class="$style.timelineHeading">Debit order collection processed</span>
                <span :class="$style.timelineDesc">Monthly installment automatically received via EFT clearing.</span>
              </div>
            </div>
            <div :class="$style.timelineItem">
              <div :class="$style.timelineDot"></div>
              <div :class="$style.timelineBody">
                <span :class="$style.timelineDate">{{ currentLoan.disbursedDate }}, 14:30 PM</span>
                <span :class="$style.timelineHeading">Loan Disbursed</span>
                <span :class="$style.timelineDesc">Funds released to {{ currentLoan.bankName }} account {{ currentLoan.accountNumber }}.</span>
              </div>
            </div>
            <div :class="$style.timelineItem">
              <div :class="$style.timelineDot"></div>
              <div :class="$style.timelineBody">
                <span :class="$style.timelineDate">{{ currentLoan.disbursedDate }}, 11:00 AM</span>
                <span :class="$style.timelineHeading">Application Recorded & Verified</span>
                <span :class="$style.timelineDesc">Recorded by Admin <b>Marion Lucas (SRK-ADM-0042)</b>. Affordability and Omang checks passed.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
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
import { useRoute } from "vue-router";
import Main from "../components/Main.vue";

const route = useRoute();
const style = useCssModule();
const activeTab = ref<"schedule" | "employment" | "documents" | "audit">("schedule");

interface LoanDetail {
  loanId: string;
  customerName: string;
  loanAmount: string;
  loanAmountClean: string;
  loanTerm: string;
  monthsCount: number;
  status: "ACTIVE" | "REVIEW" | "RETURN" | "REJECTED";
  purpose: string;
  monthlyRepayment: string;
  totalRepay: string;
  outstandingBalance: string;
  disbursedDate: string;
  nextDueDate: string;
  omang: string;
  phone: string;
  email: string;
  address: string;
  employer: string;
  jobTitle: string;
  employmentType: string;
  netSalary: string;
  payDay: string;
  workPhone: string;
  kinName: string;
  kinPhone: string;
  kinRelation: string;
  bankName: string;
  accountNumber: string;
  installments: Array<{
    num: number;
    dueDate: string;
    principal: string;
    interest: string;
    total: string;
    status: "PAID" | "PENDING";
    ref: string;
  }>;
}

const mockLoans: Record<string, LoanDetail> = {
  "kamogelo-lekaba": {
    loanId: "SRK-L-10847",
    customerName: "Kamogelo Lekaba",
    loanAmount: "P 308.20",
    loanAmountClean: "308.20",
    loanTerm: "12 months",
    monthsCount: 12,
    status: "ACTIVE",
    purpose: "Personal Needs",
    monthlyRepayment: "29.28",
    totalRepay: "351.46",
    outstandingBalance: "175.73",
    disbursedDate: "15 Oct 2025",
    nextDueDate: "25 Nov 2026",
    omang: "921024512",
    phone: "+267 71 884 920",
    email: "k.lekaba@gmail.com",
    address: "Plot 5421, Extension 12, Gaborone",
    employer: "Debswana Diamond Co",
    jobTitle: "Logistics Assistant",
    employmentType: "Permanent",
    netSalary: "7,800.00",
    payDay: "25th",
    workPhone: "+267 361 4000",
    kinName: "Lesego Lekaba",
    kinPhone: "+267 72 334 112",
    kinRelation: "Sister",
    bankName: "Absa Bank Botswana",
    accountNumber: "4092817263",
    installments: [
      { num: 1, dueDate: "25 Nov 2025", principal: "22.87", interest: "6.42", total: "29.28", status: "PAID", ref: "EFT-883910" },
      { num: 2, dueDate: "25 Dec 2025", principal: "23.34", interest: "5.94", total: "29.28", status: "PAID", ref: "EFT-891024" },
      { num: 3, dueDate: "25 Jan 2026", principal: "23.83", interest: "5.45", total: "29.28", status: "PAID", ref: "EFT-904128" },
      { num: 4, dueDate: "25 Feb 2026", principal: "24.32", interest: "4.96", total: "29.28", status: "PAID", ref: "EFT-918237" },
      { num: 5, dueDate: "25 Mar 2026", principal: "24.83", interest: "4.45", total: "29.28", status: "PAID", ref: "EFT-927481" },
      { num: 6, dueDate: "25 Apr 2026", principal: "25.35", interest: "3.93", total: "29.28", status: "PAID", ref: "EFT-938201" },
      { num: 7, dueDate: "25 May 2026", principal: "25.88", interest: "3.40", total: "29.28", status: "PENDING", ref: "PENDING" },
      { num: 8, dueDate: "25 Jun 2026", principal: "26.41", interest: "2.87", total: "29.28", status: "PENDING", ref: "PENDING" },
      { num: 9, dueDate: "25 Jul 2026", principal: "26.96", interest: "2.32", total: "29.28", status: "PENDING", ref: "PENDING" },
      { num: 10, dueDate: "25 Aug 2026", principal: "27.53", interest: "1.75", total: "29.28", status: "PENDING", ref: "PENDING" },
      { num: 11, dueDate: "25 Sep 2026", principal: "28.10", interest: "1.18", total: "29.28", status: "PENDING", ref: "PENDING" },
      { num: 12, dueDate: "25 Oct 2026", principal: "28.69", interest: "0.59", total: "29.28", status: "PENDING", ref: "PENDING" },
    ]
  },
  "jacob-maleo": {
    loanId: "SRK-L-10848",
    customerName: "Jacob Maleo",
    loanAmount: "P 2,900.91",
    loanAmountClean: "2,900.91",
    loanTerm: "3 months",
    monthsCount: 3,
    status: "ACTIVE",
    purpose: "Business Stock",
    monthlyRepayment: "1,007.41",
    totalRepay: "3,022.23",
    outstandingBalance: "1,007.41",
    disbursedDate: "02 Aug 2026",
    nextDueDate: "25 Nov 2026",
    omang: "840319201",
    phone: "+267 74 123 456",
    email: "j.maleo@gmail.com",
    address: "Plot 1902, Phase 2, Gaborone",
    employer: "Maleo Enterprises (Pty) Ltd",
    jobTitle: "Managing Director",
    employmentType: "Self-Employed",
    netSalary: "16,400.00",
    payDay: "25th",
    workPhone: "+267 390 1122",
    kinName: "Tshepo Maleo",
    kinPhone: "+267 76 554 321",
    kinRelation: "Spouse",
    bankName: "First National Bank (FNB)",
    accountNumber: "62891029381",
    installments: [
      { num: 1, dueDate: "25 Sep 2026", principal: "946.99", interest: "60.42", total: "1,007.41", status: "PAID", ref: "EFT-991201" },
      { num: 2, dueDate: "25 Oct 2026", principal: "966.72", interest: "40.69", total: "1,007.41", status: "PAID", ref: "EFT-994821" },
      { num: 3, dueDate: "25 Nov 2026", principal: "987.20", interest: "20.21", total: "1,007.41", status: "PENDING", ref: "PENDING" },
    ]
  },
  "susan-chikuma": {
    loanId: "SRK-L-10849",
    customerName: "Susan Chikuma",
    loanAmount: "P 1,800.00",
    loanAmountClean: "1,800.00",
    loanTerm: "9 months",
    monthsCount: 9,
    status: "REVIEW",
    purpose: "Medical",
    monthlyRepayment: "221.72",
    totalRepay: "1,995.48",
    outstandingBalance: "1,995.48",
    disbursedDate: "Pending Review",
    nextDueDate: "Awaiting Approval",
    omang: "951204910",
    phone: "+267 75 998 123",
    email: "s.chikuma@outlook.com",
    address: "Block 6, Plot 812, Gaborone",
    employer: "Ministry of Health",
    jobTitle: "Nursing Officer",
    employmentType: "Permanent",
    netSalary: "9,200.00",
    payDay: "25th",
    workPhone: "+267 363 2000",
    kinName: "Blessing Chikuma",
    kinPhone: "+267 71 445 678",
    kinRelation: "Brother",
    bankName: "Stanbic Bank Botswana",
    accountNumber: "90600029104",
    installments: [
      { num: 1, dueDate: "25 Nov 2026", principal: "184.22", interest: "37.50", total: "221.72", status: "PENDING", ref: "PENDING" },
      { num: 2, dueDate: "25 Dec 2026", principal: "188.06", interest: "33.66", total: "221.72", status: "PENDING", ref: "PENDING" },
    ]
  },
  "lantern-matho": {
    loanId: "SRK-L-10842",
    customerName: "Lantern Matho",
    loanAmount: "P 1,400.00",
    loanAmountClean: "1,400.00",
    loanTerm: "3 months",
    monthsCount: 3,
    status: "RETURN",
    purpose: "School fees",
    monthlyRepayment: "486.29",
    totalRepay: "1,458.87",
    outstandingBalance: "1,458.87",
    disbursedDate: "Sent back for docs",
    nextDueDate: "Resubmission Needed",
    omang: "880512301",
    phone: "+267 72 102 938",
    email: "l.matho@yahoo.com",
    address: "Tlokweng, Plot 302",
    employer: "AutoCity Garage",
    jobTitle: "Mechanic",
    employmentType: "Contract",
    netSalary: "5,400.00",
    payDay: "30th",
    workPhone: "+267 392 4411",
    kinName: "Masego Matho",
    kinPhone: "+267 74 332 110",
    kinRelation: "Mother",
    bankName: "Absa Bank Botswana",
    accountNumber: "4019283719",
    installments: []
  },
  "naledi-seneo": {
    loanId: "SRK-L-10839",
    customerName: "Naledi Seneo",
    loanAmount: "P 2,000.00",
    loanAmountClean: "2,000.00",
    loanTerm: "9 months",
    monthsCount: 9,
    status: "REJECTED",
    purpose: "Pay off debt",
    monthlyRepayment: "246.36",
    totalRepay: "2,217.24",
    outstandingBalance: "0.00",
    disbursedDate: "Declined",
    nextDueDate: "N/A",
    omang: "910214819",
    phone: "+267 76 890 123",
    email: "n.seneo@gmail.com",
    address: "Mogoditshane, Plot 108",
    employer: "Private Retail",
    jobTitle: "Cashier",
    employmentType: "Probation",
    netSalary: "3,100.00",
    payDay: "28th",
    workPhone: "+267 395 1200",
    kinName: "Tumelo Seneo",
    kinPhone: "+267 71 223 998",
    kinRelation: "Parent",
    bankName: "Bank Gaborone",
    accountNumber: "20194829102",
    installments: []
  },
  "default": {
    loanId: "SRK-L-10846",
    customerName: "Seneo Jacob",
    loanAmount: "P 2,000.00",
    loanAmountClean: "2,000.00",
    loanTerm: "10 months",
    monthsCount: 10,
    status: "ACTIVE",
    purpose: "Home Improvement",
    monthlyRepayment: "223.78",
    totalRepay: "2,237.80",
    outstandingBalance: "1,118.90",
    disbursedDate: "10 Jan 2026",
    nextDueDate: "25 Nov 2026",
    omang: "931528410",
    phone: "+267 71 234 567",
    email: "seneo.jacob@gmail.com",
    address: "Plot 4471, Mokgosi Close, Gaborone",
    employer: "Kgalagadi Logistics (Pty) Ltd",
    jobTitle: "Operations Supervisor",
    employmentType: "Permanent",
    netSalary: "14,500.00",
    payDay: "25th",
    workPhone: "+267 391 2200",
    kinName: "Boitumelo Jacob",
    kinPhone: "+267 72 987 654",
    kinRelation: "Sibling",
    bankName: "First National Bank (FNB)",
    accountNumber: "62849102847",
    installments: [
      { num: 1, dueDate: "25 Feb 2026", principal: "182.11", interest: "41.67", total: "223.78", status: "PAID", ref: "EFT-771920" },
      { num: 2, dueDate: "25 Mar 2026", principal: "185.90", interest: "37.88", total: "223.78", status: "PAID", ref: "EFT-782910" },
      { num: 3, dueDate: "25 Apr 2026", principal: "189.77", interest: "34.01", total: "223.78", status: "PAID", ref: "EFT-794019" },
      { num: 4, dueDate: "25 May 2026", principal: "193.72", interest: "30.06", total: "223.78", status: "PAID", ref: "EFT-805128" },
      { num: 5, dueDate: "25 Jun 2026", principal: "197.76", interest: "26.02", total: "223.78", status: "PAID", ref: "EFT-816237" },
      { num: 6, dueDate: "25 Jul 2026", principal: "201.88", interest: "21.90", total: "223.78", status: "PENDING", ref: "PENDING" },
      { num: 7, dueDate: "25 Aug 2026", principal: "206.08", interest: "17.70", total: "223.78", status: "PENDING", ref: "PENDING" },
      { num: 8, dueDate: "25 Sep 2026", principal: "210.38", interest: "13.40", total: "223.78", status: "PENDING", ref: "PENDING" },
      { num: 9, dueDate: "25 Oct 2026", principal: "214.76", interest: "9.02", total: "223.78", status: "PENDING", ref: "PENDING" },
      { num: 10, dueDate: "25 Nov 2026", principal: "219.23", interest: "4.55", total: "223.78", status: "PENDING", ref: "PENDING" },
    ]
  }
};

const currentLoan = computed<LoanDetail>(() => {
  const queryName = (route.query.name as string || "").toLowerCase().replace(/\s+/g, "-");
  const queryId = (route.query.id as string || route.params.id as string || "").toLowerCase();

  if (queryName && mockLoans[queryName]) {
    return mockLoans[queryName];
  }

  for (const key of Object.keys(mockLoans)) {
    if (mockLoans[key].loanId.toLowerCase() === queryId) {
      return mockLoans[key];
    }
  }

  return mockLoans["kamogelo-lekaba"] || mockLoans["default"];
});

const paidCount = computed(() => {
  return currentLoan.value.installments.filter(i => i.status === "PAID").length;
});

function getStatusClass(status: string) {
  switch (status) {
    case "ACTIVE": return style.statusActive;
    case "REVIEW": return style.statusReview;
    case "RETURN": return style.statusReturn;
    case "REJECTED": return style.statusRejected;
    default: return style.statusActive;
  }
}

function triggerPrint() {
  window.print();
}

function downloadAgreement() {
  alert(`Generating official loan agreement statement for ${currentLoan.value.customerName} (${currentLoan.value.loanId}). PDF download will begin shortly.`);
}

function mockPreviewDoc(docName: string) {
  alert(`Viewing certified document: ${docName} for ${currentLoan.value.customerName}`);
}
</script>

<style module>
/* ── Main Layout (Stationary pinned sidebar, only content scrolls) ── */
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #faf7f2;
  font-family: var(--font-inter, 'Inter', sans-serif);
  overflow: hidden;
}

.mainContent {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 24px 36px 48px;
  box-sizing: border-box;
}

/* ── Top Header matching InnovatorDashboard & Customers ── */
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
  margin-bottom: 18px;
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

.titleRow {
  display: flex;
  align-items: center;
  gap: 14px;
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
  color: #6b7280;
  font-size: 14.5px;
}

.sunday4October b {
  color: #0f2e24;
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

/* ── Action Toolbar ── */
.actionBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
}

.navRow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
}

.backLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #2e7d5b;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.15s ease;
}

.backLink:hover {
  text-decoration: underline;
}

.navDivider {
  color: #9ca3af;
}

.navCurrent {
  color: #6b7280;
  font-weight: 600;
}

.actionBtns {
  display: flex;
  align-items: center;
  gap: 10px;
}

.actionOutlineBtn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #374151;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.actionOutlineBtn:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.actionSolidBtn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 20px;
  border-radius: 9999px;
  border: none;
  background-color: #0f2e24;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  box-shadow: 0 4px 12px rgba(15, 46, 36, 0.2);
  transition: background-color 0.15s ease;
}

.actionSolidBtn:hover {
  background-color: #081d16;
}

/* ── Main White Card Container (matching Customers & MyApplications) ── */
.cardContainer {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border: 1px solid #ede9e1;
  padding-bottom: 28px;
}

/* ── Top Dark Green Banner matching Customers.vue ── */
.balanceBanner {
  position: relative;
  background-color: var(--color-darkslategray-600, #013525);
  border-radius: 20px 20px 0 0;
  padding: 28px 32px 30px;
  overflow: hidden;
  box-sizing: border-box;
}

.bannerPattern {
  position: absolute;
  top: 0;
  right: -10px;
  height: 100%;
  width: 150px;
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

.bannerTags {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.termBadge {
  border: 1.5px solid var(--color-goldenrod-200, #eec24b);
  color: var(--color-goldenrod-200, #eec24b);
  border-radius: 9999px;
  padding: 5px 16px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.6px;
}

.disbursedTag {
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
  font-weight: 500;
}

.balanceAmount {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: clamp(36px, 4vw, 50px);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 6px;
  letter-spacing: -0.5px;
}

.currencyPrefix {
  color: var(--color-goldenrod-200, #eec24b);
}

.borrowedInfo {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 22px;
}

.metricsStrip {
  display: flex;
  align-items: center;
  gap: 24px;
  background-color: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  padding: 12px 24px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  flex-wrap: wrap;
}

.metricItem {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.metricTitle {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.65);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metricVal {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
}

.metricValGold {
  font-size: 16px;
  font-weight: 800;
  color: var(--color-goldenrod-200, #eec24b);
}

.metricDivider {
  width: 1px;
  height: 28px;
  background-color: rgba(255, 255, 255, 0.15);
}

/* ── Unified Single Container for Customer, Employment, and Mandate ── */
.unifiedInfoCardWrapper {
  padding: 24px 28px;
  box-sizing: border-box;
}

.unifiedInfoContainer {
  background-color: #faf7f2;
  border-radius: 16px;
  border: 1px solid #ede4d6;
  padding: 22px 26px;
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: stretch;
  gap: 22px;
}

.unifiedCol {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.unifiedColDivider {
  width: 1px;
  background-color: #e5dcd0;
  align-self: stretch;
}

.cardHead {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.cardIconWrap {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
}

.cardTitle {
  margin: 0;
  font-size: 14.5px;
  font-weight: 800;
  color: #0f2e24;
}

.cardSubtitle {
  margin: 0;
  font-size: 11.5px;
  color: #6b7280;
}

.cardDetails {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dataRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.dataLabel {
  color: #6b7280;
  font-weight: 500;
}

.dataValue {
  color: #111827;
  font-weight: 700;
  text-align: right;
  max-width: 60%;
}

.mandateBadge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: #ecfdf5;
  color: #059669;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 9999px;
  border: 1px solid #a7f3d0;
}

/* ── Filter / Tab Pills Row (matching Customers.vue filtersRow) ── */
.tabsRow {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 28px 18px;
  border-bottom: 1px solid #f1f5f9;
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
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.filterPill:hover {
  border-color: #d1d5db;
}

.filterPillActive {
  background-color: var(--color-darkslategray-600, #013525);
  color: #ffffff;
  border-color: var(--color-darkslategray-600, #013525);
}

.filterCount {
  font-size: 12px;
  opacity: 0.9;
}

/* ── Table Section ── */
.tableSection {
  padding: 20px 28px 0;
}

.sectionHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
}

.tableHeading {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 800;
  color: #1a202c;
}

.tableSub {
  margin: 0;
  font-size: 13px;
  color: #718096;
}

.pillStats {
  display: flex;
  gap: 10px;
}

.statChip {
  font-size: 12.5px;
  color: #4b5563;
  background-color: #faf7f2;
  border: 1px solid #ede4d6;
  padding: 5px 14px;
  border-radius: 9999px;
}

.statChip b {
  color: #0f2e24;
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
  font-size: 12px;
  font-weight: 700;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #edf2f7;
}

.tableRow td {
  padding: 14px 12px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13.5px;
  vertical-align: middle;
}

.thLeft { text-align: left; }
.thCenter { text-align: center; }
.thRight { text-align: right; }

.tdNum {
  font-weight: 700;
  color: #6b7280;
}

.tdDate {
  font-weight: 600;
  color: #1a202c;
}

.tdAmount {
  text-align: center;
  font-weight: 600;
  color: #92691b;
}

.tdInstallment {
  text-align: center;
  font-weight: 800;
  color: #0f2e24;
}

.tdStatusCenter {
  text-align: center;
}

.tdRef {
  text-align: right;
  font-family: monospace;
  font-size: 12px;
  color: #6b7280;
}

.noResults {
  text-align: center;
  padding: 30px;
  color: #6b7280;
  font-size: 14px;
}

/* ── Status Badges matching Customers.vue ── */
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
  background-color: #e65100;
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
  background-color: #d32f2f;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 4px 14px;
  border-radius: 6px;
  text-transform: uppercase;
}

.instBadge {
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 10.5px;
}

/* ── Secondary Tab Cards ── */
.detailCardsGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 16px;
}

.subCard {
  background-color: #faf7f2;
  border: 1px solid #ede4d6;
  border-radius: 14px;
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subCardTitle {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 800;
  color: #0f2e24;
}

/* ── Docs List ── */
.docsList {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.docItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background-color: #fafbfb;
  transition: all 0.15s ease;
}

.docItem:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

.docLeft {
  display: flex;
  align-items: center;
  gap: 14px;
}

.docIconBox {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: #ecfdf5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.docTitle {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.docMeta {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}

.docBtn {
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1px solid #2e7d5b;
  background-color: #ffffff;
  color: #2e7d5b;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.docBtn:hover {
  background-color: #2e7d5b;
  color: #ffffff;
}

/* ── Timeline ── */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  position: relative;
  padding-left: 20px;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 6px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background-color: #e5e7eb;
}

.timelineItem {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: relative;
}

.timelineDot {
  position: absolute;
  left: -20px;
  top: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #2e7d5b;
  border: 3px solid #ffffff;
  box-shadow: 0 0 0 1px #2e7d5b;
}

.timelineBody {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.timelineDate {
  font-size: 11.5px;
  font-weight: 700;
  color: #9ca3af;
}

.timelineHeading {
  font-size: 14px;
  font-weight: 800;
  color: #111827;
}

.timelineDesc {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
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


  .filterPill {
    padding: 8px 12px;
    font-size: 12.5px;
  }

  .loansTable {
    min-width: 520px;
  }


  .actionBtns {
    width: 100%;
    flex-wrap: wrap;
  }

  .actionSolidBtn,
  .actionOutlineBtn {
    flex: 1;
    justify-content: center;
    white-space: nowrap;
  }

  .bannerPattern {
    width: 92px;
    opacity: 0.6;
  }

  .loansTable {
    min-width: 540px;
  }
}

@media screen and (max-width: 760px) {
  .actionBar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .navRow {
    flex-wrap: wrap;
    row-gap: 2px;
    white-space: normal;
  }

  .navCurrent {
    white-space: nowrap;
  }

  .unifiedInfoContainer {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }

  .unifiedColDivider {
    width: 100%;
    height: 1px;
  }

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
  .loansTable td:nth-child(3),
  .loansTable th:nth-child(4),
  .loansTable td:nth-child(4),
  .loansTable th:nth-child(7),
  .loansTable td:nth-child(7) {
    display: none;
  }

  .metricsStrip {
    flex-wrap: wrap;
    gap: 14px 18px;
    padding: 14px 16px;
  }

  .metricDivider {
    display: none;
  }

  .metricItem {
    flex: 1 1 40%;
  }
}

/* Gaborone theme: white header text only on this preset. */
.isGaborone .dumelaMarion {
  color: #ffffff;
}
.isGaborone .sunday4October {
  color: #ffffff;
}
.isGaborone .sunday4October b {
  color: #ffffff;
}
.isGaborone .marionLucas {
  color: var(--color-darkslategray-500);
}
</style>
