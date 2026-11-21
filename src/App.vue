<template>
  <router-view />
  <CookieConsent />
</template>

<script setup lang="ts">
import CookieConsent from "./components/ui/cookie-consent.vue";
</script>
