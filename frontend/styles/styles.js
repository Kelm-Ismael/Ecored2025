// ui/theme.ts
import { Platform, StyleSheet } from 'react-native';

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

  text:       '#1F2937',   // gris-azulado (legibilidad)
  textMuted:  '#6B7280',
  placeholder:'#8A9A8A',

  border:     '#D6E6D6',   // borde neutro verdoso suave
  bg:         '#F4FAF2',   // fondo principal muy claro
  bgAlt:      '#ECF5EA',   // fondo alternativo

  /* añadidos para cubrir referencias existentes */
  secondary:  '#FFFFFF',   // texto en botones/contraste sobre primary
  background: '#FFFFFF',   // fondo “blanco puro” cuando lo pidas
  gray:       '#CBD5E1',   // gris suave para inputs/bordes
};

/* 🔠 Fuentes */
export const fonts = {
  regular: Platform.select({ ios: 'System', android: 'System', default: 'System' }),
  medium:  Platform.select({ ios: 'System', android: 'System', default: 'System' }),
  bold:    Platform.select({ ios: 'System', android: 'System', default: 'System' }),
};

/* 📏 Escalas reutilizables */
export const radius = { sm: 10, md: 12, lg: 16, xl: 20 };
export const space  = { xs: 6, sm: 10, md: 14, lg: 18, xl: 24 };

/* 🌫️ Sombra cross-platform */
export const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  android: { elevation: 2 },
  default: {},
}) as Record<string, unknown>;

/* 🔝 Header / Tab */
export const headerStyles = {
  headerStyle: { backgroundColor: colors.bg },
  headerShadowVisible: false,
  headerTintColor: colors.primary900,
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: colors.primary900,
    letterSpacing: 0.2,
  },
  headerTitleAlign: 'center' as const,
};

export const tabBarStyles = {
  tabBarStyle: {
    backgroundColor: colors.bg,
    height: Platform.select({ ios: 84, android: 72, default: 72 }),
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tabBarActiveTintColor: colors.primary900,
  tabBarInactiveTintColor: colors.textMuted,
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '700' as const,
    textTransform: 'none' as const,
    letterSpacing: 0.2,
  },
  tabBarIconStyle: { marginTop: 2 },
};

/* 📷 Scanner */
export const scannerStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  container: {
    flex: 1,
    margin: 0,
    padding: 20,
    backgroundColor: colors.background,
  },
  accentContainer: {
    flex: 1,
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 15,
    backgroundColor: colors.background,
    padding: 20,
  },
});

/* 🎛️ Comunes */
export const commonStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgAlt },

  container: {
    flex: 1,
    backgroundColor: colors.bgAlt,
    paddingHorizontal: space.lg,
    paddingVertical: space.lg,
  },

  containerNoPadding: {
    flex: 1,
    padding: 0,
  },

  webTitleContainer: {
    padding: 20,
    backgroundColor: colors.background,
  },

  webAccentContainer: {
    marginTop: 10,
    marginRight: 50,
    marginLeft: 50,
    maxWidth: 600,
    minWidth: 300,
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 15,
    backgroundColor: colors.background,
    padding: 30,
    alignSelf: 'center',
  },

  webLoginContainer: {
    backgroundColor: colors.primary,
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webLoginCenter: {
    backgroundColor: colors.background,
    alignSelf: 'center',
    padding: 40,
    borderRadius: 30,
  },
  webLoginTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 10,
    marginBottom: 20,
  },
  webLoginButtonText: {
    textAlign: 'center',
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 18,
  },

  webMainContainer: {
    backgroundColor: colors.background,
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    minHeight: '100vh',
    minWidth: '100vw',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  webSidebar: {
    flex: 2,
    backgroundColor: colors.primary,
    minHeight: '100vh',
  },
  webContent: {
    flex: 8,
    backgroundColor: colors.background,
    minHeight: '100vh',
  },

  webEntregaContainer: {
    borderWidth: 2, // TODO: quitar en prod
    borderColor: colors.gray,
    padding: 20,
    marginRight: 20,
    marginLeft: 20,
    alignItems: 'center',
  },
  webEntregaSearchContainer: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  webEntregaSearchTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  webEntregaSearchBar: {
    color: colors.text,
    fontSize: 16,
    marginRight: 8,
    marginLeft: 8,
    alignSelf: 'center',
  },
  webEntregaInput: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    fontSize: 16,
  },
  webEntregaSearchIcon: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 50,
  },
  webEntregaSearchResult: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    fontSize: 16,
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  webEntregaSearchResultUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  webEntregaSearchSeleccionarButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'center',
  },
  webEntregaSearchSeleccionarButtonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 12,
  },
  webEntregaResumen: {
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 15,
    backgroundColor: colors.background,
    padding: 20,
    marginRight: 30,
    marginLeft: 30,
    minWidth: 400,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webEntregaTipo: {
    flexDirection: 'row',
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    gap: 8,
  },
  webEntregaTipoPicker: {
    paddingHorizontal: 6,
    borderColor: colors.gray,
    borderRadius: 8,
  },
  webEntregaCantidad: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 8,
  },
  webEntregaCantidadInput: {
    paddingHorizontal: 6,
    borderColor: colors.gray,
    borderRadius: 8,
  },
  webEntregaAgregarButton: {
    backgroundColor: colors.accent,
    padding: 3,
    borderRadius: 50,
  },
  webEntregaResumenDivisor: {
    backgroundColor: colors.accent,
    height: 2,
    marginTop: 6,
    marginBottom: 6,
    width: '100%',
  },
  webEntregaResumenDetalle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  webEntregaResumenItem: {
    fontSize: 14,
  },
  webEntregaTotales: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  webEntregaQRButtonText: {
    textAlign: 'center',
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 18,
  },

  webQRTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  webQRContainer: {
    borderColor: colors.text,
    borderRadius: 20,
    borderWidth: 4,
    margin: 10,
    padding: 20,
    backgroundColor: colors.background,
  },

  accentContainer: {
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 15,
    backgroundColor: colors.background,
    padding: 20,
  },

  /* Perfil */
  perfilRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  perfilCell: {
    padding: 5,
  },
  box70: { flex: 7 },
  box30: { flex: 3 },

  perfilContainer: {
    backgroundColor: colors.background,
    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 50,
    paddingRight: 50,
  },
  perfilButtonsContainer: {
    marginBottom: 0,
    maxHeight: 140,
    paddingBottom: 0,
    paddingRight: 35,
    paddingLeft: 35,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
  },
  perfilButtonEntrega: {
    alignItems: 'center',
    maxHeight: 80,
    backgroundColor: colors.primary,
    borderRadius: 45,
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 15,
    marginRight: 15,
    padding: 8,
  },
  perfilButtonLogout: {
    alignItems: 'center',
    maxHeight: 80,
    backgroundColor: colors.primary,
    borderRadius: 45,
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 15,
    marginRight: 15,
    padding: 8,
  },
  perfilButtonText: {
    textAlign: 'center',
    alignItems: 'center',
    color: colors.secondary,
  },
  perfilNombre: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 2,
    textTransform: 'capitalize',
  },
  perfilRol: {
    color: colors.secondary,
    fontSize: 22,
    fontWeight: 'bold',
    padding: 2,
    textTransform: 'capitalize',
  },
  perfilNivel: {
    borderWidth: 7,
    borderColor: colors.accent,
    height: 80,
    width: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  perfilNivelText: {
    color: colors.secondary,
    alignSelf: 'center',
    fontSize: 34,
    fontWeight: '700',
  },
  perfilNivelTag: {
    color: colors.secondary,
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '500',
  },
  perfilTitulo: {
    color: colors.text,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 18,
  },
  perfilPuntos: {
    alignSelf: 'center',
    borderWidth: 8,
    borderColor: colors.accent,
    borderRadius: 20,
    backgroundColor: colors.background,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 30,
    paddingLeft: 30,
    width: 'auto',
    marginBottom: 20,
  },
  perfilPuntosTexto: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 22,
    fontWeight: 'bold',
  },
  perfilTransacciones: {
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 12,
    width: 320,
    padding: 8,
    marginBottom: 15,
    backgroundColor: colors.background,
  },

  /* Cards / textos */
  cardTight: {
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: space.md,
    paddingVertical: space.md,
    ...cardShadow,
  },

  title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    alignSelf: 'center',
    fontSize: 16,
    color: colors.text,
    marginBottom: 25,
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

  /* Formularios */
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    paddingVertical: Platform.select({ ios: 14, android: 12, default: 12 }),
    fontSize: 16,
    color: colors.text,
    marginBottom: 14,
  },
  inputLg: {
    paddingVertical: Platform.select({ ios: 16, android: 14, default: 14 }),
    fontSize: 17,
    borderRadius: radius.xl,
  },
  inputFocus: {
    borderColor: colors.primary,
    ...(Platform.OS === 'android' ? { elevation: 2 } : {
      shadowColor: colors.primary,
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    }),
  },
  inputError: { borderColor: colors.danger },

  /* Botones */
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 15,
    marginRight: 15,
    padding: 14,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },

  /* Fecha */
  fechaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fechaInputWeb: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  fechaInputDia: { flex: 1, marginRight: 5 },
  fechaInputMes: { flex: 1, marginRight: 5 },
  fechaInputAnio: { flex: 2 },

  /* Picker y filas */
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 2,
    marginVertical: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
});
