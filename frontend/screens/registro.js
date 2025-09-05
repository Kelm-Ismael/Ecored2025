import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles } from '../styles/styles';

export default function Registro({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        await AsyncStorage.setItem('token', data.token);
        navigation.replace('PerfilUsuario');
      } else {
        Alert.alert('Error', data.error || 'No se pudo registrar');
      }
    } catch (err) {
      console.error(err);
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
