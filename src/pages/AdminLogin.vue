<template>
  <div :class="$style.page">
    <!-- Left Column: Hero branding & People -->
    <aside :class="$style.heroAside">
      <!-- Decorative Botswana pattern on the left edge -->
      <img
        :class="$style.leftPattern"
        alt=""
        src="/8917b8dbc1777d73b88cd8d55f299be4-png@2x.png"
      />

      <div :class="$style.asideContent">
        <router-link to="/" :class="$style.logoLink">
          <img
            :class="$style.logo"
            src="/LOGO@2x.png"
            alt="Sarakie Cash Loan"
          />
        </router-link>

        <div :class="$style.badgeGroup">
          <div :class="$style.badgeLine" />
          <span :class="$style.badgeText">ROOTED IN BOTSWANA</span>
        </div>

        <h1 :class="$style.headline">
          <span :class="$style.goldText">Loans<br />Management</span><br />
          <span :class="$style.whiteText">&amp; Administration</span>
        </h1>

        <p :class="$style.subcopy">
          For Sarakie Cash Loans Administrators<br />
          and Branch Personnel
        </p>
      </div>

      <!-- People images at the bottom of the column -->
      <div :class="$style.peopleContainer">
        <img
          :class="$style.manPhoto"
          :src="manImageSrc"
          alt="Sarakie Personnel"
        />
        <img
          :class="$style.womanPhoto"
          :src="womanImageSrc"
          alt="Sarakie Client"
        />
      </div>
    </aside>

    <!-- Right Column: Admin Log In Form -->
    <main :class="$style.formMain">
      <div :class="$style.formCard">
        <div :class="$style.headerGroup">
          <h2 :class="$style.formTitle">Admin Log In</h2>
          <div :class="$style.formTitleUnderline" />
          <p :class="$style.formSubtitle">
            Sign in to your Sarakie Personnel Account
          </p>
        </div>

        <form :class="$style.loginForm" @submit.prevent="handleLogin">
          <div :class="$style.inputGroup">
            <label :class="$style.inputLabel" for="identifier">
              Email or Phone Number
            </label>
            <input
              id="identifier"
              v-model="identifier"
              :class="$style.textInput"
              type="text"
              placeholder="Enter Your Email or Phone Number"
              autocomplete="username"
              required
            />
          </div>

          <div :class="$style.inputGroup">
            <label :class="$style.inputLabel" for="password">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              :class="$style.textInput"
              type="password"
              placeholder="*****************"
              autocomplete="current-password"
              required
            />
          </div>

          <a :class="$style.forgotLink" href="#forgot" @click.prevent>
            Forgot Password?
          </a>

          <button :class="$style.submitButton" type="submit">
            <span>Sign In</span>
            <img
              :class="$style.btnArrow"
              src="/bitcoin-icons-arrow-right-filled.svg"
              alt=""
            />
          </button>

          <p :class="$style.signupPrompt">
            Dont have an Account ?
            <a :class="$style.signupLink" href="#signup" @click.prevent>
              Sign Up?
            </a>
          </p>

          <p :class="$style.developerHelp">
            Need Help Logging in ?
            <a :class="$style.devLink" href="#dev-support" @click.prevent>
              Talk to System Developers
            </a>
          </p>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const manImageSrc = encodeURI("/7 2.png");
const womanImageSrc = encodeURI("/4 2 (1).png");

const identifier = ref("");
const password = ref("");

const handleLogin = () => {
  // Navigate to Dashboard upon successful login
  router.push({ name: "DashboardSample" });
};
</script>

<style module>
.page {
  width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 44% 56%;
  background-color: #faf7f2;
  font-family: var(--font-inter);
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Left Hero Column */
.heroAside {
  position: relative;
  background-color: var(--color-darkslategray-600);
  height: 100vh;
  min-height: 680px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.leftPattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 104px;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  opacity: 0.9;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
}

.asideContent {
  position: relative;
  z-index: 2;
  padding: 40px 32px 0 126px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logoLink {
  display: inline-block;
  margin-bottom: 24px;
  text-decoration: none;
}

.logo {
  height: 36px;
  width: auto;
  object-fit: contain;
}

.badgeGroup {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 20px;
}

.badgeLine {
  width: 48px;
  height: 5px;
  border-radius: 3px;
  background-color: var(--color-goldenrod-300);
}

.badgeText {
  color: var(--color-goldenrod-200);
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 1.2px;
}

.headline {
  margin: 0 0 16px;
  font-size: clamp(30px, 3.2vw, 42px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.5px;
}

.goldText {
  color: var(--color-goldenrod-200);
}

.whiteText {
  color: var(--color-white);
}

.subcopy {
  margin: 0;
  color: #c9d6d1;
  font-size: 16px;
  line-height: 1.48;
  max-width: 340px;
}

/* People at the bottom of the left column with generous clearance above */
.peopleContainer {
  position: relative;
  width: 100%;
  height: 330px;
  z-index: 1;
  pointer-events: none;
  margin-top: auto;
}

.manPhoto {
  position: absolute;
  bottom: 0;
  left: -10px;
  height: 310px;
  width: auto;
  max-width: none;
  object-fit: contain;
  object-position: left bottom;
  z-index: 2;
}

.womanPhoto {
  position: absolute;
  bottom: 0;
  left: 155px;
  height: 295px;
  width: auto;
  max-width: none;
  object-fit: contain;
  object-position: left bottom;
  z-index: 1;
}

/* Right Form Column */
.formMain {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 32px;
  box-sizing: border-box;
  background-color: #faf7f2;
  overflow-y: auto;
}

.formCard {
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.headerGroup {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 28px;
  width: 100%;
}

.formTitle {
  margin: 0;
  color: var(--color-darkslategray-600);
  font-size: clamp(34px, 4vw, 46px);
  font-weight: 900;
  letter-spacing: -0.5px;
}

.formTitleUnderline {
  width: 280px;
  height: 2.5px;
  background-color: var(--color-goldenrod-300);
  margin: 10px 0 14px;
}

.formSubtitle {
  margin: 0;
  color: var(--color-darkslategray-200);
  font-size: var(--fs-16);
  font-weight: 500;
}

.loginForm {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inputGroup {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
}

.inputLabel {
  font-size: var(--fs-15);
  font-weight: 700;
  color: var(--color-darkslategray-600);
  margin-bottom: 8px;
  text-align: center;
}

.textInput {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1.5px solid var(--color-darkslategray-400);
  background-color: #faf7f2;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: var(--fs-15);
  font-family: var(--font-inter);
  color: var(--color-darkslategray-600);
  text-align: center;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.textInput::placeholder {
  color: #a4b0ab;
  font-style: normal;
}

.textInput:focus {
  border-color: var(--color-goldenrod-300);
  box-shadow: 0 0 0 3px rgba(237, 191, 77, 0.25);
}

.forgotLink {
  color: var(--color-darkslategray-600);
  font-size: var(--fs-15);
  font-weight: 700;
  text-decoration: none;
  border-bottom: 2px solid var(--color-goldenrod-300);
  padding-bottom: 2px;
  margin: 6px auto 24px;
  display: inline-block;
  transition: opacity 0.2s;
}

.forgotLink:hover {
  opacity: 0.8;
}

.submitButton {
  width: 100%;
  height: 48px;
  border-radius: var(--br-12);
  background-color: var(--color-goldenrod-200);
  border: none;
  color: var(--color-darkslategray-600);
  font-size: var(--fs-17);
  font-weight: 700;
  font-family: var(--font-inter);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.15s, background-color 0.2s;
}

.submitButton:hover {
  background-color: var(--color-goldenrod-100);
  transform: translateY(-1px);
}

.submitButton:active {
  transform: translateY(0);
}

.btnArrow {
  width: 18px;
  height: 18px;
  filter: brightness(0.2);
}

.signupPrompt {
  margin: 26px 0 32px;
  color: var(--color-darkslategray-600);
  font-size: var(--fs-15);
  font-weight: 600;
}

.signupLink {
  color: var(--color-darkslategray-600);
  text-decoration: none;
  border-bottom: 2px solid var(--color-goldenrod-300);
  padding-bottom: 2px;
  margin-left: 4px;
}

.developerHelp {
  margin: 0;
  color: var(--color-darkslategray-600);
  font-size: var(--fs-14);
}

.devLink {
  color: var(--color-darkslategray-600);
  font-weight: 800;
  text-decoration: none;
  margin-left: 4px;
}

.devLink:hover {
  text-decoration: underline;
}

@media (max-width: 960px) {
  .page {
    grid-template-columns: 1fr;
    height: auto;
  }
  .heroAside {
    height: auto;
    min-height: 520px;
  }
  .asideContent {
    padding: 36px 24px 0 96px;
  }
  .formMain {
    height: auto;
    padding: 48px 24px;
  }
}
</style>
