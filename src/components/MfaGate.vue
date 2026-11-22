<template>
  <Teleport to="body">
    <div v-if="mfaRequired" :class="$style.overlay">
      <form :class="$style.card" @submit.prevent="submit">
        <span :class="$style.badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
            <path d="M9.5 15.25v.5m.5-.25a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0m4.5-.25v.5m.5-.25a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0M16.5 9V6.5a4.5 4.5 0 1 0-9 0V9" />
            <path d="M4.268 18.845c.225 1.67 1.608 2.979 3.292 3.056c1.416.065 2.855.099 4.44.099s3.024-.034 4.44-.1c1.684-.076 3.067-1.385 3.292-3.055c.147-1.09.268-2.207.268-3.345s-.121-2.255-.268-3.345c-.225-1.67-1.608-2.979-3.292-3.056A95 95 0 0 0 12 9c-1.585 0-3.024.034-4.44.1c-1.684.076-3.067 1.385-3.292 3.055C4.12 13.245 4 14.362 4 15.5s.121 2.255.268 3.345" />
          </svg>
        </span>

        <h2 :class="$style.title">Two-step verification</h2>
        <p :class="$style.text">
          Open your authenticator app and enter the 6-digit code for
          <b>{{ accountEmail }}</b>.
        </p>

        <label :class="$style.label" for="mfa-gate-code">Authenticator code</label>
        <input
          id="mfa-gate-code"
          ref="inputRef"
          :value="code"
          :class="$style.input"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="6"
          placeholder="000000"
          :disabled="busy"
          @input="onInput"
        />

        <p v-if="error" :class="$style.error" role="alert">{{ error }}</p>

        <button :class="$style.primary" type="submit" :disabled="busy || code.length !== 6">
          {{ busy ? "Verifying…" : "Verify and continue" }}
        </button>
        <button :class="$style.secondary" type="button" :disabled="busy" @click="useAnotherAccount">
          Use a different account
        </button>
      </form>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, ref, watch } from "vue";
  import { useRouter } from "vue-router";
  import { authReady, session, signOutNow } from "../lib/auth";
  import { mfaLoaded, mfaRequired, refreshMfa, verifyMfaCode } from "../lib/mfa";

  const router = useRouter();
  const code = ref("");
  const error = ref("");
  const busy = ref(false);
  const inputRef = ref<HTMLInputElement | null>(null);

  const accountEmail = computed(() => session.value?.user.email ?? "your account");

  /** The assurance level decides whether the code prompt is needed. */
  async function sync() {
    if (!authReady.value) return;
    await refreshMfa();
    if (mfaRequired.value) {
      code.value = "";
      error.value = "";
      await nextTick();
      inputRef.value?.focus();
    }
  }

  onMounted(sync);
  watch([authReady, session, mfaLoaded], sync);

  function onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, "").slice(0, 6);
    input.value = digits;
    code.value = digits;
    error.value = "";
  }

  async function submit() {
    if (code.value.length !== 6 || busy.value) return;
    busy.value = true;
    error.value = "";
    const result = await verifyMfaCode(code.value);
    busy.value = false;
    if (!result.ok) {
      error.value = result.error ?? "That code could not be verified.";
      code.value = "";
      inputRef.value?.focus();
      return;
    }
    await refreshMfa();
    if (mfaRequired.value) {
      error.value = "The code was accepted but the session is still not verified. Please try again.";
    }
  }

  async function useAnotherAccount() {
    busy.value = true;
    await signOutNow();
    busy.value = false;
    await refreshMfa();
    router.push({ name: "AdminLogin" });
  }
</script>

<style module>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 90000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba(11, 26, 20, 0.55);
    backdrop-filter: blur(3px);
    font-family: var(--font-inter);
  }
  .card {
    width: 100%;
    max-width: 420px;
    padding: 26px 24px 22px;
    box-sizing: border-box;
    border-radius: 16px;
    border: 1px solid var(--color-antiquewhite-200);
    background-color: #ffffff;
    box-shadow: 0 24px 60px -16px rgba(1, 53, 37, 0.45);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .badge {
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: rgba(1, 53, 37, 0.08);
    color: var(--color-darkslategray-600);
  }
  .badge svg {
    width: 24px;
    height: 24px;
  }
  .title {
    margin: 4px 0 0;
    font-size: 18px;
    font-weight: 800;
    color: #1f2933;
  }
  .text {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: #525252;
  }
  .label {
    margin-top: 6px;
    font-size: 12.5px;
    font-weight: 700;
    color: #374151;
  }
  .input {
    width: 100%;
    max-width: 220px;
    padding: 11px 12px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    font-family: var(--font-inter);
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 7px;
    text-align: center;
    color: var(--color-darkslategray-600);
    outline: none;
  }
  .input:focus {
    border-color: var(--color-darkslategray-500);
    box-shadow: 0 0 0 3px rgba(15, 46, 36, 0.1);
  }
  .error {
    margin: 0;
    font-size: 12.5px;
    font-weight: 600;
    color: #b42318;
  }
  .primary {
    margin-top: 4px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background-color: var(--color-darkslategray-500);
    color: #ffffff;
    font-family: var(--font-inter);
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
  }
  .primary:hover:not(:disabled) {
    background-color: var(--color-darkslategray-600);
  }
  .primary:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  .secondary {
    border: none;
    background: none;
    padding: 2px 0;
    font-family: var(--font-inter);
    font-size: 12.5px;
    font-weight: 600;
    color: #616161;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }
</style>
