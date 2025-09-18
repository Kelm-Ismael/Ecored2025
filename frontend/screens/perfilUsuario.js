<<<<<<< HEAD


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
=======
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Alert, View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/styles';
import { BASE_URL } from '../config/api';
import LogoutButton from '../components/LogoutButton'

export default function ScreenPerfil({ onLogout }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log('🔑 Token obtenido:', token);
  
                if (!token) throw new Error('Token no encontrado');

                const res = await fetch(`${BASE_URL}/usuarios/perfil`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log('📡 Status perfil:', res.status);
                const raw = await res.text();
                console.log('👤 Texto crudo de perfil:', raw); //ok hasta aca

                if (!res.ok) {
                    console.error('⚠️ Error del servidor:', raw);
                    throw new Error('No se pudo cargar el perfil');
                }

                let data;
                try {
                    data = JSON.parse(raw);
                } catch (e) {
                    console.warn('⚠️ Respuesta no es JSON:', raw);
                    throw new Error('Respuesta inválida del servidor');
                }

                console.log('✅ Perfil parseado:', data);

                setUsuario(data);
            } catch (err) {
                console.error(err);
                Alert.alert('Error', 'No se pudo obtener el perfil del usuario');
            } finally {
                setLoading(false);
            }
        };

        obtenerDatos();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={commonStyles.safeArea}>
                <View style={commonStyles.container}>
                    <ActivityIndicator size="large" color="#00A887" />
                </View>
            </SafeAreaView>
        );
    }

    if (!usuario) {
        return (
            <SafeAreaView style={commonStyles.safeArea}>
                <View style={commonStyles.container}>
                    <Text style={commonStyles.title}>Perfil no encontrado</Text>
                    <LogoutButton onLogout={onLogout} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.containerNoPadding}>
                <View style={commonStyles.perfilContainer}>
                    <View style={commonStyles.perfilRow}>
                        <View style={commonStyles.box70}>
                            <Text style={commonStyles.perfilNombre}>{usuario.referencia.nombre} {usuario.referencia.apellido}</Text>
                            <Text style={commonStyles.perfilRol}>{usuario.tipo_usuario || 'No especificado'}</Text>
                        </View>
                        <View style={commonStyles.box30}>
                            
                            <Text style={commonStyles.perfilNivelTag}>Nivel:</Text>
                            <View style={commonStyles.perfilNivel}>
                                <Text style={commonStyles.perfilNivelText}>{usuario.nivel || '0'}</Text>
                            </View>
                            <Text style={commonStyles.perfilNivelTag}>No asignado</Text>
                        </View>
                    </View>
                </View>
                <View style={commonStyles.container}>
                    <View style={commonStyles.container}>
                        <Text style={commonStyles.perfilTitulo}>Puntos acumulados:</Text>
                        <View style={commonStyles.perfilPuntos}>
                            <Text style={commonStyles.perfilPuntosTexto}>{usuario.puntos || 0} puntos</Text>
                        </View>
                        <Text style={commonStyles.perfilTitulo}>Últimas transacciones:</Text>
                        <View style={commonStyles.perfilTransacciones}>
                            <Text>tablas</Text>
                        </View>
                    </View>
                </View>
                    <View style={commonStyles.perfilButtonsContainer}>
                        <View style={commonStyles.perfilButtonEntrega}>
                            <TouchableOpacity
                                style={commonStyles.perfilButtonEntrega}
                                onPress={() => navigation.navigate('Scanner')}
                            >
                                <Text style={commonStyles.buttonText}>Nueva entrega</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={commonStyles.perfilButtonLogout}>
                            <LogoutButton onLogout={onLogout} />
                        </View>                        
                    </View>

            </View>
        </SafeAreaView>
>>>>>>> origin/Caro
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
