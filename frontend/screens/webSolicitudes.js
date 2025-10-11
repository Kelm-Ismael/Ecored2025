import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext.js';
import { commonStyles, webMainStyles, webNuevoUsuario } from '../styles/styles';
import WebSidebar from '../components/WebSidebar.js';
import { DEFAULT_ID_LOCACION } from '../config/constants.js';
import { useEffect, useState, useContext } from 'react';
import { BASE_URL } from '../config/api.js';
import { formatearFecha } from '../utils/formatearFecha.js';

export default function WebSolicitudes({ role, navigation }) {
    const { user, userRole, authLoading, userToken } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [solicitudes, setSolicitudes] = useState([]);
    const [detallesVisibles, setDetallesVisibles] = useState({});
    const [estado, SetEstado] = useState('aceptado');

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const res = await fetch(`${BASE_URL}/escuela/solicitudesPorEstado`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    },
                    body: JSON.stringify({ id_escuela: user?.referencia?.id, estado })
                });

                if (!res.ok) throw new Error('Error al obtener solicitudes');

                const data = await res.json();
                setSolicitudes(data);
                console.log('solicitudes por estado: ', solicitudes);
            } catch (err) {
                console.error('Error al obtener solicitudes:', err);
            }
        };

        if (!authLoading && userToken) {
            fetchSolicitudes();
        }

    }, [authLoading, userToken, user, estado]);

    const estadoTexto = {
        aceptado: 'aceptadas',
        rechazado: 'rechazadas'
    }[estado] || 'verificadas';
    
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.webMainContainer}>
                <View style={commonStyles.webSidebar}>
                    <WebSidebar />
                </View>
                <View style={commonStyles.webContent}>
                    <View style={commonStyles.container}>
                        <Text style={commonStyles.title}>Solicitudes verificadas</Text>
                        <View style={[commonStyles.row, { justifyContent: 'center'}]}>
                            <TouchableOpacity 
                                onPress={() => SetEstado('aceptado')}
                                style={webMainStyles.button}
                            >
                                <Text style={webMainStyles.buttonText}>Aceptadas</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => SetEstado('rechazado')}
                                style={webMainStyles.button}
                            >
                                <Text style={webMainStyles.buttonText}>Rechazadas</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity 
                                onPress={() => SetEstado('pendiente')}
                                style={webMainStyles.button}
                            >
                                <Text style={webMainStyles.buttonText}>Pendientes</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={commonStyles.accentContainerTablas}>
                            {solicitudes.length === 0 ? (
                                <Text style={{ alignSelf: 'center', fontSize: 16 }}>No hay solicitudes {estadoTexto}.</Text>
                            ) : (
                                <View style={{ padding: 10 }}>
                                    <View style={commonStyles.webCabeceraTabla}>
                                        <Text style={{ flex: 1, fontWeight: 'bold' }}>ID</Text>
                                        <Text style={{ flex: 3, fontWeight: 'bold' }}>Usuario</Text>
                                        <Text style={{ flex: 2, fontWeight: 'bold' }}>Estado</Text>
                                        <Text style={{ flex: 2, fontWeight: 'bold' }}>Fecha de solicitud</Text>
                                        <Text style={{ flex: 2, fontWeight: 'bold' }}>Fecha de verificación</Text>
                                        <Text style={{ flex: 3, fontWeight: 'bold' }}>Notas</Text>
                                    </View>

                                    {solicitudes.map((solicitud) => (
                                        <View key={solicitud.id}>
                                            <View style={commonStyles.webRowsTabla}>
                                                <Text style={{ flex: 1 }}>{solicitud.id}</Text>
                                                <Text style={{ flex: 3 }}>{solicitud.nombre_usuario || 'Desconocido'}</Text>
                                                <Text style={{ flex: 2 }}>{solicitud.estado}</Text>
                                                <Text style={{ flex: 2 }}>{formatearFecha(solicitud.fecha_solicitud)}</Text>
                                                <Text style={{ flex: 2 }}>{formatearFecha(solicitud.fecha_verificacion)}</Text>
                                                <Text style={{ flex: 3 }}>{solicitud.notas || 'Sin notas'}</Text>
                                            </View>
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