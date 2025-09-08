import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api';

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

      const res = await fetch(`${BASE_URL}/api/usuarios/me`, {
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
      console.error('Error fetch perfil:', err);
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
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={commonStyles.safeArea}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text style={commonStyles.title}>Mi Perfil</Text>

      {usuario ? (
        <>
          {/* Avatar */}
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Image
              source={
                usuario.foto_url
                  ? { uri: usuario.foto_url }
                  : require('../assets/avatar-placeholder.png') // poné una imagen placeholder en assets
              }
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                borderWidth: 3,
                borderColor: colors.secondary,
                marginBottom: 12,
              }}
            />
            <Text style={commonStyles.subtitle}>{usuario.email}</Text>
            <Text style={commonStyles.subtitle}>
              Tipo: {usuario.tipo_usuario || 'N/A'}
            </Text>
            <Text style={commonStyles.subtitle}>
              Puntos acumulados: {usuario.puntos_acumulados || 0}
            </Text>
          </View>

          {/* Botones de acción */}
          <Pressable
            style={commonStyles.button}
            onPress={() => navigation.navigate('EditarAvatar')}
          >
            <Text style={commonStyles.buttonText}>Cambiar Foto de Perfil</Text>
          </Pressable>

          <Pressable
            style={commonStyles.button}
            onPress={() => navigation.navigate('EditarPassword')}
          >
            <Text style={commonStyles.buttonText}>Cambiar Contraseña</Text>
          </Pressable>

          <Pressable
            style={[commonStyles.button, { backgroundColor: '#E53935' }]}
            onPress={handleLogout}
          >
            <Text style={commonStyles.buttonText}>Cerrar Sesión</Text>
          </Pressable>
        </>
      ) : (
        <Text style={commonStyles.subtitle}>No se pudo cargar usuario</Text>
      )}
    </ScrollView>
  );
}
