import { ref } from 'vue';

export const useUserSettings = () => {
  const config = useRuntimeConfig();
  const error = ref<string | null>(null);
  const success = ref<boolean>(false);

  const updateProfile = async (userData: { name: string; email: string; no_telpon?: string }) => {
    error.value = null;
    success.value = false;
    try {
      const userId = localStorage.getItem('user_id');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        throw new Error('User ID or token not found.');
      }

      const response = await $fetch(`${config.public.apiUrl}/v1/user/edit/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });
      success.value = true;
      return response;
    } catch (e: any) {
      error.value = e.data?.message || 'Failed to update profile.';
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
      const token = localStorage.getItem('token');
      if (!userId || !token) {
        throw new Error('User ID or token not found.');
      }

      const response = await $fetch(`${config.public.apiUrl}/v1/user/edit-password/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(passwordData),
      });
      success.value = true;
      return response;
    } catch (e: any) {
      error.value = e.data?.message || 'Failed to update password.';
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
