<template>
  <div :class="$style.wrapper">
    <div v-if="!isOpen" :class="$style.pulseBadge" aria-hidden="true">
      <span
        v-for="bar in 4"
        :key="bar"
        :class="$style.pulseBar"
        :style="{ animationDelay: `${(bar - 1) * 0.15}s` }"
      />
    </div>

    <div
      :class="[$style.shell, isOpen ? $style.shellOpen : '']"
      :role="isOpen ? undefined : 'button'"
      :tabindex="isOpen ? undefined : 0"
      :aria-expanded="isOpen"
      aria-label="Open voice chat"
      @click="open"
      @keydown.enter.prevent="open"
      @keydown.space.prevent="open"
    >
      <div v-if="!isOpen" :class="$style.collapsed">
        <div :class="$style.avatarStack">
          <div
            v-for="(user, index) in users.slice(0, 4)"
            :key="user.id"
            :class="$style.stackItem"
            :style="{ zIndex: 10 - index }"
          >
            <img
              :src="user.img"
              :alt="user.name"
              :class="$style.stackAvatar"
            />
          </div>
        </div>

        <div :class="$style.more">
          <span>+{{ Math.max(users.length - 4, 0) }}</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
            <path
              d="m6 9 6 6 6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <div v-else :class="$style.expanded">
        <div :class="$style.header">
          <span :class="$style.headerSpacer" />
          <h2 :class="$style.title">{{ title }}</h2>
          <button
            :class="$style.closeButton"
            type="button"
            aria-label="Close voice chat"
            @click.stop="askForMessage"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <div :class="$style.userGrid">
          <div
            v-for="user in users"
            :key="user.id"
            :class="$style.userCell"
          >
            <div :class="$style.avatarWrap">
              <img
                :src="user.img"
                :alt="user.name"
                :class="$style.userAvatar"
              />
              <div
                v-if="user.active"
                :class="$style.activeBadge"
                aria-label="Active"
              >
                <span
                  v-for="bar in 4"
                  :key="bar"
                  :class="$style.activeBar"
                  :style="{ animationDelay: `${(bar - 1) * 0.2}s` }"
                />
              </div>
            </div>
            <span :class="$style.userName">{{ user.name }}</span>
          </div>
        </div>

        <div :class="$style.footer">
          <button :class="$style.cta" type="button">{{ ctaText }}</button>
          <p :class="$style.helper">{{ helperText }}</p>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isPromptOpen"
        :class="$style.promptOverlay"
        @click.self="closePrompt"
      >
        <div :class="$style.promptCard" role="dialog" aria-modal="true" aria-labelledby="voice-prompt-title">
          <h3 id="voice-prompt-title" :class="$style.promptTitle">Leave a message for the team</h3>
          <p :class="$style.promptText">
            Share what you covered before you go, so the team stays in the loop.
          </p>
          <textarea
            v-model="message"
            :class="$style.promptInput"
            rows="4"
            placeholder="Write a note for the team…"
          />
          <div :class="$style.promptActions">
            <button :class="$style.promptPrimary" type="button" @click="sendMessage">
              Send message
            </button>
            <button :class="$style.promptSecondary" type="button" @click="dismissPrompt">
              No, thanks
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue"

  interface VoiceUser {
    id: number
    name: string
    img: string
    active?: boolean
  }

  withDefaults(
    defineProps<{
      users?: VoiceUser[]
      title?: string
      ctaText?: string
      helperText?: string
    }>(),
    {
      users: () => [
        { id: 1, name: "Oğuz", img: "/innovator-man.webp", active: true },
        { id: 2, name: "Ashish", img: "/hero-client.webp" },
        { id: 3, name: "Mariana", img: "/hero-woman.webp" },
        { id: 4, name: "MDS", img: "/innovator-man.webp" },
        { id: 5, name: "Ana", img: "/hero-client.webp", active: true },
        { id: 6, name: "Natko", img: "/hero-woman.webp" },
        { id: 7, name: "Afshin", img: "/innovator-man.webp" },
      ],
      title: "Voice Chat",
      ctaText: "Join Now",
      helperText: "Mic will be muted initially.",
    },
  )

  const isOpen = ref(false)
  const isPromptOpen = ref(false)
  const message = ref("")

  function open() {
    if (!isOpen.value) isOpen.value = true
  }

  /** The header close icon asks whether the member wants to leave a note first. */
  function askForMessage() {
    isPromptOpen.value = true
  }

  function closePrompt() {
    isPromptOpen.value = false
  }

  /** "No, thanks": drop the prompt and close the call panel. */
  function dismissPrompt() {
    isPromptOpen.value = false
    message.value = ""
    isOpen.value = false
  }

  /** Sending the note also ends the call panel. */
  function sendMessage() {
    isPromptOpen.value = false
    message.value = ""
    isOpen.value = false
  }
</script>

<style module>
  .wrapper {
    position: relative;
    width: fit-content;
    font-family: var(--font-inter, Inter, Arial, sans-serif);
  }

  .pulseBadge {
    position: absolute;
    top: -12px;
    left: -12px;
    z-index: 20;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background-color: #013525;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.18);
    animation: fadeIn 0.2s ease;
  }
  .pulseBar {
    width: 2.5px;
    height: 6px;
    border-radius: 999px;
    background-color: #ffffff;
    animation: pulseBar 1s ease-in-out infinite;
  }
  .pulseBar + .pulseBar {
    margin-left: 3px;
  }

  .shell {
    width: 224px;
    height: 60px;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #e8e2d8;
    border-radius: 30px;
    background-color: #ffffff;
    box-shadow:
      0 20px 25px -5px rgba(15, 46, 36, 0.16),
      0 8px 10px -6px rgba(15, 46, 36, 0.08);
    cursor: pointer;
    transition:
      width 0.32s cubic-bezier(0.25, 0.1, 0.25, 1),
      border-radius 0.32s cubic-bezier(0.25, 0.1, 0.25, 1),
      box-shadow 0.32s ease;
  }
  .shellOpen {
    width: min(320px, calc(100vw - 32px));
    height: auto;
    /* Host pages can budget the available height; the user grid then scrolls. */
    max-height: var(--voice-panel-max, calc(100dvh - 32px));
    display: flex;
    flex-direction: column;
    border-radius: 32px;
    cursor: default;
  }
  .shell:focus-visible {
    outline: 3px solid rgba(1, 53, 37, 0.22);
    outline-offset: 3px;
  }

  .collapsed {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    animation: fadeIn 0.18s ease;
  }
  .avatarStack {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .stackItem {
    display: flex;
    flex-shrink: 0;
  }
  .stackItem + .stackItem {
    margin-left: -10px;
  }
  .stackAvatar {
    width: 44px;
    height: 44px;
    box-sizing: border-box;
    border: 3px solid #ffffff;
    border-radius: 50%;
    object-fit: cover;
    object-position: 50% 12%;
    box-shadow: 0 8px 14px rgba(15, 46, 36, 0.18);
    background-color: #f4efe6;
  }
  .more {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: 10px;
    color: #737373;
    font-size: 15px;
    font-weight: 500;
    line-height: 1;
  }
  .more svg {
    flex-shrink: 0;
  }

  .expanded {
    display: flex;
    flex-direction: column;
    min-height: 0;
    animation: panelIn 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 12px 16px;
    border-bottom: 1px solid #e8e2d8;
    background-color: #f4efe6;
  }
  .headerSpacer {
    width: 32px;
    flex-shrink: 0;
  }
  .title {
    margin: 0;
    min-width: 0;
    overflow: hidden;
    color: #171717;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .closeButton {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    border-radius: 999px;
    background-color: #ffffff;
    color: #737373;
    font-family: inherit;
    cursor: pointer;
    flex-shrink: 0;
    transition: color 0.2s ease, background-color 0.2s ease;
  }
  .closeButton:hover {
    color: #171717;
    background-color: #faf7f2;
  }
  .closeButton svg {
    width: 16px;
    height: 16px;
  }

  .userGrid {
    display: grid;
    flex: 0 1 auto;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    row-gap: 24px;
    padding: 24px 16px;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  .userCell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  .avatarWrap {
    position: relative;
    display: flex;
  }
  .userAvatar {
    width: 44px;
    height: 44px;
    box-sizing: border-box;
    border: 1px solid #e8e2d8;
    border-radius: 50%;
    object-fit: cover;
    object-position: 50% 12%;
    box-shadow: 0 4px 8px rgba(15, 46, 36, 0.14);
    background-color: #f4efe6;
  }
  .activeBadge {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background-color: #ffffff;
    box-shadow: 0 8px 14px rgba(15, 46, 36, 0.18);
  }
  .activeBar {
    width: 1.5px;
    height: 6px;
    border-radius: 999px;
    background-color: #737373;
    animation: activeBar 1s ease-in-out infinite;
  }
  .activeBar + .activeBar {
    margin-left: 2px;
  }
  .userName {
    width: 100%;
    padding: 0 4px;
    overflow: hidden;
    color: #4a4a4a;
    font-size: 11px;
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .footer {
    flex-shrink: 0;
    padding: 0 16px 24px;
  }
  .cta {
    width: 100%;
    padding: 10px 0;
    border: none;
    border-radius: 32px;
    background-color: #013525;
    color: #ffffff;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.3;
    cursor: pointer;
    transition: transform 0.15s ease, background-color 0.15s ease;
  }
  .cta:hover {
    background-color: #0b4433;
  }
  .cta:active {
    transform: scale(0.98);
  }
  .helper {
    margin: 12px 0 0;
    color: #737373;
    font-size: 12px;
    line-height: 1.4;
    text-align: center;
  }

  /* "Leave a message" prompt shown by the header close icon */
  .promptOverlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background-color: rgba(13, 35, 28, 0.45);
    font-family: var(--font-inter, Inter, Arial, sans-serif);
    box-sizing: border-box;
  }
  .promptCard {
    width: min(400px, 100%);
    padding: 22px;
    border: 1px solid #e8e2d8;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 0 24px 48px rgba(15, 46, 36, 0.22);
    box-sizing: border-box;
    animation: panelIn 0.24s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .promptTitle {
    margin: 0;
    color: #171717;
    font-size: 17px;
    font-weight: 700;
    line-height: 1.3;
  }
  .promptText {
    margin: 8px 0 16px;
    color: #737373;
    font-size: 13px;
    line-height: 1.5;
  }
  .promptInput {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid #c9d2cd;
    border-radius: 12px;
    background-color: #fdfbf7;
    color: #171717;
    font-family: inherit;
    font-size: 13px;
    line-height: 1.5;
    resize: vertical;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .promptInput:focus {
    border-color: #24443a;
    box-shadow: 0 0 0 3px rgba(1, 53, 37, 0.1);
  }
  .promptInput::placeholder {
    color: #9a9488;
  }
  .promptActions {
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }
  .promptPrimary {
    flex: 1;
    height: 44px;
    border: none;
    border-radius: 12px;
    background-color: #013525;
    color: #ffffff;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.18s;
  }
  .promptPrimary:hover {
    background-color: #0b4433;
  }
  .promptSecondary {
    flex: 0 0 auto;
    height: 44px;
    padding: 0 18px;
    border: 1px solid #d9d2c0;
    border-radius: 12px;
    background-color: #ffffff;
    color: #24443a;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.18s;
  }
  .promptSecondary:hover {
    background-color: #f4efe6;
  }

  @keyframes pulseBar {
    0%,
    100% {
      height: 2px;
    }
    50% {
      height: 16px;
    }
  }
  @keyframes activeBar {
    0%,
    100% {
      height: 2px;
    }
    50% {
      height: 10px;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes panelIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 639px) {
    .header {
      padding: 10px 16px;
    }
    .userGrid {
      row-gap: 20px;
      padding: 20px 16px;
    }
    .footer {
      padding: 0 16px 20px;
    }
    .helper {
      margin-top: 10px;
    }
  }

  @media screen and (min-width: 640px) {
    .header {
      padding: 12px 32px;
    }
    .title {
      font-size: 18px;
    }
    .closeButton svg {
      width: 20px;
      height: 20px;
    }
    .userGrid {
      row-gap: 32px;
      padding: 24px;
    }
    .userAvatar {
      width: 56px;
      height: 56px;
    }
    .activeBadge {
      top: -12px;
      right: -12px;
      width: 32px;
      height: 32px;
    }
    .activeBar {
      width: 2px;
    }
    .userName {
      font-size: 14px;
    }
    .footer {
      padding: 0 24px 24px;
    }
    .cta {
      padding: 12px 0;
      font-size: 18px;
    }
    .helper {
      margin-top: 16px;
      font-size: 14px;
    }
  }
</style>
