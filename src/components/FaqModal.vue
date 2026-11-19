<template>
  <Teleport to="body">
    <div v-if="open" :class="$style.overlay" @click.self="emit('close')">
      <div :class="$style.card" role="dialog" aria-modal="true" aria-labelledby="faq-title">
        <div :class="$style.header">
          <h2 id="faq-title" :class="$style.title">Frequently asked questions</h2>
          <button :class="$style.closeBtn" type="button" aria-label="Close" @click="emit('close')">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div :class="$style.content">
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

          <article v-for="entry in faqs" :key="entry.question" :class="$style.entry">
            <div :class="$style.detailBox">
              <div :class="$style.row">
                <span :class="$style.label">Question</span>
                <span :class="$style.questionValue">{{ entry.question }}</span>
              </div>
            </div>

            <div :class="$style.commentBox">
              <div :class="$style.commentLabel">Answer</div>
              <p v-for="paragraph in entry.answer" :key="paragraph" :class="$style.commentText">
                {{ paragraph }}
              </p>
            </div>
          </article>

          <div :class="$style.actions">
            <a :class="$style.primaryBtn" href="tel:+26777663331">
              Contact support
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
            <button :class="$style.linkBtn" type="button" @click="emit('close')">Got it</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: [] }>();

interface FaqEntry {
  question: string;
  answer: string[];
}

const faqs: FaqEntry[] = [
  {
    question: "What is the CEDA Innovation Portal?",
    answer: [
      "It is the online workspace where innovators registered with CEDA turn an idea into a funded proposal. From one dashboard you can start a submission, attach your supporting documents, follow every review step and see what has been approved.",
      "The figures on your dashboard — value of current active proposals, applications in review and approved to date — are calculated from the same submission record, so they update as soon as an application moves to its next stage.",
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
      "You can attach up to 10 files per application — PDF, Word, Excel, PowerPoint or images — and each file must stay within the size limit shown in the documents step. Remove a file with its cross if you picked the wrong one.",
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
    ],
  },
  {
    question: "Who can see my idea and my documents?",
    answer: [
      "Only you and the CEDA review team working on your application. Documents are stored against your account, are never published, and are not shared with other applicants or with the public.",
    ],
  },
  {
    question: "How do I keep my account secure?",
    answer: [
      "Enable two-factor authentication from the prompt at the bottom of the dashboard. Scan the QR code with an authenticator app, then type the 6-digit code to confirm the setup — from then on each new sign-in asks for a code as well as your password.",
      "Keep the setup key somewhere safe. If you lose access to the authenticator, CEDA support can reset it for you after verifying your identity.",
    ],
  },
  {
    question: "How do I change the look of my dashboard?",
    answer: [
      "Click the gear next to Sign out in the sidebar. You can choose Gaborone, Gaborone Hills or Okavango, or upload an image of your own from your computer — the choice is remembered the next time you sign in on this browser.",
    ],
  },
];
</script>

<style module>
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10003;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 20px;
  box-sizing: border-box;
  font-family: var(--font-inter);
}

.card {
  width: 100%;
  max-width: 860px;
  max-height: 88vh;
  background-color: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 32px 16px;
}

.title {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  color: var(--color-darkslategray-500);
  letter-spacing: -0.4px;
}

.closeBtn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #6b7280;
  border-radius: 6px;
  transition: background-color 0.15s ease;
}

.closeBtn:hover {
  background-color: #f3f4f6;
}

.content {
  padding: 0 32px 32px;
  overflow-y: auto;
}

.banner {
  position: relative;
  background-color: var(--color-darkslategray-600);
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 22px;
  overflow: hidden;
  box-sizing: border-box;
}

.bannerPattern {
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
  margin-bottom: 10px;
}

.termBadge {
  border: 1.5px solid var(--color-goldenrod-200);
  color: var(--color-goldenrod-200);
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 11.5px;
  font-weight: 700;
}

.balanceAmount {
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 4px;
  letter-spacing: -0.3px;
}

.borrowedInfo {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.entry {
  margin-bottom: 22px;
}

.detailBox {
  background-color: #faf7f2;
  border: 1px solid #ede4d6;
  border-radius: 14px;
  padding: 16px 20px;
  margin-bottom: 16px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 13.5px;
  gap: 20px;
}

.label {
  color: #6b7280;
  font-weight: 500;
  flex-shrink: 0;
}

.questionValue {
  color: #111827;
  font-weight: 700;
  text-align: right;
  max-width: 78%;
  line-height: 1.4;
}

.commentBox {
  border: 1px solid #fed7aa;
  border-radius: 14px;
  padding: 16px 20px;
  background-color: #fff7ed;
}

.commentLabel {
  font-size: 14px;
  font-weight: 800;
  color: #7c2d12;
  margin-bottom: 6px;
}

.commentText {
  margin: 0 0 8px;
  font-size: 13px;
  line-height: 1.6;
  color: #9a3412;
}

.commentText:last-child {
  margin-bottom: 0;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 18px;
  border-top: 1px solid #f1ede5;
}

.primaryBtn {
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
  text-decoration: none;
  transition: all 0.15s ease;
}

.primaryBtn:hover {
  background-color: var(--color-darkslategray-500);
  border-color: var(--color-darkslategray-500);
}

.linkBtn {
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

.linkBtn:hover {
  color: var(--color-goldenrod-200);
}

@media screen and (max-width: 620px) {
  .overlay {
    padding: 12px;
  }

  .header {
    padding: 18px 18px 12px;
  }

  .title {
    font-size: 21px;
  }

  .content {
    padding: 0 18px 22px;
  }

  .row {
    flex-direction: column;
    gap: 4px;
  }

  .questionValue {
    text-align: left;
    max-width: 100%;
  }
}
</style>
