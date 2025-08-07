/**
 * Mengonversi URL (baik data URL maupun URL biasa) menjadi objek File.
 * @param url - URL sumber daya (contoh: 'data:image/jpeg;base64,...' atau 'https://.../image.jpg').
 * @param filename - Nama file yang akan dibuat (contoh: 'photo.jpg').
 * @param mimeType - MIME type dari file (contoh: 'image/jpeg').
 * @returns Promise yang akan resolve dengan objek File.
 */
export async function urlToFile(dataUrl: string, filename: string): Promise<File> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
}
