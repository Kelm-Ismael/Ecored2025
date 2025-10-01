import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { commonStyles } from '../styles/styles';
import WebSidebar from '../components/WebSidebar';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../config/api';

export default function WebPerfil() {
    const { userId, userRole, userToken } = useContext(AuthContext);
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerfil = async () => {
        try {
            const res = await fetch(`${BASE_URL}/usuarios/perfil`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
            });

            if (!res.ok) throw new Error('No se pudo obtener el perfil');

            const data = await res.json();
            console.log('Perfil recibido:', data);
            setPerfil(data);
        } catch (error) {
            console.error('Error al cargar perfil:', error);
        } finally {
            setLoading(false);
        }
        };

        if (userToken) {
        fetchPerfil();
        }
    }, [userToken]);

    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.webMainContainer}>
                <View style={commonStyles.webSidebar}>
                    <WebSidebar />
                </View>
                <View style={commonStyles.webContent}>
                    <View style={commonStyles.webTitleContainer}>
                        <Text style={commonStyles.title}>
                            Perfil
                        </Text>
                    </View>
                    <View style={commonStyles.webAccentContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#000" />
                        ) : perfil ? (
                        <>
                            <Text style={commonStyles.perfilNombre}>{perfil.referencia.nombre} {perfil.referencia.apellido}</Text>
                            <Text style={commonStyles.perfilRol}> {perfil.tipo_usuario}</Text>
                            <View style={{ height: 2, backgroundColor: '#ccc', marginVertical: 10 }} />
                            <Text><Text style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 5 }}>Dni:</Text><Text style={{fontSize: 18, marginVertical: 5}}> {perfil.referencia.dni} </Text></Text>
                            <Text><Text style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 5 }}>Email:</Text><Text style={{fontSize: 18, marginVertical: 5}}> {perfil.email} </Text></Text>
                            <Text><Text style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 5 }}>Cuit/Cuil:</Text><Text style={{fontSize: 18, marginVertical: 5}}> {perfil.referencia.cuit_cuil || '-'} </Text></Text>
                        </>
                        ) : (
                            <Text>No se pudo cargar el perfil</Text>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}