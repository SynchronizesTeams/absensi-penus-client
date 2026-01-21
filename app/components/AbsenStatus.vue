<template>
  <div
    :class="[
      'min-h-screen flex items-center justify-center p-4',
      status === 'success' ? 'bg-green-100' : 'bg-red-100',
    ]"
  >
    <div
      class="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100"
    >
      <div class="p-6">
        <div class="text-center space-y-4">
          <Icon
            :name="statusIcon"
            :class="['w-16 h-16 mx-auto', statusColor]"
          />
          <h2 :class="['text-2xl font-bold', statusTextColor]">
            {{ statusTitle }}
          </h2>
          <p class="text-gray-600">
            {{ statusMessage }}
            <template v-if="status === 'success' && currentTime">
              <br />
              {{ formatTime(currentTime) }}
            </template>
          </p>
          <button
            @click="$emit('reset')"
            class="w-full px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {{ status === "success" ? "Selesai" : "Kembali" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  status: "success" | "error";
  currentTime?: Date;
  message?: string;
  keterangan?: string;
}

const props = defineProps<Props>();

const statusIcon = computed(() =>
  props.status === "success" ? "lucide:check-circle" : "lucide:x-circle"
);

const statusColor = computed(() =>
  props.status === "success" ? "text-green-500" : "text-red-500"
);

const statusTextColor = computed(() =>
  props.status === "success" ? "text-green-700" : "text-red-700"
);

const statusTitle = computed(() => {
  if (props.status === "success") {
    const keteranganText = props.keterangan
      ? `Anda hadir ${props.keterangan}`
      : "";
    return `Absen Berhasil! ${keteranganText}`;
  }
  return "Absen Gagal";
});

const statusMessage = computed(
  () =>
    props.message ||
    (props.status === "success"
      ? "Data absen Anda telah berhasil dikirim pada"
      : "Data absen gagal dikirim. Silakan coba lagi.")
);

const formatTime = (date?: Date) => {
  if (!date) return "";
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
</script>
