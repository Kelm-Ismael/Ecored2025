import React, { useContext } from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { commonStyles } from '../styles/styles';
import { AuthContext } from '../context/AuthContext';

export default function WebLogoutButton() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    if (typeof window !== 'undefined' && window.confirm) {
      if (window.confirm("¿Estás seguro que querés cerrar sesión?")) {
        logout();
      }
    } else {
      Alert.alert(
        "Cerrar sesión",
        "¿Estás seguro que querés cerrar sesión?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Sí", onPress: logout }
        ]
      );
    }
  };

  return (
    <TouchableOpacity
      style={commonStyles.perfilButtonLogout}
      onPress={handleLogout}
    >
      <Text style={commonStyles.buttonText}>Cerrar sesión</Text>
    </TouchableOpacity>
  );
}
