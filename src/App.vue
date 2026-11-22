<template>
  <router-view />
  <MfaGate />
  <LegalNotice />
  <TwoFactorSetup
    :open="mfaSetupOpen"
    @close="mfaSetupOpen = false"
    @enabled="onEnabled"
  />
</template>

<script setup lang="ts">
import LegalNotice from "./components/ui/legal-notice.vue";
import MfaGate from "./components/MfaGate.vue";
import TwoFactorSetup from "./components/TwoFactorSetup.vue";
import { mfaSetupOpen, refreshMfa } from "./lib/mfa";

function onEnabled() {
  mfaSetupOpen.value = false;
  void refreshMfa();
  window.dispatchEvent(new CustomEvent("sarka-2fa-changed"));
}
</script>
