import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { commonStyles } from '../styles/styles';
import WebSidebar from '../components/WebSidebar';
import { BASE_URL } from '../config/api';
import { AuthContext } from '../context/AuthContext';
import { formatearFecha } from '../utils/formatearFecha';

export default function ScreenBeneficio() {
  const navigation = useNavigation();
  const { userToken, userRole, loading: authLoading } = useContext(AuthContext);

  const [beneficios, setBeneficios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirección si el rol no es válido
  useEffect(() => {
    if (!authLoading) {
      const rolesPermitidos = ['superadmin', 'administrador'];
      if (!rolesPermitidos.includes(userRole?.toLowerCase())) {
        navigation.navigate('WebMain');
      }
    }
  }, [authLoading, userRole]);

  // Fetch de beneficios
  useEffect(() => {
    const fetchBeneficios = async () => {
      try {
        const res = await fetch(`${BASE_URL}/beneficios/todos`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!res.ok) throw new Error('No se pudieron obtener los beneficios');

        const data = await res.json();
        setBeneficios(data);
      } catch (err) {
        console.error('Error al obtener beneficios:', err);
        setError('No se pudieron cargar los beneficios.');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && userToken) {
      fetchBeneficios();
    }
  }, [authLoading, userToken]);

  if (authLoading || loading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.container}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={{ marginTop: 10 }}>Cargando beneficios...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.webMainContainer}>
        <View style={commonStyles.webSidebar}>
          <WebSidebar />
        </View>
        <View style={commonStyles.webContent}>
          <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Beneficios disponibles</Text>
            <View style={commonStyles.accentContainerTablas}>
              {error ? (
                <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
              ) : beneficios.length === 0 ? (
                <Text style={{ marginTop: 10 }}>No hay beneficios registrados.</Text>
              ) : (
                <View style={{ padding: 10 }}>
                  <View style={commonStyles.webCabeceraTabla}>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>ID</Text>
                    <Text style={{ flex: 2, fontWeight: 'bold' }}>Tipo</Text>
                    <Text style={{ flex: 4, fontWeight: 'bold' }}>Descripción</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>Puntos requeridos</Text>
                    <Text style={{ flex: 2, fontWeight: 'bold' }}>Fecha creación</Text>
                    <Text style={{ flex: 2, fontWeight: 'bold' }}>Fecha modificación</Text>
                    <Text style={{ flex: 2, fontWeight: 'bold' }}>Usuario creador</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>Estado</Text>
                  </View>

                  {/* Filas */}
                  {beneficios.map((beneficio) => (
                    <View key={beneficio.id} style={commonStyles.webRowsTabla}>
                      <Text style={{ flex: 1 }}>{beneficio.id}</Text>
                      <Text style={{ flex: 2 }}>{beneficio.tipo}</Text>
                      <Text style={{ flex: 4 }}>{beneficio.descripcion}</Text>
                      <Text style={{ flex: 1 }}>{beneficio.puntos_requeridos}</Text>
                      <Text style={{ flex: 2 }}>{formatearFecha(beneficio.fecha_creacion)}</Text>
                      <Text style={{ flex: 2 }}>{formatearFecha(beneficio.fecha_modificacion)}</Text>
                      <Text style={{ flex: 2 }}>{beneficio.usuario_creador}</Text>
                      <Text style={{ flex: 1 }}>{beneficio.estado}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
