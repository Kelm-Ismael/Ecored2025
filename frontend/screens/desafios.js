// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { View, Text } from 'react-native';

// import { commonStyles } from '../styles/styles';

// export default function ScreenDesafio() {
//     return (
//         <SafeAreaView style={commonStyles.safeArea}>
//             <View style={commonStyles.container}>
//                 <Text style={commonStyles.title}>
//                     Informacion
//                 </Text>
//             </View>
//         </SafeAreaView>
//     );
// }


// frontend/screens/desafios.js
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api';

export default function Desafios() {
  const [misDesafios, setMisDesafios] = useState([]);
  const [disponibles, setDisponibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actuando, setActuando] = useState(false);

  async function getToken() {
    const t = await AsyncStorage.getItem('token');
    if (!t) throw new Error('NO_TOKEN');
    return t;
  }

  async function fetchMisDesafios() {
    const token = await getToken();
    const r = await fetch(`${BASE_URL}/api/usuario/desafios`, { headers: { Authorization: `Bearer ${token}` }});
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || 'Error mis desafíos');
    setMisDesafios(j);
  }

  async function fetchDisponibles() {
    const r = await fetch(`${BASE_URL}/api/desafios`);
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || 'Error desafíos');
    setDisponibles(j);
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await Promise.all([fetchMisDesafios(), fetchDisponibles()]);
      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'No se pudieron cargar los desafíos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function inscribir(id) {
    try {
      setActuando(true);
      const token = await getToken();
      const r = await fetch(`${BASE_URL}/api/desafios/${id}/inscribir`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const j = await r.json();
      if (!r.ok) {
        Alert.alert('Inscripción', j.error || 'No se pudo inscribir');
        return;
      }
      Alert.alert('Listo', 'Te inscribiste al desafío');
      await fetchMisDesafios();
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    } finally {
      setActuando(false);
    }
  }

  async function confirmar(idUsuarioDesafio) {
    try {
      setActuando(true);
      const token = await getToken();
      const r = await fetch(`${BASE_URL}/api/usuario/desafios/${idUsuarioDesafio}/confirmar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const j = await r.json();
      if (!r.ok) {
        Alert.alert('Confirmación', j.error || 'No se pudo confirmar');
        return;
      }
      Alert.alert('¡Puntos sumados!', `Ganaste ${j.puntos_ganados} pts`);
      await fetchMisDesafios();
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    } finally {
      setActuando(false);
    }
  }

  const renderMiDesafio = ({ item }) => (
    <View style={[commonStyles.accentContainer, { marginBottom: 12 }]}>
      <Text style={commonStyles.title}>{item.nombre}</Text>
      <Text style={commonStyles.subtitle}>Puntos a ganar: {item.puntos_a_ganar}</Text>
      <Text style={commonStyles.subtitle}>Estado: {item.completado ? 'Completado' : 'En progreso'}</Text>
      {!item.completado && (
        <Pressable
          style={[commonStyles.button, { backgroundColor: colors.secondary }]}
          disabled={actuando}
          onPress={() => confirmar(item.id_usuario_desafio)}
        >
          <Text style={commonStyles.buttonText}>Confirmar entrega</Text>
        </Pressable>
      )}
    </View>
  );

  const renderDisponible = ({ item }) => (
    <View style={[commonStyles.accentContainer, { marginBottom: 12 }]}>
      <Text style={commonStyles.title}>{item.nombre}</Text>
      <Text style={commonStyles.subtitle}>Puntos a ganar: {item.puntos_a_ganar}</Text>
      <Pressable
        style={[commonStyles.button, { backgroundColor: colors.secondary }]}
        disabled={actuando}
        onPress={() => inscribir(item.id)}
      >
        <Text style={commonStyles.buttonText}>Inscribirme</Text>
      </Pressable>
    </View>
  );

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Mis Desafíos</Text>
      <FlatList
        data={misDesafios}
        keyExtractor={(i) => String(i.id_usuario_desafio)}
        renderItem={renderMiDesafio}
        ListEmptyComponent={<Text style={commonStyles.subtitle}>Aún no tienes desafíos.</Text>}
        contentContainerStyle={{ paddingVertical: 12 }}
      />

      <Text style={[commonStyles.title, { marginTop: 8 }]}>Desafíos disponibles</Text>
      <FlatList
        data={disponibles}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderDisponible}
        ListEmptyComponent={<Text style={commonStyles.subtitle}>No hay desafíos por ahora.</Text>}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </View>
  );
}
