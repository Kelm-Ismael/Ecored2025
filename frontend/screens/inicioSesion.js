import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { commonStyles } from '../styles/styles';
import { BASE_URL } from '../config/api.js';
import { useState } from 'react';

export default function ScreenLogin({ navigation, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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
      // console.log('URL para login:', `${BASE_URL}/usuarios/login`);      

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
      Alert.alert('Error', 'No se pudo conectar al servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>
          Login
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