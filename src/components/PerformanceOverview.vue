<template>
  <section :class="$style.section">
    <div :class="$style.panel">
      <span :class="[$style.blob, $style.blobLeft]" aria-hidden="true" />
      <span :class="[$style.blob, $style.blobRight]" aria-hidden="true" />

      <img :class="$style.panelPattern" src="/pattern-2.webp" alt="" aria-hidden="true" />

      <div :class="$style.grid">
        <div :class="$style.copy">
          <h2 :class="$style.title">
            Elevate Your <span :class="$style.accent">Business Intelligence</span>
          </h2>
          <p :class="$style.subtitle">
            Unlock real-time insights and make data-driven decisions with our unified analytics
            platform. Start optimizing your operations today.
          </p>
          <router-link :class="$style.cta" to="/signin">
            Start Free Trial
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </router-link>

        </div>

        <JobListingComponent :class="$style.jobListing" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import JobListingComponent from "./ui/JobListingComponent.vue";
</script>

<style module>
  .section {
    width: 100%;
    background-color: #ffffff;
    padding: 24px 40px 72px;
    box-sizing: border-box;
    font-family: var(--font-inter);
  }

  .panel {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    width: 100%;
    max-width: 1080px;
    min-height: 440px;
    margin: 0 auto;
    padding: 48px 40px 0;
    border: 1px solid #e2e9e4;
    border-radius: 32px;
    background-color: #f4f8f5;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blob {
    position: absolute;
    z-index: -1;
    top: 50%;
    width: 36rem;
    height: 19.5rem;
    transform: translateY(-50%);
    background: linear-gradient(90deg, #0b5641, rgba(11, 86, 65, 0.55));
    opacity: 0.16;
    filter: blur(48px);
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
  }

  .blobLeft {
    left: max(-7rem, calc(50% - 52rem));
  }

  .blobRight {
    left: max(45rem, calc(50% + 8rem));
  }

  .panelPattern {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 110px;
    object-fit: cover;
    object-position: center bottom;
    opacity: 0.16;
    pointer-events: none;
    z-index: 0;
  }

  .grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: center;
    gap: 56px;
    width: 100%;
  }

  .copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }

  .title {
    margin: 0;
    color: var(--color-darkslategray-600);
    font-size: 38px;
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: -1px;
  }

  .accent {
    color: #0b5641;
  }

  .subtitle {
    margin: 0;
    max-width: 420px;
    color: #6b7f77;
    font-size: 15px;
    line-height: 1.65;
  }

  .cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
    padding: 12px 24px;
    border-radius: 999px;
    background-color: var(--color-darkslategray-600);
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.2s ease;
  }

  .cta:hover {
    background-color: #0b5641;
  }

  .cta svg {
    width: 15px;
    height: 15px;
  }

  .jobListing {
    width: 100%;
    min-width: 0;
  }

  .phoneWrap {
    display: flex;
    justify-content: flex-end;
    transform: translateY(22%);
    transition: transform 0.5s ease-out;
  }

  .panel:hover .phoneWrap {
    transform: translateY(10%);
  }

  .phone {
    position: relative;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    padding: 8px;
    border: 8px solid #27272a;
    border-radius: 42px;
    background-color: #ffffff;
    box-shadow: 0 26px 60px rgba(1, 53, 37, 0.22);
    box-sizing: content-box;
    overflow: hidden;
  }

  .notch {
    position: absolute;
    top: 8px;
    left: 50%;
    z-index: 2;
    width: 96px;
    height: 22px;
    transform: translateX(-50%);
    border-radius: 999px;
    background-color: #27272a;
  }

  .screen {
    height: 480px;
    overflow-y: auto;
    padding: 44px 16px 28px;
    box-sizing: border-box;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .screen::-webkit-scrollbar {
    display: none;
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .metric {
    padding: 12px;
    border: 1px solid #eef2ef;
    border-radius: 16px;
    background-color: #f6f8f6;
    transition: background-color 0.2s ease;
  }

  .metric:hover {
    background-color: #eef2ef;
  }

  .metricHead {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .metricIcon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 999px;
    background-color: rgba(1, 53, 37, 0.08);
    color: #0b5641;
  }

  .metricIcon svg {
    width: 14px;
    height: 14px;
  }

  .metricLabel {
    color: #6b7f77;
    font-size: 11px;
    font-weight: 500;
  }

  .metricValue {
    color: #1b2420;
    font-size: 19px;
    font-weight: 700;
    letter-spacing: -0.3px;
  }

  .metricChange {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 2px;
    font-size: 11px;
    font-weight: 600;
  }

  .metricChange svg {
    width: 10px;
    height: 10px;
  }

  .up {
    color: #0f9d6e;
  }

  .down {
    color: #e05a63;
  }

  .activity {
    margin-top: 22px;
  }

  .activityHead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .activityTitle {
    margin: 0;
    color: #1b2420;
    font-size: 13px;
    font-weight: 600;
  }

  .viewAll {
    padding: 0;
    border: 0;
    background: none;
    color: #8a9993;
    font-family: inherit;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
  }

  .viewAll:hover {
    color: #1b2420;
  }

  .activityList {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .activityItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid #eef2ef;
    border-radius: 14px;
    background-color: #ffffff;
    box-shadow: 0 1px 2px rgba(1, 53, 37, 0.05);
  }

  .activityMain {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .clock {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 999px;
    background-color: #f3efe6;
    color: #4a5b54;
  }

  .clock svg {
    width: 15px;
    height: 15px;
  }

  .activityText {
    min-width: 0;
  }

  .activityName {
    margin: 0;
    color: #1b2420;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .activityTime {
    margin: 2px 0 0;
    color: #8a9993;
    font-size: 10.5px;
  }

  .activityValue {
    flex-shrink: 0;
    font-size: 11.5px;
    font-weight: 600;
  }

  .homeBar {
    position: absolute;
    bottom: 10px;
    left: 50%;
    z-index: 2;
    width: 96px;
    height: 4px;
    transform: translateX(-50%);
    border-radius: 999px;
    background-color: rgba(39, 39, 42, 0.25);
  }

  @media screen and (max-width: 960px) {
    .section {
      padding: 16px 20px 56px;
    }
    .panel {
      min-height: 0;
      padding: 36px 24px 28px;
      border-radius: 26px;
    }
    .grid {
      grid-template-columns: minmax(0, 1fr);
      gap: 28px;
    }
    .copy {
      align-items: center;
      text-align: center;
    }
    .title {
      font-size: 28px;
      letter-spacing: -0.6px;
    }
    .subtitle {
      font-size: 14px;
    }
    .phoneWrap {
      justify-content: center;
      transform: none;
    }
    .panel:hover .phoneWrap {
      transform: none;
    }
  }
</style>
