export interface DashboardTheme {
  id: string;
  name: string;
  image: string;
}

/** Background themes offered in the sidebar settings popup. */
export const dashboardThemes: DashboardTheme[] = [
  { id: "gaborone", name: "Gaborone", image: "/cedacustom/Gemini_Generated_Image_8i5vb68i5vb68i5v.jpeg" },
  { id: "gaborone-hills", name: "Gaborone Hills", image: "/themes/gaborone-hills.jpg" },
  { id: "okavango", name: "Okavango", image: "/themes/okavango.jpg" },
];

export const CUSTOM_THEME_ID = "custom";

export const THEME_STORAGE_KEY = "sarka-dashboard-theme";
export const CUSTOM_IMAGE_STORAGE_KEY = "sarka-dashboard-custom-image";
export const THEME_EVENT = "sarka-theme-change";

/** True when the currently persisted dashboard theme is the Gaborone preset. */
export function isGaboroneTheme(): boolean {
  const themeId = typeof localStorage !== "undefined"
    ? localStorage.getItem(THEME_STORAGE_KEY)
    : null;
  return themeId === "gaborone";
}
