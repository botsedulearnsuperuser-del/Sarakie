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
          Submit your idea, keep track of your application,<br
            :class="$style.subcopyBreak"
          />
          and manage your submissions
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

        <form
          v-if="!signUpComplete"
          :class="$style.loginForm"
          @submit.prevent="handleSignUp"
        >
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
              Email Address
            </label>
            <input
              id="identifier"
              v-model="identifier"
              :class="$style.textInput"
              type="email"
              placeholder="Enter Your Email Address"
              autocomplete="email"
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
              minlength="8"
              required
              aria-describedby="password-rules"
            />

            <ul v-if="password" id="password-rules" :class="$style.rules">
              <li
                v-for="rule in rules"
                :key="rule.label"
                :class="[$style.rule, rule.met && $style.ruleMet]"
              >
                <span :class="$style.ruleMark" aria-hidden="true">
                  {{ rule.met ? "✓" : "•" }}
                </span>
                <span>{{ rule.label }}</span>
                <span :class="$style.srOnly">{{ rule.met ? "met" : "not met" }}</span>
              </li>
            </ul>
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

          <p
            v-if="formMessage"
            role="alert"
            :style="{
              margin: '0 0 8px',
              fontSize: '13px',
              color: signUpFailed ? '#b42318' : '#0f6b3f',
            }"
          >
            {{ formMessage }}
          </p>

          <button :class="$style.submitButton" type="submit" :disabled="loading || !requirementsMet || !passwordsMatch">
            <span>{{ loading ? "Creating account…" : "Create Account" }}</span>
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

        <!-- Shown after a successful registration -->
        <div v-else :class="$style.successPanel">
          <div :class="$style.successIcon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
              <path d="m9.498 15l7.5-7.5m-8.992.179l7.321-3.46c3.042-1.438 4.563-2.157 5.533-1.436s.693 2.365.138 5.652l-.954 5.662c-.363 2.149-.544 3.223-1.345 3.692s-1.842.109-3.923-.611l-6.365-2.202c-3.892-1.346-5.838-2.019-5.91-3.34c-.074-1.32 1.786-2.2 5.505-3.957M9.498 15.5v2.227c0 2.374 0 3.56.71 3.75s1.458-.798 2.954-2.773l.836-1.204" />
            </svg>
          </div>

          <h3 :class="$style.successTitle">Check your inbox</h3>
          <p :class="$style.successText">
            We sent a confirmation link to
            <strong>{{ submittedEmail }}</strong>. Open it to activate your CEDA
            Innovation Portal account. The link is valid for 24 hours.
          </p>

          <router-link
            :class="$style.submitButton"
            to="/login"
            style="text-decoration: none; display: flex;"
          >
            <span>Go to sign in</span>
            <svg :class="$style.btnArrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12h15M13 5.5 19.5 12 13 18.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </router-link>

          <p :class="$style.successHint">
            Didn't receive it? Check your spam folder, or
            <button :class="$style.successLink" type="button" @click="resendEmail">
              send the email again
            </button>.
          </p>
          <p v-if="resendMessage" :class="$style.successHint">{{ resendMessage }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import {
  dashboardForRole,
  isSupabaseConfigured,
  signUpWithPassword,
} from "../lib/auth";
import { supabase } from "../lib/supabase";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIREMENT_MESSAGE,
  passwordChecks,
} from "../lib/password";

const router = useRouter();

const manImageSrc = encodeURI("/innovator-man.webp");
const womanImageSrc = encodeURI("/hero-client.webp");

const fullName = ref("");
const identifier = ref("");
const password = ref("");
const confirmPassword = ref("");

/* Same password policy as the profile page and /reset-password. */
const checks = computed(() => passwordChecks(password.value));
const requirementsMet = computed(() => checks.value.valid);
const passwordsMatch = computed(() =>
  Boolean(
    password.value &&
      confirmPassword.value &&
      password.value === confirmPassword.value,
  ),
);

const rules = computed(() => [
  { label: `At least ${PASSWORD_MIN_LENGTH} characters`, met: checks.value.minLength },
  { label: "One uppercase letter", met: checks.value.upper },
  { label: "One number", met: checks.value.number },
  { label: "One special character", met: checks.value.special },
]);
const loading = ref(false);
const formMessage = ref("");
const signUpFailed = ref(false);
const signUpComplete = ref(false);
const submittedEmail = ref("");
const resendMessage = ref("");

const handleSignUp = async () => {
  formMessage.value = "";
  signUpFailed.value = false;

  if (password.value !== confirmPassword.value) {
    signUpFailed.value = true;
    formMessage.value = "Passwords do not match.";
    return;
  }
  if (!passwordChecks(password.value).valid) {
    signUpFailed.value = true;
    formMessage.value = PASSWORD_REQUIREMENT_MESSAGE;
    return;
  }

  // No backend configured: keep the previous demo behaviour.
  if (!isSupabaseConfigured) {
    router.push({ name: "Login" });
    return;
  }

  loading.value = true;
  const result = await signUpWithPassword({
    fullName: fullName.value,
    email: identifier.value,
    password: password.value,
  });
  loading.value = false;

  if (!result.ok) {
    signUpFailed.value = true;
    formMessage.value = result.error ?? "Could not create the account.";
    return;
  }

  if (result.needsConfirmation) {
    submittedEmail.value = identifier.value.trim();
    signUpComplete.value = true;
    return;
  }

  router.push(dashboardForRole("innovator"));
};

async function resendEmail() {
  resendMessage.value = "";
  if (!supabase) return;

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: submittedEmail.value,
  });

  resendMessage.value = error
    ? `Could not resend the email: ${error.message}`
    : "Confirmation email sent again. It can take a minute to arrive.";
}
</script>

<style module>

.page {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 44% 56%;
  background-color: #fff;
  font-family: var(--font-inter);
  overflow: hidden;
  box-sizing: border-box;
}

/* ---------- Left hero column ---------- */
.heroAside {
  position: relative;
  background-color: #f7c613;
  height: calc(100vh - 20px);
  margin-top: 20px;
  border-radius: 0 20px 0 0;
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
  background-color: #97231e;
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
  border: 2px solid #97231e;
  border-radius: 999px;
  background-color: #fff8dd;
  color: #97231e;
  font-size: min(22px, max(14px, 1.08vw));
  font-weight: 600;
  text-decoration: none;
  margin-bottom: clamp(20px, 3.6vh, 38px);
  transition: transform 0.15s, background-color 0.2s;
}

.backButton:hover {
  background-color: #ffffff;
  transform: translateX(-2px);
}

.backArrow {
  width: 1.15em;
  height: 1.15em;
}

.eyebrow {
  margin: 0;
  color: #97231e;
  font-size: clamp(13px, 1.05vw, 18px);
  font-weight: 600;
  letter-spacing: 0.14em;
}

.eyebrowBar {
  width: clamp(64px, 9vw, 150px);
  height: 4px;
  background-color: #97231e;
  margin: 7px 0 12px;
}

.headline {
  margin: 0 0 12px;
  color: #2b1b00;
  font-size: clamp(30px, 3.05vw, 52px);
  font-weight: 700;
  line-height: 1.24;
  letter-spacing: -0.01em;
}

.goldText {
  color: #97231e;
}

.whiteText {
  color: #2b1b00;
}

.subcopy {
  margin: 0;
  color: #2b1b00;
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
  width: min(360px, 15.5vw, 24vh);
  height: auto;
  object-fit: contain;
  /* the artwork sits on a white sheet - multiply drops the white into the cream */
  mix-blend-mode: multiply;
  margin-bottom: clamp(10px, 2.4vh, 32px);
}

.formTitle {
  margin: 0;
  color: #2b1b00;
  font-size: min(56px, max(26px, 2.35vw), 4.7vh);
  font-weight: 700;
  letter-spacing: 0.01em;
}

.formTitleUnderline {
  width: min(400px, 82%);
  height: 3px;
  background-color: #f7c613;
  margin: 10px 0 clamp(16px, 2.8vh, 34px);
}

.formSubtitle {
  margin: 0 0 clamp(26px, 4.3vh, 54px);
  color: #2b1b00;
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
  margin-bottom: clamp(16px, 2.9vh, 28px);
}

.inputLabel {
  font-size: min(24px, max(13.5px, 1.1vw), 2.2vh);
  font-weight: 600;
  color: #2b1b00;
  margin-bottom: 10px;
}

.textInput {
  width: 100%;
  height: clamp(44px, 5.2vh, 58px);
  border-radius: 8px;
  border: 2px solid #2b1b00;
  background-color: transparent;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 16px;
  font-family: inherit;
  color: #2b1b00;
  text-align: center;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.textInput::placeholder {
  color: #b3a99a;
  font-style: normal;
}

.textInput:focus {
  border-color: #97231e;
  box-shadow: 0 0 0 3px rgba(151, 35, 30, 0.18);
}

.rules {
  list-style: none;
  width: 100%;
  margin: -6px 0 14px;
  padding: 0;
  display: grid;
  gap: 4px;
  text-align: left;
}

.rule {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7a7a7a;
  font-size: 12.5px;
  line-height: 1.4;
}

.ruleMet {
  color: #1c6b45;
}

.ruleMark {
  width: 12px;
  flex: none;
  text-align: center;
  font-weight: 700;
}

.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.forgotLink {
  color: #2b1b00;
  font-size: min(24px, max(13.5px, 1.1vw), 2.2vh);
  font-weight: 600;
  text-decoration: none;
  border-bottom: 3px solid #f7c613;
  padding-bottom: 3px;
  margin: 6px auto clamp(18px, 3.2vh, 38px);
  display: inline-block;
}

.forgotLink:hover {
  opacity: 0.8;
}

.submitButton {
  width: 100%;
  height: clamp(46px, 5.4vh, 60px);
  border-radius: 8px;
  background-color: #2b1b00;
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
  background-color: #1f1300;
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
  margin: clamp(24px, 3.8vh, 46px) 0 clamp(28px, 4.6vh, 52px);
  color: #2b1b00;
  font-size: min(24px, max(13.5px, 1.1vw), 2.2vh);
  font-weight: 500;
}

.signupLink {
  color: #2b1b00;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 3px solid #f7c613;
  padding-bottom: 2px;
  margin-left: 4px;
}

.supportPrompt {
  margin: 0 0 clamp(20px, 3.4vh, 40px);
  color: #2b1b00;
  font-size: min(22px, max(13px, 1.05vw), 2.1vh);
  font-weight: 500;
}

.supportLink {
  color: #2b1b00;
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
  color: #2b1b00;
  font-weight: 600;
  white-space: nowrap;
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-color: #f7c613;
  text-decoration-thickness: 2px;
}

.legalLink:hover {
  text-decoration-color: #2b1b00;
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
    margin: 13px 0 18px;
  }
  .legalNote {
    margin-top: 18px;
  }
  .cedaLogo {
    width: min(320px, 15.5vw, 19vh);
    margin-bottom: 8px;
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
    margin-top: 16px;
    border-radius: 0 20px 0 0;
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
/* ---------- Post-registration confirmation ---------- */
.successPanel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 4px 0 0;
  box-sizing: border-box;
}
.successIcon {
  display: grid;
  place-items: center;
  color: var(--color-darkslategray-600);
}
.successIcon svg {
  width: 56px;
  height: 56px;
}
.successTitle {
  margin: 4px 0 0;
  font-size: 22px;
  font-weight: 800;
  color: #1f2933;
}
.successText {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #525252;
  max-width: 46ch;
}
.successHint {
  margin: 2px 0 0;
  font-size: 12.5px;
  color: #616161;
}
.successLink {
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  font-weight: 700;
  color: var(--color-darkslategray-600);
  text-decoration: underline;
  cursor: pointer;
}
</style>
