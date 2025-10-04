import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, TouchableOpacity, View } from 'react-native';

import { commonStyles } from '../styles/styles';

export default function ScreenInformacion({ navigation }) {
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.container}>
                {/* <Text style={commonStyles.title}>
                    Informacion
                </Text> */}
                <View style={commonStyles.container}>
                    <TouchableOpacity title='mapa' style={commonStyles.button} onPress={()=> navigation.navigate('MapaEcoPuntos')}>
                        <Text style={commonStyles.buttonText}>
                            Mapa de EcoPuntos
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity title='que es el cambio climatico' style={commonStyles.button} onPress={() => navigation.navigate("InfoCambioClimatico")}>
                        <Text style={commonStyles.buttonText}>
                            ¿Qué es el cambio climatico?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity title='que es economia circular' style={commonStyles.button} onPress={() => navigation.navigate("InfoEconomiaCircular")}>
                        <Text style={commonStyles.buttonText}>
                            ¿Qué es la economía circular?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity title='como cuidamos el planeta' style={commonStyles.button} onPress={() => navigation.navigate("InfoComoCuidarPlaneta")}>
                        <Text style={commonStyles.buttonText}>
                            ¿Como cuidamos el planeta?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}