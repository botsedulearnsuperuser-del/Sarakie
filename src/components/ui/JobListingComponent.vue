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

const RESEND_LOGO = `<svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true"><path d="M186 447.471V154H318.062C336.788 154 353.697 158.053 368.79 166.158C384.163 174.263 396.181 185.443 404.845 199.698C413.51 213.672 417.842 229.604 417.842 247.491C417.842 265.938 413.51 282.568 404.845 297.381C396.181 311.915 384.302 323.375 369.209 331.759C354.117 340.144 337.067 344.337 318.062 344.337H253.917V447.471H186ZM348.667 447.471L274.041 314.99L346.99 304.509L430 447.471H348.667ZM253.917 289.835H311.773C319.04 289.835 325.329 288.298 330.639 285.223C336.229 281.869 340.421 277.258 343.216 271.388C346.291 265.519 347.828 258.811 347.828 251.265C347.828 243.718 346.151 237.15 342.797 231.56C339.443 225.691 334.552 221.219 328.124 218.144C321.975 215.07 314.428 213.533 305.484 213.533H253.917V289.835Z" fill="currentColor"/></svg>`;

const TURSO_LOGO = `<svg viewBox="0 0 201 170" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true"><path d="m100.055 170c-2.1901 0-18.2001-12.8-21.3001-16.45-2.44 3.73-6.44 7.96-6.44 7.96-11.05-5.57-25.17-20.06-27.83-25.13-2.62-5-12.13-62.58-12.39-79.3-.34-9.41 5.85-28.49 67.9601-28.49 62.11 0 68.29 19.08 67.96 28.49-.25 16.72-9.76 74.3-12.39 79.3-2.66 5.07-16.78 19.56-27.83 25.13 0 0-4-4.23-6.44-7.96-3.1 3.65-19.11 16.45-21.3 16.45z" fill="#1ebca1"/><path d="m100.055 132.92c-20.7301 0-33.9601-10.95-33.9601-10.95l1.91-26.67-21.75-1.94-3.91-31.55h115.4301l-3.91 31.55-21.75 1.94 1.91 26.67s-13.23 10.95-33.96 10.95z" fill="#183134"/><path d="m121.535 75.79 78.52-27.18c-4.67-27.94-29.16-48.61-29.16-48.61v30.78l-14.54 3.75-9.11-10.97-7.8 15.34-39.38 10.16-39.3801-10.16-7.8-15.34-9.11 10.97-14.54-3.75v-30.78s-24.50997 20.67-29.1799684 48.61l78.5199684 27.18-2.8 37.39c6.7 1.7 13.75 3.39 24.2801 3.39 10.53 0 17.57-1.69 24.27-3.39l-2.8-37.39z" fill="#4ff8d2"/></svg>`;

const SUPABASE_LOGO = `<svg viewBox="0 0 109 113" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true"><path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#jl-p0)"/><path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#jl-p1)" fill-opacity="0.2"/><path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E"/><defs><linearGradient gradientUnits="userSpaceOnUse" id="jl-p0" x1="53.9738" x2="94.1635" y1="54.974" y2="71.8295"><stop stop-color="#249361"/><stop offset="1" stop-color="#3ECF8E"/></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="jl-p1" x1="36.1558" x2="54.4844" y1="30.578" y2="65.0806"><stop/><stop offset="1" stop-opacity="0"/></linearGradient></defs></svg>`;

const SAMPLE_JOBS: Job[] = [
  {
    company: "Resend",
    job_description:
      "We're looking for a senior frontend engineer to help us build the future of email infrastructure. You'll work on our React-based dashboard and help scale our platform.",
    job_time: "Full-time",
    location: "San Francisco",
    logo: RESEND_LOGO,
    remote: "Hybrid",
    salary: "$120k - $180k",
    title: "Senior Frontend Engineer",
  },
  {
    company: "Turso",
    job_description:
      "Join our team to build the next generation of edge database technology. You'll work with Rust and help optimize our distributed database system.",
    job_time: "Full-time",
    location: "Remote",
    logo: TURSO_LOGO,
    remote: "Yes",
    salary: "$100k - $150k",
    title: "Backend Developer",
  },
  {
    company: "Supabase",
    job_description:
      "Help developers around the world discover and adopt Supabase. You'll create content, speak at conferences, and build community around our open-source platform.",
    job_time: "Full-time",
    location: "Remote",
    logo: SUPABASE_LOGO,
    remote: "Yes",
    salary: "$90k - $130k",
    title: "Developer Advocate",
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
