<template>
  <div :class="[$style.pointer, stateClass]" :style="positionStyle">
    <svg
      :class="$style.arrow"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"
      />
    </svg>
    <div
      :class="[$style.label, labelStateClass]"
      :style="{ backgroundColor }"
    >
      <slot>{{ title }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref, useCssModule } from "vue"

  defineOptions({ name: "FollowPointer" })

  const props = withDefaults(
    defineProps<{
      x: number
      y: number
      title?: string
      leaving?: boolean
    }>(),
    {
      title: "",
      leaving: false,
    },
  )

  const colors = [
    "#0ea5e9",
    "#737373",
    "#14b8a6",
    "#22c55e",
    "#3b82f6",
    "#ef4444",
    "#eab308",
  ]

  const styles = useCssModule()
  const backgroundColor = colors[Math.floor(Math.random() * colors.length)]
  const shown = ref(false)
  let frame: number | null = null

  onMounted(() => {
    frame = window.requestAnimationFrame(() => {
      shown.value = true
    })
  })

  onBeforeUnmount(() => {
    if (frame !== null) window.cancelAnimationFrame(frame)
  })

  const positionStyle = computed(() => ({
    top: `${props.y}px`,
    left: `${props.x}px`,
  }))

  const stateClass = computed(() => {
    if (props.leaving) return styles.pointerOut
    return shown.value ? styles.pointerIn : ""
  })

  const labelStateClass = computed(() => {
    if (props.leaving) return styles.labelOut
    return shown.value ? styles.labelIn : ""
  })
</script>

<style module>
  .pointer {
    position: absolute;
    z-index: 50;
    height: 16px;
    width: 16px;
    border-radius: 9999px;
    pointer-events: none;
    opacity: 0;
    transition:
      opacity 80ms ease-out,
      transform 80ms ease-out;
  }

  .pointerIn {
    opacity: 1;
    transform: scale(1);
  }

  .pointerOut {
    opacity: 0;
    transform: scale(0);
  }

  .arrow {
    height: 24px;
    width: 24px;
    transform: translate(-12px, -10px) rotate(-70deg);
    stroke: #0284c7;
    color: #0ea5e9;
  }

  .label {
    min-width: max-content;
    border-radius: 9999px;
    padding: 8px;
    font-family: var(--font-inter);
    font-size: 12px;
    line-height: 16px;
    white-space: nowrap;
    color: #ffffff;
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity 80ms ease-out,
      transform 120ms cubic-bezier(0.34, 1.3, 0.64, 1);
  }

  .labelIn {
    opacity: 1;
    transform: scale(1);
  }

  .labelOut {
    opacity: 0;
    transform: scale(0.5);
  }

  @media (prefers-reduced-motion: reduce) {
    .pointer,
    .label {
      transition: none;
    }
  }
</style>
