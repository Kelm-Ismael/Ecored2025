import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/styles';

export default function PanelAdmin() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Panel Administrador</Text>
      <Text style={commonStyles.subtitle}>Gestión de usuarios, beneficios, ecopuntos y reportes.</Text>
    </View>
  );
}
