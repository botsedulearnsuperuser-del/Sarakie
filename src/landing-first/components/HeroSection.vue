<template>
  <section :class="$style.hero">
    <img
      :class="$style.patternLeft"
      alt=""
      src="/8917b8dbc1777d73b88cd8d55f299be4-png@2x.png"
    />
    <div :class="$style.content">
      <div :class="$style.labelGroup">
        <h3 :class="$style.rooted">CEDA INNOVATION PORTAL</h3>
        <div :class="$style.underline" />
      </div>
      <h1 :class="$style.headline">
        <span :class="$style.headlineLine">Bold Ideas,</span>
        <span :class="$style.headlineLine">
          Into&nbsp;<span :class="$style.future">Impact.</span>
        </span>
      </h1>
      <p :class="$style.subcopy">
        Submit your idea, track every review<br />
        stage and keep your team in the loop.
      </p>
      <div :class="$style.ctaRow">
        <button :class="$style.primaryBtn" type="button" @click="goToDashboard">
          <span>Submit your idea</span>
          <img alt="" src="/bitcoin-icons-arrow-right-filled.svg" />
        </button>
        <a :class="$style.agentLink" href="#how-it-works">See how it works</a>
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
  --color-maroon: #97231e;
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
  color: #eb6a30;
  font-size: var(--fs-18);
  font-weight: 600;
  letter-spacing: 0.06em;
  font-family: var(--font-inter);
}
.underline {
  width: 70px;
  height: 4px;
  background: linear-gradient(90deg, #8e1b2b 0%, #eb6a30 55%, #f2a81d 100%);
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
  color: #ffffff;
}
.subcopy {
  margin: 6px 0 0;
  color: #ffffff;
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
  background-color: #97231e;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  color: #ffffff;
  font-size: var(--fs-18);
  font-weight: 600;
  font-family: var(--font-inter);
  cursor: pointer;
}
.primaryBtn {
  transition: background-color 0.2s ease;
}
.primaryBtn:hover {
  background-color: #7d1b17;
}
.primaryBtn img {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}
.agentLink {
  color: var(--color-white);
  font-size: var(--fs-18);
  font-family: var(--font-inter);
  text-decoration: underline;
  text-underline-offset: 6px;
  text-decoration-thickness: 2px;
  text-decoration-color: #f2a81d;
  transition: color 0.2s ease;
}
.agentLink:hover {
  color: #f2a81d;
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
  background-color: var(--color-maroon);
}
.contentContainer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: clamp(72px, 10vw, 110px);
  background-color: var(--color-maroon);
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
@media screen and (max-width: 600px) {
  .hero {
    display: flex;
    flex-direction: column;
    min-height: unset;
  }
  .patternLeft {
    position: relative;
    width: 100%;
    height: 160px;
    object-fit: cover;
    object-position: center;
    opacity: 0.9;
  }
  .content {
    padding: 30px 24px 16px;
    max-width: 100%;
    gap: 14px;
  }
  .rooted {
    font-size: 15px;
    letter-spacing: 0.08em;
  }
  .underline {
    width: 64px;
    height: 3px;
  }
  .headline {
    font-size: clamp(42px, 12.5vw, 62px);
    line-height: 0.98;
  }
  .headlineLine {
    white-space: normal;
  }
  .subcopy {
    font-size: 16px;
    max-width: 100%;
  }
  .ctaRow {
    margin-top: 16px;
    gap: 22px;
  }
  .heroMedia {
    min-height: auto;
    margin-top: 4px;
  }
  .heroImage {
    width: 94%;
    max-width: 100%;
    max-height: 440px;
    margin-bottom: -6px;
  }
  .contentContainer {
    height: 24px;
  }
}
@media screen and (max-width: 450px) {
  .patternLeft {
    height: 120px;
  }
  .content {
    padding: 26px 20px 14px;
  }
  .headline {
    font-size: clamp(40px, 13vw, 56px);
  }
  .subcopy {
    font-size: 15px;
  }
  .ctaRow {
    gap: 18px;
  }
  .primaryBtn {
    height: 44px;
    font-size: 15px;
  }
  .agentLink {
    font-size: 15px;
  }
  .heroImage {
    width: 100%;
    max-height: 400px;
  }
  .contentContainer {
    height: 20px;
  }
}
</style>
