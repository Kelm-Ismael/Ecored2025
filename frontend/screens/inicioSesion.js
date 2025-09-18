<<<<<<< HEAD

// // screens/inicioSesion.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Pressable, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { commonStyles } from '../styles/styles';
// import { BASE_URL } from '../config/api'; // o apiPost si preferís

// export default function InicioSesion({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     console.log('Intentando login:', email);
//     try {
//       const res = await fetch(`${BASE_URL}/api/usuarios/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, contrasenia: password }),
//       });

//       const data = await res.json().catch(() => ({}));
//       console.log('Respuesta login:', res.status, data);

//       if (res.ok && data?.token) {
//         await AsyncStorage.setItem('token', data.token);
//         navigation.replace('PerfilUsuario');
//       } else {
//         Alert.alert('Error', data?.error || 'Credenciales inválidas');
//       }
//     } catch (err) {
//       console.error('Error fetch login:', err);
//       Alert.alert('Error', 'No se pudo conectar al servidor');
//     }
//   };

//   return (
//     <View style={commonStyles.container}>
//       <Text style={commonStyles.title}>Iniciar Sesión</Text>

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
//           { opacity: pressed ? 0.7 : 1, marginBottom: 12 },
//         ]}
//         onPress={handleLogin}
//       >
//         <Text style={commonStyles.buttonText}>Entrar</Text>
//       </Pressable>

//       <Pressable onPress={() => navigation.navigate('Registro')}>
//         <Text style={commonStyles.subtitle}>
//           ¿No tienes cuenta? Regístrate aquí
//         </Text>
//       </Pressable>
//     </View>
//   );
// }

// screens/inicioSesion.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, colors } from '../styles/styles';
import { BASE_URL } from '../config/api';

function routeForTipo(tipo_usuario_string = '', id_tipo_usuario = null) {
  const t = String(tipo_usuario_string).toLowerCase();
  const id = Number(id_tipo_usuario) || null;

  if (id === 5 || t.includes('admin')) return 'PanelAdmin';
  if (id === 2 || t.includes('comercio')) return 'PanelComercio';
  if (id === 3 || t.includes('escuela')) return 'PanelEscuela';
  if (id === 4 || t.includes('recuperador')) return 'PanelRecuperador';
  return 'PanelCiudadano';
}

export default function InicioSesion({ navigation }) {
  const [email, setEmail] = useState('');
=======
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { commonStyles } from '../styles/styles';
import { BASE_URL } from '../config/api.js';
import { useState } from 'react';

export default function ScreenLogin({ navigation, onLoginSuccess, route }) {
  const [email, setEmail] = useState(route?.params?.email || '');
>>>>>>> origin/Caro
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
<<<<<<< HEAD
    if (!email || !password) return Alert.alert('Campos', 'Completá email y contraseña.');
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contrasenia: password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.token) {
        return Alert.alert('Error', data?.error || 'Credenciales inválidas');
      }

      await AsyncStorage.setItem('token', data.token);

      const meRes = await fetch(`${BASE_URL}/api/usuarios/me`, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const me = await meRes.json().catch(() => ({}));

      const destino = routeForTipo(me?.tipo_usuario, me?.id_tipo_usuario);
      navigation.replace(destino);
    } catch (err) {
      console.error('Error login:', err);
=======
    if (!email || !password) {
      return Alert.alert('Campos', 'Completá email y contraseña.');
    }
    
    try {
      setLoading(true);
      
      const loginData = {
        email,
        contrasenia: password,
      };
      
      console.log('📤 Datos enviados al login:', loginData);
      console.log('URL para login:', `${BASE_URL}/usuarios/login`);      

      const res = await fetch(`${BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
  
      console.log('🧾 Código de estado HTTP (login):', res.status);

      const raw = await res.text();
      console.log('📨 Texto completo de respuesta (login):', raw);
      
      let data = {};
        
      try {
        data = JSON.parse(raw);
      } catch (e) {
        console.warn('⚠️ No se pudo parsear la respuesta del login como JSON');
      }
        
      if (!res.ok || !data?.token) {
        return Alert.alert('Error', data?.error || 'Credenciales inválidas');
      }
      
      // guarda token
      await AsyncStorage.setItem('token', data.token);
        
      // fetch perfil
      const perfilRes = await fetch(`${BASE_URL}/usuarios/perfil`, {
        headers: { Authorization: `Bearer ${data.token}` },
      });

      // perfil completo
      const perfilRaw = await perfilRes.text();
      console.log('👤 Respuesta de perfil:', perfilRaw);

      let perfil = {};

      // perfil json
      try {
        perfil = JSON.parse(perfilRaw);
      } catch (e) {
        console.warn('⚠️ No se pudo parsear el perfil como JSON');
      }

      console.log('👤 Perfil recibido:', perfil);
      if (!perfil?.id) {
        return Alert.alert('Error', 'No se pudo obtener el perfil del usuario');
      }

      // guarda id en async
      await AsyncStorage.setItem('usuario_id', perfil.id.toString());

      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess();
      }

      navigation.navigate('Usuario');
    } catch (err) {
      console.error('❌ Error login:', err);
>>>>>>> origin/Caro
      Alert.alert('Error', 'No se pudo conectar al servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Iniciar Sesión</Text>

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
        style={[commonStyles.button, commonStyles.buttonLg, { opacity: loading ? 0.7 : 1, marginBottom: 12 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={commonStyles.buttonText}>{loading ? 'Ingresando...' : 'Entrar'}</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Registro')}>
        <Text style={commonStyles.subtitle}>¿No tienes cuenta? Regístrate aquí</Text>
      </Pressable>
    </View>
  );
}
=======
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>
          Login
        </Text>
        <Text style={commonStyles.subtitle}>
          Ingresá para ver tu perfil de usuario
        </Text>
        <View style={commonStyles.accentContainer}>
          <Text>E-mail</Text>
          <TextInput
            style={commonStyles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Text>Contraseña</Text>
          <TextInput
            style={commonStyles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button 
            style={commonStyles.button} 
            title={loading ? 'Cargando...' : 'Iniciar sesión'} 
            onPress={handleLogin}
            disabled={loading}
          />
          <Text>¿No tenés cuenta? </Text>
          <Button 
            style={commonStyles.button} 
            title='Registrate'
            onPress={() => navigation.navigate('Registro')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
} 
>>>>>>> origin/Caro
