// screens/EditarPassword.js
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles } from '../styles/styles';
import { BASE_URL } from '../config/api'; // usa la misma ruta que en tus otras screens

export default function EditarPassword({ navigation }) {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [guardando, setGuardando] = useState(false);

  const handleCambiar = async () => {
    if (!actual || !nueva || !confirmar) {
      return Alert.alert('Campos', 'Completá todos los campos.');
    }
    if (nueva !== confirmar) {
      return Alert.alert('Validación', 'La nueva contraseña y la confirmación no coinciden.');
    }
    if (nueva.length < 6) {
      return Alert.alert('Validación', 'La nueva contraseña debe tener al menos 6 caracteres.');
    }

    try {
      setGuardando(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Sesión', 'Inicia sesión nuevamente.');
        return navigation.replace('Login');
      }

      const res = await fetch(`${BASE_URL}/api/usuarios/me/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ actual, nueva }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return Alert.alert('Error', data.error || 'No se pudo actualizar la contraseña.');
      }

      Alert.alert('Listo', 'Contraseña actualizada.');
      navigation.goBack();
    } catch (err) {
      console.error('PUT /me/password', err);
      Alert.alert('Error', 'No se pudo conectar al servidor.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      {/* Dejá el título del header del Stack; evitá repetir aquí si no querés duplicado */}
      <Text style={commonStyles.subtitle}>Por seguridad, ingresá tu contraseña actual y la nueva.</Text>

      <TextInput
        style={commonStyles.input}
        placeholder="Contraseña actual"
        secureTextEntry
        value={actual}
        onChangeText={setActual}
        autoCapitalize="none"
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Nueva contraseña (min 6)"
        secureTextEntry
        value={nueva}
        onChangeText={setNueva}
        autoCapitalize="none"
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Confirmar nueva contraseña"
        secureTextEntry
        value={confirmar}
        onChangeText={setConfirmar}
        autoCapitalize="none"
      />

      <Pressable
        style={({ pressed }) => [commonStyles.button, { opacity: pressed || guardando ? 0.7 : 1 }]}
        onPress={handleCambiar}
        disabled={guardando}
      >
        <Text style={commonStyles.buttonText}>{guardando ? 'Actualizando...' : 'Actualizar'}</Text>
      </Pressable>
    </ScrollView>
  );
}
