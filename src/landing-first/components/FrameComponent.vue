<template>
  <section :class="$style.section" id="how-it-works">
    <div :class="$style.overlay">
      <h2 :class="$style.title">One portal, every stage</h2>
      <p :class="$style.subtitle">
        From first submission to final approval, manage your whole innovation
        journey online.
      </p>
      <button :class="$style.button" type="button" @click="goToDashboard">
        <span>Start your application</span>
        <img alt="" src="/bitcoin-icons-arrow-right-filled.svg" />
      </button>
      <div :class="$style.mockupWrap">
        <img
          :class="$style.mockup"
          loading="lazy"
          alt="Desktop and mobile application preview"
          src="/Group-3@2x.png"
        />
        <!-- Frosted band over the top of the previews, fading out downwards -->
        <div :class="$style.mockupTopBlur" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goToDashboard = () => router.push({ name: "DashboardSample" });
</script>
<style module>
.section {
  width: 100%;
  background-image: url("/online-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.overlay {
  width: 100%;
  background: rgba(1, 53, 37, 0.55);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 72px 24px 40px;
  box-sizing: border-box;
  gap: 18px;
  text-align: center;
}
.title {
  margin: 0;
  color: var(--color-white);
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 900;
  font-family: var(--font-inter);
  max-width: 820px;
}
.subtitle {
  margin: 0;
  color: var(--color-white);
  font-size: var(--fs-22);
  font-weight: 600;
  font-family: var(--font-inter);
  max-width: 720px;
  line-height: 1.4;
}
.button {
  margin-top: 8px;
  height: 47px;
  border: none;
  border-radius: var(--br-12);
  background-color: #97231e;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  color: #ffffff;
  transition: background-color 0.2s ease;
  font-size: var(--fs-18);
  font-weight: 600;
  font-family: var(--font-inter);
  cursor: pointer;
}
.button:hover {
  background-color: #7d1b17;
}
.button img {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}
.mockupWrap {
  position: relative;
  width: 100%;
  max-width: 920px;
  margin-top: 20px;
}
.mockup {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}
.mockupTopBlur {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 28%;
  pointer-events: none;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.95) 30%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.95) 30%,
    rgba(0, 0, 0, 0) 100%
  );
  border-radius: 16px 16px 0 0;
}
@media screen and (max-width: 450px) {
  .overlay {
    padding: 48px 16px 28px;
  }
  .subtitle {
    font-size: var(--fs-16);
  }
}
</style>
