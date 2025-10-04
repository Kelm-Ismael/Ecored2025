import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ScrollView, StyleSheet } from 'react-native';

export default function InfoEconomiaCircular() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>¿Qué es la Economia Circular?</Text>
        <Text style={styles.text}>
          La Economía Circular es un sistema de aprovechamiento máximo de recursos donde predomina la reducción, 
          la reutilización y el reciclaje de los elementos. Busca instalarse como un nuevo modelo de desarrollo un triple impacto: 
          Ambiental - Económico - Social. La transición hacia este tipo de modelo debe ser justo y transversal, 
          teniendo presente los recursos y desventajas de cada espacio.
        </Text>
        <Text>
          https://youtu.be/T3AZ2jwZ__0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color:'#00A887',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
});