// screens/EditarAvatar.js
import React, { useState } from 'react';
import { ScrollView, Text, Image, Pressable, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator'; // móvil
import * as FileSystem from 'expo-file-system'; // móvil
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api';

const isWeb = Platform.OS === 'web';

function getExt(uri) {
  return uri?.split('?')[0]?.split('.').pop()?.toLowerCase() || '';
}

async function ensureUploadableMobile(uri) {
  // MÓVIL: Convertir HEIC/HEIF/WEBP a JPEG y comprimir < ~5MB
  const ext = getExt(uri);
  const needsConvert = ['heic', 'heif', 'webp'].includes(ext);
  let out = uri;

  if (needsConvert) {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [],
      { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG }
    );
    out = result.uri;
  }

  const stat = await FileSystem.getInfoAsync(out);
  const MAX = 4.8 * 1024 * 1024; // margen bajo 5MB
  if (stat.exists && stat.size > MAX) {
    const result = await ImageManipulator.manipulateAsync(
      out,
      [],
      { compress: 0.65, format: ImageManipulator.SaveFormat.JPEG }
    );
    out = result.uri;
  }

  return { uri: out, name: 'avatar.jpg', type: 'image/jpeg' };
}

async function buildFormData({ localUri, webAsset }) {
  const form = new FormData();

  if (isWeb) {
    // WEB: el picker devuelve Blob URL. Hay que obtener el blob real.
    // webAsset: { uri, mimeType?, fileName? } -> desde ImagePicker (SDK 53)
    let fileName = webAsset?.fileName || 'avatar.jpg';
    let mime = webAsset?.mimeType || 'image/jpeg';

    // Si el picker devolvió un blob: fetch al blob URL
    const resp = await fetch(webAsset?.uri || localUri);
    const blob = await resp.blob();

    // Si el tipo no viene, inferimos JPEG
    if (!blob.type || blob.type === '') {
      mime = 'image/jpeg';
    } else {
      mime = blob.type;
    }

    form.append('avatar', blob, fileName);
  } else {
    // MÓVIL: adjuntar como { uri, type, name }
    form.append('avatar', localUri);
  }

  return form;
}

export default function EditarAvatar({ navigation }) {
  const [asset, setAsset] = useState(null); // guardamos el asset del picker (incluye uri/web info)
  const [subiendo, setSubiendo] = useState(false);

  const pedirPermisos = async () => {
    // En móvil, pedimos permiso; en web no hace falta
    if (isWeb) return true;

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
      quality: 0.9,          // base alta; luego recomprimimos si hace falta en móvil
      exif: false,
    });

    if (!result.canceled) {
      const a = result.assets[0]; // { uri, width, height, fileName?, mimeType? (web) }
      setAsset(a);
      console.log('[Avatar] elegido:', a);
    }
  };

  const subir = async () => {
    if (!asset?.uri) return Alert.alert('Imagen', 'Primero seleccioná una imagen.');
    try {
      setSubiendo(true);

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Sesión', 'Iniciá sesión nuevamente.');
        return navigation.replace('Login');
      }

      let filePart;
      if (isWeb) {
        // En web no manipulamos imágenes aquí; las mandamos como Blob
        filePart = { web: true, asset };
      } else {
        // En móvil, convertimos/optimizamos a JPEG
        filePart = { web: false, local: await ensureUploadableMobile(asset.uri) };
      }

      const formData = await buildFormData({
        localUri: filePart.web ? null : filePart.local,
        webAsset: filePart.web ? asset : null,
      });

      const res = await fetch(`${BASE_URL}/api/usuarios/me/avatar`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }, // NO seteamos Content-Type manual
        body: formData,
      });

      // Hay backends que devuelven texto en errores Multer
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { data = { raw: text }; }

      console.log('PUT /me/avatar ->', res.status, data);

      if (!res.ok) {
        const msg =
          data?.error ||
          data?.message ||
          data?.raw ||
          `No se pudo actualizar el avatar (HTTP ${res.status}).`;
        return Alert.alert('Error', msg);
      }

      Alert.alert('Listo', 'Foto de perfil actualizada.');
      navigation.goBack();
    } catch (err) {
      console.error('PUT /me/avatar error:', err);
      Alert.alert('Error', 'No se pudo conectar al servidor.');
    } finally {
      setSubiendo(false);
    }
  };

  const previewUri = asset?.uri || null;

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      <Text style={commonStyles.title}>Actualizar Foto de Perfil</Text>
      <Text style={commonStyles.subtitle}>Elegí una imagen cuadrada para mejores resultados.</Text>

      {previewUri && (
        <Image
          source={{ uri: previewUri }}
          style={{
            width: 200, height: 200, borderRadius: 100,
            alignSelf: 'center', marginVertical: 16, backgroundColor: '#eee'
          }}
        />
      )}

      <Pressable style={[commonStyles.button, commonStyles.buttonLg]} onPress={elegirImagen}>
        <Text style={commonStyles.buttonText}>{previewUri ? 'Elegir otra imagen' : 'Elegir imagen'}</Text>
      </Pressable>

      <Pressable
        style={[commonStyles.button, commonStyles.buttonLg, { backgroundColor: colors.accent, opacity: subiendo ? 0.7 : 1 }]}
        onPress={subir}
        disabled={subiendo}
      >
        <Text style={[commonStyles.buttonText, { color: '#0b0b0b' }]}>
          {subiendo ? 'Subiendo...' : 'Subir foto'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
