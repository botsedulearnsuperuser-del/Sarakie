<template>
  <main :class="$style.page">
    <div :class="$style.card">
      <img :class="$style.logo" src="/ceda-logo.webp" alt="CEDA" />

      <h1 :class="$style.title">Choose a new password</h1>
      <div :class="$style.titleRule" />
      <p :class="$style.subtitle">
        Use at least 8 characters with an uppercase letter, a number and a
        special character. You will use it the next time you sign in.
      </p>

      <p v-if="state === 'checking'" :class="$style.note">
        Checking your reset link…
      </p>

      <p v-else-if="state === 'invalid'" :class="$style.note">
        This reset link is missing or has expired.
        <router-link :class="$style.link" to="/forgot-password">
          Request a new one</router-link
        >.
      </p>

      <p v-else-if="state === 'done'" :class="$style.note">
        Your password has been updated.
        <router-link :class="$style.link" to="/login">Sign in</router-link>
        with your new password.
      </p>

      <form v-else :class="$style.form" @submit.prevent="submit">
        <label :class="$style.label" for="new-password">New password</label>
        <input
          id="new-password"
          v-model="password"
          :class="$style.input"
          type="password"
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

        <label :class="$style.label" for="confirm-password">
          Confirm new password
        </label>
        <input
          id="confirm-password"
          v-model="confirm"
          :class="$style.input"
          type="password"
          autocomplete="new-password"
          minlength="8"
          required
        />

        <p v-if="error" :class="$style.error">{{ error }}</p>

        <button
          :class="$style.submit"
          type="submit"
          :disabled="state === 'saving' || !requirementsMet"
        >
          {{ state === "saving" ? "Saving…" : "Update password" }}
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { authReady, completePasswordReset, session } from "../lib/auth";
import { isSupabaseConfigured } from "../lib/supabase";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIREMENT_MESSAGE,
  passwordChecks,
} from "../lib/password";

type State = "checking" | "ready" | "saving" | "done" | "invalid";

const state = ref<State>("checking");
const password = ref("");
const confirm = ref("");
const error = ref("");

/* Same policy as the profile page and sign-up. */
const checks = computed(() => passwordChecks(password.value));
const requirementsMet = computed(() => checks.value.valid);

const rules = computed(() => [
  { label: `At least ${PASSWORD_MIN_LENGTH} characters`, met: checks.value.minLength },
  { label: "One uppercase letter", met: checks.value.upper },
  { label: "One number", met: checks.value.number },
  { label: "One special character", met: checks.value.special },
]);

onMounted(async () => {
  if (!isSupabaseConfigured) {
    state.value = "invalid";
    return;
  }

  /* supabase-js reads the recovery tokens from the URL hash on load and
     restoreSession() in main.ts stores the session; give it a moment. */
  for (let attempt = 0; attempt < 40 && !authReady.value; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  state.value = session.value ? "ready" : "invalid";
});

async function submit() {
  error.value = "";

  if (!passwordChecks(password.value).valid) {
    error.value = PASSWORD_REQUIREMENT_MESSAGE;
    return;
  }
  if (password.value !== confirm.value) {
    error.value = "The two passwords do not match.";
    return;
  }

  state.value = "saving";
  const result = await completePasswordReset(password.value);

  if (!result.ok) {
    state.value = "ready";
    error.value = result.error ?? "Could not update the password.";
    return;
  }

  password.value = "";
  confirm.value = "";
  state.value = "done";
}
</script>

<style module>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: #faf7f2;
  font-family: var(--font-inter);
  box-sizing: border-box;
}

.card {
  width: 100%;
  max-width: 460px;
  background-color: #ffffff;
  border-radius: 18px;
  padding: 40px 36px 36px;
  box-sizing: border-box;
  box-shadow: 0 18px 46px rgba(27, 27, 27, 0.1);
}

.logo {
  display: block;
  width: 132px;
  height: auto;
  margin: 0 auto 22px;
}

.title {
  margin: 0;
  color: #1b1b1b;
  font-size: 26px;
  line-height: 1.2;
  font-weight: 700;
  text-align: center;
}

.titleRule {
  width: 54px;
  height: 4px;
  border-radius: 2px;
  background-color: #f2551b;
  margin: 14px auto 16px;
}

.subtitle {
  margin: 0 0 24px;
  color: #555;
  font-size: 14px;
  line-height: 1.55;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  color: #3a3a3a;
  font-size: 13px;
  font-weight: 600;
}

.input {
  width: 100%;
  height: 46px;
  padding: 0 14px;
  border: 1px solid #d8d2c8;
  border-radius: 10px;
  background-color: #ffffff;
  color: #1b1b1b;
  font-family: inherit;
  font-size: 14px;
  box-sizing: border-box;
}

.input:focus {
  outline: none;
  border-color: #97231e;
  box-shadow: 0 0 0 3px rgba(151, 35, 30, 0.12);
}

.rules {
  list-style: none;
  margin: 2px 0 4px;
  padding: 0;
  display: grid;
  gap: 4px;
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

.error {
  margin: 4px 0 0;
  color: #b3261e;
  font-size: 13px;
  line-height: 1.4;
}

.submit {
  width: 100%;
  height: 50px;
  margin-top: 12px;
  border: none;
  border-radius: 999px;
  background-color: #941d11;
  color: #ffffff;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(148, 29, 17, 0.25);
  transition: background-color 0.2s;
}

.submit:hover:not(:disabled) {
  background-color: #ad2617;
}

.submit:disabled {
  opacity: 0.65;
  cursor: default;
}

.note {
  margin: 0;
  color: #4a4a4a;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
}

.link {
  color: #97231e;
  font-weight: 600;
  text-decoration: underline;
}
</style>
