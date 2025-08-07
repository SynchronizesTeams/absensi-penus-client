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