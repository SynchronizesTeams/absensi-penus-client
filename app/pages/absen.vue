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
const showStatus = ref(false);
const status = ref<"success" | "error">("success");
const statusMessage = ref("");
const currentTime = ref(new Date());

definePageMeta({
  layout: "main",
});

onMounted(() => {
  const timer = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);

  try {
    navigator.geolocation.getCurrentPosition((pos) => console.log(pos));
  } catch (error) {
    console.error(error);
  }

  onUnmounted(() => {
    clearInterval(timer);
  });
});

const handleSuccess = (msg = "") => {
  status.value = "success";
  statusMessage.value = msg || "Data absen Anda telah berhasil dikirim pada";
  showStatus.value = true;
  setTimeout(() => {
    showStatus.value = false;
  }, 3000);
};

const handleError = (msg = "") => {
  status.value = "error";
  statusMessage.value = msg || "Data absen gagal dikirim. Silakan coba lagi.";
  showStatus.value = true;
};

const resetForm = () => {
  showStatus.value = false;
};
</script>
