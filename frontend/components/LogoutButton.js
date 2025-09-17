import React from 'react';
import { Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles } from '../styles/styles.js'

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
    <Button 
        style={commonStyles.button}
        title="Cerrar sesión" 
        onPress={handleLogout} 
    />
  );
};

export default LogoutButton;
