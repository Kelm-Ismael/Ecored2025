import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Button } from 'react-native';

import { commonStyles } from '../styles/styles';

export default function ScreenUsuario({ navigation }) {
    const handleLogout = () => {
        // Aquí limpiarías token o estado de sesión
        navigation.replace('Login'); 
    };

    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>
                    Usuarios
                </Text>
                <Text style={commonStyles.subtitle}>
                    Bienvenido a tu perfil 🎉
                </Text>
                <Button title="Cerrar sesión" onPress={handleLogout} />
            </View>
        </SafeAreaView>
    );
}
