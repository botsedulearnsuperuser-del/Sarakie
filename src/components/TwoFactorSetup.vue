<template>
  <Teleport to="body">
    <div v-if="open" :class="$style.overlay" @click.self="emit('close')">
      <div :class="$style.modal" role="dialog" aria-modal="true" aria-labelledby="tfa-title">
        <header :class="$style.modalHeader">
          <div :class="$style.headerText">
            <span :class="$style.stepTag">{{ stepTag }}</span>
            <h3 id="tfa-title" :class="$style.modalTitle">{{ stepTitle }}</h3>
            <p :class="$style.modalSub">{{ stepSub }}</p>
          </div>
          <button :class="$style.closeBtn" type="button" aria-label="Close" @click="emit('close')">
            &times;
          </button>
        </header>

        <!-- Step 1 — set up the authenticator app -->
        <div v-if="step === 1" :class="$style.body">
          <div :class="$style.columns">
            <ol :class="$style.instructionList">
              <li>
                <b :class="$style.instructionTitle">Install an authenticator app</b>
                <span :class="$style.instructionText">
                  Google Authenticator, Microsoft Authenticator or Authy on your phone.
                </span>
              </li>
              <li>
                <b :class="$style.instructionTitle">Scan the QR code</b>
                <span :class="$style.instructionText">
                  In the app, tap “+” and point your camera at the code.
                </span>
              </li>
              <li>
                <b :class="$style.instructionTitle">Enter your setup key if needed</b>
                <span :class="$style.instructionText">
                  Can’t scan? Type the setup key below into the app instead.
                </span>
              </li>
            </ol>

            <div :class="$style.qrCard">
              <div :class="$style.qrFrame">
                <svg :class="$style.qrSvg" viewBox="0 0 21 21" role="img" aria-label="Authenticator setup QR code">
                  <rect
                    v-for="cell in qrCells"
                    :key="cell.key"
                    :x="cell.col"
                    :y="cell.row"
                    width="1"
                    height="1"
                    fill="#0f2e24"
                  />
                </svg>
              </div>
              <span :class="$style.qrCaption">Sarkaie · Marion Lucas</span>
              <span :class="$style.setupKeyLabel">Setup key</span>
              <div :class="$style.setupKeyRow">
                <code :class="$style.setupKey">{{ setupKey }}</code>
                <button :class="$style.copyBtn" type="button" @click="copyKey">
                  {{ copied ? "Copied" : "Copy" }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2 — verify the code from the app -->
        <div v-else-if="step === 2" :class="$style.body">
          <div :class="$style.verifyCard">
            <label :class="$style.fieldLabel" for="tfa-code">Enter the 6-digit code from your app</label>
            <input
              id="tfa-code"
              :value="code"
              :class="$style.codeInput"
              inputmode="numeric"
              autocomplete="one-time-code"
              maxlength="6"
              placeholder="000000"
              @input="onCodeInput"
              @keyup.enter="verifyCode"
            />
            <p v-if="error" :class="$style.errorText">{{ error }}</p>
            <p :class="$style.helperText">The code refreshes every 30 seconds in your authenticator app.</p>
          </div>
        </div>

        <!-- Step 3 — enabled -->
        <div v-else :class="$style.body">
          <div :class="$style.successBox">
            <div :class="$style.successIcon">
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                >
                  <path
                    d="M9.5 15.25v.5m.5-.25a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0m4.5-.25v.5m.5-.25a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0M16.5 9V6.5a4.5 4.5 0 1 0-9 0V9"
                  />
                  <path
                    d="M4.268 18.845c.225 1.67 1.608 2.979 3.292 3.056c1.416.065 2.855.099 4.44.099s3.024-.034 4.44-.1c1.684-.076 3.067-1.385 3.292-3.055c.147-1.09.268-2.207.268-3.345s-.121-2.255-.268-3.345c-.225-1.67-1.608-2.979-3.292-3.056A95 95 0 0 0 12 9c-1.585 0-3.024.034-4.44.1c-1.684.076-3.067 1.385-3.292 3.055C4.12 13.245 4 14.362 4 15.5s.121 2.255.268 3.345"
                  />
                </g>
              </svg>
            </div>
            <h4 :class="$style.successTitle">Two-factor authentication enabled</h4>
            <p :class="$style.successText">
              From now on you’ll be asked for a code from your authenticator app each time you sign in.
            </p>
          </div>
        </div>

        <footer :class="$style.footer">
          <template v-if="step === 1">
            <button :class="$style.cancelLink" type="button" @click="emit('close')">Cancel</button>
            <button :class="$style.primaryBtn" type="button" @click="step = 2">
              Continue
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </template>

          <template v-else-if="step === 2">
            <div :class="$style.footerLeft">
              <button :class="$style.backBtn" type="button" @click="step = 1">Back</button>
              <button :class="$style.cancelLink" type="button" @click="emit('close')">Cancel</button>
            </div>
            <button :class="$style.primaryBtn" type="button" @click="verifyCode">Verify &amp; enable</button>
          </template>

          <template v-else>
            <span />
            <button :class="$style.primaryBtn" type="button" @click="finish">Done</button>
          </template>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: []; enabled: [] }>();

const setupKey = "SRKI 2FA7 Q4MD 9XLP";
const step = ref(1);
const code = ref("");
const error = ref("");
const copied = ref(false);

const stepTag = computed(() => {
  if (step.value === 3) return "All set";
  return `Step ${step.value} of 2`;
});

const stepTitle = computed(() => {
  if (step.value === 1) return "Set up your authenticator app";
  if (step.value === 2) return "Verify your authenticator app";
  return "Authenticator app connected";
});

const stepSub = computed(() => {
  if (step.value === 1) {
    return "Scan the code with an authenticator app, then enter the 6-digit code it shows to finish.";
  }
  if (step.value === 2) {
    return "Enter the code shown in your authenticator app to confirm the setup.";
  }
  return "Your account is now protected with a second step at sign-in.";
});

/** Decorative QR-style tile — a real otpauth QR is produced by the auth backend. */
const qrCells = computed(() => {
  const size = 21;
  const seed = setupKey.replace(/\s/g, "");
  let h = 2166136261;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) | 0;
  const next = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return (h >>> 0) % 2 === 0;
  };

  const filled: boolean[] = new Array(size * size).fill(false);
  const isFinder = (row: number, col: number) =>
    (row < 7 && col < 7) || (row < 7 && col >= size - 7) || (row >= size - 7 && col < 7);

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!isFinder(row, col)) filled[row * size + col] = next();
    }
  }

  const drawFinder = (row0: number, col0: number) => {
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 7; col++) {
        const edge = row === 0 || row === 6 || col === 0 || col === 6;
        const core = row >= 2 && row <= 4 && col >= 2 && col <= 4;
        filled[(row0 + row) * size + (col0 + col)] = edge || core;
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  const cells: { key: string; row: number; col: number }[] = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (filled[row * size + col]) cells.push({ key: `${row}-${col}`, row, col });
    }
  }
  return cells;
});

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      step.value = 1;
      code.value = "";
      error.value = "";
      copied.value = false;
    }
  },
);

function onCodeInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const digits = input.value.replace(/\D/g, "").slice(0, 6);
  input.value = digits;
  code.value = digits;
  error.value = "";
}

async function copyKey() {
  try {
    await navigator.clipboard?.writeText(setupKey.replace(/\s/g, ""));
    copied.value = true;
    window.setTimeout(() => (copied.value = false), 2000);
  } catch {
    copied.value = false;
  }
}

function verifyCode() {
  if (code.value.length !== 6) {
    error.value = "Enter the 6-digit code shown in your authenticator app.";
    return;
  }
  error.value = "";
  step.value = 3;
}

function finish() {
  emit("enabled");
}
</script>

<style module>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 10001;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  font-family: var(--font-inter);
}

.modal {
  width: 100%;
  max-width: 760px;
  max-height: 92vh;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modalHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 28px 20px;
  border-bottom: 1px solid #ede9e1;
}

.headerText {
  min-width: 0;
}

.stepTag {
  display: inline-block;
  font-size: 12.5px;
  font-weight: 700;
  color: #d97706;
  margin-bottom: 6px;
}

.modalTitle {
  margin: 0 0 6px;
  font-size: 21px;
  font-weight: 800;
  color: #0f2e24;
  letter-spacing: -0.2px;
}

.modalSub {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.5;
  color: #6b7280;
}

.closeBtn {
  border: none;
  background: none;
  font-size: 28px;
  line-height: 1;
  color: #6b7280;
  cursor: pointer;
  padding: 0 4px;
  flex-shrink: 0;
}

.body {
  padding: 24px 28px;
  overflow-y: auto;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 28px;
  align-items: start;
}

.instructionList {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.instructionList li::marker {
  color: #0f2e24;
  font-weight: 800;
}

.instructionTitle {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #0f2e24;
  margin-bottom: 3px;
}

.instructionText {
  display: block;
  font-size: 13px;
  line-height: 1.5;
  color: #6b7280;
}

.qrCard {
  background-color: #faf6f0;
  border: 1px solid rgba(0, 0, 0, 0.03);
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.qrFrame {
  width: 168px;
  height: 168px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.qrSvg {
  width: 100%;
  height: 100%;
  display: block;
}

.qrCaption {
  font-size: 12px;
  color: #6b7280;
  text-align: center;
}

.setupKeyLabel {
  align-self: flex-start;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #374151;
}

.setupKeyRow {
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 8px 10px;
}

.setupKey {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12.5px;
  letter-spacing: 1px;
  color: #0f2e24;
  white-space: nowrap;
}

.copyBtn {
  border: none;
  background: none;
  color: #0f2e24;
  font-family: var(--font-inter);
  font-size: 12px;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

.verifyCard {
  background-color: #faf6f0;
  border: 1px solid rgba(0, 0, 0, 0.03);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fieldLabel {
  font-size: 13.5px;
  font-weight: 700;
  color: #374151;
}

.codeInput {
  width: 100%;
  max-width: 260px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #0f2e24;
  font-family: var(--font-inter);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 8px;
  text-align: center;
  outline: none;
  box-sizing: border-box;
  transition: all 0.15s ease;
}

.codeInput:focus {
  border-color: #0f2e24;
  box-shadow: 0 0 0 3px rgba(15, 46, 36, 0.1);
}

.errorText {
  margin: 0;
  font-size: 12.5px;
  font-weight: 600;
  color: #b42318;
}

.helperText {
  margin: 0;
  font-size: 12.5px;
  color: #9ca3af;
}

.successBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 18px 12px 8px;
}

.successIcon {
  width: auto;
  height: auto;
  border-radius: 0;
  background: none;
  color: #2b9c6e;
  display: flex;
  align-items: center;
  justify-content: center;
}

.successTitle {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #0f2e24;
}

.successText {
  margin: 0;
  max-width: 420px;
  font-size: 13.5px;
  line-height: 1.55;
  color: #6b7280;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 28px;
  border-top: 1px solid #ede9e1;
  background-color: #ffffff;
}

.footerLeft {
  display: flex;
  align-items: center;
  gap: 18px;
}

.backBtn {
  padding: 10px 20px;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #374151;
  font-family: var(--font-inter);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.backBtn:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.cancelLink {
  border: none;
  background: none;
  padding: 0;
  font-family: var(--font-inter);
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.primaryBtn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  border-radius: 9999px;
  border: none;
  background-color: #0f2e24;
  color: #ffffff;
  font-family: var(--font-inter);
  font-size: 14.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.primaryBtn:hover {
  background-color: #081d16;
}

@media screen and (max-width: 700px) {
  .overlay {
    padding: 12px;
  }

  .modal {
    max-height: 94vh;
    border-radius: 16px;
  }

  .modalHeader,
  .body,
  .footer {
    padding-left: 20px;
    padding-right: 20px;
  }

  .columns {
    grid-template-columns: 1fr;
  }

  .qrCard {
    align-items: center;
  }
}
</style>
