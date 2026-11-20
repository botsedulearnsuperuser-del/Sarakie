<template>
  <div :class="[$style.aiAgentPage, isGaborone ? $style.isGaborone : '']" :style="pageBackground">
    <Main :active-page="'ai-agent'" />
    <main :class="$style.mainContent">
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <h2 :class="$style.pageTitle">AI Agent</h2>
          </div>
          <div :class="$style.p">
            <div :class="$style.pageSub">
              Ask about your submissions, the scoring rubric or CEDA requirements
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

      <section :class="$style.chatLayout">
        <section :class="$style.chatCard">
          <div :class="$style.chatHead">
            <div :class="$style.chatHeadLeft">
              <div :class="$style.agentAvatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.002v1.496c0 2.829 0 4.243-.879 5.121c-.878.88-2.293.88-5.121.88h-4l-3.794 3.32a.727.727 0 0 1-1.207-.548v-2.773c-.929 0-1.394 0-1.775-.102a3 3 0 0 1-2.122-2.122C2 15.893 2 15.428 2 14.5V9.002c0-2.828 0-4.243.879-5.121c.878-.879 2.293-.879 5.121-.879h5" />
                </svg>
              </div>
              <div>
                <div :class="$style.chatTitle">CEDA Innovation Assistant</div>
                <div :class="$style.chatStatus">
                  <span :class="$style.statusDot" />
                  Online · replies in seconds
                </div>
              </div>
            </div>
            <button :class="$style.clearBtn" type="button" @click="resetChat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <polyline points="3 4 3 10 9 10" />
              </svg>
              New chat
            </button>
          </div>

          <div ref="chatBody" :class="$style.chatBody" aria-live="polite">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="[$style.messageRow, message.role === 'user' ? $style.messageRowUser : '']"
            >
              <div v-if="message.role === 'agent'" :class="$style.msgAvatar">AI</div>
              <div
                :class="[
                  $style.bubble,
                  message.role === 'user' ? $style.bubbleUser : $style.bubbleAgent,
                ]"
              >
                {{ message.text }}
              </div>
            </div>

            <div v-if="typing" :class="$style.messageRow">
              <div :class="$style.msgAvatar">AI</div>
              <div :class="[$style.bubble, $style.bubbleAgent, $style.typing]">
                <span /><span /><span />
              </div>
            </div>
          </div>

          <div :class="$style.suggestions">
            <button
              v-for="prompt in suggestions"
              :key="prompt"
              :class="$style.suggestionChip"
              type="button"
              @click="usePrompt(prompt)"
            >
              {{ prompt }}
            </button>
          </div>

          <form :class="$style.composer" @submit.prevent="sendMessage">
            <textarea
              v-model="input"
              :class="$style.composerInput"
              rows="1"
              placeholder="Ask about a submission, the rubric or CEDA requirements…"
              @keydown.enter.exact.prevent="sendMessage"
            />
            <button :class="$style.sendBtn" type="submit" :disabled="!input.trim()">
              Send
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </section>

        <aside :class="$style.sideColumn">
          <section :class="$style.section2">
            <h3 :class="$style.sectionTitle">What I can help with</h3>
            <div :class="$style.helpList">
              <div v-for="item in helpItems" :key="item.title" :class="$style.helpRow">
                <span :class="$style.helpDot" />
                <div>
                  <div :class="$style.helpTitle">{{ item.title }}</div>
                  <div :class="$style.helpText">{{ item.text }}</div>
                </div>
              </div>
            </div>
          </section>

          <div :class="$style.tipCard">
            <img :class="$style.tipPattern" alt="" src="/pattern-1.webp" />
            <div :class="$style.tipLabel">Review window</div>
            <h2 :class="$style.tipValue">10 days</h2>
            <div :class="$style.tipText">
              Most submissions are reviewed within 10 working days. Keep an eye on the
              Feedback Centre for evaluator comments.
            </div>
            <router-link to="/faq" :class="$style.tipBtn" style="text-decoration: none">
              <b>Read the FAQ</b>
              <img :class="$style.arrowIcon" alt="" src="/Frame7.svg" />
            </router-link>
          </div>
        </aside>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, onBeforeUnmount, onMounted, ref } from "vue"
  import { useRouter } from "vue-router"
  import Main from "../components/Main.vue"
  import NotificationsPanel from "../components/NotificationsPanel.vue"
  import { usePageTheme } from "../composables/usePageTheme"
import { THEME_EVENT, isGaboroneTheme } from "../components/themes"

  const pageBackground = usePageTheme()
  const isGaborone = ref(isGaboroneTheme())
  onMounted(() => {
    window.addEventListener(THEME_EVENT, () => (isGaborone.value = isGaboroneTheme()))
  })

  interface ChatMessage {
    role: "agent" | "user"
    text: string
  }

  const router = useRouter()
  const showNotifications = ref(false)

  const greeting: ChatMessage = {
    role: "agent",
    text: "Dumela! I'm the CEDA Innovation Assistant. Ask me about a submission, the scoring rubric, documents or what happens after you submit.",
  }

  const messages = ref<ChatMessage[]>([greeting])
  const input = ref("")
  const typing = ref(false)
  const chatBody = ref<HTMLElement | null>(null)
  let replyTimer: number | null = null

  const suggestions = [
    "How is my submission scored?",
    "Which documents do I need?",
    "How long does review take?",
  ]

  const helpItems = [
    {
      title: "Submission status",
      text: "Where an idea sits in the review pipeline and what happens next.",
    },
    {
      title: "Scoring rubric",
      text: "The five weighted criteria evaluators use and how to address them.",
    },
    {
      title: "Documents",
      text: "What to attach, accepted formats and the per-file size limit.",
    },
    {
      title: "Feedback",
      text: "How to read evaluator comments and resubmit a corrected proposal.",
    },
  ]

  function scrollToBottom() {
    nextTick(() => {
      const el = chatBody.value
      if (el) el.scrollTop = el.scrollHeight
    })
  }

  function replyTo(text: string): string {
    const query = text.toLowerCase()

    if (query.includes("score") || query.includes("rubric") || query.includes("criteria")) {
      return "Submissions are scored out of 100 against five criteria: problem and market need (25%), solution and feasibility (25%), team and capability (20%), financial projections (20%), and impact with youth ownership (10%). Evaluators score each one and the panel reviews the total."
    }

    if (query.includes("document") || query.includes("attach") || query.includes("file")) {
      return "Attach a problem statement, a description of your solution and financial projections at minimum. A fuller submission also carries a business proposal, market research and founder CVs. You can attach up to 10 files per application — PDF, Word, Excel, PowerPoint or images."
    }

    if (query.includes("long") || query.includes("review") || query.includes("status") || query.includes("time")) {
      return "Reviews usually take about 10 working days, longer if documents are missing or the proposal needs specialist input. Every status change raises a notification and updates the application timeline, so you can follow progress from your dashboard."
    }

    if (query.includes("feedback") || query.includes("comment") || query.includes("resubmit")) {
      return "Evaluator comments appear in the Feedback Centre against the idea they relate to. Open a comment to read the detail, reply if you need to clarify something, then resubmit the corrected proposal from the same panel."
    }

    return "I can help with submission status, the scoring rubric, required documents and evaluator feedback. This prototype assistant replies from a fixed set of answers, so for anything account-specific contact your CEDA analyst on +267 77 663 331."
  }

  function sendMessage() {
    const text = input.value.trim()
    if (!text) return

    messages.value.push({ role: "user", text })
    input.value = ""
    typing.value = true
    scrollToBottom()

    if (replyTimer !== null) clearTimeout(replyTimer)
    replyTimer = window.setTimeout(() => {
      messages.value.push({ role: "agent", text: replyTo(text) })
      typing.value = false
      replyTimer = null
      scrollToBottom()
    }, 700)
  }

  function usePrompt(prompt: string) {
    input.value = prompt
    sendMessage()
  }

  function resetChat() {
    messages.value = [{ ...greeting }]
    input.value = ""
    typing.value = false
    if (replyTimer !== null) {
      clearTimeout(replyTimer)
      replyTimer = null
    }
  }

  function openFaq() {
    router.push("/faq")
  }

  onBeforeUnmount(() => {
    if (replyTimer !== null) clearTimeout(replyTimer)
  })
</script>

<style module>
  .aiAgentPage {
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
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 28px 36px 36px;
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
  .pageTitle {
    margin: 0;
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
    font-size: var(--fs-16);
    color: var(--color-darkslategray-200);
  }
  .pageSub {
    position: relative;
    display: inline-block;
    max-width: 100%;
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

  /* ── Chat layout ── */
  .chatLayout {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 0.9fr);
    gap: 16px;
    align-items: stretch;
    font-family: var(--font-inter);
    text-align: left;
  }
  .chatCard {
    border-radius: var(--br-26);
    background-color: var(--color-white);
    border: var(--border-2);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }
  .chatHead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 18px 22px;
    border-bottom: 1px solid var(--color-antiquewhite-200);
  }
  .chatHeadLeft {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }
  .agentAvatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-darkslategray-500);
    color: var(--color-goldenrod-200);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .chatTitle {
    font-size: var(--fs-15);
    font-weight: 700;
    color: var(--color-darkslategray-500);
  }
  .chatStatus {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
    font-size: var(--fs-12);
    color: var(--color-darkslategray-100);
  }
  .statusDot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: var(--color-limegreen);
    display: inline-block;
  }
  .clearBtn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 34px;
    padding: 0 12px;
    border-radius: 10px;
    border: 1px solid var(--color-lightgray-200);
    background-color: var(--color-white);
    color: var(--color-darkslategray-300);
    font-family: inherit;
    font-size: var(--fs-12);
    font-weight: 600;
    cursor: pointer;
    flex-shrink: 0;
  }
  .clearBtn:hover {
    background-color: var(--color-blanchedalmond);
  }
  .chatBody {
    flex: 1;
    min-height: 260px;
    overflow-y: auto;
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    background-color: var(--color-floralwhite);
  }
  .messageRow {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    max-width: 88%;
  }
  .messageRowUser {
    align-self: flex-end;
    flex-direction: row-reverse;
  }
  .msgAvatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: var(--color-darkslategray-500);
    color: var(--color-goldenrod-200);
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .bubble {
    padding: 12px 16px;
    border-radius: 16px;
    font-size: var(--fs-14);
    line-height: 1.5;
    color: var(--color-darkslategray-500);
    white-space: pre-wrap;
  }
  .bubbleAgent {
    background-color: var(--color-white);
    border: 1px solid var(--color-antiquewhite-200);
    border-bottom-left-radius: 4px;
  }
  .bubbleUser {
    background-color: var(--color-darkslategray-500);
    color: var(--color-white);
    border-bottom-right-radius: 4px;
  }
  .typing {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 14px 16px;
  }
  .typing span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--color-darkslategray-200);
    display: inline-block;
    animation: typingBounce 1.1s infinite ease-in-out;
  }
  .typing span:nth-child(2) {
    animation-delay: 0.15s;
  }
  .typing span:nth-child(3) {
    animation-delay: 0.3s;
  }
  @keyframes typingBounce {
    0%,
    60%,
    100% {
      transform: translateY(0);
      opacity: 0.5;
    }
    30% {
      transform: translateY(-3px);
      opacity: 1;
    }
  }
  .suggestions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    padding: 14px 22px 0;
  }
  .suggestionChip {
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
  .suggestionChip:hover {
    background-color: var(--color-blanchedalmond);
  }
  .composer {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    padding: 16px 22px 20px;
  }
  .composerInput {
    flex: 1;
    min-height: 46px;
    max-height: 120px;
    resize: none;
    padding: 13px 16px;
    border-radius: var(--br-12);
    border: 1px solid var(--color-lightgray-200);
    background-color: var(--color-white);
    color: var(--color-darkslategray-500);
    font-family: inherit;
    font-size: var(--fs-14);
    line-height: 1.4;
    box-sizing: border-box;
  }
  .composerInput:focus {
    outline: none;
    border-color: var(--color-darkslategray-500);
  }
  .sendBtn {
    height: 46px;
    padding: 0 20px;
    border: none;
    border-radius: var(--br-12);
    background-color: var(--color-goldenrod-200);
    color: var(--color-darkslategray-500);
    font-family: inherit;
    font-size: var(--fs-14);
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    flex-shrink: 0;
  }
  .sendBtn:hover:not(:disabled) {
    filter: brightness(1.04);
  }
  .sendBtn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  /* ── Side column ── */
  .sideColumn {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }
  .section2 {
    border-radius: var(--br-26);
    background-color: var(--color-white);
    border: var(--border-2);
    box-sizing: border-box;
    padding: 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    color: var(--color-darkslategray-500);
  }
  .sectionTitle {
    margin: 0;
    font-size: 20.6px;
    font-weight: 800;
    letter-spacing: -0.06px;
  }
  .helpList {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .helpRow {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .helpDot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--color-goldenrod-200);
    margin-top: 6px;
    flex-shrink: 0;
  }
  .helpTitle {
    font-size: var(--fs-14);
    font-weight: 700;
  }
  .helpText {
    margin-top: 2px;
    font-size: var(--fs-12);
    line-height: 1.45;
    color: var(--color-darkslategray-100);
  }
  .tipCard {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border-radius: var(--br-26);
    background-color: var(--color-darkslategray-500);
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: var(--color-gainsboro);
  }
  .tipPattern {
    width: 96px;
    height: 100%;
    position: absolute;
    top: 0;
    right: -24px;
    object-fit: cover;
    object-position: center top;
    opacity: 0.85;
    mix-blend-mode: screen;
    z-index: 0;
    pointer-events: none;
  }
  .tipLabel {
    position: relative;
    z-index: 2;
    font-size: var(--fs-12);
  }
  .tipValue {
    position: relative;
    z-index: 2;
    margin: 0;
    font-size: 34px;
    line-height: 1.1;
    font-weight: 800;
    color: var(--color-goldenrod-200);
  }
  .tipText {
    position: relative;
    z-index: 2;
    margin-top: 4px;
    font-size: var(--fs-13);
    line-height: 1.5;
    color: var(--color-silver-200);
  }
  .tipBtn {
    position: relative;
    z-index: 2;
    margin-top: 14px;
    height: 44px;
    border-radius: var(--br-12);
    background-color: var(--color-goldenrod-200);
    color: var(--color-darkslategray-500);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: var(--fs-14);
  }
  .arrowIcon {
    height: var(--height-16);
    width: var(--width-16);
  }

  @media screen and (max-width: 1200px) {
    .mainContent {
      padding: 24px 20px 28px;
    }
  }
  @media screen and (max-width: 1100px) {
    .aiAgentPage {
      grid-template-columns: 1fr;
    }
    .chatLayout {
      grid-template-columns: 1fr;
    }
    .chatCard {
      min-height: 560px;
    }
  }
  @media screen and (max-width: 1050px) {
    .mainContent {
      padding-top: 62px;
      padding-left: 14px;
      padding-right: 14px;
    }
    .pageTitle {
      font-size: 26px;
    }
  }
  @media screen and (max-width: 750px) {
    .mainContent {
      padding-left: 12px;
      padding-right: 12px;
      padding-bottom: 20px;
      gap: 14px;
    }
    .div {
      flex-direction: column-reverse;
      align-items: stretch;
      row-gap: 12px;
      padding: 0;
    }
    .pageTitle {
      font-size: 28px;
      letter-spacing: -0.3px;
    }
    .pageSub {
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
    .chatHead {
      padding: 14px 16px;
    }
    .chatBody {
      padding: 16px;
    }
    .messageRow {
      max-width: 100%;
    }
    .suggestions {
      padding: 12px 16px 0;
    }
    .composer {
      padding: 14px 16px 16px;
    }
    .section2,
    .tipCard {
      padding: 18px 16px;
      border-radius: 20px;
    }
  }

@media screen and (max-width: 760px) {
  .aiAgentPage {
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

  .tipCard {
    padding: 16px;
    border-radius: 18px;
  }

  .chatCard {
    border-radius: 18px;
    min-height: 0;
  }

  .composer {
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px;
  }

  .composerInput {
    font-size: 14px;
  }

  /* Gaborone theme: white header text only on this preset. */
  .isGaborone .pageTitle {
    color: #ffffff;
  }
  .isGaborone .pageSub {
    color: #ffffff;
  }
}
</style>
