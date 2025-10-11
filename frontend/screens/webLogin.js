import { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { commonStyles } from '../styles/styles';

export default function WebLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, userToken, userRole } = useContext(AuthContext);
    const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Campos', 'Completá email y contraseña.');
    }
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (!success) {
      Alert.alert('Error', 'Credenciales inválidas');
    }
  };

  useEffect(() => {
    if (userToken && userRole) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'WebMain' }], // o cualquier pantalla protegida
      });
    }
  }, [userToken, userRole]);

  return (
    <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.webLoginContainer}>
            <Text style={commonStyles.webLoginTitle}>
                Ecored
            </Text>
            <View style={commonStyles.accentContainer}>
                <Text style={{fontSize: 17}}>E-mail</Text>
                <TextInput
                    style={commonStyles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <Text style={{fontSize: 17}}>Contraseña</Text>
                <TextInput
                    style={commonStyles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={handleLogin}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    <Text style={commonStyles.webLoginButtonText}>
                        {loading ? 'Cargando...' : 'Iniciar sesión'}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
      <View style={commonStyles.container}>
        
        
      </View>
    </SafeAreaView>
  );
} 