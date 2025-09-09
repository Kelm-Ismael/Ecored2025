// // 

// // navigation/authStack.js
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, View } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import ScreenLogin from '../screens/inicioSesion';
// import ScreenRegistro from '../screens/registro';
// import ScreenUsuario from '../screens/perfilUsuario';
// import EditarPassword from '../screens/EditarPassword';
// import EditarAvatar from '../screens/EditarAvatar';

// import { commonStyles, headerStyles } from '../styles/styles';

// const Stack = createNativeStackNavigator();

// export default function AuthStack() {
//   const [initialRoute, setInitialRoute] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         setInitialRoute(token ? 'PerfilUsuario' : 'Login');
//       } catch (err) {
//         console.error('Error leyendo token:', err);
//         setInitialRoute('Login');
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkToken();
//   }, []);

//   if (loading) {
//     return (
//       <View style={commonStyles.container}>
//         <ActivityIndicator size="large" color="#00A887" />
//       </View>
//     );
//   }

//   return (
//     <Stack.Navigator
//       initialRouteName={initialRoute}
//       screenOptions={{ ...headerStyles, headerBackTitleVisible: false }}
//     >
//       <Stack.Screen name="Login" component={ScreenLogin} options={{ headerShown: false, title: '' }} />
//       <Stack.Screen name="Registro" component={ScreenRegistro} options={{ headerShown: false, title: '' }} />
//       <Stack.Screen name="PerfilUsuario" component={ScreenUsuario} options={{ title: 'Mi Perfil' }} />
//       <Stack.Screen name="EditarPassword" component={EditarPassword} options={{ title: 'Cambiar Contraseña' }} />
//       <Stack.Screen name="EditarAvatar" component={EditarAvatar} options={{ title: 'Actualizar Foto' }} />
//     </Stack.Navigator>
//   );
// }

// navigation/AuthStack.js
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/api';

import ScreenLogin from '../screens/inicioSesion';
import ScreenRegistro from '../screens/registro';
import ScreenUsuario from '../screens/perfilUsuario';
import EditarPassword from '../screens/EditarPassword';
import EditarAvatar from '../screens/EditarAvatar';

import PanelCiudadano from '../screens/panelCiudadano';
import PanelComercio from '../screens/panelComercio';
import PanelEscuela from '../screens/panelEscuela';
import PanelRecuperador from '../screens/panelRecuperador';
import PanelAdmin from '../screens/panelAdmin';

import AdminUsuarios from '../screens/adminUsuarios';
import AdminUsuarioEditar from '../screens/adminUsuarioEditar';
import AdminRoles from '../screens/adminRoles';

import { commonStyles, headerStyles } from '../styles/styles';

const Stack = createNativeStackNavigator();

function routeForTipo(tipo_usuario_string = '', id_tipo_usuario = null) {
  const t = String(tipo_usuario_string).toLowerCase();
  const id = Number(id_tipo_usuario) || null;

  if (id === 5 || t.includes('admin')) return 'PanelAdmin';
  if (id === 2 || t.includes('comercio')) return 'PanelComercio';
  if (id === 3 || t.includes('escuela')) return 'PanelEscuela';
  if (id === 4 || t.includes('recuperador')) return 'PanelRecuperador';
  return 'PanelCiudadano';
}

export default function AuthStack() {
  const [initialRoute, setInitialRoute] = useState('Login');
  const [loading,   setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`${BASE_URL}/api/usuarios/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;

        const me = await res.json().catch(() => ({}));
        setInitialRoute(routeForTipo(me?.tipo_usuario, me?.id_tipo_usuario));
      } catch (e) {
        console.log('AuthStack /me error', e);
      } finally {
        setLoading(false);
      }
    })();
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

      {/* Paneles */}
      <Stack.Screen name="PanelCiudadano" component={PanelCiudadano} options={{ title: 'Inicio' }} />
      <Stack.Screen name="PanelComercio" component={PanelComercio} options={{ title: 'Comercio' }} />
      <Stack.Screen name="PanelEscuela" component={PanelEscuela} options={{ title: 'Escuela' }} />
      <Stack.Screen name="PanelRecuperador" component={PanelRecuperador} options={{ title: 'Recuperador' }} />
      <Stack.Screen name="PanelAdmin" component={PanelAdmin} options={{ title: 'Administrador' }} />

      <Stack.Screen name="AdminUsuarios" component={AdminUsuarios} options={{ title: 'Usuarios' }} />
      <Stack.Screen name="AdminUsuarioEditar" component={AdminUsuarioEditar} options={{ title: 'Editar Usuario' }} />
      <Stack.Screen name="AdminRoles" component={AdminRoles} options={{ title: 'Roles & Permisos' }} />


      {/* Perfil y edición */}
      <Stack.Screen name="PerfilUsuario" component={ScreenUsuario} options={{ title: 'Mi Perfil' }} />
      <Stack.Screen name="EditarPassword" component={EditarPassword} options={{ title: 'Cambiar Contraseña' }} />
      <Stack.Screen name="EditarAvatar" component={EditarAvatar} options={{ title: 'Actualizar Foto' }} />
    </Stack.Navigator>
  );
}




