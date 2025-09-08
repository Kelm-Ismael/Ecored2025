
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, Alert, ActivityIndicator, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, colors } from '../styles/styles';
import { apiGet, apiPut, apiUpload, BASE_URL } from '../utils/api';

export default function PerfilUsuario({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // cambiar contraseña
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [cargandoPass, setCargandoPass] = useState(false);
  const [subiendoAvatar, setSubiendoAvatar] = useState(false);

  async function cargarPerfil() {
    try {
      const data = await apiGet('/api/usuarios/me');
      setUsuario(data);
    } catch (e) {
      console.error('perfil error:', e);
      Alert.alert('Sesión', 'Inicia sesión nuevamente');
      await AsyncStorage.removeItem('token');
      navigation.replace('Login');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarPerfil);
    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos', 'Necesitamos acceso a tu galería para elegir una foto.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      const asset = result.assets[0];
      await subirAvatar(asset);
    }
  };

  const subirAvatar = async (asset) => {
    try {
      setSubiendoAvatar(true);
      const form = new FormData();
      // Importante: nombre de campo debe ser 'avatar' (como en el backend)
      form.append('avatar', {
        uri: asset.uri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      });
      const data = await apiUpload('/api/usuarios/me/avatar', form);
      setUsuario((u) => ({ ...u, foto_url: data.foto_url }));
      Alert.alert('Listo', 'Tu foto se actualizó');
    } catch (e) {
      console.error('upload avatar error:', e);
      Alert.alert('Error', e.message || 'No se pudo subir el avatar');
    } finally {
      setSubiendoAvatar(false);
    }
  };

  const cambiarPassword = async () => {
    if (!actual || !nueva) {
      Alert.alert('Datos', 'Completá contraseña actual y nueva');
      return;
    }
    try {
      setCargandoPass(true);
      await apiPut('/api/usuarios/me/password', { actual, nueva });
      setActual('');
      setNueva('');
      Alert.alert('OK', 'Contraseña actualizada');
    } catch (e) {
      console.error('pass error:', e);
      Alert.alert('Error', e.message || 'No se pudo actualizar la contraseña');
    } finally {
      setCargandoPass(false);
    }
  };

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  const avatarUri =
    usuario?.foto_url && usuario.foto_url.length > 0
      ? usuario.foto_url
      : `${BASE_URL}/uploads/avatars/default.png`; // opcional: poné un default en el backend

  return (
    <View style={[commonStyles.container, { paddingTop: 32 }]}>
      <Text style={commonStyles.title}>Mi Perfil</Text>

      <View style={[commonStyles.accentContainer, { alignItems: 'center' }]}>
        <Image
          source={{ uri: avatarUri }}
          style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 12, backgroundColor: '#eee' }}
        />

        <Pressable
          style={({ pressed }) => [
            commonStyles.button,
            { opacity: pressed || subiendoAvatar ? 0.7 : 1, width: '100%' },
          ]}
          onPress={pickImage}
          disabled={subiendoAvatar}
        >
          <Text style={commonStyles.buttonText}>{subiendoAvatar ? 'Subiendo...' : 'Cambiar foto'}</Text>
        </Pressable>

        <Text style={[commonStyles.subtitle, { marginTop: 12 }]}>Email: {usuario?.email}</Text>
        <Text style={commonStyles.subtitle}>Tipo: {usuario?.tipo_usuario || '—'}</Text>
        <Text style={[commonStyles.subtitle, { fontWeight: '700' }]}>
          Puntos acumulados: {usuario?.puntos_acumulados ?? 0}
        </Text>
      </View>

      {/* Cambiar contraseña */}
      <View style={[commonStyles.accentContainer, { marginTop: 16 }]}>
        <Text style={[commonStyles.subtitle, { marginBottom: 8, fontWeight: '700' }]}>
          Cambiar contraseña
        </Text>

        <TextInput
          style={commonStyles.input}
          placeholder="Contraseña actual"
          secureTextEntry
          value={actual}
          onChangeText={setActual}
        />
        <TextInput
          style={commonStyles.input}
          placeholder="Nueva contraseña (min 6)"
          secureTextEntry
          value={nueva}
          onChangeText={setNueva}
        />

        <Pressable
          style={({ pressed }) => [
            commonStyles.button,
            { opacity: pressed || cargandoPass ? 0.7 : 1 },
          ]}
          onPress={cambiarPassword}
          disabled={cargandoPass}
        >
          <Text style={commonStyles.buttonText}>
            {cargandoPass ? 'Guardando...' : 'Actualizar contraseña'}
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [
          commonStyles.button,
          { opacity: pressed ? 0.7 : 1, marginTop: 16, backgroundColor: '#e74c3c' },
        ]}
        onPress={handleLogout}
      >
        <Text style={commonStyles.buttonText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}
