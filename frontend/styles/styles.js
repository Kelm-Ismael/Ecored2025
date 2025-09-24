import { act } from 'react';
import { StyleSheet } from 'react-native';
import webLogin from '../screens/webLogin';

export const colors = {
  primary: '#D8F291',
  secondary: '#00A887',
  accent: '#B9DA65',
  text: '#333',
  background: '#fff',
  gray: '#D9D9D9',
};

export const fonts = {
  regular: 'System',           // Fuente por defecto del sistema
  bold: 'System-Bold',        // Fuente negrita (puede variar según plataforma)
  // Si usás fuentes personalizadas:
  // regular: 'YourCustomFont-Regular',
  // bold: 'YourCustomFont-Bold',
};

export const headerStyles = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: colors.secondary,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 28,
    // fontFamily: fonts.bold,
  },
  headerTitleAlign: 'center'
};

export const tabBarStyles = {
  tabBarStyle: {
    backgroundColor: colors.primary,
    height: 90,
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabBarActiveTintColor: colors.secondary,
  tabBarInactiveTintColor: colors.accent,
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabBarLabelPosition: 'below-icon',
  tabBarIconStyle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export const webSidebarStyles = StyleSheet.create ({
  safeArea: { flex: 1 },
  webSidebar: {
    flex: 2,
    backgroundColor:colors.primary,
    minHeight: '100vh',
  },
  detalles: {
    alignItems: 'center'
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 3,
  },
  perfil: {
    paddingHorizontal: 10
  },
  nombre: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'justify',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  rolEcopunto: {
    color: colors.secondary,
    fontSize: 12,
    textTransform: 'capitalize',
    textAlign: 'justify',
  },
  buttons: {
    flexDirection: 'column',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    marginVertical: 2,
    marginHorizontal: 0,
    paddingVertical: 14,
  },
   buttonText: {
    textAlign: 'center',
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export const scannerStyles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    margin: 0,
    padding: 20,
    backgroundColor: colors.background,
  },
  accentContainer : {
    flex: 1,
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 15,
    backgroundColor: colors.background,
    padding: 20,
  },
});

export const beneficiosAppStyles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTipoYPts: {
    fontSize: 13,
    color: colors.secondary,
  },
  itemBoton: {
    backgroundColor: colors.primary,
    margin: 2,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  canjearBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.secondary,
    padding: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
});

export const desafiosAppStyles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.text,
    marginBottom: 2,
  },
  tipoYPuntos: {
    fontSize: 13,
    color: colors.secondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aceptarBtn: {
    backgroundColor: colors.primary,
    margin: 2,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  aceptarBtnText: {
    color: colors.secondary,
    padding: 2,
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
});


export const commonStyles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    margin: 0,
    padding: 20,
    backgroundColor: colors.background,
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
    minWidth: '100vh',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center', 
  },
  webSidebar: {
    flex: 2,
    backgroundColor:colors.primary,
    minHeight: '100vh',
  },
  webContent: {
    flex: 8,
    backgroundColor: colors.background,
    minHeight: '100vh',
  },
  webEntregaContainer: {
    borderWidth: 2, //borrar
    borderColor: colors.gray, //borrar
    padding: 20,
    marginRight: 20,
    marginLeft: 20,
    alignItems: 'center',
  },
  webEntregaSearchContainer: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    flexDirection:'row',
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
    alignSelf: 'center'
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
    alignItems: 'center',        // Centra verticalmente
    justifyContent: 'center', 
  },
  webEntregaInput: {
    flexDirection: 'row',
    alignItems: 'center',       // centra verticalmente
    justifyContent: 'center',   // centra horizontalmente
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
    alignItems: 'center',   // centra horizontalmente
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
    alignItems: 'center',       // centra verticalmente
    justifyContent: 'center',
  },
  webEntregaResumenItem: {
    fontSize: 14,
  },
  webEntregaTotales: {
    flexDirection: 'row',
    alignItems: 'center',       // centra verticalmente
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
    textTransform: 'uppercase'
  },
  webQRContainer: {
    borderColor: colors.text,
    borderRadius: 20,
    borderWidth: 4,
    margin: 10,
    padding: 20,
  },
  accentContainer : {
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 15,
    backgroundColor: colors.background,
    padding: 20,
  },
  perfilRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  perfilCell: {
    padding: 5,
  },
  box70: {
    flex: 7,
  },
  box30: {
    flex: 3,
    
  },
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
  },
  perfilNivelText: {
    color: colors.secondary,
    alignSelf: 'center',
    fontSize: 34,
    fontWeight: '700',
  },
  perfilNivelTag: {
    color: colors.secondary,
    alignSelf: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
  perfilTitulo: {
    color: colors.Text,
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
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    // borderColor: colors.accent,
    // borderWidth: 2,
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
  fechaInputDia: {
    flex: 1,
    marginRight: 5,
  },
  fechaInputMes: {
    flex: 1,
    marginRight: 5,
  },
  fechaInputAnio: {
    flex: 2,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 2,
    marginVertical: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'left',
    gap: 8,
  },
});
