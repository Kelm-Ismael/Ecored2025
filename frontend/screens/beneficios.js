import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { beneficiosAppStyles, commonStyles } from '../styles/styles';
import { BASE_URL } from '../config/api';

export default function ScreenBeneficio() {
    const [beneficios, setBeneficios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
    const fetchBeneficios = async () => {
      try {
        const response = await fetch(`${BASE_URL}/beneficios/todos`);
        if (!response.ok) {
          throw new Error('Error al obtener beneficios');
        }

        const data = await response.json();
        setBeneficios(data);
      } catch (err) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficios();
  }, []);

  const renderBeneficio = ({ item }) => (
        <View style={beneficiosAppStyles.card}>
            <Text style={beneficiosAppStyles.title}>{item.descripcion}</Text>
            <View style={beneficiosAppStyles.row}>
                <Text style={beneficiosAppStyles.itemTipoYPts}>{item.tipo} || {item.puntos_requeridos} pts.</Text>
                    <TouchableOpacity
                        onPress={() => console.log(`Canjear beneficio ID: ${item.id}`)}
                         style={beneficiosAppStyles.itemBoton}
                        >
                        <Text style={beneficiosAppStyles.canjearBtnText}>Canjear</Text>
                    </TouchableOpacity>
            </View>
        </View>
  );

    const beneficiosFiltrados = beneficios.filter((item) =>
        (item.descripcion || '').toLowerCase().includes(search.toLowerCase())
        // || (item.tipo || '').toLowerCase().includes(query)
    );

    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>
                    Beneficios
                </Text>
                <View style={beneficiosAppStyles.searchContainer}>
                    <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
                    <TextInput
                        placeholder="Buscar beneficio..."
                        value={search}
                        onChangeText={setSearch}
                        style={beneficiosAppStyles.searchInput}
                    />
                </View>
                
                <View style={commonStyles.accentContainer}>
                    {loading && <ActivityIndicator size="large" color="#000" />}
                    {error && <Text style={{ color: 'red' }}>{error}</Text>}
                    {!loading && !error && (
                        <View>
                            <FlatList
                            data={beneficiosFiltrados}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderBeneficio}
                            />
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}