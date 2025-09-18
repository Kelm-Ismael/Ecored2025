import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { commonStyles } from '../styles/styles';

export default function WebCodigoQR({ route }) {
  const { data } = route.params;

  console.log('📦 Payload recibido en QR:', data);

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.webAccentContainer}>
        <View style={commonStyles.webTitleContainer}>
          <Text style={commonStyles.webQRTitle}>Escaneá este QR</Text>
        </View>
        <View style={commonStyles.webQRContainer}>
          <QRCode value={data} size={250} />
        </View>
      </View>
    </View>
  );
}