<template>
  <div v-if="visible" :class="$style.overlay">
    <div
      :class="$style.card"
      role="region"
      aria-label="Cookie notice"
    >
      <div :class="$style.body">
        <svg
          :class="$style.cookieIcon"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M21 12a9 9 0 1 1-9-9c0 2.5 2 4.5 4.5 4.5 0 2.5 2 4.5 4.5 4.5Z"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="8" cy="15" r="1" fill="currentColor" />
          <circle cx="14" cy="14" r="1" fill="currentColor" />
        </svg>

        <p :class="$style.text">
          We use cookies to improve your browsing experience, personalize
          content, and understand how our platform is used. You can choose to
          accept or decline, but enabling them helps us serve you better. Read
          more in our
          <router-link to="/privacy">privacy policy</router-link>.
        </p>
      </div>

      <div :class="$style.actions">
        <button
          :class="$style.accept"
          type="button"
          @click="choose('accepted')"
        >
          Accept all
        </button>
        <button
          :class="$style.reject"
          type="button"
          @click="choose('rejected')"
        >
          Reject all
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue"

  const CONSENT_KEY = "ceda-cookie-consent"
  const visible = ref(false)

  onMounted(() => {
    try {
      visible.value = !localStorage.getItem(CONSENT_KEY)
    } catch {
      visible.value = true
    }
  })

  function choose(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(CONSENT_KEY, value)
    } catch {
      // Storage can be unavailable; still dismiss for this visit.
    }
    visible.value = false
  }
</script>

<style module>
  .overlay {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 24px;
    z-index: 300;
    display: flex;
    justify-content: center;
    padding: 0 16px;
    box-sizing: border-box;
    pointer-events: none;
  }
  .card {
    width: 100%;
    max-width: 768px;
    padding: 20px 24px;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid var(--color-antiquewhite-200);
    background-color: #ffffff;
    box-shadow: 0 20px 40px -12px rgba(1, 53, 37, 0.25);
    pointer-events: auto;
    animation: cookieIn 240ms ease-out both;
    font-family: var(--font-inter);
  }
  @keyframes cookieIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .body {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .cookieIcon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--color-darkslategray-600);
  }
  .text {
    margin: 0;
    color: #525252;
    font-size: 15px;
    line-height: 1.65;
    letter-spacing: 0.01em;
  }
  .text a {
    color: var(--color-darkslategray-600);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .text a:hover {
    color: #0b4433;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 16px;
  }
  .accept,
  .reject {
    height: 38px;
    padding: 0 18px;
    border-radius: 6px;
    font-family: var(--font-inter);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition:
      background-color 0.18s ease,
      border-color 0.18s ease,
      transform 0.15s ease;
  }
  .accept {
    border: none;
    background-color: var(--color-darkslategray-500);
    color: #ffffff;
    border-radius: 8px;
    height: 34px;
    padding: 0 14px;
    font-size: var(--fs-13);
    box-shadow: none;
  }
  .accept:hover {
    background-color: var(--color-darkslategray-600);
  }
  .reject {
    border: 1px solid var(--color-lightgray-100);
    background-color: #ffffff;
    color: #525252;
    box-shadow:
      inset 0 4px 2px rgba(255, 255, 255, 1),
      inset 0 -2px 5px rgba(0, 0, 0, 0.05),
      0 2px 20px rgba(0, 0, 0, 0.1);
  }
  .reject:hover {
    background-color: var(--color-seashell);
    border-color: var(--color-antiquewhite-200);
  }
  .accept:active,
  .reject:active {
    transform: translateY(1px);
  }

  @media screen and (max-width: 640px) {
    .overlay {
      bottom: 12px;
      padding: 0 12px;
    }
    .card {
      padding: 16px;
    }
    .text {
      font-size: 14px;
    }
    .actions {
      gap: 8px;
    }
    .accept,
    .reject {
      flex: 1;
      padding: 0 12px;
    }
  }
</style>
