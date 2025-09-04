import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ScreenRegistro({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = () => {
    if (!email || !password) {
      alert('Completa todos los campos');
      return;
    }
    if (password !== confirm) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí guardarías el usuario en tu backend / firebase / etc.
    alert('Registro exitoso');
    navigation.replace('PerfilUsuario');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />
      <Button title="Registrarme" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.goBack()}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 8 },
  link: { marginTop: 15, color: 'blue', textAlign: 'center' },
});
