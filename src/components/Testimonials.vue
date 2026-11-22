<template>
  <section :class="$style.section">
    <div :class="$style.container">
      <div :class="$style.grid">
        <div :class="$style.copy">
          <h2 :class="$style.title">Trusted by innovators and evaluators</h2>
          <p :class="$style.subtitle">
            Hear from innovators, evaluators and consultants using the CEDA Innovation Portal to
            turn bold ideas into impactful solutions.
          </p>
        </div>

        <div :class="$style.carousel">
          <span :class="[$style.fade, $style.fadeTop]" aria-hidden="true" />
          <span :class="[$style.fade, $style.fadeBottom]" aria-hidden="true" />

          <div :class="$style.track">
            <div
              v-for="(item, index) in doubled"
              :key="index"
              :class="$style.card"
            >
              <div :class="$style.cardHead">
                <div :class="$style.person">
                  <img
                    :class="$style.avatar"
                    :src="item.avatar"
                    :alt="item.name"
                    loading="lazy"
                  />
                  <div :class="$style.personText">
                    <span :class="$style.name">{{ item.name }}</span>
                    <span :class="$style.role">{{ item.role }}</span>
                  </div>
                </div>
                <svg :class="$style.quote" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 11c0-2.5 1.5-4 4-4v2c-1.2 0-2 .8-2 2h2v5H6v-5Zm8 0c0-2.5 1.5-4 4-4v2c-1.2 0-2 .8-2 2h2v5h-4v-5Z"
                    fill="#0ea5e9"
                  />
                </svg>
              </div>
              <p :class="$style.content">"{{ item.content }}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const testimonials = [
    {
      name: "Mpho Kgosi",
      role: "Innovator, Gaborone",
      avatar: "https://avatars.githubusercontent.com/u/13041",
      content:
        "The portal made submitting my idea straightforward — from upload to feedback, everything was clear.",
    },
    {
      name: "Keabetswe Molefe",
      role: "Evaluator, CEDA",
      avatar: "https://avatars.githubusercontent.com/u/499550",
      content: "Scoring and adjudication are transparent, so every idea gets a fair, consistent review.",
    },
    {
      name: "Tshepo Modise",
      role: "Consultant, Innovation Hub",
      avatar: "https://avatars.githubusercontent.com/u/810438",
      content: "Tracking an idea from submission to funding decision in one place saves our team hours.",
    },
    {
      name: "Boitumelo Ramotswa",
      role: "Innovator, Francistown",
      avatar: "https://avatars.githubusercontent.com/u/1500684",
      content: "The simplicity here is what stands out. It solves real problems without getting in your way.",
    },
    {
      name: "Kagiso Sechele",
      role: "CEDA Programme Officer",
      avatar: "https://avatars.githubusercontent.com/u/11719236",
      content: "Speed, clarity, and solid defaults — that’s what good tools should deliver. This nails it.",
    },
    {
      name: "Naledi Mokgweetsi",
      role: "Innovation Coordinator",
      avatar: "https://avatars.githubusercontent.com/u/9113740",
      content: "Performance and developer experience go hand in hand. This setup gets both right.",
    },
  ];

  const doubled = [...testimonials, ...testimonials];
</script>

<style module>
  .section {
    width: 100%;
    background-color: #f7c613;
    padding: 64px 40px;
    box-sizing: border-box;
    font-family: var(--font-inter);
  }

  .container {
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 48px;
    align-items: center;
  }

  .copy {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .title {
    margin: 0;
    color: #ffffff;
    font-size: 36px;
    line-height: 1.15;
    font-weight: 600;
    letter-spacing: -0.8px;
  }

  .subtitle {
    margin: 0;
    max-width: 360px;
    color: #ffffff;
    font-size: 15px;
    line-height: 1.6;
  }

  .carousel {
    position: relative;
    height: 400px;
    overflow: hidden;
    border-radius: 20px;
  }

  .fade {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 2;
    height: 80px;
    pointer-events: none;
  }

  .fadeTop {
    top: 0;
    background: linear-gradient(to bottom, #f7c613 0%, transparent 100%);
  }

  .fadeBottom {
    bottom: 0;
    background: linear-gradient(to top, #f7c613 0%, transparent 100%);
  }

  .track {
    display: flex;
    flex-direction: column;
    gap: 16px;
    animation: scrollUp 34s linear infinite;
  }

  .carousel:hover .track {
    animation-play-state: paused;
  }

  .card {
    padding: 20px;
    border: 1px solid #eef2ef;
    border-radius: 20px;
    background-color: #f6f8f6;
    box-shadow: 0 1px 2px rgba(1, 53, 37, 0.04);
  }

  .cardHead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .person {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .avatar {
    width: 42px;
    height: 42px;
    flex-shrink: 0;
    border-radius: 12px;
    object-fit: cover;
    background-color: #eef2ef;
  }

  .personText {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .name {
    color: var(--color-darkslategray-600);
    font-size: 14px;
    font-weight: 600;
  }

  .role {
    color: #8a9993;
    font-size: 12px;
  }

  .quote {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }

  .content {
    margin: 0;
    color: #4a5b54;
    font-size: 14px;
    line-height: 1.6;
  }

  @keyframes scrollUp {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-50%);
    }
  }

  @media screen and (min-width: 1024px) {
    .grid {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
      gap: 64px;
    }
    .carousel {
      height: 500px;
    }
  }

  @media screen and (max-width: 850px) {
    .section {
      padding: 48px 20px;
    }
    .title {
      font-size: 28px;
    }
  }
</style>
