<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div class="flex-grow flex items-center justify-center px-4 py-12">
            <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form @submit.prevent="handleLogin">
                    <div class="mb-4">
                        <label for="no_induk" class="block text-gray-700 text-sm font-medium mb-2">NIG</label>
                        <input type="text" id="no_induk" v-model="no_induk"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan no_induk" required>
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-gray-700 text-sm font-medium mb-2">Password</label>
                        <input type="password" id="password" v-model="password"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan password" required>
                    </div>
                    <button type="submit"
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Masuk
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const no_induk = ref('')
const password = ref('')
const config = useRuntimeConfig()

console.log('API URL:', config.public.apiUrl);

const handleLogin = async () => {
  try {
    const response = await fetch(`${config.public.apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        no_induk: no_induk.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('auth_token', data.token)
      navigateTo('/')
    } else {
      console.error('Login gagal:', data.message)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>