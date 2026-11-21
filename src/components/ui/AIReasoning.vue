<template>
  <div :class="[$style.root, className]">
    <button
      :aria-expanded="isOpen"
      :class="$style.header"
      type="button"
      @click="toggle"
    >
      <span :class="[$style.chevron, isOpen ? $style.chevronOpen : '']" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </span>
      <span v-if="isStreaming && !prefersReducedMotion" :class="$style.shimmer">
        {{ summary }}
      </span>
      <span v-else>{{ summary }}</span>
    </button>

    <div :class="[$style.panel, isOpen ? $style.panelOpen : '']">
      <div :class="$style.panelInner">
        <div :class="$style.trace">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

const AUTO_COLLAPSE_DELAY_MS = 600;
const MS_PER_SECOND = 1000;

interface Props {
  className?: string;
  collapseWhenDone?: boolean;
  defaultOpen?: boolean;
  duration?: number;
  isStreaming?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  className: "",
  collapseWhenDone: true,
  defaultOpen: undefined,
  duration: undefined,
  isStreaming: false,
});

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isOpen = ref(props.defaultOpen ?? props.isStreaming);
// Once someone opens or closes it by hand, stop deciding for them.
const isUserControlled = ref(false);

let startedAt: number | null = null;
let collapseTimer: number | null = null;
const measuredSeconds = ref<number | null>(null);

function toggle() {
  isUserControlled.value = true;
  isOpen.value = !isOpen.value;
}

function clearCollapseTimer() {
  if (collapseTimer !== null) {
    clearTimeout(collapseTimer);
    collapseTimer = null;
  }
}

watch(
  () => props.isStreaming,
  (streaming) => {
    if (streaming) {
      clearCollapseTimer();
      startedAt = Date.now();
      measuredSeconds.value = null;
      if (!isUserControlled.value) isOpen.value = true;
      return;
    }

    if (startedAt !== null) {
      measuredSeconds.value = (Date.now() - startedAt) / MS_PER_SECOND;
      startedAt = null;
    }

    if (props.collapseWhenDone && !isUserControlled.value) {
      collapseTimer = window.setTimeout(() => {
        isOpen.value = false;
        collapseTimer = null;
      }, AUTO_COLLAPSE_DELAY_MS);
    }
  },
);

onMounted(() => {
  if (props.isStreaming) startedAt = Date.now();
});

onBeforeUnmount(clearCollapseTimer);

const seconds = computed(() => props.duration ?? measuredSeconds.value);

const summary = computed(() => {
  if (props.isStreaming) return "Thinking";
  if (seconds.value !== null) return `Thought for ${seconds.value.toFixed(1)}s`;
  return "Reasoning";
});
</script>

<style module>
.root {
  width: 100%;
}

.header {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  border: none;
  border-radius: 8px;
  background: none;
  color: var(--color-darkslategray-200);
  font-family: inherit;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: color 0.15s ease;
}

.header:hover {
  color: var(--color-darkslategray-500);
}

.chevron {
  display: inline-flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.chevronOpen {
  transform: rotate(90deg);
}

.shimmer {
  background-image: linear-gradient(
    90deg,
    currentColor 0%,
    currentColor 35%,
    color-mix(in oklab, currentColor 25%, transparent) 50%,
    currentColor 65%,
    currentColor 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer 1.8s linear infinite;
}

@keyframes shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

.panel {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 0.25s cubic-bezier(0.34, 1.2, 0.64, 1),
    opacity 0.18s cubic-bezier(0.23, 1, 0.32, 1);
}

.panelOpen {
  grid-template-rows: 1fr;
  opacity: 1;
}

.panelInner {
  overflow: hidden;
  min-height: 0;
}

.trace {
  margin-top: 4px;
  margin-left: 7px;
  padding-left: 16px;
  border-left: 1px solid #ede9e1;
  color: var(--color-darkslategray-200);
  font-size: 13px;
  line-height: 1.6;
  white-space: normal;
}

.trace :global(p) {
  margin: 0;
}

.trace :global(p + p) {
  margin-top: 8px;
}

@media (prefers-reduced-motion: reduce) {
  .chevron,
  .panel {
    transition: none;
  }
  .shimmer {
    animation: none;
  }
}
</style>