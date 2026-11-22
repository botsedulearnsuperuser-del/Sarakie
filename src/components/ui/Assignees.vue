<template>
  <div
    class="pik"
    :class="{ 'pik-inline': inline }"
    :style="{
      width: inline ? '100%' : W + 'px',
      height: inline ? 'auto' : H + 'px',
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
          :style="{ zIndex: list.length - i, transform: faceTransform(i) }"
        >
          <img :src="avatarFor(id)" alt="" draggable="false" />
        </span>
      </span>

      <!-- nobody on the team yet -->
      <span v-if="list.length === 0" class="pik-pill-empty">
        <svg class="pik-add-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="currentColor" d="M17.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11m0 2l-.09.007a.5.5 0 0 0-.402.402L17 14.5V17h-2.502l-.09.008a.5.5 0 0 0-.402.402l-.008.09l.008.09a.5.5 0 0 0 .402.402l.09.008H17v2.503l.008.09a.5.5 0 0 0 .402.402l.09.008l.09-.008a.5.5 0 0 0 .402-.402l.008-.09V18l2.504.001l.09-.008a.5.5 0 0 0 .402-.402l.008-.09l-.008-.09a.5.5 0 0 0-.403-.402l-.09-.008H18v-2.5l-.008-.09a.5.5 0 0 0-.402-.403zm-3.246-4a2.25 2.25 0 0 1 1.951 1.13A6.502 6.502 0 0 0 12.023 21l-.02-.001a4.5 4.5 0 0 1-4.501-4.501V12.25A2.25 2.25 0 0 1 9.752 10zm-6.848 0a3.24 3.24 0 0 0-.897 2.034l-.007.216v4.249c0 .847.191 1.649.533 2.365Q6.539 18.999 6 19a4 4 0 0 1-4-4.001V12.25a2.25 2.25 0 0 1 2.096-2.245L4.25 10zm12.344 0A2.25 2.25 0 0 1 22 12.25v.56A6.48 6.48 0 0 0 17.5 11l-.243.005A3.3 3.3 0 0 0 16.599 10zM18.5 4a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5M12 3a3 3 0 1 1 0 6a3 3 0 0 1 0-6M5.5 4a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5" />
        </svg>
        Add team
      </span>

      <!-- what the pill says with nobody assigned -->
      <span v-else-if="picked.length === 0" class="pik-say">Unassigned</span>

      <ChevronDownIcon class="pik-chev" :size="16" :stroke-width="2" aria-hidden="true" />
    </button>

    <Transition name="pik-card">
      <div
        v-if="open"
        class="pik-card"
        :class="{ 'pik-card-inline': inline }"
        :style="{ borderRadius: r + 'px' }"
        role="listbox"
        aria-multiselectable="true"
      >
        <!-- no team members on the account yet -->
        <div v-if="list.length === 0" class="pik-empty">
          <span class="pik-empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M0 0h24v24H0z" fill="none" />
              <path fill="currentColor" d="M17.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11m0 2l-.09.007a.5.5 0 0 0-.402.402L17 14.5V17h-2.502l-.09.008a.5.5 0 0 0-.402.402l-.008.09l.008.09a.5.5 0 0 0 .402.402l.09.008H17v2.503l.008.09a.5.5 0 0 0 .402.402l.09.008l.09-.008a.5.5 0 0 0 .402-.402l.008-.09V18l2.504.001l.09-.008a.5.5 0 0 0 .402-.402l.008-.09l-.008-.09a.5.5 0 0 0-.403-.402l-.09-.008H18v-2.5l-.008-.09a.5.5 0 0 0-.402-.403zm-3.246-4a2.25 2.25 0 0 1 1.951 1.13A6.502 6.502 0 0 0 12.023 21l-.02-.001a4.5 4.5 0 0 1-4.501-4.501V12.25A2.25 2.25 0 0 1 9.752 10zm-6.848 0a3.24 3.24 0 0 0-.897 2.034l-.007.216v4.249c0 .847.191 1.649.533 2.365Q6.539 18.999 6 19a4 4 0 0 1-4-4.001V12.25a2.25 2.25 0 0 1 2.096-2.245L4.25 10zm12.344 0A2.25 2.25 0 0 1 22 12.25v.56A6.48 6.48 0 0 0 17.5 11l-.243.005A3.3 3.3 0 0 0 16.599 10zM18.5 4a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5M12 3a3 3 0 1 1 0 6a3 3 0 0 1 0-6M5.5 4a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5" />
            </svg>
          </span>
          <b class="pik-empty-title">No team members yet</b>
          <span class="pik-empty-add">Add team</span>
          <p class="pik-empty-text">
            You can add your team now, or continue submitting this application and invite
            them later. Anyone you add can collaborate on this application and see the
            documents you upload.
          </p>
        </div>

        <template v-else>
          <button
            v-for="(p, idx) in list"
            :key="p.id"
            class="pik-row"
            role="option"
            :aria-selected="picked.includes(p.id)"
            :data-on="picked.includes(p.id) || undefined"
            type="button"
            :style="{ transitionDelay: 0.04 * idx + 0.03 + 's' }"
            @click="toggle(p.id)"
          >
            <img class="pik-av" :src="avatarFor(p.id)" alt="" draggable="false" />
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
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Check as CheckIcon, ChevronDown as ChevronDownIcon } from "lucide-vue-next";
import type { TeamMember } from "../../composables/useTeamMembers";

/* Demo cast used by the standalone demo page when no members are supplied. */
const DEMO_MEMBERS: TeamMember[] = [
  { id: "kai", name: "Adam Marsh", email: "adam@ceda.co.bw", role: "Design", avatar: "/avatars/afshin.jpg" },
  { id: "mara", name: "Priya Raman", email: "priya@ceda.co.bw", role: "Research", avatar: "/avatars/ana.jpg" },
  { id: "sofia", name: "Nora Wilder", email: "nora@ceda.co.bw", role: "Engineering", avatar: "/avatars/ashish.jpg" },
  { id: "ines", name: "Marco Bellini", email: "marco@ceda.co.bw", role: "Product", avatar: "/avatars/mariana.jpg" },
];

const W = 264;
const H = 268;
const FACE = 28;
const CORNER = 20;
const LAP = 10;
const FALLBACK_AVATAR = "/innovator-man.webp";

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
  members?: TeamMember[];
  modelValue?: string[];
  corner?: number;
  overlap?: number;
  stack?: string;
  inline?: boolean;
}>(), {
  corner: CORNER,
  overlap: LAP,
  stack: "Row",
  inline: false,
});

const emit = defineEmits<{ "update:modelValue": [string[]] }>();

const open = ref(true);
const picked = ref<string[]>(props.modelValue ?? (props.members ? [] : ["kai", "mara"]));

watch(
  () => props.modelValue,
  (value) => {
    if (value) picked.value = [...value];
  },
);

const list = computed(() => props.members ?? DEMO_MEMBERS);

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

const avatarFor = (id: string) => {
  const member = list.value.find((m) => m.id === id);
  return member?.avatar || FALLBACK_AVATAR;
};

const toggle = (id: string) => {
  const p = picked.value;
  picked.value = p.includes(id) ? p.filter((x) => x !== id) : [...p, id];
  emit("update:modelValue", picked.value);
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

.pik-inline { position: static; }

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

.pik-pill-empty {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: -6px;
}

.pik-add-icon {
  font-size: 18px;
  color: color-mix(in srgb, var(--fill-on, #17181a) 70%, var(--fill-slab, #ffffff));
}

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

.pik-card-inline {
  position: static;
  margin-top: 10px;
  transform-origin: 50% 0;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--fill-on, #17181a) 12%, transparent);
}

.pik-inline .pik-pill {
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--fill-on, #17181a) 12%, transparent);
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

/* ── Empty team state ── */
.pik-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  padding: 26px 20px 24px;
}

.pik-empty-icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  margin-bottom: 4px;
  border-radius: 999px;
  font-size: 24px;
  color: var(--fill-on, var(--ink));
  background: color-mix(in srgb, var(--fill-on, #17181a) 7%, transparent);
}

.pik-empty-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--fill-on, var(--ink));
}

.pik-empty-add {
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--fill-on, #17181a) 60%, var(--fill-slab, #ffffff));
}

.pik-empty-text {
  margin: 2px 0 0;
  max-width: 40ch;
  font-size: 12.5px;
  line-height: 1.55;
  color: color-mix(in srgb, var(--fill-on, #17181a) 62%, var(--fill-slab, #ffffff));
}

@media (prefers-reduced-motion: reduce) {
  .pik-rail, .pik-chev { transition-duration: 160ms; }
}
</style>
