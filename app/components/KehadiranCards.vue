<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div
      class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 transition-all duration-200 cursor-pointer"
      @click="!isCheckedIn && navigateTo('/absen')">
      <div class="flex items-center space-x-4">
        <div
          :class="[
            'w-14 h-14 rounded-xl flex items-center justify-center shadow-md',
            isCheckedIn
              ? 'bg-gradient-to-br from-green-500 to-green-600'
              : 'bg-gradient-to-br from-yellow-500 to-yellow-600',
          ]">
          <Icon
            :name="isCheckedIn ? 'lucide:calendar-check' : 'lucide:calendar'"
            class="w-7 h-7 text-white" />
        </div>
        <div>
          <p class="text-gray-600 font-medium">Absen Hari Ini</p>
          <h3 class="text-xl font-bold text-gray-800">
            <span v-if="isCheckedIn" class="text-green-500">✓ Sudah Absen</span>
            <span v-else class="text-yellow-500">Belum Absen</span>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const attendanceRate = ref(90);
const isCheckedIn = ref(false);
</script>

<style></style>
