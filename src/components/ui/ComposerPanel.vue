<template>
  <div :class="$style.wrapper">
    <div :class="[$style.card, disabled ? $style.cardDisabled : '']">
      <!-- Prompt row -->
      <textarea
        ref="textareaRef"
        :class="$style.prompt"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        rows="1"
        @input="onInput"
        @keydown="onKeydown"
      />

      <!-- Reasoning control, sits directly above the Auto button -->
      <button
        v-if="permissionOpen || reasoning"
        :class="[$style.reasonChip, reasoning ? $style.reasonChipOn : '']"
        type="button"
        data-picker
        :aria-pressed="reasoning"
        @click="toggleReasoning"
      >
        <span :class="$style.chipGlyph" aria-hidden="true">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
            <circle cx="12" cy="12" r="3.5" />
          </svg>
        </span>
        <span>Reasoning</span>
        <span :class="$style.chipState">{{ reasoning ? "On" : "Off" }}</span>
      </button>

      <!-- Controls row -->
      <div :class="$style.controls">
        <button :class="$style.addBtn" type="button" aria-label="Add attachment" :disabled="disabled">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <!-- Permission picker -->
        <div :class="$style.pickerWrap" data-picker>
          <button :class="$style.pickerBtn" type="button" @click="togglePermission">
            <span v-if="reasoning" :class="$style.reasonDot" aria-hidden="true" />
            <span :class="$style.pickerLabel">{{ permissionLabel }}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div v-if="permissionOpen" :class="$style.pickerMenu">
            <button
              v-for="opt in permissions"
              :key="opt.value"
              :class="[$style.pickerOption, permission === opt.value ? $style.pickerOptionActive : '']"
              type="button"
              @click="selectPermission(opt.value)"
            >
              <span :class="$style.optName">{{ opt.label }}</span>
              <span :class="$style.optDesc">{{ opt.desc }}</span>
            </button>
          </div>
        </div>

        <div :class="$style.spacer" />

        <!-- Send -->
        <button :class="$style.sendBtn" type="button" :disabled="disabled || !modelValue.trim()" @click="submit">
          Send
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

interface StatusTab { branch: string; project: string; context: number }

const props = withDefaults(defineProps<{
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  permission?: "auto" | "manual" | "plan" | "bypass";
  model?: string;
  effort?: number;
  status?: StatusTab | null;
  reasoning?: boolean;
}>(), {
  modelValue: "",
  placeholder: "Ask about a submission, the rubric or CEDA requirements…",
  disabled: false,
  permission: "auto",
  model: "anthropic/fable-5.1",
  effort: 1,
  status: null,
  reasoning: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  submit: [message: string];
  "permission-change": [value: string];
  "model-change": [value: string];
  "effort-change": [value: number];
  "reasoning-change": [value: boolean];
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const permissionOpen = ref(false);

const permissionLabels: Record<string, string> = {
  auto: "Auto",
  manual: "Manual",
  plan: "Plan",
  bypass: "Bypass all",
};

const permissions = [
  { value: "auto", label: "Auto", desc: "The agent decides on its own." },
  { value: "manual", label: "Manual", desc: "You approve each action." },
  { value: "plan", label: "Plan", desc: "Plans before acting." },
  { value: "bypass", label: "Bypass all", desc: "No confirmations." },
];

const permissionLabel = computed(() => permissionLabels[props.permission] ?? "Auto");

function onInput(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
  autoGrow(target);
}

function autoGrow(el: HTMLTextAreaElement) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 160) + "px";
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    submit();
  }
}

function submit() {
  const text = (props.modelValue ?? "").trim();
  if (!text || props.disabled) return;
  emit("submit", text);
}

function togglePermission() { permissionOpen.value = !permissionOpen.value; }
function selectPermission(v: string) {
  emit("permission-change", v);
  permissionOpen.value = false;
}

function toggleReasoning() {
  emit("reasoning-change", !props.reasoning);
}

function closeMenus(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!target.closest("[data-picker]")) {
    permissionOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", closeMenus);
  if (textareaRef.value) autoGrow(textareaRef.value);
});
onBeforeUnmount(() => document.removeEventListener("click", closeMenus));
</script>

<style module>
.wrapper {
  position: relative;
  font-family: var(--font-inter);
}

.statusTab {
  position: absolute;
  top: -14px;
  left: 16px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  background-color: var(--color-darkslategray-500);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.statusBranch { color: var(--color-goldenrod-200); }
.statusSep { opacity: 0.5; }
.statusProject { }
.statusContext { opacity: 0.85; }

.card {
  border-radius: 18px;
  background-color: #ffffff;
  border: 1px solid #ede9e1;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  padding: 9px 14px 9px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.cardDisabled { opacity: 0.6; pointer-events: none; }

.prompt {
  width: 100%;
  min-height: 38px;
  max-height: 140px;
  resize: none;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.45;
  color: var(--color-darkslategray-500);
  box-sizing: border-box;
}

.prompt::placeholder { color: #9ca3af; }

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.addBtn {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  color: var(--color-darkslategray-300);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.addBtn:hover { background-color: #f3f5f4; }

.pickerWrap {
  position: relative;
}

.pickerBtn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  color: var(--color-darkslategray-300);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.pickerBtn:hover { background-color: #f3f5f4; }

.pickerLabel { white-space: nowrap; }

.reasonDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-goldenrod-200);
  box-shadow: 0 0 0 2px rgba(230, 180, 60, 0.25);
  flex-shrink: 0;
}

.reasonChip {
  align-self: flex-start;
  margin-left: 38px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 27px;
  padding: 0 10px;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  color: var(--color-darkslategray-300);
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  animation: reasonChipIn 0.16s ease-out;
}

.reasonChip:hover { background-color: #f3f5f4; }

.reasonChipOn {
  background-color: var(--color-blanchedalmond);
  border-color: rgba(230, 180, 60, 0.45);
  color: var(--color-darkslategray-500);
}

.chipGlyph {
  display: inline-flex;
  color: var(--color-goldenrod-200);
  flex-shrink: 0;
}

.chipState {
  display: inline-flex;
  align-items: center;
  height: 16px;
  padding: 0 6px;
  border-radius: 9999px;
  background-color: #f1efe9;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--color-darkslategray-100);
}

.reasonChipOn .chipState {
  background-color: var(--color-goldenrod-200);
  color: var(--color-darkslategray-500);
}

@keyframes reasonChipIn {
  from {
    opacity: 0;
    transform: translateY(3px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reasonChip { animation: none; }
}

.pickerMenu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 20;
  min-width: 200px;
  background-color: #ffffff;
  border: 1px solid #ede9e1;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}


.pickerOption {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 8px 10px;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
}

.pickerOption:hover { background-color: #f3f5f4; }
.pickerOptionActive { background-color: var(--color-blanchedalmond); }

.optName {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-darkslategray-500);
}

.optDesc {
  font-size: 11.5px;
  color: var(--color-darkslategray-100);
}

.effortWrap {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 4px;
}

.effortDot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  cursor: pointer;
  padding: 0;
}

.effortDotActive {
  background-color: var(--color-goldenrod-200);
  border-color: var(--color-goldenrod-200);
}

.spacer { flex: 1; }

.micBtn {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  color: var(--color-darkslategray-300);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.micBtn:hover { background-color: #f3f5f4; }

.sendBtn {
  height: 32px;
  padding: 0 14px;
  border: none;
  border-radius: 10px;
  background-color: var(--color-goldenrod-200);
  color: var(--color-darkslategray-500);
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  flex-shrink: 0;
}

.sendBtn:hover:not(:disabled) { filter: brightness(1.04); }
.sendBtn:disabled { opacity: 0.55; cursor: not-allowed; }
</style>
