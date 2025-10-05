import React from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { commonStyles, mapaEcopuntosAppStyles } from '../styles/styles';

export default function MapaEcopuntos() {
  return (
    <View style={commonStyles.container}>
        <Text style={commonStyles.title}>
            Ecopuntos de la ciudad de Posadas
        </Text>
        <View style={mapaEcopuntosAppStyles.accentContainer}>
            <WebView
                source={{ uri: "https://www.google.com/maps/d/viewer?mid=1CrCbcypdNXQfeYrTsA1VA51pfGmGK1Q&femb=1&ll=-27.39141683271747%2C-55.92148938085938&z=13" }} 
                style={mapaEcopuntosAppStyles.webview}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        </View>
    </View>
  );
}