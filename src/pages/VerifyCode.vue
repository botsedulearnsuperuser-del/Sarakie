<template>
  <div :class="$style.page">
    <div :class="$style.card">
      <h1 :class="$style.title">Two-step verification</h1>
      <p :class="$style.subtitle">
        Open your authenticator app and enter the 6-digit code for
        <strong>devgenbotswana@gmail.com</strong> to prove it is you.
      </p>

      <div :class="$style.slots" role="group" aria-label="Authenticator code">
        <input
          v-for="(d, i) in digits"
          :key="i"
          :ref="(el) => (slotRefs[i] = el as HTMLInputElement | null)"
          :class="$style.slot"
          :value="d"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="1"
          autocomplete="one-time-code"
          :aria-label="`Digit ${i + 1} of 6`"
          @input="onInput(i, $event)"
          @keydown="onKeyDown(i, $event)"
          @paste="onPaste"
          @focus="onFocus(i)"
        />
      </div>

      <p v-if="verified" :class="$style.verified">
        Code verified successfully!
      </p>
      <p v-else-if="error" :class="$style.error" role="alert">
        {{ error }}
      </p>

      <button
        :class="$style.verifyBtn"
        type="button"
        :disabled="code.length !== 6 || verifying"
        @click="verify"
      >
        {{ verifying ? "Verifying…" : "Verify and continue" }}
      </button>

      <button :class="$style.resetBtn" type="button" @click="reset">
        Reset code
      </button>

      <a :class="$style.altAccount" href="#" @click.prevent>
        Use a different account
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";

const digits = ref<string[]>(Array(6).fill(""));
const slotRefs = ref<(HTMLInputElement | null)[]>(Array(6).fill(null));
const verified = ref(false);
const verifying = ref(false);
const error = ref("");

const code = ref("");

const focusSlot = (i: number) => {
  const el = slotRefs.value[i];
  if (el) el.focus();
};

const onInput = (i: number, e: Event) => {
  const target = e.target as HTMLInputElement;
  const val = target.value.replace(/[^0-9]/g, "").slice(-1);
  digits.value[i] = val;
  target.value = val;
  code.value = digits.value.join("");
  error.value = "";
  verified.value = false;
  if (val && i < 5) {
    nextTick(() => focusSlot(i + 1));
  }
};

const onKeyDown = (i: number, e: KeyboardEvent) => {
  if (e.key === "Backspace" && !digits.value[i] && i > 0) {
    digits.value[i - 1] = "";
    code.value = digits.value.join("");
    nextTick(() => focusSlot(i - 1));
  }
};

const onPaste = (e: ClipboardEvent) => {
  const text = e.clipboardData?.getData("text") ?? "";
  const nums = text.replace(/[^0-9]/g, "").slice(0, 6);
  if (!nums) return;
  e.preventDefault();
  for (let i = 0; i < 6; i++) {
    digits.value[i] = nums[i] ?? "";
  }
  code.value = digits.value.join("");
  const next = Math.min(nums.length, 5);
  nextTick(() => focusSlot(next));
};

const onFocus = (i: number) => {
  slotRefs.value[i]?.select();
};

const verify = async () => {
  if (code.value.length !== 6) return;
  verifying.value = true;
  error.value = "";
  await new Promise((r) => setTimeout(r, 1200));
  verifying.value = false;
  if (code.value === "000000") {
    verified.value = true;
  } else {
    error.value = "That code didn't match. Try again.";
  }
};

const reset = () => {
  digits.value = Array(6).fill("");
  code.value = "";
  verified.value = false;
  error.value = "";
  nextTick(() => focusSlot(0));
};
</script>

<style module>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: #fff;
  font-family: var(--font-inter);
  box-sizing: border-box;
}

.card {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 28px;
  border-radius: 16px;
  border: 1px solid rgba(43, 27, 0, 0.12);
  box-shadow: 0 8px 24px rgba(43, 27, 0, 0.08);
  background-color: #fff;
  box-sizing: border-box;
}

.title {
  margin: 0 0 8px;
  color: #2b1b00;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.subtitle {
  margin: 0 0 24px;
  color: #2b1b00;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  max-width: 340px;
}

.slots {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.slot {
  width: 44px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid #2b1b00;
  background-color: transparent;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  font-family: inherit;
  color: #2b1b00;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.slot:focus {
  border-color: #97231e;
  box-shadow: 0 0 0 3px rgba(151, 35, 30, 0.18);
}

.verified {
  margin: 8px 0 16px;
  color: #1e7a33;
  font-size: 14px;
  font-weight: 600;
}

.error {
  margin: 8px 0 16px;
  color: #97231e;
  font-size: 13px;
  font-weight: 500;
}

.verifyBtn {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: #2b1b00;
  border: none;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.2s, transform 0.15s, opacity 0.2s;
}

.verifyBtn:hover:not(:disabled) {
  background-color: #1f1300;
}

.verifyBtn:active:not(:disabled) {
  transform: translateY(1px);
}

.verifyBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.resetBtn {
  width: 100%;
  height: 40px;
  margin-top: 8px;
  border-radius: 8px;
  background-color: transparent;
  border: 2px solid #2b1b00;
  color: #2b1b00;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s;
}

.resetBtn:hover {
  background-color: #fff8dd;
}

.altAccount {
  margin-top: 16px;
  color: #2b1b00;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 2px solid #f7c613;
  padding-bottom: 2px;
}

.altAccount:hover {
  opacity: 0.8;
}
</style>