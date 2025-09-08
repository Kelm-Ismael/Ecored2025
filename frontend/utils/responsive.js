// utils/responsive.js
import { Dimensions, PixelRatio, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export const SCREEN_W = width;
export const SCREEN_H = height;

/** ancho relativo: wp(50) = 50% del ancho */
export const wp = (pct) => (SCREEN_W * pct) / 100;
/** alto relativo: hp(50) = 50% del alto */
export const hp = (pct) => (SCREEN_H * pct) / 100;

/** fuente relativa: escala según densidad y tamaño de pantalla */
export const rf = (size) => {
  const scale = SCREEN_W / 375; // base iPhone 11
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/** pequeño helper de plataforma */
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
