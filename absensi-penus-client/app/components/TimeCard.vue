<|diff_marker|> 
// filepath: /home/kurnias/Documents/Projects/Sekolah/Devaccto/absensi-penus-client/app/components/TimeCard.vue
<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-4">
      <div class="text-center space-y-2">
        <div class="flex items-center justify-center space-x-2">
          <Icon name="lucide:clock" class="w-5 h-5 text-blue-600" />
          <span class="text-sm text-gray-600">Waktu Saat Ini</span>
        </div>
        <div class="text-3xl font-bold text-gray-900">
          {{ formatTime(currentTime) }}
        </div>
        <div class="text-sm text-gray-600">{{ formatDate(currentTime) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentTime: Date;
}

defineProps<Props>();

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<style></style>
