// screens/MapaMyMapsIframe.js
import React from 'react';
import { View, Platform } from 'react-native';

// Import condicional: en Web usamos <iframe> nativo
const WebView = Platform.OS !== 'web' ? require('react-native-webview').WebView : null;

const IFRAME_HTML = `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1, width=device-width, height=device-height, user-scalable=no">
    <style>
      html,body{margin:0;padding:0;height:100%;}
      .wrap{position:fixed;inset:0;}
      iframe{width:100%;height:100%;border:0;}
    </style>
  </head>
  <body>
    <div class="wrap">
      <iframe src="https://www.google.com/maps/d/embed?mid=1CrCbcypdNXQfeYrTsA1VA51pfGmGK1Q&ehbc=2E312F"></iframe>
    </div>
  </body>
</html>
`;

export default function MapaMyMapsIframe() {
  if (Platform.OS === 'web') {
    // En Web: iframe nativo
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <iframe
          title="Mapa My Maps"
          src="https://www.google.com/maps/d/embed?mid=1CrCbcypdNXQfeYrTsA1VA51pfGmGK1Q&ehbc=2E312F"
          style={{ width: '100%', height: '100%', border: 0 }}
          allowFullScreen
        />
      </div>
    );
  }

  // En iOS/Android: WebView
  return (
    <View style={{ flex: 1 }}>
      <WebView originWhitelist={['*']} source={{ html: IFRAME_HTML }} />
    </View>
  );
}
