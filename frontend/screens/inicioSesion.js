import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Linking, Text, View } from 'react-native';
import { TextInput } from 'react-native-web';

import { commonStyles } from '../styles/styles';

export default function ScreenLogin() {
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>
                    Login
                </Text>
                <View style={commonStyles.accentContainer}>
                    <Text>email</Text>
                    <TextInput></TextInput>
                    <Text>contrasena</Text>
                    <TextInput></TextInput>
                    <Button title='Iniciar sesion' />
                    {/* link a crear nuevo usuario o al perfil if inicio de sesion -> redirect mi screenUsuario/perfilUsuario*/}
                </View>
            </View>
        </SafeAreaView>
    );
}