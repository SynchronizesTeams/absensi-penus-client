// filepath: /home/kurnias/Documents/Projects/Sekolah/Devaccto/absensi-penus-client/app/composables/useAbsen.ts
import type { AttendanceData, LocationData } from "~/types"

export const useAbsen = () => {
  const photo = ref<string | null>(null)
  const location = ref<LocationData | null>(null)
  const isCapturing = ref(false)
  const isSubmitting = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const getCurrentLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation tidak didukung oleh browser ini"))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          })
        },
        (error) => {
          let errorMessage = "Gagal mendapatkan lokasi"
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Akses lokasi ditolak. Mohon izinkan akses lokasi."
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Informasi lokasi tidak tersedia."
              break
            case error.TIMEOUT:
              errorMessage = "Waktu permintaan lokasi habis."
              break
          }
          reject(new Error(errorMessage))
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        },
      )
    })
  }

  const capturePhoto = async (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const constraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          video.srcObject = stream;
          video.play();

          const canvas = document.createElement('canvas');
          canvas.width = 1280;
          canvas.height = 720;

          const capture = () => {
            const context = canvas.getContext('2d');
            if (context) {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              const dataUrl = canvas.toDataURL('image/png');
              resolve(dataUrl);
              stream.getTracks().forEach(track => track.stop());
              video.pause();
            }
          };

          video.addEventListener('loadedmetadata', () => {
            setTimeout(capture, 1000); // Capture after 1 second
          });
        })
        .catch((err) => {
          reject(new Error("Gagal mengakses kamera: " + err.message));
        });
    });
  }

  const submitAttendance = async (attendanceData: AttendanceData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Attendance submitted successfully' })
      }, 2000)
    })
  }

  const resetForm = () => {
    photo.value = null
    location.value = null
    error.value = null
    success.value = false
  }

  return {
    photo,
    location,
    isCapturing,
    isSubmitting,
    error,
    success,
    getCurrentLocation,
    capturePhoto,
    submitAttendance,
    resetForm
  }
}