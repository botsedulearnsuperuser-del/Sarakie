<template>
  <Teleport to="body">
    <!-- Signed in, authenticator connected: ask for the code -->
    <div v-if="needsCode" :class="$style.overlay">
      <form :class="$style.card" @submit.prevent="submit">
        <h2 :class="$style.title">Two-step verification</h2>
        <p :class="$style.text">
          Open your authenticator app and enter the 6-digit code for
          <b>{{ accountEmail }}</b> to prove it is you.
        </p>

        <div :class="$style.slots" role="group" aria-label="Authenticator code">
          <input
            v-for="(d, i) in digits"
            :key="i"
            :ref="(el) => (slotRefs[i] = el as HTMLInputElement | null)"
            :value="d"
            :class="$style.slot"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="1"
            autocomplete="one-time-code"
            :aria-label="`Digit ${i + 1} of 6`"
            :disabled="busy"
            @input="onSlotInput(i, $event)"
            @keydown="onSlotKeyDown(i, $event)"
            @paste="onSlotPaste"
            @focus="onSlotFocus(i)"
          />
        </div>

        <p v-if="error" :class="$style.error" role="alert">{{ error }}</p>

        <button :class="$style.primary" type="submit" :disabled="busy || code.length !== 6">
          {{ busy ? "Verifying…" : "Verify and continue" }}
        </button>
        <button :class="$style.secondary" type="button" :disabled="busy" @click="useAnotherAccount">
          Use a different account
        </button>
      </form>
    </div>

    <!-- Signed in, no authenticator yet: 2FA is not optional -->
    <div v-else-if="needsEnrollment" :class="$style.overlay">
      <div :class="$style.card" role="dialog" aria-modal="true" aria-labelledby="mfa-setup-title">
        <h2 id="mfa-setup-title" :class="$style.title">Add two-factor authentication</h2>
        <p :class="$style.text">
          Your CEDA account must be protected with an authenticator app. Add one now
          and confirm a code, so every sign-in proves it is really you before your
          applications are shown.
        </p>

        <p v-if="error" :class="$style.error" role="alert">{{ error }}</p>

        <button :class="$style.primary" type="button" :disabled="busy" @click="startSetup">
          Add authenticator app
        </button>
        <button :class="$style.secondary" type="button" :disabled="busy" @click="useAnotherAccount">
          Use a different account
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, ref, watch } from "vue";
  import { useRouter } from "vue-router";
  import { authReady, session, signOutNow } from "../lib/auth";
  import {
    mfaEnabled,
    mfaLoaded,
    mfaRequired,
    mfaSetupOpen,
    openMfaSetup,
    refreshMfa,
    verifyMfaCode,
  } from "../lib/mfa";

  const router = useRouter();
  const digits = ref<string[]>(Array(6).fill(""));
  const slotRefs = ref<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const code = computed(() => digits.value.join(""));
  const error = ref("");
  const busy = ref(false);

  const accountEmail = computed(() => session.value?.user.email ?? "your account");

  /** Signed in with no verified factor: enrolment is mandatory. */
  const needsEnrollment = computed(
    () =>
      Boolean(session.value) &&
      authReady.value &&
      mfaLoaded.value &&
      !mfaEnabled.value &&
      !mfaRequired.value &&
      !mfaSetupOpen.value,
  );

  const needsCode = computed(() => Boolean(session.value) && mfaRequired.value);

  /** The assurance level decides whether the code prompt is needed. */
  async function sync() {
    if (!authReady.value) return;
    await refreshMfa();
    if (mfaRequired.value) {
      digits.value = Array(6).fill("");
      error.value = "";
      await nextTick();
      slotRefs.value[0]?.focus();
    }
  }

  onMounted(sync);
  watch([authReady, session], sync);

  /* Re-check after the setup dialog closes, in case it was abandoned. */
  watch(mfaSetupOpen, async (open) => {
    if (!open) await sync();
  });

  function onSlotInput(i: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const val = input.value.replace(/\D/g, "").slice(-1);
    input.value = val;
    digits.value[i] = val;
    error.value = "";
    if (val && i < 5) {
      nextTick(() => slotRefs.value[i + 1]?.focus());
    }
  }

  function onSlotKeyDown(i: number, event: KeyboardEvent) {
    if (event.key === "Backspace" && !digits.value[i] && i > 0) {
      digits.value[i - 1] = "";
      nextTick(() => slotRefs.value[i - 1]?.focus());
    }
  }

  function onSlotPaste(event: ClipboardEvent) {
    const text = event.clipboardData?.getData("text") ?? "";
    const nums = text.replace(/\D/g, "").slice(0, 6);
    if (!nums) return;
    event.preventDefault();
    for (let i = 0; i < 6; i++) digits.value[i] = nums[i] ?? "";
    const next = Math.min(nums.length, 5);
    nextTick(() => slotRefs.value[next]?.focus());
  }

  function onSlotFocus(i: number) {
    slotRefs.value[i]?.select();
  }

  function startSetup() {
    error.value = "";
    openMfaSetup();
  }

  async function submit() {
    if (code.value.length !== 6 || busy.value) return;
    busy.value = true;
    error.value = "";
    const result = await verifyMfaCode(code.value);
    busy.value = false;
    if (!result.ok) {
      error.value = result.error ?? "That code could not be verified.";
      digits.value = Array(6).fill("");
      nextTick(() => slotRefs.value[0]?.focus());
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
    router.push({ name: "Login" });
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
  .slots {
    display: flex;
    gap: 8px;
    margin-top: 4px;
    justify-content: center;
  }
  .slot {
    width: 40px;
    height: 48px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background-color: #ffffff;
    text-align: center;
    font-family: var(--font-inter);
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0;
    color: var(--color-darkslategray-600);
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .slot:focus {
    border-color: var(--color-darkslategray-500);
    box-shadow: 0 0 0 3px rgba(15, 46, 36, 0.1);
  }
  .slot:disabled {
    opacity: 0.45;
    cursor: not-allowed;
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
    text-decoration: none;
    cursor: pointer;
  }
</style>
