

// screens/perfilUsuario.js
import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, Pressable, ActivityIndicator,
  ScrollView, Image, RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api';

export default function PerfilUsuario({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const fetchUsuario = async () => {
    try {
      setErrMsg('');
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setErrMsg('No hay sesión. Iniciá sesión.');
        navigation.replace('Login');
        return;
      }

      const res = await fetch(`${BASE_URL}/api/usuarios/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrMsg(data?.error || `Error ${res.status}`);
        if (res.status === 401 || res.status === 403) {
          await AsyncStorage.removeItem('token');
          navigation.replace('Login');
        }
        setUsuario(null);
        return;
      }

      setUsuario(data);
    } catch (err) {
      console.error('GET /me', err);
      setErrMsg('No se pudo conectar al servidor');
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsuario(); }, []);
  useFocusEffect(useCallback(() => { fetchUsuario(); }, []));

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsuario();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={commonStyles.safeArea}
      contentContainerStyle={{ padding: 18 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
      }
    >
      <View style={commonStyles.card}>
        <View style={[commonStyles.center, { marginBottom: 14 }]}>
          <Image
            source={
              usuario?.foto_url
                ? { uri: usuario.foto_url }
                : require('../assets/avatar-placeholder.png')
            }
            style={commonStyles.avatar}
          />
        </View>

        {usuario ? (
          <>
            <Text style={[commonStyles.h2, { textAlign: 'center' }]}>
              {usuario.email}
            </Text>
            <Text style={[commonStyles.small, { textAlign: 'center', marginBottom: 12 }]}>
              {usuario.tipo_usuario || 'Ciudadano'}
            </Text>

            <View style={[commonStyles.cardTight, { marginBottom: 12 }]}>
              <View style={commonStyles.between}>
                <Text style={commonStyles.listTitle}>Puntos acumulados</Text>
                <Text style={[commonStyles.listTitle, { color: colors.primary }]}>
                  {usuario.puntos_acumulados ?? 0}
                </Text>
              </View>
            </View>

            <Pressable style={commonStyles.button} onPress={() => navigation.navigate('EditarAvatar')}>
              <Text style={commonStyles.buttonText}>Cambiar foto de perfil</Text>
            </Pressable>

            <Pressable
              style={[commonStyles.button, commonStyles.buttonMuted]}
              onPress={() => navigation.navigate('EditarPassword')}
            >
              <Text style={[commonStyles.buttonText, commonStyles.buttonMutedText]}>
                Cambiar contraseña
              </Text>
            </Pressable>

            <Pressable
              style={[commonStyles.button, commonStyles.buttonDanger]}
              onPress={handleLogout}
            >
              <Text style={commonStyles.buttonText}>Cerrar sesión</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={[commonStyles.body, { textAlign: 'center', color: colors.danger }]}>
              {errMsg || 'No se pudo cargar usuario'}
            </Text>

            <Pressable style={commonStyles.button} onPress={fetchUsuario}>
              <Text style={commonStyles.buttonText}>Reintentar</Text>
            </Pressable>

            <Pressable
              style={[commonStyles.button, commonStyles.buttonOutline]}
              onPress={() => navigation.replace('Login')}
            >
              <Text style={[commonStyles.buttonText, commonStyles.buttonOutlineText]}>
                Ir a iniciar sesión
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </ScrollView>
  );
}
