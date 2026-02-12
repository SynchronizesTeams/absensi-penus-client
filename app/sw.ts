import { BackgroundSyncPlugin } from 'workbox-background-sync'
import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { NetworkOnly } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)

cleanupOutdatedCaches()

const bgSyncPlugin = new BackgroundSyncPlugin('attendanceQueue', {
  maxRetentionTime: 24 * 60
})

const attendanceEndpoints = [
  '/api/v2/absen/masuk',
  '/api/v1/absen/pulang',
  '/api/v1/absen/izin'
]

attendanceEndpoints.forEach(endpoint => {
  registerRoute(
    ({ url }) => url.pathname.endsWith(endpoint),
    new NetworkOnly({
      plugins: [bgSyncPlugin]
    }),
    'POST'
  )
})

let allowlist: undefined | RegExp[]
if (import.meta.env.DEV)
  allowlist = [/^\/$/]

registerRoute(new NavigationRoute(
  createHandlerBoundToURL('/'),
  { allowlist },
))

self.skipWaiting()
clientsClaim()
