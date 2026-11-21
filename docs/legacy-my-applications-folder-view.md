# Legacy "My Applications" folder view (pre-FolderReveal) — reference for reverting

**Saved:** 21 Nov 2026
**File it lives in:** `src/pages/LoansSheet.vue` (route `/loans-sheet`, "Folder view" mode)
**Last known-good commit:** `92994e7` — *Move Gaborone theme overrides out of the mobile media query*

This document exists so the **old folder grid** can be restored later. It describes only the
folder cards (Irrigation Kit, Solar Dryer, Edu App, Agri Drone), their hover icon swap,
"Rename folder" / "Open" popup and the List/Folder view toggle. Nothing else on the page is
covered here.

---

## 1. How to get the old version back

### Option A — straight from git (fastest, exact)

```bash
# See the old file:
git show 92994e7:src/pages/LoansSheet.vue

# Restore only that file from the old commit:
git checkout 92994e7 -- src/pages/LoansSheet.vue
```

> This throws away the *new* animated folder work in `LoansSheet.vue`. If you may want the
> animated folders again, save them first, e.g.
> `cp src/pages/LoansSheet.vue /tmp/LoansSheet.animated.vue`.

### Option B — from the preserved snapshot in this repo (no git history needed)

A byte-for-byte copy of the old file is kept at:

```
docs/legacy/LoansSheet.vue-92994e7.bak
```

```bash
cp docs/legacy/LoansSheet.vue-92994e7.bak src/pages/LoansSheet.vue
```

It is a `.bak` (not `.vue`) on purpose so the compiler and dev server ignore it.

### Option C — re-add just the folder block

Sections 3–5 below contain the complete original template, script and CSS. Paste the folder
grid back in place of the `FolderReveal` block and re-add `folderView` / `folderOpen` /
`showFolderActions` / `renameFolder`.

---

## 2. What it looked like

Screenshots already in this repo:

- `artifacts/folder-grid.png` — closed state
- `artifacts/folder-hover.png` — hover state with the action popup

**Layout**
- A wrapped flex grid, `gap: 20px`, horizontally centred, `padding: 0 28px 24px`,
  sitting directly on the page background (no single outer container box).
- Above it a small top bar: heading **"Applications"** on the left, a pill button
  **"List view"** (dark green) on the right.
- Each card is a **small white rounded square**, not a folder body:
  - `border-radius: 16px`, `1px solid #ede9e1`, background `#ffffff`
  - `min-width: 140px`, `min-height: 150px`, `padding: 28px 24px 44px`
  - column layout: icon on top, folder name underneath, ~12px gap
  - label: 14px, weight 700, `#1a202c`, centred (e.g. **Irrigation Kit**)
  - no document cards, no fanned papers, no tab/lip shape.

**Icons (the auto-changing part)**
- Default: a **closed folder SVG with a small `+` on its face**, 48×48, drawn with
  `currentColor` at `--color-darkslategray-400` (muted green). There is a soft filled
  shape at `opacity=".2"` behind a `1.5`-stroke outline.
- On hover the closed icon is swapped (`v-if` / `v-else`) for an **open folder SVG** in
  `--color-goldenrod-300` (gold), still 48×48.
- The swap is instantaneous (no transition on the swap itself); the card border also
  turns `--color-goldenrod-300` and gains `box-shadow: 0 4px 12px rgba(0,0,0,.08)`.

**Hover popup**
- A floating white panel appears inside the card, pinned `bottom: 16px`, horizontally
  centred, `min-width: 145px`, `border-radius: 10px`, `1px solid #ede9e1`,
  `box-shadow: 0 4px 16px rgba(0,0,0,.12)`, `z-index: 10`.
- It contains two stacked left-aligned text buttons, 13px / weight 600 / `#0f2e24`:
  - **Rename folder**
  - **Open**
  - hover background `#f3f5f4`, text `--color-darkslategray-500`.
- It fades/slides in with a Vue `<Transition name="folderFade">` (0.15s, opacity 0 and
  `translateY(-4px)` from state).
- The popup **overlaps the bottom of the card and the label** — it is absolutely
  positioned, not a separate row, so the folder name can be partly covered while hovering.

**Behaviour / wiring**
- Hover is tracked by `@mouseenter="showFolderActions(app, true)"` and
  `@mouseleave="showFolderActions(app, false)"` on the card, writing into
  `folderOpen[app.applicationId]`.
- **Rename folder** → `alert(\`Rename folder for ${app.name} — ${app.applicationId}\`)` —
  a placeholder. No real renaming, no popup form.
- **Open** → `openApplication(app)` → routes to `IdeaView`;
  if the status is `FEEDBACK` it also passes `hash: "#corrections"`.
- There is **no click handler on the folder card itself** — only the two popup buttons act.
- Folder names come from `applicationsData[].name`: Irrigation Kit, Solar Dryer, Edu App,
  Agri Drone (application IDs `CEDA-IN-2026-0481` … `-0484`).
- Toggling: list view has a white **"Folder view"** pill (`folderView = true`); folder view
  has the dark **"List view"** pill (`folderView = false`).
- The list view and folder view are `v-if` / `v-else` siblings, so they never overlap.

---

## 3. Original template (folder parts only)

Placed in `<template>`, after the search bar and before the loans table.

```html
<!-- Folder View: List view toggle -->
<div v-if="folderView" :class="$style.folderViewTopBar">
  <h2 :class="$style.tableHeading">Applications</h2>
  <button :class="$style.listViewToggleBtn" type="button" @click="folderView = false">
    List view
  </button>
</div>

<!-- Folder View Grid -->
<div v-if="folderView" :class="$style.folderViewWrapper">
  <div
    :class="$style.folderViewBtn"
    v-for="app in applicationsData"
    :key="app.applicationId"
    @mouseenter="showFolderActions(app, true)"
    @mouseleave="showFolderActions(app, false)"
  >
    <!-- Folder icon (default) -->
    <svg
      v-if="!folderOpen[app.applicationId]"
      :class="$style.folderIcon"
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <g fill="none">
        <path
          fill="currentColor"
          d="M22.24 14.2c0 2.83 0 4.24-.88 5.12s-2.3.88-5.12.88H7.76c-2.83 0-4.24 0-5.12-.88s-.88-2.29-.88-5.12V7.5c0-.65 0-.98.05-1.25a3 3 0 0 1 2.4-2.4c.27-.05.6-.05 1.25-.05H6.5c1.1 0 1.64 0 2.14.18c.5.19.92.54 1.75 1.25l.39.33c.83.71 1.25 1.06 1.75 1.25s1.05.18 2.14.18h1.56c2.83 0 4.24 0 5.12.88s.88 2.3.88 5.12z"
          opacity=".2"
        />
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M4.32 3.93H6.5c.65 0 .97 0 1.28.05a4 4 0 0 1 1.61.63c.26.17.5.4.97.83c.47.44.7.66.97.84a4 4 0 0 0 1.61.63c.3.05.63.05 1.28.05h1.39c2.45 0 3.67 0 4.59.52a4 4 0 0 1 1.51 1.51c.52.92.52 2.14.52 4.6c0 2.44 0 3.66-.52 4.58a4 4 0 0 1-1.51 1.51c-.92.52-2.14.52-4.59.52H9.76c-3.77 0-5.66 0-6.83-1.17s-1.17-3.06-1.17-6.83V6.5a2.56 2.56 0 0 1 2.56-2.56m4.38 9.64h6.6M12 16.89v-6.6"
        />
      </g>
    </svg>

    <!-- Open folder icon (hover) -->
    <svg
      v-else
      :class="$style.folderIconOpen"
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
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

    <div :class="$style.folderIconName">{{ app.name }}</div>

    <!-- Floating actions on hover -->
    <Transition name="folderFade">
      <div v-if="folderOpen[app.applicationId]" :class="$style.folderActions">
        <button :class="$style.folderActionBtn" type="button" @click.stop="renameFolder(app)">
          Rename folder
        </button>
        <button :class="$style.folderActionBtn" type="button" @click.stop="openApplication(app)">
          Open
        </button>
      </div>
    </Transition>
  </div>
</div>
```

List-view toggle (the "Folder view" pill, inside the table heading row):

```html
<div :class="$style.tableHeadingRow">
  <h2 :class="$style.tableHeading">Applications</h2>
  <button :class="$style.folderViewToggleBtn" type="button" @click="folderView = true">
    Folder view
  </button>
</div>
```

---

## 4. Original script additions

```ts
const folderView = ref(false);
const folderOpen = ref<Record<string, boolean>>({});

function showFolderActions(app: ApplicationRecord, show: boolean) {
  folderOpen.value[app.applicationId] = show;
}

function renameFolder(app: ApplicationRecord) {
  alert(`Rename folder for ${app.name} — ${app.applicationId}`);
}

function openApplication(application: ApplicationRecord) {
  const target = application.status === "FEEDBACK"
    ? { name: "IdeaView", query: { name: application.name }, hash: "#corrections" }
    : { name: "IdeaView", query: { name: application.name } };
  router.push(target);
}
```

`applicationsData` (unchanged by the folder work):

| Folder | ID | Funding | Duration | Status |
|---|---|---|---|---|
| Irrigation Kit | `CEDA-IN-2026-0481` | P 900.00 | 12 months | UNDER REVIEW |
| Solar Dryer | `CEDA-IN-2026-0482` | P 1,000.00 | 9 months | APPROVED |
| Edu App | `CEDA-IN-2026-0483` | — | — | FEEDBACK |
| Agri Drone | `CEDA-IN-2026-0484` | — | — | AWARDED |

---

## 5. Original CSS Modules

```css
/* View Toggle */
.tableHeadingRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.folderViewToggleBtn {
  display: inline-flex;
  align-items: center;
  padding: 7px 16px;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.folderViewToggleBtn:hover {
  border-color: var(--color-goldenrod-300);
  color: var(--color-darkslategray-500);
}

.listViewToggleBtn {
  display: inline-flex;
  align-items: center;
  padding: 7px 16px;
  border-radius: 9999px;
  background-color: var(--color-darkslategray-600);
  border-color: var(--color-darkslategray-600);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-inter);
  transition: all 0.15s ease;
}

.listViewToggleBtn:hover {
  background-color: var(--color-darkslategray-500);
  border-color: var(--color-darkslategray-500);
}

.folderViewTopBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px 14px;
}

/* Folder View */
.folderViewWrapper {
  display: flex;
  gap: 20px;
  padding: 0 28px 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.folderViewBtn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 28px 24px 44px;
  border-radius: 16px;
  border: 1px solid #ede9e1;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
  min-height: 150px;
  min-width: 140px;
}

.folderViewBtn:hover {
  border-color: var(--color-goldenrod-300);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.folderIcon {
  color: var(--color-darkslategray-400);
  transition: all 0.15s ease;
}

.folderViewBtn:hover .folderIcon {
  color: var(--color-darkslategray-500);
}

.folderIconOpen {
  color: var(--color-goldenrod-300);
  width: 48px;
  height: 48px;
}

.folderIconName {
  font-size: 14px;
  font-weight: 700;
  color: #1a202c;
  text-align: center;
}

.folderActions {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  border: 1px solid #ede9e1;
  border-radius: 10px;
  padding: 7px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 10;
  min-width: 145px;
}

.folderActionBtn {
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #0f2e24;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-inter);
  border-radius: 6px;
  transition: background-color 0.15s ease;
}

.folderActionBtn:hover {
  background-color: #f3f5f4;
  color: var(--color-darkslategray-500);
}

.folderFade-enter-active,
.folderFade-leave-active {
  transition: all 0.15s ease;
}

.folderFade-enter-from,
.folderFade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
}
```

---

## 6. What replaced it (so you know what a revert undoes)

The current version in `LoansSheet.vue` uses `src/components/ui/FolderReveal.vue`:
real folder-shaped bodies with a front flap and tab, document cards fanned out above the
folder on hover (`Business Plan.pdf`, `Prototype Photos.docx`, `Budget Breakdown.xlsx`),
white icon buttons (`rename`, `open`) sitting above the folder title, a real rename popup
with Cancel/Save, and one rounded outer container around the whole grid.

Restoring the legacy version removes all of that: no document cards, no folder bodies,
no real rename dialog, no outer container — back to the small square cards, the
closed→open folder icon swap, the placeholder `alert()` rename, and the hover popup with
"Rename folder" / "Open".

The List/Folder view toggle (`.folderViewToggleBtn` / `.listViewToggleBtn`) is shared by
both versions and can stay as-is.
