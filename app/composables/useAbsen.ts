import type { AttendanceData, LocationData } from "~/types";
import { saveOfflineAbsen, getAllOfflineAbsen, removeOfflineAbsen } from '~/utils/db';

// Helper: Konversi File ke Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Helper: Konversi Base64 ke File
const base64toFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) throw new Error('Invalid base64 MIME type format');
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const useAbsen = () => {
  const photo = ref<File | null>(null);
  const location = ref<LocationData | null>(null);
  const isCapturing = ref(false);
  const isSubmitting = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);
  const offlineCount = ref(0);
  const config = useRuntimeConfig();

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

  // Fungsi untuk sinkronisasi data offline
  const syncOfflineData = async () => {
    const pendingAbsens = await getAllOfflineAbsen();

    for (const absen of pendingAbsens) {
      try {
        // Konversi base64 kembali ke File
        const file = base64toFile(absen.photo, 'offline_absen.jpg');

        const formData = new FormData();
        formData.append("photo_masuk", file);
        formData.append("latitude", String(absen.location.latitude));
        formData.append("longitude", String(absen.location.longitude));
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan.");
        }

        // Kirim ke server
        await $fetch(`${config.public.apiUrl}/absen/masuk`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        });

        // Hapus dari IndexedDB jika berhasil
        await removeOfflineAbsen(absen.id);
      } catch (error) {
        console.error('Gagal sinkronisasi absen offline:', error);
        break; // Hentikan loop jika gagal
      }
    }

    // Update jumlah offline
    const remaining = await getAllOfflineAbsen();
    offlineCount.value = remaining.length;

    // Notifikasi jika berhasil
    if (pendingAbsens.length > 0 && offlineCount.value === 0) {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Sinkronisasi Berhasil', {
          body: `${pendingAbsens.length} absen offline berhasil dikirim`
        });
      }
    }
  };

  const submitAttendance = async (attendanceData: AttendanceData) => {
    isSubmitting.value = true;
    error.value = null;

    try {
      if (!attendanceData.photo) {
        throw new Error("Foto absensi tidak tersedia.");
      }

      const formData = new FormData();
      formData.append("photo_masuk", attendanceData.photo);
      formData.append("latitude", String(attendanceData.location?.latitude ?? ""));
      formData.append("longitude", String(attendanceData.location?.longitude ?? ""));
      const token = localStorage.getItem("token");
      console.log(`token${token}`);

      if (!token) {
        throw new Error("Token tidak ditemukan.");
      }

      // Coba kirim ke server
      await $fetch(`${config.public.apiUrl}/absen/masuk`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      // Coba sinkronkan data offline jika ada
      if (navigator.onLine) {
        await syncOfflineData();
      }

      success.value = true;
      return true;
    } catch (error: any) {
      // Tangani kasus offline
      if (!navigator.onLine) {
        // Simpan ke penyimpanan offline
        const photoBase64 = await fileToBase64(attendanceData.photo);

        const offlineData = {
          photo: photoBase64,
          location: {
            latitude: attendanceData.location?.latitude || 0,
            longitude: attendanceData.location?.longitude || 0,
          },
          timestamp: new Date().toISOString()
        };

        await saveOfflineAbsen(offlineData);
        offlineCount.value = (await getAllOfflineAbsen()).length;

        // Daftarkan background sync
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
          const reg = await navigator.serviceWorker.ready;
          await reg.sync.register('absen-sync');
        }

        throw new Error('offline');
      } else {
        // Tangani error online
        let errorMsg = "Gagal mengirim data absensi.";
        if (error?.response?._data?.message) {
          errorMsg = error.response._data.message;
        } else if (error?.data?.message) {
          errorMsg = error.data.message;
        } else if (error?.message) {
          errorMsg = error.message;
        }
        throw new Error(errorMsg);
      }
    } finally {
      isSubmitting.value = false;
    }
  };

  const resetForm = () => {
    photo.value = null;
    location.value = null;
    error.value = null;
    success.value = false;
  };

  // Inisialisasi jumlah offline
  const initOfflineCount = async () => {
    const pending = await getAllOfflineAbsen();
    offlineCount.value = pending.length;
  };

  return {
    photo,
    location,
    isCapturing,
    isSubmitting,
    error,
    success,
    offlineCount,
    getCurrentLocation,
    submitAttendance,
    resetForm,
    syncOfflineData,
    initOfflineCount
  };
};
