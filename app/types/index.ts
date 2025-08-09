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

export interface OfflineAbsen {
  id?: number;
  photo: string; // base64
  location: {
    latitude: number;
    longitude: number;
  };
  timestamp: string;
}
