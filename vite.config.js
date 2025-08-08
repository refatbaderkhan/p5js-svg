import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/p5js-svg/", // This is CRUCIAL for GitHub Pages
  build: {
    outDir: "dist", // Explicitly set output directory
    emptyOutDir: true, // Clear the directory before build
  },
});
