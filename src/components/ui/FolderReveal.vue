<template>
  <div
    :class="[$style.root, className]"
    :style="rootStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focusin="handleFocus"
    @focusout="handleBlur"
  >
    <!-- contact shadow -->
    <div :class="$style.shadow" :style="shadowStyle" aria-hidden="true" />

    <!-- back panel -->
    <svg
      :class="$style.backPanel"
      aria-hidden="true"
      fill="none"
      viewBox="0 0 320 250"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Folder</title>
      <defs>
        <linearGradient :id="gradientId" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" :stop-color="skin.back" />
          <stop offset="100%" :stop-color="skin.backDeep" />
        </linearGradient>
      </defs>
      <path :d="BACK_PANEL_PATH" :fill="`url(#${gradientId})`" />
    </svg>


    <!-- well (inner shadow) -->
    <div :class="$style.well" :style="wellStyle" aria-hidden="true" />

    <!-- cards -->
    <div
      :aria-hidden="!open"
      :class="$style.cards"
      :style="cardsStyle"
    >
      <div
        v-for="(item, index) in items"
        :key="item.id"
        :class="$style.card"
        :style="cardStyle(item, index)"
      >
        <slot name="item" :item="item">
          <div v-if="item.content" v-html="item.content" />
        </slot>
      </div>
    </div>

    <!-- tab label -->
    <span :class="$style.tabLabel" :style="labelStyle">{{ label }}</span>

    <!-- front flap -->
    <button
      :aria-expanded="open"
      :aria-label="label"
      :class="$style.flap"
      :style="flapStyle"
      type="button"
      @click="handleClick"
      @keydown="handleKeyDown"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

export type FolderRevealTrigger = "hover" | "click";
export type FolderRevealColor = "manila" | "brand" | "blue" | "green" | "slate";

export interface FolderRevealItem {
  color?: string;
  content?: string;
  id: string;
}

export interface FolderRevealProps {
  className?: string;
  color?: FolderRevealColor;
  items: FolderRevealItem[];
  label?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  rotation?: number;
  size?: number;
  spread?: number;
  trigger?: FolderRevealTrigger;
}

const props = withDefaults(defineProps<FolderRevealProps>(), {
  color: "manila",
  label: "Folder",
  rotation: 7,
  size: 260,
  spread: 62,
  trigger: "hover",
});

const emit = defineEmits<{
  (e: "openChange", value: boolean): void;
}>();

const BACK_PANEL_PATH =
  "M 0 14 Q 0 0 14 0 L 108 0 Q 118 0 124 8 L 137 25 Q 143 33 153 33 L 306 33 Q 320 33 320 47 L 320 236 Q 320 250 306 250 L 14 250 Q 0 250 0 236 Z";

const ASPECT = 0.78;
const FLAP_TOP_RATIO = 0.44;
const CARD_WIDTH_RATIO = 0.6;
const CARD_HEIGHT_RATIO = 0.5;
const CARD_BOTTOM_RATIO = 0.16;
const FAN_LIFT_RATIO = 0.36;
const CLOSED_SCALE = 0.97;
const FLAP_OPEN_ROTATE_X = -32;
const STAGGER_STEP = 0.035;
const CLOSE_STAGGER_STEP = 0.018;
const PERSPECTIVE = 1000;

interface FolderSkin {
  back: string;
  backDeep: string;
  edge: string;
  flap: string;
  flapDeep: string;
  label: string;
}

const FOLDER_SKINS: Record<FolderRevealColor, FolderSkin> = {
  blue: { back: "oklch(0.56 0.13 250)", backDeep: "oklch(0.49 0.14 250)", edge: "oklch(0.84 0.07 252)", flap: "oklch(0.64 0.14 251)", flapDeep: "oklch(0.57 0.15 251)", label: "oklch(0.98 0.01 250)" },
  brand: { back: "oklch(0.63 0.17 352)", backDeep: "oklch(0.56 0.18 352)", edge: "oklch(0.87 0.08 352)", flap: "oklch(0.72 0.17 352)", flapDeep: "oklch(0.65 0.18 352)", label: "oklch(0.99 0.01 352)" },
  green: { back: "oklch(0.6 0.11 155)", backDeep: "oklch(0.53 0.12 155)", edge: "oklch(0.86 0.06 157)", flap: "oklch(0.68 0.12 156)", flapDeep: "oklch(0.61 0.13 156)", label: "oklch(0.99 0.01 155)" },
  manila: { back: "oklch(0.8 0.075 82)", backDeep: "oklch(0.73 0.08 79)", edge: "oklch(0.96 0.035 88)", flap: "oklch(0.87 0.068 85)", flapDeep: "oklch(0.8 0.074 83)", label: "oklch(0.4 0.05 68)" },
  slate: { back: "oklch(0.6 0.018 262)", backDeep: "oklch(0.53 0.02 262)", edge: "oklch(0.87 0.01 262)", flap: "oklch(0.68 0.016 262)", flapDeep: "oklch(0.61 0.018 262)", label: "oklch(0.99 0 0)" },
};

const isControlled = computed(() => props.open !== undefined);
const internalOpen = ref(false);
const open = computed(() => (isControlled.value ? (props.open as boolean) : internalOpen.value));

const reducedMotion = ref(false);
const hoverCapable = ref(false);
const gradientId = `fr-${Math.random().toString(36).slice(2, 9)}`;

onMounted(() => {
  if (typeof window === "undefined") return;
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
  hoverCapable.value = mq.matches;
  const handler = (e: MediaQueryListEvent) => (hoverCapable.value = e.matches);
  mq.addEventListener("change", handler);
  onBeforeUnmount(() => mq.removeEventListener("change", handler));
});

function setOpen(next: boolean) {
  if (!isControlled.value) internalOpen.value = next;
  props.onOpenChange?.(next);
  emit("openChange", next);
}

function handleMouseEnter() {
  if (props.trigger === "hover" && hoverCapable.value) setOpen(true);
}
function handleMouseLeave() {
  if (props.trigger === "hover" && hoverCapable.value) setOpen(false);
}
function handleFocus() {
  if (props.trigger === "hover") setOpen(true);
}
function handleBlur() {
  if (props.trigger === "hover") setOpen(false);
}
function handleClick() {
  if (props.trigger === "click") setOpen(!open.value);
}
function handleKeyDown(e: KeyboardEvent) {
  if (props.trigger === "hover" && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    setOpen(!open.value);
  }
}

const skin = computed(() => FOLDER_SKINS[props.color] ?? FOLDER_SKINS.manila);

const height = computed(() => props.size * ASPECT);
const flapHeight = computed(() => height.value * (1 - FLAP_TOP_RATIO));
const cardWidth = computed(() => props.size * CARD_WIDTH_RATIO);
const cardHeight = computed(() => height.value * CARD_HEIGHT_RATIO);

const itemCount = computed(() => props.items.length);
const center = computed(() => (itemCount.value - 1) / 2);

const rootStyle = computed(() => ({
  height: `${height.value}px`,
  perspective: reducedMotion.value ? undefined : `${PERSPECTIVE}px`,
  width: `${props.size}px`,
}));

const shadowStyle = computed(() => ({
  opacity: open.value ? 0.55 : 0.28,
  transform: `translateX(-50%) scaleX(${open.value ? 1.06 : 0.88})`,
  transition: reducedMotion.value ? "none" : "opacity 0.25s ease, transform 0.25s ease",
}));

const labelStyle = computed(() => ({
  color: "#ffffff",
  height: `${height.value * 0.132}px`,
  maxWidth: `${props.size * 0.34}px`,
}));

const wellStyle = computed(() => ({
  top: `${height.value * 0.132}px`,
}));

const cardsStyle = computed(() => ({
  bottom: `${height.value * CARD_BOTTOM_RATIO}px`,
}));

function cardStyle(item: FolderRevealItem, index: number) {
  const offset = index - center.value;
  const rotate = open.value ? (reducedMotion.value ? 0 : offset * props.rotation) : 0;
  const x = open.value ? (reducedMotion.value ? 0 : offset * props.spread) : 0;
  const y = open.value ? (reducedMotion.value ? 0 : -height.value * FAN_LIFT_RATIO) : 0;
  const scale = open.value ? 1 : CLOSED_SCALE;
  const opacity = open.value ? 1 : 0;
  const delay = open.value
    ? index * STAGGER_STEP
    : (itemCount.value - 1 - index) * CLOSE_STAGGER_STEP;
  return {
    backgroundColor: item.color,
    height: `${cardHeight.value}px`,
    opacity,
    transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`,
    transition: reducedMotion.value
      ? "none"
      : `transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease`,
    transitionDelay: reducedMotion.value ? "0s" : `${delay}s`,
    width: `${cardWidth.value}px`,
    zIndex: index,
  };
}

const flapStyle = computed(() => ({
  backgroundImage: `linear-gradient(to bottom, ${skin.value.flap}, ${skin.value.flapDeep})`,
  boxShadow: `inset 0 1px 0 ${skin.value.edge}, 0 -2px 6px -2px rgba(0,0,0,0.18), 0 10px 22px -12px rgba(0,0,0,0.4)`,
  height: `${flapHeight.value}px`,
  transform: reducedMotion.value ? "none" : open.value ? `rotateX(${FLAP_OPEN_ROTATE_X}deg)` : "rotateX(0deg)",
  transformOrigin: "bottom",
  transformStyle: "preserve-3d" as any,
  transition: reducedMotion.value ? "none" : "transform 0.25s ease",
}));

watch(
  () => props.open,
  (v) => {
    if (v !== undefined) emit("openChange", v);
  }
);
</script>

<style module>
.root {
  position: relative;
  user-select: none;
}
.shadow {
  position: absolute;
  bottom: -16px;
  left: 50%;
  height: 24px;
  width: 88%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  filter: blur(8px);
}
.backPanel {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.12));
}
.tabLabel {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  padding: 0 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-align: center;
  pointer-events: none;
  z-index: 3;
}

.well {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  box-shadow: inset 0 14px 16px -14px rgba(0, 0, 0, 0.45);
  pointer-events: none;
}
.cards {
  position: absolute;
  inset-inline: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
}
.card {
  position: absolute;
  bottom: 0;
  overflow: hidden;
  border-radius: 10px;
  background: var(--color-background, #ffffff);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 8px 18px -8px rgba(0, 0, 0, 0.28);
  ring: 1px solid rgba(0, 0, 0, 0.1);
}
.flap {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  cursor: pointer;
  outline: none;
}
.flap:focus-visible {
  box-shadow: 0 0 0 2px var(--color-ring, #6366f1);
}
</style>
