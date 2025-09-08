import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { commonStyles, colors } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';
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
      // opcional log
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResumen();
  }, []);

  return (
    <ScrollView style={commonStyles.safeArea} contentContainerStyle={{ padding: 16 }}>
      {/* 🔹 Un solo título */}
      <Text style={commonStyles.title}>Información</Text>

      {/* Intro */}
      <View style={commonStyles.accentContainer}>
        <Text style={commonStyles.subtitle}>EcoRed - Tu aporte importa</Text>
        <Text style={commonStyles.body}>
          • Escaneá QR en ecopuntos para validar depósitos.{"\n"}
          • Sumá puntos y canjealos por beneficios.{"\n"}
          • Mirá tu impacto y tus desafíos activos.
        </Text>
      </View>

      {/* Resumen de impacto */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} style={{ marginVertical: 12 }} />
      ) : resumen ? (
        <View style={[commonStyles.accentContainer, { marginTop: 12 }]}>
          <Text style={commonStyles.subtitle}>Impacto (resumen)</Text>
          <Text style={commonStyles.body}>Total entregas: {resumen.total_entregas}</Text>
          <Text style={commonStyles.body}>Kg reciclados: {resumen.kg_reciclados}</Text>
          <Text style={commonStyles.body}>Ecopunto más activo: {resumen.top_ecopunto}</Text>
        </View>
      ) : null}

      {/* Acciones rápidas */}
      <View style={{ marginTop: 16 }}>
        <Pressable style={commonStyles.button} onPress={() => navigation.navigate('Usuario')}>
          <Ionicons name="person-circle-outline" size={18} color={colors.white} />
          <Text style={commonStyles.buttonText}>Mi Perfil</Text>
        </Pressable>

        <Pressable style={commonStyles.button} onPress={() => navigation.navigate('Beneficios')}>
          <Ionicons name="gift-outline" size={18} color={colors.white} />
          <Text style={commonStyles.buttonText}>Ver Beneficios</Text>
        </Pressable>

        <Pressable style={commonStyles.button} onPress={() => navigation.navigate('Desafios')}>
          <Ionicons name="flash-outline" size={18} color={colors.white} />
          <Text style={commonStyles.buttonText}>Ver Desafíos</Text>
        </Pressable>

        <Pressable
          style={[commonStyles.button, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('ScannerQR')}
        >
          <Ionicons name="qr-code-outline" size={18} color={colors.white} />
          <Text style={commonStyles.buttonText}>Escanear QR</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
