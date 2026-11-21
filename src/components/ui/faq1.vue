<template>
  <section :class="[$style.section, className]">
    <div :class="$style.header">
      <span v-if="badge" :class="$style.badge">{{ badge }}</span>
      <h2 :class="$style.title">
        <slot name="title">{{ title }}</slot>
      </h2>
    </div>

    <div :class="$style.accordion">
      <div
        v-for="faq in faqs"
        :key="faq.id"
        :class="$style.item"
      >
        <button
          type="button"
          :class="$style.trigger"
          @click="toggle(faq.id)"
          :aria-expanded="openId === faq.id"
        >
          <span :class="$style.question">{{ faq.question }}</span>
          <span :class="$style.iconWrap" aria-hidden="true">
            <svg
              v-if="openId !== faq.id"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <svg
              v-else
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
        </button>
        <div v-show="openId === faq.id" :class="$style.content">
          <p :class="$style.answer">{{ faq.answer }}</p>
          <div v-if="faq.date" :class="$style.date">{{ faq.date }}</div>
        </div>
      </div>
    </div>

    <div
      v-if="footerText || footerLinkText"
      :class="$style.footer"
    >
      <span v-if="footerText" :class="$style.footerText">{{ footerText }}</span>
      <a
        v-if="footerLinkText"
        :href="footerLinkHref || '#'"
        :class="$style.footerLink"
      >
        {{ footerLinkText }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  date?: string;
}

interface Faq1Props {
  badge?: string;
  title?: string;
  faqs: FaqItem[];
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  className?: string;
}

withDefaults(defineProps<Faq1Props>(), {
  faqs: () => [],
});

const openId = ref<string | null>(null);

function toggle(id: string) {
  openId.value = openId.value === id ? null : id;
}
</script>

<style module>
.section {
  margin: 0 auto;
  width: 100%;
  max-width: 896px;
  padding: 64px 16px;
  box-sizing: border-box;
  font-family: var(--font-inter);
}

.header {
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.badge {
  margin-bottom: 24px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  background-color: var(--color-linen);
  color: var(--color-darkslategray-600);
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 500;
}

.title {
  margin: 0;
  max-width: 672px;
  color: var(--color-darkslategray-600);
  font-size: 30px;
  line-height: 1.15;
  font-weight: 600;
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .title {
    font-size: 48px;
  }
}

.accordion {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.item {
  border-radius: 0;
  background-color: var(--color-linen);
  padding: 0 24px;
}

.trigger {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;
  padding: 24px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
}

.question {
  flex: 1;
  padding-right: 16px;
  color: var(--color-darkslategray-600);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
}

@media (min-width: 768px) {
  .question {
    font-size: 18px;
  }
}

.iconWrap {
  color: var(--color-darkslategray-300);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.content {
  padding-bottom: 24px;
}

.answer {
  margin: 0;
  color: var(--color-darkslategray-200);
  font-size: 14px;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .answer {
    font-size: 16px;
  }
}

.date {
  margin-top: 16px;
  color: var(--color-gray-100);
  font-size: 14px;
  font-weight: 500;
}

.footer {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
}

.footerText {
  color: var(--color-darkslategray-200);
  font-size: 14px;
}

.footerLink {
  color: var(--color-darkslategray-600);
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
}

.footerLink:hover {
  color: var(--color-darkslategray-500);
}
</style>
