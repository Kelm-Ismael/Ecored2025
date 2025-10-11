import { act } from 'react';
import { StyleSheet } from 'react-native';

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
  accentContainer : {
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 15,
    backgroundColor: colors.background,
    padding: 20,
    height: 580,
    marginTop: 8,
  },
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
  accentContainer : {
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 15,
    backgroundColor: colors.background,
    padding: 20,
    height: 580,
    marginTop: 8,
  },
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

export const informacionAppStyles = StyleSheet.create({
  scroll: {
    padding: 20,
  },
  accentContainer : {
    marginTop: 15,
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 15,
    backgroundColor: colors.background,
    padding: 10,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 20,
  },
  subtitle: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 10,
    marginTop: 10 ,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: 'bold',
  },
  list: {
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginLeft: 30,
    marginRight: 15,
    color: colors.secondary,
  },
  listText: {
    fontSize: 18,
    lineHeight: 24,
    flex: 1,
    flexWrap: 'wrap',
  },
  seccion: {
    marginBottom: 10,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  botonSeccion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  iconSeccion: {
    color: colors.secondary,
  },
  contenidoSeccion: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});

export const mapaEcopuntosAppStyles = StyleSheet.create({
  accentContainer : {
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 15,
    backgroundColor: colors.background,
    padding: 20,
    height: 580,
    marginTop: 8,
  },
  webview: {
    flex: 1,
  },
});

export const perfilAppStyles = StyleSheet.create({
  containerNoPadding: {
    flex: 1,
    padding: 0,
  },
  perfilContainer: {
    backgroundColor: colors.background,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 10,
    // borderColor: colors.secondary,
    // borderWidth: 2,
  },
  perfilRow: {
    flexDirection: 'row',
  },
  box70: {
    flex: 7,
    alignSelf: 'center',
  },
  box30: {
    flex: 3,
    alignSelf: 'center',
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
    fontSize: 18,
    fontWeight: 'bold',
    padding: 2,
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  perfilNivel: {
    borderWidth: 7,
    borderColor: colors.accent,
    height: 90,
    width: 90,
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
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  containerPuntos: {
    margin: 0,
    paddingTop: 15,
    paddingBottom: 0,
    backgroundColor: colors.background,
  },
  perfilTitulo: {
    color: colors.text,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 12,
  },
  perfilPuntos: {
    alignSelf: 'center',
    borderWidth: 8,
    borderColor: colors.accent,
    borderRadius: 20,
    backgroundColor: colors.background,
    paddingVertical: 18,
    paddingHorizontal: 30,
    width: 'auto',
    marginBottom: 20,
    
  },
  perfilPuntosTexto: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 22,
    fontWeight: 'bold',
  },
  containerEntregas: {
    flexGrow: 1,
    margin: 0,
    paddingTop: 20,
    paddingBottom: 0,
    backgroundColor: colors.background,
    // borderColor: colors.accent,
    // borderWidth: 2,
  },
  accentContainerEntregas: {
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 12,
    width: 350,
    maxHeight: 250, 
    padding: 10,
    marginBottom: 15, 
  },
  cabeceraEntregas: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
    paddingBottom: 2,
    marginBottom: 3,
  },
  cabeceraTexto: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    // borderWidth: 1,
    // borderColor: colors.accent,
    // overflow: 'hidden',
  },
  rowEntregas: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 2,
  },
  rowEntregasTexto: {
    flex: 1,
    fontSize: 13,
    // borderWidth: 1,
    // borderColor: colors.accent,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  containerButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 15,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    maxHeight: 80,
    backgroundColor: colors.primary,
    borderRadius: 45,
    marginVertical: 3,
    marginHorizontal: 20,
    padding: 9,
  },
});

export const webInformesStyles = StyleSheet.create({
  accentContainer: {
    borderWidth: 3, //borrar
    borderColor: colors.primary, //borrar
    borderRadius: 12,
    padding: 10,
    paddingHorizontal: 30,
    marginHorizontal: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 15, 
  },
  inputText: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  inputFecha: {
    borderWidth: 2, //borrar
    borderColor: colors.gray, //borrar
  },
  scrollContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 380,
  },
  error: {
    color: 'red',
    marginTop: 5,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    // borderColor: colors.accent,
    // borderWidth: 2,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  rowsTabla: {
    flexDirection: 'row', 
    borderBottomWidth: 0.5, 
    paddingVertical: 5,
    borderBottomColor: colors.gray,
    // borderWidth: 2,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
  },
});

export const webNuevoUsuario = StyleSheet.create({
  accentContainer : {
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 15,
    backgroundColor: colors.background,
    padding: 20,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 10,
    // marginLeft: 10,
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    marginVertical: 10,
    paddingBottom: 5,
  },
  picker: {
    borderColor: colors.gray,
    padding: 5,
    maxWidth: 250,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 3,
    fontSize: 16,
    width: 250,
  },
  containerForm: {
    // flexGrow: 1,
    alignSelf: 'center',
    margin: 5,
    paddingVertical: 10,
    paddingLeft: 40,
    paddingRight: 20,
    backgroundColor: colors.background,
    // borderColor: colors.gray,
    // borderWidth: 2,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    // borderWidth: 1,
    // borderColor: colors.gray,
  },
  setLabelInput: {
    paddingVertical: 5,
    flexDirection: 'column',
  },
  formLabel: {
    fontSize: 16,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  check: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const webMainStyles = StyleSheet.create({
  subtitle: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 10,
    marginBottom: 10,
  },
  detalles: {
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: colors.gray,
    // borderWidth: 1,
  },
  detallesNotas: {
    flex: 8,
  },
  detallesBtn: {
    flex: 3,
  },
  textNotas: {
    // marginLeft: 10,
    paddingBottom: 5,
    fontSize: 14,
    color: colors.text,
    fontWeight: 'bold',
    alignContent: 'center',
  },
  inputNotas: {
    borderColor: colors.gray,
    borderWidth: 1,
    margin: 3
  },
  button: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginVertical: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  buttonRechazar: {
    alignSelf: 'center',
    backgroundColor: '#FF5C5C',
    borderRadius: 12,
    marginVertical: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  buttonTextRechazar: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 13,
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
  scroll: {
    padding: 0,
  },
  textNormal: {
    // marginLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
    color: colors.text,
    alignContent: 'center',
  },
  webCabeceraTabla: {
    flexDirection: 'row', 
    borderBottomWidth: 0.5, 
    paddingBottom: 5,
    alignItems: 'center',
    alignContent: 'center'
  },
  webRowsTabla: {
    flexDirection: 'row', 
    borderBottomWidth: 0.5, 
    paddingVertical: 5,
    borderBottomColor: colors.gray,
    alignItems: 'center',
    // borderWidth: 2,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
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
  accentContainerTablas: {
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 15,
    backgroundColor: colors.background,
    padding: 15,
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
