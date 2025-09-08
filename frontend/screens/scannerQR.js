import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFocusEffect } from '@react-navigation/native';

export default function ScannerQR() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, [])
  );

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert('QR escaneado', `Tipo: ${type}\nDato: ${data}`);
    // acá podés mandar "data" al backend para validar depósito
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No hay permiso para usar la cámara</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Text style={{ textAlign: 'center', marginTop: 20 }} onPress={() => setScanned(false)}>
          Tocar para escanear de nuevo
        </Text>
      )}
    </View>
  );
}
