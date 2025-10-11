import React from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, perfilAppStyles } from '../styles/styles.js'

const LogoutButton = ({ onLogout }) => {
    const cerrarSesion = async () => {
        try {
            console.log("Confirmado logout");
            await AsyncStorage.removeItem('token');
            console.log("Token eliminado");
            onLogout();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleLogout = () => {
    console.log("handleLogout llamado");
    // web
    if (typeof window !== 'undefined' && window.confirm) {
        if (window.confirm("¿Estás seguro que quieres cerrar sesión?")) {
            cerrarSesion();
        }
    } else {
        // movil
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro que quieres cerrar sesión?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Sí", 
                    onPress: cerrarSesion
                }
            ]
        );
    }
};

  return (
    <TouchableOpacity style={perfilAppStyles.buttonEntrega} onPress={handleLogout}>
  <Text style={commonStyles.buttonText}>Cerrar sesión</Text>
</TouchableOpacity>
  );
};

export default LogoutButton;
