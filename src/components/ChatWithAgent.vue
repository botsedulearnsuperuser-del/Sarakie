<template>
  <div>
    <!-- Floating trigger button -->
    <button
      v-if="!open"
      :class="$style.fab"
      type="button"
      aria-label="Chat with agent"
      @click="openChatPage"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M21 11.002v1.496c0 2.829 0 4.243-.879 5.121c-.878.88-2.293.88-5.121.88h-4l-3.794 3.32a.727.727 0 0 1-1.207-.548v-2.773c-.929 0-1.394 0-1.775-.102a3 3 0 0 1-2.122-2.122C2 15.893 2 15.428 2 14.5V9.002c0-2.828 0-4.243.879-5.121c.878-.879 2.293-.879 5.121-.879h5m6 .125v1.875m0 0v1.875m0-1.875h-1.5m1.5 0h1.5m1.5 0l-1.301-.434a2 2 0 0 1-1.265-1.265L19 2.002l-.434 1.301a2 2 0 0 1-1.265 1.265L16 5.002l1.301.434A2 2 0 0 1 18.566 6.7L19 8.002l.434-1.301a2 2 0 0 1 1.265-1.265z" />
      </svg>
      <span>Chat with agent</span>
    </button>

    <!-- Modal -->
    <div v-if="open" :class="$style.overlay" @click.self="closeModal">
      <div :class="$style.modal">
        <header :class="$style.modalHeader">
          <div>
            <h3 :class="$style.modalTitle">Refine your idea with an AI agent</h3>
            <p :class="$style.modalSub">
              A 5-minute live video conversation to help you sharpen your proposal.
            </p>
          </div>
          <button :class="$style.closeBtn" type="button" aria-label="Close" @click="closeModal">
            &times;
          </button>
        </header>

        <!-- Setup state (handled server-side via /api/tavus-conversation) -->

        <!-- Loading -->
        <div v-if="loading" :class="$style.centerBox">
          <div :class="$style.spinner"></div>
          <p>Starting your conversation…</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" :class="$style.centerBox">
          <p :class="$style.errorText">{{ error }}</p>
          <button :class="$style.retryBtn" type="button" @click="startConversation">Retry</button>
        </div>

        <!-- Session ended -->
        <div v-else-if="sessionEnded" :class="$style.centerBox">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2e7d5b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <h4 :class="$style.endedTitle">5-minute session complete</h4>
          <p :class="$style.endedText">
            Your live AI conversation has ended. You can continue refining your idea in the chat interface below.
          </p>
          <div :class="$style.chatBox">
            <input
              v-model="chatInput"
              type="text"
              placeholder="Type a message to continue refining your idea…"
              :class="$style.chatInput"
              @keyup.enter="sendChat"
            />
            <button :class="$style.chatSend" type="button" @click="sendChat">Send</button>
          </div>
          <p v-if="chatReply" :class="$style.chatReply">{{ chatReply }}</p>
        </div>

        <!-- Live conversation -->
        <div v-else :class="$style.videoWrap">
          <div :class="$style.timerBar">
            <span>Time remaining: {{ formattedTime }}</span>
            <div :class="$style.timerTrack">
              <div :class="$style.timerFill" :style="{ width: timerPercent + '%' }"></div>
            </div>
          </div>
          <iframe
            v-if="conversationUrl"
            :src="conversationUrl"
            :class="$style.iframe"
            allow="camera; microphone; fullscreen; display-capture"
            title="AI agent conversation"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const TOTAL_SECONDS = 5 * 60;

const router = useRouter();

const open = ref(false);
const loading = ref(false);
const error = ref("");
const conversationUrl = ref("");
const sessionEnded = ref(false);
const remaining = ref(TOTAL_SECONDS);
let timer: number | null = null;

const chatInput = ref("");
const chatReply = ref("");

function openChatPage() {
  router.push({ name: "AiAgent" });
}

function openModal() {
  open.value = true;
  error.value = "";
  conversationUrl.value = "";
  sessionEnded.value = false;
  remaining.value = TOTAL_SECONDS;
  startConversation();
}

function closeModal() {
  open.value = false;
  stopTimer();
  conversationUrl.value = "";
  loading.value = false;
}


async function startConversation() {
  loading.value = true;
  error.value = "";
  try {
    const res = await fetch("/api/tavus-conversation", {
      method: "POST",
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.error || `Server error ${res.status}`);
    }
    const data = await res.json();
    conversationUrl.value = data.conversation_url || "";
    if (!conversationUrl.value) {
      throw new Error("No conversation URL returned by Tavus.");
    }
    startTimer();
  } catch (e: any) {
    error.value = e?.message || "Failed to start conversation.";
  } finally {
    loading.value = false;
  }
}

function startTimer() {
  stopTimer();
  remaining.value = TOTAL_SECONDS;
  timer = window.setInterval(() => {
    remaining.value -= 1;
    if (remaining.value <= 0) {
      endSession();
    }
  }, 1000);
}

function stopTimer() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

function endSession() {
  stopTimer();
  remaining.value = 0;
  conversationUrl.value = "";
  sessionEnded.value = true;
}

function sendChat() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  // Placeholder: real AI chat will be wired later.
  chatReply.value = `Received: "${msg}". (Chat interface coming soon.)`;
  chatInput.value = "";
}

const formattedTime = computed(() => {
  const m = Math.floor(remaining.value / 60);
  const s = remaining.value % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
});

const timerPercent = computed(() => (remaining.value / TOTAL_SECONDS) * 100);

onMounted(() => {
  window.addEventListener("open-tavus-agent", openModal);
});

onBeforeUnmount(() => {
  window.removeEventListener("open-tavus-agent", openModal);
  stopTimer();
});
</script>

<style module>
.fab {
  position: fixed;
  right: 28px;
  bottom: 28px;
  z-index: 60;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 9999px;
  border: none;
  background-color: var(--color-darkslategray-500, #013626);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-inter, Inter, sans-serif);
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(1, 54, 38, 0.35);
  transition: transform 0.15s ease, background-color 0.15s ease;
}

.fab:hover {
  background-color: var(--color-darkslategray-600, #013525);
  transform: translateY(-2px);
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 70;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}

.modal {
  width: 100%;
  max-width: 820px;
  max-height: 90vh;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: var(--font-inter, Inter, sans-serif);
}

.modalHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #ede9e1;
  gap: 12px;
}

.modalTitle {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 800;
  color: #0f2e24;
}

.modalSub {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}

.closeBtn {
  border: none;
  background: none;
  font-size: 28px;
  line-height: 1;
  color: #6b7280;
  cursor: pointer;
  padding: 0 4px;
}

.setupBox {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}

.setupTitle {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #0f2e24;
}

.setupText {
  margin: 0;
  font-size: 13.5px;
  color: #4b5563;
  line-height: 1.5;
}

.setupList {
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: #374151;
  line-height: 1.6;
}

.setupList code {
  background-color: #f3f4f6;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.setupFields {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}

.setupInput {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 13.5px;
  font-family: inherit;
}

.setupSave {
  padding: 10px 18px;
  border-radius: 9999px;
  border: none;
  background-color: #0f2e24;
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  align-self: flex-start;
}

.setupHint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #9ca3af;
  line-height: 1.4;
}

.centerBox {
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #0f2e24;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.errorText {
  color: #d32f2f;
  font-size: 14px;
  margin: 0;
}

.retryBtn {
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #374151;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.endedTitle {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #0f2e24;
}

.endedText {
  margin: 0;
  font-size: 13.5px;
  color: #4b5563;
  max-width: 420px;
  line-height: 1.5;
}

.chatBox {
  display: flex;
  gap: 8px;
  width: 100%;
  max-width: 480px;
  margin-top: 8px;
}

.chatInput {
  flex: 1;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 13.5px;
  font-family: inherit;
}

.chatSend {
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  background-color: #0f2e24;
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
}

.chatReply {
  margin-top: 10px;
  font-size: 13px;
  color: #374151;
  background-color: #f3f4f6;
  padding: 10px 14px;
  border-radius: 10px;
  max-width: 480px;
  width: 100%;
  text-align: left;
}

.videoWrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  box-sizing: border-box;
  flex: 1;
  min-height: 0;
}

.timerBar {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  font-weight: 700;
  color: #0f2e24;
}

.timerTrack {
  flex: 1;
  height: 8px;
  border-radius: 9999px;
  background-color: #e5e7eb;
  overflow: hidden;
}

.timerFill {
  height: 100%;
  background-color: #2e7d5b;
  transition: width 1s linear;
}

.iframe {
  flex: 1;
  min-height: 420px;
  width: 100%;
  border: none;
  border-radius: 12px;
  background-color: #000;
}

@media screen and (max-width: 750px) {
  .fab {
    right: 14px;
    bottom: 14px;
    padding: 10px 14px;
    gap: 6px;
    font-size: 13px;
  }

  .overlay {
    padding: 12px;
  }

  .modal {
    max-height: 94vh;
    border-radius: 16px;
  }

  .iframe {
    min-height: 320px;
  }
}
</style>
