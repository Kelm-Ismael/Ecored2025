

// screens/registro.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles } from '../styles/styles';
import { BASE_URL } from '../config/api'; // o apiPost

export default function Registro({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    console.log('Intentando registrar:', email);
    try {
      const res = await fetch(`${BASE_URL}/api/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contrasenia: password }),
      });

      const data = await res.json().catch(() => ({}));
      console.log('Respuesta registro:', res.status, data);

      if (res.ok && data?.token) {
        await AsyncStorage.setItem('token', data.token);
        navigation.replace('PerfilUsuario');
      } else {
        Alert.alert('Error', data?.error || 'No se pudo registrar');
      }
    } catch (err) {
      console.error('Error fetch registro:', err);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Registro</Text>

      <TextInput
        style={commonStyles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={commonStyles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        style={({ pressed }) => [
          commonStyles.button,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={handleRegister}
      >
        <Text style={commonStyles.buttonText}>Registrarse</Text>
      </Pressable>
    </View>
  );
}
