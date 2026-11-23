<template>
  <div :class="[$style.page, isGaborone ? $style.isGaborone : '']" :style="pageBackground">
    <Main active-page="feedback-center" :role="sidebarRole" />

    <main :class="$style.mainContent">
      <header :class="$style.div">
        <div :class="$style.div2">
          <div :class="$style.h2actH">
            <h2 :class="$style.dumelaMarion">Conversation</h2>
          </div>
          <div :class="$style.pWrap">
            <div :class="$style.sunday4October">
              {{ applicationTitle || "Loading application…" }}
            </div>
          </div>
        </div>
        <div :class="$style.div3">
          <img :class="$style.notifications2New" alt="" src="/Notifications-2-new.svg" />
          <img :class="$style.notifications2New" alt="" src="/Help.svg" />
          <router-link to="/profile" :class="$style.userA" style="text-decoration: none;">
            <img :class="$style.userAvatarImg" src="/innovator-man.webp" :alt="displayName" />
            <div :class="$style.span3">
              <div :class="$style.marionLucas">{{ displayName }}</div>
            </div>
          </router-link>
        </div>
      </header>

      <div v-if="loading" :class="$style.viewState">Loading conversation…</div>
      <div v-else-if="notFound" :class="$style.viewState">
        <p>This application could not be found, or you do not have access.</p>
        <router-link to="/my-applications" :class="$style.emptyLink">Back to Applications</router-link>
      </div>
      <template v-else>
        <section :class="$style.cardContainer">
          <div :class="$style.chatHeader">
            <div>
              <div :class="$style.chatTitle">{{ applicationTitle }}</div>
              <div :class="$style.chatMeta">{{ applicationRef }} · {{ applicationStatus }}</div>
            </div>
            <div :class="$style.chatActions">
              <button
                v-if="isReviewer"
                :class="$style.actionOutlineBtn"
                type="button"
                @click="openRequestChanges"
              >
                Request changes
              </button>
              <button
                v-if="isReviewer"
                :class="$style.actionSolidBtn"
                type="button"
                @click="handleApprove"
              >
                Approve
              </button>
              <button
                v-if="isInnovator && applicationStatus === 'Feedback Required'"
                :class="$style.actionSolidBtn"
                type="button"
                @click="handleResubmit"
              >
                Resubmit
              </button>
            </div>
          </div>

          <div ref="messagesEl" :class="$style.messages">
            <div v-if="messages.length === 0" :class="$style.emptyChat">
              No messages yet. Start the conversation below.
            </div>
            <div
              v-for="msg in messages"
              :key="msg.id"
              :class="[
                $style.message,
                msg.author_id === currentUserId ? $style.messageMine : $style.messageTheirs,
              ]"
            >
              <div :class="$style.messageMeta">
                <span :class="$style.messageAuthor">
                  {{ msg.author_name || roleLabel(msg.author_role) }}
                </span>
                <span :class="$style.messageRole">{{ roleLabel(msg.author_role) }}</span>
                <span :class="$style.messageTime">{{ formatTime(msg.created_at) }}</span>
              </div>
              <div :class="$style.messageBody">{{ msg.body }}</div>
            </div>
          </div>

          <div v-if="requestChangesOpen" :class="$style.requestBox">
            <textarea
              v-model="requestChangesText"
              :class="$style.requestTextarea"
              rows="3"
              placeholder="Describe the corrections required before approval…"
            />
            <div :class="$style.requestActions">
              <button :class="$style.actionOutlineBtn" type="button" @click="requestChangesOpen = false">
                Cancel
              </button>
              <button :class="$style.actionSolidBtn" type="button" @click="submitRequestChanges">
                Send &amp; mark returned
              </button>
            </div>
            <p v-if="requestError" :class="$style.errorText">{{ requestError }}</p>
          </div>

          <div :class="$style.composer">
            <textarea
              v-model="draft"
              :class="$style.composerInput"
              rows="2"
              placeholder="Type a message…"
              @keydown.enter.exact.prevent="handleSend"
            />
            <button :class="$style.sendBtn" type="button" @click="handleSend" :disabled="sending">
              {{ sending ? "Sending…" : "Send" }}
            </button>
          </div>
          <p v-if="sendError" :class="$style.errorText">{{ sendError }}</p>
        </section>
      </template>
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

import { onMounted, ref, computed, nextTick, watch } from "vue";
import { THEME_EVENT, isGaboroneTheme } from "../components/themes";
import { useRoute, useRouter } from "vue-router";
import Main from "../components/Main.vue";
import ChatWithAgent from "../components/ChatWithAgent.vue";
import { supabase } from "../lib/supabase";
import { authReady, currentRole, displayName, session } from "../lib/auth";
import {
  loadChatMessages,
  sendChatMessage,
  requestApplicationChanges,
  approveApplication,
  type ChatMessageRow,
} from "../lib/portal-data";


const route = useRoute();
const router = useRouter();

const applicationId = computed(() => {
  const q = typeof route.query.id === "string" ? route.query.id : "";
  const p = typeof route.params.id === "string" ? route.params.id : "";
  return q || p;
});

const loading = ref(true);
const notFound = ref(false);
const messages = ref<ChatMessageRow[]>([]);
const draft = ref("");
const sending = ref(false);
const sendError = ref("");
const requestChangesOpen = ref(false);
const requestChangesText = ref("");
const requestError = ref("");

const applicationTitle = ref("");
const applicationRef = ref("");
const applicationStatus = ref("");

const currentUserId = computed(() => session.value?.user.id ?? "");
const isInnovator = computed(() => currentRole.value === "innovator");
const isReviewer = computed(
  () => currentRole.value === "evaluator" || currentRole.value === "adjudicator" || currentRole.value === "admin",
);

const sidebarRole = computed(() => {
  if (currentRole.value === "admin") return "admin";
  if (currentRole.value === "evaluator" || currentRole.value === "adjudicator") return "evaluator";
  return undefined;
});

const messagesEl = ref<HTMLElement | null>(null);

function roleLabel(role: string): string {
  switch (role) {
    case "innovator":
      return "Innovator";
    case "evaluator":
      return "Evaluator";
    case "adjudicator":
      return "Adjudicator";
    case "admin":
      return "Admin";
    default:
      return role;
  }
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function hydrate() {
  loading.value = true;
  notFound.value = false;
  const id = applicationId.value;
  if (!id || !supabase || !session.value) {
    notFound.value = true;
    loading.value = false;
    return;
  }
  const { data, error } = await supabase
    .from("applications")
    .select("id, reference, title, status")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) {
    notFound.value = true;
    loading.value = false;
    return;
  }
  applicationTitle.value = data.title ?? "Application";
  applicationRef.value = data.reference ?? data.id;
  applicationStatus.value = data.status ?? "";
  messages.value = await loadChatMessages(id);
  loading.value = false;
  await nextTick(scrollToBottom);
}

function scrollToBottom() {
  if (messagesEl.value) messagesEl.value.scrollTop = messagesEl.value.scrollHeight;
}

async function handleSend() {
  const text = draft.value.trim();
  if (!text) return;
  sending.value = true;
  sendError.value = "";
  const result = await sendChatMessage(applicationId.value, text, currentRole.value as any);
  if (!result.ok) {
    sendError.value = result.error ?? "Message could not be sent.";
    sending.value = false;
    return;
  }
  draft.value = "";
  messages.value = await loadChatMessages(applicationId.value);
  sending.value = false;
  await nextTick(scrollToBottom);
}

function openRequestChanges() {
  requestChangesOpen.value = true;
  requestChangesText.value = "";
  requestError.value = "";
}

async function submitRequestChanges() {
  requestError.value = "";
  const result = await requestApplicationChanges(applicationId.value, requestChangesText.value);
  if (!result.ok) {
    requestError.value = result.error ?? "Could not request changes.";
    return;
  }
  // also post as a chat message
  await sendChatMessage(
    applicationId.value,
    `Changes requested: ${requestChangesText.value.trim()}`,
    currentRole.value as any,
  );
  requestChangesOpen.value = false;
  requestChangesText.value = "";
  applicationStatus.value = "returned";
  messages.value = await loadChatMessages(applicationId.value);
  await nextTick(scrollToBottom);
}

async function handleApprove() {
  const result = await approveApplication(applicationId.value);
  if (!result.ok) {
    sendError.value = result.error ?? "Could not approve.";
    return;
  }
  await sendChatMessage(applicationId.value, "Application approved.", currentRole.value as any);
  applicationStatus.value = "approved";
  messages.value = await loadChatMessages(applicationId.value);
}

function handleResubmit() {
  router.push({ name: "ApplicationView", query: { id: applicationId.value }, hash: "#corrections" });
}

watch(
  () => [applicationId.value, session.value?.user.id, authReady.value],
  () => {
    if (authReady.value) void hydrate();
  },
  { immediate: true },
);
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

.viewState {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
  font-size: 15px;
}

.emptyLink {
  color: #2e7d5b;
  font-weight: 700;
  text-decoration: none;
}

.cardContainer {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border: 1px solid #ede9e1;
  padding: 24px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 420px;
}

.chatHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.chatTitle {
  font-size: 18px;
  font-weight: 800;
  color: #1a202c;
}

.chatMeta {
  font-size: 13px;
  color: #6b7280;
  margin-top: 2px;
}

.chatActions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
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

.messages {
  flex: 1;
  max-height: 420px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 4px;
}

.emptyChat {
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
  padding: 40px 0;
}

.message {
  max-width: 78%;
  padding: 10px 14px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.messageMine {
  align-self: flex-end;
  background-color: #0f2e24;
  color: #ffffff;
}

.messageTheirs {
  align-self: flex-start;
  background-color: #f3f5f4;
  color: #1a202c;
}

.messageMeta {
  display: flex;
  gap: 8px;
  font-size: 11px;
  opacity: 0.85;
  flex-wrap: wrap;
}

.messageAuthor {
  font-weight: 700;
}

.messageRole {
  font-style: italic;
}

.messageTime {
  margin-left: auto;
}

.messageBody {
  font-size: 14px;
  line-height: 1.45;
  white-space: pre-wrap;
  word-break: break-word;
}

.requestBox {
  border: 1px solid #fed7aa;
  background-color: #fff7ed;
  border-radius: 14px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.requestTextarea {
  width: 100%;
  border: 1px solid #fdba74;
  border-radius: 10px;
  padding: 10px 12px;
  font-family: var(--font-inter);
  font-size: 13.5px;
  resize: vertical;
  box-sizing: border-box;
}

.requestActions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.composer {
  display: flex;
  gap: 10px;
  align-items: flex-end;
  padding-top: 8px;
  border-top: 1px solid #f1f5f9;
}

.composerInput {
  flex: 1;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 10px 12px;
  font-family: var(--font-inter);
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
}

.sendBtn {
  padding: 10px 20px;
  border-radius: 9999px;
  border: none;
  background-color: #0f2e24;
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-inter);
  white-space: nowrap;
}

.sendBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.errorText {
  color: #b91c1c;
  font-size: 13px;
  margin: 0;
}

@media screen and (max-width: 1050px) {
  .mainContent {
    padding-top: 64px;
  }
}

/* Gaborone theme: the page sits on a photo, so header and state text go white. */
.isGaborone .dumelaMarion,
.isGaborone .sunday4October,
.isGaborone .viewState,
.isGaborone .emptyLink {
  color: #ffffff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);
}

.isGaborone .emptyLink {
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style>
