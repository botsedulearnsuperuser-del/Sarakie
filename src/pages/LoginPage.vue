<template>
  <div :class="$style.screen">
    <!-- Desktop only: the sign-in page artwork beside the words -->
    <img :class="[$style.sidePhoto, $style.leftPhoto]" src="/innovator-man.webp" alt="" />

    <div :class="$style.stack">
      <img :class="$style.logo" src="/ceda-logo.webp" alt="CEDA" />

      <div :class="$style.headingBlock">
        <h1 :class="$style.heading">Get started with CEDA Innovation</h1>
        <p :class="$style.description">
          Submit your idea, follow every review stage and keep your team in the loop.
        </p>
      </div>

      <div :class="$style.socialRow">
        <button
          v-for="provider in socialProviders"
          :key="provider.label"
          :class="$style.socialButton"
          type="button"
          @click="continueToPortal"
        >
          <span :class="$style.socialIcon" v-html="provider.icon" />
          {{ provider.label }}
        </button>
      </div>

      <div :class="$style.divider">
        <span :class="$style.dividerLine" />
        <span :class="$style.dividerText">or</span>
        <span :class="$style.dividerLine" />
      </div>

      <form :class="$style.form" @submit.prevent="submitEmail">
        <input
          id="auth6-email"
          v-model="email"
          :class="$style.input"
          type="email"
          autocomplete="email"
          placeholder="your@email.com"
          required
        />
        <button :class="$style.submitButton" type="submit">
          Continue with email
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </form>

      <p :class="$style.legal">
        By proceeding, you accept our
        <router-link :class="$style.legalLink" to="/terms">Terms of Service</router-link>
        and the
        <router-link :class="$style.legalLink" to="/privacy">Privacy Policy</router-link>.
      </p>
    </div>

    <img :class="[$style.sidePhoto, $style.rightPhoto]" src="/hero-client.webp" alt="" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const email = ref("");

  const socialProviders = [
    {
      label: "Google",
      icon: `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3.02h3.86c2.26-2.09 3.56-5.17 3.56-8.89z"/>
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3.02c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.12A11.99 11.99 0 0 0 12 24z"/>
        <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.61H1.29a11.99 11.99 0 0 0 0 10.78l3.98-3.12z"/>
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 1.29 6.61l3.98 3.12C6.22 6.86 8.87 4.75 12 4.75z"/>
      </svg>`,
    },
    {
      label: "GitHub",
      icon: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#171717" aria-hidden="true">
        <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.07.79 2.15v3.19c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
      </svg>`,
    },
    {
      label: "Apple",
      icon: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#171717" aria-hidden="true">
        <path d="M17.05 12.54c.02 2.6 2.28 3.47 2.31 3.48-.02.06-.36 1.23-1.19 2.43-.72 1.04-1.47 2.08-2.65 2.1-1.15.02-1.52-.68-2.84-.68-1.31 0-1.72.66-2.8.7-1.13.04-1.99-1.12-2.71-2.16-1.47-2.13-2.59-6.01-1.08-8.63.75-1.3 2.09-2.13 3.55-2.15 1.11-.02 2.15.75 2.83.75.68 0 1.94-.92 3.27-.79.56.02 2.12.2 3.13 1.68-.08.05-1.87 1.09-1.82 3.27M14.9 4.94c.6-.73 1-1.74.89-2.75-.86.03-1.9.57-2.52 1.29-.55.64-1.04 1.67-.91 2.66.96.07 1.94-.49 2.54-1.2"/>
      </svg>`,
    },
  ];

  function submitEmail() {
    continueToPortal();
  }

  function continueToPortal() {
    router.push({ name: "DashboardSample" });
  }
</script>

<style module>
  .screen {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    padding: 32px 24px 0;
    background-color: #ffffff;
    font-family: var(--font-inter);
    box-sizing: border-box;
    overflow: hidden;
  }

  .sidePhoto {
    flex: 0 1 auto;
    height: clamp(300px, 68vh, 700px);
    max-width: 29vw;
    width: auto;
    object-fit: contain;
    object-position: bottom center;
    pointer-events: none;
    user-select: none;
  }

  .leftPhoto {
    margin-right: clamp(16px, 3vw, 56px);
  }

  .rightPhoto {
    margin-left: clamp(16px, 3vw, 56px);
  }

  .stack {
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
    max-width: 384px;
    padding-bottom: 32px;
    flex: 0 0 auto;
  }

  .logo {
    width: min(220px, 70%);
    height: auto;
    object-fit: contain;
    mix-blend-mode: multiply;
  }

  .headingBlock {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }

  .heading {
    margin: 0;
    font-size: 28px;
    line-height: 1.2;
    font-weight: 800;
    letter-spacing: -0.6px;
    color: #171717;
  }

  .description {
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
    color: #737373;
  }

  .socialRow {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
  }

  .socialButton {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 20px;
    border: 1px solid #e8e2d8;
    border-radius: 999px;
    background-color: #f4efe6;
    color: #171717;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    box-shadow:
      inset 0 1px 0 0 #ffffff,
      0 1px 2px -1px rgba(0, 0, 0, 0.08),
      0 2px 4px 0 rgba(0, 0, 0, 0.06);
    transition: background-color 0.18s ease, border-color 0.18s ease;
  }

  .socialButton:hover {
    background-color: #efe8db;
    border-color: #ddd5c5;
  }

  .socialIcon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
  }

  .dividerLine {
    flex: 1;
    height: 1px;
    background-color: #e6e0d3;
  }

  .dividerText {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.16em;
    color: #8f887c;
    text-transform: lowercase;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .input {
    width: 100%;
    height: 40px;
    padding: 0 14px;
    border: 1px solid #e3dccd;
    border-radius: 10px;
    background-color: #f4efe6;
    color: #171717;
    font-family: inherit;
    font-size: 14px;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .input::placeholder {
    color: #9a9488;
  }

  .input:focus {
    border-color: rgba(1, 53, 37, 0.5);
    box-shadow: 0 0 0 3px rgba(1, 53, 37, 0.12);
  }

  .submitButton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-image: linear-gradient(to bottom, #013525, #0a5641);
    color: #ffffff;
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: inset 0 2px 0 0 rgba(255, 255, 255, 0.15);
    transition: filter 0.18s ease;
  }

  .submitButton:hover {
    filter: brightness(1.08);
  }

  .legal {
    max-width: 320px;
    margin: 0;
    text-align: center;
    font-size: 12px;
    line-height: 1.6;
    color: #8f887c;
  }

  .legalLink {
    color: #171717;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 4px;
    transition: color 0.18s ease;
  }

  .legalLink:hover {
    color: #013525;
  }

  @media screen and (max-width: 1180px) {
    .sidePhoto {
      display: none;
    }
    .screen {
      align-items: center;
      padding: 32px 16px;
    }
    .stack {
      padding-bottom: 0;
    }
  }

  @media screen and (max-width: 420px) {
    .heading {
      font-size: 24px;
    }
    .socialButton {
      padding: 0 16px;
      font-size: 13px;
    }
  }
</style>
