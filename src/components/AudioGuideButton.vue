<template>
  <div
    ref="btn"
    :class="[$style.guideBtn, dragging ? $style.dragging : '', playing ? $style.playing : '']"
    :style="{ left: `${pos.x}px`, top: `${pos.y}px` }"
    role="button"
    tabindex="0"
    :aria-label="playing ? 'Pause the application audio guide' : 'Play the application audio guide'"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @keydown.enter.prevent="toggleGuide"
    @keydown.space.prevent="toggleGuide"
  >
    <span :class="$style.icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          v-if="!playing"
          fill="currentColor"
          d="M12 0a12 12 0 1 0 0 24a12 12 0 0 0 0-24m4.83 12.89l-7.38 3.69A1 1 0 0 1 8 15.69V8.31a1 1 0 0 1 1.45-.9l7.38 3.69a1 1 0 0 1 0 1.79"
        />
        <path
          v-else
          fill="currentColor"
          d="M12 0a12 12 0 1 0 0 24a12 12 0 0 0 0-24M9.5 7.5h1.8v9H9.5zm3.2 0h1.8v9h-1.8z"
        />
      </svg>
    </span>
    <span :class="$style.label">{{ playing ? "Pause guide" : "Simolola Application" }}</span>
    <audio ref="audio" :src="GUIDE_AUDIO_SRC" preload="none" @ended="onEnded" @error="onAudioError" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";

/**
 * Audio guide for the application form.
 *
 * Drop the recording in `public/audio/` and set GUIDE_AUDIO_SRC to its path
 * (a file in `public/` is served from the site root, so
 * `public/audio/application-guide.mp3` is `/audio/application-guide.mp3`).
 */
const GUIDE_AUDIO_SRC = "/audio/application-guide.mp3";

/** Spoken fallback only used when the recording above is missing. */
const FALLBACK_GUIDE =
  "Welcome to the CEDA innovation application. There are six steps. " +
  "Step one asks for your idea and the problem it solves. Step two covers you as the innovator. " +
  "Step three collects your contact details. Step four describes your industry and target market. " +
  "Step five is where you attach supporting documents. Step six lets you review and submit. " +
  "Your progress saves as you go, so you can finish later.";

const btn = ref<HTMLElement | null>(null);
const audio = ref<HTMLAudioElement | null>(null);
const playing = ref(false);
const dragging = ref(false);
const pos = reactive({ x: 0, y: 0 });

let startX = 0;
let startY = 0;
let originX = 0;
let originY = 0;
let moved = false;

function placeTopRight() {
  const width = btn.value?.offsetWidth ?? 220;
  const margin = 24;
  pos.x = Math.max(margin, window.innerWidth - width - margin);
  pos.y = Math.max(margin, 112);
}

function clampPosition() {
  const width = btn.value?.offsetWidth ?? 220;
  const height = btn.value?.offsetHeight ?? 48;
  const margin = 8;
  pos.x = Math.min(Math.max(margin, pos.x), window.innerWidth - width - margin);
  pos.y = Math.min(Math.max(margin, pos.y), window.innerHeight - height - margin);
}

function onPointerDown(event: PointerEvent) {
  if (event.button !== 0 && event.pointerType === "mouse") return;
  dragging.value = true;
  moved = false;
  startX = event.clientX;
  startY = event.clientY;
  originX = pos.x;
  originY = pos.y;
  (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
}

function onPointerMove(event: PointerEvent) {
  if (!dragging.value) return;
  const dx = event.clientX - startX;
  const dy = event.clientY - startY;
  if (!moved && Math.hypot(dx, dy) > 5) moved = true;
  pos.x = originX + dx;
  pos.y = originY + dy;
  clampPosition();
}

function onPointerUp(event: PointerEvent) {
  if (!dragging.value) return;
  dragging.value = false;
  (event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId);
  if (!moved) toggleGuide();
}

function onEnded() {
  playing.value = false;
}

/** The recording is not in the bundle yet: read the guide aloud instead. */
function onAudioError() {
  if (playing.value) speakFallback();
}

let spoken: SpeechSynthesisUtterance | null = null;

function speakFallback() {
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  spoken = new SpeechSynthesisUtterance(FALLBACK_GUIDE);
  spoken.onend = () => (playing.value = false);
  synth.speak(spoken);
}

function stopEverything() {
  playing.value = false;
  audio.value?.pause();
  window.speechSynthesis?.cancel();
}

function toggleGuide() {
  if (playing.value) {
    stopEverything();
    return;
  }

  const player = audio.value;
  if (!player) return;

  playing.value = true;
  player.currentTime = 0;
  const result = player.play();
  if (result && typeof result.catch === "function") {
    result.catch(() => speakFallback());
  }
}

onMounted(() => {
  placeTopRight();
  window.addEventListener("resize", clampPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", clampPosition);
  stopEverything();
});
</script>

<style module>
.guideBtn {
  position: fixed;
  z-index: 4000;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  height: 46px;
  padding: 0 18px;
  border-radius: 999px;
  border: 2px solid #97231e;
  background-color: #f7a319;
  color: #2b1b00;
  font-family: var(--font-inter);
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  cursor: grab;
  user-select: none;
  touch-action: none;
  box-shadow: 0 8px 22px rgba(43, 27, 0, 0.28);
  transition: background-color 0.18s ease, box-shadow 0.18s ease;
}

.guideBtn:hover {
  background-color: #ffb52c;
}

.dragging {
  cursor: grabbing;
  box-shadow: 0 14px 30px rgba(43, 27, 0, 0.34);
}

.playing {
  background-color: #fff3d6;
}

.icon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: #97231e;
}

.icon svg {
  width: 100%;
  height: 100%;
}

.label {
  line-height: 1;
}

@media (max-width: 640px) {
  .guideBtn {
    height: 44px;
    padding: 0 14px;
    font-size: 13px;
  }
}
</style>
