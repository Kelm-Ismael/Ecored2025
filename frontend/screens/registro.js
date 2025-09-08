

// // screens/registro.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Pressable, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { commonStyles } from '../styles/styles';
// import { BASE_URL } from '../config/api'; // o apiPost

// export default function Registro({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async () => {
//     console.log('Intentando registrar:', email);
//     try {
//       const res = await fetch(`${BASE_URL}/api/usuarios`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, contrasenia: password }),
//       });

//       const data = await res.json().catch(() => ({}));
//       console.log('Respuesta registro:', res.status, data);

//       if (res.ok && data?.token) {
//         await AsyncStorage.setItem('token', data.token);
//         navigation.replace('PerfilUsuario');
//       } else {
//         Alert.alert('Error', data?.error || 'No se pudo registrar');
//       }
//     } catch (err) {
//       console.error('Error fetch registro:', err);
//       Alert.alert('Error', 'No se pudo conectar al servidor');
//     }
//   };

//   return (
//     <View style={commonStyles.container}>
//       <Text style={commonStyles.title}>Registro</Text>

//       <TextInput
//         style={commonStyles.input}
//         placeholder="Correo"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />

//       <TextInput
//         style={commonStyles.input}
//         placeholder="Contraseña"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <Pressable
//         style={({ pressed }) => [
//           commonStyles.button,
//           { opacity: pressed ? 0.7 : 1 },
//         ]}
//         onPress={handleRegister}
//       >
//         <Text style={commonStyles.buttonText}>Registrarse</Text>
//       </Pressable>
//     </View>
//   );
// }


// screens/registro.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api';

const TIPOS = [
  { id: 1, label: 'ciudadano' },
  { id: 2, label: 'comercio' },
  { id: 3, label: 'escuela' },
  { id: 4, label: 'recuperador' },
  { id: 5, label: 'Administrador' },
];

function routeForTipo(tipo_usuario_string = '', id_tipo_usuario = null) {
  const t = String(tipo_usuario_string).toLowerCase();
  const id = Number(id_tipo_usuario) || null;

  if (id === 5 || t.includes('admin')) return 'PanelAdmin';
  if (id === 2 || t.includes('comercio')) return 'PanelComercio';
  if (id === 3 || t.includes('escuela')) return 'PanelEscuela';
  if (id === 4 || t.includes('recuperador')) return 'PanelRecuperador';
  return 'PanelCiudadano';
}

export default function Registro({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipoId, setTipoId] = useState(1);
  const [enviando, setEnviando] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) return Alert.alert('Campos', 'Completá email y contraseña.');
    try {
      setEnviando(true);
      const res = await fetch(`${BASE_URL}/api/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contrasenia: password, id_tipo_usuario: tipoId }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.token) {
        return Alert.alert('Error', data?.error || 'No se pudo registrar');
      }

      await AsyncStorage.setItem('token', data.token);

      // Traer perfil para saber tipo_usuario (string) y/o id
      const meRes = await fetch(`${BASE_URL}/api/usuarios/me`, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const me = await meRes.json().catch(() => ({}));

      const destino = routeForTipo(me?.tipo_usuario, me?.id_tipo_usuario);
      navigation.replace(destino);
    } catch (err) {
      console.error('Error registro:', err);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Registro</Text>

      <Text style={commonStyles.label}>Tipo de usuario</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
        {TIPOS.map(t => {
          const active = t.id === tipoId;
          return (
            <Pressable
              key={t.id}
              onPress={() => setTipoId(t.id)}
              style={[
                commonStyles.chip,
                {
                  backgroundColor: active ? colors.primary : colors.accent,
                  borderRadius: 999,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                },
              ]}
            >
              <Text style={{ color: active ? '#fff' : colors.primary900, fontWeight: '800' }}>
                {t.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TextInput
        style={[commonStyles.input, commonStyles.inputLg]}
        placeholder="Correo"
        placeholderTextColor={colors.placeholder}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={[commonStyles.input, commonStyles.inputLg]}
        placeholder="Contraseña"
        placeholderTextColor={colors.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        style={[commonStyles.button, commonStyles.buttonLg, { opacity: enviando ? 0.7 : 1 }]}
        onPress={handleRegister}
        disabled={enviando}
      >
        <Text style={commonStyles.buttonText}>{enviando ? 'Creando...' : 'Registrarse'}</Text>
      </Pressable>
    </View>
  );
}
