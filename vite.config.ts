import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_DIRECTUS_API_TOKEN.": JSON.stringify(
      process.env.VITE_DIRECTUS_API_TOKEN
    ),
  },
});
