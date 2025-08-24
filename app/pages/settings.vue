<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Pengaturan Pengguna</h1>

    <div class="tabs tabs-boxed mb-8">
      <a
        class="tab"
        :class="{ 'tab-active': activeTab === 'profile' }"
        @click="activeTab = 'profile'"
        >Profil</a
      >
      <a
        class="tab"
        :class="{ 'tab-active': activeTab === 'password' }"
        @click="activeTab = 'password'"
        >Kata Sandi</a
      >
    </div>

    <div v-if="activeTab === 'profile'" class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700">Edit Profil</h2>
      <ProfileSettingsForm />
    </div>

    <div v-if="activeTab === 'password'" class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700">Ganti Kata Sandi</h2>
      <PasswordSettingsForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ProfileSettingsForm from '@/components/ProfileSettingsForm.vue';
import PasswordSettingsForm from '@/components/PasswordSettingsForm.vue';

definePageMeta({
  layout: "main",
});

const activeTab = ref('profile');
</script>

<style>
/* Anda bisa menambahkan gaya khusus di sini jika diperlukan */
</style>
