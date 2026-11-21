<template>
  <div v-if="visible" :class="$style.wrap">
    <div :class="$style.banner">
      <div :class="[$style.blob, $style.blobLeft]" aria-hidden="true" />
      <div :class="[$style.blob, $style.blobRight]" aria-hidden="true" />

      <div :class="$style.content">
        <div :class="$style.message">
          A better version is here — faster, cleaner, and built to scale with
          you.
        </div>

        <div :class="$style.ctaGroup">
          <span :class="$style.dot" aria-hidden="true" />
          <button
            :class="$style.cta"
            type="button"
            @click="handleSeeWhatsNew"
          >
            See what’s new
            <svg
              :class="$style.ctaIcon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 12h15M13 5.5 19.5 12 13 18.5"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <button
        :class="$style.close"
        type="button"
        aria-label="Dismiss announcement"
        @click="dismiss"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="m6 6 12 12M18 6 6 18"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import { useRouter } from "vue-router"

  const router = useRouter()
  const visible = ref(true)

  function dismiss() {
    visible.value = false
  }

  function handleSeeWhatsNew() {
    router.push("/faq")
  }
</script>

<style module>
  .wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-sizing: border-box;
  }
  .banner {
    position: relative;
    isolation: isolate;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid rgba(1, 53, 37, 0.18);
    background-color: rgba(255, 255, 255, 0.72);
    padding: 7px 44px 7px 16px;
    box-sizing: border-box;
    animation: announcementIn 220ms ease-out both;
  }
  @keyframes announcementIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .blob {
    position: absolute;
    top: 50%;
    z-index: -1;
    width: 36rem;
    aspect-ratio: 577 / 310;
    transform: translateY(-50%);
    filter: blur(40px);
    opacity: 0.3;
    background-image: linear-gradient(
      to right,
      var(--color-darkslategray-600),
      rgba(1, 53, 37, 0.6)
    );
    clip-path: polygon(
      74.8% 41.9%,
      97.2% 73.2%,
      100% 34.9%,
      92.5% 0.4%,
      87.5% 0%,
      75% 28.6%,
      58.5% 54.6%,
      50.1% 56.8%,
      46.9% 44%,
      48.3% 17.4%,
      24.7% 53.9%,
      0% 27.9%,
      11.9% 74.2%,
      24.9% 54.1%,
      68.6% 100%,
      74.8% 41.9%
    );
    pointer-events: none;
  }
  .blobLeft {
    left: max(-7rem, calc(50% - 52rem));
  }
  .blobRight {
    left: max(45rem, calc(50% + 8rem));
  }
  .content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12px;
    text-align: center;
    font-family: var(--font-inter);
  }
  .message {
    color: #171717;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: -0.01em;
  }
  .ctaGroup {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }
  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--color-darkslategray-600);
    flex-shrink: 0;
  }
  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 32px;
    padding: 0 12px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.3);
    color: #013525;
    font-family: var(--font-inter);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    box-shadow:
      inset 0 2px 4px rgba(255, 255, 255, 0.5),
      inset 0 -2px 5px rgba(0, 0, 0, 0.1),
      0 8px 20px rgba(0, 0, 0, 0.1);
    transition: background-color 0.18s ease;
  }
  .cta:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
  .ctaIcon {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }
  .cta:hover .ctaIcon {
    transform: translateX(2px);
  }
  .close {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    width: 28px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #171717;
    cursor: pointer;
    transition: color 0.18s ease;
  }
  .close:hover {
    color: rgba(23, 23, 23, 0.7);
  }
  .close svg {
    width: 16px;
    height: 16px;
  }

  @media screen and (max-width: 640px) {
    .banner {
      padding: 10px 36px 10px 14px;
    }
    .content {
      flex-direction: column;
      gap: 8px;
    }
    .message {
      font-size: 13px;
    }
    .dot {
      display: none;
    }
    .cta {
      height: 30px;
    }
    .close {
      right: 4px;
    }
  }
</style>
