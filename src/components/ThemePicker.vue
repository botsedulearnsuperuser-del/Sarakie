<template>
  <Teleport to="body">
    <div v-if="open" :class="$style.overlay" @click.self="emit('close')">
      <div :class="$style.modal" role="dialog" aria-modal="true" aria-labelledby="theme-picker-title">
        <header :class="$style.header">
          <div :class="$style.headerText">
            <h3 id="theme-picker-title" :class="$style.title">Dashboard background</h3>
            <p :class="$style.sub">Pick a theme — it becomes the background of your dashboard.</p>
          </div>
          <button :class="$style.closeBtn" type="button" aria-label="Close" @click="emit('close')">
            &times;
          </button>
        </header>

        <div :class="$style.grid">
          <button
            v-for="theme in dashboardThemes"
            :key="theme.id"
            :class="[$style.tile, selected === theme.id ? $style.tileActive : '']"
            type="button"
            @click="choose(theme.id)"
          >
            <span :class="$style.imageWrap">
              <img :src="theme.image" :alt="theme.name" :class="$style.image" />
              <span v-if="selected === theme.id" :class="$style.check">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            </span>
            <span :class="$style.name">{{ theme.name }}</span>
          </button>

          <button
            :class="[$style.tile, selected === CUSTOM_THEME_ID ? $style.tileActive : '']"
            type="button"
            @click="fileInput?.click()"
          >
            <span :class="$style.imageWrap">
              <img v-if="customImage" :src="customImage" alt="Your uploaded image" :class="$style.image" />
              <span v-else :class="$style.uploadEmpty">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 16V4" />
                  <path d="m7 9 5-5 5 5" />
                  <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                </svg>
                <span :class="$style.uploadText">Upload from your folder</span>
              </span>
              <span v-if="selected === CUSTOM_THEME_ID" :class="$style.check">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            </span>
            <span :class="$style.name">{{ customImage ? "Your image" : "Upload your own" }}</span>
          </button>
        </div>

        <p v-if="uploadError" :class="$style.uploadError">{{ uploadError }}</p>

        <input
          ref="fileInput"
          :class="$style.fileInput"
          type="file"
          accept="image/*"
          @change="onFileSelected"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CUSTOM_THEME_ID, dashboardThemes } from "./themes";

defineProps<{
  open: boolean;
  selected: string;
  customImage?: string;
}>();

const emit = defineEmits<{
  close: [];
  select: [themeId: string];
  "select-custom": [dataUrl: string];
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const uploadError = ref("");

function choose(themeId: string) {
  emit("select", themeId);
}

/** Shrink the picked photo so the saved data URL stays small enough for localStorage. */
function toBackgroundDataUrl(source: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const maxWidth = 1600;
      const scale = Math.min(1, maxWidth / image.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("no-canvas"));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    image.onerror = () => reject(new Error("decode"));
    image.src = source;
  });
}

function onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  uploadError.value = "";
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    uploadError.value = "Please choose an image file (JPG, PNG, WebP…).";
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const dataUrl = await toBackgroundDataUrl(String(reader.result));
      emit("select-custom", dataUrl);
    } catch {
      uploadError.value = "That image could not be read. Try a different file.";
    }
  };
  reader.onerror = () => {
    uploadError.value = "That file could not be opened.";
  };
  reader.readAsDataURL(file);
}
</script>

<style module>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 10002;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  font-family: var(--font-inter);
}

.modal {
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 26px 18px;
  border-bottom: 1px solid #ede9e1;
}

.headerText {
  min-width: 0;
}

.title {
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 800;
  color: #0f2e24;
}

.sub {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}

.closeBtn {
  border: none;
  background: none;
  font-size: 28px;
  line-height: 1;
  color: #6b7280;
  cursor: pointer;
  padding: 0 4px;
  flex-shrink: 0;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 22px 26px 10px;
  overflow-y: auto;
}

.tile {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  font-family: var(--font-inter);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
}

.tile:hover {
  border-color: #9ca3af;
  transform: translateY(-1px);
}

.tileActive {
  border-color: #0f2e24;
  box-shadow: 0 0 0 2px rgba(15, 46, 36, 0.15);
}

.imageWrap {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f3f4f6;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.uploadEmpty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #0f2e24;
  background-color: #f7f6f2;
  border: 2px dashed #c9c4b8;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 8px;
  text-align: center;
}

.uploadText {
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.3;
}

.check {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #0f2e24;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name {
  font-size: 13.5px;
  font-weight: 700;
  color: #0f2e24;
}

.uploadError {
  margin: 0;
  padding: 0 26px 22px;
  font-size: 13px;
  color: #b42318;
}

.fileInput {
  display: none;
}

@media screen and (max-width: 520px) {
  .overlay {
    padding: 12px;
  }

  .grid {
    gap: 10px;
    padding: 16px 16px 8px;
  }

  .header {
    padding: 18px 16px 14px;
  }

  .uploadError {
    padding: 0 16px 16px;
  }
}
</style>
