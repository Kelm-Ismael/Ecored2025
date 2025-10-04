import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Platform, Text, View } from 'react-native';

// import ScreenInformacion from './screens/informacion' CAMBIADO
import InformacionStack from "./navigation/informacionStack"; // 👈 importado el nuevo stack

import ScreenBeneficio from './screens/beneficios'
import ScreenDesafio from './screens/desafios'
import WebAuthWrapper from './screens/webAuthWrapper';
import AuthStack from './navigation/usuarioStack';
import { AuthProvider } from './context/AuthContext';
import MapaEcoPuntos from './screens/mapaEcoPuntos';//NUEVO
import InfoCambioClimatico from './screens/infoCambioClimatico';//NUEVO

import { headerStyles, tabBarStyles } from './styles/styles';
import UsuarioStack from './navigation/usuarioStack';

const Tab = createBottomTabNavigator();

const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    switch (route.name) {
      case 'Informacion':
        iconName = focused ? 'information-circle' : 'information-circle-outline';
        break;
      case 'Usuario':
        iconName = focused ? 'person' : 'person-outline';
        break;
      case 'Beneficios':
        iconName = focused ? 'gift' : 'gift-outline';
        break;
      case 'Desafios':
        iconName = focused ? 'flash' : 'flash-outline';
        break;
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  ...tabBarStyles,
});

export default function App() {
  // useEffect(() => {
  //   const clearToken = async () => {
  //     await AsyncStorage.removeItem('token'); // o SecureStore.deleteItemAsync('token')
  //     console.log('🧽 Token borrado');
  //   };

  //   clearToken();
  // }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {Platform.OS === 'web' ? (
          // 👉 Mostrar solo login en web
          <AuthProvider>
            <WebAuthWrapper />
          </AuthProvider>
        ) : (
          // 👉 App móvil con navegación por tabs
          <Tab.Navigator screenOptions={tabScreenOptions}>
            <Tab.Screen
              name="Informacion"
              // component={ScreenInformacion} CAMBIADO
              component={InformacionStack}
              options={{
                title: 'Información',
                ...headerStyles,
              }}
            />
            <Tab.Screen
              name="Usuario"
              component={UsuarioStack}
              options={{
                title: 'Mi Perfil',
                ...headerStyles,
              }}
            />
            <Tab.Screen
              name="Beneficios"
              component={ScreenBeneficio}
              options={{
                title: 'Beneficios',
                ...headerStyles,
              }}
            />
            <Tab.Screen
              name="Desafios"
              component={ScreenDesafio}
              options={{
                title: 'Desafíos',
                ...headerStyles,
              }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
