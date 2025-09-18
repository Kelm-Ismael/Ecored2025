import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, TouchableOpacity, View } from 'react-native';

import { commonStyles } from '../styles/styles';

export default function ScreenInformacion() {
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.container}>
                {/* <Text style={commonStyles.title}>
                    Informacion
                </Text> */}
                <View style={commonStyles.container}>
                    <TouchableOpacity title='link info' style={commonStyles.button}>
                        <Text style={commonStyles.buttonText}>
                            link info
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity title='link info' style={commonStyles.button}>
                        <Text style={commonStyles.buttonText}>
                            link info
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity title='link info' style={commonStyles.button}>
                        <Text style={commonStyles.buttonText}>
                            link info
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity title='link info' style={commonStyles.button}>
                        <Text style={commonStyles.buttonText}>
                            link info
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity title='link info' style={commonStyles.button}>
                        <Text style={commonStyles.buttonText}>
                            link info
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity title='link info' style={commonStyles.button}>
                        <Text style={commonStyles.buttonText}>
                            link info
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}