import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

import { commonStyles } from '../styles/styles';

export default function ScreenUsuario() {
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>
                    Usuario
                </Text>
            </View>
        </SafeAreaView>
    );
}