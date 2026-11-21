<template>
  <div
    ref="rootRef"
    :class="[$style.root, className]"
    :data-state="state"
    :style="rootStyle"
    :role="ariaLabel ? 'img' : undefined"
    :aria-label="ariaLabel"
    :aria-hidden="ariaLabel ? undefined : true"
  >
    <div :class="$style.motion">
      <div :class="$style.body" :style="bodyStyle">
        <div :class="$style.sphere">
          <div :class="$style.marble">
            <span :class="[$style.blob, $style.blobA]" />
            <span :class="[$style.blob, $style.blobB]" />
            <span :class="[$style.blob, $style.blobC]" />
          </div>
          <div :class="$style.edge" />
          <div :class="$style.sheen" />
        </div>

        <svg :class="$style.face" viewBox="0 0 100 100" aria-hidden="true">
          <g v-if="!isBroken" :class="$style.gaze" :style="gazeStyle">
            <rect
              v-for="(eye, index) in eyes"
              :key="index"
              :class="$style.lid"
              :fill="featureColor"
              :height="eye.height"
              :rx="eye.rx"
              :style="eyeStyle(eye)"
              :width="eye.width"
              :x="eye.x"
              :y="eye.y"
            />
          </g>
          <g v-else :class="$style.dizzy">
            <g
              v-for="side in [-1, 1]"
              :key="side"
              :transform="`translate(${50 + side * 16} ${57})`"
            >
              <path
                :class="$style.dizzyEye"
                :d="SPIRAL"
                fill="none"
                :stroke="featureColor"
                stroke-linecap="round"
                stroke-width="3"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

export type AIState =
  | "idle"
  | "listening"
  | "thinking"
  | "streaming"
  | "done"
  | "error";

export interface EyeShape {
  /** Vertical offset in viewBox units. Negative sits the eye higher. */
  dy?: number;
  /** Multiplier on the resting height. `0` is a shut eye. */
  h: number;
  /** Degrees. Positive tilts the inner corner down, which reads as a scowl. */
  rotate?: number;
  /** Multiplier on the resting width. */
  w: number;
}

export interface Expression {
  left: EyeShape;
  right: EyeShape;
}

const EYE_OFFSET = 16;
const EYE_Y = 44;
const EYE_WIDTH = 11;
const EYE_HEIGHT = 26;
const EYE_RADIUS = 5.5;
const CENTER = 50;
/** How far the pupils can travel from centre, in viewBox units. */
const GAZE_RANGE = 5.5;
/** Cursor distance, in px, at which the gaze reaches full deflection. */
const GAZE_FALLOFF = 220;
/** A ~1.25-turn swirl; spun in place it reads as dizzy. */
const SPIRAL = "M0 0C-0.6 -4 5 -5 6 -0.6C7 4.5 1 8 -4 6C-9 4.5 -9.5 -2 -6 -6";
const BLINK_MIN_MS = 3200;
const BLINK_EXTRA_MS = 2600;
const DOUBLE_BLINK_CHANCE = 0.25;
/** Thinking saccades: the eyes look away and up, the way people search. */
const SACCADE_MIN_MS = 700;
const SACCADE_EXTRA_MS = 700;
const SACCADE_TARGETS = [
  { x: -1, y: -1 },
  { x: 1, y: -1 },
  { x: -0.6, y: -0.4 },
  { x: 0.8, y: -0.9 },
];

const EYE = (h: number, w = 1, rotate = 0, dy = 0): EyeShape => ({
  dy,
  h,
  rotate,
  w,
});

/** Mirrored: the same tilt on both eyes, pointing at each other. */
const symmetric = (h: number, w = 1, rotate = 0, dy = 0): Expression => ({
  left: EYE(h, w, rotate, dy),
  right: EYE(h, w, -rotate, dy),
});

const EXPRESSIONS = {
  /** Wide. Paying attention. */
  alert: symmetric(1.2, 1.05, 0, -1),
  /** Eyes shut, curved down. Reads as content rather than asleep. */
  content: symmetric(0.16, 1.25, 0, 2),
  /** Both eyes tilted inward. */
  cross: symmetric(0.85, 1, 18),
  /** Flat dashes. Unimpressed. */
  deadpan: symmetric(0.14, 1.35),
  /** One eye narrowed. The face is not convinced. */
  doubtful: { left: EYE(1, 1), right: EYE(0.45, 1.1, -14) },
  /** Narrowed and level. Working on it. */
  focused: symmetric(0.55, 1.05),
  /** Resting. */
  neutral: symmetric(1),
  /** Small and high. Caught off guard. */
  surprised: symmetric(0.5, 0.55, 0, -3),
  /** One shut, one open. */
  wink: { left: EYE(1, 1), right: EYE(0.12, 1.2, 0, 2) },
} satisfies Record<string, Expression>;

export type ExpressionName = keyof typeof EXPRESSIONS;

/** Status is carried by expression, the thing humans read fastest. */
const STATE_EXPRESSION: Record<AIState, ExpressionName> = {
  done: "content",
  error: "cross",
  idle: "neutral",
  listening: "alert",
  streaming: "focused",
  thinking: "doubtful",
};

/** Motion presets, lifted from the SmoothUI AI state contract. */
type StateMotion = {
  hue: number;
  pulseSeconds: number;
  saturation: number;
  scale: number;
  speed: number;
  turbulence: number;
};

const STATE_MOTION: Record<AIState, StateMotion> = {
  done: { hue: 0, pulseSeconds: 0.65, saturation: 1, scale: 1.1, speed: 0.8, turbulence: 0.08 },
  error: { hue: 0, pulseSeconds: 0.9, saturation: 0.3, scale: 0.96, speed: 1, turbulence: 0.55 },
  idle: { hue: 0, pulseSeconds: 4.5, saturation: 0.75, scale: 0.94, speed: 0.6, turbulence: 0.14 },
  listening: { hue: 0, pulseSeconds: 1.6, saturation: 1.05, scale: 1.06, speed: 1, turbulence: 0.42 },
  streaming: { hue: -10, pulseSeconds: 1.25, saturation: 1, scale: 1.02, speed: 1.4, turbulence: 0.5 },
  thinking: { hue: 18, pulseSeconds: 1.1, saturation: 1, scale: 1, speed: 2.4, turbulence: 0.95 },
};

interface Props {
  /** Accessible label. Omit to keep the character decorative. */
  ariaLabel?: string;
  /** Live audio level, 0–1. Lifts the body while speaking. */
  amplitude?: number;
  className?: string;
  colors?: { body?: string; bodyEdge?: string; feature?: string };
  /** Follow the pointer with its gaze. Off in dense UI. */
  gaze?: boolean;
  /** Set the face directly, ignoring `state`. */
  expression?: ExpressionName | Expression;
  /** Rendered size. Numbers are pixels. */
  size?: number | string;
  state?: AIState;
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  amplitude: 0,
  className: "",
  colors: undefined,
  expression: undefined,
  gaze: false,
  size: 128,
  state: "idle",
});

const DEFAULT_COLORS = {
  body: "var(--color-goldenrod-200, #eec24b)",
  bodyEdge: "var(--color-blanchedalmond, #fdf1cf)",
  feature: "var(--color-darkslategray-500, #013626)",
};

const finalColors = computed(() => ({ ...DEFAULT_COLORS, ...props.colors }));
const featureColor = computed(() => finalColors.value.feature);

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const stateMotion = computed(() => STATE_MOTION[props.state] ?? STATE_MOTION.idle);
const isBroken = computed(() => props.state === "error");
const isThinking = computed(() => props.state === "thinking");

const resolvedSize =
  typeof props.size === "number" ? `${props.size}px` : props.size;

const rootStyle = computed(() => ({
  height: resolvedSize,
  width: resolvedSize,
  filter: `saturate(${stateMotion.value.saturation}) hue-rotate(${stateMotion.value.hue}deg)`,
}));

const bodyStyle = computed(() => {
  const lift = 1 + Math.max(0, Math.min(1, props.amplitude)) * 0.06;
  return {
    "--orb-body": finalColors.value.body,
    "--orb-edge": finalColors.value.bodyEdge,
    "--orb-pulse": `${stateMotion.value.pulseSeconds}s`,
    "--orb-swirl": `${(10 / stateMotion.value.speed).toFixed(2)}s`,
    "--orb-turbulence": String(stateMotion.value.turbulence),
    transform: `scale(${(stateMotion.value.scale * lift).toFixed(3)})`,
  } as Record<string, string>;
});

const active = computed<Expression>(() => {
  const expression = props.expression;
  if (expression && typeof expression === "object") return expression;
  if (typeof expression === "string") return EXPRESSIONS[expression];
  return EXPRESSIONS[STATE_EXPRESSION[props.state] ?? "neutral"];
});

const eyes = computed(() =>
  ([-1, 1] as const).map((side) => {
    const shape = side === -1 ? active.value.left : active.value.right;
    const width = EYE_WIDTH * shape.w;
    const height = Math.max(EYE_HEIGHT * shape.h, 0.5);
    const x = CENTER + side * EYE_OFFSET - width / 2;
    // Keep the eye centred as it opens and closes, so a squint reads as lids
    // meeting rather than the eye sliding up the face.
    const y = EYE_Y + (EYE_HEIGHT - height) / 2 + (shape.dy ?? 0);
    return {
      cx: x + width / 2,
      cy: y + height / 2,
      height,
      rotate: shape.rotate ?? 0,
      rx: Math.min(EYE_RADIUS * shape.w, height / 2),
      width,
      x,
      y,
    };
  }),
);

const rootRef = ref<HTMLElement | null>(null);
const blinking = ref(false);
const gazeOffset = ref({ x: 0, y: 0 });

const gazeStyle = computed(() => ({
  transform: `translate(${gazeOffset.value.x.toFixed(2)}px, ${gazeOffset.value.y.toFixed(2)}px)`,
}));

function eyeStyle(eye: { cx: number; cy: number; rotate: number }) {
  return {
    transform: `rotate(${eye.rotate}deg) scaleY(${blinking.value ? 0.08 : 1})`,
    transformOrigin: `${eye.cx}px ${eye.cy}px`,
  };
}

let blinkTimer: number | null = null;
let openTimer: number | null = null;
let doubleTimer: number | null = null;

function clearBlinkTimers() {
  if (blinkTimer !== null) clearTimeout(blinkTimer);
  if (openTimer !== null) clearTimeout(openTimer);
  if (doubleTimer !== null) clearTimeout(doubleTimer);
  blinkTimer = null;
  openTimer = null;
  doubleTimer = null;
}

// Snap shut, ease back open — an even-timed blink reads as a machine.
function blink(double = false) {
  blinking.value = true;
  openTimer = window.setTimeout(() => {
    blinking.value = false;
    if (double) {
      doubleTimer = window.setTimeout(() => blink(false), 130);
    }
  }, 90);
}

function scheduleBlink() {
  blinkTimer = window.setTimeout(() => {
    blink(Math.random() < DOUBLE_BLINK_CHANCE);
    scheduleBlink();
  }, BLINK_MIN_MS + Math.random() * BLINK_EXTRA_MS);
}

let saccadeTimer: number | null = null;

function stopSaccades() {
  if (saccadeTimer !== null) {
    clearInterval(saccadeTimer);
    saccadeTimer = null;
  }
}

function startSaccades() {
  stopSaccades();
  let index = 0;
  const look = () => {
    const target = SACCADE_TARGETS[index % SACCADE_TARGETS.length];
    index += 1;
    gazeOffset.value = {
      x: target.x * GAZE_RANGE,
      y: target.y * GAZE_RANGE,
    };
  };
  look();
  saccadeTimer = window.setInterval(
    look,
    SACCADE_MIN_MS + Math.random() * SACCADE_EXTRA_MS,
  );
}

function followGaze() {
  const root = rootRef.value;
  if (!root) return () => undefined;
  const rect = root.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const handle = (event: PointerEvent) => {
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const reach = Math.min(1, distance / GAZE_FALLOFF) * GAZE_RANGE;
    const angle = Math.atan2(dy, dx);
    gazeOffset.value = {
      x: Math.cos(angle) * reach,
      y: Math.sin(angle) * reach,
    };
  };
  window.addEventListener("pointermove", handle);
  return () => window.removeEventListener("pointermove", handle);
}

let removeGazeListener: (() => void) | null = null;

function syncGaze() {
  removeGazeListener?.();
  removeGazeListener = null;
  gazeOffset.value = { x: 0, y: 0 };

  if (!props.gaze || isBroken.value || prefersReducedMotion) return;

  // Thinking looks away instead of tracking: that is what makes the state
  // legible without adding any graphic.
  if (isThinking.value) {
    startSaccades();
    return;
  }

  stopSaccades();
  removeGazeListener = followGaze();
}

watch(
  () => [props.gaze, props.state, props.expression],
  () => syncGaze(),
);

onMounted(() => {
  syncGaze();
  if (!prefersReducedMotion && !isBroken.value) scheduleBlink();
});

onBeforeUnmount(() => {
  clearBlinkTimers();
  stopSaccades();
  removeGazeListener?.();
});
</script>

<style module>
.root {
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  line-height: 0;
  vertical-align: middle;
  transition: filter 0.3s ease;
}

.motion {
  position: relative;
  height: 100%;
  width: 100%;
}

.body {
  position: absolute;
  inset: 7%;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
}

.sphere {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 34% 28%,
      var(--orb-edge) 0%,
      var(--orb-body) 46%,
      color-mix(in oklab, var(--orb-body) 82%, #7a5300) 100%
    );
  box-shadow: 0 1px 4px rgba(1, 54, 38, 0.18);
  animation: orbBreathe var(--orb-pulse, 4.5s) ease-in-out infinite;
}

.marble {
  position: absolute;
  inset: -22%;
  animation: orbSwirl var(--orb-swirl, 10s) linear infinite;
  will-change: transform;
}

.blob {
  position: absolute;
  display: block;
  border-radius: 50%;
  filter: blur(5px);
}

.blobA {
  width: 72%;
  aspect-ratio: 1;
  top: -8%;
  left: -8%;
  background: radial-gradient(circle, rgba(255, 252, 240, 0.9) 0%, rgba(255, 252, 240, 0.3) 42%, transparent 68%);
  opacity: 0.42;
}

.blobB {
  width: 92%;
  aspect-ratio: 1;
  right: -14%;
  bottom: -18%;
  background: radial-gradient(circle, rgba(122, 83, 0, 0.72) 0%, rgba(122, 83, 0, 0.22) 52%, transparent 74%);
  opacity: calc(0.45 + var(--orb-turbulence, 0.2) * 0.4);
}

.blobC {
  width: 58%;
  aspect-ratio: 1;
  top: 32%;
  left: 36%;
  background: radial-gradient(circle, rgba(255, 238, 190, 0.9) 0%, transparent 62%);
  opacity: 0.35;
}

.edge {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.4),
    inset 0 -6px 10px rgba(1, 54, 38, 0.16);
}

.sheen {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 24%, rgba(255, 255, 255, 0.55), transparent 34%);
  mix-blend-mode: screen;
  pointer-events: none;
}

.face {
  position: absolute;
  inset: 0;
  display: block;
  height: 100%;
  width: 100%;
  overflow: visible;
}

.gaze {
  transition: transform 0.28s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
}

.lid {
  transform-box: view-box;
  transition: transform 0.13s cubic-bezier(0.4, 0, 1, 1);
}

.dizzyEye {
  transform-box: view-box;
  transform-origin: 0 0;
  animation: orbDizzy 2.4s linear infinite;
}

.root[data-state="error"] .motion {
  animation: orbWobble 1.05s cubic-bezier(0.45, 0, 0.55, 1);
}

.root[data-state="done"] .motion {
  animation: orbHop 0.85s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes orbBreathe {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.035);
  }
}

@keyframes orbSwirl {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes orbWobble {
  0% {
    transform: rotate(0deg) translateX(0);
  }
  18% {
    transform: rotate(-11deg) translateX(-5px);
  }
  36% {
    transform: rotate(9deg) translateX(4px);
  }
  54% {
    transform: rotate(-7deg) translateX(-3px);
  }
  72% {
    transform: rotate(5deg) translateX(2px);
  }
  88% {
    transform: rotate(-3deg) translateX(-1px);
  }
  100% {
    transform: rotate(0deg) translateX(0);
  }
}

@keyframes orbHop {
  0% {
    transform: scale(1) translateY(0);
  }
  12% {
    transform: scaleX(1.08) scaleY(0.9) translateY(3px);
  }
  40% {
    transform: scaleX(0.94) scaleY(1.08) translateY(-9px);
  }
  62% {
    transform: scaleX(1.04) scaleY(0.95) translateY(0);
  }
  82% {
    transform: scaleX(0.99) scaleY(1.02) translateY(-3px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}

@keyframes orbDizzy {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .sphere,
  .marble,
  .dizzyEye,
  .root[data-state="error"] .motion,
  .root[data-state="done"] .motion {
    animation: none;
  }
  .gaze,
  .lid {
    transition: none;
  }
}
</style>
