// filepath: /home/kurnias/Documents/Projects/Sekolah/Devaccto/absensi-penus-client/app/types/index.ts
export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface AttendanceData {
  photo: string | null;
  location: LocationData | null;
  timestamp: Date;
}

export interface CameraCaptureData {
  image: string | null;
  timestamp: Date;
}