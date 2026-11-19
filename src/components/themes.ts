export interface DashboardTheme {
  id: string;
  name: string;
  image: string;
}

/** Background themes offered in the sidebar settings popup. */
export const dashboardThemes: DashboardTheme[] = [
  { id: "gaborone", name: "Gaborone", image: "/themes/gaborone.jpg" },
  { id: "gaborone-hills", name: "Gaborone Hills", image: "/themes/gaborone-hills.jpg" },
  { id: "okavango", name: "Okavango", image: "/themes/okavango.jpg" },
];

export const CUSTOM_THEME_ID = "custom";

export const THEME_STORAGE_KEY = "sarka-dashboard-theme";
export const CUSTOM_IMAGE_STORAGE_KEY = "sarka-dashboard-custom-image";
export const THEME_EVENT = "sarka-theme-change";
