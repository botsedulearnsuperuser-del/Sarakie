<template>
  <section :class="$style.hero">
    <img
      :class="$style.circles"
      src="/hero-circles.webp"
      alt=""
      aria-hidden="true"
    />

    <div :class="$style.visual">
      <img
        :class="$style.lady"
        src="/hero-client.webp"
        alt="CEDA client using the innovation portal on her phone"
      />
    </div>

    <div :class="$style.content">
      <h1 :class="$style.title">
        CEDA Innovation<br />Management Portal
      </h1>
      <p :class="$style.subtitle">
        Turning Bold Ideas into<br />Impactful Solutions for Botswana
      </p>
      <div :class="$style.rule" />
      <div :class="$style.actions">
        <a :class="$style.primary" href="#submit">
          <span>Submit Your Idea</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 12h15M13 5.5 19.5 12 13 18.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <a :class="$style.ghost" href="#learn-more">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M8 5.5v13l11-6.5-11-6.5Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
          </svg>
          <span>Learn More</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style module>
.hero {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 56% 44%;
  align-items: stretch;
  min-height: clamp(520px, calc(100vh - 118px), 980px);
  background-color: #b9bdbb;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E");
  overflow: hidden;
  isolation: isolate;
  font-family: var(--font-inter);
}

.visual {
  position: relative;
  z-index: 2;
  min-height: 100%;
}

/* grainy film speckle across the whole hero - background, rings and photo */
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background-image: url("/noise.png");
  background-size: 200px 200px;
  background-repeat: repeat;
  opacity: 0.22;
}

.circles {
  position: absolute;
  left: -4%;
  top: 8%;
  width: 68%;
  height: auto;
  max-width: none;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.lady {
  position: absolute;
  bottom: 0;
  left: 2%;
  height: 94%;
  width: auto;
  max-width: none;
  object-fit: contain;
  object-position: bottom center;
  user-select: none;
}

.content {
  position: relative;
  z-index: 3;
  align-self: center;
  padding: 48px clamp(28px, 3.4vw, 56px) 48px 0;
  max-width: 760px;
}

.title {
  margin: 0 0 clamp(10px, 1.2vw, 18px);
  color: #1b1b1b;
  font-size: clamp(30px, 3.9vw, 62px);
  font-weight: 800;
  line-height: 1.16;
  letter-spacing: -0.015em;
}

.subtitle {
  margin: 0;
  color: #232323;
  font-size: clamp(16px, 1.8vw, 29px);
  font-weight: 500;
  line-height: 1.3;
}

.rule {
  width: clamp(42px, 3.6vw, 58px);
  height: 5px;
  border-radius: 3px;
  background-color: #f2551b;
  margin: clamp(16px, 2.2vw, 32px) 0 clamp(20px, 2.8vw, 40px);
}

.actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: clamp(12px, 1.4vw, 24px);
}

.primary,
.ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 0.9vw, 16px);
  height: clamp(48px, 3.8vw, 60px);
  padding: 0 clamp(20px, 1.8vw, 30px);
  border-radius: 999px;
  font-size: clamp(14px, 1.15vw, 19px);
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  box-sizing: border-box;
}

.primary {
  background-color: #941d11;
  color: #fff;
  box-shadow: 0 10px 20px rgba(148, 29, 17, 0.28);
  transition: background-color 0.2s, transform 0.15s;
}

.primary:hover {
  background-color: #ad2617;
}

.primary:active {
  transform: translateY(1px);
}

.ghost {
  border: 1.6px solid #1b1b1b;
  color: #1b1b1b;
  transition: background-color 0.2s;
}

.ghost:hover {
  background-color: rgba(27, 27, 27, 0.06);
}

.primary svg,
.ghost svg {
  width: 1.15em;
  height: 1.15em;
}

@media screen and (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: unset;
    --visual-h: 460px;
  }
  .visual {
    order: 1;
    min-height: var(--visual-h);
    overflow: hidden;
  }
  .circles {
    left: 50%;
    top: 0;
    width: auto;
    height: var(--visual-h);
    transform: translateX(-50%);
  }
  .lady {
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
  }
  .content {
    order: 2;
    padding: 36px 24px 52px;
    max-width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .hero {
    --visual-h: 380px;
  }
  .title {
    font-size: 30px;
  }
  .ghost,
  .primary {
    width: 100%;
  }
}
</style>
