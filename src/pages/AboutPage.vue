<template>
  <div :class="$style.aboutPage">
    <div :class="$style.top">
      <Navigation7 />

      <section :class="$style.hero">
        <p :class="$style.heroEyebrow">About CEDA</p>
        <h1 :class="$style.heroTitle">Finance. Develop. Sustain.</h1>
        <p :class="$style.heroText">
          We help Botswana's innovators turn bold ideas into impactful,
          fundable solutions. The CEDA Innovation Portal brings the whole
          journey into one clear, trackable place.
        </p>
        <div :class="$style.heroActions">
          <router-link :class="$style.primaryButton" to="/new-idea">
            Start a submission
          </router-link>
          <router-link :class="$style.secondaryButton" to="/faq">
            Read the FAQ
          </router-link>
        </div>
      </section>
    </div>

    <main>
      <section :class="$style.mission">
        <div :class="$style.missionCopy">
          <h2 :class="$style.sectionTitle">
            One portal, from first idea to funded solution.
          </h2>
          <p :class="$style.bodyText">
            CEDA exists to grow Botswana's economy by helping entrepreneurs
            turn viable ideas into sustainable businesses. The Innovation
            Portal brings that support into a single, transparent journey.
          </p>
          <p :class="$style.bodyText">
            Whether you are submitting your first idea or reviewing the next
            generation of ventures, the portal gives you one place to apply,
            assess, and move forward.
          </p>
        </div>

        <div :class="$style.stats">
          <div :class="$style.stat">
            <span :class="$style.statValue">5</span>
            <span :class="$style.statLabel">scoring criteria</span>
          </div>
          <div :class="$style.stat">
            <span :class="$style.statValue">10 days</span>
            <span :class="$style.statLabel">typical review window</span>
          </div>
          <div :class="$style.stat">
            <span :class="$style.statValue">1</span>
            <span :class="$style.statLabel">place to apply</span>
          </div>
        </div>
      </section>

      <section :class="$style.capabilities">
        <div :class="$style.capabilitiesIntro">
          <p :class="$style.capabilitiesEyebrow">Under the hood</p>
          <h2 :class="$style.capabilitiesTitle">
            A platform that keeps up with your ambition.
          </h2>
          <p :class="$style.capabilitiesText">
            Live progress, dependable access, and clear alerts — the portal is
            built to keep every application moving.
          </p>
        </div>

        <Bento2 />
      </section>
    </main>

    <Footer2 />
  </div>
</template>

<script setup lang="ts">
  import Navigation7 from "../components/ui/navigation7.vue"
  import Footer2 from "../components/ui/footer2.vue"
  import Bento2 from "../components/ui/bento2.vue"
</script>

<style module>
  .aboutPage {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: var(--color-seashell);
    overflow-x: hidden;
    line-height: normal;
    letter-spacing: normal;
  }
  .top {
    width: 100%;
    background-color: var(--color-darkslategray-600);
  }
  .hero {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 64px 24px 104px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .heroEyebrow {
    margin: 0 0 20px;
    color: var(--color-goldenrod-200);
    font-family: var(--font-inter);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }
  .heroTitle {
    margin: 0;
    max-width: 800px;
    color: #ffffff;
    font-family: var(--font-inter);
    font-size: 64px;
    line-height: 1.06;
    font-weight: 600;
    letter-spacing: -0.035em;
  }
  .heroText {
    margin: 24px 0 0;
    max-width: 640px;
    color: rgba(255, 255, 255, 0.78);
    font-family: var(--font-inter);
    font-size: 18px;
    line-height: 1.65;
  }
  .heroActions {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 36px;
  }
  .primaryButton,
  .secondaryButton {
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    border-radius: 999px;
    font-family: var(--font-inter);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    box-sizing: border-box;
    transition:
      background-color 0.18s ease,
      border-color 0.18s ease,
      transform 0.15s ease;
  }
  .primaryButton {
    background-color: var(--color-goldenrod-200);
    color: var(--color-darkslategray-600);
  }
  .primaryButton:hover {
    background-color: #f3cf67;
  }
  .secondaryButton {
    border: 1px solid rgba(255, 255, 255, 0.32);
    color: #ffffff;
  }
  .secondaryButton:hover {
    border-color: rgba(255, 255, 255, 0.6);
    background-color: rgba(255, 255, 255, 0.08);
  }
  .primaryButton:active,
  .secondaryButton:active {
    transform: translateY(1px);
  }

  .mission {
    width: 100%;
    max-width: 896px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
    gap: 72px;
    align-items: start;
    padding: 88px 24px 24px;
    box-sizing: border-box;
  }
  .missionCopy {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .sectionTitle {
    margin: 0;
    color: var(--color-darkslategray-600);
    font-family: var(--font-inter);
    font-size: 42px;
    line-height: 1.14;
    font-weight: 600;
    letter-spacing: -0.03em;
  }
  .bodyText {
    margin: 0;
    max-width: 640px;
    color: #525252;
    font-family: var(--font-inter);
    font-size: 16px;
    line-height: 1.75;
  }
  .stats {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid rgba(1, 53, 37, 0.16);
  }
  .stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 22px 0;
    border-bottom: 1px solid rgba(1, 53, 37, 0.16);
  }
  .statValue {
    color: var(--color-darkslategray-600);
    font-family: var(--font-inter);
    font-size: 34px;
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: -0.03em;
  }
  .statLabel {
    color: #737373;
    font-family: var(--font-inter);
    font-size: 13px;
    line-height: 1.5;
  }

  .capabilities {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 96px 24px 104px;
    box-sizing: border-box;
  }
  .capabilitiesIntro {
    width: 100%;
    max-width: 896px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 36px;
  }
  .capabilitiesEyebrow {
    margin: 0;
    color: #7a5300;
    font-family: var(--font-inter);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .capabilitiesTitle {
    margin: 0;
    max-width: 640px;
    color: var(--color-darkslategray-600);
    font-family: var(--font-inter);
    font-size: 38px;
    line-height: 1.16;
    font-weight: 600;
    letter-spacing: -0.03em;
  }
  .capabilitiesText {
    margin: 0;
    max-width: 560px;
    color: #525252;
    font-family: var(--font-inter);
    font-size: 15px;
    line-height: 1.65;
  }

  @media screen and (max-width: 900px) {
    .heroTitle {
      font-size: 48px;
    }
    .hero {
      padding: 48px 24px 80px;
    }
    .mission {
      grid-template-columns: 1fr;
      gap: 40px;
      padding-top: 64px;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      border-top: 0;
    }
    .stat {
      padding: 0;
      border-bottom: 0;
      border-top: 1px solid rgba(1, 53, 37, 0.16);
    }
    .capabilities {
      padding: 64px 20px 80px;
    }
  }
  @media screen and (max-width: 640px) {
    .heroTitle {
      font-size: 38px;
    }
    .heroText {
      font-size: 16px;
    }
    .sectionTitle {
      font-size: 32px;
    }
    .capabilitiesTitle {
      font-size: 30px;
    }
    .stats {
      grid-template-columns: 1fr;
      gap: 0;
    }
    .stat {
      padding: 18px 0;
      border-top: 0;
      border-bottom: 1px solid rgba(1, 53, 37, 0.16);
    }
    .stat:first-child {
      border-top: 1px solid rgba(1, 53, 37, 0.16);
    }
  }
</style>
