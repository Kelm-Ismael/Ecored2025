import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles } from '../styles/styles';

export default function PerfilUsuario({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUsuario = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.replace('Login');
        return;
      }

      const res = await fetch('http://localhost:3000/api/usuarios/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setUsuario(data);
      } else {
        Alert.alert('Error', data.error || 'Sesión inválida');
        await AsyncStorage.removeItem('token');
        navigation.replace('Login');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color="#00A887" />
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Mi Perfil</Text>

      {usuario ? (
        <>
          <Text style={commonStyles.subtitle}>Email: {usuario.email}</Text>

          <Pressable
            style={({ pressed }) => [
              commonStyles.button,
              { opacity: pressed ? 0.7 : 1, marginTop: 20 },
            ]}
            onPress={handleLogout}
          >
            <Text style={commonStyles.buttonText}>Cerrar Sesión</Text>
          </Pressable>
        </>
      ) : (
        <Text style={commonStyles.subtitle}>No se pudo cargar usuario</Text>
      )}
    </View>
  );
}
