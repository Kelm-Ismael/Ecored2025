import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ScreenLogin from '../screens/inicioSesion';
import ScreenRegistro from '../screens/registro';
import ScreenUsuario from '../screens/perfilUsuario';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={ScreenLogin} 
        options={{ title: 'Iniciar Sesión' }} 
      />
      <Stack.Screen 
        name="Registro" 
        component={ScreenRegistro} 
        options={{ title: 'Registrarse' }} 
      />
      <Stack.Screen 
        name="PerfilUsuario" 
        component={ScreenUsuario} 
        options={{ title: 'Mi Perfil' }} 
      />
    </Stack.Navigator>
  );
}
