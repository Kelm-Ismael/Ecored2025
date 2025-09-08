// screens/EditarAvatar.js
import React, { useState } from 'react';
import { ScrollView, Text, Image, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api';

function guessMimeFromUri(uri) {
  const ext = uri?.split('?')[0]?.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'png':  return { mime: 'image/png', name: `avatar.png` };
    case 'webp': return { mime: 'image/webp', name: `avatar.webp` };
    case 'heic':
    case 'heif': return { mime: 'image/heic', name: `avatar.heic` }; // el backend ahora lo acepta
    case 'jpg':
    case 'jpeg':
    default:     return { mime: 'image/jpeg', name: `avatar.jpg` };
  }
}

export default function EditarAvatar({ navigation }) {
  const [uri, setUri] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

  const pedirPermisos = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos', 'Necesitamos acceso a tu galería para elegir una foto.');
      return false;
    }
    return true;
  };

  const elegirImagen = async () => {
    const ok = await pedirPermisos();
    if (!ok) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,   // recorte
      aspect: [1, 1],        // cuadrado
      quality: 0.8,          // comprime un poco
    });

    if (!result.canceled) {
      setUri(result.assets[0].uri);
    }
  };

  const subir = async () => {
    if (!uri) return Alert.alert('Imagen', 'Primero seleccioná una imagen.');

    try {
      setSubiendo(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Sesión', 'Iniciá sesión nuevamente.');
        return navigation.replace('Login');
      }

      const { mime, name } = guessMimeFromUri(uri);
      const formData = new FormData();
      // ⚠️ nombre del campo DEBE ser 'avatar'
      formData.append('avatar', { uri, name, type: mime });

      const res = await fetch(`${BASE_URL}/api/usuarios/me/avatar`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }, // NO pongas Content-Type aquí
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // Errores comunes: 401/403 token, 413 tamaño, 415 tipo, 500 multer
        return Alert.alert('Error', data.error || `No se pudo actualizar el avatar (HTTP ${res.status}).`);
      }

      Alert.alert('Listo', 'Foto de perfil actualizada.');
      navigation.goBack();
    } catch (err) {
      console.error('PUT /me/avatar', err);
      Alert.alert('Error', 'No se pudo conectar al servidor.');
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      <Text style={commonStyles.title}>Actualizar Foto de Perfil</Text>
      <Text style={commonStyles.subtitle}>Elegí una imagen cuadrada para mejores resultados.</Text>

      {uri && (
        <Image
          source={{ uri }}
          style={{ width: 180, height: 180, borderRadius: 90, alignSelf: 'center', marginVertical: 16, backgroundColor: '#eee' }}
        />
      )}

      <Pressable style={commonStyles.button} onPress={elegirImagen}>
        <Text style={commonStyles.buttonText}>{uri ? 'Elegir otra imagen' : 'Elegir imagen'}</Text>
      </Pressable>

      <Pressable
        style={[commonStyles.button, { backgroundColor: colors.accent, opacity: subiendo ? 0.7 : 1 }]}
        onPress={subir}
        disabled={subiendo}
      >
        <Text style={commonStyles.buttonText}>{subiendo ? 'Subiendo...' : 'Subir foto'}</Text>
      </Pressable>
    </ScrollView>
  );
}
