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

export const commonStyles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  accentContainer : {
    borderWidth: 5,
    borderColor: colors.accent,
    borderRadius: 15,
    backgroundColor: colors.background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 8,
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
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


// import { StyleSheet } from 'react-native';
// import { colors } from './colors'; // si tienes un archivo separado, sino ya está definido arriba

// export const commonStyles = StyleSheet.create({
//   safeArea: { 
//     flex: 1, 
//     backgroundColor: colors.background, 
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//     backgroundColor: colors.background,
//   },
//   accentContainer: {
//     borderWidth: 5,
//     borderColor: colors.accent,
//     borderRadius: 15,
//     backgroundColor: colors.background,
//   },
//   title: {
//     fontSize: 28, // un poco más grande para pantalla de login
//     fontWeight: 'bold',
//     color: colors.secondary,
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: colors.text,
//     marginBottom: 8,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: colors.gray,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     fontSize: 16,
//     marginBottom: 16,
//     backgroundColor: '#fff',
//   },
//   button: {
//     height: 50,
//     backgroundColor: colors.primary,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });
