import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext.js';
import { commonStyles, webMainStyles, webNuevoUsuario } from '../styles/styles';
import WebSidebar from '../components/WebSidebar.js';
import { DEFAULT_ID_LOCACION } from '../config/constants.js';
import { useEffect, useState, useContext } from 'react';
import { BASE_URL } from '../config/api.js';

export default function WebMain({ role, navigation }) {
    const { user, userRole, authLoading, userToken } = useContext(AuthContext);
    const [nombreLocacion, setNombreLocacion] = useState('');
    const [error, setError] = useState(null);
    const [solicitudes, setSolicitudes] = useState([]);
    const [detallesVisibles, setDetallesVisibles] = useState({});
    const [notas, setNotas] = useState({});
    
    // console.log('Usuario en WebMain:', user);
    const nombre = user?.referencia?.nombre || '';
    const apellido = user?.referencia?.apellido || '';

    const normalizarRol = (rol) => (typeof rol === 'string' ? rol.toLowerCase() : '');
    const rolesAdmin = ['superadmin', 'administrador'];
    const puedeCrearUsuario = !authLoading && rolesAdmin.includes(normalizarRol(userRole));
    const esEscuela = !authLoading && normalizarRol(userRole) === 'escuela';
    const saludoUsuario = normalizarRol(userRole) !== 'escuela' ? `${nombre} ${apellido}` : '';

    useEffect(() => {
        const fetchNombreLocacion = async () => {
            try {
                if (esEscuela) {
                    const nombreEscuela = user?.referencia?.nombre;
                    if (nombreEscuela) {
                        setNombreLocacion(nombreEscuela);
                    } else {
                        setNombreLocacion('Escuela sin nombre');
                    }
                } else {
                    const res = await fetch(`${BASE_URL}/locaciones/todas`, {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    });

                    if (!res.ok) throw new Error('Error al obtener locaciones');

                    const data = await res.json();
                    const locacionEncontrada = data.find(loc => loc.id === DEFAULT_ID_LOCACION);

                    if (locacionEncontrada) {
                        setNombreLocacion(locacionEncontrada.nombre);
                    } else {
                        console.warn('Locación no encontrada');
                        setNombreLocacion('No encontrada');
                    }
                }
            } catch (err) {
                console.error('Error al obtener locación:', err);
                setError('No se pudo cargar la locación.');
            }
        };

        const fetchSolicitudesPendientes = async () => {
            try {
                const res = await fetch(`${BASE_URL}/escuela/solicitudes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    },
                    body: JSON.stringify({ id_escuela: user?.referencia?.id })
                });

                if (!res.ok) throw new Error('Error al obtener solicitudes');

                const data = await res.json();
                setSolicitudes(data);
            } catch (err) {
                console.error('Error al obtener solicitudes:', err);
            }
        };

        if (!authLoading && userToken && user) {
            fetchNombreLocacion();
        }

        if (!authLoading && userToken && esEscuela) {
            fetchSolicitudesPendientes();
        }

    }, [authLoading, userToken, user, esEscuela]);

    const toggleDetalles = (id) => {
        setDetallesVisibles(prev => ({
        ...prev,
        [id]: !prev[id],
        }));
    };

    // Función para aceptar solicitud y guardar notas
    const responderSolicitud = async (solicitud, nuevoEstado) => {
        console.log('🔍 solicitud:', solicitud);
        
        const respuesta = {
            id_usuario: solicitud.id_usuario,
            id_institucion: user?.referencia?.id,
            estado: nuevoEstado,
            notas: notas[solicitud.id] || '',
        };

        console.log('➡️ Enviando solicitud:', respuesta);
        try {
            const res = await fetch(`${BASE_URL}/escuela/actualizarSolicitud`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(respuesta),
            });

            if (!res.ok) throw new Error(`Error al actualizar la solicitud a ${nuevoEstado}`);

            setSolicitudes(prev => prev.filter(s => s.id !== solicitud.id));
            setDetallesVisibles(prev => ({ ...prev, [solicitud.id]: false }));
            
        } catch (error) {
            console.error(`❌ Error al actualizar solicitud a ${nuevoEstado}:`, error);
        }
    };
    
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.webMainContainer}>
                <View style={commonStyles.webSidebar}>
                    <WebSidebar />
                </View>
                <View style={commonStyles.webContent}>
                    <View style={commonStyles.container}>
                        <Text style={commonStyles.title}>Bienvenidx {saludoUsuario}</Text>

                        {/* <View style={commonStyles.accentContainer}> */}
                            <View style={commonStyles.row}>
                                <Text style={webNuevoUsuario.label}>Locación actual:</Text>
                                <Text style={commonStyles.textNormal}>{error ? error : (nombreLocacion || 'Cargando...')}</Text>
                            </View>
                            {puedeCrearUsuario && (
                                <TouchableOpacity
                                    style={webNuevoUsuario.button}
                                    onPress={() => navigation.navigate('NuevoUsuario')}
                                >
                                    <Text style={webNuevoUsuario.buttonText}>crear nuevo usuario</Text>
                                </TouchableOpacity>
                            )}
                            {esEscuela && (
                                <>
                                    <Text style={webMainStyles.subtitle}>Solicitudes pendientes</Text>
                                    <View style={commonStyles.accentContainerTablas}>
                                        {solicitudes.length === 0 ? (
                                            <Text style={{ marginTop: 10 }}>No hay solicitudes pendientes.</Text>
                                        ) : (
                                            <View style={{ padding: 10 }}>
                                                <View style={commonStyles.webCabeceraTabla}>
                                                    <Text style={{ flex: 1, fontWeight: 'bold' }}>ID</Text>
                                                    <Text style={{ flex: 3, fontWeight: 'bold' }}>Usuario</Text>
                                                    <Text style={{ flex: 2, fontWeight: 'bold' }}>Estado</Text>
                                                    <Text style={{ flex: 2, fontWeight: 'bold' }}>Fecha</Text>
                                                    <Text style={{ flex: 2, fontWeight: 'bold' }}>Verificar</Text>
                                                </View>

                                                {solicitudes.map((solicitud) => (
                                                    <View key={solicitud.id}>
                                                        <View style={commonStyles.webRowsTabla}>
                                                            <Text style={{ flex: 1 }}>{solicitud.id}</Text>
                                                            <Text style={{ flex: 3 }}>{solicitud.nombre_usuario || 'Desconocido'}</Text>
                                                            <Text style={{ flex: 2 }}>{solicitud.estado}</Text>
                                                            <Text style={{ flex: 2 }}>
                                                                {new Date(solicitud.fecha_solicitud).toLocaleDateString()}
                                                            </Text>
                                                            <TouchableOpacity
                                                                style={{ flex: 2, justifyContent: 'center' }}
                                                                onPress={() => toggleDetalles(solicitud.id)}
                                                            >
                                                                <Text style={{ color: '#00A887' }}>
                                                                    {detallesVisibles[solicitud.id] ? 'Ocultar' : 'Ver'}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        {detallesVisibles[solicitud.id] && (
                                                            <View style={webMainStyles.detalles}>
                                                                <View style={webMainStyles.detallesNotas}>
                                                                    <Text style={webMainStyles.textNotas}>Notas:</Text>
                                                                    <TextInput
                                                                        multiline
                                                                        style={webMainStyles.inputNotas}
                                                                        onChangeText={(text) =>
                                                                            setNotas((prev) => ({ ...prev, [solicitud.id]: text }))
                                                                        }
                                                                        placeholder="Agregar notas para la solicitud..."
                                                                    />
                                                                </View>
                                                                <View style={webMainStyles.detallesBtn}>
                                                                    <TouchableOpacity 
                                                                        onPress={() => responderSolicitud(solicitud, 'aceptado')}
                                                                        style={webMainStyles.button}
                                                                    >
                                                                        <Text style={webMainStyles.buttonText}>Aceptar</Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity 
                                                                        onPress={() => responderSolicitud(solicitud, 'rechazado')}
                                                                        style={webMainStyles.buttonRechazar}
                                                                    >
                                                                        <Text style={webMainStyles.buttonTextRechazar}>Rechazar</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        )}
                                                    </View>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                </>
                            )}
                        {/* </View> */}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}