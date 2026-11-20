<template>
  <Teleport to="body">
    <div v-if="open" :class="$style.overlay" @click.self="emit('close')">
      <div
        :class="$style.card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notifications-title"
      >
        <div :class="$style.header">
          <div :class="$style.headerLeft">
            <h2 id="notifications-title" :class="$style.title">Notifications</h2>
            <span v-if="unreadCount > 0" :class="$style.count">{{ unreadCount }}</span>
          </div>
          <div :class="$style.headerActions">
            <button
              v-if="unreadCount > 0"
              :class="$style.textBtn"
              type="button"
              @click="markAllRead"
            >
              Mark all as read
            </button>
            <button :class="$style.closeBtn" type="button" aria-label="Close" @click="emit('close')">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div :class="$style.list">
          <article
            v-for="item in items"
            :key="item.id"
            :class="[$style.notice, item.read ? $style.noticeRead : '']"
          >
            <div :class="$style.noticeTop">
              <span :class="$style.noticeTitle">{{ item.title }}</span>
              <span v-if="!item.read" :class="$style.dot" aria-label="Unread" />
            </div>
            <p :class="$style.noticeText">{{ item.text }}</p>
            <div :class="$style.meta">
              <span>{{ item.application }}</span>
              <span :class="$style.sep">·</span>
              <span>{{ item.time }}</span>
            </div>
            <div :class="$style.actions">
              <button :class="$style.action" type="button" @click="openApplication">
                View application
              </button>
              <button
                :class="[$style.action, item.read ? $style.actionMuted : '']"
                type="button"
                :disabled="item.read"
                @click="markRead(item)"
              >
                {{ item.read ? "Read" : "Mark as read" }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";

defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: [] }>();
const router = useRouter();

interface Notice {
  id: number;
  application: string;
  title: string;
  text: string;
  time: string;
  read: boolean;
}

const items = reactive<Notice[]>([
  {
    id: 1,
    application: "Irrigation Kit",
    title: "Review scheduled",
    text: "Your next review for Irrigation Kit is booked for 25 October 2026 with the evaluator assigned to your proposal.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    application: "Solar Dryer",
    title: "Feedback requested",
    text: "CEDA asked for more detail on the unit economics of Solar Dryer before the proposal can move to the next stage.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 3,
    application: "Agri-cooling proposal",
    title: "Application approved",
    text: "P 10,900.00 was approved for the Agri-cooling proposal on 2 October 2026.",
    time: "1 October 2026",
    read: false,
  },
  {
    id: 4,
    application: "Edu App",
    title: "Draft saved",
    text: "Your new idea application was saved automatically. 4 of 6 steps are complete.",
    time: "28 September 2026",
    read: true,
  },
]);

const unreadCount = computed(() => items.filter((item) => !item.read).length);

function markRead(item: Notice) {
  item.read = true;
}

function markAllRead() {
  items.forEach((item) => {
    item.read = true;
  });
}

function openApplication() {
  emit("close");
  router.push("/loans-sheet");
}
</script>

<style module>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 10004;
  background-color: transparent;
  font-family: var(--font-inter);
}

.card {
  position: fixed;
  top: 82px;
  right: 28px;
  width: 392px;
  max-width: calc(100vw - 32px);
  max-height: min(72vh, 620px);
  background-color: #ffffff;
  border: 1px solid #e8e2d6;
  border-radius: 16px;
  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px 12px;
  border-bottom: 1px solid #f1ede5;
}

.headerLeft {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  color: var(--color-darkslategray-500);
}

.count {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 9999px;
  background-color: var(--color-goldenrod-300);
  color: var(--color-darkslategray-600);
  font-size: 11.5px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.headerActions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.textBtn {
  background: none;
  border: none;
  padding: 0;
  color: var(--color-darkslategray-300);
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.textBtn:hover {
  color: var(--color-darkslategray-500);
  text-decoration: underline;
}

.closeBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #8a8378;
  cursor: pointer;
}

.closeBtn:hover {
  background-color: #f3efe6;
}

.list {
  overflow-y: auto;
}

.notice {
  padding: 12px 16px;
  border-bottom: 1px solid #f4f0e8;
}

.notice:last-child {
  border-bottom: none;
}

.notice:hover {
  background-color: #fbf9f5;
}

.noticeTop {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 3px;
}

.noticeTitle {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--color-darkslategray-500);
}

.noticeRead .noticeTitle {
  font-weight: 600;
  color: #5c6b64;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-goldenrod-300);
  flex-shrink: 0;
}

.noticeText {
  margin: 0 0 6px;
  font-size: 12.5px;
  line-height: 1.5;
  color: #4b5563;
}

.meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: #8a8378;
  margin-bottom: 8px;
}

.sep {
  opacity: 0.6;
}

.actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.action {
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--color-darkslategray-500);
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}

.action:hover {
  color: var(--color-darkslategray-300);
}

.actionMuted {
  color: #a8a29a;
  text-decoration: none;
  cursor: default;
}

@media screen and (max-width: 560px) {
  .card {
    top: 70px;
    right: 12px;
    left: 12px;
    width: auto;
    max-width: none;
  }
}
</style>
