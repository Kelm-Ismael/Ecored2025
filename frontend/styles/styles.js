// styles/styles.js
import { StyleSheet, Platform } from 'react-native';
import { rf, wp } from '../utils/responsive';

export const colors = {
  primary:   '#D8F291',
  secondary: '#00A887',
  accent:    '#B9DA65',
  text:      '#333333',
  background:'#FFFFFF',
  gray:      '#D9D9D9',
  white:     '#FFFFFF',
  danger:    '#E74C3C',
};

export const fonts = {
  regular: 'System',
  bold:    Platform.select({ ios: 'System', android: 'System' }),
};

// Navegación (header)
export const headerStyles = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.secondary,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: rf(22),
    color: colors.secondary,
  },
  headerTitleAlign: 'center',
};

// Tab bar responsivo
export const tabBarStyles = {
  tabBarStyle: {
    backgroundColor: colors.primary,
    height: Platform.select({ ios: 80, android: 70 }),
    paddingBottom: Platform.select({ ios: 12, android: 8 }),
    paddingTop: 6,
  },
  tabBarActiveTintColor: colors.secondary,
  tabBarInactiveTintColor: colors.accent,
  tabBarLabelStyle: {
    fontSize: rf(11),
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'none',
  },
  tabBarLabelPosition: 'below-icon',
  tabBarIconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(8),
  },
};

const cardShadow = Platform.select({
  ios:   { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  android: { elevation: 3 },
});

export const commonStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },

  // Contenedor base con padding relativo
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp(6),
    paddingVertical: 16,
    backgroundColor: colors.background,
  },

  // Tarjetas/Paneles
  accentContainer: {
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.background,
    ...cardShadow,
  },

  // Títulos/Texto responsive
  title: {
    fontSize: rf(24),
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: rf(15),
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },

  // Inputs cómodos
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: rf(15),
    marginBottom: 12,
    backgroundColor: colors.white,
  },

  // Botón principal
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
    ...cardShadow,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: rf(15),
  },

  // Botón de peligro (logout, borrar, etc.)
  buttonDanger: {
    backgroundColor: colors.danger,
  },

  // Links
  link: {
    marginTop: 12,
    color: colors.secondary,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: rf(14),
  },

  // Grids simples
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  spread: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

  // Imagen de avatar
  avatar: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    backgroundColor: '#eee',
  },
});
