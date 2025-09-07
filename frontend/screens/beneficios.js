import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-web';
import { Ionicons } from '@expo/vector-icons';

import { commonStyles } from '../styles/styles';

export default function ScreenBeneficio() {
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>
                    Beneficios
                </Text>
                <TextInput></TextInput>
                {/* agregar icono lupa buscador */}

                <View style={commonStyles.accentContainer}>
                    <Text>tabla beneficios</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}