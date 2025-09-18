import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { commonStyles } from '../styles/styles';

export default function WebRegistro() {
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>
                    REGISTRO
                </Text>
                <TextInput></TextInput>
                {/* agregar icono lupa buscador */}

                <View style={commonStyles.accentContainer}>
                    <Text>tabla desafios</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}