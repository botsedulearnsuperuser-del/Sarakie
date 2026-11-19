<template>
  <span ref="containerRef" :class="[$style.container, containerClassName]">
    <slot />

    <span
      v-if="hasDimensions"
      :class="[$style.overlay, inView ? $style.overlayVisible : '']"
      aria-hidden="true"
    >
      <span :class="[$style.rectangle, rectangleClassName]" :style="rectangleStyle" />

      <span :class="$style.pointerAnchor" :style="pointerStyle">
        <svg
          :class="[$style.pointer, pointerClassName]"
          viewBox="0 0 16 16"
          width="1em"
          height="1em"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"
          />
        </svg>
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

defineOptions({ name: "PointerHighlight" });

defineProps<{
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
}>();

const containerRef = ref<HTMLSpanElement | null>(null);
const dimensions = ref({ width: 0, height: 0 });
const inView = ref(false);

let resizeObserver: ResizeObserver | null = null;
let intersectionObserver: IntersectionObserver | null = null;

const hasDimensions = computed(
  () => dimensions.value.width > 0 && dimensions.value.height > 0,
);

const rectangleStyle = computed(() => ({
  width: inView.value ? `${dimensions.value.width}px` : "0px",
  height: inView.value ? `${dimensions.value.height}px` : "0px",
}));

const pointerStyle = computed(() => ({
  opacity: inView.value ? "1" : "0",
  transform: inView.value
    ? `translate(${dimensions.value.width + 4}px, ${dimensions.value.height + 4}px) rotate(-90deg)`
    : "translate(0px, 0px) rotate(-90deg)",
}));

function measure() {
  if (!containerRef.value) return;
  const { width, height } = containerRef.value.getBoundingClientRect();
  dimensions.value = { width, height };
}

onMounted(() => {
  measure();

  if (!containerRef.value) return;

  resizeObserver = new ResizeObserver(() => measure());
  resizeObserver.observe(containerRef.value);

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          inView.value = false;
          continue;
        }
        // Paint the 0×0 state first so the border draw transition runs.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            inView.value = true;
          });
        });
      }
    },
    { threshold: 0.25 },
  );
  intersectionObserver.observe(containerRef.value);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  intersectionObserver?.disconnect();
});
</script>

<style module>
.container {
  position: relative;
  display: inline-block;
  width: fit-content;
  max-width: 100%;
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.95);
  transform-origin: top left;
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

.overlayVisible {
  opacity: 1;
  transform: scale(1);
}

.rectangle {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border: 1px solid #262626;
  transition:
    width 1s ease-in-out,
    height 1s ease-in-out;
}

.pointerAnchor {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  pointer-events: none;
  transition:
    opacity 0.1s ease-in-out,
    transform 1s ease-in-out;
}

.pointer {
  display: block;
  height: 1.25rem;
  width: 1.25rem;
  color: #3b82f6;
}

@media (prefers-reduced-motion: reduce) {
  .overlay,
  .rectangle,
  .pointerAnchor {
    transition: none;
  }
}
</style>
