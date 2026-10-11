import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "static-production-entry",
      apply: "build",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          const block = /<!--dev-entry:start-->[\s\S]*?<!--dev-entry:end-->/g;
          if ([...html.matchAll(block)].length !== 1)
            throw new Error("Expected one dev-entry block");
          return html.replace(block, "");
        },
      },
    },
  ],
  appType: "mpa",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    copyPublicDir: false,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
