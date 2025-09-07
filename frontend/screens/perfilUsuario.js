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
                <View style={commonStyles.container}>
                     <Text>Nombre apellido </Text>
                     <Text>rol/escuela</Text>
                     <Text>nivel</Text>
                      {/* despues conectara con crud usuario */}
                      {/* btn nueva entrega de reciclables */}

                      <Text>Pts acumulados</Text>
                        <View style={commonStyles.accentContainer}>
                            <Text>pts</Text>
                        </View>
                      <Text>ultimas transacciones</Text>
                        <View style={commonStyles.accentContainer}>
                            <Text>tablas</Text>
                        </View>
                </View>
            </View>
        </SafeAreaView>
    );
}