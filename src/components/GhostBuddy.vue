<template>
  <div :class="$style.buddy">
    <div v-if="props.showBubble !== false" :class="$style.bubble">{{ typed }}</div>

    <div :class="$style.stage">
      <div :class="$style.ghost" :style="{ '--bounce': bounceDuration }">
        <div :class="$style.body">
          <div :class="[$style.pupil, $style.pupilLeft]"></div>
          <div :class="[$style.pupil, $style.pupilRight]"></div>
          <div :class="[$style.eye, $style.eyeLeft]"></div>
          <div :class="[$style.eye, $style.eyeRight]"></div>
          <div :class="[$style.block, $style.top0]"></div>
          <div :class="[$style.block, $style.top1]"></div>
          <div :class="[$style.block, $style.top2]"></div>
          <div :class="[$style.block, $style.top3]"></div>
          <div :class="[$style.block, $style.top4]"></div>
          <div :class="[$style.block, $style.st0]"></div>
          <div :class="[$style.block, $style.st1]"></div>
          <div :class="[$style.block, $style.st2]"></div>
          <div :class="[$style.block, $style.st3]"></div>
          <div :class="[$style.block, $style.st4]"></div>
          <div :class="[$style.block, $style.st5]"></div>
          <div :class="[$style.antenna, $style.an1]"></div>
          <div :class="[$style.antenna, $style.an2]"></div>
          <div :class="[$style.antenna, $style.an3]"></div>
          <div :class="[$style.antenna, $style.an4]"></div>
          <div :class="[$style.antenna, $style.an5]"></div>
          <div :class="[$style.antenna, $style.an6]"></div>
          <div :class="[$style.antenna, $style.an7]"></div>
          <div :class="[$style.antenna, $style.an8]"></div>
          <div :class="[$style.antenna, $style.an9]"></div>
          <div :class="[$style.antenna, $style.an10]"></div>
          <div :class="[$style.antenna, $style.an11]"></div>
          <div :class="[$style.antenna, $style.an12]"></div>
          <div :class="[$style.antenna, $style.an13]"></div>
          <div :class="[$style.antenna, $style.an14]"></div>
          <div :class="[$style.antenna, $style.an15]"></div>
          <div :class="[$style.antenna, $style.an16]"></div>
          <div :class="[$style.antenna, $style.an17]"></div>
          <div :class="[$style.antenna, $style.an18]"></div>
        </div>
        <div :class="$style.shadow"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount, ref, watch } from "vue";

  const props = defineProps<{
    step?: number;
    confirmed?: boolean;
    showBubble?: boolean;
  }>();

  const step = computed(() => Math.min(Math.max(props.step ?? 1, 1), 6));
  const confirmed = computed(() => props.confirmed === true);

  const cheer = [
    "I am growing and so are you.",
    "Nice one, keep it coming.",
    "Your idea is taking shape.",
    "Look at you go.",
    "Almost there, stay with me.",
  ];

  const typed = ref("");
  let messageIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const bounceDuration = computed(() => {
    if (confirmed.value) return "0.24s";
    const seconds = 0.95 - (step.value - 1) * 0.12;
    return `${Math.max(seconds, 0.3).toFixed(2)}s`;
  });

  function tick() {
    const target = confirmed.value ? "You made it!" : cheer[messageIndex];

    if (!deleting) {
      charIndex += 1;
      typed.value = target.slice(0, charIndex);
      if (charIndex >= target.length) {
        if (confirmed.value) return;
        timer = setTimeout(() => {
          deleting = true;
          tick();
        }, 1500);
        return;
      }
      timer = setTimeout(tick, 58);
      return;
    }

    charIndex -= 1;
    typed.value = target.slice(0, Math.max(charIndex, 0));
    if (charIndex <= 0) {
      deleting = false;
      messageIndex = (messageIndex + 1) % cheer.length;
      timer = setTimeout(tick, 380);
      return;
    }
    timer = setTimeout(tick, 26);
  }

  function restart() {
    if (timer) clearTimeout(timer);
    if (confirmed.value) {
      typed.value = "";
      charIndex = 0;
      deleting = false;
      tick();
      return;
    }
    messageIndex = 0;
    charIndex = 0;
    deleting = false;
    typed.value = "";
    tick();
  }

  watch(confirmed, (value) => {
    if (timer) clearTimeout(timer);
    typed.value = "";
    charIndex = 0;
    deleting = false;
    if (value) {
      tick();
    } else {
      restart();
    }
  });

  restart();

  onBeforeUnmount(() => {
    if (timer) clearTimeout(timer);
  });
</script>

<style module>
  .buddy {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 100px;
    flex-shrink: 0;
  }

  .bubble {
    min-height: 30px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 7px;
    border-radius: 9px;
    background-color: #ffffff;
    border: 1px solid #ede9e1;
    color: #0f2e24;
    font-size: 10.5px;
    font-weight: 600;
    line-height: 1.25;
    text-align: center;
  }

  .stage {
    width: 68px;
    height: 68px;
    position: relative;
    display: grid;
    place-items: center;
  }

  .ghost {
    position: relative;
    width: 140px;
    height: 140px;
    transform: scale(0.45);
    transform-origin: center;
  }

  .body {
    position: relative;
    width: 140px;
    height: 140px;
    display: grid;
    grid-template-columns: repeat(14, 1fr);
    grid-template-rows: repeat(14, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    grid-template-areas:
      "a1  a2  a3  a4  a5  top0  top0  top0  top0  a10 a11 a12 a13 a14"
      "b1  b2  b3  top1 top1 top1 top1 top1 top1 top1 top1 b12 b13 b14"
      "c1 c2 top2 top2 top2 top2 top2 top2 top2 top2 top2 top2 c13 c14"
      "d1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 d14"
      "e1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 e14"
      "f1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 f14"
      "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
      "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
      "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
      "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
      "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
      "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
      "st0 st0 an4 st1 an7 st2 an10 an10 st3 an13 st4 an16 st5 st5"
      "an1 an2 an3 an5 an6 an8 an9 an9 an11 an12 an14 an15 an17 an18";
    animation: upNDown infinite var(--bounce, 0.9s);
  }

  @keyframes upNDown {
    0%,
    49% {
      transform: translateY(0px);
    }
    50%,
    100% {
      transform: translateY(-10px);
    }
  }

  .block,
  .top0,
  .top1,
  .top2,
  .top3,
  .top4,
  .st0,
  .st1,
  .st2,
  .st3,
  .st4,
  .st5 {
    background-color: #c0392b;
  }

  .top0 {
    grid-area: top0;
  }

  .top1 {
    grid-area: top1;
  }

  .top2 {
    grid-area: top2;
  }

  .top3 {
    grid-area: top3;
  }

  .top4 {
    grid-area: top4;
  }

  .st0 {
    grid-area: st0;
  }

  .st1 {
    grid-area: st1;
  }

  .st2 {
    grid-area: st2;
  }

  .st3 {
    grid-area: st3;
  }

  .st4 {
    grid-area: st4;
  }

  .st5 {
    grid-area: st5;
  }

  .antenna {
    background-color: #c0392b;
  }

  .an1 {
    grid-area: an1;
    animation: flicker0 infinite 0.5s;
  }

  .an18 {
    grid-area: an18;
    animation: flicker0 infinite 0.5s;
  }

  .an2 {
    grid-area: an2;
    animation: flicker1 infinite 0.5s;
  }

  .an17 {
    grid-area: an17;
    animation: flicker1 infinite 0.5s;
  }

  .an3 {
    grid-area: an3;
    animation: flicker1 infinite 0.5s;
  }

  .an16 {
    grid-area: an16;
    animation: flicker1 infinite 0.5s;
  }

  .an4 {
    grid-area: an4;
    animation: flicker1 infinite 0.5s;
  }

  .an15 {
    grid-area: an15;
    animation: flicker1 infinite 0.5s;
  }

  .an6 {
    grid-area: an6;
    animation: flicker0 infinite 0.5s;
  }

  .an12 {
    grid-area: an12;
    animation: flicker0 infinite 0.5s;
  }

  .an7 {
    grid-area: an7;
    animation: flicker0 infinite 0.5s;
  }

  .an13 {
    grid-area: an13;
    animation: flicker0 infinite 0.5s;
  }

  .an9 {
    grid-area: an9;
    animation: flicker1 infinite 0.5s;
  }

  .an10 {
    grid-area: an10;
    animation: flicker1 infinite 0.5s;
  }

  .an8 {
    grid-area: an8;
    animation: flicker0 infinite 0.5s;
  }

  .an11 {
    grid-area: an11;
    animation: flicker0 infinite 0.5s;
  }

  .an5 {
    grid-area: an5;
  }

  .an14 {
    grid-area: an14;
  }

  @keyframes flicker0 {
    0%,
    49% {
      background-color: #c0392b;
    }
    50%,
    100% {
      background-color: transparent;
    }
  }

  @keyframes flicker1 {
    0%,
    49% {
      background-color: transparent;
    }
    50%,
    100% {
      background-color: #c0392b;
    }
  }

  .eye {
    position: absolute;
    width: 40px;
    height: 50px;
    top: 30px;
  }

  .eyeLeft {
    left: 10px;
  }

  .eyeRight {
    right: 30px;
  }

  .eye::before {
    content: "";
    background-color: #ffffff;
    width: 20px;
    height: 50px;
    transform: translateX(10px);
    display: block;
    position: absolute;
  }

  .eye::after {
    content: "";
    background-color: #ffffff;
    width: 40px;
    height: 30px;
    transform: translateY(10px);
    display: block;
    position: absolute;
  }

  .pupil {
    width: 20px;
    height: 20px;
    background-color: #1d4ed8;
    position: absolute;
    top: 50px;
    z-index: 1;
    animation: eyesMovement infinite 3s;
  }

  .pupilLeft {
    left: 10px;
  }

  .pupilRight {
    right: 50px;
  }

  @keyframes eyesMovement {
    0%,
    49% {
      transform: translateX(0px);
    }
    50%,
    99% {
      transform: translateX(10px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  .shadow {
    background-color: #000000;
    width: 140px;
    height: 140px;
    position: absolute;
    border-radius: 50%;
    transform: rotateX(80deg) scale(0.42);
    filter: blur(20px);
    top: 80%;
    left: 0;
    animation: shadowMovement infinite var(--bounce, 0.9s);
  }

  @keyframes shadowMovement {
    0%,
    49% {
      opacity: 0.35;
    }
    50%,
    100% {
      opacity: 0.15;
    }
  }
</style>
