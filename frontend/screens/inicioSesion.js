import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

import { commonStyles } from '../styles/styles';

export default function ScreenDesafio() {
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>
                    Inicio Sesion
                </Text>
            </View>
        </SafeAreaView>
    );
}
