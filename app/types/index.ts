export interface LocationData {
  latitude: number
  longitude: number
  accuracy?: number
}

export interface AttendanceData {
  photo: File | null
  location: LocationData | null
  timestamp: Date
}

export interface AbsentData {
  photo: File | null
  keterangan: string
  keterangan_masuk: string
}