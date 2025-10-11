import React, { useState } from "react";
import {
  Text, ScrollView, View, TouchableOpacity,
  LayoutAnimation, Platform, UIManager
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import { commonStyles, informacionAppStyles } from '../styles/styles';

// Asegurar que LayoutAnimation funcione en Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const seccionesCasa = [
  {
    titulo: "Ahorro energético",
    contenido: (
      <>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>Apagá las luces</Text> cuando no las necesites y cambiá a lámparas LED, tienen mayor vida útil y ahorran muchísima energía.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            Aprovechá al máximo la <Text style={informacionAppStyles.boldText}>luz natural</Text> abriendo ventanas, usando colores claros en paredes, techos y suelos, y colocando espejos.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            Comprá aparatos con <Text style={informacionAppStyles.boldText}>etiquetado energético A o B</Text>, que tienen un consumo optimizado.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>Desenchufá</Text> los aparatos eléctricos en stand-by y el cargador del celular cuando no lo uses.
          </Text>
        </View>
      </>
    )
  },
  {
    titulo: "Climatización",
    contenido: (
      <>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            Bajá o subí <Text style={informacionAppStyles.boldText}>solo 1°C</Text> en la calefacción/refrigeración y evitás hasta 300 kg de emisiones de CO₂ por año.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>Mejorá el aislamiento</Text> de ventanas, rendijas y puertas para evitar pérdidas de calor o frío.
          </Text>
        </View>
      </>
    )
  },
  {
    titulo: "Cocina",
    contenido: (
      <>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>Tapá las ollas</Text> para reducir el tiempo de cocción y aprovechar mejor el calor.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            Usá el <Text style={informacionAppStyles.boldText}>microondas</Text> en lugar del horno para porciones pequeñas, consume menos energía.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>Evitá abrir muchas veces el horno</Text> mientras cocinás, se pierde mucho calor.
          </Text>
        </View>
      </>
    )
  },
  {
    titulo: "Heladera",
    contenido: (
      <>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>Revisá el burlete de la puerta</Text>, si no cierra bien se pierde frío.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>No guardes comidas calientes</Text>, hacen trabajar más al motor.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>Descongelala con frecuencia</Text> para que no se forme hielo en exceso.
          </Text>
        </View>
      </>
    )
  },
  {
    titulo: "Lavado",
    contenido: (
      <>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            Usá el <Text style={informacionAppStyles.boldText}>lavarropas con carga completa</Text> para aprovechar el consumo de agua y energía.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            Lavá con <Text style={informacionAppStyles.boldText}>agua fría</Text> siempre que sea posible.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>Evitá el uso de secarropas eléctricos</Text>, preferí el secado al sol.
          </Text>
        </View>
      </>
    )
  },
  {
    titulo: "Baño",
    contenido: (
      <>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>Reducí el tiempo en la ducha:</Text> cada minuto menos, ahorrás litros de agua y gas.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>Instalá aireadores o perlizadores en los grifos</Text>, consumen menos agua sin perder presión.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>No dejes correr el agua</Text> mientras te cepillás los dientes o enjabonás.
          </Text>
        </View>
      </>
    )
  },
  {
    titulo: "Residuos",
    contenido: (
      <>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>Separá los residuos reciclables</Text> del resto.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>Reducí la compra</Text> de productos con envases innecesarios.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            Llevá tu <Text style={informacionAppStyles.boldText}>bolsa reutilizable</Text> al hacer las compras.
          </Text>
        </View>
      </>
    )
  },
  {
    titulo: "Espacios verdes",
    contenido: (
      <>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            <Text style={informacionAppStyles.boldText}>Plantar árboles</Text> ayuda a reducir el CO₂ del ambiente.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            Mantené tus plantas con <Text style={informacionAppStyles.boldText}>agua de lluvia o reutilizada</Text> si es posible.
          </Text>
        </View>
        <View style={informacionAppStyles.listItem}>
          <FontAwesome name="check" size={14} style={informacionAppStyles.icon} />
          <Text style={informacionAppStyles.listText}>
            Usá <Text style={informacionAppStyles.boldText}>compost</Text> para abonar la tierra y reducir residuos orgánicos.
          </Text>
        </View>
      </>
    )
  },
];

export default function AccionesClimaticasPositivasScreen() {  
  const [seccionActiva, setSeccionActiva] = useState(null);

  function toggleSeccion(index) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (seccionActiva === index) {
      setSeccionActiva(null);
    } else {
      setSeccionActiva(index);
    }
  }

  return (
    <View style={commonStyles.container}>
      <ScrollView contentContainerStyle={informacionAppStyles.scroll}>
        <Text style={informacionAppStyles.title}>Acciones climáticas positivas</Text>
        
        <Text style={informacionAppStyles.subtitle}>En toda la provincia</Text>
        <View style={informacionAppStyles.list}>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>
              <Text style={informacionAppStyles.boldText}>No quemar basura</Text>, genera contaminación en el aire y aumenta la temperatura.
            </Text>
          </View>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>
              <Text style={informacionAppStyles.boldText}>Evitar limpiar los lotes mediante la quema</Text> de pastizales, restos de raíces, troncos, etc. Además de sumar calor a nuestro planeta se corre el riesgo de que el fuego se extienda a otras zonas.
            </Text>
          </View>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>
              <Text style={informacionAppStyles.boldText}>No tirar basura y desechos cerca de los causes de agua</Text>, bloquean y contaminan tan preciado recurso.
            </Text>
          </View>
        </View>

        <Text style={informacionAppStyles.subtitle}>En casa</Text>
        
        {seccionesCasa.map((seccion, index) => (
        <View key={index} style={informacionAppStyles.seccion}>
          <TouchableOpacity
            onPress={() => toggleSeccion(index)}
            activeOpacity={0.7}
            style={informacionAppStyles.botonSeccion}
          >
            <Text style={informacionAppStyles.tituloSeccion}>{seccion.titulo}</Text>
            <FontAwesome
              name={seccionActiva === index ? "minus" : "plus"}
              size={16}
              style={informacionAppStyles.iconSeccion}
            />
          </TouchableOpacity>
          {seccionActiva === index && (
            <View style={informacionAppStyles.contenidoSeccion}>
              {seccion.contenido}
            </View>
          )}
        </View>
      ))}

        <Text style={informacionAppStyles.subtitle}>En tu comunidad</Text>

        <View style={informacionAppStyles.list}>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>
              Hablá con tus amigos y familiares sobre los problemas ambientales para que <Text style={informacionAppStyles.boldText}>tomen conciencia</Text> y comiencen a realizar estos pequeños y necesarios cambios.
            </Text>
          </View>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>
              <Text style={informacionAppStyles.boldText}>Contribuí</Text> con organizaciones que apoyen las causas ambientales.
            </Text>
          </View>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>
              <Text style={informacionAppStyles.boldText}>Participá y apoyá</Text> campañas de forestación, reforestación y restauración de bosques.
            </Text>
          </View>
          <View style={informacionAppStyles.listItem}>
            <FontAwesome name="check" size={18} style={informacionAppStyles.icon} />
            <Text style={informacionAppStyles.listText}>
              <Text style={informacionAppStyles.boldText}>Realiza la separación de residuos en tu hogar</Text>, acercalo a los puntos de reciclaje y sumá puntos. Compartí la información con tus amigos, familiares y colegas sobre los problemas ambientales y sus soluciones, para que tomen conciencia y comiencen a realizar pequeños cambios.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
