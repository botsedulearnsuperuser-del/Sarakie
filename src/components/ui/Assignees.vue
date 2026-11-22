<template>
  <div
    class="pik"
    :style="{
      width: W + 'px',
      height: H + 'px',
      '--pik-row-r': Math.max(0, r - 6) + 'px',
    }"
  >
    <button
      class="pik-pill"
      :style="{ borderRadius: r + 'px' }"
      :aria-expanded="open"
      aria-haspopup="listbox"
      type="button"
      @click="open = !open"
    >
      <!-- the rail the faces sit in -->
      <span class="pik-rail" :style="{ width: rail + 'px' }">
        <span
          v-for="(id, i) in picked"
          :key="id"
          class="pik-face"
          :style="{ zIndex: CAST.length - i, transform: faceTransform(i) }"
        >
          <img :src="AVATARS[id]" alt="" draggable="false" />
        </span>
      </span>

      <!-- what the pill says with nothing in it -->
      <span v-if="picked.length === 0" class="pik-say">Unassigned</span>

      <ChevronDownIcon class="pik-chev" :size="16" :stroke-width="2" aria-hidden="true" />
    </button>

    <Transition name="pik-card">
      <div
        v-if="open"
        class="pik-card"
        :style="{ borderRadius: r + 'px' }"
        role="listbox"
        aria-multiselectable="true"
      >
        <button
          v-for="(p, idx) in CAST"
          :key="p.id"
          class="pik-row"
          role="option"
          :aria-selected="picked.includes(p.id)"
          :data-on="picked.includes(p.id) || undefined"
          type="button"
          :style="{ transitionDelay: 0.04 * idx + 0.03 + 's' }"
          @click="toggle(p.id)"
        >
          <img class="pik-av" :src="AVATARS[p.id]" alt="" draggable="false" />
          <span class="pik-who">
            <span class="pik-name">{{ p.name }}</span>
            <span class="pik-role">{{ p.role }}</span>
          </span>
          <span class="pik-mark">
            <Transition name="pik-tick">
              <span v-if="picked.includes(p.id)" class="pik-tick">
                <CheckIcon :size="14" :stroke-width="2" />
              </span>
            </Transition>
          </span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Check as CheckIcon, ChevronDown as ChevronDownIcon } from "lucide-vue-next";

/* AVATARS points at this project's own images. */
const AVATARS: Record<string, string> = {
  kai: "/avatars/afshin.jpg",
  mara: "/avatars/ana.jpg",
  sofia: "/avatars/ashish.jpg",
  ines: "/avatars/mariana.jpg",
};

const CAST = [
  { id: "kai", name: "Adam Marsh", role: "Design" },
  { id: "mara", name: "Priya Raman", role: "Research" },
  { id: "sofia", name: "Nora Wilder", role: "Engineering" },
  { id: "ines", name: "Marco Bellini", role: "Product" },
];

const W = 264;
const H = 268;
const FACE = 28;
const CORNER = 20;
const LAP = 10;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const quad = (n: number, gut: number) => {
  const cell = (FACE - gut) / 2;
  const s = cell / FACE;
  const a = cell / 2;
  const b = FACE - cell / 2;
  const m = FACE / 2;
  if (n <= 1) return [{ cx: m, cy: m, s: 1 }];
  if (n === 2) return [{ cx: a, cy: m, s }, { cx: b, cy: m, s }];
  if (n === 3) return [{ cx: a, cy: a, s }, { cx: b, cy: a, s }, { cx: a, cy: b, s }];
  return [
    { cx: a, cy: a, s }, { cx: b, cy: a, s },
    { cx: a, cy: b, s }, { cx: b, cy: b, s },
  ];
};

const props = withDefaults(defineProps<{
  corner?: number;
  overlap?: number;
  stack?: string;
}>(), {
  corner: CORNER,
  overlap: LAP,
  stack: "Row",
});

const open = ref(true);
const picked = ref<string[]>(["kai", "mara"]);

const r = computed(() => clamp(props.corner ?? CORNER, 0, 26));
const lap = computed(() => clamp(props.overlap ?? LAP, 0, 22));
const grid = computed(() => props.stack === "Grid");

const spots = computed(() => quad(picked.value.length, 4 - (lap.value / 22) * 2));

const rail = computed(() => {
  if (!picked.value.length) return 0;
  if (grid.value) return FACE;
  return FACE + (picked.value.length - 1) * (FACE - lap.value);
});

const faceTransform = (i: number) => {
  const spot = grid.value ? spots.value[Math.min(i, spots.value.length - 1)] : null;
  const tx = spot ? spot.cx - FACE / 2 : i * (FACE - lap.value);
  const ty = spot ? spot.cy - FACE / 2 : 0;
  const sc = spot ? spot.s : 1;
  return `translate(${tx}px, ${ty}px) scale(${sc})`;
};

const toggle = (id: string) => {
  const p = picked.value;
  picked.value = p.includes(id) ? p.filter((x) => x !== id) : [...p, id];
};
</script>

<style scoped>
/* Map Bencho tokens to this project's own ink/ground/surface/UI font. */
.pik {
  --card: var(--color-white);
  --fill-on: var(--color-darkslategray-500);
  --fill-on-rgb: 1 54 38;
  --fill-slab: var(--color-white);
  --font-ui: var(--font-inter, Inter, Arial, sans-serif);
  --ink: var(--color-darkslategray-500);
  --ink-rgb: 1 54 38;
  --pane-edge: var(--color-antiquewhite-200);
  position: relative;
  box-sizing: border-box;
  font-family: var(--font-ui);
  color: var(--fill-on, var(--ink));
}

.pik-pill {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 44px;
  padding: 0 12px 0 8px;
  border: 0;
  background: var(--fill-slab, var(--card));
  color: inherit;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: -0.01em;
  transition: border-radius 160ms ease;
}

[data-stroke="on"] .pik-pill { box-shadow: 0 0 0 1px var(--pane-edge); }

.pik-pill:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(var(--fill-on-rgb, var(--ink-rgb)), 0.45);
}

.pik-rail {
  position: relative;
  flex: none;
  height: 28px;
  transition: width 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.pik-face {
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  overflow: hidden;
  box-shadow: 0 0 0 2px var(--fill-slab, var(--card));
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.pik-face img { width: 100%; height: 100%; object-fit: cover; display: block; }

.pik-say { margin-left: -6px; color: var(--fill-on, var(--ink)); }

.pik-chev {
  flex: none;
  margin-left: -2px;
  color: color-mix(in srgb, var(--fill-on, #17181a) 32%, var(--fill-slab, #ffffff));
  transition: color 160ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.pik-pill:hover .pik-chev { color: color-mix(in srgb, var(--fill-on, #17181a) 72%, var(--fill-slab, #ffffff)); }

.pik-pill[aria-expanded="true"] .pik-chev { transform: rotate(180deg); }

.pik-card {
  position: absolute;
  top: 54px;
  left: 0;
  right: 0;
  z-index: 1;
  box-sizing: border-box;
  padding: 8px;
  background: var(--fill-slab, var(--card));
  transform-origin: 0 0;
  transition: opacity 160ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

[data-stroke="on"] .pik-card { box-shadow: 0 0 0 1px var(--pane-edge); }

.pik-card-enter-active,
.pik-card-leave-active { transition: opacity 160ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1); }
.pik-card-enter-from,
.pik-card-leave-to { opacity: 0; transform: translateY(-10px) scaleX(0.86) scaleY(0.72); }

.pik-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 48px;
  padding: 0 8px;
  border: 0;
  border-radius: var(--pik-row-r, 14px);
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 160ms ease, opacity 160ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
  opacity: 0;
  transform: translateY(-8px);
  animation: pik-row-in 220ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.pik-row:hover { background: color-mix(in srgb, var(--fill-on, #17181a) 6%, transparent); }
.pik-row:focus-visible { outline: none; background: color-mix(in srgb, var(--fill-on, #17181a) 6%, transparent); }

@keyframes pik-row-in {
  to { opacity: 1; transform: translateY(0); }
}

.pik-av {
  flex: none;
  width: 32px; height: 32px;
  border-radius: 999px;
  object-fit: cover;
  display: block;
}

.pik-who { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }

.pik-name {
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0em;
}

.pik-role {
  font-size: 11px;
  color: color-mix(in srgb, var(--fill-on, #17181a) 52%, var(--fill-slab, #ffffff));
  letter-spacing: 0em;
}

.pik-mark {
  flex: none;
  display: grid;
  place-items: center;
  width: 18px; height: 18px;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1.5px rgba(var(--fill-on-rgb, var(--ink-rgb)), 0.22);
  transition: background 160ms ease, box-shadow 160ms ease;
}

.pik-row[data-on] .pik-mark {
  background: var(--fill-on, var(--ink));
  box-shadow: inset 0 0 0 1.5px var(--fill-on, var(--ink));
}

.pik-tick {
  display: grid;
  place-items: center;
  color: var(--fill-slab, var(--card));
}

.pik-tick-enter-active,
.pik-tick-leave-active { transition: opacity 160ms ease, transform 160ms ease; }
.pik-tick-enter-from,
.pik-tick-leave-to { opacity: 0; transform: scale(0.4); }

@media (prefers-reduced-motion: reduce) {
  .pik-rail, .pik-chev { transition-duration: 160ms; }
}
</style>