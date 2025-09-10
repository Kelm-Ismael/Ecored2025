// screens/MapaMyMapsIframe.js
import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const IFRAME_HTML = `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1, width=device-width, height=device-height, user-scalable=no">
    <style>html,body{margin:0;padding:0;height:100%;} .wrap{position:fixed;inset:0;}</style>
  </head>
  <body>
    <div class="wrap">
      <!-- pegá tu iframe acá -->
      <iframe src="https://www.google.com/maps/d/embed?mid=1CrCbcypdNXQfeYrTsA1VA51pfGmGK1Q&ehbc=2E312F" width="640" height="480"></iframe>
    </div>
  </body>
</html>
`;

export default function MapaMyMapsIframe() {
  return (
    <View style={{ flex: 1 }}>
      <WebView originWhitelist={['*']} source={{ html: IFRAME_HTML }} />
    </View>
  );
}
