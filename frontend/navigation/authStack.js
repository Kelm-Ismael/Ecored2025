// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { headerStyles } from '../styles/styles';

// import ScreenLogin from '../screens/inicioSesion';
// import ScreenRegistro from '../screens/registro';
// import ScreenUsuario from '../screens/perfilUsuario';

// const Stack = createNativeStackNavigator();

// export default function AuthStack() {
//   return (
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen
//         name="Login"
//         component={ScreenLogin}
//         options={{ title: '', headerShown: false }} // Cabecera vacía
//       />
//       <Stack.Screen
//         name="Registro"
//         component={ScreenRegistro}
//         options={{ title: '', headerShown: false }}
//       />
//       <Stack.Screen
//         name="PerfilUsuario"
//         component={ScreenUsuario}
//         options={{ title: 'Mi Perfil', ...headerStyles }}
//       />
//     </Stack.Navigator>
//   );
// }

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScreenLogin from '../screens/inicioSesion';
import ScreenRegistro from '../screens/registro';
import ScreenUsuario from '../screens/perfilUsuario';
import { commonStyles } from '../styles/styles';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setInitialRoute('PerfilUsuario');
        } else {
          setInitialRoute('Login');
        }
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
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Login"
        component={ScreenLogin}
        options={{ title: '', headerShown: false }}
      />
      <Stack.Screen
        name="Registro"
        component={ScreenRegistro}
        options={{ title: '', headerShown: false }}
      />
      <Stack.Screen
        name="PerfilUsuario"
        component={ScreenUsuario}
        options={{ title: 'Mi Perfil' }}
      />
    </Stack.Navigator>
  );
}
