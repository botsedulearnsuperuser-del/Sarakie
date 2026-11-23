<template>
  <div :class="$style.landingPage">
    <img
      :class="$style.africanPatternLine"
      alt=""
      src="/African-Pattern-Line@2x.png"
    />
    <Navbar />
    <HeroSection />
    <img :class="$style.dividerShapeIcon" alt="" src="/Divider-Shape@2x.png" />
    <img
      :class="$style.contentContainerIcon"
      alt=""
      src="/Content-Container@2x.png"
    />
    <section :class="$style.mainWrapper">
      <img
        :class="$style.untitledDesign31"
        alt=""
        src="/Untitled-design-3-21@2x.png"
        data-scroll-to="untitledDesign31"
      />
      <WrapperContainer />
      <LoanCard />
    </section>
    <FrameComponent />
    <FrameComponent1 />
    <GroupComponent />
  </div>
</template>
<script setup lang="ts">
  import Navbar from "../components/Navbar.vue"
  import HeroSection from "../components/HeroSection.vue"
  import WrapperContainer from "../components/WrapperContainer.vue"
  import LoanCard from "../components/LoanCard.vue"
  import FrameComponent from "../components/FrameComponent.vue"
  import FrameComponent1 from "../components/FrameComponent1.vue"
  import GroupComponent from "../components/GroupComponent.vue"
</script>
<style module>
  .landingPage {
    width: 100%;
    position: relative;
    background-color: var(--color-darkslategray);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 27px var(--padding-0);
    box-sizing: border-box;
    isolation: isolate;
    line-height: normal;
    letter-spacing: normal;
  }
  .africanPatternLine {
    width: 232px;
    height: 1094px;
    position: absolute;
    margin: 0 !important;
    top: -311px;
    left: -54px;
    object-fit: cover;
    z-index: 5;
    flex-shrink: 0;
  }
  .dividerShapeIcon {
    width: 755px;
    height: 755px;
    position: absolute;
    margin: 0 !important;
    top: 136px;
    right: -61px;
    object-fit: cover;
    z-index: 3;
    flex-shrink: 0;
  }
  .contentContainerIcon {
    width: 100%;
    position: relative;
    max-width: 1507px;
    overflow: hidden;
    max-height: 100%;
    object-fit: cover;
    z-index: 3;
    flex-shrink: 0;
  }
  .mainWrapper {
    width: 100%;
    background-color: var(--color-seashell);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--padding-36) var(--padding-30) 61px;
    box-sizing: border-box;
    position: relative;
    isolation: isolate;
    max-width: 1507px;
    z-index: 5;
    flex-shrink: 0;
  }
  .untitledDesign31 {
    width: 703.8px;
    height: 981.8px;
    position: absolute;
    margin: 0 !important;
    top: calc(50% - 498.2px);
    right: -275.8px;
    object-fit: contain;
    z-index: 0;
    flex-shrink: 0;
  }

  @media screen and (max-width: 1482px) {
    .contentContainerIcon {
      max-width: 100%;
    }

    .mainWrapper {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 1225px) {
    .contentContainerIcon {
      max-width: 100%;
    }

    .mainWrapper {
      max-width: 100%;
    }
  }
  @media screen and (max-width: 850px) {
    .contentContainerIcon {
      max-width: 100%;
    }

    .mainWrapper {
      padding-top: 23px;
      padding-bottom: 40px;
      box-sizing: border-box;
      max-width: 100%;
    }
  }
  @media screen and (max-width: 450px) {
    .contentContainerIcon {
      max-width: 100%;
    }

    .mainWrapper {
      max-width: 100%;
    }
  }
</style>
