<template>
  <div class=" gap-6 mb-8">
    <div
      class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 transition-all duration-200 cursor-pointer"
      @click="shouldRedirect && navigateTo('/absen')">
      <div class="flex items-center space-x-4">
        <div
          :class="[
            'w-14 h-14 rounded-xl flex items-center justify-center shadow-md',
            isCheckedIn && currentHour < 13
              ? 'bg-gradient-to-br from-green-500 to-green-600'
              : isCheckedOut && currentHour >= 13
              ? 'bg-gradient-to-br from-green-500 to-green-600'
              : 'bg-gradient-to-br from-yellow-500 to-yellow-600',
          ]">
          <Icon
            :name="isCheckedIn ? 'lucide:calendar-check' : 'lucide:calendar'"
            class="w-7 h-7 text-white" />
        </div>
        <div>
          <p class="text-gray-600 font-medium">
            <span v-if="isCheckedIn && currentHour < 13">Terima kasih telah absen</span>
            <span v-else-if="isCheckedOut && currentHour >= 13">Terima kasih telah absen pulang</span>
            <span v-else>Tekan untuk absen</span>
          </p>
          <h3 class="text-xl font-bold text-gray-800">
            <span
              v-if="isCheckedIn && currentHour < 13"
              class="text-green-500">✓ Sudah Absen</span>
            <span
              v-else-if="isCheckedOut && currentHour >= 13"
              class="text-green-500">✓ Sudah Absen Pulang</span>
            <span
              v-else
              class="text-yellow-500">Belum Absen</span>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAbsen } from '~/composables/useAbsen';

const { checkAbsenMasukStatus, checkAbsenPulangStatus } = useAbsen();
const attendanceRate = ref(90);
const isCheckedIn = ref(false);
const isCheckedOut = ref(false);
const currentHour = ref(new Date().getHours());

const shouldRedirect = computed(() => {
  return (currentHour.value < 13 && !isCheckedIn.value) ||
         (currentHour.value >= 13 && !isCheckedOut.value);
});

onMounted(async () => {
  isCheckedIn.value = await checkAbsenMasukStatus();
  isCheckedOut.value = await checkAbsenPulangStatus();
});
</script>

<style></style>
