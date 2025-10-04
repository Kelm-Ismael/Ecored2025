import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapaEcopuntos() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView 
        source={{ uri: "https://www.google.com/maps/d/viewer?mid=1CrCbcypdNXQfeYrTsA1VA51pfGmGK1Q&femb=1&ll=-27.39141683271747%2C-55.92148938085938&z=13" }} 
        style={styles.webview}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});