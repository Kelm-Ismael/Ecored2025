import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { commonStyles } from '../styles/styles';
import { AuthContext } from '../context/AuthContext';
import WebLogoutButton from './WebLogoutButton';

const visibleRoutesByRole = {
  admin: ['WebMain', 'WebPerfil', 'NuevaEntrega', 'Historial', 'Beneficios', 'Desafios', 'Informes'],
  empleado: ['WebMain', 'WebPerfil', 'NuevaEntrega', 'Historial'],
  superadmin: ['WebMain', 'WebPerfil', 'NuevaEntrega', 'Historial', 'Beneficios', 'Desafios', 'Informes'],
  ciudadano: ['WebLogin']
};

const routeTitles = {
  WebMain: 'Inicio',
  WebPerfil: 'Perfil',
  NuevaEntrega: 'Nueva Entrega',
  Historial: 'Historial',
  Beneficios: 'Beneficios',
  Desafios: 'Desafíos',
  Informes: 'Informes',
};

export default function WebSidebar() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userRole = 'empleado' } = useContext(AuthContext);


  const visibleRoutes = visibleRoutesByRole[userRole?.toLowerCase()] || [];

  return (
    <View style={commonStyles.sidebarContainer}>
      {visibleRoutes.map((routeName) => (
        <TouchableOpacity
          key={routeName}
          onPress={() => navigation.navigate(routeName)}
          style={[
            commonStyles.button,
            route.name === routeName ? commonStyles.button : null,
          ]}
        >
          <Text
            style={[
              commonStyles.buttonText,
              route.name === routeName ? commonStyles.buttonText : null,
            ]}
          >
            {routeTitles[routeName]}
          </Text>
        </TouchableOpacity>
      ))}
    <WebLogoutButton
      style={commonStyles.button}
      textStyle={commonStyles.buttonText}
      label="Cerrar sesión"
    />

    </View>
  );
}
