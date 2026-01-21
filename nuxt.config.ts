// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  ssr: false,

  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
    compressPublicAssets: true,
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
    build: {
      // Optimasi chunking
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
          }
        }
      }
    }
  },

  icon: {
    mode: "css",
    cssLayer: "base",
    serverBundle: {
      collections: ["lucide"],
    },
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: "https://api-absensi.smkpluspnb.sch.id/api"
    }
  },

  modules: ["@nuxt/icon", "@vite-pwa/nuxt"],

  pwa: {
    registerType: "autoUpdate",
    strategies: "generateSW",

    manifest: {
      name: "Trabsen",
      short_name: "Trabsen",
      description: "Aplikasi Absensi Penus",
      theme_color: "#2b7fff",
      background_color: "#fff",
      display: "standalone",
      start_url: "/",
      lang: "id",
      icons: [
        {
          src: "/logo.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ],
    },

    workbox: {
      // Optimasi caching strategy
      globPatterns: ["**/*.{js,css,html,png,svg,ico,json,woff2}"],
      globDirectory: ".nuxt/dist/client/",
      globIgnores: [
        "**/node_modules/**/*",
        "sw.js",
        "workbox-*.js",
        "**/*.map",
      ],
      skipWaiting: true,
      clientsClaim: true,

      // Caching strategies
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api-absensi\.synchronizeteams\.my\.id\/api\/.*/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 300, // 5 minutes
            },
          },
        },
        {
          urlPattern: /\.(png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 86400, // 1 day
            },
          },
        },
      ],
    },

    devOptions: {
      enabled: false,
      type: 'module'
    },
  },

  build: {
    analyze: false,
  },

  router: {
    options: {
      hashMode: false,
      scrollBehaviorType: 'auto'
    }
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    }
  }
});
