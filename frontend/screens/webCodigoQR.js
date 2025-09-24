import React, {useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { commonStyles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../config/api';

export default function WebCodigoQR({ route }) {
  const { data } = route.params;
  const navigation = useNavigation();

  console.log('📦 Payload recibido en QR:', data);
  
  const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
  
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const fecha = parsedData.fecha.replace('T', ' ').split('.')[0];
        console.log('📦 Fecha enviada al verificar:', fecha);
          
        const url = `${BASE_URL}/entregas/verif?fecha=${encodeURIComponent(fecha)}&id_usuario=${parsedData.id_usuario}&id_receptor=${parsedData.id_receptor}`;
        const res = await fetch(url);
        const json = await res.json();
          
        console.log('Respuesta del backend en webCodigoQR:', json);

        if (json.registrada) {
          clearInterval(interval);
          console.log('✅ Entrega registrada. Redirigiendo...');
          navigation.replace('WebMain'); // O navigation.navigate('WebMain');
        }
      } catch (error) {
        console.error('Error al verificar entrega:', error);
      }
    }, 5000); // consulta cada 5 segundos

    return () => clearInterval(interval);
  }, []);

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