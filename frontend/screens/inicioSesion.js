// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { View, Text } from 'react-native';

// import { commonStyles } from '../styles/styles';

// export default function ScreenDesafio() {
//     return (
//         <SafeAreaView style={commonStyles.safeArea}>
//             <View style={commonStyles.container}>
//                 <Text style={commonStyles.title}>
//                     Inicio Sesion
//                 </Text>
//             </View>
//         </SafeAreaView>
//     );
// }

import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import { commonStyles } from '../styles/styles';

export default function ScreenInicioSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función de login (puedes reemplazar con tu API)
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Ejemplo de validación básica
    if (email === 'usuario@correo.com' && password === '1234') {
      Alert.alert('Éxito', 'Has iniciado sesión correctamente');
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Inicio de Sesión</Text>

        <TextInput
          style={commonStyles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={commonStyles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={commonStyles.button} onPress={handleLogin}>
          <Text style={commonStyles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
