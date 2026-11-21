<template>
  <p :class="[$style.response, className]">
    <template v-for="(token, index) in tokens" :key="index">
      <template v-if="isWhitespaceOrPunctuation(token.value) && !token.citation">
        {{ token.value }}
      </template>
      <span
        v-else-if="token.citation"
        :class="[$style.pill, isNew(index) ? $style.pillNew : '', token.citation.url ? $style.pillLink : '']"
        :title="token.citation.title"
      >
        <a
          v-if="token.citation.url"
          :href="token.citation.url"
          target="_blank"
          rel="noopener noreferrer"
          :class="$style.pillAnchor"
        >{{ token.citation.index }}</a>
        <template v-else>{{ token.citation.index }}</template>
      </span>
      <span
        v-else
        :class="[$style.word, isNew(index) ? $style.wordNew : '']"
      >{{ token.value }}</span>
    </template>
    <span v-if="isStreaming" :class="$style.caret" aria-hidden="true" />
  </p>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated } from "vue";

export interface AIResponseCitation {
  id: string;
  index: number;
  title: string;
  url?: string;
}

interface Props {
  citations?: AIResponseCitation[];
  className?: string;
  isStreaming?: boolean;
  text: string;
}

const props = withDefaults(defineProps<Props>(), {
  citations: () => [],
  className: "",
  isStreaming: false,
});

const CITATION_MARKER = /^\[(\d+)\]$/;
const TOKEN_SPLIT = /(\s+|\[\d+\])/;
const HAS_WORD_CHARACTER = /[\p{L}\p{N}]/u;
const WHITESPACE_ONLY = /^\s+$/;

interface Token {
  citation?: AIResponseCitation;
  value: string;
}

function tokenize(text: string, citations: AIResponseCitation[]): Token[] {
  return text
    .split(TOKEN_SPLIT)
    .filter((value) => value !== "")
    .map((value) => {
      const match = value.match(CITATION_MARKER);
      if (!match) return { value };
      const index = Number(match[1]);
      const citation = citations.find((entry) => entry.index === index);
      return citation ? { citation, value } : { value };
    });
}

const tokens = computed(() => tokenize(props.text, props.citations));

// Deliberately not reactive: this only advances after a render so the tokens
// painted in the next update get the entrance. Making it a ref would trigger a
// second render that immediately clears the newness and the animation never shows.
let renderedCount = 0;

function commitRenderedCount() {
  renderedCount = tokens.value.length;
}

onMounted(commitRenderedCount);
onUpdated(commitRenderedCount);

function isNew(index: number): boolean {
  return index >= renderedCount;
}

function isWhitespaceOrPunctuation(value: string): boolean {
  return WHITESPACE_ONLY.test(value) || !HAS_WORD_CHARACTER.test(value);
}


</script>

<style module>
.response {
  margin: 0;
  text-align: left;
  color: var(--color-darkslategray-500);
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;
}

.word {
  display: inline-block;
}

.wordNew {
  animation: wordIn 0.22s cubic-bezier(0.23, 1, 0.32, 1) both;
}

@keyframes wordIn {
  from {
    opacity: 0;
    transform: translateY(2px);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.caret {
  display: inline-block;
  margin-left: 2px;
  width: 2px;
  height: 1em;
  vertical-align: baseline;
  transform: translateY(0.15em);
  border-radius: 999px;
  background-color: currentColor;
  animation: caretBlink 1s steps(2, start) infinite;
}

@keyframes caretBlink {
  0%,
  50% {
    opacity: 1;
  }
  50.01%,
  100% {
    opacity: 0.15;
  }
}

.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  margin-right: 2px;
  border-radius: 999px;
  border: 1px solid #ede9e1;
  background-color: #f1ede5;
  font-size: 10px;
  font-weight: 600;
  color: var(--color-darkslategray-200);
  vertical-align: super;
  line-height: 1;
}

.pillNew {
  animation: pillIn 0.25s cubic-bezier(0.23, 1, 0.32, 1) both;
}

@keyframes pillIn {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.pillLink {
  transition: color 0.15s ease, border-color 0.15s ease;
}

.pillAnchor {
  color: inherit;
  text-decoration: none;
}

.pillLink:hover {
  color: var(--color-darkslategray-500);
  border-color: rgba(0, 0, 0, 0.2);
}

@media (prefers-reduced-motion: reduce) {
  .wordNew,
  .pillNew {
    animation: none;
  }
  .caret {
    animation: none;
    opacity: 1;
  }
}
</style>