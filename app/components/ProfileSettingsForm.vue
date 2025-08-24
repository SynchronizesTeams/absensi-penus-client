<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Edit Profil</h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="space-y-2">
        <label class="block text-gray-700 text-sm font-semibold">Nama</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="lucide:user" class="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            v-model="formData.name"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base sm:text-sm"
            required
          />
        </div>
      </div>
      <div class="space-y-2">
        <label class="block text-gray-700 text-sm font-semibold">Email</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="lucide:mail" class="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            v-model="formData.email"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base sm:text-sm"
            required
          />
        </div>
      </div>
      <div class="space-y-2">
        <label class="block text-gray-700 text-sm font-semibold">Nomor Telepon</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="lucide:phone" class="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            v-model="formData.no_telpon"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base sm:text-sm"
          />
        </div>
      </div>
      <div v-if="error" class="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-4 mb-6 shadow-sm">
        <div class="flex items-center space-x-3">
          <Icon name="lucide:alert-circle" class="h-5 w-5 text-red-500 flex-shrink-0" />
          <span class="text-sm font-medium text-red-700">{{ error }}</span>
        </div>
      </div>
      <div v-if="success" class="bg-green-50 border-l-4 border-green-400 rounded-r-lg p-4 mb-6 shadow-sm">
        <div class="flex items-center space-x-3">
          <Icon name="lucide:check-circle" class="h-5 w-5 text-green-500 flex-shrink-0" />
          <span class="text-sm font-medium text-green-700">Profil berhasil diperbarui!</span>
        </div>
      </div>
      <button
        type="submit"
        :disabled="isSubmitting"
        :class="{
          'w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200': true,
          'opacity-50 cursor-not-allowed': isSubmitting
        }"
      >
        <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin h-5 w-5 mr-3" />
        <Icon v-else name="lucide:save" class="h-5 w-5 mr-3" />
        {{ isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan' }}
      </button>
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
  no_telpon: '', 
});

onMounted(() => {
  formData.name = localStorage.getItem('user_name') || '';
  formData.email = localStorage.getItem('user_email') || '';
  formData.no_telpon = localStorage.getItem('user_phone') || ''; // Ambil dari localStorage jika ada
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
