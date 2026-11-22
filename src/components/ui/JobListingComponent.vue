<template>
  <div ref="rootRef" :class="[$style.root, className]">
    <Teleport to="body">
      <Transition name="job-fade">
        <div v-if="active" :class="$style.backdrop" aria-hidden="true" />
      </Transition>

      <Transition name="job-pop">
        <div v-if="active" :class="$style.detailLayer">
          <div
            ref="detailRef"
            :class="$style.detailCard"
            :style="cardWidth ? { width: cardWidth } : undefined"
            role="dialog"
            aria-modal="true"
          >
            <div :class="$style.detailHead">
              <span :class="$style.detailLogo" v-html="active.logo" />
              <div :class="$style.detailInfo">
                <div :class="$style.detailCompany">{{ active.company }}</div>
                <p :class="$style.detailTitle">{{ active.title }} / {{ active.salary }}</p>
                <div :class="$style.meta">{{ meta(active) }}</div>
              </div>
            </div>
            <p :class="$style.detailDesc">{{ active.job_description }}</p>
          </div>
        </div>
      </Transition>
    </Teleport>

    <div ref="listRef" :class="$style.list">
      <button
        v-for="job in jobs"
        :key="job.company"
        :class="$style.item"
        type="button"
        @click="select(job)"
      >
        <span :class="$style.logo" v-html="job.logo" />
        <span :class="$style.info">
          <span :class="$style.company">{{ job.company }}</span>
          <span :class="$style.subtitle">{{ job.title }} / {{ job.salary }}</span>
          <span :class="$style.meta">{{ meta(job) }}</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

export interface Job {
  company: string;
  job_description: string;
  job_time: string;
  location: string;
  logo: string;
  remote: string;
  salary: string;
  title: string;
}

interface Props {
  className?: string;
  jobs?: Job[];
}

const props = withDefaults(defineProps<Props>(), {
  className: "",
  jobs: () => [],
});

const emit = defineEmits<{ (e: "jobClick", job: Job): void }>();

const rootRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const detailRef = ref<HTMLElement | null>(null);
const active = ref<Job | null>(null);
const cardWidth = ref("");

const jobs = computed(() => (props.jobs.length ? props.jobs : SAMPLE_JOBS));

function meta(job: Job) {
  const place =
    job.remote === "Hybrid" ? `${job.remote} / ${job.location}` : job.location;
  return `${place} | ${job.job_time}`;
}

function select(job: Job) {
  const listWidth = listRef.value ? listRef.value.getBoundingClientRect().width : 0;
  cardWidth.value = listWidth ? `${Math.round(listWidth * 1.25)}px` : "";
  active.value = job;
  emit("jobClick", job);
}

function close() {
  active.value = null;
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}

function onPointerDown(e: MouseEvent) {
  if (!active.value) return;
  const target = e.target as Node;
  if (detailRef.value && !detailRef.value.contains(target)) close();
}

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("mousedown", onPointerDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("mousedown", onPointerDown);
});

const CEDA_LOGO = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M7 12h10M12 7v10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;

const SAMPLE_JOBS: Job[] = [
  {
    company: "Idea Submission",
    job_description:
      "Innovators submit their ideas through the portal with mandatory fields and document uploads for effortless idea capture.",
    job_time: "Stage 1",
    location: "Online",
    logo: CEDA_LOGO,
    remote: "Yes",
    salary: "Open",
    title: "Submit your innovation idea",
  },
  {
    company: "Multi-Level Evaluation",
    job_description:
      "Evaluation teams score ideas on customisable criteria with adjudication and feedback loops.",
    job_time: "Stage 2",
    location: "Online",
    logo: CEDA_LOGO,
    remote: "Yes",
    salary: "In review",
    title: "Evaluate on custom criteria",
  },
  {
    company: "Status Tracking",
    job_description:
      "Track every idea from submission through review, feedback, approval and award.",
    job_time: "Stage 3",
    location: "Online",
    logo: CEDA_LOGO,
    remote: "Yes",
    salary: "Tracked",
    title: "Track and approve",
  },
];
</script>

<style module>
.root {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 420px;
  padding: 24px;
  box-sizing: border-box;
  font-family: var(--font-inter);
}

.list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e2e9e4;
  border-radius: 8px;
  background: #ffffff;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}

.item:hover {
  border-color: var(--color-goldenrod-300);
  box-shadow: 0 6px 16px rgba(1, 53, 37, 0.08);
  transform: translateY(-1px);
}

.item:active {
  transform: scale(0.98);
}

.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  color: var(--color-darkslategray-600);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.company {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-darkslategray-600);
}

.subtitle {
  font-size: 12px;
  color: #6b7f77;
}

.meta {
  font-size: 11px;
  color: #80918a;
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(11, 86, 65, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.detailLayer {
  position: fixed;
  inset: 0;
  z-index: 1001;
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
  font-family: var(--font-inter);
}

.detailCard {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: min(440px, 100%);
  max-width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #e2e9e4;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 24px 50px rgba(1, 53, 37, 0.18);
  font-family: var(--font-inter);
  cursor: pointer;
}

.detailHead {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.detailLogo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  color: var(--color-darkslategray-600);
}

.detailInfo {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.detailCompany {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-darkslategray-600);
}

.detailTitle {
  margin: 0;
  font-size: 14px;
  color: #1b2420;
}

.detailDesc {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #3f4d47;
}

/* transitions */
.job-fade-enter-active,
.job-fade-leave-active {
  transition: opacity 0.2s ease;
}
.job-fade-enter-from,
.job-fade-leave-to {
  opacity: 0;
}

.job-pop-enter-active,
.job-pop-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.job-pop-enter-from,
.job-pop-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .item,
  .job-fade-enter-active,
  .job-fade-leave-active,
  .job-pop-enter-active,
  .job-pop-leave-active {
    transition: none;
  }
}
</style>
