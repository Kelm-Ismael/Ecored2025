// screens/ScannerQR.js
import React, { useState, useCallback } from 'react';
import { View, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/api';
import { colors, commonStyles } from '../styles/styles';

const QR_ENDPOINT = '/api/qr/scan';

export default function ScannerQR() {
  const navigation = useNavigation();
  const route = useRoute();

  // Si venís desde otra pantalla, podés pasar parámetros opcionales:
  // navigation.navigate('ScannerQR', { id_ecopunto: 3, tipo_material: 'plástico', peso: 2.3 })
  const preset = route?.params || {};
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [sending, setSending] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Sesión requerida', 'Debes iniciar sesión para usar el escáner.', [
            { text: 'OK', onPress: () => navigation.replace('Login') },
          ]);
          return;
        }
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, [navigation])
  );

  const handleBarCodeScanned = async ({ type, data }) => {
    if (sending) return;
    setScanned(true);
    setSending(true);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Sesión requerida', 'Inicia sesión nuevamente.', [
          { text: 'OK', onPress: () => navigation.replace('Login') },
        ]);
        return;
      }

      // Build payload con opcionales si existen
      const payload = {
        code: data,
        type,
        ...(preset.id_ecopunto != null ? { id_ecopunto: preset.id_ecopunto } : {}),
        ...(preset.tipo_material ? { tipo_material: preset.tipo_material } : {}),
        ...(preset.peso != null ? { peso: preset.peso } : {}),
      };

      const res = await fetch(`${BASE_URL}${QR_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const raw = await res.text();
      let json;
      try { json = JSON.parse(raw); } catch { json = { raw }; }

      console.log('[QR] POST result:', res.status, json);

      if (res.status === 401 || res.status === 403) {
        Alert.alert('Sesión vencida', 'Vuelve a iniciar sesión.', [
          { text: 'OK', onPress: () => navigation.replace('Login') },
        ]);
        return;
      }

      if (!res.ok) {
        const msg = json?.error || json?.message || json?.raw || `Error (HTTP ${res.status})`;
        Alert.alert('No se pudo validar el QR', msg);
        return;
      }

      // Mostrar datos útiles
      const titulo = json?.titulo || 'QR válido';
      const detalle = [
        json?.mensaje,
        json?.puntos != null ? `Puntos obtenidos: ${json.puntos}` : null,
        json?.total_actual != null ? `Total acumulado: ${json.total_actual}` : null,
        json?.detalle?.ecopunto_nombre ? `Ecopunto: ${json.detalle.ecopunto_nombre}` : null,
        json?.detalle?.tipo_material ? `Material: ${json.detalle.tipo_material}` : null,
        json?.detalle?.peso != null ? `Peso: ${json.detalle.peso} kg` : null,
      ]
        .filter(Boolean)
        .join('\n');

      Alert.alert(titulo, detalle || `Tipo: ${type}\nDato: ${data}`);
    } catch (err) {
      console.error('[QR] POST error:', err);
      Alert.alert('Error de red', 'No se pudo conectar al servidor.');
    } finally {
      setSending(false);
    }
  };

  if (hasPermission === null) {
    return <Text style={[commonStyles.body, { padding: 16 }]}>Solicitando permiso de cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text style={[commonStyles.body, { padding: 16 }]}>No hay permiso para usar la cámara</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Overlay UI */}
      <View style={styles.overlay}>
        <Text style={styles.overlayTitle}>Apunta al código QR</Text>
        <Text style={styles.overlayHint}>Se escaneará automáticamente</Text>

        {sending && (
          <View style={styles.sending}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.sendingText}>Validando...</Text>
          </View>
        )}

        {scanned && !sending && (
          <Text style={styles.rescan} onPress={() => setScanned(false)}>
            Tocar aquí para escanear de nuevo
          </Text>
        )}
      </View>

      {/* Marco visual */}
      <View pointerEvents="none" style={styles.frame}>
        <View style={[styles.corner, styles.tl]} />
        <View style={[styles.corner, styles.tr]} />
        <View style={[styles.corner, styles.bl]} />
        <View style={[styles.corner, styles.br]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  overlayTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  overlayHint: {
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  sending: {
    marginTop: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sendingText: { color: '#fff', fontWeight: '700' },
  rescan: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
  frame: {
    position: 'absolute',
    left: '10%',
    right: '10%',
    top: '22%',
    bottom: '38%',
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#fff',
  },
  tl: { top: 0, left: 0, borderLeftWidth: 4, borderTopWidth: 4, borderRadius: 6 },
  tr: { top: 0, right: 0, borderRightWidth: 4, borderTopWidth: 4, borderRadius: 6 },
  bl: { bottom: 0, left: 0, borderLeftWidth: 4, borderBottomWidth: 4, borderRadius: 6 },
  br: { bottom: 0, right: 0, borderRightWidth: 4, borderBottomWidth: 4, borderRadius: 6 },
});
