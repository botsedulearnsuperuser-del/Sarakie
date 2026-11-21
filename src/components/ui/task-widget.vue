<template>
  <div
    :class="[
      $style.card,
      isOpen ? $style.cardOpen : '',
      isMinimized && !isOpen ? $style.cardCompact : '',
    ]"
    role="button"
    tabindex="0"
    :aria-expanded="isOpen"
    @click="toggle"
    @keydown.enter.prevent="toggle"
    @keydown.space.prevent="toggle"
  >
    <div :class="$style.header">
      <div :class="[$style.identity, isOpen ? $style.identityOpen : '']">
        <div :class="[$style.iconBox, isOpen ? $style.iconBoxOpen : '']">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            :width="isOpen ? 24 : 17"
            :height="isOpen ? 24 : 17"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="3"
              stroke="currentColor"
              stroke-width="1.6"
            />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2 :class="[$style.title, isOpen ? $style.titleOpen : '']">
          {{ data.title }}
        </h2>
      </div>

      <div v-if="!isOpen" :class="$style.headerProgress">
        <span :class="[$style.progressTrack, $style.headerTrack]">
          <span
            :class="$style.progressFill"
            :style="{ width: data.progress + '%' }"
          >
            <span :class="$style.shimmer" />
          </span>
        </span>
        <span :class="$style.headerPercent">{{ data.progress }}%</span>
      </div>
      <button
        v-else
        :class="$style.moreButton"
        type="button"
        aria-label="More options"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <circle cx="5" cy="12" r="1.8" fill="currentColor" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
          <circle cx="19" cy="12" r="1.8" fill="currentColor" />
        </svg>
      </button>

      <div v-if="!isOpen" :class="$style.windowControls">
        <button
          :class="[
            $style.windowButton,
            isMinimized ? $style.windowButtonActive : '',
          ]"
          type="button"
          aria-label="Minimize task card"
          :aria-pressed="isMinimized"
          @click.stop="minimize"
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
            <path
              d="M9 6 4 12l5 6M15 6l5 6-5 6"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          :class="[
            $style.windowButton,
            !isMinimized ? $style.windowButtonActive : '',
          ]"
          type="button"
          aria-label="Maximize task card"
          :aria-pressed="!isMinimized"
          @click.stop="maximize"
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
            <path
              d="M15 6l5 6-5 6M9 6 4 12l5 6"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      :class="[$style.collapsible, isOpen ? $style.collapsibleClosed : '']"
      :aria-hidden="isOpen"
      :inert="isOpen"
    >
      <div :class="$style.collapsibleInner">
        <div :class="$style.subHeader">
          <div :class="$style.subMeta">
            <div :class="$style.subMetaItem">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M4 21V4h9l-1 3h8v9h-8l1 3H4Z"
                  fill="currentColor"
                />
              </svg>
              <span>{{ data.priority }}</span>
            </div>
            <div :class="$style.subMetaItem">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 2h12M6 22h12M7 2v3c0 2 2 3 5 5 3-2 5-3 5-5V2M7 22v-3c0-2 2-3 5-5 3 2 5 3 5 5v3"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>{{ data.status }}</span>
            </div>
          </div>
          <div :class="$style.avatarStack">
            <img
              v-for="(user, index) in data.assignees"
              :key="index"
              :src="user.avatar"
              :alt="user.name"
              :class="$style.stackAvatar"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      :class="[$style.collapsible, !isOpen ? $style.collapsibleClosed : '']"
      :aria-hidden="!isOpen"
      :inert="!isOpen"
    >
      <div :class="$style.collapsibleInner">
        <div :class="$style.expandedContent">
          <div :class="$style.progressPill">
            <span :class="$style.progressCheck">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  stroke-width="1.6"
                />
                <path
                  d="m8 12 2.6 2.6L16 9"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span :class="$style.progressCount">
              <strong>{{ data.completedCount }}</strong> of {{ data.totalCount }}
            </span>
            <span :class="[$style.progressTrack, $style.expandedTrack]">
              <span
                :class="$style.progressFill"
                :style="{ width: data.progress + '%' }"
              >
                <span :class="$style.shimmer" />
              </span>
            </span>
            <span :class="$style.expandedPercent">{{ data.progress }}%</span>
          </div>

          <div :class="$style.subtasks">
            <div
              v-for="task in data.subtasks"
              :key="task.id"
              :class="$style.taskRow"
            >
              <span
                :class="[
                  $style.taskCheck,
                  task.completed ? $style.taskCheckDone : '',
                ]"
              >
                <svg
                  v-if="task.completed"
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m4 12 5 5L20 6"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span
                :class="[
                  $style.taskTitle,
                  task.completed ? $style.taskTitleDone : '',
                ]"
              >
                {{ task.title }}
              </span>
            </div>
          </div>

          <div :class="$style.metaList">
            <div :class="$style.metaRow">
              <div :class="$style.metaLabel">
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path
                    d="M4 21V4h9l-1 3h8v9h-8l1 3H4Z"
                    fill="currentColor"
                    opacity="0.65"
                  />
                </svg>
                <span>Priority</span>
              </div>
              <div :class="[$style.badge, $style.badgePriority]">
                <span>{{ data.priority }}</span>
                <span :class="[$style.chevronWrap, $style.chevronPriority]">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                    <path
                      d="m6 9 6 6 6-6"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div :class="$style.metaRow">
              <div :class="$style.metaLabel">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 2h12M6 22h12M7 2v3c0 2 2 3 5 5 3-2 5-3 5-5V2M7 22v-3c0-2 2-3 5-5 3 2 5 3 5 5v3"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    opacity="0.65"
                  />
                </svg>
                <span>Status</span>
              </div>
              <div :class="[$style.badge, $style.badgeStatus]">
                <span>{{ data.status }}</span>
                <span :class="[$style.chevronWrap, $style.chevronStatus]">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                    <path
                      d="m6 9 6 6 6-6"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div :class="$style.assignees">
            <div
              v-for="(user, index) in data.assignees"
              :key="index"
              :class="$style.assigneeChip"
            >
              <img
                :src="user.avatar"
                :alt="user.name"
                :class="$style.assigneeAvatar"
              />
              <span>{{ user.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue"

  interface Subtask {
    id: string
    title: string
    completed: boolean
  }

  interface Assignee {
    name: string
    avatar: string
    color?: string
  }

  interface TaskData {
    title: string
    progress: number
    completedCount: number
    totalCount: number
    priority: string
    status: string
    subtasks: Subtask[]
    assignees: Assignee[]
  }

  defineProps<{ data: TaskData }>()

  const isOpen = ref(false)
  /** Compact width: keeps the title, percentage and avatars, drops the meta row. */
  const isMinimized = ref(false)

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function minimize() {
    isMinimized.value = true
  }

  function maximize() {
    isMinimized.value = false
  }
</script>

<style module>
  .card {
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    border: 2px solid #e8e2d8;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow:
      0 20px 40px rgba(15, 46, 36, 0.16),
      0 2px 6px rgba(15, 46, 36, 0.06);
    cursor: pointer;
    overflow: hidden;
    user-select: none;
    font-family: var(--font-inter, Inter, Arial, sans-serif);
    transition:
      border-radius 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
      padding 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
      box-shadow 0.3s ease,
      width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .cardCompact {
    width: 268px;
  }
  .cardCompact .headerTrack {
    display: none;
  }
  .cardCompact .subMeta {
    display: none;
  }
  .cardCompact .subHeader {
    justify-content: flex-end;
    padding-top: 4px;
  }

  .windowControls {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }
  .windowButton {
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1.5px solid #e8e2d8;
    border-radius: 999px;
    background-color: #ffffff;
    color: #8a8376;
    font-family: inherit;
    cursor: pointer;
    flex-shrink: 0;
    transition: background-color 0.18s ease, color 0.18s ease;
  }
  .windowButton:hover {
    background-color: #f4efe6;
    color: #171717;
  }
  .windowButtonActive {
    background-color: #f4efe6;
    color: #013525;
  }
  .card:focus-visible {
    outline: 3px solid rgba(1, 53, 37, 0.22);
    outline-offset: 3px;
  }
  .cardOpen {
    padding: 22px;
    border-radius: 26px;
    max-height: calc(100dvh - 100px);
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
  }
  .cardOpen::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .header {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .identity {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 2px 8px 2px 6px;
    border-radius: 999px;
    background-color: #f4efe6;
    transition:
      background-color 0.3s ease,
      padding 0.3s ease;
  }
  .identityOpen {
    padding: 0;
    background-color: transparent;
  }
  .iconBox {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin: 2px 0;
    border: 1.7px solid #e8e2d8;
    border-radius: 999px;
    background-color: #ffffff;
    color: #8a8376;
    box-sizing: border-box;
    transition:
      width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
      height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .iconBox svg {
    width: 15px;
    height: 15px;
  }
  .iconBoxOpen {
    width: 40px;
    height: 40px;
  }
  .iconBoxOpen svg {
    width: 20px;
    height: 20px;
  }
  .title {
    margin: 0;
    color: #171717;
    font-family: inherit;
    font-size: var(--fs-14);
    line-height: 1.25;
    font-weight: 600;
    white-space: nowrap;
    transform-origin: left;
    transition: font-size 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .titleOpen {
    font-size: var(--fs-18);
    font-weight: 700;
  }

  .headerProgress {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }
  .progressTrack {
    position: relative;
    display: block;
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background-color: #ece6db;
  }
  .headerTrack {
    width: 128px;
  }
  .progressFill {
    position: relative;
    display: block;
    height: 100%;
    overflow: hidden;
    border-radius: 999px;
    background-color: #013525;
    transition: width 0.4s ease;
  }
  .shimmer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transform: translateX(-100%);
    animation: shimmer 1.5s linear infinite;
  }
  @keyframes shimmer {
    to {
      transform: translateX(100%);
    }
  }
  .headerPercent {
    color: #737373;
    font-size: var(--fs-13);
    font-weight: 500;
  }
  .moreButton {
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 2px solid #e8e2d8;
    border-radius: 999px;
    background-color: #ffffff;
    color: #171717;
    font-family: inherit;
    cursor: pointer;
    flex-shrink: 0;
  }
  .moreButton svg {
    width: 18px;
    height: 18px;
  }
  .moreButton:hover {
    background-color: #f4efe6;
  }

  .collapsible {
    display: grid;
    grid-template-rows: 1fr;
    transition: grid-template-rows 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .collapsibleClosed {
    grid-template-rows: 0fr;
  }
  .collapsibleInner {
    min-height: 0;
    overflow: hidden;
  }

  .subHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 6px 4px 0;
    opacity: 1;
    transition: opacity 0.2s ease;
  }
  .collapsibleClosed .subHeader {
    opacity: 0;
  }
  .subMeta {
    display: flex;
    align-items: center;
    gap: 16px;
    color: #737373;
    font-size: var(--fs-13);
    font-weight: 500;
    min-width: 0;
  }
  .subMetaItem {
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  .subMetaItem svg {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
  }
  .avatarStack {
    display: flex;
    flex-shrink: 0;
  }
  .stackAvatar {
    width: 26px;
    height: 26px;
    border: 2px solid #e8e2d8;
    border-radius: 50%;
    object-fit: cover;
    background-color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  }
  .stackAvatar + .stackAvatar {
    margin-left: -8px;
  }

  .expandedContent {
    padding-top: 24px;
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 0.25s ease,
      transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .collapsibleClosed .expandedContent {
    opacity: 0;
    transform: translateY(-12px);
  }

  .progressPill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 28px;
    padding: 6px 10px;
    border: 1.5px solid #e8e2d8;
    border-radius: 999px;
    background-color: rgba(244, 239, 230, 0.5);
    box-sizing: border-box;
    max-width: 100%;
  }
  .progressCheck {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(138, 131, 118, 0.55);
    flex-shrink: 0;
  }
  .progressCheck svg {
    width: 20px;
    height: 20px;
  }
  .progressCount {
    color: #8a8376;
    font-size: var(--fs-13);
    font-weight: 600;
    white-space: nowrap;
  }
  .progressCount strong {
    font-weight: 600;
  }
  .expandedTrack {
    width: 112px;
    margin: 0 4px;
  }
  .expandedPercent {
    color: #171717;
    font-size: var(--fs-13);
    font-weight: 600;
    white-space: nowrap;
  }

  .subtasks {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 0 32px 24px;
  }
  .subtasks::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 16px;
    left: 0;
    width: 1.7px;
    background-color: #e8e2d8;
    transform-origin: top;
  }
  .taskRow {
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 32px;
    min-height: 24px;
  }
  .taskRow::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 0;
    width: 18px;
    height: 30px;
    border-bottom: 1.7px solid #e8e2d8;
    border-left: 1.7px solid #e8e2d8;
    border-bottom-left-radius: 12px;
    box-sizing: border-box;
  }
  .taskCheck {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1.7px solid #d8d1c4;
    border-radius: 50%;
    background-color: #ffffff;
    color: #ffffff;
    box-sizing: border-box;
  }
  .taskCheckDone {
    border-color: #013525;
    background-color: #013525;
  }
  .taskTitle {
    margin-left: 12px;
    color: #8a8376;
    font-size: var(--fs-13);
    line-height: 1.4;
    font-weight: 500;
  }
  .taskTitleDone {
    color: #ada698;
  }

  .metaList {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  .metaRow {
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 0 4px;
    font-weight: 500;
  }
  .metaLabel {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 84px;
    color: #3a3a3a;
    font-size: var(--fs-13);
    line-height: 1.4;
  }
  .metaLabel svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 10px;
    border-radius: 16px;
    font-size: var(--fs-12);
    font-weight: 600;
    line-height: 1.4;
    opacity: 0.85;
    white-space: nowrap;
  }
  .badgePriority {
    background-color: #fee2e2;
    color: #dc2626;
  }
  .badgeStatus {
    background-color: #fef3c7;
    color: #b45309;
  }
  .chevronWrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1px;
    border-radius: 6px;
  }
  .chevronWrap svg {
    width: 14px;
    height: 14px;
  }
  .chevronPriority {
    background-color: #fef2f2;
    color: #b91c1c;
  }
  .chevronStatus {
    background-color: #fffbeb;
    color: #b45309;
  }

  .assignees {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .assigneeChip {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 16px 4px 6px;
    border: 1.58px solid #e8e2d8;
    border-radius: 999px;
    background-color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  .assigneeAvatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
    background-color: #f4efe6;
  }
  .assigneeChip span {
    color: #5f5a52;
    font-size: var(--fs-12);
    font-weight: 600;
    white-space: nowrap;
  }

  @media screen and (max-width: 640px) {
    .cardOpen {
      padding: 20px;
      border-radius: 24px;
    }
    .headerTrack {
      width: 64px;
    }
    .headerPercent {
      font-size: var(--fs-12);
    }
    .stackAvatar {
      width: 28px;
      height: 28px;
    }
    .subMeta {
      gap: 12px;
      font-size: var(--fs-12);
    }
    .subMetaItem {
      gap: 4px;
    }
    .subMetaItem svg {
      width: 15px;
      height: 15px;
    }
    .progressPill {
      gap: 6px;
      padding: 5px 8px;
    }
    .progressCheck svg {
      width: 18px;
      height: 18px;
    }
    .expandedTrack {
      width: 80px;
    }
    .progressCount,
    .expandedPercent {
      font-size: var(--fs-12);
    }
    .taskTitle {
      font-size: var(--fs-13);
    }
    .metaRow {
      gap: 16px;
    }
    .metaLabel {
      min-width: 76px;
      gap: 8px;
      font-size: var(--fs-12);
    }
    .metaLabel svg {
      width: 16px;
      height: 16px;
    }
    .badge {
      padding: 3px 9px;
    }
    .assigneeChip {
      padding: 3px 12px 3px 5px;
    }
  }
</style>
