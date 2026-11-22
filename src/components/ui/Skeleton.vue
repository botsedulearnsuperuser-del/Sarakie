<template>
  <span :class="[$style.skeleton, $style[shape]]" :style="styleObj" aria-hidden="true" />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    shape?: "circle" | "rect" | "text";
    width?: string | number;
    height?: string | number;
    radius?: string | number;
  }>(),
  {
    shape: "rect",
    width: "100%",
    height: "1rem",
    radius: undefined,
  },
);

function toCss(v: string | number | undefined): string | undefined {
  if (v === undefined || v === null) return undefined;
  return typeof v === "number" ? `${v}px` : String(v);
}

const styleObj = computed(() => {
  const s: Record<string, string> = {};
  const w = toCss(props.width);
  const h = toCss(props.height);
  if (w) s.width = w;
  if (h) s.height = h;
  if (props.radius !== undefined) {
    const r = toCss(props.radius);
    if (r) s.borderRadius = r;
  }
  return s;
});
</script>

<style module>
.skeleton {
  display: inline-block;
  background: linear-gradient(90deg, #ece7dd 0%, #f5f1e8 50%, #ece7dd 100%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  vertical-align: middle;
}

.circle {
  border-radius: 9999px;
  aspect-ratio: 1 / 1;
}

.rect {
  border-radius: 12px;
}

.text {
  border-radius: 6px;
  height: 1.25rem;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
  }
}
</style>
