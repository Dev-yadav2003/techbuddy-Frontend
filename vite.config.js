import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// PostCSS (Tailwind + autoprefixer) is configured in postcss.config.js.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
