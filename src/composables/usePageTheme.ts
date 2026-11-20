import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import type { CSSProperties } from "vue"
import {
  CUSTOM_IMAGE_STORAGE_KEY,
  CUSTOM_THEME_ID,
  dashboardThemes,
  THEME_EVENT,
  THEME_STORAGE_KEY,
} from "../components/themes"
import type { DashboardTheme } from "../components/themes"

/**
 * Applies the theme chosen in the sidebar settings popup to a page, so the
 * dashboard background image follows the user on every screen.
 *
 * Usage: `const pageBackground = usePageTheme()` and bind it to the page root:
 * `<div :class="$style.page" :style="pageBackground">`.
 */
export function usePageTheme() {
  const activeTheme = ref<DashboardTheme | null>(null)

  function loadTheme() {
    const themeId = localStorage.getItem(THEME_STORAGE_KEY)

    if (themeId === CUSTOM_THEME_ID) {
      const customImage = localStorage.getItem(CUSTOM_IMAGE_STORAGE_KEY)
      activeTheme.value = customImage
        ? { id: CUSTOM_THEME_ID, name: "Your image", image: customImage }
        : null
      return
    }

    activeTheme.value = dashboardThemes.find((theme) => theme.id === themeId) ?? null
  }

  function onThemeChange(event: Event) {
    const detail = (event as CustomEvent<{ id: string; image: string }>).detail

    if (detail?.image) {
      const preset = dashboardThemes.find((theme) => theme.id === detail.id)
      activeTheme.value = {
        id: detail.id,
        name: preset?.name ?? "Your image",
        image: detail.image,
      }
      return
    }

    loadTheme()
  }

  onMounted(() => {
    loadTheme()
    window.addEventListener(THEME_EVENT, onThemeChange)
  })

  onBeforeUnmount(() => {
    window.removeEventListener(THEME_EVENT, onThemeChange)
  })

  return computed<CSSProperties | undefined>(() =>
    activeTheme.value
      ? {
          backgroundImage: `url(${activeTheme.value.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }
      : undefined,
  )
}
