import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { commonStyles } from '../styles/styles';

export default function PanelCiudadano({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Panel Ciudadano</Text>
      <Text style={commonStyles.subtitle}>Puntos, beneficios y desafíos personales.</Text>

      <Pressable style={commonStyles.button} onPress={() => navigation.navigate('PerfilUsuario')}>
        <Text style={commonStyles.buttonText}>Ir a mi perfil</Text>
      </Pressable>
    </View>
  );
}
