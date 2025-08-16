# Trabsen - Aplikasi Absensi Online

![Nuxt](https://img.shields.io/badge/Nuxt-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Trabsen adalah aplikasi absensi online modern yang dibangun untuk memudahkan proses pencatatan kehadiran staff dan guru. Aplikasi ini dirancang sebagai Progressive Web App (PWA) untuk memberikan pengalaman pengguna yang cepat dan responsif, baik online maupun offline.

## ✨ Fitur Utama

-   **Autentikasi Pengguna**: Sistem login yang aman untuk staff dan guru.
-   **Absensi Masuk & Pulang**: Ambil foto dan lokasi untuk absensi masuk dan pulang.
-   **Pengajuan Izin**: Fitur untuk mengajukan izin tidak hadir (sakit, izin, cuti) beserta bukti foto.
-   **Riwayat Aktivitas**: Lihat riwayat absensi dan aktivitas terkini.
-   **Geolocation**: Mendeteksi lokasi pengguna saat melakukan absensi untuk validasi.
-   **PWA (Progressive Web App)**: Dapat diinstal di perangkat mobile dan desktop untuk akses yang lebih mudah dan pengalaman seperti aplikasi native.
-   **Mode Offline**: Memberikan notifikasi status koneksi (Online/Offline).

## 🛠️ Teknologi yang Digunakan

-   **Framework**: [Nuxt.js 4](https://nuxt.com/)
-   **UI Library**: [Tailwind CSS](https://tailwindcss.com/)
-   **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
-   **Icons**: [Nuxt Icon](https://nuxt.com/modules/icon) & [Lucide Icons](https://lucide.dev/)
-   **PWA**: [@vite-pwa/nuxt](https://vite-pwa-org.netlify.app/frameworks/nuxt.html)

## 🚀 Memulai Proyek

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

### Prasyarat

Pastikan Anda memiliki [Node.js](https://nodejs.org/en/) (versi 18+) dan [pnpm](https://pnpm.io/) terinstal di sistem Anda.

### Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/username/absensi-penus-client.git
    cd absensi-penus-client
    ```

2.  **Instal dependensi:**
    ```bash
    pnpm install
    ```

### Menjalankan Server Pengembangan

Untuk menjalankan server pengembangan dengan hot-reloading:

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Membangun untuk Produksi

Untuk membangun aplikasi untuk produksi:

```bash
pnpm build
```

Perintah ini akan membuat direktori `.output` dengan semua aset yang siap untuk di-deploy.

Untuk melihat hasil build secara lokal:
```bash
pnpm preview
```

## 📁 Struktur Proyek

Berikut adalah gambaran umum struktur direktori `app/`:

```
app/
├── assets/         # Aset statis seperti CSS
├── components/     # Komponen Vue.js
├── composables/    # Fungsi composable (reusable)
├── layouts/        # Layout untuk halaman
├── middleware/     # Middleware untuk routing
├── pages/          # Halaman dan routing
└── types/          # Definisi tipe TypeScript
```

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).