import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { commonStyles } from '../styles/styles';

export default function ScreenInformacion({ navigation }) {
    return (
        <View style={commonStyles.container}>
            <ScrollView contentContainerStyle={commonStyles.scroll}>

                <View style={commonStyles.container}>
                    <TouchableOpacity 
                        title='qué es el cambio climatico' 
                        style={commonStyles.button} 
                        onPress={() => navigation.navigate("InfoCambioClimatico")}
                        >
                        <Text style={commonStyles.buttonText}>
                            ¿Qué es el cambio climatico?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        title='qué es la economia circular' 
                        style={commonStyles.button} 
                        onPress={() => navigation.navigate("InfoEconomiaCircular")}
                    >
                        <Text style={commonStyles.buttonText}>
                            ¿Qué es la economía circular?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        title='cómo cuidamos el planeta' 
                        style={commonStyles.button} 
                        onPress={() => navigation.navigate("InfoComoCuidarPlaneta")}
                        >
                        <Text style={commonStyles.buttonText}>
                            ¿Cómo cuidamos el planeta?
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}