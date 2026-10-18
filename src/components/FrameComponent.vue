<template>
  <section :class="$style.section" id="how-it-works">
    <div :class="$style.overlay">
      <h2 :class="$style.title">Online Loan Application</h2>
      <p :class="$style.subtitle">
        Loan applications available online, use our mobile friendly website to
        apply
      </p>
      <button :class="$style.button" type="button" @click="goToDashboard">
        <span>Apply Online</span>
        <img alt="" src="/bitcoin-icons-arrow-right-filled.svg" />
      </button>
      <img
        :class="$style.mockup"
        loading="lazy"
        alt="Desktop and mobile application preview"
        src="/Group-3@2x.png"
      />
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
.button img {
  width: 24px;
  height: 24px;
}
.mockup {
  width: 100%;
  max-width: 920px;
  height: auto;
  margin-top: 20px;
  object-fit: contain;
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
