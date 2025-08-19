// import { BackgroundSyncPlugin } from 'workbox-background-sync';
// import { registerRoute } from 'workbox-routing';
// import { NetworkOnly } from 'workbox-strategies';

// // Setup Background Sync
// const bgSyncPlugin = new BackgroundSyncPlugin('absenQueue', {
//   maxRetentionTime: 24 * 60, // Retry selama 24 jam (dalam menit)
// });

// // Tangani permintaan POST absen
// registerRoute(
//   ({url, request}) => url.pathname === '/api/absen' && request.method === 'POST',
//   new NetworkOnly({
//     plugins: [bgSyncPlugin],
//   }),
//   'POST'
// );

// // Event install (wajib untuk PWA)
// self.addEventListener('install', (event) => {
//   self.skipWaiting();
// });

// // Event activate
// self.addEventListener('activate', (event) => {
//   event.waitUntil(self.clients.claim());
// });
