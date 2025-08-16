<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
    <AbsenStatus
      v-if="showStatus"
      :status="status"
      :message="statusMessage"
      :current-time="currentTime"
      @reset="resetPage"
    />

    <template v-else>
      <div class="p-4 space-y-4">
        <IzinCard @success="handleSuccess" @error="handleError" />
        <InfoCard />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAbsen } from "~/composables/useAbsen";

definePageMeta({
  layout: "main",
});

onMounted(() => {
  try {
    navigator.geolocation.getCurrentPosition((pos) => console.log(pos));
  } catch (error) {
    console.error(error);
  }
});

const showStatus = ref(false);
const status = ref<"success" | "error">("success");
const statusMessage = ref("");
const currentTime = ref(new Date());

const { resetForm } = useAbsen();

const handleSuccess = (msg = "") => {
  status.value = "success";
  statusMessage.value = msg || "Pengajuan izin Anda telah berhasil dikirim.";
  showStatus.value = true;
};

const handleError = (msg = "") => {
  status.value = "error";
  statusMessage.value =
    msg || "Pengajuan izin gagal dikirim. Silakan coba lagi.";
  showStatus.value = true;
};

const resetPage = () => {
  resetForm();
  showStatus.value = false;
};
</script>