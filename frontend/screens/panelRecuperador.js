import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/styles';

export default function PanelRecuperador() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Panel Recuperador</Text>
      <Text style={commonStyles.subtitle}>Rutas, escaneo de QR y pesos por material.</Text>
    </View>
  );
}
