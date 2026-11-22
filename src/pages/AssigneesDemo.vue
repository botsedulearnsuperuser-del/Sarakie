<template>
  <div :class="$style.page">
    <h1 :class="$style.title">Assignees component demo</h1>
    <p :class="$style.subtitle">Preview of the ported Bencho Assignees component. Click the pill to open the list and toggle assignees.</p>

    <div :class="$style.row">
      <div :class="$style.card">
        <h2 :class="$style.cardTitle">Default (Row, overlap 10)</h2>
        <Assignees />
      </div>
      <div :class="$style.card">
        <h2 :class="$style.cardTitle">Overlap 0 (separate circles)</h2>
        <Assignees :overlap="0" />
      </div>
      <div :class="$style.card">
        <h2 :class="$style.cardTitle">Grid / Quad mode</h2>
        <Assignees stack="Grid" />
      </div>
      <div :class="$style.card">
        <h2 :class="$style.cardTitle">Corner 0 (square)</h2>
        <Assignees :corner="0" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Assignees from "../components/ui/Assignees.vue";
</script>

<style module>
.page {
  padding: 32px;
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #f4efe6;
}
.title {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 800;
  color: #013626;
}
.subtitle {
  margin: 0 0 24px;
  font-size: 14px;
  color: #525252;
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.card {
  background-color: #ffffff;
  border: 1px solid #e3dccb;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  min-width: 300px;
}
.cardTitle {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 700;
  color: #013626;
}
</style>