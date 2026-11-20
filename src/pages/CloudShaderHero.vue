<template>
  <div :class="$style.page">
    <CloudShader :class="$style.shader" />

    <!-- navbar -->
    <nav :class="$style.nav">
      <div :class="$style.brand">
        <span :class="$style.brandName">
          CEDA <span :class="$style.brandSub">Innovation Portal</span>
        </span>
      </div>
      <div :class="$style.navLinks">
        <a href="#" :class="$style.navLink">How it works</a>
        <a href="#" :class="$style.navLink">Funding</a>
        <a href="#" :class="$style.navLink">My applications</a>
        <a href="#" :class="$style.navLink">Support</a>
      </div>
      <div :class="$style.navActions">
        <a href="#" :class="$style.signIn">Sign in</a>
        <a href="#" :class="$style.getStarted">Apply now</a>
      </div>
    </nav>

    <!-- hero -->
    <div :class="$style.hero">
      <img
        src="/ceda-logo.webp"
        alt="CEDA — Finance · Develop · Sustain"
        :class="$style.heroLogo"
      />
      <h1 :class="$style.heading">
        Turn your idea into <br :class="$style.headingBreak" />
        a <span :class="$style.accent">funded</span> business
      </h1>
      <p :class="$style.lede">
        The CEDA Innovation Portal brings your submissions, supporting documents
        and evaluator feedback into one place, so Botswana&rsquo;s innovators can
        move from first draft to funding decision with a CEDA analyst beside them
        at every step.
      </p>
      <div :class="$style.ctaRow">
        <a href="#" :class="$style.primaryCta">
          Start submission
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
        <a href="#" :class="$style.secondaryCta">See how it works</a>
      </div>
      <p :class="$style.trialNote">
        Free to apply &middot; Reviews usually take 10 working days
      </p>
    </div>

    <!-- dashboard image -->
    <div :class="$style.shotWrap">
      <div :class="$style.shotFrame">
        <img
          src="/screenshots/hero-dashboard.webp"
          alt="CEDA Innovation Portal dashboard"
          :class="$style.shot"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CloudShader from "../components/ui/cloud-shader.vue";
</script>

<style module>
.page {
  position: relative;
  min-height: 50rem;
  width: 100%;
  overflow: hidden;
  font-family: var(--font-inter);
  line-height: normal;
}

.shader {
  position: absolute;
  inset: 0;
}

/* navbar */
.nav {
  position: relative;
  z-index: 20;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: 100%;
  max-width: 80rem;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brandName {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #ffffff;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05));
}

.brandSub {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.78);
}

.navLinks {
  display: none;
  align-items: center;
  gap: 2rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.navLink {
  color: inherit;
  text-decoration: none;
  transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.navLink:hover {
  color: #ffffff;
}

.navActions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.signIn {
  display: none;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.signIn:hover {
  color: #ffffff;
}

.getStarted {
  border-radius: 9999px;
  background-color: var(--color-goldenrod-300);
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  color: var(--color-darkslategray-600);
  text-decoration: none;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.getStarted:hover {
  background-color: var(--color-goldenrod-100);
}

/* hero */
.hero {
  position: relative;
  z-index: 10;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  max-width: 56rem;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem 0;
  text-align: center;
  box-sizing: border-box;
}

.heroLogo {
  display: block;
  height: 4.5rem;
  width: auto;
  margin-bottom: 1.25rem;
  filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.28));
}

.heading {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #ffffff;
  filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07))
    drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06));
}

.accent {
  color: var(--color-goldenrod-300);
}

.headingBreak {
  display: none;
}

.lede {
  margin: 1.5rem 0 0;
  max-width: 42rem;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.92);
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05));
}

.ctaRow {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.primaryCta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 9999px;
  background-color: var(--color-goldenrod-300);
  padding: 0.625rem 1.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  color: var(--color-darkslategray-600);
  text-decoration: none;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.18),
    0 4px 6px -4px rgba(0, 0, 0, 0.12);
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.primaryCta:hover {
  transform: translateY(-0.125rem);
  background-color: var(--color-goldenrod-100);
}

.secondaryCta {
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  background-color: rgba(255, 255, 255, 0.12);
  padding: 0.625rem 1.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.secondaryCta:hover {
  background-color: rgba(255, 255, 255, 0.22);
}

.trialNote {
  margin: 1rem 0 0;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(255, 255, 255, 0.75);
}

/* dashboard image */
.shotWrap {
  position: relative;
  z-index: 10;
  margin: 3rem auto 0;
  width: 100%;
  max-width: 72rem;
  padding: 0 1rem 1rem;
  box-sizing: border-box;
}

.shotFrame {
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-sizing: border-box;
}

.shot {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

/* sm: 40rem */
@media (min-width: 40rem) {
  .signIn {
    display: block;
  }

  .ctaRow {
    flex-direction: row;
  }
}

/* md: 48rem */
@media (min-width: 48rem) {
  .nav {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .navLinks {
    display: flex;
  }

  .hero {
    padding-top: 4.5rem;
  }

  .heroLogo {
    height: 5.5rem;
    margin-bottom: 1.5rem;
  }

  .heading {
    font-size: 3.75rem;
    line-height: 1;
  }

  .headingBreak {
    display: block;
  }

  .lede {
    font-size: 1.125rem;
    line-height: 1.65;
  }

  .shotWrap {
    margin-top: 4rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .shotFrame {
    border-radius: 2rem;
    padding: 0.75rem;
  }

  .shot {
    border-radius: 1.5rem;
  }
}

/* lg: 64rem */
@media (min-width: 64rem) {
  .heading {
    font-size: 4.5rem;
    line-height: 1;
  }
}
</style>
