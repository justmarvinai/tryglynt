/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "icons/apple-touch-icon.png"],
      manifest: {
        name: "Glynt",
        short_name: "Glynt",
        description:
          "Alle Nährstoffe im Blick — Kalorien, Makros, Vitamine und Mineralstoffe, gemessen an deinem persönlichen Tagesbedarf.",
        lang: "de",
        dir: "ltr",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        categories: ["health", "food", "lifestyle"],
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        navigateFallback: "/index.html",
        // Seed data chunks can exceed the 2 MB default.
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
      },
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  build: {
    target: "es2022",
    rollupOptions: {
      output: {
        /**
         * Vendor split so an app update only re-downloads app code —
         * React/Dexie/date-fns stay cached across releases (PWA).
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router)[\\/]/.test(id)) {
            return "vendor-react";
          }
          if (/[\\/]node_modules[\\/](dexie|dexie-react-hooks)[\\/]/.test(id)) {
            return "vendor-db";
          }
          if (/[\\/]node_modules[\\/]date-fns[\\/]/.test(id)) return "vendor-dates";
          if (/[\\/]node_modules[\\/]lucide-react[\\/]/.test(id)) return "vendor-icons";
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}", "src/**/*.test.{ts,tsx}"],
    globals: true,
  },
});
