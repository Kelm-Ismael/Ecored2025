import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { commonStyles } from '../styles/styles';
import WebSidebar from '../components/WebSidebar';

export default function WebHistorial() {
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.webMainContainer}>
                <View style={commonStyles.webSidebar}>
                    <WebSidebar />
                </View>
                <View style={commonStyles.webContent}>
                    <View style={commonStyles.container}>
                        <Text style={commonStyles.title}>
                            Historial
                        </Text>
                    </View>
                    <View style={commonStyles.accentContainer}>
                        <Text>tabla desafios</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}