<template>
  <main :class="$style.notFound">
    <router-link to="/" :class="$style.brand">
      <img :class="$style.brandMark" src="/ceda-sun.png" alt="" aria-hidden="true" />
      <span :class="$style.brandText">CEDA Innovation Portal</span>
    </router-link>

    <div :class="$style.backdrop" aria-hidden="true">
      <svg :class="$style.ghost" viewBox="0 0 800 400">
        <text
          x="50%"
          y="50%"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="transparent"
          stroke="currentColor"
          stroke-width="2"
          stroke-dasharray="12 8"
        >
          404
        </text>
      </svg>
    </div>

    <div :class="$style.content">
      <span :class="$style.eyebrow">Error 404</span>

      <h1 :class="$style.heading">This page isn’t in the portal</h1>

      <p :class="$style.description">
        The destination you’re looking for has been moved, renamed, or no
        longer exists. It may have been relocated during a recent CEDA
        Innovation Portal update.
      </p>

      <div :class="$style.actions">
        <router-link :class="$style.primary" to="/innovator-dashboard">
          Return to dashboard
        </router-link>
        <a :class="$style.secondary" :href="reportHref">Report this issue</a>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  const reportHref =
    "mailto:Kmatakata@ceda.co.bw?subject=CEDA%20Innovation%20Portal%20-%20Page%20not%20found"
</script>

<style module>
  .notFound {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 96px 24px 64px;
    box-sizing: border-box;
    background-color: var(--color-seashell);
    font-family: var(--font-inter);
  }
  .brand {
    position: absolute;
    top: 32px;
    left: 32px;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--color-darkslategray-600);
  }
  .brandMark {
    height: 32px;
    width: auto;
    display: block;
  }
  .brandText {
    font-family: Poppins, var(--font-inter);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.01em;
  }
  .backdrop {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
  }
  .ghost {
    width: 100%;
    max-width: 672px;
    color: var(--color-darkslategray-600);
    opacity: 0.14;
    transform: translateY(-24px);
  }
  .ghost text {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 24rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }
  .content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 448px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
  }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 5px 12px;
    border-radius: 999px;
    border: 1px solid var(--color-goldenrod-200);
    background-color: var(--color-blanchedalmond);
    color: var(--color-saddlebrown);
    font-family: var(--font-inter);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .heading {
    margin: 0;
    color: var(--color-darkslategray-600);
    font-family: Poppins, var(--font-inter);
    font-size: 34px;
    line-height: 1.15;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .description {
    margin: 0;
    max-width: 340px;
    color: #525252;
    font-family: var(--font-inter);
    font-size: 15px;
    line-height: 1.6;
  }
  .actions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 16px;
  }
  .primary,
  .secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    padding: 0 24px;
    border-radius: 8px;
    font-family: var(--font-inter);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    box-sizing: border-box;
    transition:
      background-color 0.18s ease,
      border-color 0.18s ease,
      transform 0.15s ease;
  }
  .primary {
    background-color: var(--color-darkslategray-600);
    color: #ffffff;
    box-shadow:
      inset 0 2px 4px rgba(255, 255, 255, 0.18),
      inset 0 -2px 4px rgba(0, 0, 0, 0.2);
  }
  .primary:hover {
    background-color: #0b4433;
  }
  .primary:active {
    transform: translateY(1px);
  }
  .secondary {
    background-color: #ffffff;
    border: 1px solid var(--color-lightgray-100);
    color: var(--color-darkslategray-600);
    box-shadow:
      inset 0 2px 4px rgba(255, 255, 255, 0.7),
      inset 0 -2px 4px rgba(0, 0, 0, 0.08);
  }
  .secondary:hover {
    background-color: #f2ede3;
    border-color: var(--color-antiquewhite-200);
  }
  .secondary:active {
    transform: translateY(1px);
  }

  @media screen and (max-width: 640px) {
    .notFound {
      padding: 88px 20px 48px;
    }
    .brand {
      top: 20px;
      left: 20px;
    }
    .brandMark {
      height: 26px;
    }
    .brandText {
      font-size: 13px;
    }
    .ghost {
      max-width: 120%;
      transform: translateY(-40px);
    }
    .heading {
      font-size: 28px;
    }
    .description {
      font-size: 14px;
    }
    .actions {
      flex-direction: column;
      gap: 10px;
    }
    .primary,
    .secondary {
      width: 100%;
    }
  }
</style>
