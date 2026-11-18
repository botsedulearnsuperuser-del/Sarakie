<template>
  <section :class="$style.main">
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
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8333 5H4.16667C3.24619 5 2.5 5.74619 2.5 6.66667V15C2.5 15.9205 3.24619 16.6667 4.16667 16.6667H15.8333C16.7538 16.6667 17.5 15.9205 17.5 15V6.66667C17.5 5.74619 16.7538 5 15.8333 5Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.5 8.33337H17.5M13.3333 12.5H15"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
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
</template>
<script setup lang="ts">
  import { useRouter } from "vue-router";

  interface Props {
    activePage?: "dashboard" | "loans-sheet" | "customers" | "admin-profile";
  }

  withDefaults(defineProps<Props>(), {
    activePage: "dashboard",
  });

  const router = useRouter();

  function goTo(page: "dashboard" | "loans-sheet" | "customers" | "admin-profile") {
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
    router.push({ name: "AdminLogin" });
  }

  function openAiAgent() {
    window.dispatchEvent(new CustomEvent("open-tavus-agent"));
  }
</script>
<style module>
  .main {
    width: 232px;
    height: 100vh;
    max-height: 100vh;
    position: relative;
    background-color: var(--color-darkslategray-500);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 28px 16px 24px;
    box-sizing: border-box;
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

  @media screen and (max-width: 1050px) {
    .main {
      width: 200px;
      height: auto;
      min-height: 100vh;
      position: relative;
    }
  }
</style>
