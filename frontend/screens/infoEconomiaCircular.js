import YoutubeIframe from 'react-native-youtube-iframe';
import { ScrollView, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { commonStyles, informacionAppStyles } from '../styles/styles';

export default function InfoEconomiaCircular() {
  return (
    <View style={commonStyles.container}>
      <ScrollView contentContainerStyle={informacionAppStyles.scroll}>
        <Text style={informacionAppStyles.title}>¿Qué es la Economia Circular?</Text>
        <Text style={informacionAppStyles.text}>
          La Economía Circular es un sistema de aprovechamiento máximo de recursos donde predomina la reducción, la reutilización y el reciclaje de los elementos. Busca instalarse como un nuevo modelo de desarrollo un triple impacto:</Text>
        <View style={informacionAppStyles.list}>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>Ambiental</Text>
          </View>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>Económico</Text>
          </View>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>Social</Text>
          </View>
        </View>
        <Text style={informacionAppStyles.text}>
          La transición hacia este tipo de modelo debe ser justo y transversal, teniendo presentes los recursos y desventajas de cada espacio.
        </Text>
        <View style={informacionAppStyles.accentContainer}>
          <YoutubeIframe
            height={170}
            videoId="T3AZ2jwZ__0"
          />
        </View>
      </ScrollView>
    </View>
  );
}