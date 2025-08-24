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
    }
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
      apiUrl: "http://127.0.0.1:8000"
    }
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
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png}"],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
    },
    devOptions: {
      enabled: true,
    },
    includeAssets: ["**/*"],
  },
});
