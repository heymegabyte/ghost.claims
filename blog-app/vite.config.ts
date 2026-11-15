import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  root: resolve(import.meta.dirname),
  base: "/blog/",
  plugins: [react()],
  build: {
    outDir: resolve(import.meta.dirname, "../public/blog"),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/@theme.tools/blog")) return "theme-tools-blog";
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "react-runtime";
        },
      },
    },
  },
});
