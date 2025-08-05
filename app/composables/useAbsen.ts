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
    submitAttendance,
    resetForm
  }
}