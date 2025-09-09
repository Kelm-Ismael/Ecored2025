// screens/panelAdmin.js
import React, { useCallback, useState } from 'react';
import { View, Text, Pressable, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api';

export default function PanelAdmin() {
  const navigation = useNavigation();
  const [me, setMe] = useState(null);

  const fetchMe = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/usuarios/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setMe(data);
    } catch (e) {
      console.log('PanelAdmin /me error', e);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetchMe(); }, [fetchMe]));

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: colors.bgAlt }}>
      <Text style={[commonStyles.title, { marginBottom: 6 }]}>Panel Administrador</Text>
      <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>
        Gestión de usuarios, roles, beneficios, ecopuntos y reportes.
      </Text>

      {/* Perfil & seguridad */}
      <View style={[commonStyles.card, { marginBottom: 12 }]}>
        <Text style={commonStyles.h2}>Mi cuenta</Text>

        <Pressable style={commonStyles.listItem} onPress={() => navigation.navigate('EditarAvatar')}>
          <Ionicons name="image-outline" size={20} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.listTitle}>Cambiar foto de perfil</Text>
            <Text style={commonStyles.listSubtitle}>Actualizá tu avatar</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>

        <View style={{ height: 8 }} />

        <Pressable style={commonStyles.listItem} onPress={() => navigation.navigate('EditarPassword')}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.listTitle}>Cambiar contraseña</Text>
            <Text style={commonStyles.listSubtitle}>Recomendado periódicamente</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>

        <View style={{ height: 8 }} />

        <Pressable style={[commonStyles.listItem]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.listTitle, { color: colors.danger }]}>Cerrar sesión</Text>
            <Text style={commonStyles.listSubtitle}>Salir de tu cuenta</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>
      </View>

      {/* Usuarios & roles */}
      <View style={[commonStyles.card, { marginBottom: 12 }]}>
        <Text style={commonStyles.h2}>Usuarios & Permisos</Text>

        <Pressable style={commonStyles.listItem} onPress={() => navigation.navigate('AdminUsuarios')}>
          <Ionicons name="people-outline" size={20} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.listTitle}>Gestionar usuarios</Text>
            <Text style={commonStyles.listSubtitle}>Crear, editar, cambiar tipo (ciudadano, comercio, escuela, recuperador, administrador)</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>

        <View style={{ height: 8 }} />

        <Pressable style={commonStyles.listItem} onPress={() => navigation.navigate('AdminRoles')}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.listTitle}>Roles & políticas</Text>
            <Text style={commonStyles.listSubtitle}>
              Habilitar/restringir registro como administrador, otorgar/revocar admin, jerarquías
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>
      </View>

      {/* Otros módulos */}
      <View style={[commonStyles.card, { marginBottom: 12 }]}>
        <Text style={commonStyles.h2}>Beneficios & Ecopuntos</Text>

        <Pressable style={commonStyles.listItem} onPress={() => Alert.alert('Próximamente', 'Gestión de beneficios')}>
          <Ionicons name="gift-outline" size={20} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.listTitle}>Beneficios</Text>
            <Text style={commonStyles.listSubtitle}>ABM de beneficios y canjes</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>

        <View style={{ height: 8 }} />

        <Pressable style={commonStyles.listItem} onPress={() => Alert.alert('Próximamente', 'Gestión de ecopuntos')}>
          <Ionicons name="leaf-outline" size={20} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.listTitle}>Ecopuntos</Text>
            <Text style={commonStyles.listSubtitle}>ABM de ecopuntos y turnos</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>
      </View>

      {/* Reportes */}
      <View style={[commonStyles.card, { marginBottom: 24 }]}>
        <Text style={commonStyles.h2}>Reportes</Text>
        <Pressable style={commonStyles.listItem} onPress={() => Alert.alert('Próximamente', 'Reportes y métricas')}>
          <Ionicons name="stats-chart-outline" size={20} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.listTitle}>Métricas</Text>
            <Text style={commonStyles.listSubtitle}>Puntos, depósitos, rankings</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>
      </View>

      {/* Info del admin logueado */}
      {me && (
        <View style={commonStyles.card}>
          <Text style={commonStyles.h2}>Resumen</Text>
          <Text style={commonStyles.body}>Email: {me.email}</Text>
          <Text style={commonStyles.body}>Tipo: {me.tipo_usuario}</Text>
          <Text style={commonStyles.body}>Puntos: {me.puntos_acumulados ?? 0}</Text>
        </View>
      )}
    </ScrollView>
  );
}
