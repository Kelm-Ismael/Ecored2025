import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import { headerStyles, tabBarStyles } from './styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import InformacionStack from "./navigation/informacionStack";
import UsuarioStack from './navigation/usuarioStack';

import ScreenInformacion from './screens/informacion'
import ScreenBeneficio from './screens/beneficios'
import ScreenDesafio from './screens/desafios'
import MapaEcoPuntos from './screens/mapaEcopuntos';
import InfoCambioClimatico from './screens/infoCambioClimatico';

import WebAuthWrapper from './screens/webAuthWrapper';
import AuthStack from './navigation/usuarioStack';
import { AuthProvider } from './context/AuthContext';
// import InformacionStack from './navigation/informacionStack';

const Tab = createBottomTabNavigator();

const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    switch (route.name) {
      case 'Mapa EcoPuntos':
        iconName = focused ? 'map' : 'map-outline';
        break;
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

  const [informacionStackLoaded, setInformacionStackLoaded] = React.useState(false);
  const [informacionStack, setInformacionStack] = React.useState(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      import('./navigation/informacionStack')
        .then((mod) => {
          setInformacionStack(() => mod.default);
          setInformacionStackLoaded(true);
        })
        .catch((error) => {
          console.error('❌ Error cargando InformacionStack:', error);
        });
    }
  }, []);

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
              name="Mapa EcoPuntos"
              component={MapaEcoPuntos}
              options={{
                title: 'Ecopuntos',
                ...headerStyles,
              }}
            />
            {informacionStack && (
              <Tab.Screen
              name="Informacion"
              component={InformacionStack}
              options={{
                title: 'Información',
                ...headerStyles,
              }}
              />
            )}
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
