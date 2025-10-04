import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native-web';
import { ActivityIndicator } from 'react-native';

import ScreenBeneficio from '../screens/beneficios';
import ScreenDesafio from '../screens/desafios';
import ScreenInformacion from '../screens/informacion';
import ScreenLogin from '../screens/inicioSesion';
import ScreenPerfil from '../screens/perfilUsuario';
import ScreenRegistro from '../screens/registroUsuario';
import ScreenScanner from '../screens/scannerQR';
import ScreenValidarEntrega from '../screens/validarEntrega';
import MapaEcoPuntos from '../screens/mapaEcoPuntos';//NUEVO
import InfoCambioClimatico from '../screens/infoCambioClimatico';//NUEVO

import { AuthContext } from '../context/AuthContext';
import { headerStyles } from '../styles/styles';

const Stack = createNativeStackNavigator();

const allScreens = {
  MapaEcoPuntos: { component: MapaEcoPuntos, title: 'MapaEcoPuntos'},//NUEVO
  InfoCambioClimatico: { component: InfoCambioClimatico, title: 'InfoCambioClimático' },//NUEVO
  Login: { component: ScreenLogin, title: 'Login' },
  Perfil: { component: ScreenPerfil, title: 'Perfil' },
  Beneficios: { component: ScreenBeneficio, title: 'Beneficios' },
  Desafios: { component: ScreenDesafio, title: 'Desafios' },
  Informacion: { component: ScreenInformacion, title: 'Informacion' },
  Registro: { component: ScreenRegistro, title: 'Registro' },
  Scanner: { component: ScreenScanner, title: 'Scanner' },
  ValidarEntrega: {component: ScreenValidarEntrega, title: 'ValidarEntrega'}
};

const routesByRole = {
    superadmin: ['Login', 'Perfil', 'Beneficios', 'Desafios', 'Informacion', 'Registro', 'Scanner', 'ValidarEntrega', 'MapaEcoPuntos', 'InfoCambioClimatico'],
    administrador: ['Login', 'Perfil', 'Beneficios', 'Desafios', 'Informacion', 'Registro', 'Scanner', 'ValidarEntrega', 'MapaEcoPuntos', 'InfoCambioClimatico'],
    alumno: ['Login', 'Perfil', 'Beneficios', 'Desafios', 'Informacion', 'Scanner', 'ValidarEntrega', 'MapaEcoPuntos', 'InfoCambioClimatico'],
    ciudadano: ['Login', 'Perfil', 'Beneficios', 'Desafios', 'Informacion', 'Scanner', 'ValidarEntrega', 'MapaEcoPuntos', 'InfoCambioClimatico'],
    empleado: ['Login', 'Perfil', 'Beneficios', 'Desafios', 'Informacion', 'MapaEcoPuntos', 'InfoCambioClimatico'],
    escuela: ['Login', 'Perfil', 'Beneficios', 'Desafios', 'Informacion', 'Scanner', 'ValidarEntrega', 'MapaEcoPuntos', 'InfoCambioClimatico'],
};

export default function WebStack() {
    const { loading, userRole } = useContext(AuthContext);

    if (loading || !userRole) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

    const allowedRoutes = routesByRole[userRole?.toLowerCase()] || [];
    if (allowedRoutes.length === 0) {
        return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No tenés acceso a esta sección</Text>
      </View>
    );
  }
  return (
    <Stack.Navigator
      initialRouteName={allowedRoutes[0]}
      screenOptions={{ ...headerStyles }}
    >
      {allowedRoutes.map((routeName) => {
        const screen = allScreens[routeName];
        if (!screen) return null;

        return (
          <Stack.Screen
            key={routeName}
            name={routeName}
            component={screen.component}
            options={{ title: screen.title }}
          />
        );
      })}
    </Stack.Navigator>
  );
}
