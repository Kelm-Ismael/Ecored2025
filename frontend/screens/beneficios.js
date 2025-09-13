import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput } from 'react-native';
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