import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { commonStyles, desafiosAppStyles } from '../styles/styles';
import { BASE_URL } from '../config/api';

export default function ScreenDesafio() {
  const [desafios, setDesafios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchDesafios = async () => {
      try {
        const response = await fetch(`${BASE_URL}/desafios/todos`);
        if (!response.ok) {
          throw new Error('Error al obtener desafíos');
        }

        const data = await response.json();
        setDesafios(data);
      } catch (err) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchDesafios();
  }, []);

  const renderDesafio = ({ item }) => (
    <View style={desafiosAppStyles.card}>
      <Text style={desafiosAppStyles.title}>{item.nombre}</Text>
      <View style={desafiosAppStyles.row}>
        <Text style={desafiosAppStyles.tipoYPuntos}>{item.tipo} || {item.puntos_a_ganar} puntos a ganar.</Text>
        <TouchableOpacity
          onPress={() => console.log(`Aceptar desafío ID: ${item.id}`)}
          style={desafiosAppStyles.aceptarBtn}
        >
          <Text style={desafiosAppStyles.aceptarBtnText}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const desafiosFiltrados = desafios.filter((item) =>
  (item.nombre || '').toLowerCase().includes(search.toLowerCase())
  || (item.tipo || '').toLowerCase().includes(search.toLowerCase())
);

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Desafíos</Text>

        <View style={desafiosAppStyles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Buscar desafío..."
            value={search}
            onChangeText={setSearch}
            style={desafiosAppStyles.searchInput}
          />
        </View>

        <View style={commonStyles.accentContainer}>
          {loading && <ActivityIndicator size="large" color="#000" />}
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          {!loading && !error && (
            <FlatList
              data={desafiosFiltrados}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderDesafio}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
