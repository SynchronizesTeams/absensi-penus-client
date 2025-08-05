export interface LocationData {
  latitude: number
  longitude: number
  accuracy?: number
}

export interface AttendanceData {
  photo: string | null
  location: LocationData | null
  timestamp: Date
}