
// // frontend/screens/desafios.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, Pressable, Alert, ActivityIndicator, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { commonStyles, colors } from '../styles/styles';
// import { BASE_URL } from '../config/api';

// export default function Desafios() {
//   const [misDesafios, setMisDesafios] = useState([]);
//   const [disponibles, setDisponibles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actuando, setActuando] = useState(false);

//   async function getToken() {
//     const t = await AsyncStorage.getItem('token');
//     if (!t) throw new Error('NO_TOKEN');
//     return t;
//   }

//   async function fetchMisDesafios() {
//     const token = await getToken();
//     const r = await fetch(`${BASE_URL}/api/usuario/desafios`, { headers: { Authorization: `Bearer ${token}` }});
//     const j = await r.json();
//     if (!r.ok) throw new Error(j.error || 'Error mis desafíos');
//     setMisDesafios(j);
//   }

//   async function fetchDisponibles() {
//     const r = await fetch(`${BASE_URL}/api/desafios`);
//     const j = await r.json();
//     if (!r.ok) throw new Error(j.error || 'Error desafíos');
//     setDisponibles(j);
//   }

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         await Promise.all([fetchMisDesafios(), fetchDisponibles()]);
//       } catch (e) {
//         console.error(e);
//         Alert.alert('Error', 'No se pudieron cargar los desafíos');
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   async function inscribir(id) {
//     try {
//       setActuando(true);
//       const token = await getToken();
//       const r = await fetch(`${BASE_URL}/api/desafios/${id}/inscribir`, {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const j = await r.json();
//       if (!r.ok) {
//         Alert.alert('Inscripción', j.error || 'No se pudo inscribir');
//         return;
//       }
//       Alert.alert('Listo', 'Te inscribiste al desafío');
//       await fetchMisDesafios();
//     } catch (e) {
//       console.error(e);
//       Alert.alert('Error', 'No se pudo conectar al servidor');
//     } finally {
//       setActuando(false);
//     }
//   }

//   async function confirmar(idUsuarioDesafio) {
//     try {
//       setActuando(true);
//       const token = await getToken();
//       const r = await fetch(`${BASE_URL}/api/usuario/desafios/${idUsuarioDesafio}/confirmar`, {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const j = await r.json();
//       if (!r.ok) {
//         Alert.alert('Confirmación', j.error || 'No se pudo confirmar');
//         return;
//       }
//       Alert.alert('¡Puntos sumados!', `Ganaste ${j.puntos_ganados} pts`);
//       await fetchMisDesafios();
//     } catch (e) {
//       console.error(e);
//       Alert.alert('Error', 'No se pudo conectar al servidor');
//     } finally {
//       setActuando(false);
//     }
//   }

//   const renderMiDesafio = ({ item }) => (
//     <View style={[commonStyles.accentContainer, { marginBottom: 12 }]}>
//       <Text style={commonStyles.title}>{item.nombre}</Text>
//       <Text style={commonStyles.subtitle}>Puntos a ganar: {item.puntos_a_ganar}</Text>
//       <Text style={commonStyles.subtitle}>Estado: {item.completado ? 'Completado' : 'En progreso'}</Text>
//       {!item.completado && (
//         <Pressable
//           style={[commonStyles.button, { backgroundColor: colors.secondary }]}
//           disabled={actuando}
//           onPress={() => confirmar(item.id_usuario_desafio)}
//         >
//           <Text style={commonStyles.buttonText}>Confirmar entrega</Text>
//         </Pressable>
//       )}
//     </View>
//   );

//   const renderDisponible = ({ item }) => (
//     <View style={[commonStyles.accentContainer, { marginBottom: 12 }]}>
//       <Text style={commonStyles.title}>{item.nombre}</Text>
//       <Text style={commonStyles.subtitle}>Puntos a ganar: {item.puntos_a_ganar}</Text>
//       <Pressable
//         style={[commonStyles.button, { backgroundColor: colors.secondary }]}
//         disabled={actuando}
//         onPress={() => inscribir(item.id)}
//       >
//         <Text style={commonStyles.buttonText}>Inscribirme</Text>
//       </Pressable>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={commonStyles.container}>
//         <ActivityIndicator size="large" color={colors.secondary} />
//       </View>
//     );
//   }

//   return (
//     <View style={commonStyles.container}>
//       <Text style={commonStyles.title}>Mis Desafíos</Text>
//       <FlatList
//         data={misDesafios}
//         keyExtractor={(i) => String(i.id_usuario_desafio)}
//         renderItem={renderMiDesafio}
//         ListEmptyComponent={<Text style={commonStyles.subtitle}>Aún no tienes desafíos.</Text>}
//         contentContainerStyle={{ paddingVertical: 12 }}
//       />

//       <Text style={[commonStyles.title, { marginTop: 8 }]}>Desafíos disponibles</Text>
//       <FlatList
//         data={disponibles}
//         keyExtractor={(i) => String(i.id)}
//         renderItem={renderDisponible}
//         ListEmptyComponent={<Text style={commonStyles.subtitle}>No hay desafíos por ahora.</Text>}
//         contentContainerStyle={{ paddingVertical: 12 }}
//       />
//     </View>
//   );
// }

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Pressable } from 'react-native';
import { commonStyles } from '../styles/styles';
import { apiGet, apiPost } from '../config/api';

export default function ScreenDesafio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function cargar() {
    try {
      const data = await apiGet('/api/desafios/usuario');
      setItems(data);
    } catch (e) {
      console.error('desafios error:', e);
      Alert.alert('Error', e.message || 'No se pudieron cargar desafíos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  const confirmar = async (idUsuarioDesafio) => {
    try {
      await apiPost(`/api/desafios/usuario/${idUsuarioDesafio}/confirmar`, {});
      Alert.alert('¡Listo!', 'Desafío confirmado, se acreditaron puntos.');
      cargar();
    } catch (e) {
      Alert.alert('Error', e.message || 'No se pudo confirmar');
    }
  };

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[commonStyles.container, { paddingTop: 24 }]}>
      <Text style={commonStyles.title}>Mis Desafíos</Text>

      <FlatList
        data={items}
        keyExtractor={(it) => String(it.id_usuario_desafio)}
        renderItem={({ item }) => (
          <View style={[commonStyles.accentContainer, { marginBottom: 12 }]}>
            <Text style={[commonStyles.subtitle, { fontWeight: '700' }]}>{item.nombre}</Text>
            <Text style={commonStyles.subtitle}>Puntos a ganar: {item.puntos_a_ganar}</Text>
            <Text style={commonStyles.subtitle}>Completado: {item.completado ? 'Sí' : 'No'}</Text>

            {!item.completado && (
              <Pressable
                style={({ pressed }) => [
                  commonStyles.button,
                  { opacity: pressed ? 0.7 : 1, marginTop: 6 },
                ]}
                onPress={() => confirmar(item.id_usuario_desafio)}
              >
                <Text style={commonStyles.buttonText}>Confirmar</Text>
              </Pressable>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={commonStyles.subtitle}>No tenés desafíos.</Text>}
      />
    </View>
  );
}
