<template>
  <div :class="$style.li">
    <div :class="$style.span">
      <svg
        :class="$style.p"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <g fill="none">
          <path
            fill="currentColor"
            d="M19.99 8.46c.24.53.36.8.36 1.01a1 1 0 0 1-.6.91c-.19.1-.48.1-1.06.1H6.42c-.62 0-.92 0-1.17.15s-.37.43-.64.98L1.7 17.77l.38-11.31c.02-.82.04-1.23.29-1.5s.65-.32 1.46-.42l1.33-.16h2.33c.36 0 .54 0 .71.06s.3.18.58.41l2.43 2.06c.27.22.4.33.55.4c.16.05.33.06.67.07l6.32.24c.26.01.38.02.5.05a1 1 0 0 1 .52.35c.07.1.12.21.23.44"
            opacity=".2"
          />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M11.29 19.59h-3.6c-2.83 0-4.25 0-5.13-.88s-.87-2.3-.87-5.12V6.9a2.4 2.4 0 0 1 2.4-2.4h2.06c.51 0 .77 0 1.02.03a4 4 0 0 1 1.82.71c.2.15.4.32.77.66c.38.35.56.52.77.67a4 4 0 0 0 1.82.7c.25.04.5.04 1.02.04h4.45c1.7 0 3.07 1.37 3.07 3.07"
          />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M10.8 10.42h6.87c2.67 0 4 0 4.6.87c.6.88.1 2.12-.89 4.6l-.46 1.17c-.49 1.23-.73 1.84-1.24 2.18c-.5.35-1.16.35-2.48.35H7.38c-2.59 0-3.88 0-4.48-.85c-.6-.86-.16-2.07.72-4.51l.42-1.17c.47-1.28.7-1.92 1.21-2.28c.52-.36 1.2-.36 2.56-.36z"
          />
        </g>
      </svg>
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
      <span :class="[$style.statusBadge, statusClass]">{{ status }}</span>
    </div>
    <button :class="$style.viewButton" type="button" @click="$emit('view', thatoLekgoba ?? '')">
      View
    </button>
  </div>
</template>
<script setup lang="ts">
  import { computed, useCssModule } from "vue"

  const props = defineProps<{
    p?: string
    thatoLekgoba?: string
    september?: string
    status?: string
  }>()

  defineEmits<{
    (e: "view", name: string): void
  }>()

  const styles = useCssModule()

  const statusClass = computed(() => {
    switch ((props.status ?? "").toLowerCase()) {
      case "approved":
        return styles.statusApproved
      case "awarded":
        return styles.statusAwarded
      case "feedback required":
        return styles.statusFeedback
      default:
        return styles.statusReview
    }
  })
</script>
<style module>
  .li {
    align-self: stretch;
    border: var(--border-2);
    border-radius: var(--br-16);
    background-color: var(--color-white);
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: var(--padding-12) var(--padding-16);
    gap: var(--gap-14);
    margin-bottom: var(--gap-10);
    text-align: left;
    font-size: var(--fs-14);
    color: var(--color-darkslategray-500);
    font-family: var(--font-inter);
    position: relative;
    overflow: hidden;
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
    width: 22px;
    height: 22px;
    color: var(--color-darkslategray-500);
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
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-shrink: 0;
  }
  .statusBadge {
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 10px;
    border-radius: 999px;
    font-size: var(--fs-12);
    font-weight: 700;
    white-space: nowrap;
  }
  .statusReview {
    background-color: var(--color-blanchedalmond);
    color: var(--color-saddlebrown);
  }
  .statusApproved {
    background-color: #e6f4ea;
    color: #1e7a46;
  }
  .statusFeedback {
    background-color: #fdecea;
    color: #b3261e;
  }
  .statusAwarded {
    background-color: #e8eefc;
    color: #274690;
  }
  .viewButton {
    height: 34px;
    border-radius: 10px;
    background-color: var(--color-darkslategray-500);
    color: var(--color-white);
    border: none;
    padding: 0 14px;
    font-size: var(--fs-13);
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.2s, transform 0.15s;
  }
  .viewButton:hover {
    background-color: var(--color-darkslategray-600);
  }
  .viewButton:active {
    transform: translateY(1px);
  }

  @media screen and (max-width: 600px) {
    .li {
      gap: 10px;
      padding: 10px 12px;
      border-radius: 14px;
    }
    .span {
      width: 34px;
      border-radius: 10px;
      padding: 8px 0;
    }
    .p {
      width: 18px;
      height: 18px;
    }
    .div {
      font-size: var(--fs-14);
    }
    .thatoLekgoba,
    .september {
      white-space: nowrap;
    }
    .september {
      font-size: var(--fs-12);
    }
    .statusBadge {
      height: 22px;
      padding: 0 8px;
      font-size: 11px;
    }
    .viewButton {
      height: 32px;
      padding: 0 10px;
      border-radius: 9px;
    }
  }
</style>
