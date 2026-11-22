<template>
  <div :class="$style.trail">
    <div
      v-for="(step, i) in steps"
      :key="i"
      :class="[$style.row, step.heading ? $style.heading : '']"
    >
      <span :class="$style.label">{{ step.label }}</span>
      <span v-if="step.query" :class="$style.query">“{{ step.query }}”</span>
      <span v-if="step.meta" :class="$style.meta">{{ step.meta }}</span>
      <div v-if="step.sources?.length" :class="$style.sources">
        <a
          v-for="(s, j) in step.sources"
          :key="j"
          :class="$style.source"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span :class="$style.sourceTitle">{{ s.title }}</span>
          <span :class="$style.sourceDomain">{{ s.domain }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface WebSearchSource {
  title: string
  domain: string
  href: string
}

export interface WebSearchStep {
  label: string
  query?: string
  meta?: string
  sources?: WebSearchSource[]
  heading?: boolean
}

defineProps<{ steps: WebSearchStep[] }>()
</script>

<style module>
.trail {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 8px 0 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background-color: var(--color-floralwhite);
  border: 1px solid var(--color-antiquewhite-200);
  font-size: 12.5px;
  color: var(--color-darkslategray-300);
}
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
}
.heading {
  font-weight: 700;
  color: var(--color-darkslategray-500);
  border-bottom: 1px solid var(--color-antiquewhite-200);
  padding-bottom: 4px;
  margin-bottom: 2px;
}
.label {
  font-weight: 600;
}
.query {
  font-style: italic;
  color: var(--color-darkslategray-500);
}
.meta {
  color: var(--color-darkslategray-100);
}
.sources {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
  padding-left: 12px;
}
.source {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--color-darkslategray-500);
  padding: 4px 6px;
  border-radius: 6px;
  border: 1px solid var(--color-lightgray-200);
  background-color: var(--color-white);
}
.source:hover {
  background-color: var(--color-blanchedalmond);
}
.sourceTitle {
  font-weight: 600;
  font-size: 12px;
}
.sourceDomain {
  font-size: 11px;
  color: var(--color-darkslategray-100);
}
</style>