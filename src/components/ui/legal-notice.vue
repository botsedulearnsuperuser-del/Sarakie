<template>
  <div v-if="visible" :class="$style.overlay">
    <div
      ref="cardRef"
      :class="$style.card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-notice-title"
      aria-describedby="legal-notice-desc"
      tabindex="-1"
    >
      <div :class="$style.head">
        <div :class="$style.headText">
          <h2 id="legal-notice-title" :class="$style.title">Before you continue</h2>
          <p :class="$style.subtitle">
            Please read and understand these terms — they explain how your data is handled.
          </p>
        </div>
        <span :class="$style.icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11.5 21.25H7.25a2.5 2.5 0 0 1-2.5-2.5V5.25a2.5 2.5 0 0 1 2.5-2.5h6.5l5.5 5.5v2" />
            <path d="M13.75 2.75v3.5a2 2 0 0 0 2 2h3.5m-11 3.5h3.5M8.25 15h2" />
            <circle cx="16.5" cy="15.25" r="3.25" />
            <path d="M14.75 18v3.25L16.5 20l1.75 1.25V18" />
          </svg>
        </span>
      </div>

      <p id="legal-notice-desc" :class="$style.text">
        CEDA processes your personal information in line with Botswana's Data
        Protection Act, 2024. Your idea, identity documents and contact details
        are used only to review and manage your submission — never sold or used
        for advertising.
      </p>

      <ul :class="$style.linkList">
        <li :class="$style.linkItem">
          <span :class="$style.linkIcon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3l7 3v5.5c0 4.2-2.9 7.9-7 9.5-4.1-1.6-7-5.3-7-9.5V6l7-3Z" />
              <path d="m9 12 2.2 2.2L15.5 10" />
            </svg>
          </span>
          <router-link to="/privacy" :class="$style.link">
            Data protection and privacy policy
          </router-link>
        </li>
        <li :class="$style.linkItem">
          <span :class="$style.linkIcon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5L14 3Z" />
              <path d="M14 3v4.5h4.5M9 13h6M9 16.5h4" />
            </svg>
          </span>
          <router-link to="/terms" :class="$style.link">
            Terms &amp; Conditions
          </router-link>
        </li>
        <li :class="$style.linkItem">
          <span :class="$style.linkIcon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
              <path d="M4.5 20.5a7.5 7.5 0 0 1 9.4-7.2M15.5 20.5h5" />
            </svg>
          </span>
          <router-link to="/privacy#your-rights" :class="$style.link">
            Your data rights and account deletion
          </router-link>
        </li>
      </ul>

      <label :class="$style.checkRow">
        <input v-model="agreed" :class="$style.checkbox" type="checkbox" />
        <span :class="$style.checkLabel">
          I have read and agree to the Terms &amp; Conditions and the Privacy
          Policy.
        </span>
      </label>

      <div :class="$style.actions">
        <button
          :class="$style.accept"
          type="button"
          :disabled="!agreed"
          @click="accept"
        >
          Agree and continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
  import { authReady, session } from "../../lib/auth";
  import {
    LEGAL_VERSION,
    fetchLegalAcceptance,
    readLegalAck,
    recordLegalAcceptance,
    writeLegalAck,
  } from "../../lib/legal-ack";

  const visible = ref(false);
  const agreed = ref(false);
  const cardRef = ref<HTMLElement | null>(null);

  /* Block scrolling and pointer input on the page until this is accepted.
     Both html and body are locked: browsers may scroll either element. */
  let previousOverflow: { html: string; body: string } | null = null;

  function lockScroll() {
    if (previousOverflow !== null) return;
    const html = document.documentElement;
    previousOverflow = { html: html.style.overflow, body: document.body.style.overflow };
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    if (previousOverflow === null) return;
    document.documentElement.style.overflow = previousOverflow.html;
    document.body.style.overflow = previousOverflow.body;
    previousOverflow = null;
  }

  watch(visible, async (shown) => {
    if (shown) {
      lockScroll();
      await nextTick();
      cardRef.value?.focus();
    } else {
      unlockScroll();
    }
  });

  onMounted(() => {
    visible.value = !readLegalAck();
    if (visible.value) lockScroll();
  });

  onBeforeUnmount(unlockScroll);

  /**
   * Signed-in users carry their acceptance with them: an acceptance recorded on
   * another device closes the notice here, and an acceptance made while signed
   * out is written to their profile as soon as the session is available.
   */
  watch(
    [authReady, session],
    async () => {
      const userId = session.value?.user.id;
      if (!authReady.value || !userId) return;

      const local = readLegalAck();
      if (local) {
        await recordLegalAcceptance(userId, local);
        return;
      }

      const stored = await fetchLegalAcceptance(userId);
      if (stored) {
        writeLegalAck(stored);
        visible.value = false;
      }
    },
    { immediate: true },
  );

  function accept() {
    if (!agreed.value) return;
    const ack = { version: LEGAL_VERSION, acceptedAt: new Date().toISOString() };
    writeLegalAck(ack);
    agreed.value = false;
    visible.value = false;
    void recordLegalAcceptance(session.value?.user.id, ack);
  }
</script>

<style module>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 100000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba(11, 26, 20, 0.55);
    backdrop-filter: blur(3px);
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  .card {
    width: 100%;
    max-width: 620px;
    max-height: 100%;
    overflow-y: auto;
    padding: 18px 20px;
    box-sizing: border-box;
    border-radius: 14px;
    border: 1px solid var(--color-antiquewhite-200);
    background-color: #ffffff;
    box-shadow: 0 24px 60px -16px rgba(1, 53, 37, 0.45);
    animation: noticeIn 220ms ease-out both;
    font-family: var(--font-inter);
    outline: none;
  }
  @keyframes noticeIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .headText {
    min-width: 0;
  }
  .icon {
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    flex-shrink: 0;
    border-radius: 999px;
    background: rgba(1, 53, 37, 0.08);
    color: var(--color-darkslategray-600);
  }
  .icon svg {
    width: 26px;
    height: 26px;
  }
  .title {
    margin: 0;
    font-size: 16px;
    font-weight: 800;
    color: #1f2933;
  }
  .subtitle {
    margin: 2px 0 0;
    font-size: 12.5px;
    line-height: 1.45;
    color: #616161;
  }
  .text {
    margin: 10px 0 0;
    color: #525252;
    font-size: 13px;
    line-height: 1.45;
    letter-spacing: 0.01em;
  }
  .linkList {
    margin: 10px 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .linkItem {
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .linkIcon {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    border-radius: 999px;
    background: rgba(1, 53, 37, 0.07);
    color: var(--color-darkslategray-600);
  }
  .linkIcon svg {
    width: 15px;
    height: 15px;
  }
  .link {
    color: var(--color-darkslategray-600);
    font-size: 13px;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .link:hover {
    color: #0b4433;
  }
  .checkRow {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    margin-top: 12px;
    padding: 10px 12px;
    border: 1px solid #eceae4;
    border-radius: 10px;
    background-color: #faf9f5;
    cursor: pointer;
  }
  .checkbox {
    width: 18px;
    height: 18px;
    margin: 1px 0 0;
    flex-shrink: 0;
    accent-color: var(--color-darkslategray-500);
    cursor: pointer;
  }
  .checkLabel {
    font-size: 12.5px;
    line-height: 1.4;
    color: #3d3d3d;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .accept {
    height: 36px;
    padding: 0 18px;
    border: none;
    border-radius: 8px;
    background-color: var(--color-darkslategray-500);
    color: #ffffff;
    font-family: var(--font-inter);
    font-size: var(--fs-13);
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.18s ease, opacity 0.18s ease;
  }
  .accept:hover:not(:disabled) {
    background-color: var(--color-darkslategray-600);
  }
  .accept:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media screen and (max-width: 640px) {
    .overlay {
      padding: 12px;
      align-items: flex-end;
    }
    .card {
      padding: 16px;
      max-height: calc(100vh - 24px);
    }
    .icon {
      width: 42px;
      height: 42px;
    }
    .icon svg {
      width: 24px;
      height: 24px;
    }
    .text,
    .link {
      font-size: 13px;
    }
    .accept {
      width: 100%;
    }
  }
</style>
