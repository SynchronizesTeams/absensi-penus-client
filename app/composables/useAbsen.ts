import { ref } from "vue";
import type { AbsentData, AttendanceData, LocationData } from "~/types";

export const useAbsen = () => {
  const photo = ref<File | null>(null);
  const location = ref<LocationData | null>(null);
  const isCapturing = ref(false);
  const isSubmitting = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);
  const config = useRuntimeConfig();

  const checkAbsenMasukStatus = async (): Promise<boolean> => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) throw new Error('User ID not found.');

      await $fetch(`${config.public.apiUrl}/v1/absen/cek-masuk/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      return true;
    } catch (error: any) {
      if (error?.statusCode === 401) {
        return false;
      }
      console.error("Error checking absen masuk status:", error);
      throw new Error("Gagal memeriksa status absen masuk.");
    }
  };

  const checkAbsenPulangStatus = async (): Promise<boolean> => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) throw new Error('User ID not found.');

      await $fetch(`${config.public.apiUrl}/v1/absen/cek-pulang/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      return true; // 200 OK, user already absen pulang
    } catch (error: any) {
      if (error?.statusCode === 401) {
        return false; // 401 Unauthorized, user not yet absen pulang
      }
      console.error("Error checking absen pulang status:", error);
      throw new Error("Gagal memeriksa status absen pulang.");
    }
  };

  const getCurrentLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation tidak didukung oleh browser ini"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          let errorMessage = "Gagal mendapatkan lokasi";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                "Akses lokasi ditolak. Mohon izinkan akses lokasi.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Informasi lokasi tidak tersedia.";
              break;
            case error.TIMEOUT:
              errorMessage = "Waktu permintaan lokasi habis.";
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  };

  const submitAttendance = async (attendanceData: AttendanceData) => {
    try {
      if (!attendanceData.photo) {
        throw new Error("Foto absensi tidak tersedia.");
      }
      const formData = new FormData();
      formData.append("photo_masuk", attendanceData.photo);
      formData.append(
        "latitude",
        String(attendanceData.location?.latitude ?? "")
      );
      formData.append(
        "longitude",
        String(attendanceData.location?.longitude ?? "")
      );

      const data = await $fetch(`${config.public.apiUrl}/v2/absen/masuk`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        body: formData,
      });
      return data;
    } catch (error: any) {
      let errorMsg = "Gagal mengirim data absensi.";
      if (error?.data?.message) {
        errorMsg = error.data.message;
      }
      console.error("Error submitting attendance:", error);
      throw new Error(errorMsg);
    }
  };

  const submitAbsent = async (absentData: AbsentData) => {
    try {
      if (!absentData.photo) {
        throw new Error("Foto absensi tidak tersedia.");
      }
      const formData = new FormData();
      formData.append("photo_izin", absentData.photo);
      formData.append("keterangan", absentData.keterangan);
      formData.append("keterangan_masuk", absentData.keterangan_masuk);

      const data = await $fetch(`${config.public.apiUrl}/absen/izin`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        body: formData,
      });
      return data;
    } catch (error: any) {
      let errorMsg = "Gagal mengirim data absensi.";
      if (error?.data?.message) {
        errorMsg = error.data.message;
      }
      console.error("Error submitting absent data:", error);
      throw new Error(errorMsg);
    }
  };

  const submitPulang = async (returnData: AttendanceData) => {
    try {
      if (!returnData.photo) {
        throw new Error("Foto absensi tidak tersedia.");
      }
      const formData = new FormData();
      formData.append("photo_pulang", returnData.photo);
      formData.append("latitude", String(returnData.location?.latitude ?? ""));
      formData.append("longitude", String(returnData.location?.longitude ?? ""));

      const data = await $fetch(`${config.public.apiUrl}/v1/absen/pulang`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        body: formData,
      });
      return data;
    } catch (error: any) {
      let errorMsg = "Gagal mengirim data absensi.";

      if (error?.statusCode === 403) {
        errorMsg = "Anda sudah melakukan absen pulang hari ini.";
      } else if (error?.data?.message) {
        errorMsg = error.data.message;
      }

      console.error("Error submitting return data:", error);
      throw new Error(errorMsg);
    }
  };

  const setPhoto = (file: File | null) => {
    photo.value = file;
    if (!file) {
      isCapturing.value = false;
    }
  };

  const resetForm = () => {
    photo.value = null;
    location.value = null;
    error.value = null;
    success.value = false;
    isCapturing.value = false;
    isSubmitting.value = false;
  };

  return {
    photo,
    location,
    isCapturing,
    isSubmitting,
    error,
    success,
    getCurrentLocation,
    submitAttendance,
    submitAbsent,
    submitPulang,
    resetForm,
    setPhoto,
    checkAbsenMasukStatus,
    checkAbsenPulangStatus,
  };
};
