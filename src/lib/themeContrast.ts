import {
  CUSTOM_IMAGE_STORAGE_KEY,
  CUSTOM_THEME_ID,
  THEME_EVENT,
  THEME_STORAGE_KEY,
} from "../components/themes";

/**
 * Keeps the greeting legible on a user-uploaded dashboard image.
 *
 * Presets keep their hand-matched colours. When the active theme is the user's
 * own upload we sample the top band of that image (the strip the greeting sits
 * on), convert it to relative luminance and expose CSS variables:
 *
 *   --theme-hero-text    headline colour (white on dark images, deep green on light)
 *   --theme-hero-muted   subtitle colour
 *   --theme-hero-shadow  a soft halo so thin text survives busy photos
 *
 * The attribute `data-theme-contrast="dark-bg" | "light-bg"` is set on <html>
 * for anything that needs to branch on it. If the image is already a good
 * backdrop for the default dark text, the text stays exactly as it was.
 */

const CONTRAST_ATTRIBUTE = "data-theme-contrast";
const LIGHT_TEXT_THRESHOLD = 0.45;
let lastAnalysed = "";

function activeCustomImage(): string | null {
  if (typeof localStorage === "undefined") return null;
  if (localStorage.getItem(THEME_STORAGE_KEY) !== CUSTOM_THEME_ID) return null;
  return localStorage.getItem(CUSTOM_IMAGE_STORAGE_KEY) || null;
}

function channelLuminance(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** Average relative luminance (0 = black, 1 = white) of the image's top 40%. */
function topBandLuminance(url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      try {
        const width = 64;
        const height = 64;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Canvas unavailable"));
          return;
        }
        const sourceHeight = Math.max(1, Math.floor(image.naturalHeight * 0.4));
        context.drawImage(image, 0, 0, image.naturalWidth, sourceHeight, 0, 0, width, height);
        const { data } = context.getImageData(0, 0, width, height);
        let total = 0;
        for (let i = 0; i < data.length; i += 4) {
          total +=
            0.2126 * channelLuminance(data[i]) +
            0.7152 * channelLuminance(data[i + 1]) +
            0.0722 * channelLuminance(data[i + 2]);
        }
        resolve(total / (width * height));
      } catch (error) {
        reject(error);
      }
    };
    image.onerror = () => reject(new Error("Could not read the image"));
    image.src = url;
  });
}

function reset(root: HTMLElement) {
  root.removeAttribute(CONTRAST_ATTRIBUTE);
  root.style.removeProperty("--theme-hero-text");
  root.style.removeProperty("--theme-hero-muted");
  root.style.removeProperty("--theme-hero-shadow");
}

export async function applyThemeContrast(): Promise<void> {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const url = activeCustomImage();

  if (!url) {
    reset(root);
    lastAnalysed = "";
    return;
  }
  if (url === lastAnalysed && root.hasAttribute(CONTRAST_ATTRIBUTE)) return;

  try {
    const luminance = await topBandLuminance(url);
    if (luminance < LIGHT_TEXT_THRESHOLD) {
      root.setAttribute(CONTRAST_ATTRIBUTE, "dark-bg");
      root.style.setProperty("--theme-hero-text", "#ffffff");
      root.style.setProperty("--theme-hero-muted", "rgba(255, 255, 255, 0.9)");
      root.style.setProperty("--theme-hero-shadow", "0 2px 16px rgba(0, 0, 0, 0.55)");
    } else {
      root.setAttribute(CONTRAST_ATTRIBUTE, "light-bg");
      root.style.setProperty("--theme-hero-text", "#10312c");
      root.style.setProperty("--theme-hero-muted", "rgba(16, 49, 44, 0.78)");
      root.style.setProperty("--theme-hero-shadow", "0 1px 12px rgba(255, 255, 255, 0.6)");
    }
    lastAnalysed = url;
  } catch {
    // A blocked or unreadable image keeps the page's designed colours.
    reset(root);
    lastAnalysed = "";
  }
}

/** Call once at app start: reacts to theme picks, uploads and other tabs. */
export function initThemeContrast(): () => void {
  const recheck = () => {
    lastAnalysed = "";
    void applyThemeContrast();
  };
  void applyThemeContrast();
  window.addEventListener(THEME_EVENT, recheck);
  window.addEventListener("storage", recheck);
  return () => {
    window.removeEventListener(THEME_EVENT, recheck);
    window.removeEventListener("storage", recheck);
  };
}
