<template>
  <div :class="[$style.card, className]">
    <div :class="$style.head">
      <p :class="$style.question">{{ question }}</p>
      <div v-if="$slots.default" :class="$style.context">
        <slot />
      </div>
    </div>

    <div :class="$style.body">
      <div
        v-if="chosen"
        :class="[$style.resolved, chosen.destructive ? $style.resolvedDestructive : '']"
      >
        <span :class="$style.check" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span :class="$style.resolvedLabel">{{ chosen.label }}</span>
        <span v-if="chosen.detail" :class="$style.resolvedDetail">
          {{ chosen.detail }}
        </span>
      </div>

      <div v-else :class="$style.options">
        <button
          v-for="(option, index) in options"
          :key="option.id"
          :class="[$style.option, option.destructive ? $style.optionDestructive : '']"
          :style="{ animationDelay: `${index * 30}ms` }"
          type="button"
          @click="decide(option)"
        >
          <span :class="$style.optionLabel">{{ option.label }}</span>
          <span v-if="option.detail" :class="$style.optionDetail">
            {{ option.detail }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

export interface AIApprovalOption {
  destructive?: boolean;
  detail?: string;
  id: string;
  label: string;
}

interface Props {
  className?: string;
  options: AIApprovalOption[];
  question: string;
  resolvedId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  className: "",
  resolvedId: undefined,
});

const emit = defineEmits<{
  decide: [option: AIApprovalOption];
}>();

const chosenId = ref<string | null>(props.resolvedId ?? null);
const chosen = computed(
  () => props.options.find((option) => option.id === chosenId.value) ?? null,
);

function decide(option: AIApprovalOption) {
  if (chosenId.value) return;
  chosenId.value = option.id;
  emit("decide", option);
}
</script>

<style module>
.card {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ede9e1;
  border-radius: 12px;
  background-color: #ffffff;
  padding: 14px;
  text-align: left;
}

.head {
  display: block;
}

.question {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-darkslategray-500);
}

.context {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.55;
  color: var(--color-darkslategray-200);
}

.body {
  margin-top: 12px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.option {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
  color: var(--color-darkslategray-500);
  font-family: inherit;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  animation: optionIn 0.25s cubic-bezier(0.23, 1, 0.32, 1) both;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.option:hover {
  background-color: #f1ede5;
}

.option:active {
  transform: scale(0.99);
}

.optionDestructive {
  border-color: rgba(185, 28, 28, 0.3);
  color: #b91c1c;
}

.optionDestructive:hover {
  background-color: rgba(185, 28, 28, 0.1);
}

.optionLabel {
  font-weight: 600;
}

.optionDetail {
  margin-left: auto;
  font-size: 12px;
  color: var(--color-darkslategray-200);
}

@keyframes optionIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.resolved {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: var(--color-darkslategray-500);
  color: #ffffff;
  font-size: 14px;
  animation: resolvedIn 0.25s cubic-bezier(0.23, 1, 0.32, 1) both;
}

.resolvedDestructive {
  background-color: rgba(185, 28, 28, 0.1);
  color: #b91c1c;
}

.check {
  display: inline-flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.resolvedLabel {
  font-weight: 600;
}

.resolvedDetail {
  margin-left: auto;
  font-size: 12px;
  opacity: 0.7;
}

@keyframes resolvedIn {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .option,
  .resolved {
    animation: none;
  }
  .option:active {
    transform: none;
  }
}
</style>