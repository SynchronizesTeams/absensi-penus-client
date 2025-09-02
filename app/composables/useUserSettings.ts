import { ref } from 'vue';

interface AuthFetchResponseData {
  name: string;
  email: string;
  no_telpon: string;
}

interface AuthFetchResponse {
  data?: AuthFetchResponseData;
  message?: string;
}

export const useUserSettings = () => {
  const config = useRuntimeConfig();
  const error = ref<string | null>(null);
  const success = ref<boolean>(false);

  // helper untuk fetch dengan token
  const authFetch = async <T>(url: string, options: any = {}): Promise<T> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found.');

    return await $fetch<T>(url, {
      baseURL: config.public.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        Accept: 'application/json',
        ...options.headers,
      },
      ...options,
    });
  };

  const updateProfile = async (userData: { name: string; email: string; no_telpon?: string }) => {
    error.value = null;
    success.value = false;
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) throw new Error('User ID not found.');

      const response: AuthFetchResponse = await authFetch<AuthFetchResponse>(`/v1/user/edit/${userId}`, {
        method: 'POST',
        body: userData,
      });

      // Pastikan response memiliki data yang diperbarui
      if (response && response.data) {
        localStorage.setItem('user_name', response.data.name || '');
        localStorage.setItem('user_email', response.data.email || '');
        localStorage.setItem('user_no_telpon', response.data.no_telpon || '');
      }

      success.value = true;
      return response;
    } catch (e: any) {
      error.value = e.data?.message || e.message || 'Failed to update profile.';
      console.error('Error updating profile:', e);
      success.value = false;
      throw e;
    }
  };

  const updatePassword = async (passwordData: { password: string }) => {
    error.value = null;
    success.value = false;
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) throw new Error('User ID not found.');

      await authFetch(`/v1/user/edit-password/${userId}`, {
        method: 'POST',
        body: passwordData,
      });

      success.value = true;
      return "password berhasil di update";
    } catch (e: any) {
      error.value = e.data?.message || e.message || 'Failed to update password.';
      console.error('Error updating password:', e);
      success.value = false;
      throw e;
    }
  };

  return {
    error,
    success,
    updateProfile,
    updatePassword,
  };
};
