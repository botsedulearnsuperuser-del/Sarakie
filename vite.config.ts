import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: [
      "pv-d1bcf4fee5ea-21597296-4f5d-4c8b-9ff2-7366e5e9a2d0.style.dev",
      "pv-d1bcf4fee5ea-37040274-19d0-4072-8a61-ef8d958839a2.style.dev",
      "pv-d1bcf4fee5ea-d3d0d0ca-9b04-49c5-8c3c-6f2fb159228f.style.dev"
    ]
  },
});
