import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/styles';

export default function PanelEscuela() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Panel Escuela</Text>
      <Text style={commonStyles.subtitle}>Campañas escolares, ranking por curso y entregas.</Text>
    </View>
  );
}
