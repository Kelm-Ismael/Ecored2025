import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Alert, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { commonStyles } from '../styles/styles';
import { BASE_URL } from '../config/api';
import LogoutButton from '../components/LogoutButton'

export default function ScreenPerfil({ onLogout }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

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
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>
                    Usuario
                </Text>
                <View style={commonStyles.container}>
                    <Text>{usuario.referencia.nombre} {usuario.referencia.apellido}</Text>
                    <Text>{usuario.tipo_usuario || 'No especificado'}</Text>
                    <Text>Nivel:</Text>
                    <Text>{usuario.nivel || 'No asignado'}</Text>
                      {/* despues conectara con crud usuario */}
                      {/* btn nueva entrega de reciclables */}

                    <Text>Puntos acumulados:</Text>
                        <View style={commonStyles.accentContainer}>
                            <Text>{usuario.puntos || 0} puntos</Text>
                        </View>
                      
                    <Text>Últimas transacciones:</Text>
                        <View style={commonStyles.accentContainer}>
                            <Text>tablas</Text>
                        </View>
                    <LogoutButton onLogout={onLogout} />
                </View>
            </View>
        </SafeAreaView>
    );
}