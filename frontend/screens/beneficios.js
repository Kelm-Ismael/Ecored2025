
// frontend/screens/beneficios.js
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api';

export default function Beneficios() {
  const [beneficios, setBeneficios] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cargandoCanje, setCargandoCanje] = useState(false);

  async function getToken() {
    const t = await AsyncStorage.getItem('token');
    if (!t) throw new Error('NO_TOKEN');
    return t;
  }

  async function fetchMe() {
    const token = await getToken();
    const r = await fetch(`${BASE_URL}/api/usuarios/me`, { headers: { Authorization: `Bearer ${token}` }});
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || 'Error me');
    setPuntos(j.puntos_acumulados ?? 0);
  }

  async function fetchBeneficios() {
    const r = await fetch(`${BASE_URL}/api/beneficios`);
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || 'Error beneficios');
    setBeneficios(j);
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await Promise.all([fetchMe(), fetchBeneficios()]);
      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'No se pudo cargar beneficios.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function canjear(id_beneficio) {
    try {
      setCargandoCanje(true);
      const token = await getToken();
      const r = await fetch(`${BASE_URL}/api/beneficios/${id_beneficio}/canjear`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const j = await r.json();
      if (!r.ok) {
        Alert.alert('Canje', j.error || 'No se pudo canjear');
        return;
      }
      Alert.alert('Canje exitoso', `Código: ${j.codigo || '(ver administración)'}`);
      // refrescar puntos
      await fetchMe();
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    } finally {
      setCargandoCanje(false);
    }
  }

  const renderItem = ({ item }) => {
    const puede = puntos >= item.puntos_requeridos;
    return (
      <View style={[commonStyles.accentContainer, { marginBottom: 12 }]}>
        <Text style={[commonStyles.title, { marginBottom: 8 }]}>{item.descripcion}</Text>
        <Text style={commonStyles.subtitle}>Requiere: {item.puntos_requeridos} pts</Text>
        <Pressable
          style={[commonStyles.button, { backgroundColor: puede ? colors.secondary : colors.gray }]}
          disabled={!puede || cargandoCanje}
          onPress={() => canjear(item.id)}
        >
          <Text style={commonStyles.buttonText}>{puede ? 'Canjear' : 'Insuficientes puntos'}</Text>
        </Pressable>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Beneficios</Text>
      <Text style={commonStyles.subtitle}>Tus puntos: <Text style={{ fontWeight: 'bold', color: colors.secondary }}>{puntos}</Text></Text>
      <FlatList
        data={beneficios}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </View>
  );
}
