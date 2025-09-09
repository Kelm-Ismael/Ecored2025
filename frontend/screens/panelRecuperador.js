// screens/panelRecuperador.js
import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/styles';

export default function PanelRecuperador({ navigation }) {
  const handleLogout = async () => {
    Alert.alert('Cerrar sesión', '¿Seguro que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar sesión',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          navigation.replace('Login');
        },
      },
    ]);
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Panel Recuperador</Text>
      <Text style={commonStyles.subtitle}>
        Rutas, escaneo de QR y pesos por material.
      </Text>

      {/* Ir a perfil */}
      <Pressable
        style={commonStyles.button}
        onPress={() => navigation.navigate('PerfilUsuario')}
      >
        <Text style={commonStyles.buttonText}>Ir a mi perfil</Text>
      </Pressable>

      {/* Cerrar sesión */}
      <Pressable
        style={({ pressed }) => [
          commonStyles.button,
          { backgroundColor: '#E24949', opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={handleLogout}
      >
        <Text style={commonStyles.buttonText}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
}
