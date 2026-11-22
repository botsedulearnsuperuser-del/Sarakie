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
          <router-link to="/profile" :class="$style.a" style="text-decoration: none">
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
                <AIOrbFace :size="40" :state="assistantState" />
              </div>
              <div>
                <div :class="$style.chatTitle">CEDA Innovation Assistant</div>
                <div :class="$style.chatStatus">
                  <span :class="$style.statusDot" />
                  Online · replies in seconds
                </div>
              </div>
            </div>
            <button v-if="editMode" :class="$style.clearBtn" type="button" @click="disconnectEdit" style="margin-right:8px;color:#b42318;border-color:#fca5a5;">
              Disconnect edit mode
            </button>
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
              <div v-if="message.role === 'agent'" :class="$style.msgAvatar">
                <AIOrbFace :size="28" :state="messageState(message)" />
              </div>
              <div
                :class="[
                  $style.bubble,
                  message.role === 'user' ? $style.bubbleUser : $style.bubbleAgent,
                ]"
              >
                <template v-if="message.role === 'agent'">
                  <AIReasoning
                    v-if="message.reasoning"
                    :class-name="$style.reasoning"
                    :is-streaming="!!message.reasoning.streaming"
                  >
                    {{ message.reasoning.text }}
                  </AIReasoning>
                  <AIResponse
                    :text="message.text"
                    :is-streaming="!!message.streaming"
                  />
                  <WebSearchTrail
                    v-if="message.searches && message.searches.length"
                    :steps="message.searches"
                  />
                </template>
                <template v-else>{{ message.text }}</template>
              </div>
            </div>

            <div v-if="typing" :class="$style.messageRow">
              <div :class="$style.msgAvatar">
                <AIOrbFace :size="28" state="thinking" />
              </div>
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

          <ComposerPanel
            v-model="input"
            placeholder="Ask about a submission, the rubric or CEDA requirements…"
            :reasoning="reasoningEnabled"
            :edit-mode="editMode"
            @reasoning-change="reasoningEnabled = $event"
            @edit-mode-change="editMode = $event"
            @request-edit-consent="consentOpen = true"
            @submit="handleComposerSubmit"
          />
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

          <TaskList
            v-if="editMode"
            title="Edit mode tasks"
            :tasks="editTasks"
          />

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

    <EditConsentModal
      :open="consentOpen"
      :edit-mode-active="editMode"
      @agree="agreeEdit"
      @decline="declineEdit"
      @disconnect="disconnectEdit"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue"
  import { useRouter } from "vue-router"
  import Main from "../components/Main.vue"
  import NotificationsPanel from "../components/NotificationsPanel.vue"
  import ComposerPanel from "../components/ui/ComposerPanel.vue"
  import AIResponse from "../components/ui/AIResponse.vue"
  import WebSearchTrail, { type WebSearchStep } from "../components/ui/WebSearchTrail.vue"
  import EditConsentModal from "../components/ui/EditConsentModal.vue"
  import TaskList from "../components/ui/TaskList.vue"
  import AIReasoning from "../components/ui/AIReasoning.vue"
  import AIOrbFace, { type AIState } from "../components/ui/AIOrbFace.vue"
  import { usePageTheme } from "../composables/usePageTheme"
import { THEME_EVENT, isGaboroneTheme } from "../components/themes"
import { displayName, session } from "../lib/auth"
import { supabase } from "../lib/supabase"
import {
  countDocumentsByApplication,
  loadCorrections,
  loadFeedback,
  loadInnovatorApplications,
  statusLabel,
} from "../lib/portal-data"

  onMounted(() => {
    void loadLiveSummary()
  })

  const pageBackground = usePageTheme()
  const isGaborone = ref(isGaboroneTheme())
  onMounted(() => {
    window.addEventListener(THEME_EVENT, () => (isGaborone.value = isGaboroneTheme()))
  })

  interface ReasoningTrace {
    text: string
    streaming?: boolean
  }

  interface ChatMessage {
    role: "agent" | "user"
    text: string
    streaming?: boolean
    reasoning?: ReasoningTrace
    searches?: WebSearchStep[]
  }

  const router = useRouter()
  const showNotifications = ref(false)

  const greeting: ChatMessage = {
    role: "agent",
    text: `Dumela, ${displayName.value}! I'm the CEDA Innovation Assistant. Ask me about your submissions, the scoring rubric, documents or what happens after you submit.`,
  }

  /**
   * Answers about "my account" are built from the innovator's own Supabase rows,
   * so the assistant never invents a status or a document count.
   */
  const liveSummary = ref("")
  const liveDocuments = ref(0)

  async function loadEditContext() {
    if (!session.value || !supabase) {
      editContext.value = "No signed-in session; cannot read documents."
      return
    }
    try {
      const { data: apps } = await supabase
        .from("applications")
        .select("id, reference, title, problem_statement, proposed_solution, summary, target_beneficiaries, expected_impact")
        .order("submitted_at", { ascending: false })
        .limit(5)
      const lines: string[] = []
      for (const app of (apps ?? []) as Record<string, any>[]) {
        lines.push(`Application ${app.reference} — ${app.title}`)
        if (app.summary) lines.push(`  Summary: ${String(app.summary).slice(0, 600)}`)
        if (app.problem_statement) lines.push(`  Problem: ${String(app.problem_statement).slice(0, 600)}`)
        if (app.proposed_solution) lines.push(`  Solution: ${String(app.proposed_solution).slice(0, 600)}`)
        if (app.target_beneficiaries) lines.push(`  Beneficiaries: ${String(app.target_beneficiaries).slice(0, 400)}`)
        if (app.expected_impact) lines.push(`  Impact: ${String(app.expected_impact).slice(0, 400)}`)
        const { data: docs } = await supabase
          .from("application_documents")
          .select("file_name, mime_type, size_bytes")
          .eq("application_id", app.id)
        const docNames = (docs ?? []).map((d: any) => d.file_name).join(", ")
        if (docNames) lines.push(`  Uploaded documents: ${docNames}`)
      }
      editContext.value = lines.length ? lines.join("\n") : "No applications or documents found."
      editTasks.value = editTasks.value.map((t, i) => ({ ...t, done: i === 0 }))
    } catch (e) {
      editContext.value = "Could not load documents."
    }
  }

  async function loadLiveSummary() {
    if (!session.value) {
      liveSummary.value = "Sign in and I can read your submissions, feedback and documents."
      return
    }
    const [apps, corrections, feedback, documents] = await Promise.all([
      loadInnovatorApplications(),
      loadCorrections(),
      loadFeedback(),
      countDocumentsByApplication(),
    ])
    liveDocuments.value = Object.values(documents).reduce((sum, n) => sum + n, 0)
    if (!apps.length) {
      liveSummary.value = "You have not submitted an innovation proposal yet. Start one from the dashboard and I can track it with you."
      return
    }
    const lines = apps
      .map((app) => `${app.title} (${app.reference}) is ${statusLabel(app.status).toLowerCase()}`)
      .join("; ")
    const openFixes = corrections.filter((fix) => !fix.resolved_at).length
    liveSummary.value =
      `You have ${apps.length} submission${apps.length === 1 ? "" : "s"}: ${lines}. ` +
      `${openFixes} correction request${openFixes === 1 ? "" : "s"} still open, ` +
      `${feedback.length} evaluator comment${feedback.length === 1 ? "" : "s"} on record and ` +
      `${liveDocuments.value} document${liveDocuments.value === 1 ? "" : "s"} uploaded.`
  }

  const messages = ref<ChatMessage[]>([greeting])
  const input = ref("")
  const typing = ref(false)
  const reasoningEnabled = ref(false)
  const editMode = ref(false)
  const consentOpen = ref(false)
  const editContext = ref("")
  const editTasks = ref([
    { id: "read", label: "Read your uploaded documents", done: false },
    { id: "analyse", label: "Analyse content and gaps", done: false },
    { id: "propose", label: "Propose refined edits", done: false },
    { id: "apply", label: "Apply edits you approve", done: false },
  ])

  // The header avatar mirrors whatever the assistant is doing right now.
  const assistantState = computed<AIState>(() => {
    if (typing.value) return "thinking"
    if (messages.value.some((message) => message.reasoning?.streaming)) return "thinking"
    if (messages.value.some((message) => message.streaming)) return "streaming"
    return "idle"
  })

  function messageState(message: ChatMessage): AIState {
    if (message.reasoning?.streaming) return "thinking"
    if (message.streaming) return "streaming"
    return "idle"
  }
  const chatBody = ref<HTMLElement | null>(null)
  let replyTimer: number | null = null
  let streamTimer: number | null = null

  const suggestions = [
    "How is my submission scored?",
    "Which documents do I need?",
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

  function handleComposerSubmit(text: string) {
    input.value = text
    sendMessage()
  }

  function reasoningTextFor(text: string): string {
    const query = text.toLowerCase()

    if (query.includes("score") || query.includes("rubric") || query.includes("criteria")) {
      return "This is about the rubric, so I need all five criteria rather than the general shape of the marking. I'll quote each weight exactly, order them from heaviest to lightest, and keep the advice tied to what evaluators actually assess."
    }

    if (query.includes("document") || query.includes("attach") || query.includes("file")) {
      return "The question is about attachments, so I should separate the minimum pack from the fuller one before listing anything. Then I need the accepted formats and the per-application limit so the answer is actionable rather than abstract."
    }

    if (query.includes("long") || query.includes("review") || query.includes("status") || query.includes("time")) {
      return "The applicant wants a timeline, so I'll anchor it to the 10-working-day norm. I should also say what delays a review and how status changes surface, otherwise the estimate starts to sound like a promise."
    }

    if (query.includes("feedback") || query.includes("comment") || query.includes("resubmit")) {
      return "This is about evaluator feedback, so the path from comment to resubmission matters more than the phrasing. I'll describe where comments live and how a corrected proposal is sent back from the same panel."
    }

    if (query.includes("withdraw") || query.includes("delete")) {
      return "The user is asking about withdrawing, which is irreversible enough that the consequence has to lead. I'll separate what changes from what is kept, then hand the decision back to them instead of assuming it."
    }

    return "The request is about CEDA submissions, so I'll check the guidance that covers it before answering. I'll keep the reply to the steps the applicant can actually act on."
  }

  function streamAnswer(full: string, msgIndex: number) {
    const words = full.split(" ")
    const current = messages.value[msgIndex]
    if (!current) return

    current.streaming = true
    let i = 0
    streamTimer = window.setInterval(() => {
      i += 1
      const msg = messages.value[msgIndex]
      if (msg) {
        msg.text = words.slice(0, i).join(" ")
        if (i >= words.length) {
          msg.streaming = false
        }
      }
      scrollToBottom()
      if (i >= words.length) {
        if (streamTimer !== null) clearInterval(streamTimer)
        streamTimer = null
      }
    }, 55)
  }

  function sendMessage() {
    void loadLiveSummary()
    const text = input.value.trim()
    if (!text) return

    messages.value.push({ role: "user", text })
    input.value = ""
    typing.value = true
    scrollToBottom()

    if (replyTimer !== null) clearTimeout(replyTimer)
    if (streamTimer !== null) clearInterval(streamTimer)
    replyTimer = window.setTimeout(async () => {
      typing.value = false
      const msgIndex = messages.value.length
      const msg: ChatMessage = { role: "agent", text: "", streaming: false }
      if (reasoningEnabled.value) {
        msg.reasoning = { text: "", streaming: true }
      }
      messages.value.push(msg)
      replyTimer = null
      scrollToBottom()

      const startAnswer = (full: string) => streamAnswer(full, msgIndex)

      let full = ""
      let searches: WebSearchStep[] = []
      try {
        const history = messages.value
          .slice(0, msgIndex)
          .filter((m) => m.role === "user" || m.role === "agent")
          .map((m) => ({ role: m.role === "agent" ? "assistant" : "user", content: m.text }))
        const contextParts: string[] = []
        if (liveSummary.value) contextParts.push(`Live portal data for this innovator: ${liveSummary.value}`)
        if (editMode.value && editContext.value) {
          contextParts.push(`EDIT MODE ENABLED. The user has consented to the assistant reading and proposing edits to their uploaded documents. Their document/application content (private to this chat):\n${editContext.value}`)
          contextParts.push("In edit mode: when asked, propose concrete revised text for the user's problem statement, solution, summary, beneficiaries or impact. Present edits clearly with before/after or a single refined version. Never claim an edit was applied to the database; the user applies it. Keep data private to this chat.")
        }
        const contextMsg = contextParts.length
          ? [{ role: "system", content: contextParts.join("\n\n") }]
          : []
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...contextMsg, ...history, { role: "user", content: text }],
            search: reasoningEnabled.value,
          }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          full = data?.error || "Sorry, I couldn't reach the assistant right now. Please try again."
        } else {
          full = data?.reply || "I'm here, but I didn't get a reply. Please try again."
          searches = Array.isArray(data?.searches) ? data.searches : []
        }
      } catch {
        full = "Sorry, I couldn't reach the assistant right now. Please try again."
      }

      const finish = () => {
        if (msg.reasoning) msg.reasoning.streaming = false
        if (searches.length) msg.searches = searches
        startAnswer(full)
      }

      if (!msg.reasoning) {
        finish()
        return
      }

      const trace = reasoningTextFor(text).split(" ")
      let r = 0
      streamTimer = window.setInterval(() => {
        r += 1
        const current = messages.value[msgIndex]
        if (current?.reasoning) {
          current.reasoning.text = trace.slice(0, r).join(" ")
          if (r >= trace.length) current.reasoning.streaming = false
        }
        scrollToBottom()
        if (r >= trace.length) {
          if (streamTimer !== null) clearInterval(streamTimer)
          streamTimer = null
          replyTimer = window.setTimeout(() => {
            replyTimer = null
            finish()
          }, 650)
        }
      }, 45)
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
    if (streamTimer !== null) {
      clearInterval(streamTimer)
      streamTimer = null
    }
  }

  function openFaq() {
    router.push("/faq")
  }

  function agreeEdit() {
    consentOpen.value = false
    editMode.value = true
    void loadEditContext()
  }

  function declineEdit() {
    consentOpen.value = false
    editMode.value = false
  }

  function disconnectEdit() {
    consentOpen.value = false
    editMode.value = false
    editContext.value = ""
    editTasks.value = editTasks.value.map((t) => ({ ...t, done: false }))
  }

  onBeforeUnmount(() => {
    if (replyTimer !== null) clearTimeout(replyTimer)
    if (streamTimer !== null) clearInterval(streamTimer)
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
  .bubbleAgent .reasoning {
    margin-bottom: 6px;
    white-space: normal;
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
}

/* Gaborone theme: white header text only on this preset. */
.isGaborone .pageTitle {
  color: #ffffff;
}
.isGaborone .pageSub {
  color: #ffffff;
}
</style>
