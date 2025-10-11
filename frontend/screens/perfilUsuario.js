import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { commonStyles, perfilAppStyles } from '../styles/styles';
import { BASE_URL } from '../config/api';
import LogoutButton from '../components/LogoutButton'
import { formatearFecha } from '../utils/formatearFecha';

export default function ScreenPerfil({ onLogout }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [transacciones, setTransacciones] = useState([]);
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
                
                const transaccionesRes = await fetch(`${BASE_URL}/entregas/ultimas`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const rawTransacciones = await transaccionesRes.text();
                console.log('🔍 Respuesta cruda /ultimas:', rawTransacciones);

                if (!transaccionesRes.ok) throw new Error('No se pudieron cargar las transacciones');

                let transaccionesData;
                try {
                    transaccionesData = JSON.parse(rawTransacciones);
                } catch (e) {
                    console.error('❌ No se pudo parsear la respuesta como JSON:', e.message);
                    throw new Error('Respuesta inválida del servidor al obtener transacciones');
                }

                setTransacciones(transaccionesData);
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
        <View style={perfilAppStyles.containerNoPadding}>
            <View style={perfilAppStyles.perfilContainer}>
                <View style={perfilAppStyles.perfilRow}>
                    <View style={perfilAppStyles.box70}>
                        <Text style={perfilAppStyles.perfilNombre}>{usuario.referencia.nombre} {usuario.referencia.apellido}</Text>
                        <Text style={perfilAppStyles.perfilRol}>{usuario.tipo_usuario || 'No especificado'}</Text>
                    </View>
                    <View style={perfilAppStyles.box30}>
                        {/* <Text style={perfilAppStyles.perfilNivelTag}>Nivel:</Text> */}
                        <View style={perfilAppStyles.perfilNivel}>
                            <Text style={perfilAppStyles.perfilNivelText}>{usuario.nivel || '0'}</Text>
                        </View>
                        <Text style={perfilAppStyles.perfilNivelTag}>No asignado</Text>
                    </View>
                </View>
            </View>
            <View style={perfilAppStyles.containerPuntos}>
                <Text style={perfilAppStyles.perfilTitulo}>Puntos acumulados:</Text>
                <View style={perfilAppStyles.perfilPuntos}>
                    <Text style={perfilAppStyles.perfilPuntosTexto}>{usuario.puntos_acumulados || 0} puntos</Text>
                </View>
            </View>
            
            <View style={perfilAppStyles.containerEntregas}>
                <Text style={perfilAppStyles.perfilTitulo}>Últimas transacciones:</Text>
                <View style={perfilAppStyles.accentContainerEntregas}>
                    <View style={perfilAppStyles.cabeceraEntregas}>
                        <Text style={perfilAppStyles.cabeceraTexto}>Fecha</Text>
                        <Text style={perfilAppStyles.cabeceraTexto}>Locacion</Text>
                        <Text style={perfilAppStyles.cabeceraTexto}>Tipo</Text>
                        <Text style={perfilAppStyles.cabeceraTexto}>Receptor</Text>
                    </View>
                    {transacciones.length === 0 ? (
                        <Text style={perfilAppStyles.cabeceraTexto}>No hay transacciones recientes.</Text>
                    ) : (
                        transacciones.map((entrega, index) => (
                            <View key={index} style={perfilAppStyles.rowEntregas}>
                                <Text style={perfilAppStyles.rowEntregasTexto}>{formatearFecha(entrega.fecha_hora)}</Text>
                                <Text style={perfilAppStyles.rowEntregasTexto}>{entrega.nombre_locacion}</Text>
                                <Text style={perfilAppStyles.rowEntregasTexto}>{entrega.tipo_locacion}</Text>
                                <Text style={perfilAppStyles.rowEntregasTexto}>{entrega.nombre_receptor}</Text>
                            </View>
                        ))
                    )}
                </View>
            </View>
            <View style={perfilAppStyles.containerButtons}>
                <View style={perfilAppStyles.buttonEntrega}>
                    <TouchableOpacity
                        style={perfilAppStyles.buttonEntrega}
                        onPress={() => navigation.navigate('Scanner')}
                    >
                        <Text style={commonStyles.buttonText}>Nueva entrega</Text>
                    </TouchableOpacity>
                </View>
                <View style={perfilAppStyles.buttonEntrega}>
                    <LogoutButton onLogout={onLogout} />
                </View>                        
            </View>
        </View>
    );
}