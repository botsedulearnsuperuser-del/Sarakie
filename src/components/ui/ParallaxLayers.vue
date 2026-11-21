<template>
  <div ref="rootRef" :class="[$style.root, className]">
    <div
      v-for="layer in layers"
      :key="layer.id"
      :class="$style.layer"
      :style="layerStyle(layer)"
    >
      <slot name="layer" :layer="layer">
        <span v-if="layer.content" v-html="layer.content" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

  export interface ParallaxLayer {
    blur?: number;
    content?: string;
    depth: number;
    id: string;
    opacity?: number;
  }

  export type ParallaxDirection = "vertical" | "horizontal" | "both";

  export interface ParallaxLayersProps {
    className?: string;
    container?: any;
    direction?: ParallaxDirection;
    layers: ParallaxLayer[];
    pointerParallax?: boolean;
    range?: number;
  }

  const props = withDefaults(defineProps<ParallaxLayersProps>(), {
    direction: "vertical",
    pointerParallax: false,
    range: 80,
  });

  const rootRef = ref<HTMLElement | null>(null);
  const containerProp = computed(() => props.container);
  const containerEl = computed<HTMLElement | null>(() => {
    const c = containerProp.value;
    if (!c) return null;
    if (typeof c === "object" && c !== null && "value" in c) {
      return (c as { value: HTMLElement | null }).value;
    }
    return c as HTMLElement;
  });

  const reducedMotion = ref(false);
  const hoverCapable = ref(false);

  onMounted(() => {
    if (typeof window === "undefined") return;
    reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    hoverCapable.value = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });

  const SCROLL_SPRING = 0.12;
  const POINTER_SPRING = 0.1;
  const POINTER_MAX_PX = 20;
  const DEFAULT_OFFSET_START = 0.95;
  const DEFAULT_OFFSET_END = 0.6;

  const progress = ref(0);
  const targetProgress = ref(0);
  const pointerX = ref(0);
  const pointerY = ref(0);
  const targetPointerX = ref(0);
  const targetPointerY = ref(0);

  function computeProgress() {
    const target = rootRef.value;
    if (!target) return;
    const useWindow = containerEl.value === null;
    const el: any = useWindow ? window : containerEl.value;
    if (!el) return;
    const containerRect = useWindow
      ? { top: 0, height: window.innerHeight }
      : (el as HTMLElement).getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const containerTop = containerRect.top;
    const containerHeight = containerRect.height || (useWindow ? window.innerHeight : (el as HTMLElement).clientHeight);
    const targetTop = targetRect.top - containerTop;
    const targetHeight = targetRect.height;
    const startTop = containerHeight * DEFAULT_OFFSET_START;
    const endTop = containerHeight * DEFAULT_OFFSET_END - targetHeight;
    const denom = startTop - endTop;
    if (denom === 0) return;
    const p = (startTop - targetTop) / denom;
    targetProgress.value = Math.min(1, Math.max(0, p));
  }

  function onScroll() {
    computeProgress();
  }

  function onPointerMove(event: PointerEvent) {
    if (!rootRef.value || !props.pointerParallax || !hoverCapable.value || reducedMotion.value) return;
    const rect = rootRef.value.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    targetPointerX.value = relX * POINTER_MAX_PX;
    targetPointerY.value = relY * POINTER_MAX_PX;
  }

  function onPointerLeave() {
    targetPointerX.value = 0;
    targetPointerY.value = 0;
  }

  let rafId = 0;
  function tick() {
    progress.value += (targetProgress.value - progress.value) * SCROLL_SPRING;
    pointerX.value += (targetPointerX.value - pointerX.value) * POINTER_SPRING;
    pointerY.value += (targetPointerY.value - pointerY.value) * POINTER_SPRING;
    rafId = requestAnimationFrame(tick);
  }

  onMounted(() => {
    computeProgress();
    rafId = requestAnimationFrame(tick);
    const useWindow = containerEl.value === null;
    const el: any = useWindow ? window : containerEl.value;
    if (el) {
      el.addEventListener("scroll", onScroll, { passive: true });
    }
    if (rootRef.value && props.pointerParallax) {
      rootRef.value.addEventListener("pointermove", onPointerMove);
      rootRef.value.addEventListener("pointerleave", onPointerLeave);
    }
  });

  onBeforeUnmount(() => {
    cancelAnimationFrame(rafId);
    const useW = containerEl.value === null;
    const el: any = useW ? window : containerEl.value;
    if (el) el.removeEventListener("scroll", onScroll);
    if (rootRef.value) {
      rootRef.value.removeEventListener("pointermove", onPointerMove);
      rootRef.value.removeEventListener("pointerleave", onPointerLeave);
    }
  });

  // Re-bind when container changes
  watch(containerEl, (newEl, oldEl) => {
    if (oldEl && oldEl !== (window as any)) (oldEl as HTMLElement).removeEventListener("scroll", onScroll);
    if (newEl || newEl === null) {
      const useW = newEl === null;
      const targetEl: any = useW ? window : newEl;
      if (targetEl) targetEl.addEventListener("scroll", onScroll, { passive: true });
      computeProgress();
    }
  });

  function layerStyle(layer: ParallaxLayer) {
    const depth = layer.depth ?? 0;
    const dir = props.direction || "vertical";
    const range = props.range ?? 80;
    const reduce = reducedMotion.value;
    const scrollVal = -range * depth + 2 * range * depth * progress.value;
    let x = 0;
    let y = 0;
    if (!(reduce || dir === "vertical")) {
      x = scrollVal + pointerX.value * depth;
    }
    if (!(reduce || dir === "horizontal")) {
      y = scrollVal + pointerY.value * depth;
    }
    const style: Record<string, string> = {
      transform: `translate3d(${x}px, ${y}px, 0)`,
    };
    if (layer.blur) style.filter = `blur(${layer.blur}px)`;
    if (layer.opacity != null) style.opacity = String(layer.opacity);
    return style;
  }
</script>

<style module>
  .root {
    position: relative;
  }
  .layer {
    position: absolute;
    inset: 0;
  }
</style>
