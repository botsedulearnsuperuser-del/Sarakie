<template>
  <section :class="[$style.section, className, props.dark ? $style.sectionDark : '']">
    <div :class="$style.container">
      <div
        :class="$style.header"
      >
        <h2 :class="$style.title">{{ title }}</h2>
        <p :class="$style.description">{{ description }}</p>
      </div>

      <div :class="$style.tabsWrap">
        <div :class="$style.tabsList" role="tablist">
          <button
            v-for="category in resolvedCategories"
            :key="category.name"
            type="button"
            role="tab"
            :aria-selected="activeCategory === category.name"
            :class="[
              $style.tab,
              activeCategory === category.name ? $style.tabActive : '',
            ]"
            @click="activeCategory = category.name"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <div :class="$style.panels">
        <div
          v-for="category in resolvedCategories"
          v-show="activeCategory === category.name"
          :key="category.name"
          role="tabpanel"
          :class="$style.panel"
        >
          <div :class="$style.accordion">
            <div
              v-for="faq in category.faqs"
              :key="faq.question"
              :class="$style.item"
            >
              <button
                type="button"
                :class="$style.trigger"
                @click="toggle(faq.question)"
                :aria-expanded="openQuestion === faq.question"
              >
                <span :class="$style.question">{{ faq.question }}</span>
                <span :class="$style.iconWrap" aria-hidden="true">
                  <svg
                    v-if="openQuestion !== faq.question"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <svg
                    v-else
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div
                v-show="openQuestion === faq.question"
                :class="$style.content"
              >
                <p :class="$style.answer">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";


export interface FaqCategorizedItem {
  question: string;
  answer: string;
}

export interface FaqCategorizedCategory {
  name: string;
  faqs: FaqCategorizedItem[];
}

export interface FaqCategorizedProps {
  title?: string;
  description?: string;
  categories?: FaqCategorizedCategory[];
  className?: string;
  dark?: boolean;
}

const defaultCategories: FaqCategorizedCategory[] = [
  {
    name: "Scoring Rubric",
    faqs: [
      {
        question: "What are the five scoring criteria and their weights?",
        answer:
          "Problem and market need (25%), Solution and feasibility (25%), Team and capability (20%), Sustainability and growth (20%), and Impact and youth ownership (10%). Each criterion is scored from 0 to 5 and weighted to a total out of 100.",
      },
      {
        question: "What score is needed to be recommended for funding?",
        answer:
          "A score of 70 or more is recommended for funding. A score between 50 and 69 returns the proposal for clarification, and below 50 is declined. The evaluation panel reviews every score before a decision is issued.",
      },
      {
        question: "What evidence is expected for Problem and market need?",
        answer:
          "Evidence of customer interviews, market data, letters of interest, or pilot demand showing the problem is real, specific, and sizeable enough to build a business around.",
      },
      {
        question: "What evidence is expected for Solution and feasibility?",
        answer:
          "A prototype, technical plan, delivery milestones, and cost build-up showing the solution answers the problem and can be delivered with the resources requested.",
      },
      {
        question: "What evidence is expected for Team and capability?",
        answer:
          "CVs, named responsibilities, prior projects, or partnerships showing the people behind the idea have the skills, roles, and record to execute it.",
      },
      {
        question: "What evidence is expected for Sustainability and growth?",
        answer:
          "A revenue model, operating costs, route to market, and growth plan showing the idea keeps running after the pilot and can reach more customers over time.",
      },
      {
        question: "What evidence is expected for Impact and youth ownership?",
        answer:
          "Measurable community benefit with ownership held by young people — jobs created, beneficiaries served, and ownership structure.",
      },
    ],
  },
  {
    name: "General",
    faqs: [
      {
        question: "What is the CEDA Innovation Portal?",
        answer:
          "The CEDA Innovation Portal is a grassroots platform for Batswana founders to submit, track, and manage innovation ideas and loan applications, with evaluator review and scoring.",
      },
      {
        question: "How do I submit a new idea application?",
        answer:
          "Create an account, complete your profile, then start a new submission from the dashboard, fill in the required sections, attach supporting documents, and submit for review.",
      },
      {
        question: "Which documents should I attach?",
        answer:
          "Attach supporting evidence such as CVs, business plans, prototypes, market research, letters of interest, cost build-ups, and any documents requested by the submission form.",
      },
      {
        question: "What happens after I submit?",
        answer:
          "Your submission is routed to evaluators who score it against the rubric. You may be asked for clarification if your score is between 50 and 69, or receive a funding recommendation if 70 or above.",
      },
      {
        question: "Can I edit or withdraw an application?",
        answer:
          "You can edit a draft before submission. After submission, contact the review team for changes or withdrawal requests; submitted applications are locked for evaluation.",
      },
      {
        question: "Who can see my idea and my documents?",
        answer:
          "Only you, assigned evaluators, and authorized reviewers can access your submission and documents. Data is scoped per user and never shared publicly without consent.",
      },
      {
        question: "How do I keep my account secure?",
        answer:
          "Use a strong unique password, enable two-factor authentication if available, never share credentials, and sign out on shared devices.",
      },
      {
        question: "How do I change the look of my dashboard?",
        answer:
          "Open the theme picker from the dashboard settings to switch presets or upload a custom theme. Your preference is saved to your account.",
      },
    ],
  },
];

const props = withDefaults(defineProps<FaqCategorizedProps>(), {
  title: "Frequently Asked Questions",
  description: "Find answers organized by topic",
  dark: false,
});

const className = computed(() => props.className);

const resolvedCategories = computed(() =>
  props.categories && props.categories.length ? props.categories : defaultCategories
);

const activeCategory = ref(resolvedCategories.value[0]?.name ?? "");
const openQuestion = ref<string | null>(null);

function toggle(question: string) {
  openQuestion.value = openQuestion.value === question ? null : question;
}

</script>

<style module>
.section {
  margin: 0 auto;
  width: 100%;
  padding: 64px 24px;
  box-sizing: border-box;
  font-family: var(--font-inter);
}
.sectionDark .title {
  color: #ffffff;
}
.sectionDark .description {
  color: rgba(255, 255, 255, 0.75);
}
.sectionDark .tabsList {
  border-bottom-color: rgba(255, 255, 255, 0.2);
}
.sectionDark .tab {
  color: rgba(255, 255, 255, 0.75);
}
.sectionDark .tab:hover {
  color: #ffffff;
}
.sectionDark .tabActive {
  color: #ffffff;
  border-bottom-color: #ffffff;
}
.container {
  max-width: 896px;
  margin: 0 auto;
}
.header {
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.title {
  margin: 0 0 12px;
  color: var(--color-darkslategray-600);
  font-size: 30px;
  line-height: 1.15;
  font-weight: 600;
  letter-spacing: -0.02em;
}
@media (min-width: 768px) {
  .title {
    font-size: 40px;
  }
}
.description {
  margin: 0;
  color: var(--color-darkslategray-200);
  font-size: 16px;
  max-width: 672px;
}
.tabsWrap {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}
.tabsList {
  display: inline-flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  border-bottom: 1px solid var(--color-linen);
  padding-bottom: 8px;
}
.tab {
  padding: 8px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-darkslategray-300);
  border-bottom: 2px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}
.tab:hover {
  color: var(--color-darkslategray-600);
}
.tabActive {
  color: var(--color-darkslategray-600);
  border-bottom-color: var(--color-darkslategray-600);
}
.accordion {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.item {
  background-color: var(--color-linen);
  padding: 0 24px;
  border-radius: 8px;
}
.trigger {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
}
.question {
  flex: 1;
  padding-right: 16px;
  color: var(--color-darkslategray-600);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
}
.iconWrap {
  color: var(--color-darkslategray-300);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.content {
  padding-bottom: 20px;
}
.answer {
  margin: 0;
  color: var(--color-darkslategray-200);
  font-size: 14px;
  line-height: 1.6;
}
@media (min-width: 768px) {
  .answer {
    font-size: 16px;
  }
}
</style>
