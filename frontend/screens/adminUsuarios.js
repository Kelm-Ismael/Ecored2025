// screens/adminUsuarios.js
import React, { useCallback, useState } from 'react';
import { View, Text, Pressable, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api';

const tipoNombre = (idTipo) => {
  const m = {1:'ciudadano',2:'comercio',3:'escuela',4:'recuperador',5:'Administrador'};
  return m[Number(idTipo)] || 'ciudadano';
};

export default function AdminUsuarios() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ([]));
      if (!res.ok) {
        Alert.alert('Error', data?.error || 'No se pudo cargar usuarios');
        return;
      }
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      Alert.alert('Error', 'No se pudo conectar al servidor');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const borrar = async (id) => {
    Alert.alert('Eliminar', '¿Seguro que querés eliminar este usuario?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const res = await fetch(`${BASE_URL}/api/usuarios/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok) return Alert.alert('Error', data?.error || 'No se pudo eliminar');
          load();
        } catch {
          Alert.alert('Error', 'No se pudo conectar al servidor');
        }
      } },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={[commonStyles.card, { marginBottom: 10, flexDirection:'row', alignItems:'center' }]}>
      <View style={{ flex: 1 }}>
        <Text style={commonStyles.listTitle}>{item.email}</Text>
        <Text style={commonStyles.listSubtitle}>
          {tipoNombre(item.id_tipo_usuario)} • Estado: {item.estado ? 'Activo' : 'Inactivo'} {item.is_super_admin ? '• SuperAdmin' : ''}
        </Text>
      </View>
      <Pressable onPress={() => navigation.navigate('AdminUsuarioEditar', { id: item.id })} style={{ marginRight: 10 }}>
        <Ionicons name="create-outline" size={22} color={colors.primary} />
      </Pressable>
      <Pressable onPress={() => borrar(item.id)}>
        <Ionicons name="trash-outline" size={22} color={colors.danger} />
      </Pressable>
    </View>
  );

  return (
    <View style={[commonStyles.container, { paddingTop: 12 }]}>
      <Text style={commonStyles.title}>Usuarios</Text>
      <Text style={commonStyles.subtitle}>Crear, editar y cambiar tipos / estados.</Text>

      <Pressable
        style={[commonStyles.button, { marginVertical: 10 }]}
        onPress={() => navigation.navigate('AdminUsuarioEditar', { id: null })}
      >
        <Text style={commonStyles.buttonText}>Crear usuario</Text>
      </Pressable>

      <FlatList
        data={items}
        keyExtractor={(x) => String(x.id)}
        renderItem={renderItem}
        onRefresh={load}
        refreshing={loading}
        ListEmptyComponent={!loading ? <Text style={commonStyles.body}>No hay usuarios.</Text> : null}
      />
    </View>
  );
}
