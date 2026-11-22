<template>
  <Teleport to="body">
    <div v-if="open" :class="$style.overlay" role="dialog" aria-modal="true" aria-labelledby="edit-consent-title">
      <div :class="$style.card">
        <h2 id="edit-consent-title" :class="$style.title">Enable document editing mode</h2>
        <p :class="$style.text">
          This mode lets the CEDA Innovation Assistant read your uploaded documents
          and propose edits to them on your request. Nothing is changed without your
          approval.
        </p>
        <ul :class="$style.list">
          <li>Your document content is sent to the AI assistant (the configured model provider) to generate replies; it is not published by the portal, but it does leave this chat to that provider.</li>
          <li>Do not enable this mode for documents you are not comfortable sharing with the model provider.</li>
          <li>You can disconnect and stop editing at any time.</li>
          <li>The assistant only proposes edits; you decide what to keep.</li>
        </ul>

        <label :class="$style.checkRow">
          <input
            type="checkbox"
            :checked="agreed"
            :disabled="busy"
            @change="agreed = ($event.target as HTMLInputElement).checked"
          />
          <span>I understand and consent to the assistant reading and proposing edits to my documents in this chat.</span>
        </label>

        <p v-if="error" :class="$style.error" role="alert">{{ error }}</p>

        <div :class="$style.actions">
          <button
            :class="$style.primary"
            type="button"
            :disabled="!agreed || busy"
            @click="onAgree"
          >
            {{ busy ? "Enabling…" : "I agree and continue" }}
          </button>
          <button
            :class="$style.secondary"
            type="button"
            :disabled="busy"
            @click="onDecline"
          >
            I don't consent
          </button>
        </div>

        <button
          v-if="editModeActive"
          :class="$style.disconnect"
          type="button"
          :disabled="busy"
          @click="onDisconnect"
        >
          Disconnect edit mode
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"

const props = defineProps<{
  open: boolean
  editModeActive?: boolean
}>()

const emit = defineEmits<{
  agree: []
  decline: []
  disconnect: []
}>()

const agreed = ref(false)
const busy = ref(false)
const error = ref("")

function onAgree() {
  if (!agreed.value) {
    error.value = "Please tick the consent box to continue."
    return
  }
  error.value = ""
  busy.value = true
  emit("agree")
  busy.value = false
}

function onDecline() {
  agreed.value = false
  error.value = ""
  emit("decline")
}

function onDisconnect() {
  agreed.value = false
  error.value = ""
  emit("disconnect")
}

// Reset checkbox when modal closes
watch(() => props.open, (o) => {
  if (!o) {
    agreed.value = false
    error.value = ""
    busy.value = false
  }
})
</script>

<style module>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 90001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgba(11, 26, 20, 0.55);
  backdrop-filter: blur(3px);
  font-family: var(--font-inter);
}
.card {
  width: 100%;
  max-width: 640px;
  padding: 26px 24px 22px;
  box-sizing: border-box;
  border-radius: 16px;
  border: 1px solid var(--color-antiquewhite-200);
  background-color: #ffffff;
  box-shadow: 0 24px 60px -16px rgba(1, 53, 37, 0.45);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.title {
  margin: 4px 0 0;
  font-size: 18px;
  font-weight: 800;
  color: #1f2933;
}
.text {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #525252;
}
.list {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  line-height: 1.5;
  color: #525252;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.checkRow {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  line-height: 1.5;
  color: #374151;
  cursor: pointer;
  padding: 6px 0;
}
.checkRow input {
  margin-top: 3px;
  flex-shrink: 0;
  cursor: pointer;
}
.error {
  margin: 0;
  font-size: 12.5px;
  font-weight: 600;
  color: #b42318;
}
.actions {
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 4px;
}
.actions > button {
  flex: 1;
}
.primary {
  height: 40px;
  border: none;
  border-radius: 8px;
  background-color: var(--color-darkslategray-500);
  color: #ffffff;
  font-family: var(--font-inter);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
}
.primary:hover:not(:disabled) { background-color: var(--color-darkslategray-600); }
.primary:disabled { opacity: 0.45; cursor: not-allowed; }
.secondary {
  height: 36px;
  border: 1px solid var(--color-lightgray-200);
  border-radius: 8px;
  background-color: #ffffff;
  color: var(--color-darkslategray-300);
  font-family: var(--font-inter);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.secondary:hover:not(:disabled) { background-color: var(--color-blanchedalmond); }
.disconnect {
  border: none;
  background: none;
  padding: 4px 0;
  font-family: var(--font-inter);
  font-size: 12.5px;
  font-weight: 600;
  color: #b42318;
  text-decoration: underline;
  cursor: pointer;
  align-self: flex-start;
}
</style>