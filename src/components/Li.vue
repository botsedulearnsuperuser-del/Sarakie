<template>
  <div :class="$style.li">
    <div :class="$style.span">
      <div :class="$style.p">{{ p }}</div>
    </div>
    <div :class="$style.div">
      <div :class="$style.div2">
        <div :class="$style.thatoLekgoba">{{ thatoLekgoba }}</div>
      </div>
      <div :class="$style.div3">
        <div :class="$style.september">{{ september }}</div>
      </div>
    </div>
    <div :class="$style.span2">
      <b :class="$style.p90000" :style="p90000Style">{{ p90000 }}</b>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { StyleValue, computed } from "vue"

  const props = defineProps<{
    p?: string
    thatoLekgoba?: string
    september?: string
    p90000?: string
    p90000MinWidth?: string | number
    p90000Display?: string
  }>()

  const p90000Style = computed((): StyleValue => ({
    minWidth: props.p90000MinWidth !== undefined ? String(props.p90000MinWidth) : undefined,
    display: props.p90000Display,
  }))
</script>
<style module>
  .li {
    align-self: stretch;
    border-bottom: var(--border-11);
    overflow-x: hidden;
    display: flex;
    align-items: center;
    padding: var(--padding-12) var(--padding-0);
    gap: var(--gap-14);
    text-align: left;
    font-size: var(--fs-14);
    color: var(--color-darkslategray-500);
    font-family: var(--font-inter);
  }
  .span {
    width: var(--width-40);
    border-radius: var(--br-12);
    background-color: var(--color-wheat);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--padding-11_5) var(--padding-0);
    box-sizing: border-box;
  }
  .p {
    position: relative;
    font-weight: 800;
  }
  .div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-15);
    color: var(--color-darkslategray-700);
  }
  .div2 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .thatoLekgoba {
    align-self: stretch;
    position: relative;
    font-weight: 600;
  }
  .div3 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--fs-13);
    color: var(--color-darkslategray-100);
  }
  .september {
    align-self: stretch;
    position: relative;
  }
  .span2 {
    height: var(--height-17);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .p90000 {
    position: relative;
    display: inline-block;
    min-width: 67px;
  }
</style>
