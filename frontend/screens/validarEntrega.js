import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles } from '../styles/styles';
import { BASE_URL } from '../config/api';

export default function ScreenValidarEntrega({ route, navigation }) {
    const { data } = route.params || {};
    const [sending, setSending] = useState(false);
    console.log('📥 Params recibidos:', route.params);
    console.log('📥 Data:', data);

    if (!data) {
        return (
            <SafeAreaView style={commonStyles.safeArea}>
                <View style={commonStyles.container}>
                    <Text>No se proporcionaron datos para validar.</Text>
                    <Button title="Volver" onPress={() => navigation.goBack()} />
                </View>
            </SafeAreaView>
        );
    }

    // SIN PROBAR TODO CONFIRMAR ENTREGA
    const handleConfirmarEntrega = async () => {
        try {
            setSending(true);
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'Token no encontrado.');
                return;
            }
            
            const res = await fetch(`${BASE_URL}/entregas/nueva`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const raw = await res.text();
            console.log('📤 Respuesta del servidor:', raw);

            if (!res.ok) {
                throw new Error('Error al registrar entrega');
            }

            Alert.alert('Éxito', 'Entrega registrada correctamente');
            navigation.navigate('PerfilUsuario');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo registrar la entrega');
        } finally {
            setSending(false);
        }
    };

    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>Validar Entrega</Text>

                <View style={styles.card}>
                    <Text style={styles.label}>Entrega de residuos:</Text>
                    <Text>{data.fecha}</Text>

                    <Text style={styles.label}>Detalle:</Text>

                    {Array.isArray(data.detalle) && data.detalle.length > 0 ? (
                        data.detalle.map((item, index) => (
                        <View key={index} style={{ marginBottom: 10, flexDirection: 'row' }}>
                            <Text>• {item.tipo?.nombre || 'Tipo desconocido'}</Text>
                            <Text>  Cantidad: {item.cantidad} {item.tipo?.unidad || ''}</Text>
                            <Text>  Puntos: {item.puntos}</Text>
                        </View>
                        ))
                    ) : (
                        <Text>No hay detalles.</Text>
                    )}

                    <Text style={styles.label}>Puntos obtenidos:</Text>
                    <Text>{data.total_puntos}</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <Button
                        title="Confirmar entrega"
                        onPress={handleConfirmarEntrega}
                        disabled={sending}
                    />
                    <Button title="Cancelar" color="gray" onPress={() => navigation.goBack()} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
        marginVertical: 20,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    buttonsContainer: {
        gap: 12,
    },
});
