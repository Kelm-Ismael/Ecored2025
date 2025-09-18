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
    );
}