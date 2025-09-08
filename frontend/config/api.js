// frontend/config/api.js
import { Platform } from 'react-native';

export const BASE_URL = Platform.select({
  ios: 'http://127.0.0.1:3000',     // iOS simulador
  android: 'http://10.0.2.2:3000',  // Android emulador
  default: 'http://192.168.0.7:3000' // Dispositivo físico / Expo en LAN (CAMBIA esta IP)
});

async function authHeaders(extra = {}) {
  const token = await AsyncStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

export async function apiGet(path) {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}${path}`, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `GET ${path} falló`);
  return data;
}

export async function apiPost(path, body) {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `POST ${path} falló`);
  return data;
}

export async function apiPut(path, body) {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `PUT ${path} falló`);
  return data;
}

export async function apiUpload(path, formData) {
  const token = await AsyncStorage.getItem('token');
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // NO pongas Content-Type: fetch lo arma con boundary
    },
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `UPLOAD ${path} falló`);
  return data;
}
