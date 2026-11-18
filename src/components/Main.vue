<template>
  <div :class="$style.wrapper">
    <button
      :class="$style.hamburger"
      type="button"
      aria-label="Toggle navigation menu"
      @click="mobileOpen = !mobileOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div v-if="mobileOpen" :class="$style.backdrop" @click="mobileOpen = false" />
    <section :class="[$style.main, mobileOpen ? $style.open : '']">
    <img
      :class="$style.b8dbc1777d73b88cd8d55f299be4pIcon"
      alt=""
      src="/pattern-2.webp"
    />
    <img :class="$style.aIcon" alt="" src="/a.webp" />
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
        v-if="activePage === 'dashboard'"
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
      <div :class="$style.asideLink5" @click="signOut">
        <img :class="$style.frameIcon5" alt="" src="/Frame1.svg" />
        <div :class="$style.signOut">Sign out</div>
      </div>
    </div>
  </section>
  </div>
</template>
<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  interface Props {
    activePage?: "dashboard" | "loans-sheet" | "customers" | "admin-profile";
  }

  withDefaults(defineProps<Props>(), {
    activePage: "dashboard",
  });

  const router = useRouter();
  const mobileOpen = ref(false);

  function goTo(page: "dashboard" | "loans-sheet" | "customers" | "admin-profile") {
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
    justify-content: space-between;
    align-items: stretch;
    padding: 40px 16px 24px;
    box-sizing: border-box;
    border-radius: 0 20px 0 0;
    isolation: isolate;
    gap: 28px;
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
    align-self: stretch;
    height: 47.5px;
    position: relative;
    max-width: 100%;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: cover;
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
    margin-top: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
    padding: 0;
    box-sizing: border-box;
    gap: 20px;
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
    padding: 12px 14px;
    box-sizing: border-box;
    gap: var(--gap-12);
    min-height: 44px;
    font-size: var(--fs-14);
    color: var(--color-gainsboro);
    cursor: pointer;
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

  .hamburger {
    display: none;
    position: fixed;
    top: 14px;
    left: 14px;
    z-index: 1100;
    width: 42px;
    height: 42px;
    border: none;
    border-radius: 12px;
    background-color: var(--color-darkslategray-500);
    cursor: pointer;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }
  .hamburger span {
    display: block;
    width: 20px;
    height: 2px;
    background-color: var(--color-white);
    border-radius: 2px;
  }
  .backdrop {
    display: none;
  }

  @media screen and (max-width: 1050px) {
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
    }
  }
</style>
