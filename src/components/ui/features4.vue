<template>
  <section :class="$style.features4">
    <h2 :class="$style.heading">Track your innovation pipeline</h2>

    <p :class="$style.subtitle">
      Get clarity on submissions, evaluations and approvals, and take action with
      insights that move ideas forward.
    </p>

    <div :class="$style.grid">
      <article :class="$style.card" style="background-color: #2b1b00;">
        <div :class="$style.cardContent">
          <div :class="$style.cardHeader">
            <h3 :class="$style.cardTitle">Submission activity</h3>
            <p :class="$style.cardText">
              Track live submission and evaluation activity in real time, helping
              you spot trends and bottlenecks instantly.
            </p>
          </div>

          <div :class="$style.visual">
            <div :class="$style.visualTop">
              <span :class="$style.visualLabel">
                <svg
                  :class="$style.inlineIcon"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-8.485 2.121a7.5 7.5 0 0 1 0-10.606m11.314 0a7.5 7.5 0 0 1 0 10.606"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                </svg>
                Live events
              </span>
              <span :class="$style.live">● live</span>
            </div>

            <div :class="$style.valueRow">
              <div :class="$style.bigValue">1,284</div>
              <div :class="$style.delta">+8%</div>
            </div>

            <div :class="$style.bars">
              <div
                v-for="(height, index) in activityBars"
                :key="index"
                :class="$style.bar"
                :style="{ height: height + '%' }"
              />
            </div>

            <div :class="$style.statGrid">
              <div :class="$style.statBox">
                <div :class="$style.statLabel">
                  <svg
                    :class="$style.tinyIcon"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Avg. review time
                </div>
                <div :class="$style.statValue">4.2 days</div>
              </div>
              <div :class="$style.statBox">
                <div :class="$style.statLabel">
                  <svg
                    :class="$style.tinyIcon"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Pending
                </div>
                <div :class="$style.statValueError">312</div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article :class="$style.card" style="background-color: #2b1b00;">
        <div :class="$style.cardContent">
          <div :class="$style.cardHeader">
            <h3 :class="$style.cardTitle">Innovator segments</h3>
            <p :class="$style.cardText">
              Understand how different innovator groups engage, so you can
              identify high-impact segments quickly.
            </p>
          </div>

          <div :class="$style.visual">
            <div :class="$style.visualTop">
              <span :class="$style.visualLabel">
                <svg
                  :class="$style.inlineIcon"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Active segments
              </span>
              <span :class="$style.mutedNote">12 groups</span>
            </div>

            <div :class="$style.donutRow">
              <div :class="$style.donut">
                <span :class="$style.donutValue">68%</span>
              </div>
            </div>

            <div :class="$style.segmentList">
              <div
                v-for="segment in segments"
                :key="segment.name"
                :class="$style.segmentRow"
              >
                <span :class="$style.segmentName">{{ segment.name }}</span>
                <span :class="$style.segmentValue">{{ segment.value }}%</span>
              </div>
            </div>

            <div :class="$style.segmentBars">
              <div :class="[$style.segmentBar, $style.segmentBarStrong]" />
              <div :class="[$style.segmentBar, $style.segmentBarMedium]" />
              <div :class="[$style.segmentBar, $style.segmentBarSoft]" />
            </div>
          </div>
        </div>
      </article>

      <article :class="$style.card" style="background-color: #2b1b00;">
        <div :class="$style.cardContent">
          <div :class="$style.cardHeader">
            <h3 :class="$style.cardTitle">Evaluation momentum</h3>
            <p :class="$style.cardText">
              Monitor progress across submission, evaluation and approval with a
              unified score at a glance.
            </p>
          </div>

          <div :class="$style.visual">
            <div :class="$style.visualTop">
              <span :class="$style.visualLabel">
                <svg
                  :class="$style.inlineIcon"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Growth score
              </span>
                              <span :class="$style.growthPill">+8.4%</span>
            </div>

            <div :class="$style.growthValue">82</div>

            <div :class="$style.metricList">
              <div
                v-for="metric in metrics"
                :key="metric.label"
                :class="$style.metric"
              >
                <div :class="$style.metricHead">
                  <span>{{ metric.label }}</span>
                  <span>{{ metric.value }}%</span>
                </div>
                <div :class="$style.metricTrack">
                  <div
                    :class="$style.metricFill"
                    :style="{ width: metric.value + '%' }"
                  />
                </div>
              </div>
            </div>

            <div :class="$style.trendRow">
              <span :class="$style.trendLabel">
                <svg
                  :class="$style.inlineIcon"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Trend
              </span>
              <span :class="$style.trendValue">On track</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
  const activityBars = [40, 60, 35, 80, 55, 90, 70]

  const segments = [
    { name: "Submitted", value: 52 },
    { name: "In review", value: 28 },
    { name: "Approved", value: 20 },
  ]

  const metrics = [
    { label: "Submission", value: 82 },
    { label: "Evaluation", value: 68 },
    { label: "Approval", value: 74 },
  ]
</script>

<style module>
  .features4 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 24px;
    box-sizing: border-box;
  }
  .heading {
    margin: 0;
    text-align: center;
    color: #ffffff;
    font-family: var(--font-inter);
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .subtitle {
    margin: 16px 0 0;
    max-width: 672px;
    text-align: center;
    color: #ffffff;
    font-family: var(--font-inter);
    font-size: 16px;
    line-height: 1.6;
  }
  .grid {
    width: 100%;
    max-width: 1152px;
    margin-top: 48px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
    align-items: stretch;
  }
  .card {
    display: flex;
    height: 100%;
    border-radius: 40px;
    background-color: rgba(1, 53, 37, 0.04);
  }
  .cardContent {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
  }
  .cardHeader {
    text-align: center;
    padding: 0 8px;
  }
  .cardTitle {
    margin: 0;
    color: #ffffff;
    font-family: var(--font-inter);
    font-size: 24px;
    font-weight: 600;
    line-height: 1.2;
  }
  .cardText {
    margin: 8px 0 0;
    color: #ffffff;
    font-family: var(--font-inter);
    font-size: 16px;
    line-height: 1.5;
  }
  .visual {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    min-height: 350px;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 32px;
    background-color: #ffffff;
    box-shadow:
      0 3px 8px -1px rgba(0, 0, 0, 0.03),
      0 1px 2px -1px rgba(0, 0, 0, 0.04),
      0 2px 4px 0 rgba(0, 0, 0, 0.04);
  }
  .visualTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .visualLabel {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #737373;
    font-family: var(--font-inter);
    font-size: 14px;
    font-weight: 500;
  }
  .inlineIcon {
    width: 16px;
    height: 16px;
    color: var(--color-darkslategray-600);
    flex-shrink: 0;
  }
  .tinyIcon {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }
  .live {
    color: var(--color-darkslategray-600);
    font-family: var(--font-inter);
    font-size: 12px;
    font-weight: 600;
  }
  .mutedNote {
    color: #737373;
    font-family: var(--font-inter);
    font-size: 12px;
  }
  .valueRow {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 8px;
  }
  .bigValue {
    color: #171717;
    font-family: var(--font-inter);
    font-size: 36px;
    line-height: 1;
    font-weight: 600;
  }
  .delta {
    color: var(--color-darkslategray-600);
    font-family: var(--font-inter);
    font-size: 14px;
    font-weight: 600;
  }
  .bars {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    height: 96px;
  }
  .bar {
    width: 100%;
    border-radius: 6px;
    background-color: rgba(1, 53, 37, 0.8);
    transition: height 0.3s ease;
  }
  .statGrid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
  .statBox {
    padding: 12px;
    border-radius: 8px;
    background-color: #f2ede3;
  }
  .statLabel {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #737373;
    font-family: var(--font-inter);
    font-size: 12px;
    line-height: 1.2;
  }
  .statValue {
    margin-top: 2px;
    color: #171717;
    font-family: var(--font-inter);
    font-size: 18px;
    font-weight: 500;
  }
  .statValueError {
    margin-top: 2px;
    color: #b91c1c;
    font-family: var(--font-inter);
    font-size: 18px;
    font-weight: 500;
  }

  .donutRow {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .donut {
    position: relative;
    width: 112px;
    height: 112px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: conic-gradient(
      var(--color-darkslategray-600) 0deg 244.8deg,
      #e3dccb 244.8deg 360deg
    );
  }
  .donut::before {
    content: "";
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    background-color: #ffffff;
  }
  .donutValue {
    position: relative;
    z-index: 1;
    color: #171717;
    font-family: var(--font-inter);
    font-size: 20px;
    font-weight: 600;
  }
  .segmentList {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .segmentRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-family: var(--font-inter);
    font-size: 14px;
  }
  .segmentName {
    color: #737373;
  }
  .segmentValue {
    color: #171717;
    font-weight: 500;
  }
  .segmentBars {
    display: flex;
    gap: 8px;
  }
  .segmentBar {
    height: 8px;
    flex: 1;
    border-radius: 999px;
  }
  .segmentBarStrong {
    background-color: var(--color-darkslategray-600);
  }
  .segmentBarMedium {
    background-color: rgba(1, 53, 37, 0.6);
  }
  .segmentBarSoft {
    background-color: rgba(1, 53, 37, 0.3);
  }

  .growthPill {
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid rgba(1, 53, 37, 0.2);
    background-color: rgba(1, 53, 37, 0.05);
    color: var(--color-darkslategray-600);
    font-family: var(--font-inter);
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }
  .growthValue {
    color: #171717;
    font-family: var(--font-inter);
    font-size: 48px;
    line-height: 1;
    font-weight: 600;
  }
  .metricList {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .metric {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .metricHead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    color: #737373;
    font-family: var(--font-inter);
    font-size: 12px;
  }
  .metricTrack {
    width: 100%;
    height: 8px;
    border-radius: 999px;
    background-color: #f2ede3;
    overflow: hidden;
  }
  .metricFill {
    height: 8px;
    border-radius: 999px;
    background-color: var(--color-darkslategray-600);
  }
  .trendRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 12px;
    border-radius: 8px;
    background-color: #f2ede3;
    font-family: var(--font-inter);
    font-size: 14px;
  }
  .trendLabel {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #737373;
  }
  .trendValue {
    color: var(--color-darkslategray-600);
    font-weight: 500;
  }

  @media screen and (max-width: 1023px) {
    .grid {
      grid-template-columns: 1fr;
      max-width: 520px;
    }
  }
  @media screen and (max-width: 640px) {
    .features4 {
      padding: 48px 16px;
    }
    .heading {
      font-size: 36px;
    }
    .subtitle {
      font-size: 15px;
    }
    .grid {
      margin-top: 36px;
    }
    .card {
      border-radius: 32px;
    }
    .cardContent {
      padding: 12px;
    }
    .visual {
      min-height: 320px;
      border-radius: 26px;
    }
    .cardTitle {
      font-size: 22px;
    }
    .cardText {
      font-size: 15px;
    }
  }
</style>
