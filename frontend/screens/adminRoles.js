// screens/adminRoles.js
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api';

export default function AdminRoles() {
  const [allowAdminSignup, setAllowAdminSignup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/app-settings/public`);
        const j = await res.json();
        setAllowAdminSignup(!!j.allow_admin_self_signup);
      } catch {}
      setLoading(false);
    })();
  }, []);

  const guardar = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/app-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ allow_admin_self_signup: allowAdminSignup }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) return Alert.alert('Error', j?.error || 'No se pudo guardar');
      Alert.alert('Listo', 'Cambios guardados');
    } catch {
      Alert.alert('Error', 'No se pudo conectar');
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Roles & Permisos</Text>
      <Text style={commonStyles.subtitle}>Controlá si se permite registrarse como Administrador.</Text>

      <View style={[commonStyles.card, { marginTop: 12 }]}>
        <Text style={commonStyles.h2}>Políticas de registro</Text>
        <View style={commonStyles.between}>
          <Text style={commonStyles.body}>Permitir registrarse como Administrador</Text>
          <Switch
            value={allowAdminSignup}
            onValueChange={setAllowAdminSignup}
            thumbColor={allowAdminSignup ? colors.primary : '#ccc'}
            disabled={loading}
          />
        </View>

        <Pressable style={[commonStyles.button, { marginTop: 12, opacity: loading ? 0.7 : 1 }]} onPress={guardar} disabled={loading}>
          <Text style={commonStyles.buttonText}>Guardar cambios</Text>
        </Pressable>
      </View>
    </View>
  );
}
