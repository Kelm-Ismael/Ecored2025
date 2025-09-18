import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { commonStyles, scannerStyles } from '../styles/styles';

export default function ScreenScanner({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const cameraRef = useRef(null);

    if (!permission) {
        return <Text>Obteniendo permisos...</Text>;
    }

    if (!permission.granted) {
        return (
            <View style={scannerStyles.container}>
                <Text style={commonStyles.title}>No hay acceso a la cámara</Text>
                <Button title="Solicitar permiso" onPress={requestPermission} />
            </View>
        );
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log('✅ Código escaneado (raw):', data);

        let parsedData;
        try {
            parsedData = JSON.parse(data);
            console.log('📦 Datos parseados del QR:', parsedData);
        } catch (error) {
            console.error('❌ Error al parsear JSON del QR:', error);
            Alert.alert('Código QR inválido', 'No se pudo interpretar el contenido del QR.');
            setScanned(false); // Permitir escanear de nuevo
            return;
        }

        navigation.navigate('ValidarEntrega', { data: parsedData });
    };

    return (
        <SafeAreaView style={scannerStyles.safeArea}>
            <View style={scannerStyles.container}>
                <Text style={commonStyles.title}>
                    Escanear QR
                </Text>
                <View style={scannerStyles.accentContainer}>
                    <View style={{ flex: 1, width: '100%', overflow: 'hidden' }}>
                    <CameraView
                        ref={cameraRef}
                        style={{ flex: 1 }}
                        barcodeScannerSettings={{
                            barcodeTypes: ['qr'],
                        }}
                        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    />
                </View>

                    {scanned && (
                        <View style={styles.buttonContainer}>
                            <Button title="Escanear otro" onPress={() => setScanned(false)} />
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
});
