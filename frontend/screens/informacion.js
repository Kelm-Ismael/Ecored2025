import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View } from 'react-native';

import { commonStyles } from '../styles/styles';

export default function ScreenInformacion() {
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>
                    Informacion
                </Text>
                <View style={commonStyles.container}>
                    <Button title='link info' />
                    <Button title='link info' />
                    <Button title='link info' />
                    <Button title='link info' />
                    <Button title='link info' />
                    <Button title='link info' />
                </View>
            </View>
        </SafeAreaView>
    );
}