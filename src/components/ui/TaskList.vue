<template>
  <div :class="$style.card">
    <div :class="$style.header">
      <span :class="$style.title">{{ title }}</span>
      <span :class="$style.progress">{{ completed }}/{{ total }}</span>
    </div>
    <div :class="$style.track">
      <div :class="$style.fill" :style="{ width: progress + '%' }" />
    </div>
    <ul :class="$style.list">
      <li v-for="task in tasks" :key="task.id" :class="[$style.item, task.done ? $style.itemDone : '']">
        <span :class="[$style.check, task.done ? $style.checkDone : '']">
          <svg v-if="task.done" viewBox="0 0 24 24" width="12" height="12" fill="none" aria-hidden="true">
            <path d="m4 12 5 5L20 6" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span :class="$style.label">{{ task.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

interface Task { id: string; label: string; done: boolean }

const props = withDefaults(defineProps<{
  title?: string
  tasks?: Task[]
}>(), {
  title: "Task list",
  tasks: () => [],
})

const total = computed(() => props.tasks.length)
const completed = computed(() => props.tasks.filter((t) => t.done).length)
const progress = computed(() => (total.value ? Math.round((completed.value / total.value) * 100) : 0))
</script>

<style module>
.card {
  border-radius: 14px;
  background-color: #ffffff;
  border: 1px solid var(--color-antiquewhite-200);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: var(--font-inter);
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-darkslategray-500);
}
.progress { color: var(--color-darkslategray-100); font-weight: 600; }
.track {
  height: 6px;
  border-radius: 999px;
  background-color: #ece6db;
  overflow: hidden;
}
.fill {
  height: 100%;
  border-radius: 999px;
  background-color: var(--color-goldenrod-200);
  transition: width 0.3s ease;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--color-darkslategray-300);
}
.itemDone .label { color: var(--color-darkslategray-100); text-decoration: line-through; }
.check {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid #d8d1c4;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;
}
.checkDone {
  border-color: var(--color-darkslategray-500);
  background-color: var(--color-darkslategray-500);
  color: #ffffff;
}
.label { line-height: 1.4; }
</style>