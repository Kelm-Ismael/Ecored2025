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
// styles/styles.js


import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#D8F291',
  secondary: '#00A887',
  accent: '#B9DA65',
  text: '#333333',
  background: '#FFFFFF',
  gray: '#D9D9D9',
  white: '#FFFFFF',
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
    fontSize: 24,
    color: colors.secondary,
  },
  headerTitleAlign: 'center',
};

export const tabBarStyles = {
  tabBarStyle: {
    backgroundColor: colors.primary,
    height: 85,
    paddingBottom: 6,
    paddingTop: 6,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export const commonStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  accentContainer: {
    borderWidth: 3,
    borderColor: colors.accent,
    borderRadius: 15,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: colors.white,
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    color: colors.secondary,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
});
