<template>
  <div :class="[$style.page, isGaborone ? $style.isGaborone : '']" :style="pageBackground">
    <Main />

    <main :class="$style.mainContent">
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <h2 :class="$style.dumelaMarion">Frequently asked questions</h2>
          </div>
          <div :class="$style.pWrap">
            <div :class="$style.subtitle">
              Answers on submissions, reviews, documents and funding
            </div>
          </div>
        </div>
        <div :class="$style.div3">
          <router-link to="/dashboard-sample" :class="$style.backBtn">
            Back to dashboard
          </router-link>
        </div>
      </header>

      <section :class="$style.cardContainer">
        <div :class="$style.banner">
          <img :class="$style.bannerPattern" src="/pattern-2.webp" alt="" />
          <div :class="$style.bannerContent">
            <div :class="$style.termGroup">
              <span :class="$style.termBadge">Help centre</span>
            </div>
            <div :class="$style.balanceAmount">{{ faqs.length }}</div>
            <div :class="$style.borrowedInfo">
              answers on submissions, reviews and funding &middot; updated November 2026
            </div>
          </div>
        </div>

        <div :class="$style.body">
          <section id="scoring-rubric" :class="$style.rubric">
            <div :class="$style.rubricHead">
              <h3 :class="$style.rubricTitle">Scoring rubric</h3>
              <p :class="$style.rubricSub">
                Every submission is scored out of 100 across five weighted criteria.
              </p>
            </div>
            <div :class="$style.rubricList">
              <div
                v-for="criterion in rubric"
                :key="criterion.name"
                :class="$style.rubricItem"
              >
                <div :class="$style.rubricRow">
                  <span :class="$style.rubricName">{{ criterion.name }}</span>
                  <span :class="$style.rubricWeight">{{ criterion.weight }}%</span>
                </div>
                <div :class="$style.rubricTrack">
                  <div
                    :class="$style.rubricFill"
                    :style="{ width: criterion.weight + '%' }"
                  />
                </div>
                <p :class="$style.rubricText">{{ criterion.detail }}</p>
                <p :class="$style.rubricText">
                  <span :class="$style.rubricLabel">Evidence</span>
                  {{ criterion.evidence }}
                </p>
              </div>
            </div>
            <div :class="$style.rubricScale">
              <span :class="$style.rubricLabel">How it is scored</span>
              <p :class="$style.rubricText">
                Each criterion is scored from 0 to 5 and weighted to a total out of 100.
                A score of 70 or more is recommended for funding, 50 to 69 returns the
                proposal to you for clarification, and below 50 is declined. The
                evaluation panel reviews every score before a decision is issued.
              </p>
            </div>
          </section>

          <article v-for="(entry, index) in faqs" :key="entry.question" :class="$style.entry">
            <button type="button" :class="$style.entryToggle" @click="toggle(index)" :aria-expanded="opened[index]">
              <div :class="$style.entryHead">
                <span :class="$style.entryIndex">
                  Question {{ String(index + 1).padStart(2, "0") }}
                </span>
                <h3 :class="$style.question">{{ entry.question }}</h3>
              </div>
              <span :class="[$style.chevron, opened[index] ? $style.chevronOpen : '']" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
            </button>
            <div v-show="opened[index]" :class="$style.answer">
              <span :class="$style.answerLabel">Answer</span>
              <p v-for="paragraph in entry.answer" :key="paragraph" :class="$style.answerText">
                {{ paragraph }}
              </p>
            </div>
          </article>

          <div :class="$style.helpCard">
            <div :class="$style.helpText">
              <h3 :class="$style.helpTitle">Still need help?</h3>
              <p :class="$style.helpCopy">
                Our agents are available Monday to Friday, 08:00 to 17:00. Call
                +267 77 663 331 or start a chat with the CEDA analyst assigned to your
                proposal from any application.
              </p>
            </div>
            <div :class="$style.helpActions">
              <a :class="$style.primaryBtn" href="tel:+26777663331">Contact support</a>
              <router-link :class="$style.linkBtn" to="/loans-sheet">My applications</router-link>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from "vue";
  import { useRoute } from "vue-router";
  import Main from "../components/Main.vue";
  import { usePageTheme } from "../composables/usePageTheme";
import { THEME_EVENT, isGaboroneTheme } from "../components/themes"

  const pageBackground = usePageTheme();
  const isGaborone = ref(isGaboroneTheme());
  onMounted(() => {
    window.addEventListener(THEME_EVENT, () => (isGaborone.value = isGaboroneTheme()));
  });
  const route = useRoute();

  function scrollToRubric() {
    if (route.hash !== "#scoring-rubric") return;
    requestAnimationFrame(() => {
      document
        .getElementById("scoring-rubric")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  onMounted(scrollToRubric);
  watch(() => route.hash, scrollToRubric);

  interface RubricCriterion {
    name: string;
    weight: number;
    detail: string;
    evidence: string;
  }

  const rubric: RubricCriterion[] = [
    {
      name: "Problem and market need",
      weight: 25,
      detail:
        "The problem is real, specific and sizeable enough to build a business around.",
      evidence:
        "customer interviews, market data, letters of interest or pilot demand.",
    },
    {
      name: "Solution and feasibility",
      weight: 25,
      detail:
        "The solution answers the problem and can be delivered with the resources requested.",
      evidence:
        "a prototype, technical plan, delivery milestones and cost build-up.",
    },
    {
      name: "Team and capability",
      weight: 20,
      detail:
        "The people behind the idea have the skills, roles and record to execute it.",
      evidence: "CVs, named responsibilities, prior projects or partnerships.",
    },
    {
      name: "Sustainability and growth",
      weight: 20,
      detail:
        "The idea keeps running after the pilot and can reach more customers over time.",
      evidence: "a revenue model, operating costs, route to market and growth plan.",
    },
    {
      name: "Impact and youth ownership",
      weight: 10,
      detail:
        "Measurable community benefit, with ownership held by young people.",
      evidence: "jobs created, beneficiaries served and ownership structure.",
    },
  ];


interface FaqEntry {
  question: string;
  answer: string[];
}

const faqs: FaqEntry[] = [
  {
    question: "What is the CEDA Innovation Portal?",
    answer: [
      "It is the online workspace where innovators registered with CEDA turn an idea into a funded proposal. From one dashboard you can start a submission, attach your supporting documents, follow every review step and see what has been approved.",
      "The figures on your dashboard are calculated from the same submission record, including the value of current active proposals, applications in review and approved to date, so they update as soon as an application moves to its next stage.",
    ],
  },
  {
    question: "How do I submit a new idea application?",
    answer: [
      "Use Start submission at the top of the dashboard, or New application on the All applications page. The form runs in six steps: applicant details, idea summary, the problem you are solving, your proposed solution, financial projections, and supporting documents.",
      "You can move back a step at any time and nothing is sent to CEDA until you press Submit on the final step. Until then the application stays in Draft and can be reopened and edited.",
    ],
  },
  {
    question: "Which documents should I attach?",
    answer: [
      "At minimum include a problem statement, a description of your proposed solution and financial projections. A fuller submission also carries a business proposal, market research and the CVs of the founder and team.",
      "You can attach up to 10 files per application (PDF, Word, Excel, PowerPoint or images), and each file must stay within the size limit shown in the documents step. Remove a file with its cross if you picked the wrong one.",
    ],
  },
  {
    question: "What happens after I submit?",
    answer: [
      "The application appears in My Applications as In review and is assigned to a CEDA analyst. The analyst reads your documents and may ask for clarification, request a follow-up meeting, or invite you to present the idea.",
      "Reviews usually take about 10 working days, longer if documents are missing or the proposal needs specialist input. Every status change raises a notification and updates the application timeline, so you do not need to call to check progress.",
    ],
  },
  {
    question: "Can I edit or withdraw an application?",
    answer: [
      "While an application is a Draft you can reopen it and change anything. Once it is In review, contact your analyst rather than submitting a second version, because the documents already with the review team are the ones being assessed.",
      "If you need to withdraw an idea, send the request to your analyst from the Feedback Centre and the status is changed to Withdrawn. Nothing you submitted is deleted, so you can reuse the documents on a future application.",
    ],
  },
  {
    question: "Who can see my idea and my documents?",
    answer: [
      "Only you and the CEDA review team working on your application. Documents are stored against your account, are never published, and are not shared with other applicants or with the public.",
      "Evaluators see the submission without your contact details, and adjudicators see the scores and comments of the evaluation panel. Every view of a document is recorded in the audit trail.",
    ],
  },
  {
    question: "How do I keep my account secure?",
    answer: [
      "Enable two-factor authentication from the prompt at the bottom of the dashboard. Scan the QR code with an authenticator app, then type the 6-digit code to confirm the setup. From then on each new sign-in asks for a code as well as your password.",
      "Keep the setup key somewhere safe. If you lose access to the authenticator, CEDA support can reset it for you after verifying your identity.",
    ],
  },
  {
    question: "How do I change the look of my dashboard?",
    answer: [
      "Click the gear next to Sign out in the sidebar. You can choose Gaborone, Gaborone Hills or Okavango, or upload an image of your own from your computer. The choice is remembered the next time you sign in on this browser.",
    ],
  },
];

const opened = ref<boolean[]>(faqs.map(() => false));
function toggle(index: number) {
  opened.value[index] = !opened.value[index];
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
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
}

.h2actH {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.dumelaMarion {
  margin: 0;
  font-size: 36px;
  letter-spacing: -0.84px;
  font-weight: 800;
  color: var(--color-darkslategray-500);
}

.pWrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: var(--fs-16);
  color: var(--color-darkslategray-200);
}

.subtitle {
  display: inline-block;
  max-width: 100%;
}

.div3 {
  display: flex;
  align-items: center;
  gap: 10px;
}

.backBtn {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 22px;
  border-radius: 9999px;
  background-color: var(--color-goldenrod-300);
  color: var(--color-darkslategray-600);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: background-color 0.15s ease;
}

.backBtn:hover {
  background-color: var(--color-goldenrod-200);
}

.cardContainer {
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #ede9e1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.banner {
  position: relative;
  background-color: var(--color-darkslategray-600);
  padding: 28px 32px 32px;
  overflow: hidden;
  box-sizing: border-box;
}

.bannerPattern {
  position: absolute;
  top: 0;
  right: -10px;
  height: 100%;
  width: 180px;
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

.termGroup {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
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

.body {
  padding: 28px 32px 32px;
}

.entry {
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #f1ede5;
}

.entryToggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
}

.entryToggle:hover .question {
  color: var(--color-goldenrod-300);
}

.chevron {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-darkslategray-500);
  transition: transform 0.2s ease;
}

.chevronOpen {
  transform: rotate(180deg);
}

.entry:last-of-type {
  border-bottom: none;
}

.entryHead {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.entryIndex {
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--color-goldenrod-200);
}

.question {
  margin: 0;
  font-size: 19px;
  font-weight: 800;
  line-height: 1.35;
  color: var(--color-darkslategray-500);
  letter-spacing: -0.2px;
}

.answer {
  background-color: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 14px;
  padding: 16px 20px;
}

.answerLabel {
  display: block;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #7c2d12;
  margin-bottom: 8px;
}

.answerText {
  margin: 0 0 10px;
  font-size: 14px;
  line-height: 1.65;
  color: #9a3412;
}

.answerText:last-child {
  margin-bottom: 0;
}

.helpCard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  background-color: #faf7f2;
  border: 1px solid #ede4d6;
  border-radius: 16px;
  padding: 22px 24px;
}

.helpText {
  max-width: 560px;
}

.helpTitle {
  margin: 0 0 6px;
  font-size: 17px;
  font-weight: 800;
  color: var(--color-darkslategray-500);
}

.helpCopy {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: #4b5563;
}

.helpActions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.primaryBtn {
  display: inline-flex;
  align-items: center;
  height: 42px;
  padding: 0 20px;
  border-radius: 9999px;
  background-color: var(--color-darkslategray-600);
  border: 1px solid var(--color-darkslategray-400);
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.primaryBtn:hover {
  background-color: var(--color-darkslategray-500);
}

.linkBtn {
  color: var(--color-goldenrod-300);
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: underline;
}

.linkBtn:hover {
  color: var(--color-goldenrod-200);
}

.rubric {
  border: 1px solid #f1ede5;
  border-radius: 16px;
  padding: 22px 24px;
  margin-bottom: 28px;
  background-color: #faf7f2;
  scroll-margin-top: 24px;
}

.rubricHead {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 18px;
}

.rubricTitle {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.3px;
  color: var(--color-darkslategray-500);
}

.rubricSub {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.5;
  color: #4b5563;
}

.rubricList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rubricItem {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rubricRow {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.rubricName {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-darkslategray-500);
}

.rubricWeight {
  font-size: 13px;
  font-weight: 800;
  color: var(--color-darkslategray-500);
}

.rubricTrack {
  height: 7px;
  border-radius: 999px;
  background-color: #e3dccb;
  overflow: hidden;
}

.rubricFill {
  height: 100%;
  border-radius: 999px;
  background-color: var(--color-darkslategray-500);
}

.rubricText {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: #4b5563;
}

.rubricLabel {
  display: inline-block;
  margin-right: 4px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--color-goldenrod-300);
}

.rubricScale {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid #ede4d6;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

@media screen and (max-width: 1050px) {
  .mainContent {
    padding: 64px 20px 40px;
  }
}

@media screen and (max-width: 620px) {
  .dumelaMarion {
    font-size: 27px;
  }

  .banner {
    padding: 22px 20px 26px;
  }

  .body {
    padding: 22px 20px 24px;
  }

  .question {
    font-size: 17px;
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

  /* Gaborone theme: white header text only on this preset. */
  .isGaborone .dumelaMarion {
    color: #ffffff;
  }
  .isGaborone .p {
    color: rgba(255, 255, 255, 0.9);
  }
}
</style>
