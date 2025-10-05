import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { commonStyles, perfilAppStyles } from '../styles/styles';
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
                            <Text style={perfilAppStyles.perfilNombre}>{perfil.referencia.nombre} {perfil.referencia.apellido}</Text>
                            <Text style={perfilAppStyles.perfilRol}> {perfil.tipo_usuario}</Text>
                            <View style={{ height: 2, backgroundColor: '#ccc', marginVertical: 10 }} />
                            <Text><Text style={{ fontWeight: 'bold' }}>Dni:</Text> {perfil.referencia.dni}</Text>
                            <Text><Text style={{ fontWeight: 'bold' }}>Email:</Text> {perfil.email}</Text>
                            <Text><Text style={{ fontWeight: 'bold' }}>Cuit/Cuil:</Text> {perfil.referencia.cuit_cuil || '-'}</Text>
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