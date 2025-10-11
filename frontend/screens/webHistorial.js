import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { commonStyles } from '../styles/styles';
import WebSidebar from '../components/WebSidebar';
import { BASE_URL } from '../config/api';
import { DEFAULT_ID_LOCACION } from '../config/constants';
import { AuthContext } from '../context/AuthContext';
import { formatearFecha } from '../utils/formatearFecha';

export default function WebHistorial() {
    const navigation = useNavigation();
    const { userId, userRole, loading: authLoading, userToken } = useContext(AuthContext);

    const [entregas, setEntregas] = useState([]);
    const [locacion, setLocacion] = useState(DEFAULT_ID_LOCACION);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [detallesVisibles, setDetallesVisibles] = useState({});
    const [detallesPorEntrega, setDetallesPorEntrega] = useState({});

    const { nombreLocacion, locacionError } = useContext(AuthContext);

    useEffect(() => {
        if (!authLoading) {
            const rolesAutorizados = ['superadmin', 'administrador', 'empleado', 'escuela'];
            if (!rolesAutorizados.includes(userRole?.toLowerCase())) {
                navigation.navigate('WebMain');
            }
        }
    }, [authLoading, userRole]);

    useEffect(() => {
        const fetchEntregas = async () => {
            try {
                const res = await fetch(`${BASE_URL}/entregas/ultimas/locacion?id_locacion=${locacion}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                if (!res.ok) throw new Error('Error al obtener entregas');

                const data = await res.json();
                setEntregas(data);
            } catch (err) {
                console.error('Error cargando entregas:', err);
                setError('No se pudieron cargar las entregas.');
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading && userToken) {
            fetchEntregas();
        }
    }, [authLoading, userToken, locacion]);

     const toggleDetalles = async (id_entrega) => {
        const yaVisible = detallesVisibles[id_entrega];

        if (yaVisible) {
            // Ocultar si ya estaba abierto
            setDetallesVisibles(prev => ({ ...prev, [id_entrega]: false }));
            return;
        }

        // Si los detalles ya fueron cargados, solo mostrarlos
        if (detallesPorEntrega[id_entrega]) {
            setDetallesVisibles(prev => ({ ...prev, [id_entrega]: true }));
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/entregas/detalles?id_entrega=${id_entrega}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (!res.ok) throw new Error('No se pudieron obtener los detalles.');

            const data = await res.json();

            // Guardar y mostrar
            setDetallesPorEntrega(prev => ({ ...prev, [id_entrega]: data }));
            setDetallesVisibles(prev => ({ ...prev, [id_entrega]: true }));
        } catch (err) {
            console.error('Error obteniendo detalles:', err);
        }
    };

    if (authLoading || loading) {
        return (
            <SafeAreaView style={commonStyles.safeArea}>
                <View style={commonStyles.container}>
                    <Text>Cargando...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.webMainContainer}>
                <View style={commonStyles.webSidebar}>
                    <WebSidebar />
                </View>
                <View style={commonStyles.webContent}>
                    <View style={commonStyles.container}>
                        <Text style={commonStyles.title}>Historial de Entregas en Ecopunto {locacionError ? 'Error' : (nombreLocacion || '...')}</Text>
                        <View style={commonStyles.accentContainer}>
                            {error ? (
                                <Text style={{ color: 'red' }}>{error}</Text>
                            ) : entregas.length === 0 ? (
                                <Text>No hay entregas registradas.</Text>
                            ) : (
                                <View style={{ padding: 10 }}>
                                    {/* Cabecera de la tabla */}
                                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 5 }}>
                                        <Text style={{ flex: 1, fontWeight: 'bold' }}>ID</Text>
                                        <Text style={{ flex: 2, fontWeight: 'bold' }}>Fecha</Text>
                                        <Text style={{ flex: 2, fontWeight: 'bold' }}>Usuario</Text>
                                        <Text style={{ flex: 2, fontWeight: 'bold' }}>Receptor</Text>
                                        <Text style={{ flex: 1, fontWeight: 'bold' }}>Detalles</Text>
                                    </View>

                                    {/* Filas */}
                                    {entregas.map((entrega) => (
                                        <View key={entrega.id}>
                                            <View style={{ flexDirection: 'row', paddingVertical: 5, borderBottomWidth: 0.5 }}>
                                                <Text style={{ flex: 1 }}>{entrega.id}</Text>
                                                <Text style={{ flex: 2 }}>{formatearFecha(entrega.fecha_hora)}</Text>
                                                <Text style={{ flex: 2 }}>{entrega.nombre_usuario || entrega.id_usuario}</Text>
                                                <Text style={{ flex: 2 }}>{entrega.nombre_receptor || entrega.id_receptor}</Text>
                                                <TouchableOpacity
                                                    style={{ flex: 1 }}
                                                    onPress={() => toggleDetalles(entrega.id)}
                                                >
                                                    <Text style={{ color: '#007bff' }}>
                                                        {detallesVisibles[entrega.id] ? 'Ocultar' : 'Ver'}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                            {/* Acordeón */}
                                            {/* {detallesVisibles[entrega.id] && (
                                                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                                    {detallesPorEntrega[entrega.id]?.length > 0 ? (
                                                        detallesPorEntrega[entrega.id].map((item, index) => (
                                                            <View key={index} style={{ paddingVertical: 2, paddingHorizontal: 10 }}>
                                                                <Text>  [{item.id}] -- {item.nombre}: {item.cantidad} {item.unidad} -- {item.puntos} pts</Text>
                                                            </View>
                                                        ))
                                                    ) : (
                                                        <Text style={{ fontStyle: 'italic', marginLeft: 10 }}>Sin detalles</Text>
                                                    )}
                                                </View>
                                            )} */}
                                            {detallesVisibles[entrega.id] && (//---------NUEVA TABLA---------
                                            <View style={{ marginBottom: 10 }}>
                                                {detallesPorEntrega[entrega.id]?.length > 0 ? (
                                                <View style={{ borderWidth: 1, borderColor: '#D8F291', overflow: 'hidden' }}>
                                                    {/* Encabezado de la tabla */}
                                                    <View style={{ flexDirection: 'row', backgroundColor: '#D8F291', paddingVertical: 4 }}>
                                                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>ID</Text>
                                                    <Text style={{ flex: 2, fontWeight: 'bold', textAlign: 'center' }}>Material</Text>
                                                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Cantidad</Text>
                                                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Unidad</Text>
                                                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Puntos</Text>
                                                    </View>
                                                    {/* Filas de datos */}
                                                    {detallesPorEntrega[entrega.id].map((item, index) => (
                                                    <View
                                                        key={index}
                                                        style={{
                                                        flexDirection: 'row',
                                                        backgroundColor: index % 2 === 0 ? '#ffffffff' : '#f7f7f7',
                                                        paddingVertical: 4,
                                                        }}
                                                    >
                                                        <Text style={{ flex: 1, textAlign: 'center' }}>{item.id}</Text>
                                                        <Text style={{ flex: 2, textAlign: 'center' }}>{item.nombre}</Text>
                                                        <Text style={{ flex: 1, textAlign: 'center' }}>{item.cantidad}</Text>
                                                        <Text style={{ flex: 1, textAlign: 'center' }}>{item.unidad}</Text>
                                                        <Text style={{ flex: 1, textAlign: 'center' }}>{item.puntos}</Text>
                                                    </View>
                                                    ))}
                                                </View>
                                                ) : (
                                                <Text style={{ fontStyle: 'italic', marginLeft: 10 }}>Sin detalles</Text>
                                                )}
                                            </View>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
