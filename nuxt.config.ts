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
      apiUrl: "https://api-absensi.synchronizeteams.my.id/api"
    }
  },

  modules: ["@nuxt/icon", "@vite-pwa/nuxt"],

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Sistem Absen Penus Wireless No Fake PWA Full Pro Max 5G+",
      short_name: "Penus Absen",
      description: "Aplikasi Absensi Penus",
      theme_color: "#fff",
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
      globPatterns: ["**/*.{js,css,html,woff2,json,png,svg}"],
      importScripts: ['/sw.js'], // Load custom service worker
      runtimeCaching: [
        {
          urlPattern: /\/api\/absen\/masuk/,
          handler: 'NetworkOnly',
          method: 'POST',
        },
        {
          urlPattern: /.*/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 7 hari
            },
          },
        }
      ]
    },
    devOptions: {
      enabled: true,
    },
    includeAssets: ["**/*"],
  },
});
