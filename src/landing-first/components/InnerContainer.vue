<template>
  <div :class="$style.wrap">
    <header :class="$style.header">
      <div :class="$style.headerLine" />
      <h2 :class="$style.title">Built for Botswana's innovators</h2>
      <p :class="$style.subtitle">
        CEDA supports founders, researchers and problem-solvers turning bold ideas into real impact.
      </p>
    </header>

    <div :class="$style.cards">
      <article
        v-for="card in cards"
        :key="card.title"
        :class="$style.card"
      >
        <img :class="$style.icon" alt="" src="/Group-2.svg" />
        <h3 :class="$style.cardTitle">{{ card.title }}</h3>
        <p :class="$style.cardBody">{{ card.body }}</p>
        <a :class="$style.cardLink" href="#contact">Learn more</a>
        <img
          :class="$style.cardPattern"
          alt=""
          src="/Untitled-design-3-21@2x.png"
        />
      </article>
    </div>
  </div>
</template>
<script setup lang="ts">
const cards = [
  {
    title: "For Innovators",
    body: "Submit your idea, build your team and track every review stage in one place.",
  },
  {
    title: "For Evaluators",
    body: "Review submissions, score ideas against clear criteria and share useful feedback.",
  },
  {
    title: "For Adjudicators",
    body: "Shortlist, approve and move the strongest ideas forward transparently.",
  },
];
</script>
<style module>
.wrap {
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
}
.header {
  width: 100%;
  max-width: 900px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
}
.headerLine {
  width: 170px;
  height: 3px;
  background-color: #e1570b;
}
.title {
  margin: 0;
  color: #36150a;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 900;
  font-family: var(--font-inter);
  line-height: 1.1;
}
.subtitle {
  margin: 0;
  color: #36150a;
  font-size: var(--fs-18);
  font-family: var(--font-inter);
  max-width: 640px;
  line-height: 1.4;
}
.cards {
  width: 100%;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
.card {
  width: 100%;
  position: relative;
  z-index: 1;
  isolation: isolate;
  background: var(--color-white);
  border: 3px solid #e1570b;
  border-radius: 28px;
  padding: 36px 28px 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  min-height: 320px;
  box-sizing: border-box;
}
.icon {
  width: 72px;
  height: 72px;
  z-index: 1;
}
.cardTitle {
  margin: 0;
  color: #36150a;
  font-size: var(--fs-24);
  font-weight: 900;
  font-family: var(--font-inter);
  z-index: 1;
}
.cardBody {
  margin: 0;
  color: #36150a;
  font-size: var(--fs-18);
  font-family: var(--font-inter);
  line-height: 1.45;
  max-width: 240px;
  z-index: 1;
  flex: 1;
}
.cardLink {
  color: #36150a;
  font-size: var(--fs-18);
  font-weight: 600;
  font-family: var(--font-inter);
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-thickness: 2px;
  text-decoration-color: #e1570b;
  z-index: 1;
}
.cardPattern {
  position: absolute;
  right: -70px;
  bottom: -60px;
  width: 200px;
  opacity: 0.45;
  pointer-events: none;
  z-index: 0;
  object-fit: contain;
}
@media screen and (max-width: 1000px) {
  .cards {
    grid-template-columns: 1fr;
    max-width: 420px;
    margin: 0 auto;
  }
}
</style>
