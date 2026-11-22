<template>
  <div :class="[$style.response, className]">
    <template v-for="(block, bi) in blocks" :key="bi">
      <div v-if="block.type === 'spacer'" :class="$style.spacer" />
      <div v-else-if="block.type === 'li'" :class="$style.listItem">
        <span :class="$style.bullet">•</span>
        <span class="ai-inline">
          <template v-for="(part, pi) in block.parts" :key="pi">
            <strong v-if="part.bold">{{ part.text }}</strong>
            <template v-else>{{ part.text }}</template>
          </template>
        </span>
      </div>
      <p v-else :class="$style.para">
        <template v-for="(part, pi) in block.parts" :key="pi">
          <strong v-if="part.bold">{{ part.text }}</strong>
          <template v-else>{{ part.text }}</template>
        </template>
      </p>
    </template>
    <span v-if="isStreaming" :class="$style.caret" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

export interface AIResponseCitation {
  id: string
  index: number
  title: string
  url?: string
}

interface Props {
  citations?: AIResponseCitation[]
  className?: string
  isStreaming?: boolean
  text: string
}

const props = withDefaults(defineProps<Props>(), {
  citations: () => [],
  className: "",
  isStreaming: false,
})

interface InlinePart {
  text: string
  bold: boolean
}

interface Block {
  type: "para" | "li" | "spacer"
  parts: InlinePart[]
}

function parseInline(s: string): InlinePart[] {
  const parts: InlinePart[] = []
  const regex = /\*\*(.+?)\*\*/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = regex.exec(s)) !== null) {
    if (m.index > last) parts.push({ text: s.slice(last, m.index), bold: false })
    parts.push({ text: m[1], bold: true })
    last = m.index + m[0].length
  }
  if (last < s.length) parts.push({ text: s.slice(last), bold: false })
  if (!parts.length) parts.push({ text: s, bold: false })
  return parts
}

const blocks = computed<Block[]>(() => {
  const out: Block[] = []
  for (const rawLine of (props.text || "").split("\n")) {
    const line = rawLine.trim()
    if (line === "") {
      out.push({ type: "spacer", parts: [] })
      continue
    }
    if (/^[-*]\s+/.test(line)) {
      out.push({ type: "li", parts: parseInline(line.replace(/^[-*]\s+/, "")) })
    } else {
      out.push({ type: "para", parts: parseInline(line) })
    }
  }
  return out
})
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

.para {
  margin: 0 0 6px;
}

.para:last-child {
  margin-bottom: 0;
}

.spacer {
  height: 6px;
}

.listItem {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 2px 0;
  line-height: 1.6;
}

.bullet {
  flex-shrink: 0;
  color: var(--color-darkslategray-300);
  font-weight: 700;
}

.response strong {
  font-weight: 700;
  color: var(--color-darkslategray-500);
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

@media (prefers-reduced-motion: reduce) {
  .caret {
    animation: none;
    opacity: 1;
  }
}
</style>