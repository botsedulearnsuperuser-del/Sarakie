<template>
  <section :class="$style.bento2Section">
    <div :class="$style.grid">
      <article :class="[$style.card, $style.cardMetrics]">
        <div :class="$style.metricsVisual">
          <div :class="$style.metricsHeader">
            <div :class="$style.metricsCopy">
              <span :class="$style.eyebrow">Live Traffic</span>
              <span :class="$style.bigNumber">
                12,450
                <small :class="$style.bigNumberUnit">req/s</small>
              </span>
            </div>
          </div>

          <div :class="$style.barChart">
            <div
              v-for="(height, index) in trafficBars"
              :key="index"
              :class="$style.bar"
              :style="{ height: height + '%', animationDelay: index * 0.05 + 's' }"
            />
          </div>
        </div>

        <div :class="$style.cardCopy">
          <h3 :class="$style.cardTitle">Real-time Metrics</h3>
          <p :class="$style.cardText">
            Monitor your entire infrastructure with zero-latency dashboards and
            perfectly accurate data pipelines.
          </p>
        </div>
      </article>

      <article :class="[$style.card, $style.cardUptime]">
        <div :class="$style.cardCopy">
          <h3 :class="$style.cardTitle">99.99% Uptime</h3>
          <p :class="$style.cardTextSmall">
            Enterprise-grade reliability out of the box.
          </p>
        </div>

        <div :class="$style.uptimeVisual">
          <div :class="$style.uptimeHeader">
            <span :class="$style.uptimeLabel">Global Network</span>
            <div :class="$style.healthy">
              <span :class="$style.healthyDot" />
              <span>100% Healthy</span>
            </div>
          </div>

          <div
            v-for="service in services"
            :key="service.name"
            :class="$style.service"
          >
            <div :class="$style.serviceHead">
              <span :class="$style.serviceName">{{ service.name }}</span>
              <div :class="$style.serviceMeter">
                <span
                  :class="$style.serviceValue"
                  :style="{ transitionDelay: service.delay + 's' }"
                >
                  99.99%
                </span>
                <span :class="$style.serviceTrack">
                  <span
                    :class="$style.serviceFill"
                    :style="{ transitionDelay: service.delay + 's' }"
                  />
                </span>
              </div>
            </div>
            <div :class="$style.segments">
              <span
                v-for="segment in 14"
                :key="segment"
                :class="$style.segment"
                :style="{
                  animationDelay: service.delay + segment * 0.03 + 's',
                }"
              />
            </div>
          </div>
        </div>
      </article>

      <article :class="[$style.card, $style.cardAlerts]">
        <div :class="$style.alertsVisual">
          <div :class="$style.bellWrap">
            <div :class="$style.bell">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.3 21a1.94 1.94 0 0 0 3.4 0"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <span :class="$style.pingDot" />
            <span :class="$style.pingRing" />
          </div>

          <div :class="$style.toast">
            <span :class="$style.toastDot" />
            <div :class="$style.toastCopy">
              <strong>Traffic Spike Detected</strong>
              <span>Auto-scaled to 5 nodes</span>
            </div>
          </div>
        </div>

        <div :class="$style.cardCopy">
          <h3 :class="$style.cardTitle">Smart Alerts</h3>
          <p :class="$style.cardTextSmall">
            Get notified immediately before critical incidents happen.
          </p>
        </div>
      </article>

      <article :class="[$style.card, $style.cardMap]">
        <div :class="[$style.cardCopy, $style.cardCopyRight]">
          <h3 :class="$style.cardTitle">Global Edge Network</h3>
          <p :class="$style.cardText">
            Deploy your applications globally across 35+ regions with automated
            intelligent routing and load balancing.
          </p>
        </div>

        <div :class="$style.mapVisual">
          <div :class="$style.mapFade" aria-hidden="true">
            <div :class="$style.mapDots" />
          </div>
          <div :class="$style.mapGlow" aria-hidden="true" />

          <div
            v-for="pin in pins"
            :key="pin.name"
            :class="$style.pin"
            :style="{
              top: pin.top,
              left: pin.left,
              animationDelay: pin.delay + 's',
            }"
          >
            <div :class="$style.pinAvatar">
              <img :src="pin.src" :alt="pin.name" />
              <span :class="$style.pinStatus" />
            </div>
            <svg :class="$style.pinTail" viewBox="0 0 8 10" fill="none">
              <path
                d="M1 0 4 9 7 0"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
  const trafficBars = [40, 70, 45, 90, 65, 85, 35, 60, 50, 80, 55, 75]

  const services = [
    { name: "Edge CDN", delay: 0.2 },
    { name: "Compute", delay: 0.5 },
    { name: "Database", delay: 0.8 },
  ]

  const pins = [
    {
      src: "/innovator-man.webp",
      name: "Mark",
      top: "14%",
      left: "16%",
      delay: 0,
    },
    {
      src: "/hero-woman.webp",
      name: "Olivia",
      top: "34%",
      left: "40%",
      delay: 0.4,
    },
    {
      src: "/hero-client.webp",
      name: "Josh",
      top: "8%",
      left: "68%",
      delay: 0.2,
    },
  ]
</script>

<style module>
  .bento2Section {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-inter);
  }
  .grid {
    width: 100%;
    max-width: 896px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    border-radius: 12px;
    background-color: #f2ede3;
    padding: 24px;
    box-sizing: border-box;
    box-shadow:
      inset 0 0 2px 2px rgba(255, 255, 255, 1),
      inset 0 0 0 1px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(0, 0, 0, 0.08),
      0 1px 2px -1px rgba(0, 0, 0, 0.08),
      0 2px 4px rgba(0, 0, 0, 0.06);
  }
  .cardMetrics {
    grid-column: span 2;
    min-height: 320px;
    justify-content: flex-end;
  }
  .cardUptime {
    grid-column: span 1;
    min-height: 320px;
  }
  .cardAlerts {
    grid-column: span 1;
    min-height: 320px;
  }
  .cardMap {
    grid-column: span 2;
    min-height: 320px;
    align-items: flex-end;
  }
  .cardCopy {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 16px;
  }
  .cardCopyRight {
    align-items: flex-end;
    text-align: right;
    padding-top: 0;
    padding-bottom: 16px;
  }
  .cardTitle {
    margin: 0;
    color: var(--color-darkslategray-600);
    font-size: 20px;
    line-height: 1.25;
    font-weight: 600;
  }
  .cardText {
    margin: 0;
    max-width: 384px;
    color: #525252;
    font-size: 14px;
    line-height: 1.5;
  }
  .cardTextSmall {
    margin: 0;
    max-width: 200px;
    color: #525252;
    font-size: 14px;
    line-height: 1.5;
  }

  .metricsVisual {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }
  .metricsHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }
  .metricsCopy {
    display: flex;
    flex-direction: column;
  }
  .eyebrow {
    color: #737373;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .bigNumber {
    color: #171717;
    font-size: 24px;
    line-height: 1.2;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .bigNumberUnit {
    color: #737373;
    font-size: 14px;
    font-weight: 500;
  }
  .barChart {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    height: 120px;
    overflow: hidden;
  }
  .bar {
    width: 100%;
    border-radius: 2px 2px 0 0;
    background-color: var(--color-darkslategray-600);
    transform-origin: bottom;
    transition: transform 0.3s ease;
  }
  .cardMetrics:hover .bar {
    animation: barPulse 2s ease-in-out infinite;
  }
  @keyframes barPulse {
    0%,
    100% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(0.55);
    }
  }

  .uptimeVisual {
    position: relative;
    z-index: 10;
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 12px;
    padding: 24px 0 8px;
  }
  .uptimeHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(227, 220, 203, 0.5);
  }
  .uptimeLabel {
    color: #737373;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .healthy {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--color-darkslategray-600);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .healthyDot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--color-darkslategray-600);
    box-shadow: 0 0 8px var(--color-darkslategray-600);
  }
  .cardUptime:hover .healthyDot {
    animation: healthyPulse 1.5s ease-in-out infinite;
  }
  @keyframes healthyPulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
  .service {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .serviceHead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .serviceName {
    color: #171717;
    font-size: 10px;
    font-weight: 600;
  }
  .serviceMeter {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .serviceValue {
    color: var(--color-darkslategray-600);
    font-family: var(--font-inter);
    font-size: 9px;
    opacity: 0;
    transform: translateX(-5px);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }
  .cardUptime:hover .serviceValue {
    opacity: 1;
    transform: translateX(0);
  }
  .serviceTrack {
    width: 48px;
    height: 4px;
    border-radius: 999px;
    background-color: #e9e3d8;
    overflow: hidden;
  }
  .serviceFill {
    display: block;
    width: 0;
    height: 100%;
    background-color: var(--color-darkslategray-600);
    box-shadow: 0 0 8px var(--color-darkslategray-600);
    transition: width 0.6s ease-out;
  }
  .cardUptime:hover .serviceFill {
    width: 100%;
  }
  .segments {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .segment {
    flex: 1;
    height: 8px;
    border-radius: 1px;
    background-color: var(--color-darkslategray-600);
    opacity: 0.2;
  }
  .cardUptime:hover .segment {
    animation: segmentBlink 0.4s ease-out;
  }
  @keyframes segmentBlink {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.9;
    }
    100% {
      opacity: 0.2;
    }
  }

  .alertsVisual {
    position: relative;
    z-index: 10;
    flex: 1;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 32px;
  }
  .bellWrap {
    position: relative;
    z-index: 30;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    border: 1px solid rgba(227, 220, 203, 0.5);
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(8px);
    transition: transform 0.3s ease;
  }
  .cardAlerts:hover .bellWrap {
    transform: translateY(-10px);
  }
  .bell {
    width: 20px;
    height: 20px;
    color: #171717;
  }
  .cardAlerts:hover .bell {
    animation: bellRing 0.5s ease 0.1s;
  }
  @keyframes bellRing {
    0%,
    100% {
      transform: rotate(0);
    }
    20% {
      transform: rotate(-15deg);
    }
    40% {
      transform: rotate(15deg);
    }
    60% {
      transform: rotate(-15deg);
    }
    80% {
      transform: rotate(15deg);
    }
  }
  .pingDot,
  .pingRing {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--color-darkslategray-600);
  }
  .pingDot {
    opacity: 0;
    transform: scale(0);
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }
  .pingRing {
    opacity: 0;
  }
  .cardAlerts:hover .pingDot {
    opacity: 1;
    transform: scale(1);
    transition-delay: 0.3s;
  }
  .cardAlerts:hover .pingRing {
    animation: pingRing 1s ease-out 0.3s infinite;
  }
  @keyframes pingRing {
    0% {
      opacity: 0.7;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(2.5);
    }
  }
  .toast {
    position: absolute;
    top: 96px;
    left: 50%;
    z-index: 20;
    width: 220px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(227, 220, 203, 0.4);
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    opacity: 0;
    transform: translate(-50%, -20px) scale(0.95);
    transition:
      opacity 0.35s ease,
      transform 0.35s ease;
    pointer-events: none;
  }
  .cardAlerts:hover .toast {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
    transition-delay: 0.2s;
  }
  .toastDot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: rgba(1, 53, 37, 0.1);
    position: relative;
    flex-shrink: 0;
  }
  .toastDot::after {
    content: "";
    position: absolute;
    inset: 9px;
    border-radius: 50%;
    background-color: var(--color-darkslategray-600);
  }
  .toastCopy {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .toastCopy strong {
    color: #171717;
    font-size: 11px;
    font-weight: 600;
  }
  .toastCopy span {
    color: #737373;
    font-size: 10px;
  }

  .mapVisual {
    position: relative;
    z-index: 10;
    width: 100%;
    flex: 1;
    min-height: 200px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    margin-top: 16px;
  }
  .mapFade {
    position: absolute;
    inset: 0;
    pointer-events: none;
    mask-image: radial-gradient(
      ellipse at center,
      #000 30%,
      transparent 80%
    );
    -webkit-mask-image: radial-gradient(
      ellipse at center,
      #000 30%,
      transparent 80%
    );
  }
  .mapDots {
    width: 100%;
    height: 100%;
    opacity: 0.8;
    background-image: radial-gradient(
      circle,
      #9ca3af 1.5px,
      transparent 1.5px
    );
    background-size: 5px 5px;
    mask-image: url("/world-map.svg");
    mask-size: 108% auto;
    mask-position: center;
    mask-repeat: no-repeat;
    -webkit-mask-image: url("/world-map.svg");
    -webkit-mask-size: 108% auto;
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
  }
  .mapGlow {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 80px;
    border-radius: 100%;
    background-color: rgba(1, 53, 37, 0.15);
    filter: blur(40px);
    opacity: 0;
    transition: opacity 0.8s ease;
    pointer-events: none;
  }
  .cardMap:hover .mapGlow {
    opacity: 1;
  }
  .pin {
    position: absolute;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cardMap:hover .pin {
    animation: pinBounce 3s ease-in-out infinite;
  }
  @keyframes pinBounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }
  .pinAvatar {
    position: relative;
    z-index: 10;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(227, 220, 203, 0.8);
    background-color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }
  .pinAvatar img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }
  .pinStatus {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1.5px solid #ffffff;
    background-color: var(--color-darkslategray-600);
  }
  .cardMap:hover .pinStatus {
    animation: pinStatusPulse 2s ease-in-out infinite;
  }
  @keyframes pinStatusPulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
  .pinTail {
    width: 8px;
    height: 10px;
    margin-top: -1px;
    color: rgba(227, 220, 203, 0.8);
    z-index: 0;
  }

  @media screen and (max-width: 767px) {
    .grid {
      grid-template-columns: 1fr;
      max-width: 520px;
    }
    .cardMetrics,
    .cardUptime,
    .cardAlerts,
    .cardMap {
      grid-column: span 1;
    }
    .cardCopyRight {
      align-items: flex-start;
      text-align: left;
    }
    .toast {
      width: 200px;
    }
  }
  @media screen and (max-width: 480px) {
    .cardTitle {
      font-size: 19px;
    }
    .bigNumber {
      font-size: 22px;
    }
    .barChart {
      height: 100px;
    }
  }
</style>
