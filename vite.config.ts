import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => ({
  plugins: [react()],
  base: process.env.GITHUB_PAGES_BASE ?? "/",
  build: {
    target: ["es2018", "edge90", "firefox78", "safari13"],
    cssTarget: ["chrome61", "edge90", "firefox78", "safari13"],
    outDir: "dist",
    sourcemap: true
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2018"
    }
  }
}));
