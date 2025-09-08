// styles/styles.js
import { StyleSheet, Platform } from 'react-native';

/* 🎨 Paleta refinada (verde petróleo + lima suavizada + neutros cálidos) */
export const colors = {
  primary:    '#0A7A72',
  primary900: '#075C57',
  primary100: '#CFF2D5',   // acento suave para fondos y botones muted
  accent:     '#E9F7B6',   // lima muy suave
  accent700:  '#C7DF84',

  success:    '#16A34A',
  danger:     '#DC2626',
  warning:    '#F59E0B',
  info:       '#3B82F6',

  text:       '#1F2937',   // gris-azulado (mejor legibilidad)
  textMuted:  '#6B7280',
  placeholder:'#8A9A8A',

  border:     '#D6E6D6',   // borde neutro verdoso suave
  bg:         '#F4FAF2',   // fondo principal muy claro
  bgAlt:      '#ECF5EA',   // fondo alternativo
};

/* 🔠 Fuentes (misma estructura) */
export const fonts = {
  regular: Platform.select({ ios: 'System', android: 'System' }),
  medium:  Platform.select({ ios: 'System', android: 'System' }),
  bold:    Platform.select({ ios: 'System', android: 'System' }),
};

/* 📏 Escalas reutilizables */
const radius = { sm: 10, md: 12, lg: 16, xl: 20 };
const space  = { xs: 6, sm: 10, md: 14, lg: 18, xl: 24 };

/* 🔝 Header / Tab (más limpio y consistente) */
export const headerStyles = {
  headerStyle: { backgroundColor: colors.bg },
  headerShadowVisible: false,
  headerTintColor: colors.primary900,
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary900,
    letterSpacing: 0.2,
  },
  headerTitleAlign: 'center',
};

export const tabBarStyles = {
  tabBarStyle: {
    backgroundColor: colors.bg,
    height: Platform.select({ ios: 84, android: 72 }),
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tabBarActiveTintColor: colors.primary900,
  tabBarInactiveTintColor: colors.textMuted,
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'none',
    letterSpacing: 0.2,
  },
  tabBarIconStyle: { marginTop: 2 },
};

/* 🌫️ Sombras suaves + elevación consistente */
const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  android: { elevation: 4 },
});

/* 📦 Estilos comunes (misma estructura, mejores proporciones) */
export const commonStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgAlt },

  container: {
    flex: 1,
    backgroundColor: colors.bgAlt,
    paddingHorizontal: space.lg,
    paddingVertical: space.lg,
  },

  /* 🧩 Cards */
  card: {
    backgroundColor: colors.bg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: space.lg,
    ...cardShadow,
  },
  cardTight: {
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: space.md,
    paddingVertical: space.md,
    ...cardShadow,
  },

  /* 📝 Títulos / textos */
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary900,
    textAlign: 'center',
    marginBottom: space.sm,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: space.sm,
  },
  h2: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: space.xs,
  },
  body: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  small: {
    fontSize: 12,
    color: colors.textMuted,
  },

  /* 🏷️ Labels para formularios (opcional) */
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },

  /* 🔤 Inputs (más altos y legibles) */
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    paddingVertical: Platform.select({ ios: 14, android: 12 }),
    fontSize: 16,                // sube placeholder también
    color: colors.text,
    marginBottom: 14,
  },
  inputLg: {
    paddingVertical: Platform.select({ ios: 16, android: 14 }),
    fontSize: 17,
    borderRadius: radius.xl,
  },
  inputFocus: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    ...(Platform.OS === 'android' ? { elevation: 2 } : null),
  },
  inputError: { borderColor: colors.danger },

  /* 🔘 Botones (más “tacto” y jerarquía clara) */
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    ...cardShadow,
    marginVertical: 8,
  },
  buttonLg: {
    paddingVertical: 16,
    borderRadius: radius.xl,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  buttonOutlineText: { color: colors.primary },
  buttonDanger: { backgroundColor: colors.danger },
  buttonMuted: { backgroundColor: colors.primary100 },
  buttonMutedText: { color: colors.primary900 },

  /* 🏷️ Chips / pills */
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    color: colors.primary900,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 12,
    fontWeight: '800',
  },

  /* 📋 List item */
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
    ...cardShadow,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listTitle:    { fontSize: 16, fontWeight: '800', color: colors.text },
  listSubtitle: { fontSize: 13, color: colors.textMuted },

  /* 🖼️ Avatar */
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: colors.bgAlt,
  },

  /* 🧭 Layout helpers */
  row:     { flexDirection: 'row', alignItems: 'center' },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  center:  { alignItems: 'center', justifyContent: 'center' },
});
