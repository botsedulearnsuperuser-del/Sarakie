<template>
  <div :class="$style.wrap">
    <Skeleton
      v-for="i in lines"
      :key="i"
      shape="text"
      :width="i === lines && lines > 1 ? '70%' : '100%'"
      :height="lineHeight"
      :class="$style.line"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Skeleton from "./Skeleton.vue";

const props = withDefaults(
  defineProps<{
    lines?: number;
    lineHeight?: string | number;
    gap?: string | number;
  }>(),
  {
    lines: 2,
    lineHeight: "1.25rem",
    gap: "0.5rem",
  },
);

const gapCss = computed(() =>
  typeof props.gap === "number" ? `${props.gap}px` : String(props.gap),
);
</script>

<style module>
.wrap {
  display: flex;
  flex-direction: column;
  gap: v-bind(gapCss);
}
.line {
  display: block;
}
</style>
