import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { commonStyles, webSidebarStyles } from '../styles/styles';
import { AuthContext } from '../context/AuthContext';
import WebLogoutButton from './WebLogoutButton';
import { BASE_URL } from '../config/api';
import { DEFAULT_ID_LOCACION } from '../config/constants';

const visibleRoutesByRole = {
  superadmin: ['WebMain', 'WebPerfil', 'NuevaEntrega', 'Historial', 'Beneficios', 'Desafios', 'Informes'],
  administrador: ['WebMain', 'WebPerfil', 'NuevaEntrega', 'Historial', 'Beneficios', 'Desafios', 'Informes'],
  alumno: ['WebMain', 'WebPerfil'],
  ciudadano: ['WebMain', 'WebPerfil'],
  empleado: ['WebMain', 'WebPerfil', 'NuevaEntrega', 'Historial'],
  escuela: ['WebMain', 'WebPerfil', 'NuevaEntrega', 'Historial', 'Informes'],
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
  const { userRole, user, authLoading, userToken } = useContext(AuthContext);
  const [nombreLocacion, setNombreLocacion] = useState('');
  const [error, setError] = useState(null);
  // console.log('Usuario en WebMain:', user);
  const nombre = user?.referencia?.nombre || '';
  const apellido = user?.referencia?.apellido || '';
  
  useEffect(() => {
    const fetchNombreLocacion = async () => {
      try {
        const res = await fetch(`${BASE_URL}/locaciones/todas`, {
            headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
  
        if (!res.ok) throw new Error('Error al obtener locaciones');
  
        const data = await res.json();
        const locacionEncontrada = data.find(loc => loc.id === DEFAULT_ID_LOCACION);
  
        if (locacionEncontrada) {
          setNombreLocacion(locacionEncontrada.nombre);
        } else {
          console.warn('Locación no encontrada');
          setNombreLocacion('No encontrada');
        }
      } catch (err) {
        console.error('Error al obtener locación:', err);
        setError('No se pudo cargar la locación.');
      }
    };
  
    if (!authLoading && userToken) {
      fetchNombreLocacion();
    }
  }, [authLoading, userToken]);

  const visibleRoutes = visibleRoutesByRole[userRole?.toLowerCase()] || [];

  return ( 
    <View style={commonStyles.webSidebar}>
      <View style={webSidebarStyles.detalles}>
        <Text style={webSidebarStyles.title}>EcoRed</Text>
        <View style={webSidebarStyles.perfil}>
          <Text style={webSidebarStyles.nombre}>{nombre} {apellido}</Text>
          <Text style={webSidebarStyles.rolEcopunto}>
            {userRole} - Ecopunto {error ? error : (nombreLocacion || 'Cargando...')}
          </Text>
        </View>
      </View>
      <View style={webSidebarStyles.buttons}>

      {visibleRoutes.map((routeName) => (
        <TouchableOpacity
          key={routeName}
          onPress={() => navigation.navigate(routeName)}
          style={[
            webSidebarStyles.button,
            route.name === routeName ? webSidebarStyles.button : null,
          ]}
        >
          <Text
            style={[
              webSidebarStyles.buttonText,
              route.name === routeName ? webSidebarStyles.buttonText : null,
            ]}
          >
            {routeTitles[routeName]}
          </Text>
        </TouchableOpacity>
      ))}
      </View>
    <WebLogoutButton
      style={webSidebarStyles.button}
      textStyle={webSidebarStyles.buttonText}
      label="Cerrar sesión"
    />

    </View>
  );
}
