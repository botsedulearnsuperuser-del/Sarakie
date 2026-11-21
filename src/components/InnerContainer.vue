<template>
  <div :class="$style.wrap">
    <header :class="$style.header">
      <div :class="$style.headerLine" />
      <h2 :class="$style.title">One platform, end to end</h2>
      <p :class="$style.subtitle">
        From submission through rigorous evaluation to recognition and reward.
      </p>
    </header>

    <div :class="$style.cards">
      <FollowerPointerCard
        v-for="card in cards"
        :key="card.title"
        :class="$style.cardWrap"
      >
        <template #title>
          <span :class="$style.followerTitle">
            <img
              :class="$style.followerAvatar"
              src="/innovator-man.webp"
              :alt="card.title"
              height="20"
              width="20"
            />
            <span>{{ card.title }}</span>
          </span>
        </template>

        <div :class="$style.demoCard">
          <div :class="$style.thumbWrap">
            <img :class="$style.thumb" :src="card.image" :alt="card.title" />
          </div>
          <img
            :class="$style.cardPattern"
            alt=""
            src="/untitled-3-21.webp"
          />
          <div :class="$style.cardContent">
            <h2 :class="$style.cardHeading">{{ card.title }}</h2>
            <h2 :class="$style.cardBody">
              {{ card.description }}
            </h2>
            <div :class="$style.cardFooter">
              <span :class="$style.cardDate">{{ card.open ? 'Application open' : 'Application closed' }}</span>
              <a :class="$style.cardCta" href="#contact">Learn more</a>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>

    <Integrations2 />

    <FollowerPointerCard title="Features">
      <Features4 />
    </FollowerPointerCard>

    <Bento1 />

  </div>
</template>
<script setup lang="ts">
import FollowerPointerCard from "./ui/following-pointer.vue";
import Integrations2 from "./ui/integrations2.vue";
import Features4 from "./ui/features4.vue";
import Bento1 from "./ui/bento1.vue";

const cards = [
  {
    title: "Idea Submission",
    open: true,
    description:
      "Intuitive portal with mandatory fields and document uploads for effortless idea capture.",
    image: "/themes/gaborone.jpg",
  },
  {
    title: "Multi-Level Evaluation",
    open: true,
    description:
      "Evaluation teams score on customisable criteria with adjudication and feedback loops.",
    image: "/themes/gaborone-hills.jpg",
  },
  {
    title: "Status Tracking",
    open: true,
    description:
      "Track every idea from submission through review, feedback, approval and award.",
    image: "/themes/okavango.jpg",
  },
];
</script>
<style module>
.wrap {
  width: 100%;
  max-width: 1152px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
}
.header {
  width: 100%;
  max-width: 900px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
}
.headerLine {
  width: 170px;
  height: 3px;
  background-color: var(--color-goldenrod-300);
}
.title {
  margin: 0;
  color: var(--color-darkslategray-600);
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 900;
  font-family: var(--font-inter);
  line-height: 1.1;
}
.subtitle {
  margin: 0;
  color: var(--color-darkslategray-600);
  font-size: var(--fs-18);
  font-family: var(--font-inter);
  max-width: 640px;
  line-height: 1.4;
}
.cards {
  width: 100%;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

/* ── Card: rounded-2xl border border-zinc-100 bg-white transition duration-200 hover:shadow-xl ── */
.cardWrap {
  width: 100%;
  height: 100%;
  display: flex;
}
.demoCard {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid #f4f4f5;
  background-color: rgba(1, 53, 37, 0.04);
  transition: box-shadow 200ms ease;
}
.cardWrap:hover .demoCard {
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* relative aspect-[16/10] w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-100 */
.thumbWrap {
  position: relative;
  aspect-ratio: 16 / 10;
  width: 100%;
  overflow: hidden;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #f3f4f6;
}

/* h-full object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl */
.thumb {
  height: 100%;
  width: 100%;
  display: block;
  object-fit: cover;
  transition:
    transform 200ms ease,
    border-radius 200ms ease;
}
.cardWrap:hover .thumb {
  transform: scale(0.95);
  border-radius: 16px;
}

/* decorative pattern sitting behind the card copy */
.cardPattern {
  position: absolute;
  right: -70px;
  bottom: -60px;
  width: 200px;
  opacity: 0.45;
  pointer-events: none;
  z-index: 0;
  object-fit: contain;
}

/* p-4 */
.cardContent {
  position: relative;
  z-index: 1;
  padding: 16px;
}

/* my-4 text-lg font-bold text-zinc-700 */
.cardHeading {
  margin: 16px 0;
  font-size: 18px;
  line-height: 28px;
  font-weight: 700;
  color: #3f3f46;
  font-family: var(--font-inter);
}

/* my-4 text-sm font-normal text-zinc-500 */
.cardBody {
  margin: 16px 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #71717a;
  font-family: var(--font-inter);
}

/* mt-10 flex flex-row items-center justify-between */
.cardFooter {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

/* text-sm text-gray-500 */
.cardDate {
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
  font-family: var(--font-inter);
}

/* relative z-10 block rounded-xl bg-black px-6 py-2 text-xs font-bold text-white */
.cardCta {
  position: relative;
  z-index: 10;
  display: block;
  border-radius: 12px;
  background-color: #000000;
  padding: 8px 24px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  white-space: nowrap;
  font-family: var(--font-inter);
  transition: background-color 200ms ease;
}
.cardCta:hover {
  background-color: #27272a;
}

/* Cursor tag: flex items-center space-x-2 */
.followerTitle {
  display: flex;
  align-items: center;
  gap: 8px;
}
.followerAvatar {
  height: 20px;
  width: 20px;
  border-radius: 9999px;
  border: 2px solid #ffffff;
  object-fit: cover;
}

@media screen and (max-width: 1000px) {
  .cards {
    grid-template-columns: 1fr;
    max-width: 420px;
    margin: 0 auto;
  }
}
</style>
