// screens/adminUsuarioEditar.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api';

const TIPOS = [
  { id:1, label:'ciudadano' },
  { id:2, label:'comercio' },
  { id:3, label:'escuela' },
  { id:4, label:'recuperador' },
  { id:5, label:'Administrador' },
];

export default function AdminUsuarioEditar({ route, navigation }) {
  const { id } = route.params || {};
  const isEdit = !!id;

  const [email, setEmail] = useState('');
  const [idTipo, setIdTipo] = useState(1);
  const [estado, setEstado] = useState(1);
  const [password, setPassword] = useState(''); // solo para crear
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!isEdit) return;
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/api/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const u = await res.json().catch(() => ({}));
        if (!res.ok) return Alert.alert('Error', u?.error || 'No se pudo cargar');
        setEmail(u.email || '');
        setIdTipo(Number(u.id_tipo_usuario) || 1);
        setEstado(Number(u.estado) || 0);
      } catch {
        Alert.alert('Error', 'No se pudo conectar');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  const guardar = async () => {
    try {
      if (!email) return Alert.alert('Campos', 'Email requerido');
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      if (isEdit) {
        const body = { email, estado, id_tipo_usuario: idTipo };
        const res = await fetch(`${BASE_URL}/api/usuarios/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return Alert.alert('Error', data?.error || 'No se pudo actualizar');
        Alert.alert('OK', 'Usuario actualizado', [{ text: 'Aceptar', onPress: () => navigation.goBack() }]);
      } else {
        if (!password || password.length < 6) {
          return Alert.alert('Campos', 'Contraseña mínima de 6 caracteres para crear');
        }
        const res = await fetch(`${BASE_URL}/api/usuarios`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, contrasenia: password, id_tipo_usuario: idTipo }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return Alert.alert('Error', data?.error || 'No se pudo crear');
        Alert.alert('OK', 'Usuario creado', [{ text: 'Aceptar', onPress: () => navigation.goBack() }]);
      }
    } catch {
      Alert.alert('Error', 'No se pudo conectar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>{isEdit ? 'Editar usuario' : 'Nuevo usuario'}</Text>

      <TextInput
        style={[commonStyles.input, commonStyles.inputLg]}
        placeholder="Email"
        placeholderTextColor={colors.placeholder}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Tipo simple como input rápido; si querés chips/selector, lo cambiás */}
      <Text style={commonStyles.label}>Tipo de usuario</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
        {TIPOS.map(t => (
          <Pressable
            key={t.id}
            onPress={() => setIdTipo(t.id)}
            style={[
              commonStyles.chip,
              { backgroundColor: idTipo === t.id ? colors.primary : colors.accent, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
            ]}
          >
            <Text style={{ color: idTipo === t.id ? '#fff' : colors.primary900, fontWeight: '800' }}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        style={[commonStyles.input, commonStyles.inputLg]}
        placeholder="Estado (1 activo / 0 inactivo)"
        placeholderTextColor={colors.placeholder}
        value={String(estado)}
        onChangeText={(v) => setEstado(Number(v) || 0)}
      />

      {!isEdit && (
        <TextInput
          style={[commonStyles.input, commonStyles.inputLg]}
          placeholder="Contraseña inicial (crear)"
          placeholderTextColor={colors.placeholder}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      )}

      <Pressable
        style={[commonStyles.button, commonStyles.buttonLg, { opacity: loading ? 0.7 : 1 }]}
        onPress={guardar}
        disabled={loading}
      >
        <Text style={commonStyles.buttonText}>{loading ? 'Guardando...' : 'Guardar'}</Text>
      </Pressable>
    </View>
  );
}
