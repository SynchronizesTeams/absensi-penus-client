module.exports = {
  apps: [
    {
      name: "Trabsen",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000, // Sesuaikan port
      },
    },
  ],
  
  deploy: {
    production: {
      user: "root", // Username SSH di server (misal: ubuntu, root, atau deployer)
      host: "192.168.1.1", // IP Address Server VPS Anda
      ref: "origin/main", // Branch git yang mau di-pull (main atau master)
      repo: "git@github.com:username/repo-anda.git", // URL Repository Git (Gunakan SSH, bukan HTTPS)
      path: "/var/www/absensi-penus", // Folder tujuan di server tempat aplikasi disimpan

      // Perintah yang dijalankan di server setelah clone/pull berhasil
      "post-deploy":
        "pnpm install && pnpm run build && pm2 reload ecosystem.config.cjs --env production",
    },
  },
};
