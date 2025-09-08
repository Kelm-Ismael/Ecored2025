// styles/styles.js
import { StyleSheet, Platform } from 'react-native';

// 🎨 Paleta profesional (verde petróleo + lima suave + gris neutro)
export const colors = {
  primary:   '#0B7D75',  // verde petróleo (acciones principales)
  primary900:'#095F59',
  primary100:'#79c522ff',
  accent:    '#D6F27D',  // lima suave (resaltados)
  accent700: '#B7D55F',
  success:   '#1FBF6B',
  danger:    '#E24949',
  warning:   '#F5A524',
  info:      '#3B82F6',

  text:      '#2E2E2E',
  textMuted: '#6B7280',
  border:    '#82f873ff',
  bg:        'hsla(78, 79%, 63%, 1.00)',
  bgAlt:     '#dae2a9ff',
};

export const fonts = {
  regular: Platform.select({ ios: 'System', android: 'System' }),
  medium:  Platform.select({ ios: 'System', android: 'System' }),
  bold:    Platform.select({ ios: 'System', android: 'System' }),
};

// 🔝 Header / Tab
export const headerStyles = {
  headerStyle: { backgroundColor: colors.bg },
  headerShadowVisible: false,
  headerTintColor: colors.primary,
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.2,
  },
  headerTitleAlign: 'center',
};

export const tabBarStyles = {
  tabBarStyle: {
    backgroundColor: colors.bg,
    height: Platform.select({ ios: 78, android: 66 }),
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textMuted,
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'none',
    letterSpacing: 0.2,
  },
  tabBarIconStyle: { marginTop: 4 },
};

// 🌫️ Sombras consistentes
const cardShadow = Platform.select({
  ios:   { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },
  android: { elevation: 4 },
});

// 📦 Estilos comunes
export const commonStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgAlt },

  container: {
    flex: 1,
    backgroundColor: colors.bgAlt,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  // 🧩 Cards
  card: {
    backgroundColor: colors.bg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    ...cardShadow,
  },
  cardTight: {
    backgroundColor: colors.bg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...cardShadow,
  },

  // 📝 Títulos / textos
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 6,
  },
  h2: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    color: colors.textMuted,
  },

  // 🔤 Inputs
  input: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.select({ ios: 12, android: 10 }),
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
  },
  inputFocus: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  inputError: {
    borderColor: colors.danger,
  },

  // 🔘 Botones (variantes)
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    ...cardShadow,
    marginVertical: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  buttonOutlineText: {
    color: colors.primary,
  },
  buttonDanger: {
    backgroundColor: colors.danger,
  },
  buttonMuted: {
    backgroundColor: colors.primary100,
  },
  buttonMutedText: {
    color: colors.primary900,
  },

  // 🏷️ Chips / pills
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary100,
    color: colors.primary900,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: '600',
  },

  // 📋 List item
  listItem: {
    backgroundColor: colors.bg,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...cardShadow,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
  listSubtitle: { fontSize: 12, color: colors.textMuted },

  // 🖼️ Avatar
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: colors.bgAlt,
  },

  // 🧭 Layout helpers
  row: { flexDirection: 'row', alignItems: 'center' },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  center: { alignItems: 'center', justifyContent: 'center' },
});
