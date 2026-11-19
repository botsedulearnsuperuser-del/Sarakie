<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";

const containerRef = ref<HTMLDivElement | null>(null);
const dimensions = ref({ width: 0, height: 0 });
const show = ref(false);

onMounted(async () => {
  await nextTick();
  if (containerRef.value) {
    const { width, height } = containerRef.value.getBoundingClientRect();
    dimensions.value = { width, height };
    setTimeout(() => { show.value = true; }, 300);
  }
});

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    dimensions.value = {
      width: entry.contentRect.width,
      height: entry.contentRect.height,
    };
  }
});

onMounted(() => {
  if (containerRef.value) {
    resizeObserver.observe(containerRef.value);
  }
});

onUnmounted(() => {
  if (containerRef.value) {
    resizeObserver.unobserve(containerRef.value);
  }
});

const highlightWidth = computed(() => show.value && dimensions.value.width > 0 ? dimensions.value.width : 0);
const highlightHeight = computed(() => show.value && dimensions.value.height > 0 ? dimensions.value.height : 0);
</script>

<template>
  <div
    class="relative w-fit"
    ref="containerRef"
  >
    <slot />

    <div
      class="pointer-events-none absolute inset-0 z-0 w-full h-full"
      :style="{
        width: highlightWidth + 'px',
        height: highlightHeight + 'px',
        border: '2px solid #B45309',
        borderRadius: '4px',
        background: 'rgba(245, 158, 11, 0.25)',
        transition: 'all 0.8s ease-out'
      }"
    ></div>

    <div
      class="pointer-events-none absolute"
      :style="{
        opacity: show && dimensions.width > 0 ? 1 : 0,
        transition: 'opacity 0.5s ease-in',
        transform: `translate(${dimensions.width + 8}px, ${dimensions.height / 2 - 10}px) rotate(90deg)`
      }"
    >
      <svg
        class="h-5 w-5 text-amber-500"
        viewBox="0 0 16 16"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </svg>
    </div>
  </div>
</template>