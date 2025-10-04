import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ScrollView, StyleSheet , View, 
TouchableOpacity, LayoutAnimation, Platform, 
UIManager} from 'react-native';
import React, { useState } from "react";

const secciones = [
  {
    titulo: "Ahorro energético",
    contenido: `
    • Apagá las luces cuando no las necesites y cambiá a lámparas LED, tienen mayor vida útil y ahorran muchísima energía.\n
    • Ahorrá en la factura eléctrica aprovechando al máximo la luz natural, abriendo ventanas, usando colores claros en paredes, techos y suelos, y colocando espejos.
    • Comprá aparatos con etiquetado energético de clase A o B, cuyo consumo está optimizado.
    • Desenchufa los aparatos eléctricos que estén en modo stand-by (espera). No te olvides de desconectar el cargador del celular cuando no lo utilices.`, 
  },
  {
    titulo: "Climatización",
    contenido: `
    • Reducí el uso de la calefacción/refrigeración. Bajando/subiendo sólo 1°C podés evitar hasta 300 kg de emisiones de C02 por año.\n
    • Mejorá el aislamiento de la casa, para que la temperatura no escape por ventanas, rendijas o puertas. Evitarás importantes pérdidas de calor/frío.`,
  },
  {
    titulo: "Cocina",
    contenido: `
    • Herví la cantidad justa de agua. Si hervís solamente el agua necesaria para tu taza de té, café o termo de mate, ahorrás una gran cantidad de energía.\n
    • Composta los residuos orgánicos para disminuir el volumen de desechos. Consumí alimentos agroecológicos de producción local.`,
  },
  {
    titulo: "Heladera",
    contenido: `
    • No pongas en la heladera alimentos calientes. Vas a ahorrar más energía si dejás que se enfríen primero.\n
    • No instales la heladera cerca del horno, va a consumir mucha más energía.
    • Descongelá la heladera cuando la capa de hielo alcance 3 mm de espesor.
    • Abrí las puertas el menor tiempo posible para evitar que el frío se escape.`,
  },
  {
    titulo: "Lavado",
    contenido: `
    • Utilizá el lavarropas y el lavavajillas solamente cuando puedas llenarlo.\n
    • Secá la ropa de forma natural: durará más y la energía que uses es gratis y no contaminante.
    • No dejes correr el agua cuando laves los platos.
    • Reutiliza el agua de lavado para realizar limpieza de pisos, veredas o patios.`,
  },
  {
    titulo: "Baño",
    contenido: `
    • Tomar duchas en lugar de baños consume cuatro veces menos energía y podés ahorrar entre 100 y 200 litros de agua.\n
    • Cerrá la canilla al cepillarte los dientes, enjabonarte las manos o afeitarte.
    • Arreglá las pérdidas. El goteo de una canilla puede hacer perder el agua suficiente para llenar una bañera en un mes.`,
  },
  {
    titulo: "Residuos",
    contenido: `
    • Reciclá papel, metal y plásticos.\n
    • Llevá tus propias bolsas al supermercado. ¡Cada bolsa que termina en la basura tarda en descomponerse entre 100 y 150 años!
    • A la hora de comprar productos elegí envoltorios simples o comprá suelto.
    • Evitá comprar alimentos y bebidas en envases plásticos. Priorizá los envases de vidrio.`,
  },
  {
    titulo: "Espacios verdes",
    contenido: `
    • Mantené tus espacios, patios, terrazas y balcones lo más verde posible.\n
    • La vegetación y las plantas son aislantes térmicos, disminuyen los efectos de vientos y la contaminación por partículas en el aire.
    • Evita la plantación de árboles exóticos. Prioriza la huerta en casa y aromáticas que ayuden a los polinizadores (mariposas, abejas, etc.).`,
  },
];
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function InfoComoCuidarPlaneta() {
  const [activo, setActivo] = useState(null);

  const toggle = (i) => {
    // para animaciones suaves
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (activo === i) {
      setActivo(null);
    } else {
      setActivo(i);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Acciones climáticas positivas</Text>
          <Text style={styles.text}>• No quemar basura, genera contaminación en el aire y aumenta la temperatura.</Text>
          <Text style={styles.text}>• Evitar limpiar los lotes mediante la quema de pastizales, restos de raíces, troncos, etc.
          Además de sumar calor a nuestro planeta se corre el riesgo de que el fuego se extienda a otras zonas.</Text>
          <Text style={styles.text}>• No tirar basura y desechos cerca de los causes de agua, bloquean y contaminan tan preciado recurso.</Text>
      </ScrollView>

      <View style={styles.contentDesplegable}>
      <Text style={styles.header}>En casa</Text>
      {secciones.map((seccion, i) => (
        <View key={i} style={styles.item}>
          <TouchableOpacity onPress={() => toggle(i)} style={styles.tituloContainer}>
            <Text style={styles.titulo}>{seccion.titulo}</Text>
          </TouchableOpacity>
          {activo === i && (
            <View style={styles.contenidoContainer}>
              <Text style={styles.contenido}>{seccion.contenido}</Text>
            </View>
          )}
        </View>
        ))}
      </View>
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
    marginBottom: 15,
  },
  contentDesplegable: {
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  item: {
    marginBottom: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
  },
  tituloContainer: {
    backgroundColor: "#e9e9e9",
    padding: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "500",
  },
  contenidoContainer: {
    backgroundColor: "#f7f7f7",
    padding: 12,
  },
  contenido: {
    fontSize: 14,
    lineHeight: 20,
  },
});