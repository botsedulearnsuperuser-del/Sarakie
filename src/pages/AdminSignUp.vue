<template>
  <div :class="$style.page">
    <!-- Left Column: Brand statement & people -->
    <aside :class="$style.heroAside">
      <div :class="$style.leftPattern" aria-hidden="true" />

      <div :class="$style.asideContent">
        <router-link to="/" :class="$style.backButton">
          <svg
            :class="$style.backArrow"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 12H4.5M11 5.5 4.5 12l6.5 6.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Back to Home</span>
        </router-link>

        <p :class="$style.eyebrow">ROOTED IN BOTSWANA</p>
        <div :class="$style.eyebrowBar" />

        <h1 :class="$style.headline">
          Your Next Step<br />
          <span :class="$style.whiteText">Is</span>
          <span :class="$style.goldText"> Here.</span>
        </h1>

        <p :class="$style.subcopy">
          Apply For a Loan , Keep Track of your application,<br
            :class="$style.subcopyBreak"
          />
          and manage active loans
        </p>
      </div>

      <div :class="$style.peopleContainer">
        <img
          :class="$style.manPhoto"
          :src="manImageSrc"
          alt="CEDA client"
        />
        <img
          :class="$style.womanPhoto"
          :src="womanImageSrc"
          alt="CEDA client"
        />
      </div>
    </aside>

    <!-- Right Column: Sign In Form -->
    <main :class="$style.formMain">
      <div :class="$style.formCard">
        <img :class="$style.cedaLogo" src="/ceda-logo.webp" alt="CEDA" />

        <h2 :class="$style.formTitle">Create Account</h2>
        <div :class="$style.formTitleUnderline" />
        <p :class="$style.formSubtitle">Register for your CEDA Account</p>

        <form :class="$style.loginForm" @submit.prevent="handleSignUp">
          <div :class="$style.inputGroup">
            <label :class="$style.inputLabel" for="fullName">Full Name</label>
            <input
              id="fullName"
              v-model="fullName"
              :class="$style.textInput"
              type="text"
              placeholder="Enter Your Full Name"
              autocomplete="name"
              required
            />
          </div>

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
            <label :class="$style.inputLabel" for="password">Password</label>
            <input
              id="password"
              v-model="password"
              :class="$style.textInput"
              type="password"
              placeholder="*****************"
              autocomplete="new-password"
              required
            />
          </div>

          <div :class="$style.inputGroup">
            <label :class="$style.inputLabel" for="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :class="$style.textInput"
              type="password"
              placeholder="*****************"
              autocomplete="new-password"
              required
            />
          </div>

          <button :class="$style.submitButton" type="submit">
            <span>Create Account</span>
            <svg
              :class="$style.btnArrow"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 12h15M13 5.5 19.5 12 13 18.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <p :class="$style.signupPrompt">
            Already have an Account ?
            <router-link :class="$style.signupLink" to="/login">
              Sign In?
            </router-link>
          </p>

          <p :class="$style.supportPrompt">
            Need Help ?
            <a :class="$style.supportLink" href="#support" @click.prevent>
              Talk to an Agent
            </a>
          </p>

          <p :class="$style.legalNote">
            By continuing to access this system, you confirm that you agree to
            our
            <router-link :class="$style.legalLink" to="/privacy">Privacy Policy</router-link>
            and
            <router-link :class="$style.legalLink" to="/terms">Terms &amp; Conditions</router-link>.
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

const manImageSrc = encodeURI("/innovator-man.webp");
const womanImageSrc = encodeURI("/hero-client.webp");

const fullName = ref("");
const identifier = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleSignUp = () => {
  // Send the new account to the sign in page after registering
  router.push({ name: "Login" });
};
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap");

.page {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 44% 56%;
  background-color: #fff;
  font-family: Poppins, var(--font-inter);
  overflow: hidden;
  box-sizing: border-box;
}

/* ---------- Left hero column ---------- */
.heroAside {
  position: relative;
  background-color: #941d11;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.leftPattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100%;
  background-color: #d18a4e;
  -webkit-mask-image: url("/pattern-3.webp");
  mask-image: url("/pattern-3.webp");
  -webkit-mask-size: 100px auto;
  mask-size: 100px auto;
  -webkit-mask-repeat: repeat-y;
  mask-repeat: repeat-y;
  opacity: 0.85;
  pointer-events: none;
  z-index: 0;
}

.asideContent {
  position: relative;
  z-index: 2;
  flex: 0 0 auto;
  padding: clamp(22px, 5.2vh, 64px) 24px 0 clamp(126px, 10.2vw, 172px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.backButton {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.5em 1.2em 0.5em 1em;
  border: 2px solid #941d11;
  border-radius: 999px;
  background-color: #e6bd74;
  color: #941d11;
  font-size: min(22px, max(14px, 1.08vw));
  font-weight: 600;
  text-decoration: none;
  margin-bottom: clamp(20px, 3.6vh, 38px);
  transition: transform 0.15s, background-color 0.2s;
}

.backButton:hover {
  background-color: #f0c982;
  transform: translateX(-2px);
}

.backArrow {
  width: 1.15em;
  height: 1.15em;
}

.eyebrow {
  margin: 0;
  color: #e9c07a;
  font-size: clamp(13px, 1.05vw, 18px);
  font-weight: 600;
  letter-spacing: 0.14em;
}

.eyebrowBar {
  width: clamp(64px, 9vw, 150px);
  height: 4px;
  background-color: #e9c07a;
  margin: 7px 0 12px;
}

.headline {
  margin: 0 0 12px;
  color: #fff;
  font-size: clamp(30px, 3.05vw, 52px);
  font-weight: 700;
  line-height: 1.24;
  letter-spacing: -0.01em;
}

.goldText {
  color: #e9c07a;
}

.whiteText {
  color: #fff;
}

.subcopy {
  margin: 0;
  color: #fff;
  font-size: clamp(14px, 1.15vw, 20px);
  font-weight: 400;
  line-height: 1.45;
  max-width: 560px;
}

.subcopyBreak {
  display: inline;
}

/* Photos always fill whatever height is left under the copy, so they stay as
   large as the viewport allows and can never overlap the text above them. */
.peopleContainer {
  position: relative;
  flex: 1 1 auto;
  min-height: 120px;
  width: 100%;
  margin-top: clamp(4px, 1.2vh, 14px);
  z-index: 1;
  pointer-events: none;
}

.manPhoto {
  position: absolute;
  bottom: -12%;
  left: -2%;
  height: 112%;
  width: auto;
  max-width: none;
  object-fit: contain;
  object-position: left bottom;
  z-index: 1;
}

.womanPhoto {
  position: absolute;
  bottom: -12%;
  left: 38%;
  height: 112%;
  width: auto;
  max-width: none;
  object-fit: contain;
  object-position: left bottom;
  z-index: 2;
}

/* ---------- Right form column ---------- */
.formMain {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: clamp(20px, 5vh, 68px) 32px clamp(12px, 2.4vh, 40px);
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
}

.formCard {
  width: 100%;
  max-width: clamp(442px, 26vw, 620px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.cedaLogo {
  width: min(300px, 13vw, 20vh);
  height: auto;
  object-fit: contain;
  /* the artwork sits on a white sheet - multiply drops the white into the cream */
  mix-blend-mode: multiply;
  margin-bottom: clamp(10px, 2.4vh, 32px);
}

.formTitle {
  margin: 0;
  color: #941d11;
  font-size: min(56px, max(26px, 2.35vw), 4.7vh);
  font-weight: 700;
  letter-spacing: 0.01em;
}

.formTitleUnderline {
  width: min(400px, 82%);
  height: 3px;
  background-color: #e6bd74;
  margin: 8px 0 clamp(10px, 1.8vh, 20px);
}

.formSubtitle {
  margin: 0 0 clamp(16px, 2.6vh, 30px);
  color: #941d11;
  font-size: min(28px, max(14px, 1.25vw), 2.4vh);
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
  margin-bottom: clamp(10px, 1.9vh, 18px);
}

.inputLabel {
  font-size: min(24px, max(13.5px, 1.1vw), 2.2vh);
  font-weight: 600;
  color: #941d11;
  margin-bottom: 6px;
}

.textInput {
  width: 100%;
  height: clamp(42px, 4.6vh, 52px);
  border-radius: 8px;
  border: 2px solid #941d11;
  background-color: transparent;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 16px;
  font-family: inherit;
  color: #941d11;
  text-align: center;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.textInput::placeholder {
  color: #b3a99a;
  font-style: normal;
}

.textInput:focus {
  border-color: #c47a44;
  box-shadow: 0 0 0 3px rgba(196, 122, 68, 0.2);
}

.forgotLink {
  color: #941d11;
  font-size: min(24px, max(13.5px, 1.1vw), 2.2vh);
  font-weight: 600;
  text-decoration: none;
  border-bottom: 3px solid #e6bd74;
  padding-bottom: 3px;
  margin: 6px auto clamp(18px, 3.2vh, 38px);
  display: inline-block;
}

.forgotLink:hover {
  opacity: 0.8;
}

.submitButton {
  width: 100%;
  margin-top: clamp(4px, 1vh, 12px);
  height: clamp(46px, 5.2vh, 58px);
  border-radius: 8px;
  background-color: #941d11;
  border: none;
  color: #fff;
  font-size: min(26px, max(14.5px, 1.15vw), 2.2vh);
  font-weight: 600;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  transition: background-color 0.2s, transform 0.15s;
}

.submitButton:hover {
  background-color: #ad2617;
}

.submitButton:active {
  transform: translateY(1px);
}

.btnArrow {
  width: 1.1em;
  height: 1.1em;
  color: #fff;
}

.signupPrompt {
  margin: clamp(14px, 2.4vh, 28px) 0 clamp(20px, 3.4vh, 40px);
  color: #941d11;
  font-size: min(24px, max(13.5px, 1.1vw), 2.2vh);
  font-weight: 500;
}

.signupLink {
  color: #941d11;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 3px solid #e6bd74;
  padding-bottom: 2px;
  margin-left: 4px;
}

.supportPrompt {
  margin: 0 0 clamp(20px, 3.4vh, 40px);
  color: #941d11;
  font-size: min(22px, max(13px, 1.05vw), 2.1vh);
  font-weight: 500;
}

.supportLink {
  color: #941d11;
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
}

.supportLink:hover {
  text-decoration: underline;
}

.legalNote {
  margin: clamp(18px, 3vh, 40px) 0 0;
  max-width: 92%;
  color: #7d6f66;
  font-size: min(17px, max(11.5px, 0.92vw), 1.85vh);
  font-weight: 400;
  line-height: 1.55;
}

.legalLink {
  color: #941d11;
  font-weight: 600;
  white-space: nowrap;
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-color: #e6bd74;
  text-decoration-thickness: 2px;
}

.legalLink:hover {
  text-decoration-color: #941d11;
}

/* Narrow desktops: let the hero copy wrap naturally instead of hard-breaking */
@media (max-width: 1200px) {
  .subcopyBreak {
    display: none;
  }
  .subcopy {
    max-width: 100%;
  }
}

/* Shorter laptop screens: trim the logo and the outer margins, never the gaps */
@media (max-height: 940px) {
  .cedaLogo {
    width: min(340px, 15.5vw, 20vh);
  }
}

@media (max-height: 720px) {
  .formTitleUnderline {
    margin: 6px 0 12px;
  }
  .formSubtitle {
    margin-bottom: 14px;
  }
  .inputGroup {
    margin-bottom: 11px;
  }
  .forgotLink {
    margin: 3px auto 12px;
  }
  .signupPrompt {
    margin: 13px 0 10px;
  }
  .legalNote {
    margin-top: 18px;
  }
  .cedaLogo {
    width: min(320px, 15.5vw, 19vh);
    margin-bottom: 8px;
  }
}

/* Four fields need a tighter rhythm on 720-820px tall laptops */
@media (max-height: 820px) {
  .cedaLogo {
    width: min(300px, 13vw, 18vh);
    margin-bottom: 8px;
  }
  .formTitleUnderline {
    margin: 6px 0 10px;
  }
  .formSubtitle {
    margin-bottom: 12px;
  }
  .inputGroup {
    margin-bottom: 8px;
  }
  .inputLabel {
    margin-bottom: 4px;
  }
  .textInput {
    height: clamp(38px, 4.2vh, 48px);
  }
  .signupPrompt {
    margin: 10px 0 8px;
  }
  .legalNote {
    margin-top: 10px;
  }
}

/* Very short laptop windows (600px tall): keep all four fields on screen */
@media (max-height: 660px) {
  .cedaLogo {
    width: min(280px, 13vw, 15vh);
    margin-bottom: 6px;
  }
  .formTitle {
    font-size: min(46px, max(24px, 2.2vw), 3.9vh);
  }
  .formTitleUnderline {
    margin: 4px 0 8px;
  }
  .formSubtitle {
    margin-bottom: 8px;
  }
  .inputGroup {
    margin-bottom: 6px;
  }
  .inputLabel {
    margin-bottom: 3px;
  }
  .textInput {
    height: 36px;
  }
  .signupPrompt {
    margin: 8px 0 6px;
  }
  .legalNote {
    margin-top: 6px;
    font-size: 10.5px;
  }
}

@media (max-width: 960px) {
  .page {
    grid-template-columns: 1fr;
    height: auto;
    overflow: visible;
  }
  .heroAside {
    height: auto;
    min-height: 520px;
  }
  .asideContent {
    padding: 32px 24px 0 124px;
  }
  .subcopyBreak {
    display: none;
  }
  .subcopy {
    max-width: 100%;
  }
  .peopleContainer {
    flex: 0 0 330px;
    height: 330px;
  }
  .manPhoto {
    max-height: 330px;
  }
  .womanPhoto {
    height: 240px;
  }
  .formMain {
    height: auto;
    padding: 44px 24px 56px;
  }
}
</style>
