// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  ssr: false,
  nitro: {
    preset: "static",
  },

  vite: {
    plugins: [tailwindcss()],

    server: {
      allowedHosts: true,
    },
  },

  icon: {
    mode: "css",
    cssLayer: "base",
    serverBundle: {
      collections: ["lucide"],
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: "https://api-absensi.synchronizeteams.my.id/api",
    },
  },

  modules: ["@nuxt/icon", "@vite-pwa/nuxt"],

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Trabsen",
      short_name: "Trabsen",
      description: "Aplikasi Absensi Penus",
      theme_color: "#2b7fff",
      background_color: "#fff",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "/calend.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
      globDirectory: ".nuxt/dist/client/",
      globIgnores: [
        "**/node_modules/**/*",
        "sw.js",
        "workbox-*.js",
        "**/*.map",
      ],

      skipWaiting: true,
      clientsClaim: true,
    },
    devOptions: {
      enabled: true,
    },
    includeAssets: ["**/*"],
  },
});
