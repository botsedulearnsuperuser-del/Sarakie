<template>
  <div :class="$style.page">
    <h1 :class="$style.title">Project folders</h1>
    <p :class="$style.subtitle">Hover or click a folder to open. Click "Rename folder" / "Open" in the popup.</p>

    <div :class="$style.row">
      <div
        v-for="folder in folders"
        :key="folder.label"
        :class="$style.folderWrap"
        @click="selectFolder(folder.label)"
      >
        <FolderReveal
          :color="folder.color"
          :items="folder.items"
          :label="folder.label"
          :size="180"
          trigger="click"
        />
        <p :class="$style.caption">{{ folder.caption }}</p>
      </div>
    </div>

    <!-- small popup container -->
    <Transition name="pop">
      <div v-if="selected" :class="$style.popup" :style="popupStyle">
        <p :class="$style.popupTitle">{{ selected }}</p>
        <button :class="$style.popupBtn" type="button" @click="doRename">Rename folder</button>
        <button :class="$style.popupBtn" type="button" @click="doOpen">Open</button>
        <button :class="$style.popupClose" type="button" @click="selected = null">×</button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import FolderReveal from "../components/ui/FolderReveal.vue";
import type { FolderRevealItem } from "../components/ui/FolderReveal.vue";

interface FolderSpec {
  caption: string;
  color: "manila" | "brand" | "blue" | "green" | "slate";
  items: FolderRevealItem[];
  label: string;
}

const makeItems = (tint: string, names: string[]): FolderRevealItem[] =>
  names.map((name, i) => ({
    color: tint,
    content: `<div style="display:flex;flex-direction:column;gap:2px;padding:4px;"><div style="height:3px;border-radius:999px;background:rgba(0,0,0,0.15);width:${70 + (i % 3) * 10}%"></div><div style="height:3px;border-radius:999px;background:rgba(0,0,0,0.15);width:${50 + (i % 2) * 20}%"></div><div style="font-size:8px;margin-top:2px;color:#333;">${name}</div></div>`,
    id: `${name}-${i}`,
  }));

const folders: FolderSpec[] = [
  { caption: "Hover to open", color: "green", items: makeItems("oklch(0.97 0.014 150)", ["Kit A", "Kit B"]), label: "Irrigation Kit" },
  { caption: "Click to toggle", color: "blue", items: makeItems("oklch(0.96 0.03 250)", ["Dryer 1", "Dryer 2"]), label: "Solar Dryer" },
  { caption: "Click to toggle", color: "brand", items: makeItems("oklch(0.96 0.03 352)", ["Lesson 1", "Lesson 2"]), label: "Edu App" },
  { caption: "Click to toggle", color: "slate", items: makeItems("oklch(0.96 0.02 200)", ["Drone X", "Drone Y"]), label: "Agri Drone" },
];

const selected = ref<string | null>(null);
const popupStyle = computed(() => ({
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
}));

function selectFolder(label: string) {
  selected.value = label;
}
function doRename() {
  if (selected.value) alert(`Rename: ${selected.value}`);
  selected.value = null;
}
function doOpen() {
  if (selected.value) alert(`Open: ${selected.value}`);
  selected.value = null;
}
</script>

<style module>
.page {
  min-height: 100vh;
  padding: 40px 24px;
  background: var(--color-darkslategray-600, #0b3b2c);
  color: #ffffff;
  font-family: Poppins, var(--font-inter, sans-serif);
}
.title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px;
}
.subtitle {
  font-size: 14px;
  opacity: 0.8;
  margin: 0 0 32px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  align-items: flex-end;
}
.folderWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.caption {
  font-size: 11px;
  opacity: 0.7;
  margin: 0;
}
.popup {
  position: fixed;
  z-index: 50;
  background: #ffffff;
  color: var(--color-darkslategray-600, #0b3b2c);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
}
.popupTitle {
  font-weight: 600;
  margin: 0 0 4px;
  font-size: 14px;
}
.popupBtn {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: var(--color-darkslategray-600, #0b3b2c);
  color: #ffffff;
  font-size: 13px;
  cursor: pointer;
  text-align: left;
}
.popupBtn:hover {
  opacity: 0.9;
}
.popupClose {
  position: absolute;
  top: 6px;
  right: 8px;
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  color: #737373;
}
.pop-enter-active, .pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.pop-enter-from, .pop-leave-to {
  opacity: 0;
  transform: translate(-50%, -48%) scale(0.96);
}
</style>
