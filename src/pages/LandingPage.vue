<template>
  <div :class="$style.landingPage">
    <Navbar />
    <HeroSection />
    <section :class="$style.loansSection" id="loans">
      <InnerContainer />
    </section>
    <FrameComponent />
    <FrameComponent1 />
    <GroupComponent />
  </div>
</template>
<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import HeroSection from "../components/HeroSection.vue";
import InnerContainer from "../components/InnerContainer.vue";
import FrameComponent from "../components/FrameComponent.vue";
import FrameComponent1 from "../components/FrameComponent1.vue";
import GroupComponent from "../components/GroupComponent.vue";
</script>
<style module>
.landingPage {
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-darkslategray-600);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  letter-spacing: normal;
}
.loansSection {
  width: 100%;
  background-color: var(--color-seashell);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 72px 40px 80px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
@media screen and (max-width: 850px) {
  .loansSection {
    padding: 48px 20px 56px;
  }
}
</style>
