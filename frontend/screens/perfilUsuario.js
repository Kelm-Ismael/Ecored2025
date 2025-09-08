// import React, { useEffect, useState } from 'react';
// import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { commonStyles } from '../styles/styles';

// export default function PerfilUsuario({ navigation }) {
//   const [usuario, setUsuario] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUsuario = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         navigation.replace('Login');
//         return;
//       }

//       const res = await fetch('http://192.168.0.5:3000/api/usuarios/me', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setUsuario(data);
//       } else {
//         Alert.alert('Error', data.error || 'Sesión inválida');
//         await AsyncStorage.removeItem('token');
//         navigation.replace('Login');
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error', 'No se pudo conectar al servidor');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsuario();
//   }, []);

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem('token');
//     navigation.replace('Login');
//   };

//   if (loading) {
//     return (
//       <View style={commonStyles.container}>
//         <ActivityIndicator size="large" color="#00A887" />
//       </View>
//     );
//   }

//   return (
//     <View style={commonStyles.container}>
//       <Text style={commonStyles.title}>Mi Perfil</Text>

//       {usuario ? (
//         <>
//           <Text style={commonStyles.subtitle}>Email: {usuario.email}</Text>

//           <Pressable
//             style={({ pressed }) => [
//               commonStyles.button,
//               { opacity: pressed ? 0.7 : 1, marginTop: 20 },
//             ]}
//             onPress={handleLogout}
//           >
//             <Text style={commonStyles.buttonText}>Cerrar Sesión</Text>
//           </Pressable>
//         </>
//       ) : (
//         <Text style={commonStyles.subtitle}>No se pudo cargar usuario</Text>
//       )}
//     </View>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { commonStyles } from '../styles/styles';

// export default function PerfilUsuario({ navigation }) {
//   const [usuario, setUsuario] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUsuario = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         navigation.replace('Login');
//         return;
//       }

//       const res = await fetch('http://192.168.0.7:3000/api/usuarios/me', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();
//       console.log('Perfil usuario:', res.status, data);

//       if (res.ok) {
//         setUsuario(data);
//       } else {
//         Alert.alert('Error', data.error || 'Sesión inválida');
//         await AsyncStorage.removeItem('token');
//         navigation.replace('Login');
//       }
//     } catch (err) {
//       console.error('Error fetch perfil:', err);
//       Alert.alert('Error', 'No se pudo conectar al servidor');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsuario();
//   }, []);

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem('token');
//     navigation.replace('Login');
//   };

//   if (loading) {
//     return (
//       <View style={commonStyles.container}>
//         <ActivityIndicator size="large" color="#00A887" />
//       </View>
//     );
//   }

//   return (
//     <View style={commonStyles.container}>
//       <Text style={commonStyles.title}>Mi Perfil</Text>

//       {usuario ? (
//         <>
//           <Text style={commonStyles.subtitle}>Email: {usuario.email}</Text>

//           <Pressable
//             style={({ pressed }) => [
//               commonStyles.button,
//               { opacity: pressed ? 0.7 : 1, marginTop: 20 },
//             ]}
//             onPress={handleLogout}
//           >
//             <Text style={commonStyles.buttonText}>Cerrar Sesión</Text>
//           </Pressable>
//         </>
//       ) : (
//         <Text style={commonStyles.subtitle}>No se pudo cargar usuario</Text>
//       )}
//     </View>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api'; // <— crea este archivo y exporta tu URL base

export default function PerfilUsuario({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subiendo, setSubiendo] = useState(false);
  const [pwdModal, setPwdModal] = useState(false);
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  async function getToken() {
    const t = await AsyncStorage.getItem('token');
    if (!t) {
      navigation.replace('Login');
      throw new Error('NO_TOKEN');
    }
    return t;
  }

  const fetchUsuario = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const res = await fetch(`${BASE_URL}/api/usuarios/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setUsuario(data);
      } else {
        Alert.alert('Sesión', data.error || 'Sesión inválida');
        await AsyncStorage.removeItem('token');
        navigation.replace('Login');
      }
    } catch (err) {
      if (err.message !== 'NO_TOKEN') {
        console.error('Error fetch perfil:', err);
        Alert.alert('Error', 'No se pudo conectar al servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  const pickImage = async () => {
    try {
      // pedir permisos
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permisos', 'Necesitamos acceso a la galería para cambiar tu foto.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const asset = result.assets[0];
      await uploadAvatar(asset.uri);
    } catch (e) {
      console.error('pickImage error', e);
      Alert.alert('Error', 'No se pudo abrir la galería.');
    }
  };

  const uploadAvatar = async (uri) => {
    try {
      setSubiendo(true);
      const token = await getToken();

      // RN necesita nombre y tipo en multipart
      const filename = uri.split('/').pop() || `avatar.jpg`;
      const ext = filename.split('.').pop()?.toLowerCase() || 'jpg';
      const mime =
        ext === 'png' ? 'image/png' :
        ext === 'webp' ? 'image/webp' :
        'image/jpeg';

      const form = new FormData();
      form.append('avatar', {
        uri,
        name: filename,
        type: mime,
      });

      const res = await fetch(`${BASE_URL}/api/usuarios/me/avatar`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: form, // ⚠️ NO pongas Content-Type; RN lo setea con boundary
      });

      const data = await res.json();
      if (!res.ok) {
        console.log('upload avatar fail', res.status, data);
        Alert.alert('Foto de perfil', data.error || 'No se pudo subir la foto.');
        return;
      }

      // backend devuelve { foto_url: '...' } o usuario actualizado
      const nuevaUrl = data.foto_url || data.usuario?.foto_url;
      setUsuario((prev) => ({ ...prev, foto_url: nuevaUrl }));
      Alert.alert('Listo', 'Tu foto fue actualizada.');
    } catch (e) {
      console.error('uploadAvatar error', e);
      Alert.alert('Error', 'No se pudo subir la imagen.');
    } finally {
      setSubiendo(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPwd || !newPwd || !confirmPwd) {
      Alert.alert('Campos incompletos', 'Completá todos los campos.');
      return;
    }
    if (newPwd.length < 6) {
      Alert.alert('Contraseña débil', 'Mínimo 6 caracteres.');
      return;
    }
    if (newPwd !== confirmPwd) {
      Alert.alert('No coincide', 'La confirmación no coincide.');
      return;
    }

    try {
      const token = await getToken();
      const res = await fetch(`${BASE_URL}/api/usuarios/me/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          actual: oldPwd,
          nueva: newPwd,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        Alert.alert('Error', data.error || 'No se pudo cambiar la contraseña');
        return;
      }
      Alert.alert('Listo', 'Contraseña actualizada');
      setPwdModal(false);
      setOldPwd('');
      setNewPwd('');
      setConfirmPwd('');
    } catch (e) {
      console.error('change password error', e);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  const avatarUri =
    usuario?.foto_url ||
    'https://ui-avatars.com/api/?size=256&background=D8F291&color=0A0A0A&name=' +
      encodeURIComponent(usuario?.email || 'U');

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Mi Perfil</Text>

      {usuario ? (
        <>
          {/* Avatar + Cambiar foto */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Image
              source={{ uri: avatarUri }}
              style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 12, borderWidth: 3, borderColor: colors.accent }}
            />
            <Pressable
              style={({ pressed }) => [
                commonStyles.button,
                { opacity: pressed || subiendo ? 0.7 : 1, minWidth: 180 },
              ]}
              disabled={subiendo}
              onPress={pickImage}
            >
              <Text style={commonStyles.buttonText}>{subiendo ? 'Subiendo...' : 'Cambiar foto'}</Text>
            </Pressable>
          </View>

          {/* Datos */}
          <Text style={commonStyles.subtitle}>Email: {usuario.email}</Text>
          <Text style={commonStyles.subtitle}>
            Puntos acumulados: <Text style={{ fontWeight: 'bold', color: colors.secondary }}>{usuario.puntos_acumulados ?? 0}</Text>
          </Text>

          {/* Acciones */}
          <Pressable
            style={({ pressed }) => [
              commonStyles.button,
              { opacity: pressed ? 0.7 : 1, marginTop: 20 },
            ]}
            onPress={() => setPwdModal(true)}
          >
            <Text style={commonStyles.buttonText}>Cambiar contraseña</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              commonStyles.button,
              { opacity: pressed ? 0.7 : 1, backgroundColor: '#d9534f' },
            ]}
            onPress={handleLogout}
          >
            <Text style={commonStyles.buttonText}>Cerrar sesión</Text>
          </Pressable>
        </>
      ) : (
        <Text style={commonStyles.subtitle}>No se pudo cargar usuario</Text>
      )}

      {/* Modal contraseña */}
      <Modal animationType="slide" transparent visible={pwdModal} onRequestClose={() => setPwdModal(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 24 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 14, padding: 16 }}>
            <Text style={[commonStyles.title, { marginBottom: 8 }]}>Cambiar contraseña</Text>

            <TextInput
              style={commonStyles.input}
              placeholder="Contraseña actual"
              secureTextEntry
              value={oldPwd}
              onChangeText={setOldPwd}
            />
            <TextInput
              style={commonStyles.input}
              placeholder="Nueva contraseña"
              secureTextEntry
              value={newPwd}
              onChangeText={setNewPwd}
            />
            <TextInput
              style={commonStyles.input}
              placeholder="Confirmar nueva contraseña"
              secureTextEntry
              value={confirmPwd}
              onChangeText={setConfirmPwd}
            />

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}>
              <Pressable
                style={[commonStyles.button, { flex: 1, backgroundColor: colors.gray }]}
                onPress={() => setPwdModal(false)}
              >
                <Text style={[commonStyles.buttonText, { color: '#222' }]}>Cancelar</Text>
              </Pressable>
              <Pressable style={[commonStyles.button, { flex: 1 }]} onPress={handleChangePassword}>
                <Text style={commonStyles.buttonText}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
