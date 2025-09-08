// 

// navigation/authStack.js
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScreenLogin from '../screens/inicioSesion';
import ScreenRegistro from '../screens/registro';
import ScreenUsuario from '../screens/perfilUsuario';
import EditarPassword from '../screens/EditarPassword';
import EditarAvatar from '../screens/EditarAvatar';

import { commonStyles, headerStyles } from '../styles/styles';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setInitialRoute(token ? 'PerfilUsuario' : 'Login');
      } catch (err) {
        console.error('Error leyendo token:', err);
        setInitialRoute('Login');
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color="#00A887" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ ...headerStyles, headerBackTitleVisible: false }}
    >
      <Stack.Screen name="Login" component={ScreenLogin} options={{ headerShown: false, title: '' }} />
      <Stack.Screen name="Registro" component={ScreenRegistro} options={{ headerShown: false, title: '' }} />
      <Stack.Screen name="PerfilUsuario" component={ScreenUsuario} options={{ title: 'Mi Perfil' }} />
      <Stack.Screen name="EditarPassword" component={EditarPassword} options={{ title: 'Cambiar Contraseña' }} />
      <Stack.Screen name="EditarAvatar" component={EditarAvatar} options={{ title: 'Actualizar Foto' }} />
    </Stack.Navigator>
  );
}
