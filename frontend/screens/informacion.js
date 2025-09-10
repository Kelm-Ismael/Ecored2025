import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button , StyleSheet} from 'react-native-web';



export default function ScreenInformacion() {
    return (
        <SafeAreaView >
            <View style={styles.container}>
                <Text>
                    Informacion
                </Text>
                <TouchableOpacity style={{gap: 15}}>
                    <TouchableOpacity style={styles.btn} onPress={() => alert("hola")}>
                        <Text style={styles.textoBoton}>Link Info Reciclaje</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => alert("hola")}>
                        <Text style={styles.textoBoton}>Link Info Reciclaje</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => alert("hola")}>
                        <Text style={styles.textoBoton}>Link Info Reciclaje</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => alert("hola")}>
                        <Text style={styles.textoBoton}>Link Info Reciclaje</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#f7fff6ff",
    justifyContent: "center",
    alignItems: "center",
    gap: 20, // separa los botones
    },
    btn: {
        borderRadius: 20,
        backgroundColor: "#51cf45ff",
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    TextoBoton: {
        color: "#117911ff",
        fontSize: 16,
        fontWeight: "bold",
    }
});