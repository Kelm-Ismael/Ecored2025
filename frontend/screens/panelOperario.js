import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/styles';

export default function PanelOperario() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Panel Operario</Text>
      <Text style={commonStyles.subtitle}>Escaneo de QR, validación de entregas, etc.</Text>
    </View>
  );
}
