// frontend/config/api.js
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';

/**
 * CONFIGURA AQUÍ TU IP LAN y PUERTO DEL BACKEND
 * Ejemplo: 192.168.0.7:3000
 */
const LAN_HOST = '192.168.0.7:3000'; // <-- CAMBIA si tu IP cambió

// ¿Estamos en emulador/simulador?
const IS_EMULATOR = !Device.isDevice;

// Resuelve host por plataforma y si es emulador o dispositivo real
function resolveHost() {
  if (Platform.OS === 'ios') {
    // iOS sim = localhost; iOS físico = IP LAN
    return IS_EMULATOR ? '127.0.0.1:3000' : LAN_HOST;
  }
  if (Platform.OS === 'android') {
    // Android emulador = 10.0.2.2; Android físico = IP LAN
    return IS_EMULATOR ? '10.0.2.2:3000' : LAN_HOST;
  }
  // Web u otros: usá IP LAN
  return LAN_HOST;
}

// Permite override por variable pública (opcional)
// Agregá en app.json -> expo.extra.EXPO_PUBLIC_API_URL = "https://tu-ngrok.ngrok.io"
const ENV_URL = process.env.EXPO_PUBLIC_API_URL; // Expo ya expone EXPO_PUBLIC_*

const HOST = (ENV_URL && ENV_URL.replace(/^https?:\/\//, '')) || resolveHost();

export const BASE_URL =
  (ENV_URL?.startsWith('https://') ? `https://${HOST}` : `http://${HOST}`);

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
      // No forzar Content-Type: fetch arma el boundary
    },
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `UPLOAD ${path} falló`);
  return data;
}

// Log útil para depurar en consola de Expo
console.log('[API] BASE_URL →', BASE_URL, '| IS_EMULATOR:', IS_EMULATOR, '| Platform:', Platform.OS);
