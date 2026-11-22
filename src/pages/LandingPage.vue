<template>
  <div :class="$style.landingPage">
    <Navigation7 />
    <HeroSection />
    <section :class="$style.loansSection" id="loans">
      <InnerContainer />
    </section>
    <FeaturesBento />
    <PerformanceOverview />
    <Testimonials />
    <FrameComponent />
    <FrameComponent1 />
    <FaqCategorized :dark="true" />
    <Footer2 />
  </div>
</template>
<script setup lang="ts">
import Navigation7 from "../components/ui/navigation7.vue";
import HeroSection from "../components/HeroSection.vue";
import InnerContainer from "../components/InnerContainer.vue";
import FeaturesBento from "../components/FeaturesBento.vue";
import PerformanceOverview from "../components/PerformanceOverview.vue";
import Testimonials from "../components/Testimonials.vue";
import FrameComponent from "../components/FrameComponent.vue";
import FrameComponent1 from "../components/FrameComponent1.vue";
import Footer2 from "../components/ui/footer2.vue";
import FaqCategorized from "../components/ui/FaqCategorized.vue";
</script>
<style module>
.landingPage {
  width: 100%;
  min-height: 100vh;
  background-color: #97231e;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  letter-spacing: normal;
}
.loansSection {
  width: 100%;
  background: linear-gradient(to bottom, #97231e 0%, #f7c613 35%, #f7c613 65%, #2b1b00 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 72px 24px 80px;
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
