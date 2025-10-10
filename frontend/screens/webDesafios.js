import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { commonStyles } from '../styles/styles';
import WebSidebar from '../components/WebSidebar';
import { BASE_URL } from '../config/api';
import { AuthContext } from '../context/AuthContext';

export default function ScreenDesafio() {
  const navigation = useNavigation();
  const { userToken, userRole, loading: authLoading } = useContext(AuthContext);

  const [desafios, setDesafios] = useState([]);
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

  // Fetch de desafíos
  useEffect(() => {
    const fetchDesafios = async () => {
      try {
        const res = await fetch(`${BASE_URL}/desafios/todos`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!res.ok) throw new Error('No se pudieron obtener los desafíos');

        const data = await res.json();
        setDesafios(data);
      } catch (err) {
        console.error('Error al obtener desafíos:', err);
        setError('No se pudieron cargar los desafíos.');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && userToken) {
      fetchDesafios();
    }
  }, [authLoading, userToken]);

  if (authLoading || loading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.container}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={{ marginTop: 10 }}>Cargando desafíos...</Text>
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
            <Text style={commonStyles.title}>Desafíos disponibles</Text>
            <View style={commonStyles.accentContainerTablas}>
              {error ? (
                <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
              ) : desafios.length === 0 ? (
                <Text style={{ marginTop: 10 }}>No hay desafíos registrados.</Text>
              ) : (
                <View style={{ padding: 10 }}>
                  <View style={commonStyles.webCabeceraTabla}>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>ID</Text>
                    <Text style={{ flex: 4, fontWeight: 'bold' }}>Nombre</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>Tipo</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>Puntos a ganar</Text>
                  </View>

                  {/* Filas */}
                  {desafios.map((desafio) => (
                    <View
                      key={desafio.id}
                      style={commonStyles.webRowsTabla}
                    >
                      <Text style={{ flex: 1 }}>{desafio.id}</Text>
                      <Text style={{ flex: 4 }}>{desafio.nombre}</Text>
                      <Text style={{ flex: 1 }}>{desafio.tipo}</Text>
                      <Text style={{ flex: 1 }}>{desafio.puntos_a_ganar}</Text>
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
