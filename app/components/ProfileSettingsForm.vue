<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Edit Profil</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nama:</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <!-- Hapus bagian no_induk dan role di sini -->
      <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>
      <div v-if="success" class="text-green-500 text-sm mb-4">Profil berhasil diperbarui!</div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useUserSettings } from '~/composables/useUserSettings';

const { updateProfile, error, success } = useUserSettings();

const formData = reactive({
  name: '',
  email: '',
});

onMounted(() => {
  formData.name = localStorage.getItem('user_name') || '';
  formData.email = localStorage.getItem('user_email') || '';
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    await updateProfile(formData);
  } catch (e) {
    
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
