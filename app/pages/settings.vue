<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-6 text-center">Pengaturan Pengguna</h1>

      <div class="flex justify-center mb-6 space-x-3">
        <button
          @click="activeTab = 'profile'"
          :class="{
            'px-5 py-2 rounded-lg text-base font-semibold transition-all duration-300': true,
            'bg-blue-600 text-white shadow-md hover:bg-blue-700': activeTab === 'profile',
            'bg-gray-200 text-gray-700 hover:bg-gray-300': activeTab !== 'profile'
          }"
        >
          Profil
        </button>
        <button
          @click="activeTab = 'password'"
          :class="{
            'px-5 py-2 rounded-lg text-base font-semibold transition-all duration-300': true,
            'bg-blue-600 text-white shadow-md hover:bg-blue-700': activeTab === 'password',
            'bg-gray-200 text-gray-700 hover:bg-gray-300': activeTab !== 'password'
          }"
        >
          Kata Sandi
        </button>
      </div>

      <div class="mt-8">
        <ProfileSettingsForm v-if="activeTab === 'profile'" />
        <PasswordSettingsForm v-if="activeTab === 'password'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProfileSettingsForm from '@/components/ProfileSettingsForm.vue';
import PasswordSettingsForm from '@/components/PasswordSettingsForm.vue';

definePageMeta({
  layout: "main",
});

const activeTab = ref('profile');
</script>

<style scoped>
/* Anda bisa menambahkan gaya khusus di sini jika diperlukan */
</style>
