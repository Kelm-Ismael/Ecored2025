import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/styles';

export default function PanelComercio() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Panel Comercio</Text>
      <Text style={commonStyles.subtitle}>Canjes, validación de cupones y estadísticas del comercio.</Text>
    </View>
  );
}
