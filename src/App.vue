<template>
  <router-view />
  <LegalNotice />
  <MfaGate />
</template>

<script setup lang="ts">
import LegalNotice from "./components/ui/legal-notice.vue";
import MfaGate from "./components/MfaGate.vue";
</script>
