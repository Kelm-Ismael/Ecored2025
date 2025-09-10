
// screens/MapaMyMaps.js
import React, { useRef } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';

// Import condicional: evita el error en Web
const WebView = Platform.OS !== 'web' ? require('react-native-webview').WebView : null;

// URL pública de tu My Maps (viewer o embed)
const MYMAPS_URL = 'https://www.google.com/maps/d/edit?mid=1vrmWXqSMjCOsJEdCt-RoHVEqYuLznWI&usp=sharing';
// Alternativa embed (a veces carga más liviano):
// const MYMAPS_URL = 'https://www.google.com/maps/d/u/0/embed?mid=TU_ID_AQUI&ehbc=2E312F';

export default function MapaMyMaps() {
  const webRef = useRef(null);

  if (Platform.OS === 'web') {
    // En web usamos iframe nativo del navegador
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <iframe
          title="Mapa My Maps"
          src={MYMAPS_URL}
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  // iOS / Android: WebView
  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webRef}
        source={{ uri: MYMAPS_URL }}
        startInLoadingState
        renderLoading={() => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        )}
        onShouldStartLoadWithRequest={() => true}
      />
    </View>
  );
}
