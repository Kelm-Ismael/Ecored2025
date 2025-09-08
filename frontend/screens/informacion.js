

// frontend/screens/informacion.js
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api';

export default function Informacion({ navigation }) {
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchResumen() {
    try {
      setLoading(true);
      const r = await fetch(`${BASE_URL}/api/impacto/resumen`);
      if (!r.ok) throw new Error('No disponible');
      const j = await r.json();
      setResumen(j);
    } catch (e) {
      // opcional: Alert.alert('Info', 'Resumen de impacto no disponible aún.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResumen();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={commonStyles.title}>EcoRed - Información</Text>

      <View style={commonStyles.accentContainer}>
        <Text style={commonStyles.subtitle}>
          • Escaneá QR en ecopuntos para validar depósitos de reciclables.{'\n'}
          • Acumulá puntos y canjealos por beneficios (SUSA, descuentos municipales, comercios, premios).{'\n'}
          • Mirá tu impacto por zona y tus desafíos activos.
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} style={{ marginVertical: 12 }} />
      ) : resumen ? (
        <View style={[commonStyles.accentContainer, { marginTop: 12 }]}>
          <Text style={commonStyles.title}>Impacto (resumen)</Text>
          <Text style={commonStyles.subtitle}>Total entregas: {resumen.total_entregas}</Text>
          <Text style={commonStyles.subtitle}>Kg reciclados: {resumen.kg_reciclados}</Text>
          <Text style={commonStyles.subtitle}>Ecopunto más activo: {resumen.top_ecopunto}</Text>
        </View>
      ) : null}

      <View style={{ marginTop: 16 }}>
        <Pressable style={commonStyles.button} onPress={() => navigation.navigate('Beneficios')}>
          <Text style={commonStyles.buttonText}>Ver Beneficios</Text>
        </Pressable>
        <Pressable style={commonStyles.button} onPress={() => navigation.navigate('Desafios')}>
          <Text style={commonStyles.buttonText}>Ver Desafíos</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
