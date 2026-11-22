<template>
  <div v-if="visible" :class="$style.overlay">
    <div
      :class="$style.card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-notice-title"
      aria-describedby="legal-notice-desc"
    >
      <div :class="$style.head">
        <span :class="$style.icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3l7 3v5.5c0 4.2-2.9 7.9-7 9.5-4.1-1.6-7-5.3-7-9.5V6l7-3Z" />
            <path d="m9 12 2.2 2.2L15.5 10" />
          </svg>
        </span>
        <div>
          <h2 id="legal-notice-title" :class="$style.title">Before you continue</h2>
          <p :class="$style.subtitle">
            Please read and understand these terms — they explain how your data is handled.
          </p>
        </div>
      </div>

      <p id="legal-notice-desc" :class="$style.text">
        CEDA processes your personal information in line with Botswana's
        Data Protection Act, 2024. Your idea, identity documents and contact
        details are used only to review and manage your submission.
      </p>

      <ul :class="$style.linkList">
        <li>
          <router-link to="/privacy" :class="$style.link">
            Data protection and privacy policy
          </router-link>
        </li>
        <li>
          <router-link to="/terms" :class="$style.link">
            Terms &amp; Conditions
          </router-link>
        </li>
        <li>
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
  import { onMounted, ref } from "vue";

  /* Bump the version when the terms change so everyone is asked again. */
  const ACK_KEY = "ceda-legal-ack-v1";
  const visible = ref(false);
  const agreed = ref(false);

  onMounted(() => {
    try {
      visible.value = !localStorage.getItem(ACK_KEY);
    } catch {
      visible.value = true;
    }
  });

  function accept() {
    if (!agreed.value) return;
    try {
      localStorage.setItem(
        ACK_KEY,
        JSON.stringify({ version: 1, acceptedAt: new Date().toISOString() }),
      );
    } catch {
      // Storage can be blocked; the notice still closes for this visit.
    }
    visible.value = false;
  }
</script>

<style module>
  .overlay {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 24px;
    z-index: 400;
    display: flex;
    justify-content: center;
    padding: 0 16px;
    box-sizing: border-box;
    pointer-events: none;
  }
  .card {
    width: 100%;
    max-width: 620px;
    padding: 16px 18px;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid var(--color-antiquewhite-200);
    background-color: #ffffff;
    box-shadow: 0 20px 40px -12px rgba(1, 53, 37, 0.25);
    pointer-events: auto;
    animation: noticeIn 240ms ease-out both;
    font-family: var(--font-inter);
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
    gap: 12px;
  }
  .icon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    border-radius: 999px;
    background: rgba(1, 53, 37, 0.08);
    color: var(--color-darkslategray-600);
  }
  .icon svg {
    width: 19px;
    height: 19px;
  }
  .title {
    margin: 0;
    font-size: 15px;
    font-weight: 800;
    color: #1f2933;
  }
  .subtitle {
    margin: 2px 0 0;
    font-size: 12.5px;
    line-height: 1.4;
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
    margin: 7px 0 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 3px;
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
    border-radius: 9px;
    background-color: #faf9f5;
    cursor: pointer;
  }
  .checkbox {
    width: 17px;
    height: 17px;
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
    height: 34px;
    padding: 0 16px;
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
      bottom: 12px;
      padding: 0 12px;
    }
    .card {
      padding: 14px;
    }
    .text,
    .link {
      font-size: 12.5px;
    }
    .accept {
      width: 100%;
    }
  }
</style>
