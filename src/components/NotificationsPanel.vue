<template>
  <Teleport to="body">
    <div v-if="open" :class="$style.overlay" @click.self="emit('close')">
      <div :class="$style.card" role="dialog" aria-modal="true" aria-labelledby="notifications-title">
        <div :class="$style.header">
          <h2 id="notifications-title" :class="$style.title">Notifications</h2>
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
                <span :class="$style.termBadge">Unread notifications</span>
              </div>
              <div :class="$style.balanceAmount">{{ unreadCount }}</div>
              <div :class="$style.borrowedInfo">
                {{ items.length }} notifications &middot; latest {{ items[0].time }}
              </div>
            </div>
          </div>

          <article v-for="item in items" :key="item.id" :class="$style.notice">
            <div :class="$style.detailBox">
              <div :class="$style.row">
                <span :class="$style.label">Application</span>
                <span :class="$style.value">{{ item.application }}</span>
              </div>
              <div :class="$style.row">
                <span :class="$style.label">Status</span>
                <span
                  :class="[
                    $style.statusBadge,
                    item.read ? $style.statusAnswered : $style.statusUnread,
                  ]"
                >
                  {{ item.read ? "Read" : "Unread" }}
                </span>
              </div>
              <div :class="$style.row">
                <span :class="$style.label">Received</span>
                <span :class="$style.value">{{ item.time }}</span>
              </div>
            </div>

            <div :class="$style.commentBox">
              <div :class="$style.commentLabel">{{ item.title }}</div>
              <p :class="$style.commentText">{{ item.text }}</p>
            </div>

            <div :class="$style.actions">
              <button :class="$style.primaryBtn" type="button" @click="openApplication">
                View application
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <button :class="$style.linkBtn" type="button" :disabled="item.read" @click="markRead(item)">
                {{ item.read ? "Read" : "Mark as read" }}
              </button>
            </div>
          </article>

          <div :class="$style.actionsBottom">
            <button :class="$style.primaryBtn" type="button" :disabled="unreadCount === 0" @click="markAllRead">
              Mark all as read
            </button>
            <button :class="$style.linkBtn" type="button" @click="emit('close')">Close</button>
          </div>
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10004;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 20px;
  box-sizing: border-box;
  font-family: var(--font-inter);
}

.card {
  width: 100%;
  max-width: 720px;
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

.notice {
  padding-bottom: 22px;
  margin-bottom: 22px;
  border-bottom: 1px solid #f1ede5;
}

.notice:last-of-type {
  border-bottom: none;
  margin-bottom: 4px;
  padding-bottom: 4px;
}

.detailBox {
  background-color: #faf7f2;
  border: 1px solid #ede4d6;
  border-radius: 14px;
  padding: 16px 20px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13.5px;
  gap: 16px;
}

.label {
  color: #6b7280;
  font-weight: 500;
}

.value {
  color: #111827;
  font-weight: 700;
  text-align: right;
  max-width: 65%;
}

.statusBadge {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.3px;
  padding: 3px 9px;
  border-radius: 9999px;
  text-transform: uppercase;
}

.statusUnread {
  background-color: #fde4e1;
  color: #8c1c13;
  border: 1.5px solid #fbd0cb;
}

.statusAnswered {
  background-color: #f0fdf4;
  color: var(--color-darkslategray-500);
  border: 1.5px solid #bbf7d0;
}

.commentBox {
  border: 1px solid #fed7aa;
  border-radius: 14px;
  padding: 16px 20px;
  margin-bottom: 16px;
  background-color: #fff7ed;
}

.commentLabel {
  font-size: 14px;
  font-weight: 800;
  color: #7c2d12;
  margin-bottom: 4px;
}

.commentText {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #9a3412;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.actionsBottom {
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
  transition: all 0.15s ease;
}

.primaryBtn:hover {
  background-color: var(--color-darkslategray-500);
  border-color: var(--color-darkslategray-500);
}

.primaryBtn:disabled {
  background-color: #d6d3c9;
  border-color: #d6d3c9;
  cursor: default;
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

.linkBtn:disabled {
  color: #b8b2a5;
  text-decoration: none;
  cursor: default;
}

@media screen and (max-width: 560px) {
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
}
</style>
