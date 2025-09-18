import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScreenLogin from '../screens/inicioSesion';
import ScreenRegistro from '../screens/registroUsuario';
import ScreenPerfil from '../screens/perfilUsuario';
import ScreenScanner from '../screens/scannerQR';
import ScreenValidarEntrega from '../screens/validarEntrega';

import { commonStyles, headerStyles } from '../styles/styles';
import { BASE_URL } from '../config/api';

const Stack = createNativeStackNavigator();

export default function UsuarioStack() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const res = await fetch(`${BASE_URL}/usuarios/perfil`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setIsAuthenticated(false);
        return;
      }

      // opcionalmente podrías guardar los datos del usuario
      await res.json();
      setIsAuthenticated(true);
    } catch (e) {
      console.log('AuthStack error', e);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color="#00A887" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'PerfilUsuario' : 'Login'}
      screenOptions={{ ...headerStyles, headerBackTitleVisible: false }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <ScreenLogin {...props} onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
          <Stack.Screen
            name="Registro"
            component={ScreenRegistro}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="PerfilUsuario" options={{ headerShown: false }}>
            {(props) => <ScreenPerfil {...props} onLogout={handleLogout} />}
          </Stack.Screen>

          <Stack.Screen
            name="Scanner"
            component={ScreenScanner}
            options={{ title: 'Escanear QR' }}
          />

          <Stack.Screen
            name="ValidarEntrega"
            component={ScreenValidarEntrega}
            options={{ title: 'Escanear QR' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}