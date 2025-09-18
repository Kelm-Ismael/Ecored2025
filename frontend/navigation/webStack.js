import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native-web';
import { ActivityIndicator } from 'react-native';

import WebMain from '../screens/webMain';
import WebPerfil from '../screens/webPerfil';
import WebEntrega from '../screens/webEntrega';
import WebBeneficios from '../screens/webBeneficios';
import WebDesafios from '../screens/webDesafios';
import WebInformes from '../screens/webInformes';
import WebHistorial from '../screens/webHistorial';
import WebRegistro from '../screens/webRegistro'
import WebCodigoQR from '../screens/webCodigoQR';

import { AuthContext } from '../context/AuthContext';
import { headerStyles } from '../styles/styles';

const Stack = createNativeStackNavigator();

const allScreens = {
  WebMain: { component: WebMain, title: 'Inicio' },
  WebPerfil: { component: WebPerfil, title: 'Perfil' },
  NuevaEntrega: { component: WebEntrega, title: 'Nueva entrega' },
  Historial: { component: WebHistorial, title: 'Historial' },
  Beneficios: { component: WebBeneficios, title: 'Beneficios' },
  Desafios: { component: WebDesafios, title: 'Desafíos' },
  Informes: { component: WebInformes, title: 'Informes' },
  Registro: { component: WebRegistro, title: 'Registro' },
  CodigoQR: { component: WebCodigoQR, title: 'CodigoQR' },
};

const routesByRole = {
    superadmin: ['WebMain', 'WebPerfil', 'NuevaEntrega', 'Historial', 'Beneficios', 'Desafios', 'Informes', 'CodigoQR'],
    administrador: ['WebMain', 'WebPerfil', 'NuevaEntrega', 'Historial', 'Beneficios', 'Desafios', 'Informes', 'CodigoQR'],
    alumno: ['WebMain', 'WebPerfil'],
    ciudadano: ['WebMain', 'WebPerfil'],
    empleado: ['WebMain', 'WebPerfil', 'NuevaEntrega', 'Historial', 'CodigoQR'],
    escuela: ['WebMain', 'WebPerfil', 'NuevaEntrega', 'CodigoQR'],
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
