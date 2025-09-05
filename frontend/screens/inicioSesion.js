import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles } from '../styles/styles';

export default function InicioSesion({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        await AsyncStorage.setItem('token', data.token);
        navigation.replace('PerfilUsuario');
      } else {
        Alert.alert('Error', data.error || 'Credenciales inválidas');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Iniciar Sesión</Text>

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
          { opacity: pressed ? 0.7 : 1, marginBottom: 12 },
        ]}
        onPress={handleLogin}
      >
        <Text style={commonStyles.buttonText}>Entrar</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Registro')}>
        <Text style={commonStyles.subtitle}>
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </Pressable>
    </View>
  );
}
