import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext.js';
import { commonStyles } from '../styles/styles';
import WebSidebar from '../components/WebSidebar.js';
import { DEFAULT_ID_LOCACION } from '../config/constants.js';
import { useEffect, useState, useContext } from 'react';
import { BASE_URL } from '../config/api.js';

export default function WebMain({ role }) {
    const { user, authLoading, userToken } = useContext(AuthContext);
    const [nombreLocacion, setNombreLocacion] = useState('');
    const [error, setError] = useState(null);
    // console.log('Usuario en WebMain:', user);
    const nombre = user?.referencia?.nombre || '';
    const apellido = user?.referencia?.apellido || '';

    //  useEffect(() => {
    //     const fetchNombreLocacion = async () => {
    //         try {
    //             const res = await fetch(`${BASE_URL}/locaciones/todas`, {
    //                 headers: {
    //                     Authorization: `Bearer ${userToken}`,
    //                 },
    //             });

    //             if (!res.ok) throw new Error('Error al obtener locaciones');

    //             const data = await res.json();
    //             const locacionEncontrada = data.find(loc => loc.id === DEFAULT_ID_LOCACION);

    //             if (locacionEncontrada) {
    //                 setNombreLocacion(locacionEncontrada.nombre);
    //             } else {
    //                 console.warn('Locación no encontrada');
    //                 setNombreLocacion('No encontrada');
    //             }
    //         } catch (err) {
    //             console.error('Error al obtener locación:', err);
    //             setError('No se pudo cargar la locación.');
    //         }
    //     };

    //     if (!authLoading && userToken) {
    //         fetchNombreLocacion();
    //     }
    // }, [authLoading, userToken]);
    
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.webMainContainer}>
                <View style={commonStyles.webSidebar}>
                    <WebSidebar />
                </View>
                <View style={commonStyles.webContent}>
                    <View style={commonStyles.container}>
                        <Text style={commonStyles.title}>Bienvenido, {nombre} {apellido}</Text>
                        <View style={commonStyles.accentContainer}>
                            <Text style={{fontSize: 18, marginVertical: 5}}>Localización actual: Ecopunto {error ? error : (nombreLocacion || 'Cargando...')}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}