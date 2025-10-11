import { useContext, useState, useEffect } from 'react';
import { Alert, View, Text, TextInput, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import { commonStyles, beneficiosAppStyles } from '../styles/styles';
import { BASE_URL } from '../config/api';

export default function ScreenBuscarEscuela() {
    const route = useRoute();
    const { id_usuario } = route.params || {};
    
    const [escuelas, setEscuelas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    
    const navigation = useNavigation();
    
    useEffect(() => {
        const fetchEscuelas = async () => {
        try {
            const response = await fetch(`${BASE_URL}/escuela/todas`);
            if (!response.ok) {
            throw new Error('Error al obtener las escuelas');
            }

            const data = await response.json();
            setEscuelas(data);
        } catch (err) {
            setError(err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
        };

        fetchEscuelas();
    }, []);

    const renderEscuela = ({ item }) => (
        <View style={beneficiosAppStyles.card}>
            <Text style={beneficiosAppStyles.title}>{item.nombre}</Text>
            <View style={beneficiosAppStyles.row}>
                <Text style={beneficiosAppStyles.itemTipoYPts}>
                Puntos acumulados: {item.puntos_acumulados}
                </Text>
                <TouchableOpacity
                    onPress={() => solicitarAsociacion(item.id)}
                    style={beneficiosAppStyles.itemBoton}
                >
                <Text style={beneficiosAppStyles.canjearBtnText}>Solicitar asociación</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const escuelasFiltradas = escuelas.filter((item) =>
        (item.nombre || '').toLowerCase().includes(search.toLowerCase())
    );

    const solicitarAsociacion = (escuelaId) => {
        Alert.alert(
            'Confirmar solicitud',
            'Si te asociás a una escuela, pasarás a convertirte en usuario alumno. Los puntos que recaudes se sumarán a los tuyos y a los de tu escuela (siempre y cuando la escuela acepte tu solicitud). Esto puede realizarse una única vez. ¿Querés continuar con la solicitud?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        try {
                            const response = await fetch(`${BASE_URL}/escuela/vinculacion`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    id_institucion: escuelaId,
                                    id_usuario: id_usuario
                                })
                            });

                            const data = await response.json();

                            if (!response.ok) {
                                throw new Error(data.error || 'Error al enviar solicitud');
                            }

                            Alert.alert(
                                'Solicitud enviada',
                                'La escuela debe aprobar tu solicitud para que se confirme la asociación.',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => navigation.navigate('PerfilUsuario')
                                    }
                                ]
                            );
                        } catch (err) {
                            console.error('❌ Error en solicitud:', err);
                            Alert.alert('Error', err.message || 'No se pudo enviar la solicitud');
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={commonStyles.container}>
            {/* <Text style={beneficiosAppStyles.title}>Escuelas adheridas</Text> */}
            <View style={beneficiosAppStyles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="Buscar escuela..."
                    value={search}
                    onChangeText={setSearch}
                    style={beneficiosAppStyles.searchInput}
                />
            </View>

            <View style={beneficiosAppStyles.accentContainer}>
                {loading && <ActivityIndicator size="large" color="#000" />}
                {error && <Text style={{ color: 'red' }}>{error}</Text>}

                {!loading && !error && (
                    <View>
                        <FlatList
                            data={escuelasFiltradas}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderEscuela}
                            />
                    </View>
                )}
            </View>
        </View>
    );
}