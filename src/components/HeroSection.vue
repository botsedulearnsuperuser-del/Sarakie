<template>
  <section :class="$style.hero">
    <img
      :class="$style.patternLeft"
      alt=""
      src="/8917b8dbc1777d73b88cd8d55f299be4-png@2x.png"
    />
    <div :class="$style.content">
      <div :class="$style.labelGroup">
        <h3 :class="$style.rooted">ROOTED IN BOTSWANA</h3>
        <div :class="$style.underline" />
      </div>
      <h1 :class="$style.headline">
        <span :class="$style.headlineLine">Great Financing</span>
        <span :class="$style.headlineLine">
          For your&nbsp;<span :class="$style.future">future.</span>
        </span>
      </h1>
      <p :class="$style.subcopy">
        Explore affordable loan options<br />
        for life’s everyday needs.
      </p>
      <div :class="$style.ctaRow">
        <button :class="$style.primaryBtn" type="button" @click="goToDashboard">
          <span>Get a loan</span>
          <img alt="" src="/bitcoin-icons-arrow-right-filled.svg" />
        </button>
        <a :class="$style.agentLink" href="#contact">Talk to an Agent</a>
      </div>
    </div>
    <div :class="$style.heroMedia">
      <img :class="$style.heroImage" alt="" :src="heroImageSrc" />
    </div>
    <img
      :class="$style.contentContainer"
      alt=""
      src="/Content-Container@2x.png"
    />
  </section>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const heroImageSrc = encodeURI("/6 2.png");

const goToDashboard = () => {
  router.push({ name: "DashboardSample" });
};
</script>
<style module>
.hero {
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  align-items: stretch;
  min-height: 640px;
  background-color: var(--color-darkslategray-600);
  overflow: hidden;
  isolation: isolate;
}
.patternLeft {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: clamp(90px, 11vw, 160px);
  height: 100%;
  pointer-events: none;
  z-index: 1;
  object-fit: cover;
  object-position: center top;
  opacity: 0.85;
}
.content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 56px 40px 110px clamp(120px, 14vw, 200px);
  box-sizing: border-box;
  max-width: 720px;
  gap: 16px;
}
.labelGroup {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}
.rooted {
  margin: 0;
  color: var(--color-goldenrod-300);
  font-size: var(--fs-18);
  font-weight: 600;
  letter-spacing: 0.06em;
  font-family: var(--font-inter);
}
.underline {
  width: 70px;
  height: 4px;
  background-color: var(--color-goldenrod-300);
}
.headline {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: var(--color-white);
  font-size: clamp(48px, 6.8vw, 91px);
  line-height: 0.95;
  letter-spacing: -0.02em;
  font-weight: 900;
  font-family: var(--font-inter);
}
.headlineLine {
  display: block;
  white-space: nowrap;
}
.future {
  color: var(--color-goldenrod-300);
}
.subcopy {
  margin: 6px 0 0;
  color: var(--color-goldenrod-300);
  font-size: var(--fs-18);
  font-weight: 500;
  font-family: var(--font-inter);
  line-height: 1.45;
  max-width: 340px;
}
.ctaRow {
  margin-top: 28px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 28px;
}
.primaryBtn {
  height: 47px;
  border: none;
  border-radius: var(--br-12);
  background-color: var(--color-goldenrod-300);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  color: var(--color-darkslategray-600);
  font-size: var(--fs-18);
  font-weight: 600;
  font-family: var(--font-inter);
  cursor: pointer;
}
.primaryBtn img {
  width: 24px;
  height: 24px;
}
.agentLink {
  color: var(--color-white);
  font-size: var(--fs-18);
  font-family: var(--font-inter);
  text-decoration: underline;
  text-underline-offset: 6px;
  text-decoration-thickness: 2px;
  text-decoration-color: var(--color-goldenrod-300);
}
.heroMedia {
  position: relative;
  z-index: 4;
  min-height: 560px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: visible;
}
.heroImage {
  position: relative;
  z-index: 4;
  width: 100%;
  max-width: 640px;
  height: auto;
  max-height: 620px;
  object-fit: contain;
  object-position: center bottom;
  display: block;
  margin-bottom: -36px;
  mix-blend-mode: lighten;
}
.contentContainer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: clamp(72px, 10vw, 110px);
  object-fit: fill;
  pointer-events: none;
  z-index: 2;
}

@media screen and (max-width: 1050px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: unset;
  }
  .patternLeft {
    width: 72px;
  }
  .content {
    padding: 48px 28px 40px 100px;
    max-width: 100%;
  }
  .heroMedia {
    min-height: 420px;
  }
  .heroImage {
    margin-bottom: -24px;
  }
}
@media screen and (max-width: 450px) {
  .patternLeft {
    width: 48px;
  }
  .content {
    padding: 36px 20px 32px 68px;
  }
  .headlineLine {
    white-space: normal;
  }
  .subcopy {
    font-size: var(--fs-16);
  }
  .ctaRow {
    gap: 18px;
  }
  .heroMedia {
    min-height: 340px;
  }
  .heroImage {
    max-height: 380px;
    margin-bottom: -16px;
  }
  .contentContainer {
    height: 64px;
  }
}
</style>
