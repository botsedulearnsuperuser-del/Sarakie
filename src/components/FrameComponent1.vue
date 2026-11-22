<template>
  <section :class="$style.cta">
    <img :class="$style.pattern" alt="" src="/untitled-3-21.webp" />
    <div :class="$style.inner">
      <div :class="$style.textBlock">
        <h2 :class="$style.title">
          Your Next Step Starts<br />
          With an Idea
        </h2>
        <div :class="$style.line" />
      </div>
      <a :class="$style.button" href="#contact">
        <span>Start your submission today</span>
        <img alt="" src="/bitcoin-icons-arrow-right-filled.svg" />
      </a>
    </div>
  </section>
</template>
<style module>
.cta {
  width: 100%;
  position: relative;
  isolation: isolate;
  background: linear-gradient(to bottom, var(--color-goldenrod-100) 60%, #97231e 100%);
  overflow: hidden;
  min-height: 240px;
  display: flex;
  align-items: center;
}
.pattern {
  position: absolute;
  inset: 0;
  width: 140%;
  height: 140%;
  object-fit: cover;
  opacity: 0.18;
  pointer-events: none;
  z-index: 0;
}
.inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 56px 48px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}
.textBlock {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.title {
  margin: 0;
  color: var(--color-darkslategray-600);
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 900;
  font-family: var(--font-inter);
  line-height: 1.15;
}
.line {
  width: 170px;
  height: 3px;
  background-color: var(--color-darkslategray-600);
}
.button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-radius: var(--br-12);
  background-color: var(--color-darkslategray-600);
  color: var(--color-white);
  text-decoration: none;
  padding: 14px 18px;
  font-size: var(--fs-18);
  font-weight: 600;
  font-family: var(--font-inter);
  white-space: nowrap;
}
.button img {
  width: 24px;
  height: 24px;
  filter: invert(1);
}
@media screen and (max-width: 850px) {
  .inner {
    padding: 40px 24px;
  }
  .button {
    white-space: normal;
  }
}
</style>
