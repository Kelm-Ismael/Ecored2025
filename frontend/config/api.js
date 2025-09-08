// frontend/config/api.js
import { Platform } from 'react-native';

export const BASE_URL = Platform.select({
  ios: 'http://127.0.0.1:3000',     // iOS simulador
  android: 'http://10.0.2.2:3000',  // Android emulador
  default: 'http://192.168.0.7:3000' // Dispositivo físico / Expo en LAN (CAMBIA esta IP)
});
