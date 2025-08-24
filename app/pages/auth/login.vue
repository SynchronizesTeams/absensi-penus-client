<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col"
  >
    <div class="flex-grow flex items-center justify-center px-4 py-12">
      <div class="max-w-md w-full">
        <div
          class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div
            class="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-center"
          >
            <h1 class="text-2xl font-bold text-white mb-2">Selamat Datang</h1>
            <p class="text-blue-100 text-sm">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </div>

          <div class="p-8">
            <div
              v-if="error"
              class="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-4 mb-6 shadow-sm"
            >
              <div class="flex items-center space-x-3">
                <Icon
                  name="lucide:alert-circle"
                  class="h-5 w-5 text-red-500 flex-shrink-0"
                />
                <span class="text-sm font-medium text-red-700">{{
                  error
                }}</span>
              </div>
            </div>

            <div
              v-if="success"
              class="bg-green-50 border-l-4 border-green-400 rounded-r-lg p-4 mb-6 shadow-sm"
            >
              <div class="flex items-center space-x-3">
                <Icon
                  name="lucide:check-circle"
                  class="h-5 w-5 text-green-500 flex-shrink-0"
                />
                <span class="text-sm font-medium text-green-700">{{
                  success
                }}</span>
              </div>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
              <div class="space-y-2">
                <label
                  for="no_induk"
                  class="block text-gray-700 text-sm font-semibold"
                >
                  Nomor Induk
                </label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <Icon name="lucide:user" class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="no_induk"
                    v-model="no_induk"
                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="Masukkan Nomor Induk"
                    required
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label
                  for="password"
                  class="block text-gray-700 text-sm font-semibold"
                >
                  Password
                </label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <Icon name="lucide:lock" class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="password"
                    class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="Masukkan Password"
                    required
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <Icon
                      :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                      class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    />
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    v-model="rememberMe"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label for="remember-me" class="ml-2 text-sm text-gray-600">
                    Ingat saya
                  </label>
                </div>
              </div>

              <BaseButton
                :is-submitting="isLoading"
                text="Masuk"
                icon-name="lucide:log-in"
                loading-icon-name="lucide:loader-2"
                @submit="handleLogin"
              />
            </form>

            <div class="mt-8 mb-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                  <span class="bg-white px-3 text-gray-500 font-medium"
                    >Atau</span
                  >
                </div>
              </div>
            </div>

            <div class="text-center space-y-4">
              <p class="text-sm text-gray-600">
                Belum punya akun?
                <NuxtLink
                  to="#"
                  class="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Hubungi Administrator
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>

        <div
          class="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-5 text-center"
        >
          <div
            class="flex items-center justify-center space-x-2 text-sm text-gray-600"
          >
            <div class="flex items-center">
              <Icon name="lucide:shield" class="w-4 h-4 text-green-600" />
              <span>Powered by Devaccto RPL</span>
            </div>
            <div class="w-1 h-4 bg-gray-300 rounded-full"></div>
            <div class="flex items-center">
              <span>© 2025 - SMK Plus PNB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";

const no_induk = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const error = ref("");
const success = ref("");
const config = useRuntimeConfig();

interface UserData {
  id: number;
  user_id: string;
  no_induk: string;
  name: string;
  email: string;
  no_telpon: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

interface LoginResponse {
  token: string;
  user: UserData;
  message?: string;
}

definePageMeta({
  path: "/login"
})

const handleLogin = async () => {
  error.value = "";
  success.value = "";
  isLoading.value = true;

  try {
    const data: LoginResponse = await $fetch(
      `${config.public.apiUrl}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          no_induk: no_induk.value,
          password: password.value,
        }),
      }
    );

    if (data && data.token) {
      success.value = "Login berhasil! Mengalihkan...";

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("user_name", data.user.name);
      localStorage.setItem("user_email", data.user.email);
      localStorage.setItem("user_id", data.user.user_id); // Tambahkan baris ini

      if (rememberMe.value) {
        localStorage.setItem("remember_no_induk", no_induk.value);
      } else {
        localStorage.removeItem("remember_no_induk");
      }

      setTimeout(() => {
        navigateTo("/");
      }, 1000);
    } else {
      error.value =
        data?.message || "Login gagal. Periksa kembali kredensial Anda.";
    }
  } catch (err: any) {
    console.error("Error:", err);
    error.value = err?.data?.message || "Terjadi kesalahan. Silakan coba lagi.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  const savedNoInduk = localStorage.getItem("remember_no_induk");
  if (savedNoInduk) {
    no_induk.value = savedNoInduk;
    rememberMe.value = true;
  }
});

watch([no_induk, password], () => {
  if (error.value) {
    error.value = "";
  }
});
</script>
