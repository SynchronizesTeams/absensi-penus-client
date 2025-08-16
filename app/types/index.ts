export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface AttendanceData {
  photo: File | null;
  location: LocationData | null;
  timestamp: Date;
}

export interface AbsentData {
  photo: File | null;
  keterangan: string;
  keterangan_masuk: string;
}

export interface Activity {
  id: number;
  status: string;
  created_at: string;
  description: string;
  time: string;
}

export interface User {
  id: number;
  name: string;
  no_induk: string;
  role: string;
  created_at: string;
  updated_at: string;
}