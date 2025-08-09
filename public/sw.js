importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

workbox.setConfig({
  debug: false, // Set false di production
});

const { registerRoute } = workbox.routing;
const { NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

// Setup background sync
const bgSyncPlugin = new BackgroundSyncPlugin('absen-sync', {
  maxRetentionTime: 24 * 60, // Retry max 24 jam (dalam menit)
  onSync: async ({ queue }) => {
    let entry;
    while (entry = await queue.shiftRequest()) {
      try {
        await fetch(entry.request.clone());
        console.log('Background sync berhasil:', entry.request.url);
      } catch (error) {
        console.error('Background sync gagal:', error);
        await queue.unshiftRequest(entry);
        break;
      }
    }
  }
});

// Tangani POST absen
registerRoute(
  ({url, request}) =>
    url.pathname.includes('/absen/masuk') && request.method === 'POST',
  new NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);

// Precache halaman penting
workbox.precaching.precacheAndRoute([
  { url: '/absen', revision: '1' },
  { url: '/', revision: '1' },
  // ... tambahkan resource lain
]);

// Aktifkan skipWaiting
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Tangani sinkronisasi manual
self.addEventListener('sync', (event) => {
  if (event.tag === 'absen-sync') {
    console.log('Background sync dimulai...');
    event.waitUntil(
      (async () => {
        try {
          // Mengambil semua request yang gagal dari queue
          const queue = await bgSyncPlugin._queue;
          await queue.replayRequests();
        } catch (error) {
          console.error('Sync error:', error);
        }
      })()
    );
  }
});

// Tangani push notification
self.addEventListener('push', (event) => {
  const data = event.data?.json();
  if (data) {
    const title = data.title || 'Sistem Absen';
    const options = {
      body: data.body || 'Notifikasi absen',
      icon: '/calend.png',
      badge: '/calend.png',
      data: data.url ? { url: data.url } : {}
    };

    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  }
});

// Tangani klik notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});
