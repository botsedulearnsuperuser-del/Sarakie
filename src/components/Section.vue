<template>
  <div :class="$style.section">
    <div :class="$style.h2balH">
      <h3 :class="$style.totalLoansEach">Total submissions each month</h3>
    </div>
    <div :class="$style.p">
      <div :class="$style.longTermLoan">
        Innovation submission counts {{ year }}
      </div>
    </div>

    <div :class="$style.chart">
      <div :class="$style.yAxis">
        <span v-for="tick in ticks" :key="tick" :class="$style.tick">{{ tick }}</span>
      </div>
      <div :class="$style.plot">
        <div :class="$style.grid">
          <span v-for="tick in ticks" :key="tick" :class="$style.gridLine" />
        </div>
        <div :class="$style.columns">
          <div v-for="(month, index) in months" :key="month.key" :class="$style.column">
            <span :class="$style.barValue">{{ month.count }}</span>
            <div
              :class="[
                $style.bar,
                index === months.length - 1 ? $style.barLatest : $style.barMuted,
              ]"
              :style="{ height: barHeight(month.count) }"
              :title="`${month.label}: ${month.count} submission${month.count === 1 ? '' : 's'}`"
            />
          </div>
        </div>
      </div>
    </div>

    <div :class="$style.monthLabels">
      <span v-for="month in months" :key="month.key" :class="$style.monthLabel">
        {{ month.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { MonthlyCount } from "../lib/portal-data";

const props = withDefaults(defineProps<{ months?: MonthlyCount[] }>(), {
  months: () => [],
});

const year = new Date().getFullYear();

const months = computed(() => props.months);

/** Round the axis top up to a friendly step so bars are readable at low counts. */
const axisMax = computed(() => {
  const peak = Math.max(1, ...months.value.map((month) => month.count));
  const step = peak <= 4 ? 1 : Math.ceil(peak / 4);
  return step * 4;
});

const ticks = computed(() => {
  const max = axisMax.value;
  return [max, Math.round((max * 3) / 4), Math.round(max / 2), Math.round(max / 4), 0];
});

function barHeight(count: number): string {
  const percent = (count / axisMax.value) * 100;
  return `${Math.max(count > 0 ? 6 : 0, percent)}%`;
}
</script>

<style module>
  .section {
    position: relative;
    width: auto;
    inset: auto;
    height: 100%;
    border-radius: var(--br-26);
    background-color: var(--color-white);
    border: var(--border-2);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 24px 24px 20px;
    gap: var(--gap-4);
    max-width: 100%;
    min-width: 0;
    text-align: left;
    font-size: 20.8px;
    color: var(--color-darkslategray-100);
    font-family: var(--font-inter);
  }
  .h2balH {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: var(--color-darkslategray-500);
  }
  .totalLoansEach {
    margin: 0;
    align-self: stretch;
    font-size: inherit;
    font-weight: 800;
    font-family: inherit;
  }
  .p {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-14);
  }
  .longTermLoan {
    align-self: stretch;
    font-size: var(--fs-14);
  }
  .chart {
    display: flex;
    gap: 10px;
    align-items: stretch;
    margin-top: 18px;
    min-height: 190px;
  }
  .yAxis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 18px;
    font-size: var(--fs-12);
    color: var(--color-darkslategray-300);
    width: 26px;
  }
  .tick {
    line-height: 1;
  }
  .plot {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .grid {
    position: absolute;
    inset: 0 0 18px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .gridLine {
    height: 1px;
    background-color: var(--color-antiquewhite-200);
    opacity: 0.7;
  }
  .columns {
    position: relative;
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--gap-12);
    padding-bottom: 18px;
    box-sizing: border-box;
  }
  .column {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }
  .barValue {
    font-size: var(--fs-12);
    font-weight: 700;
    color: var(--color-darkslategray-400);
  }
  .bar {
    width: 100%;
    max-width: 44px;
    border-radius: var(--br-10) var(--br-10) var(--br-0) var(--br-0);
    transition: height 0.25s ease;
  }
  .barMuted {
    background-color: var(--color-darkslategray-500);
    opacity: 0.35;
  }
  .barLatest {
    background-color: var(--color-goldenrod-200);
  }
  .monthLabels {
    display: flex;
    justify-content: space-between;
    gap: var(--gap-12);
    margin-left: 36px;
    font-size: var(--fs-13);
    color: var(--color-darkslategray-300);
  }
  .monthLabel {
    flex: 1;
    text-align: center;
  }

  @media screen and (max-width: 450px) {
    .totalLoansEach {
      font-size: var(--fs-17);
    }
    .monthLabels {
      margin-left: 0;
    }
  }
</style>
