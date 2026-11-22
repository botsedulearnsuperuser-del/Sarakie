<template>
  <div :class="$style.page">
    <div :class="$style.container">
      <div :class="$style.scrollBox" ref="scrollRef">
        <div :class="$style.leadIn">
          <p :class="$style.leadText">
            Scroll the panel and the three layers travel at speeds set by their
            <code :class="$style.code">depth</code>. With a mouse, hovering the
            scene adds a second, pointer-driven layer of parallax.
          </p>
        </div>

        <div :class="$style.sceneWrap">
          <ParallaxLayers
            :class="$style.scene"
            :container="scrollRef"
            :layers="layers"
            :pointer-parallax="true"
            :range="80"
          >
            <template #layer="{ layer }">
              <template v-if="layer.id === 'sky'">
                <img
                  :class="$style.imgCover"
                  src="https://ik.imagekit.io/16u211libb/smoothui/scenes/cobalt-pink.webp?tr=w-1200,h-800,f-auto"
                  alt="Cobalt and pink blurred color fields"
                />
              </template>
              <template v-else-if="layer.id === 'ridge'">
                <div :class="$style.ridgeWrap">
                  <img
                    :class="$style.imgCover"
                    src="https://ik.imagekit.io/16u211libb/smoothui/scenes/amber-violet.webp?tr=w-1200,h-500,f-auto"
                    alt="Amber and violet blurred color fields"
                  />
                </div>
              </template>
              <template v-else-if="layer.id === 'scrim'">
                <div :class="$style.scrim" />
              </template>
              <template v-else-if="layer.id === 'title'">
                <div :class="$style.titleWrap">
                  <h2 :class="$style.title">Depth on scroll</h2>
                  <p :class="$style.subtitle">Three layers, three speeds</p>
                </div>
              </template>
            </template>
          </ParallaxLayers>
        </div>

        <div :class="$style.trail">
          <p :class="$style.trailText">
            The background barely shifts, the color field follows, the title
            leads — which is what reads as distance.
          </p>
        </div>
      </div>

      <div :class="$style.fadeBottom" aria-hidden="true" />
      <div :class="$style.scrollHint" aria-hidden="true">
        <span :class="$style.scrollHintPill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          Scroll inside the panel
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import ParallaxLayers from "../components/ui/ParallaxLayers.vue";
  import type { ParallaxLayer } from "../components/ui/ParallaxLayers.vue";

  const scrollRef = ref<HTMLElement | null>(null);

  const layers: ParallaxLayer[] = [
    { id: "sky", depth: 0.15, content: "" },
    { id: "ridge", depth: 0.4, blur: 1.5, opacity: 0.92, content: "" },
    { id: "scrim", depth: 0, content: "" },
    { id: "title", depth: 1, content: "" },
  ];
</script>

<style module>
  .page {
    min-height: 100vh;
    padding: 24px;
    background-color: #f8f5ef;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .container {
    position: relative;
    width: 100%;
    max-width: 720px;
    overflow: hidden;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: #ffffff;
  }
  .scrollBox {
    position: relative;
    height: 500px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  .leadIn {
    height: 400px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0 24px 24px;
  }
  .leadText {
    max-width: 320px;
    text-align: center;
    font-size: 14px;
    line-height: 1.5;
    color: #6b7280;
    margin: 0;
  }
  .code {
    margin: 0 4px;
    padding: 2px 4px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.06);
    font-family: var(--font-inter);
    font-size: 12px;
  }
  .sceneWrap {
    padding: 0 24px;
  }
  .scene {
    height: 320px;
    width: 100%;
    overflow: hidden;
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.03);
  }
  .imgCover {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transform: scale(1.25);
  }
  .ridgeWrap {
    position: absolute;
    inset: 0;
    left: 0;
    right: 0;
    bottom: -40px; /* -bottom-10 ~ -2.5rem */
    height: 75%;
  }
  .scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.25));
  }
  .titleWrap {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .title {
    font-size: 36px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.02em;
    margin: 0;
  }
  .subtitle {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
  }
  .trail {
    height: 320px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 32px 24px 0;
  }
  .trailText {
    max-width: 320px;
    text-align: center;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(107, 114, 128, 0.7);
    margin: 0;
  }
  .fadeBottom {
    pointer-events: none;
    position: absolute;
    inset: 0 0 0 0;
    top: auto;
    height: 64px;
    background: linear-gradient(to top, #ffffff, transparent);
  }
  .scrollHint {
    pointer-events: none;
    position: absolute;
    inset: 0 0 12px 0;
    top: auto;
    display: flex;
    justify-content: center;
  }
  .scrollHintPill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-radius: 9999px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: rgba(255, 255, 255, 0.9);
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 500;
    color: #6b7280;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(4px);
  }
</style>
