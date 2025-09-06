// import { StyleSheet } from 'react-native';

// export const colors = {
//   primary: '#D8F291',
//   secondary: '#00A887',
//   accent: '#B9DA65',
//   text: '#333',
//   background: '#fff',
//   gray: '#D9D9D9',
// };

// export const fonts = {
//   regular: 'System',
//   bold: 'System-Bold',
// };

// export const headerStyles = {
//   headerStyle: {
//     backgroundColor: colors.primary,
//   },
//   headerTintColor: colors.secondary,
//   headerTitleStyle: {
//     fontWeight: 'bold',
//     fontSize: 28,
//   },
//   headerTitleAlign: 'center',
// };

// export const tabBarStyles = {
//   tabBarStyle: {
//     backgroundColor: colors.primary,
//     height: 90,
//     paddingBottom: 5,
//     paddingTop: 5,
//   },
//   tabBarActiveTintColor: colors.secondary,
//   tabBarInactiveTintColor: colors.accent,
//   tabBarLabelStyle: {
//     fontSize: 12,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   tabBarLabelPosition: 'below-icon',
//   tabBarIconStyle: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// };

// export const commonStyles = StyleSheet.create({
//   safeArea: { flex: 1 },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: colors.background,
//   },
//   accentContainer: {
//     borderWidth: 5,
//     borderColor: colors.accent,
//     borderRadius: 15,
//     backgroundColor: colors.background,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: colors.secondary,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: colors.text,
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: colors.gray,
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: colors.primary,
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   link: {
//     marginTop: 15,
//     color: colors.secondary,
//     textAlign: 'center',
//     fontWeight: '600',
//   },
// });

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
    regular: 'System',
    bold: 'System-Bold',
  };

  export const headerStyles = {
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.secondary,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 28,
    },
    headerTitleAlign: 'center',
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
      justifyContent: 'center',
      padding: 20,
      backgroundColor: colors.background,
    },
    accentContainer: {
      borderWidth: 5,
      borderColor: colors.accent,
      borderRadius: 15,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.secondary,
      marginBottom: 20,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
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
      marginVertical: 10, // margen uniforme arriba y abajo
      shadowColor: '#000', // sombra para efecto visual
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2, // para Android
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    link: {
      marginTop: 15,
      color: colors.secondary,
      textAlign: 'center',
      fontWeight: '600',
    },
  });
