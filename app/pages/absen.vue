<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
    <AbsenStatus
      v-if="showStatus"
      :status="status"
      :message="statusMessage"
      :current-time="currentTime"
      @reset="resetForm" />

    <template v-else>
      <div class="p-4 space-y-4">
        <TimeCard :current-time="currentTime" />
        <AbsenCard @success="handleSuccess" @error="handleError" />
        <InfoCard />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showStatus = ref(false);
const status = ref<"success" | "error">("success");
const statusMessage = ref("");
const currentTime = ref(new Date());
let timer: NodeJS.Timeout;

definePageMeta({
  layout: 'main'
});

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const handleSuccess = (msg = "") => {
  status.value = "success";

  if (msg === "offline") {
    statusMessage.value = "✅ Absen berhasil disimpan offline! Data akan dikirim saat online.";
  } else {
    statusMessage.value = "✅ Data absen Anda telah berhasil dikirim pada";
  }

  showStatus.value = true;

  // Hanya reset jika bukan offline
  if (msg !== "offline") {
    setTimeout(() => {
      showStatus.value = false;
    }, 3000);
  }
};

const handleError = (msg = "") => {
  status.value = "error";
  statusMessage.value = msg || "❌ Data absen gagal dikirim. Silakan coba lagi.";
  showStatus.value = true;
  setTimeout(() => {
    showStatus.value = false;
  }, 3000);
};

const resetForm = () => {
  showStatus.value = false;
};
</script>
