<template>
  <div :class="$style.wrapper">
    <div :class="$style.mobileBar">
      <button
        :class="$style.hamburger"
        type="button"
        aria-label="Toggle navigation menu"
        :aria-expanded="mobileOpen"
        @click="mobileOpen = !mobileOpen"
      >
        <svg
          :class="$style.hamburgerIcon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 17h7M5 12h14M5 7h14"
          />
        </svg>
      </button>
      <img :class="$style.mobileBarPattern" src="/pattern-2.webp" alt="" />
    </div>
    <div v-if="mobileOpen" :class="$style.backdrop" @click="mobileOpen = false" />
    <section :class="[$style.main, mobileOpen ? $style.open : '']">
    <img
      :class="$style.b8dbc1777d73b88cd8d55f299be4pIcon"
      alt=""
      src="/pattern-2.webp"
    />
    <img :class="$style.aIcon" alt="CEDA" src="/ceda-logo-white-strong.webp" />
    <div :class="$style.divsideItems">
      <div
        :class="activePage === 'dashboard' ? $style.asideLink : $style.asideLink2"
        @click="goTo('dashboard')"
      >
        <svg
          :class="$style.frameIcon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 8.75L10 2.5L17.5 8.75V17.5H12.5V12.5H7.5V17.5H2.5V8.75Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div :class="$style.dashboard">Dashboard</div>
      </div>
      <div
        :class="activePage === 'loans-sheet' ? $style.asideLink : $style.asideLink2"
        @click="goTo('loans-sheet')"
      >
        <svg
          :class="$style.frameIcon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.99996 6.66663V13.3333M6.66663 9.99996H13.3333"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div :class="$style.dashboard">My Applications</div>
      </div>
      <div
        :class="activePage === 'customers' ? $style.asideLink : $style.asideLink2"
        @click="goTo('customers')"
      >
        <svg
          :class="$style.frameIcon"
          width="20"
          height="20"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h32v32H0z" fill="none" />
          <path fill="white" d="M13 22c.828 0 1.479-.68 1.479-1.508S13.829 19 13 19s-1.52.664-1.52 1.492S12.171 22 13 22" />
          <path fill="white" d="M13 2C6.372 2 1 7.369 1 14s5.366 12 11.994 12c.34 0 .7-.02 1.021-.06v-2.003q-.51.06-1.02.06C7.487 23.997 3 19.51 3 14S7.494 4 13 4s10 4.49 10 10h2c0-6.631-5.372-12-12-12" />
          <path fill="white" d="M13.98 5.991h-1.502A4.493 4.493 0 0 0 7.974 10.5L8 11h2l-.024-.501a2.505 2.505 0 0 1 2.503-2.504h1.501a2.5 2.5 0 0 1 2.503 2.504a2.505 2.505 0 0 1-2.503 2.504h-2.002v4.508h2.002v-2.504a4.504 4.504 0 0 0 4.506-4.508A4.51 4.51 0 0 0 13.98 5.99Zm15.018 10.987H18.986a2.01 2.01 0 0 0-2.002 2.003v6.01c0 1.102.9 2.004 2.002 2.004h2.403L23.09 30l1.702-1.002l-2.303-4.007h-3.504L19 19h10v6h-3v2l2.998-.005A2.01 2.01 0 0 0 31 24.992v-6.01a2.01 2.01 0 0 0-2.002-2.004" />
        </svg>
        <div :class="$style.dashboard">Feedback Center</div>
      </div>
      <div
        :class="activePage === 'admin-profile' ? $style.asideLink : $style.asideLink2"
        @click="goTo('admin-profile')"
      >
        <svg
          :class="$style.frameIcon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99996 10C11.8409 10 13.3333 8.50766 13.3333 6.66671C13.3333 4.82576 11.8409 3.33337 9.99996 3.33337C8.15901 3.33337 6.66663 4.82576 6.66663 6.66671C6.66663 8.50766 8.15901 10 9.99996 10Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.33337 17.5C4.58337 14.1667 7.08337 12.5 10 12.5C12.9167 12.5 15.4167 14.1667 16.6667 17.5"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div :class="$style.dashboard">My Profile</div>
      </div>
      <div
        :class="$style.asideLink2"
        @click="openAiAgent"
      >
        <svg
          :class="$style.frameIcon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M21 11.002v1.496c0 2.829 0 4.243-.879 5.121c-.878.88-2.293.88-5.121.88h-4l-3.794 3.32a.727.727 0 0 1-1.207-.548v-2.773c-.929 0-1.394 0-1.775-.102a3 3 0 0 1-2.122-2.122C2 15.893 2 15.428 2 14.5V9.002c0-2.828 0-4.243.879-5.121c.878-.879 2.293-.879 5.121-.879h5m6 .125v1.875m0 0v1.875m0-1.875h-1.5m1.5 0h1.5m1.5 0l-1.301-.434a2 2 0 0 1-1.265-1.265L19 2.002l-.434 1.301a2 2 0 0 1-1.265 1.265L16 5.002l1.301.434A2 2 0 0 1 18.566 6.7L19 8.002l.434-1.301a2 2 0 0 1 1.265-1.265z"
          />
        </svg>
        <div :class="$style.dashboard">AI Agent</div>
      </div>
    </div>
    <div :class="$style.divsideHelpmargin">
      <div :class="$style.divsideHelp">
        <div :class="$style.div">
          <b :class="$style.needAHand">Need a hand?</b>
        </div>
        <div :class="$style.div2">
          <div :class="$style.ourAgentsAre">
            Our agents are available
            <br />
            Monday to Friday, 
            <br />
            08:00 –17:00.
          </div>
        </div>
        <div :class="$style.a">
          <b :class="$style.b">+267 77 663 331</b>
        </div>
      </div>
      <div :class="$style.asideLink5">
        <button :class="$style.signOutBtn" type="button" @click="signOut">
          <img :class="$style.frameIcon5" alt="" src="/Frame1.svg" />
          <span :class="$style.signOut">Sign out</span>
        </button>
        <button
          :class="$style.gearBtn"
          type="button"
          aria-label="Dashboard appearance"
          title="Dashboard appearance"
          @click="openThemePicker"
        >
        <svg
          :class="$style.gearIcon"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 32 32"
        >
          <path d="M0 0h32v32H0z" fill="none" />
          <path fill="currentColor" d="M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1a2 2 0 0 0-.64.1l-2.43.82a11 11 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.5 11.5 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1a2 2 0 0 0 .64-.1l2.43-.82a11 11 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.5 11.5 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1a2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51ZM25.21 24l-3.43-1.16a8.9 8.9 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.4 9.4 0 0 1-2.7-1.57L6.79 24l-2.36-4l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.43 12l2.36-4l3.43 1.16a8.9 8.9 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.4 9.4 0 0 1 2.7 1.57L25.21 8l2.36 4l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.57 20Z" />
          <path fill="currentColor" d="M16 22a6 6 0 1 1 6-6a5.94 5.94 0 0 1-6 6m0-10a3.91 3.91 0 0 0-4 4a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4" />
        </svg>
        </button>
      </div>
    </div>
  </section>

    <!-- Bottom-Right 2FA Notification Toast (shown on all pages) -->
    <Teleport to="body">
      <Transition name="toastSlide">
        <div v-if="showToast" :class="$style.toast">
          <div :class="$style.toastIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 32 32"
            >
              <path d="M0 0h32v32H0z" fill="none" />
              <path fill="currentColor" d="M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1a2 2 0 0 0-.64.1l-2.43.82a11 11 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.5 11.5 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1a2 2 0 0 0 .64-.1l2.43-.82a11 11 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.5 11.5 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1a2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51ZM25.21 24l-3.43-1.16a8.9 8.9 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.4 9.4 0 0 1-2.7-1.57L6.79 24l-2.36-4l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.43 12l2.36-4l3.43 1.16a8.9 8.9 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.4 9.4 0 0 1 2.7 1.57L25.21 8l2.36 4l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.57 20Z" />
              <path fill="currentColor" d="M16 22a6 6 0 1 1 6-6a5.94 5.94 0 0 1-6 6m0-10a3.91 3.91 0 0 0-4 4a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4" />
            </svg>
          </div>
          <div :class="$style.toastContent">
            <div :class="$style.toastTitle">Enable 2FA for security</div>
            <div :class="$style.toastMessage">
              Two-factor authentication adds an extra layer of protection to your account. You will need to verify your identity each time you sign in.
            </div>
          </div>
          <button :class="$style.toastActionBtn" type="button" @click="enable2FA">
            Enable 2FA
          </button>
          <button :class="$style.toastCloseBtn" type="button" @click="dismissToast">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>

    <!-- Authenticator app setup opened from the 2FA toast -->
    <TwoFactorSetup
      :open="showTwoFactorSetup"
      @close="closeTwoFactorSetup"
      @enabled="onTwoFactorEnabled"
    />

    <!-- Dashboard background picker opened from the sidebar settings icon -->
    <ThemePicker
      :open="showThemePicker"
      :selected="activeThemeId"
      :custom-image="customImage"
      @close="showThemePicker = false"
      @select="selectTheme"
      @select-custom="selectCustomTheme"
    />
  </div>
</template>
<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import TwoFactorSetup from "./TwoFactorSetup.vue";
  import ThemePicker from "./ThemePicker.vue";
  import {
    CUSTOM_IMAGE_STORAGE_KEY,
    CUSTOM_THEME_ID,
    dashboardThemes,
    THEME_EVENT,
    THEME_STORAGE_KEY,
  } from "./themes";

  interface Props {
    activePage?:
      | "dashboard"
      | "evaluator"
      | "ai-agent"
      | "loans-sheet"
      | "customers"
      | "admin-profile";
  }

  withDefaults(defineProps<Props>(), {
    activePage: "dashboard",
  });

  const router = useRouter();
  const mobileOpen = ref(false);

  function goTo(
    page: "dashboard" | "loans-sheet" | "customers" | "admin-profile",
  ) {
    mobileOpen.value = false;
    if (page === "dashboard") {
      router.push({ name: "DashboardSample" });
    } else if (page === "loans-sheet") {
      router.push({ name: "LoansSheet" });
    } else if (page === "customers") {
      router.push({ name: "Customers" });
    } else if (page === "admin-profile") {
      router.push({ name: "AdminProfile" });
    }
  }

  function signOut() {
    mobileOpen.value = false;
    router.push({ name: "AdminLogin" });
  }

  function openAiAgent() {
    mobileOpen.value = false;
    window.dispatchEvent(new CustomEvent("open-tavus-agent"));
  }

  // 2FA toast state — hidden for the session once 2FA has been enabled
  const twoFactorEnabled = ref(sessionStorage.getItem("sarka-2fa-enabled") === "1");
  const showToast = ref(!twoFactorEnabled.value);
  const showTwoFactorSetup = ref(false);

  function dismissToast() {
    showToast.value = false;
  }

  function enable2FA() {
    showToast.value = false;
    showTwoFactorSetup.value = true;
  }

  function closeTwoFactorSetup() {
    showTwoFactorSetup.value = false;
    if (!twoFactorEnabled.value) showToast.value = true;
  }

  const showThemePicker = ref(false);
  const activeThemeId = ref(localStorage.getItem(THEME_STORAGE_KEY) ?? "");
  const customImage = ref(localStorage.getItem(CUSTOM_IMAGE_STORAGE_KEY) ?? "");

  function notifyThemeChange(themeId: string, image: string) {
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: { id: themeId, image } }));
  }

  function openThemePicker() {
    mobileOpen.value = false;
    showThemePicker.value = !showThemePicker.value;
  }

  function selectTheme(themeId: string) {
    const theme = dashboardThemes.find((item) => item.id === themeId);
    if (!theme) return;
    activeThemeId.value = themeId;
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
    notifyThemeChange(themeId, theme.image);
    showThemePicker.value = false;
  }

  function selectCustomTheme(dataUrl: string) {
    try {
      localStorage.setItem(CUSTOM_IMAGE_STORAGE_KEY, dataUrl);
      localStorage.setItem(THEME_STORAGE_KEY, CUSTOM_THEME_ID);
    } catch {
      // Storage may be full: the image still applies for this visit.
    }
    customImage.value = dataUrl;
    activeThemeId.value = CUSTOM_THEME_ID;
    notifyThemeChange(CUSTOM_THEME_ID, dataUrl);
    showThemePicker.value = false;
  }

  function onTwoFactorEnabled() {
    twoFactorEnabled.value = true;
    sessionStorage.setItem("sarka-2fa-enabled", "1");
    showTwoFactorSetup.value = false;
    showToast.value = false;
  }
</script>
<style module>
  .wrapper {
    display: contents;
  }
  .main {
    width: 232px;
    height: calc(100vh - 20px);
    max-height: calc(100vh - 20px);
    margin-top: 20px;
    margin-bottom: 0;
    align-self: start;
    position: relative;
    background-color: var(--color-darkslategray-500);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 24px 16px 24px;
    box-sizing: border-box;
    border-radius: 0 20px 0 0;
    isolation: isolate;
    gap: 20px;
    flex-shrink: 0;
    text-align: left;
    font-size: var(--fs-15);
    color: var(--color-white);
    font-family: var(--font-inter);
  }
  .b8dbc1777d73b88cd8d55f299be4pIcon {
    width: 108px;
    height: 100%;
    position: absolute;
    margin: 0 !important;
    top: 0;
    right: -28px;
    object-fit: cover;
    object-position: center top;
    opacity: 0.88;
    mix-blend-mode: screen;
    pointer-events: none;
    z-index: 0;
    flex-shrink: 0;
  }
  .aIcon {
    align-self: center;
    width: 100%;
    max-width: 118px;
    margin-bottom: 0;
    height: auto;
    flex-shrink: 0;
    object-fit: contain;
    z-index: 1;
  }
  .sarakieCashLoan {
    position: absolute;
    top: 0px;
    left: 8px;
    width: 168px;
    height: 47.5px;
    object-fit: cover;
  }
  .divsideItems {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-4);
    z-index: 2;
    flex-shrink: 0;
  }
  .asideLink {
    align-self: stretch;
    border-radius: var(--br-12);
    background-color: var(--color-goldenrod-200);
    display: flex;
    align-items: center;
    padding: 12px 14px;
    box-sizing: border-box;
    gap: var(--gap-12);
    min-height: 46px;
    color: var(--color-darkslategray-500);
    cursor: pointer;
  }
  .frameIcon {
    height: var(--height-20);
    width: var(--width-20);
    position: relative;
    flex-shrink: 0;
    display: block;
  }
  .frameIcon path {
    stroke: #ffffff;
  }
  .dashboard {
    position: relative;
    font-weight: 600;
  }
  .asideLink2 {
    align-self: stretch;
    border-radius: var(--br-12);
    display: flex;
    align-items: center;
    padding: 12px 14px;
    box-sizing: border-box;
    gap: var(--gap-12);
    min-height: 46px;
    cursor: pointer;
  }
  .asideLink2:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }
  .divsideHelpmargin {
    align-self: stretch;
    margin-top: 12px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
    padding: 0;
    box-sizing: border-box;
    gap: 12px;
    z-index: 3;
    flex-shrink: 0;
  }
  .divsideHelp {
    align-self: stretch;
    border-radius: var(--br-16);
    background-color: var(--color-darkslategray-400);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 17.7px var(--padding-12) 18.8px;
    gap: var(--gap-8);
  }
  .div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-0) var(--padding-10);
    box-sizing: border-box;
    max-width: var(--max-w-153);
  }
  .needAHand {
    position: relative;
    display: inline-block;
    min-width: var(--min-w-100);
  }
  .div2 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-1) var(--padding-10) var(--padding-0);
    box-sizing: border-box;
    max-width: var(--max-w-153);
    font-size: var(--fs-13);
    color: var(--color-gainsboro);
  }
  .ourAgentsAre {
    position: relative;
    line-height: 18.9px;
    display: inline-block;
    min-width: 160px;
    flex-shrink: 0;
  }
  .a {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding-0) var(--padding-10);
    box-sizing: border-box;
    max-width: var(--max-w-153);
    color: var(--color-goldenrod-200);
  }
  .b {
    position: relative;
    display: inline-block;
    min-width: 124px;
  }
  .asideLink5 {
    width: auto;
    height: 44px;
    border-radius: var(--br-12);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    box-sizing: border-box;
    gap: var(--gap-12);
    min-height: 44px;
    font-size: var(--fs-14);
    color: var(--color-gainsboro);
  }
  .signOutBtn {
    display: flex;
    align-items: center;
    gap: var(--gap-12);
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    font-family: inherit;
    font-size: var(--fs-14);
    cursor: pointer;
  }
  .gearBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--color-gainsboro);
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
  }
  .gearBtn:hover {
    background-color: rgba(255, 255, 255, 0.12);
    color: #ffffff;
  }
  .frameIcon5 {
    height: var(--height-18);
    width: var(--width-18);
    position: relative;
  }
  .signOut {
    position: relative;
    font-weight: 500;
  }
  .gearIcon {
    height: 18px;
    width: 18px;
    position: relative;
    flex-shrink: 0;
    color: var(--color-gainsboro);
  }

  .mobileBar {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    background-color: var(--color-darkslategray-500);
    z-index: 1090;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 0 0 0 2px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.14);
    overflow: hidden;
  }
  .mobileBarPattern {
    width: 62px;
    height: 100%;
    flex-shrink: 0;
    object-fit: cover;
    object-position: center;
    opacity: 0.9;
    mix-blend-mode: screen;
    pointer-events: none;
  }
  .hamburger {
    display: none;
    width: 44px;
    height: 44px;
    border: none;
    background: transparent;
    color: #ffffff;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  .hamburgerIcon {
    width: 28px;
    height: 28px;
    display: block;
  }
  .backdrop {
    display: none;
  }

  @media screen and (max-width: 1050px) {
    .mobileBar {
      display: flex;
    }
    .hamburger {
      display: flex;
    }
    .backdrop {
      display: block;
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.45);
      z-index: 999;
    }
    .main {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      max-height: 100vh;
      margin: 0;
      transform: translateX(-100%);
      transition: transform 0.28s ease;
      z-index: 1000;
      border-radius: 0 20px 0 0;
    }
    .open {
      transform: translateX(0);
    }
    .main {
      width: 200px;
      padding-top: 68px;
    }
  }

  /* Bottom-Right 2FA Notification Toast */
  .toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 420px;
    max-width: calc(100vw - 48px);
    background-color: var(--color-white);
    border-radius: 16px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
    border: 1px solid var(--color-lightgray-100);
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 14px 16px;
    z-index: 10000;
    font-family: var(--font-inter);
  }

  .toastIcon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-blanchedalmond);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--color-darkslategray-500);
  }

  .toastIcon svg {
    width: 22px;
    height: 22px;
  }

  .toastContent {
    flex: 1;
    min-width: 0;
  }

  .toastTitle {
    font-size: var(--fs-14);
    font-weight: 700;
    color: var(--color-darkslategray-500);
    margin: 0 0 4px;
  }

  .toastMessage {
    font-size: var(--fs-13);
    color: var(--color-darkslategray-300);
    line-height: 1.4;
    margin: 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .toastActionBtn {
    height: 34px;
    padding: 0 14px;
    border-radius: 8px;
    background-color: var(--color-darkslategray-500);
    color: var(--color-white);
    border: none;
    font-size: var(--fs-13);
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background-color 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .toastActionBtn:hover {
    background-color: var(--color-darkslategray-600);
  }

  .toastCloseBtn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-darkslategray-300);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background-color 0.2s;
  }

  .toastCloseBtn:hover {
    background-color: var(--color-blanchedalmond);
  }

  .toastSlide-enter-active {
    animation: toastSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .toastSlide-leave-active {
    animation: toastSlideOut 0.3s ease-in forwards;
  }

  @keyframes toastSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes toastSlideOut {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(12px) scale(0.96);
    }
  }

  @media screen and (max-width: 600px) {
    .toast {
      left: 10px;
      right: 10px;
      bottom: 10px;
      width: auto;
      max-width: none;
      padding: 12px 14px;
      gap: 10px;
      border-radius: 14px;
    }

    .toastIcon {
      width: 34px;
      height: 34px;
    }

    .toastIcon svg {
      width: 18px;
      height: 18px;
    }

    .toastTitle {
      font-size: 13px;
    }

    .toastMessage {
      font-size: 12.5px;
      line-height: 1.35;
    }

    .toastActionBtn {
      height: 32px;
      padding: 0 12px;
      font-size: 12.5px;
    }
  }
</style>
