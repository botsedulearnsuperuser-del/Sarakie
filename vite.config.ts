import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: [
      "pv-d1bcf4fee5ea-21597296-4f5d-4c8b-9ff2-7366e5e9a2d0.style.dev"
    ]
  },
});
