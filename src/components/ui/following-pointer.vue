<template>
  <div
    ref="cardRef"
    :class="[$style.card, className]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
  >
    <FollowPointer
      v-if="isInside"
      :x="x"
      :y="y"
      :title="title"
      :leaving="leaving"
    >
      <slot name="title" />
    </FollowPointer>
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import FollowPointer from "./follow-pointer.vue"

  defineOptions({ name: "FollowerPointerCard" })

  withDefaults(
    defineProps<{
      className?: string
      title?: string
    }>(),
    {
      className: "",
      title: "",
    },
  )

  const EXIT_MS = 50

  const cardRef = ref<HTMLDivElement | null>(null)
  const x = ref(0)
  const y = ref(0)
  const isInside = ref(false)
  const leaving = ref(false)
  let leaveTimer: number | null = null

  function track(event: MouseEvent) {
    const el = cardRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.value = event.clientX - rect.left
    y.value = event.clientY - rect.top
  }

  function handleMouseMove(event: MouseEvent) {
    track(event)
  }

  function handleMouseEnter(event: MouseEvent) {
    if (leaveTimer !== null) {
      clearTimeout(leaveTimer)
      leaveTimer = null
    }
    leaving.value = false
    isInside.value = true
    track(event)
  }

  function handleMouseLeave() {
    leaving.value = true
    leaveTimer = window.setTimeout(() => {
      isInside.value = false
      leaving.value = false
      leaveTimer = null
    }, EXIT_MS)
  }
</script>

<style module>
  .card {
    position: relative;
  }
</style>
